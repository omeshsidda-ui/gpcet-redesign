# Changelog

All notable changes to the GPCET Redesign project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2026-11-26

### Changed & Cleaned
- **Crimson-Red UI Redesign & Official Crest (`b4b801d`)**: Introduced the official GPCET square crest (`public/assets/brand/gpcet-logo.png`) and wordmark (`public/assets/brand/gpcet-wordmark.png`), crimson/ruby masthead (`--ruby: #8B0E1A`, `--brand-crimson: #B12B2C`, `--burgundy: #6E0A14`) on warm ivory (`--bg: #FCF9F7`, `--surface: #F5EFEA`), 46/54 homepage campus photograph spread, and native `<dialog>` modals for compact navigation and search.
- **Live Supabase Provisioning**: Provisioned Supabase project `gpcet-redesign` (`ref: qoodtfpikxrfqdaxndem`, Mumbai `ap-south-1`) with migrations applied and 8 departments, 452 faculty profiles, and 5,822 documents seeded; guarded placeholder credentials in `src/lib/data/documents.js` (`5597a71`) and updated CI test glob (`e4dc76a`).
- **Repository Cleanup & Documentation Sync**: Removed legacy `.orca/`, `scripts/orca-squad.ps1`, and `.agents/skills/orca-*`; untracked `tsconfig.tsbuildinfo` via `.gitignore`; synchronized `AGENTS.md`, `GEMINI.md`, `README.md`, `PROJECT_CONTEXT.md`, `NEXTJS_REDESIGN_PLAN.md`, `SESSION_HANDOFF.md`, and `docs/` (`PLAN.md`, `TODO.md`, `ARCHITECTURE.md`, `CHANGELOG.md`).

---

## [1.0.0] - 2026-11-26

### Added
- **Documentation & Context Synchronization Suite**:
  - Implemented custom `.agents/skills/docs-sync/` skill to eliminate documentation drift between code and documentation.
  - Installed `documentation-and-adrs` (`addyosmani/agent-skills`) for ADR and API documentation standards.
  - Installed `adr-skill` (`skillrecordings/adr-skill`) for structured architectural decision recording.
  - Installed `create-project` and `go-project` (`hrdtbs/agent-skills`) for multi-session agent task continuity.
  - Created authoritative documentation repository in `docs/`:
    - `docs/ARCHITECTURE.md`: High-level system architecture, Next.js 15 Server Components, and data flows.
    - `docs/DATABASE.md`: Relational PostgreSQL schema, indexes, and Supabase RLS security policies.
    - `docs/API.md`: Public REST API contracts, query parameters, and RFC 9457 error envelopes.
    - `docs/BUSINESS_LOGIC.md`: Departmental hierarchy, faculty designation orders, and syllabus conventions.
    - `docs/decisions/001-database-choice.md`: ADR on hybrid JSON/Markdown with Supabase.
    - `docs/decisions/002-auth-architecture.md`: ADR on `@supabase/ssr` HttpOnly cookies.
    - `docs/decisions/003-nextjs-app-router-migration.md`: ADR on Next.js 15 App Router overhaul.
  - Initialized `SESSION_HANDOFF.md` for seamless context transfer between AI agent coding sessions.
- **Application Security & SAST Suite**:
  - Installed `security-review` (Sentry) for interprocedural attacker-input tracing.
  - Installed `code-security` & `semgrep` (Semgrep) for secure coding rules and static analysis.
  - Installed `codeql`, `sharp-edges`, `supply-chain-risk-auditor`, `audit-context-building`, and `sarif-parsing` (Trail of Bits).
  - Installed `secret-scanning` (GitHub) and `owasp-top-10` (Microsoft / OWASP 2025).
  - Integrated `supabase` & `supabase-postgres-best-practices` for RLS policy enforcement.
- **Frontend Design & Anti-AI-Slop Suite**:
  - Installed `frontend-design` (Anthropic), `frontend-app-builder` (OpenAI), `design-taste-frontend` (Leonxlnx), `impeccable` (pbakaus), and `web-design-guidelines` (Vercel).
  - Configured project-wide rules in `AGENTS.md` and `GEMINI.md`.
- **Production-Grade Backend Architecture & Subagent Framework**:
  - Authored comprehensive PostgreSQL 15 schema, Supavisor connection pooler setup, GIN `fts_vector` full-text search, trigram autocomplete, audit triggers, and hardened RLS policies in `docs/DATABASE.md`.
  - Authored production REST API specification conforming to RFC 9457 Problem Details, OpenAPI 3.1, Zod validation schemas, Upstash rate limiting, and edge caching in `docs/API.md`.
  - Authored production enterprise architecture specification with layered component boundaries, fail-safe hybrid data pattern, and durable workflow sync in `docs/ARCHITECTURE.md`.
  - Created ADR-004 (`docs/decisions/004-durable-workflow-and-cache-invalidation.md`): Vercel Workflow SDK for durable scraper refresh and `revalidateTag()` invalidation.
  - Created ADR-005 (`docs/decisions/005-fail-safe-hybrid-data-access-pattern.md`): Fail-Safe Hybrid Pattern combining PostgreSQL with offline JSON fallback for 100% uptime.
  - Authored Master Implementation & Multi-Subagent Orchestration Plan (`docs/PLAN.md`) establishing 6 specialized subagents (Alpha: Database, Beta: API, Gamma: Data Layer, Delta: Workflow, Epsilon: Frontend, Zeta: Security/QA) with rigid acceptance criteria and quality gates.
  - Updated `docs/TODO.md` with detailed subagent responsibility matrix and sprint milestones.
- **Backend Implementation & Database Verification**:
  - Scaffolded declarative PostgreSQL 15 migrations in `supabase/migrations/` (`core_schema.sql`, `indexes.sql`, `rls_policies.sql`, `triggers.sql`).
  - Resolved critical schema constraints: corrected `faculty.profile_route` nullability, `highest_qualification` defaults, expanded `academic_documents.category` check constraint to match all 14 categories in `media-manifest.json`, and upgraded `audit_logs.record_id` to `TEXT` for universal table support.
  - Hardened Row Level Security (RLS) in `supabase/migrations/20261102000003_rls_policies.sql` with `public.is_staff()` bypasses on SELECT policies to eliminate update/select deadlocks on deactivated and draft records.
  - Implemented `scripts/seed-supabase.js` and generated idempotent seed SQL in `supabase/seed.sql` with 8 departments, 452 faculty profiles, and core documents.
  - Implemented RFC 9457 Problem Details factory and Zod error parser in `src/lib/api/problem.js`.
  - Implemented comprehensive Zod validation schemas in `src/lib/validations/` (`faculty.schema.js`, `document.schema.js`, `notice.schema.js`, `inquiry.schema.js`).
  - Implemented Fail-Safe Data Access Layer in `src/lib/data/` (`faculty.js`, `documents.js`, `departments.js`, `notices.js`) guaranteeing 100% uptime with offline JSON fallback.
  - Authored and verified 29 automated tests in `tests/*.test.js` (`data-normalization`, `api-problem`, `zod-validation`, `database-schema-integrity`, `hybrid-data-layer`).
- **Content Ingestion Pipeline, Table AST Normalization & Dynamic Catch-All Routing (Agent 2)**:
  - Implemented `src/lib/validations/content.schema.ts` (`ContentFrontmatterSchema`, `ContentPageSchema`) validating frontmatter attributes across all ingested markdown pages.
  - Implemented `src/lib/content.ts` with `getAllContentRoutes()`, `getContentBySlug()`, `getCategoryBreadcrumbs()`, `generateTableOfContents()`, and `findClosestRoutes()` fuzzy route matching.
  - Implemented `src/components/content/MarkdownRenderer.tsx` featuring Avada compressed pipe-table row normalization (`| |` -> `|\n|`), responsive overflow wrapper with sticky first column, auto-linking of PDF assets with `rel="noopener noreferrer"` and visual badges, and strict `rehype-sanitize` XSS protection.
  - Implemented Next.js 15 dynamic catch-all route `src/app/[...slug]/page.tsx` with `generateStaticParams()`, dynamic `generateMetadata()` for OpenGraph/canonical SEO, and sticky Table of Contents anchor navigation.
  - Implemented `src/app/[...slug]/layout.tsx` with clean institutional reading shell and `src/app/[...slug]/not-found.tsx` with institutional 404 recovery suggestions.
  - Created ADR-006 (`docs/decisions/006-markdown-ast-rendering-and-table-normalization.md`).
  - Authored automated test suite `tests/content-pipeline.test.js` (10/10 tests passing; 100% of 1,256 markdown pages resolve without runtime parsing errors; all 636 academic data tables render cleanly; 39/39 total tests passing).

---

## [1.0.0] - 2026-11-26

### Added
- **Phase 3 Durable WordPress Notice Sync (`src/lib/workflow/sync-notices.ts`, `src/app/api/v1/admin/sync/notices/route.ts`)**:
  - Implemented 4-step Vercel Workflow SDK (`"use workflow"` / `"use step"`) pipeline: `fetchLatestWpPosts` (with `RetryableError` exponential backoff and offline fallback), `cleanAndNormalizePost` (Cheerio + Turndown stripping `[fusion_*]` / `[vc_*]` shortcodes and extracting PDF attachments), `upsertNoticeRecord` (Supabase `notices` upsert with offline skip), and `revalidateApplicationTags` (`revalidateTag('notices')` / `revalidateTag('documents')`).
  - Secured `POST /api/v1/admin/sync/notices` with timing-safe Bearer token verification (`ADMIN_SYNC_TOKEN` / `CRON_SECRET`) and Supabase SSR `app_metadata.role` (`admin` / `editor`) authorization, returning HTTP `202 Accepted`.
  - Added automated test coverage in `tests/sync-notices.test.js`.
- **Phase 4 Global Institutional Shell & Design System (`src/app/layout.tsx`, `src/components/global/`)**:
  - Implemented `TopInstitutionalBar.tsx`, `InstitutionalNavbar.tsx` (accessible desktop mega-menus & mobile sheet drawer), `GlobalSearchModal.tsx` (`Cmd+K` MiniSearch command palette with deferred 452-faculty indexing), and `InstitutionalFooter.tsx` (statutory seals and RTI disclosures).
  - Configured Google Fonts (`Newsreader`, `Plus_Jakarta_Sans`, `JetBrains_Mono`), accessible skip-to-content link, and 75/20/5 design tokens in `src/app/globals.css`.
- **Phase 5 Institutional Pages, Department Portals & Accreditation Hub**:
  - Implemented `src/app/page.tsx` featuring `AsymmetricHeroSpread`, `LiveAcademicGazette`, `DepartmentalMatrix`, `LeadershipDiscourse`, and `ResearchExcellenceBand`.
  - Implemented 8-department portal routes under `src/app/departments/` (`page.tsx`, `[dept]/layout.tsx`, `[dept]/page.tsx`, `faculty/page.tsx`, `faculty/[slug]/page.tsx`, `laboratories/page.tsx`, `board-of-studies/page.tsx`, `syllabus/page.tsx`, `events/page.tsx`) with `DepartmentHeader`, `DepartmentTabs`, `FacultyRosterTable`, and `FacultyProfileView`.
  - Implemented Central Syllabus & Document Vault (`src/app/documents/page.tsx`, `DocumentVaultClient.tsx`, `DocumentRow.tsx`) with instant MiniSearch faceted filtering across 5,822 cataloged items.
  - Implemented Accreditation Hub (`src/app/accreditation/page.tsx`, `nba/page.tsx`, `naac/page.tsx`, `naac/[criteria]/page.tsx`) backed by `src/lib/naac-data.ts` covering all 48 NAAC SSR metrics across Criteria 1–7.
  - Implemented `src/app/administration/page.tsx`, `src/app/campus-life/page.tsx`, `src/app/admissions/page.tsx` (`AdmissionsInquiryForm.tsx`), `src/app/placements/page.tsx`, and institutional content/sanitization helpers in `src/lib/institutional-content.ts`.
- **Phase 6 Staff Admin CMS & Production Cutover (`src/app/admin/`, `docs/decisions/006-production-cms-cutover.md`)**:
  - Built authenticated Staff CMS portal (`/admin`, `/admin/login`, `/admin/notices`, `/admin/notices/new`, `/admin/notices/[id]`, `/admin/faculty`) with `AdminSidebarNav`, `AdminLoginForm`, `AdminForbidden`, `CmsModeToggle`, `NoticeListClient`, `NoticeEditorForm` (with live `MarkdownRenderer` preview), and `FacultyEditorClient`.
  - Implemented `src/lib/auth/admin-auth.ts` (`getAdminSession`, `requireStaffSession` validating `app_metadata.role` exclusively) and CSRF-protected Server Actions in `src/lib/actions/admin-actions.ts` with Zod validation and on-demand `revalidateTag()` invalidation.
- **Phase 6 Edge Security Middleware, QA & Accessibility Hardening**:
  - Implemented `src/middleware.ts` enforcing `Content-Security-Policy` (dev-only `'unsafe-eval'`, static-SSG-compatible `'unsafe-inline'` without nonce conflict), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, and Supabase SSR session cookie refresh on `/admin/:path*`.
  - Added `tests/security-and-pages.test.js` covering Edge security headers, `/api/v1/inquiries` sliding-window rate limiting (429 `RATE_LIMIT_EXCEEDED`), client-bundle `SUPABASE_SERVICE_ROLE_KEY` isolation, NAAC/department/markdown invariants, WCAG AA / anti-slop structural checks, and `next.config.ts` reserved route protection (81/81 tests passing via `npm test`).

### Security & Quality Fixes
- Hardened `next.config.ts` `getLegacyRedirects()` with `RESERVED_APP_ROUTES` / `isReservedAppRoute()` so legacy WordPress mappings (`/` and `/accreditation`) never shadow first-class App Router pages.
- Hardened `sanitizeScrapedMarkdown()` in `src/lib/institutional-content.ts` to strip `<script>`, `<iframe>`, `javascript:` URIs, and Avada `[fusion_*]` / `[vc_*]` shortcodes before Markdown AST rendering.
- Removed anti-slop violations: eliminated the cosmetic status dot from `TopInstitutionalBar.tsx` and `backdrop-blur-sm` scrims from `InstitutionalNavbar.tsx` and `GlobalSearchModal.tsx`.

---

## [0.2.0] - 2026-10-31

### Added
- **Completed Offline Content Extraction Pipeline**:
  - Snapshotted all 928 raw WordPress pages and 5,253 media records in `/cache`.
  - Generated 936 clean GitHub-Flavored Markdown files with YAML frontmatter in `/content`.
  - Aggregated and deduplicated 452 faculty profiles across 8 departments into `src/data/faculty/*.json`.
  - Cataloged 5,822 documents into `src/data/media-manifest.json`.
  - Generated 2,784 URL mappings in `src/data/url-map.json`.
  - Downloaded institutional crests, NAAC A+ seal, NBA logo, and campus photos into `public/assets/`.
- Authored initial blueprints: `PROJECT_CONTEXT.md` and `NEXTJS_REDESIGN_PLAN.md`.

---

## [0.1.0] - 2026-10-30

### Initialized
- Initial repository setup and Node.js scraper prototype for `gpcet.ac.in`.
