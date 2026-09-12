# Approved Plan — AtlantGen SaaS Admin Panel Rebuild

> **Schedule:** Daily at 16:05 IST (Europe/Dublin)
> **Worker:** MiMo AI Agent via EasyWorker/Cron
> **Timeout:** 5 hours (300 minutes)
> **Auto-commit:** Yes, only on success

---

## Phase 1: Component Refactoring (Optimize Table Rendering)
- [ ] 1.1 Audit all dashboard table components for unnecessary re-renders
- [ ] 1.2 Implement React.memo + useMemo for product/order/customer tables
- [ ] 1.3 Add virtual scrolling for large datasets (1000+ rows)
- [ ] 1.4 Extract reusable `DataTable` component with sorting/filtering/pagination
- [ ] 1.5 Add skeleton loading states for all table views
- [ ] 1.6 Test: Verify no regressions in existing table functionality

## Phase 2: Routing & Middleware (Admin Panel Protection)
- [ ] 2.1 Audit all `/dashboard/*` routes for auth middleware coverage
- [ ] 2.2 Add role-based access control (admin vs viewer)
- [ ] 2.3 Implement session refresh on protected routes
- [ ] 2.4 Add rate limiting to API endpoints from dashboard
- [ ] 2.5 Implement CSRF protection for mutation endpoints
- [ ] 2.6 Test: Verify unauthorized access is blocked

## Phase 3: SQL/NoSQL Query Optimization
- [ ] 3.1 Add database indexes for frequently queried columns
- [ ] 3.2 Optimize products listing query (JOIN vs subquery)
- [ ] 3.3 Implement query result caching with Redis (TTL: 60s)
- [ ] 3.4 Add connection pooling configuration
- [ ] 3.5 Implement pagination cursors instead of OFFSET/LIMIT
- [ ] 3.6 Test: Benchmark query performance before/after

## Phase 4: Unit & Integration Tests
- [ ] 4.1 Write unit tests for `DataTable` component
- [ ] 4.2 Write unit tests for auth middleware
- [ ] 4.3 Write integration tests for migration API endpoints
- [ ] 4.4 Write integration tests for AI scan/report endpoints
- [ ] 4.5 Add test coverage reporting (target: 80%+)
- [ ] 4.6 Test: All tests pass in CI

## Phase 5: Deployment & Documentation
- [ ] 5.1 Update ARCHITECTURE.md with new component structure
- [ ] 5.2 Add API documentation for new endpoints
- [ ] 5.3 Update README.md with deployment instructions
- [ ] 5.4 Create CHANGELOG.md entry for this rebuild
- [ ] 5.5 Verify all deployments (Vercel + Railway) work
- [ ] 5.6 Test: Full end-to-end migration flow works

---

## Success Criteria
- [ ] All checkboxes above are checked
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No lint errors (`npm run lint`)
- [ ] All tests pass (`npm test`)
- [ ] Dashboard loads in < 2 seconds
- [ ] API response times < 500ms for common queries
- [ ] Git commit message follows conventional commits format

## Rollback Plan
If any step fails:
1. Revert the last commit: `git revert HEAD`
2. Push revert: `git push origin main`
3. Notify via webhook (if configured)
