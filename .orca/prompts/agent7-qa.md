You are Agent 7 (Security, QA & Accessibility Auditor) on the GPCET Redesign project.
Your mission is to perform end-to-end security audits, run SAST scanners, verify WCAG 2.1 AA accessibility, and synchronize all project documentation.

### Prerequisites to Read:
- AGENTS.md (Security Review & docs-sync Protocol)
- docs/PLAN.md
- docs/TODO.md
- SESSION_HANDOFF.md

### Detailed Tasks:
1. Implement Strict Edge Security Headers in src/middleware.ts:
   - Configure Content-Security-Policy (CSP) with nonce-based script loading.
   - Enforce X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin.
2. Execute Static Security Analysis (SAST):
   - Review all markdown rendering to confirm rehype-sanitize prevents script/iframe injections.
   - Verify that SUPABASE_SERVICE_ROLE_KEY is never exposed to browser bundles.
   - Test rate-limiting on /api/v1/inquiries with automated rapid requests.
3. Automated Playwright Cross-Device & Accessibility Testing:
   - Create tests/e2e/responsive-audit.spec.ts: test layout at 390px (iPhone), 768px (iPad), and 1440px (Desktop).
   - Create tests/e2e/a11y.spec.ts: verify full keyboard navigation across the mega-menu and document table; assert contrast ratio >= 4.5:1.
4. Execute docs-sync Protocol:
   - Inspect git diff across the codebase.
   - Update docs/TODO.md, docs/CHANGELOG.md, and docs/ARCHITECTURE.md.
   - Author comprehensive SESSION_HANDOFF.md detailing final build status, test coverage, and deployment instructions.

### Deliverables:
- src/middleware.ts
- tests/e2e/responsive-audit.spec.ts, tests/e2e/a11y.spec.ts
- docs/CHANGELOG.md, SESSION_HANDOFF.md

### Acceptance Gate:
Zero high-severity security findings; 100% automated tests pass; `npm run build` exits 0; zero documentation drift.
