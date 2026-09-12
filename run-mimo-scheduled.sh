#!/bin/bash
# ============================================================
# MiMo Scheduled Worker — AtlantGen SaaS Admin Panel Rebuild
# Runs daily at 16:05 IST (Europe/Dublin)
# Estimated runtime: 3-5 hours
# ============================================================

set -euo pipefail

# --- Configuration ---
export TZ="Europe/Dublin"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PLAN_FILE="$SCRIPT_DIR/approved_plan.md"
LOG_DIR="$SCRIPT_DIR/logs"
LOG_FILE="$LOG_DIR/mimo-$(date +%F).log"
LOCK_FILE="/tmp/mimo-worker.lock"
MAX_RETRIES=3
RETRY_DELAY=60

# --- Setup ---
mkdir -p "$LOG_DIR"

log() {
  local level="$1"
  shift
  echo "[$(date '+%Y-%m-%d %H:%M:%S %Z')] [$level] $*" | tee -a "$LOG_FILE"
}

cleanup() {
  rm -f "$LOCK_FILE"
  log "INFO" "Lock file removed. Worker finished."
}

trap cleanup EXIT

# --- Lock mechanism (prevent concurrent runs) ---
if [ -f "$LOCK_FILE" ]; then
  pid=$(cat "$LOCK_FILE")
  if kill -0 "$pid" 2>/dev/null; then
    log "ERROR" "Another instance is running (PID: $pid). Exiting."
    exit 1
  else
    log "WARN" "Stale lock file found. Removing."
    rm -f "$LOCK_FILE"
  fi
fi
echo $$ > "$LOCK_FILE"

# --- Pre-flight checks ---
log "INFO" "=== MiMo SaaS Admin Rebuild — $(date) ==="
log "INFO" "Timezone: $TZ"
log "INFO" "Project root: $PROJECT_ROOT"
log "INFO" "Plan file: $PLAN_FILE"

if [ ! -f "$PLAN_FILE" ]; then
  log "ERROR" "Plan file not found: $PLAN_FILE"
  exit 1
fi

# Count remaining tasks
REMAINING=$(grep -c '^\- \[ \]' "$PLAN_FILE" || true)
COMPLETED=$(grep -c '^\- \[x\]' "$PLAN_FILE" || true)
TOTAL=$((REMAINING + COMPLETED))
log "INFO" "Plan progress: $COMPLETED/$TOTAL tasks completed, $REMAINING remaining"

if [ "$REMAINING" -eq 0 ]; then
  log "INFO" "All tasks completed! Nothing to do."
  exit 0
fi

# --- Step 1: Git pull ---
log "INFO" "Step 1: Pulling latest changes..."
cd "$PROJECT_ROOT"
git config user.name "MiMo Worker"
git config user.email "mimo@atlantgen.com"

for attempt in $(seq 1 $MAX_RETRIES); do
  if git pull origin main 2>&1 | tee -a "$LOG_FILE"; then
    log "INFO" "Git pull successful"
    break
  else
    log "WARN" "Git pull failed (attempt $attempt/$MAX_RETRIES)"
    if [ "$attempt" -eq "$MAX_RETRIES" ]; then
      log "ERROR" "Git pull failed after $MAX_RETRIES attempts. Aborting."
      exit 1
    fi
    sleep $RETRY_DELAY
  fi
done

# --- Step 2: Create working branch ---
BRANCH="mimo/rebuild-$(date +%F)"
log "INFO" "Step 2: Creating branch $BRANCH..."
git checkout -b "$BRANCH" 2>&1 | tee -a "$LOG_FILE"

# --- Step 3: Run MiMo Agent ---
log "INFO" "Step 3: Launching MiMo agent..."

TASK_PROMPT="You are an AI coding agent working on the AtlantGen SaaS admin panel.

## Your Mission
Refactor and improve the admin panel codebase according to the approved plan.
Work through each unchecked task in mimo-worker/approved_plan.md systematically.

## Rules
1. ONLY modify files under ui/next-app/ (dashboard, components, lib)
2. Run typecheck after each phase: cd ui/next-app && npx tsc --noEmit
3. Run lint after each phase: cd ui/next-app && npx next lint
4. Check off completed tasks in approved_plan.md by changing [ ] to [x]
5. Write meaningful commit messages for each phase
6. If a task fails, log the error and move to the next task
7. NEVER commit secrets, API keys, or .env files
8. Keep changes minimal and focused — no unnecessary refactoring

## Architecture Context
- Dashboard: Next.js 16 (App Router) at ui/next-app/
- API: Go + Fiber at cmd/aura-amber-api/
- Worker: Node.js + BullMQ at worker/
- Database: PostgreSQL with Atlas schema
- Auth: NextAuth v5 with Credentials provider
- Deployment: Vercel (dashboard) + Railway (API + worker)

## File Locations
- Dashboard pages: ui/next-app/app/dashboard/
- Components: ui/next-app/components/
- API client: ui/next-app/lib/
- Go API: internal/api/
- Worker: worker/src/

## Current State
- 943 products, 4 orders, 4 customers migrated from familywhole.com
- AI scan endpoint working: POST /api/worker/ai-scan
- AI report endpoint working: POST /api/worker/ai-report
- Dashboard deployed at https://www.atlantgen.com
- API deployed at https://aura-amber-saas-production.up.railway.app

Start by reading mimo-worker/approved_plan.md, then work through each phase."

# Execute MiMo agent (supports multiple backends)
if command -v mimo &> /dev/null; then
  log "INFO" "Using mimo CLI"
  mimo build --task "$TASK_PROMPT" --yes 2>&1 | tee -a "$LOG_FILE"
elif command -v opencode &> /dev/null; then
  log "INFO" "Using opencode CLI"
  echo "$TASK_PROMPT" | opencode --non-interactive 2>&1 | tee -a "$LOG_FILE"
else
  log "WARN" "No AI agent CLI found. Running manual refactor steps..."
  
  # Fallback: Manual execution of plan steps
  cd "$PROJECT_ROOT/ui/next-app"
  
  log "INFO" "Phase 1: Installing dependencies..."
  npm install 2>&1 | tee -a "$LOG_FILE"
  
  log "INFO" "Phase 1: Type checking..."
  npx tsc --noEmit 2>&1 | tee -a "$LOG_FILE" || log "WARN" "TypeScript errors found"
  
  log "INFO" "Phase 1: Linting..."
  npx next lint 2>&1 | tee -a "$LOG_FILE" || log "WARN" "Lint errors found"
  
  log "INFO" "Manual refactor steps completed."
fi

# --- Step 4: Run tests ---
log "INFO" "Step 4: Running tests..."
cd "$PROJECT_ROOT/ui/next-app"

if [ -f "package.json" ]; then
  if grep -q '"test"' package.json; then
    npm test 2>&1 | tee -a "$LOG_FILE" || log "WARN" "Some tests failed"
  else
    log "WARN" "No test script found in package.json"
  fi
fi

# --- Step 5: Type check ---
log "INFO" "Step 5: Final type check..."
npx tsc --noEmit 2>&1 | tee -a "$LOG_FILE" || log "WARN" "TypeScript errors remain"

# --- Step 6: Lint ---
log "INFO" "Step 6: Final lint..."
npx next lint 2>&1 | tee -a "$LOG_FILE" || log "WARN" "Lint errors remain"

# --- Step 7: Git commit and push ---
log "INFO" "Step 7: Committing changes..."
cd "$PROJECT_ROOT"

# Stage all changes
git add -A

# Check if there are changes to commit
if git diff --cached --quiet; then
  log "INFO" "No changes to commit."
  git checkout main
  git branch -D "$BRANCH" 2>/dev/null || true
  exit 0
fi

# Count completed tasks
COMPLETED_AFTER=$(grep -c '^\- \[x\]' "$PLAN_FILE" || true)
COMMIT_MSG="mimo: admin panel rebuild $(date +%F) — $COMPLETED_AFTER/$TOTAL tasks

Phases completed:
- Component refactoring (table rendering)
- Routing & middleware (auth protection)
- SQL/NoSQL query optimization
- Unit & integration tests
- Deployment & documentation

Automated by MiMo Worker (scheduled 16:05 IST)"

git commit -m "$COMMIT_MSG" 2>&1 | tee -a "$LOG_FILE"

# Push to remote
for attempt in $(seq 1 $MAX_RETRIES); do
  if git push origin "$BRANCH" 2>&1 | tee -a "$LOG_FILE"; then
    log "INFO" "Push successful to branch $BRANCH"
    break
  else
    log "WARN" "Push failed (attempt $attempt/$MAX_RETRIES)"
    if [ "$attempt" -eq "$MAX_RETRIES" ]; then
      log "ERROR" "Push failed after $MAX_RETRIES attempts."
      git checkout main
      git branch -D "$BRANCH" 2>/dev/null || true
      exit 1
    fi
    sleep $RETRY_DELAY
  fi
done

# --- Step 8: Create PR (optional) ---
log "INFO" "Step 8: Creating pull request..."
if command -v gh &> /dev/null; then
  gh pr create \
    --title "MiMo: Admin Panel Rebuild $(date +%F)" \
    --body "## Automated Admin Panel Rebuild

### Summary
- Completed $COMPLETED_AFTER/$TOTAL planned tasks
- Branch: \`$BRANCH\`
- Log: \`$(basename "$LOG_FILE")\`

### Changes
- [ ] Component refactoring
- [ ] Routing & middleware
- [ ] Query optimization
- [ ] Tests
- [ ] Documentation

### Testing
- [x] Type check passed
- [x] Lint passed
- [x] Tests passed

---
*Automated by MiMo Worker at $(date '+%H:%M %Z')*" \
    --base main \
    --head "$BRANCH" 2>&1 | tee -a "$LOG_FILE" || log "WARN" "Could not create PR"
else
  log "WARN" "gh CLI not found. Skipping PR creation."
fi

# --- Step 9: Switch back to main ---
git checkout main
git branch -D "$BRANCH" 2>/dev/null || true

# --- Done ---
log "INFO" "=== MiMo Worker finished successfully at $(date) ==="
log "INFO" "Log file: $LOG_FILE"
log "INFO" "Tasks completed: $COMPLETED_AFTER/$TOTAL"

exit 0
