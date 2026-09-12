# MiMo Worker — Automated SaaS Admin Panel Rebuild

> AI-powered automated code refactoring for SaaS admin panels.

## What It Does

Runs daily at **16:05 IST (Europe/Dublin)** to automatically:

1. **Pull** latest code from your repo
2. **Read** the approved plan (`approved_plan.md`)
3. **Execute** MiMo AI agent to refactor code per plan
4. **Test** changes (typecheck, lint, tests)
5. **Commit & Push** clean code to a new branch
6. **Create PR** for human review

## Quick Start

### 1. Clone & Configure

```bash
git clone https://github.com/aurora-ember-bio-lab/mimo-worker.git
cd mimo-worker
```

### 2. Edit the Plan

Open `approved_plan.md` and customize the tasks for your SaaS:

```markdown
## Phase 1: Component Refactoring
- [ ] 1.1 Your first task
- [ ] 1.2 Your second task
```

### 3. Setup GitHub Actions

Copy `.github/workflows/mimo-worker.yml` to your project's `.github/workflows/` directory.

### 4. Run Manually

```bash
chmod +x run-mimo-scheduled.sh
./run-mimo-scheduled.sh
```

### 5. Automatic Daily Runs

The GitHub Action runs automatically at 16:05 IST daily. You can also trigger it manually from the Actions tab.

## Files

| File | Description |
|------|-------------|
| `approved_plan.md` | Task checklist for the AI agent |
| `run-mimo-scheduled.sh` | Main automation script |
| `easyworker-config.json` | Scheduler configuration |
| `.github/workflows/mimo-worker.yml` | GitHub Actions workflow |

## Configuration

### easyworker-config.json

```json
{
  "task_name": "mimo-saas-admin-rebuild",
  "schedule": "5 16 * * *",
  "timezone": "Europe/Dublin",
  "timeout_minutes": 300
}
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TZ` | `Europe/Dublin` | Timezone for scheduling |
| `GIT_AUTHOR_NAME` | `MiMo Worker` | Git commit author |
| `GIT_AUTHOR_EMAIL` | `mimo@atlantgen.com` | Git commit email |

## How It Works

```
16:05 IST ──► git pull ──► MiMo Agent ──► tests ──► git push ──► PR created
                │                              │
                ▼                              ▼
          Read plan.md                   Typecheck + Lint
          Check remaining tasks          Run unit tests
```

## Customization

### Change Schedule

Edit `.github/workflows/mimo-worker.yml`:

```yaml
schedule:
  # Run at 2 AM UTC every day
  - cron: '0 2 * * *'
```

### Add Notification Webhook

Edit `easyworker-config.json`:

```json
{
  "notifications": {
    "webhook_url": "https://your-slack-webhook.com/..."
  }
}
```

### Force Run

Trigger manually from GitHub Actions tab, or:

```bash
gh workflow run mimo-worker.yml -f force_run=true
```

## License

MIT — Use freely in your projects.
