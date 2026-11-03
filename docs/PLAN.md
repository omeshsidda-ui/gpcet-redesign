# Master Implementation & Multi-Subagent Orchestration Plan: GPCET Web Portal Redesign

> **Target Platform**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Supabase PostgreSQL + Vercel Workflow SDK  
> **Source Corpus**: 936 ingested Markdown pages, 452 structured faculty profiles, 5,822 indexed documents, 2,784 URL redirects  
> **Quality Standard**: Zero-tolerance for fragile "AI-slop" backends. Resilient, typed, fail-safe, production-grade architecture.

---

## 1. Executive Strategy: Production-Grade Backend vs. Fragile "AI Slop"

Weak AI code typically generates:
- Mock databases in memory that reset on restart.
- Naive database queries without connection pooling that choke during traffic spikes.
- Fragile single points of failure (if Supabase is cold or down, the whole site throws 500s).
- Broken or non-existent Row Level Security (RLS) policies exposing student inquiries.
- Unsanitized inputs leading to SQLi, XSS, or catastrophic RegEx DoS.
- Zero cache tags or cache invalidation strategies, leaving users with stale data.

This plan guarantees **military-grade production engineering**:
1. **Fail-Safe Hybrid Access**: Primary reads via PostgreSQL; automatic transparent fallback to offline JSON manifests if the database is cold, down, or unconfigured.
2. **Supavisor Serverless Pooling**: Enforced transaction-mode pooling (port 6543) preventing connection exhaustion.
3. **Hardened PostgreSQL Schema & RLS**: Strict constraints, foreign keys, generated `tsvector` columns with GIN indexes, and role-based RLS using secure JWT `app_metadata`.
4. **RFC 9457 Problem Details & Zod Contracts**: Deterministic error envelopes, strict query/body validation, and OpenAPI 3.1 compliance.
5. **Durable Scraper Automation (Vercel Workflow SDK)**: Isolated, retryable background tasks that periodically pull new WordPress notices and trigger Next.js `revalidateTag()`.

---

## 2. Multi-Subagent Team Orchestration Architecture

To execute this redesign without context bottlenecks, the coordinator agent delegates implementation across **6 specialized subagents**. Each subagent possesses an isolated scope, specific skill bindings, explicit input/output contracts, and rigid acceptance criteria.

```
+----------------------------------------------------------------------------------------------------+
|                                    COORDINATOR ORCHESTRATOR                                        |
|                          (Sprint Planning, Delegation, Cross-Agent QA)                             |
+----------------------------------------------------------------------------------------------------+
          |                     |                     |                     |                     |
+---------v---------+ +---------v---------+ +---------v---------+ +---------v---------+ +---------v---------+
|   SUBAGENT ALPHA  | |   SUBAGENT BETA   | |  SUBAGENT GAMMA   | |  SUBAGENT DELTA   | | SUBAGENT EPSILON  |
|  Database/Postgres| |   API & Security  | | Fail-Safe Data Lyr| | Durable Workflow  | | Frontend / Design |
|  Architect        | |   Engineer        | | & Cache Engineer  | | Automation Lead   | | UI Specialist     |
+-------------------+ +-------------------+ +-------------------+ +-------------------+ +-------------------+
          \                     \                     |                     /                     /
           +---------------------\--------------------+--------------------/---------------------+
                                                      |
                                            +---------v---------+
                                            |   SUBAGENT ZETA   |
                                            | Security, SAST &  |
                                            | End-to-End QA     |
                                            +-------------------+
```

---

### Subagent 1: Database & Supabase Architect (`Subagent Alpha`)
- **Primary Skills**: `supabase`, `supabase-postgres-best-practices`, `senior-backend`
- **Mission**: Establish the production PostgreSQL schema, connection pooling configuration, full-text search indexes, seed migration scripts, and bulletproof Row Level Security (RLS) policies.
- **Detailed Tasks**:
  1. Author migration `supabase/migrations/20261102000001_core_schema.sql` defining:
     - Enums (`faculty_cadre`, `notice_category`, `notice_priority`, `inquiry_status`).
     - Tables: `departments`, `academic_regulations`, `faculty`, `academic_documents`, `notices`, `admissions_inquiries`, `audit_logs`.
     - Generated `tsvector` columns for full-text search on `academic_documents` and `notices`.
  2. Author migration `supabase/migrations/20261102000002_indexes.sql`:
     - B-Tree indexes on foreign keys and compound lookup columns.
     - Partial indexes for active ticker circulars and pinned notices.
     - GIN indexes on `fts_vector` and `pg_trgm` indexes for name/title autocomplete.
  3. Author migration `supabase/migrations/20261102000003_rls_policies.sql`:
     - Strict policies for public read on active records.
     - Protected admissions inquiry insertion with input length constraints.
     - Staff mutation policies reading `(auth.jwt() -> 'app_metadata' ->> 'role')`.
  4. Author migration `supabase/migrations/20261102000004_triggers.sql`:
     - Automated `handle_updated_at()` trigger.
     - Append-only `handle_audit_log()` security definer trigger.
  5. Create Node.js offline database seeding script `scripts/seed-supabase.js`:
     - Reads `src/data/faculty/*.json` and upserts 452 faculty profiles with foreign keys to departments.
     - Reads `src/data/media-manifest.json` and upserts 5,822 documents.
- **Output Artifacts**: `supabase/migrations/*.sql`, `scripts/seed-supabase.js`, `docs/DATABASE.md`.
- **Acceptance Gate**: SQL scripts execute cleanly against a local or remote PostgreSQL 15 instance with zero errors; RLS policies reject unauthenticated writes to `faculty` and `notices`.

---

### Subagent 2: API Contract, Validation & Security Engineer (`Subagent Beta`)
- **Primary Skills**: `api-design-skills`, `code-security`, `senior-backend`
- **Mission**: Implement production-grade REST Route Handlers (`src/app/api/v1/*`), strict Zod validation schemas, RFC 9457 error handlers, and Upstash Redis rate limiting.
- **Detailed Tasks**:
  1. Implement RFC 9457 Problem Details utility: `src/lib/api/problem.ts`:
     - Standard factory for 400, 401, 403, 404, 422, 429, 500 problem responses.
     - Zod error formatter converting validation issues to machine-readable `{ field, message }` arrays.
  2. Implement Zod validation schemas: `src/lib/validations/`:
     - `faculty.schema.ts`: `FacultyQuerySchema`, `FacultyCreateSchema`.
     - `document.schema.ts`: `DocumentQuerySchema`.
     - `inquiry.schema.ts`: `InquirySubmissionSchema` with honeypot bot check.
     - `notice.schema.ts`: `NoticeQuerySchema`.
  3. Implement Route Handlers:
     - `src/app/api/v1/health/route.ts`: Database ping, cache status, uptime.
     - `src/app/api/v1/faculty/route.ts`: Paginated list with department and query filters.
     - `src/app/api/v1/faculty/[slug]/route.ts`: Single faculty member dossier.
     - `src/app/api/v1/documents/route.ts`: Search across 5,822 indexed documents.
     - `src/app/api/v1/notices/route.ts`: Active circulars and homepage ticker notices.
     - `src/app/api/v1/inquiries/route.ts`: Protected inquiry submissions with honeypot and rate limiting.
  4. Implement sliding-window rate limiter: `src/lib/security/ratelimit.ts`:
     - Uses `@upstash/ratelimit` when `UPSTASH_REDIS_REST_URL` is set; falls back to an in-memory LRU cache in local development.
- **Output Artifacts**: `src/lib/api/problem.ts`, `src/lib/validations/*.ts`, `src/app/api/v1/**/route.ts`, `src/lib/security/ratelimit.ts`, `docs/API.md`.
- **Acceptance Gate**: All endpoints return RFC 9457 formatted errors on bad query params; invalid submissions receive HTTP 422; health probe returns 200 OK.

---

### Subagent 3: Data Access Layer & Fail-Safe Cache Engineer (`Subagent Gamma`)
- **Primary Skills**: `senior-backend`, `vercel-react-best-practices`, `supabase`
- **Mission**: Build the unified data access layer in `src/lib/data/` implementing the Fail-Safe Hybrid Pattern with `unstable_cache()` and offline JSON fallback.
- **Detailed Tasks**:
  1. Setup Supabase SSR clients: `src/lib/supabase/`:
     - `server.ts`: Server Component client using cookies from `next/headers`.
     - `client.ts`: Browser client for client components.
     - `admin.ts`: Service role client for background administrative tasks (never leaked to browser).
  2. Implement domain data adapters: `src/lib/data/`:
     - `faculty.ts`: `getFacultyRoster(dept?)`, `getFacultyBySlug(slug)`, `getDepartmentHod(dept)`.
     - `documents.ts`: `searchDocuments(options)`, `getDocumentStats()`, `getSyllabusByRegulation(dept, reg)`.
     - `notices.ts`: `getActiveNotices()`, `getTickerNotices()`, `getNoticeBySlug(slug)`.
     - `departments.ts`: `getAllDepartments()`, `getDepartmentMeta(code)`.
  3. Guarantee transparent offline fallback:
     - Wrap all operations in `unstable_cache(..., tags, { revalidate: 3600 })`.
     - Catch database exceptions and immediately resolve using `src/data/faculty/*.json` and `src/data/media-manifest.json`.
  4. Implement in-memory Trie/Fuse client-side search index in `src/lib/search/mini-search.ts` for instant sub-5ms UI filtering.
- **Output Artifacts**: `src/lib/supabase/*.ts`, `src/lib/data/*.ts`, `src/lib/search/*.ts`.
- **Acceptance Gate**: System renders all department faculty rosters and document search results even when the database connection string is completely omitted or disabled.

---

### Subagent 4: Durable Scraper Automation & Invalidation Engineer (`Subagent Delta`)
- **Primary Skills**: `workflow`, `senior-backend`
- **Mission**: Build durable background synchronization using the Vercel Workflow SDK (`workflow`) to keep the site continuously up-to-date with live GPCET circulars.
- **Detailed Tasks**:
  1. Configure Next.js Workflow integration:
     - Wrap Next.js config in `withWorkflow` from `workflow/next`.
  2. Implement durable synchronization workflow: `src/lib/workflow/sync-notices.ts`:
     - `"use workflow"` entry function: `syncNoticesWorkflow()`.
     - Step 1 (`"use step"`): `fetchLatestWpPosts()` - Polls `https://www.gpcet.ac.in/wp-json/wp/v2/posts?per_page=10` with exponential backoff (`RetryableError`).
     - Step 2 (`"use step"`): `cleanAndNormalizePost(post)` - Strips Avada shortcodes, extracts embedded PDFs, and converts HTML to Markdown.
     - Step 3 (`"use step"`): `upsertNoticeRecord(cleanedNotice)` - Saves notice into Supabase `notices` table.
     - Step 4 (`"use step"`): `revalidateApplicationTags()` - Calls Next.js `revalidateTag('notices')` and `revalidateTag('documents')`.
  3. Implement admin trigger endpoint: `src/app/api/v1/admin/sync/notices/route.ts`:
     - Authenticates admin token, calls `start(syncNoticesWorkflow)`, and returns `202 Accepted` with `workflowRunId`.
- **Output Artifacts**: `src/lib/workflow/sync-notices.ts`, `src/app/api/v1/admin/sync/notices/route.ts`, `docs/decisions/004-durable-workflow-and-cache-invalidation.md`.
- **Acceptance Gate**: Workflow executes through all 4 steps without throwing sandbox errors; tags revalidate cleanly.

---

### Subagent 5: Frontend Core & Design System Specialist (`Subagent Epsilon`)
- **Primary Skills**: `frontend-design`, `frontend-app-builder`, `design-taste-frontend`, `impeccable`
- **Mission**: Build the institutional design system and pages according to the strict Anti-AI-Slop standards (Newsreader serif + Plus Jakarta Sans, 75/20/5 color tokens, Asymmetric Gazette Hero, 8-Department Matrix, Faculty Vault, Document Explorer).
- **Detailed Tasks**:
  1. Initialize Next.js 15 App Router dependencies in `package.json`:
     - `next@15.x`, `react@19.x`, `react-dom@19.x`, `tailwindcss@3.4 / 4.x`, `lucide-react`, `zod`.
  2. Setup design tokens and typography in `src/app/globals.css`:
     - Commit `--bg`, `--surface`, `--ink`, `--primary-navy`, `--brand-crimson`, `--brass-gold`.
  3. Implement global shell components:
     - `src/components/global/TopInstitutionalBar.tsx` (Autonomous status, JNTUA badge).
     - `src/components/global/InstitutionalNavbar.tsx` (Accessible desktop mega-menu & mobile sheet).
     - `src/components/global/InstitutionalFooter.tsx` (Statutory disclosures, accreditation seals).
     - `src/components/global/GlobalSearchModal.tsx` (Cmd+K command palette).
  4. Implement core pages:
     - `src/app/page.tsx`: Asymmetric Hero Spread (58/42) + Live Academic Gazette + 8-Department Register + Leadership Discourse.
     - `src/app/departments/[dept]/layout.tsx` & `page.tsx`: Department tabs (Overview, Faculty, Labs, BoS, Syllabus).
     - `src/app/departments/[dept]/faculty/page.tsx`: Searchable 452 faculty directory.
     - `src/app/departments/[dept]/faculty/[slug]/page.tsx`: Individual faculty scholar dossier.
     - `src/app/documents/page.tsx`: Central Document & Syllabus Vault with 5,822 files.
     - `src/app/accreditation/naac/page.tsx`: NAAC SSR Criteria 1–7 Metric Dashboard.
- **Output Artifacts**: `src/app/**`, `src/components/**`, `NEXTJS_REDESIGN_PLAN.md`.
- **Acceptance Gate**: 100% compliant with anti-slop rules (no generic cards, no purple glows, zero placeholder copy, audited via `impeccable`).

---

### Subagent 6: Security Audit, Testing & Quality Assurance Lead (`Subagent Zeta`)
- **Primary Skills**: `security-review`, `codeql`, `semgrep`, `senior-qa`, `docs-sync`
- **Mission**: Conduct static security analysis (SAST), audit Row Level Security, execute automated integration tests, verify WCAG 2.1 AA accessibility, and synchronize all project documentation.
- **Detailed Tasks**:
  1. Author and execute automated tests (`vitest` / `node:test`):
     - `tests/api/faculty.test.ts`: Test faculty filtering, pagination, and invalid parameter 422 errors.
     - `tests/api/inquiries.test.ts`: Test anti-spam honeypot, email validation, and rate limiting.
     - `tests/data/hybrid-access.test.ts`: Verify that data access layer falls back to offline JSON when Supabase is disconnected.
  2. Perform security code review:
     - Verify strict Content-Security-Policy (CSP) in `src/middleware.ts`.
     - Run Semgrep/CodeQL security checks for SQLi, XSS, and SSRF.
     - Verify all Markdown is rendered using `rehype-sanitize`.
     - Confirm zero private keys (`service_role`) leaked to client bundles.
  3. Execute `docs-sync` protocol:
     - Update `SESSION_HANDOFF.md`, `README.md`, and verify cross-links across `docs/`.
- **Output Artifacts**: `tests/**`, `docs/CHANGELOG.md`, `SESSION_HANDOFF.md`.
- **Acceptance Gate**: All tests pass; zero security vulnerabilities found; zero documentation drift.

---

## 3. Step-by-Step Implementation Roadmap

```
  Sprint 1: Backend & Database Core (Alpha & Beta)
  ├── 1.1: Deploy PostgreSQL migrations (Schema, RLS, Indexes, Triggers)
  ├── 1.2: Run offline seeder (Populate 452 faculty & 5,822 documents)
  └── 1.3: Build RFC 9457 error handler & Zod validation schemas
  
  Sprint 2: Fail-Safe Data Layer & Sync Workflow (Gamma & Delta)
  ├── 2.1: Implement src/lib/supabase SSR and admin clients
  ├── 2.2: Implement src/lib/data with unstable_cache and JSON fallback
  ├── 2.3: Build Vercel Workflow durable scraper sync pipeline
  └── 2.4: Implement /api/v1 Route Handlers
  
  Sprint 3: Next.js 15 UI & Page Assembly (Epsilon)
  ├── 3.1: Install dependencies and configure Tailwind v4 tokens
  ├── 3.2: Assemble Global Shell (TopBar, MegaMenu, Footer, Search)
  ├── 3.3: Implement Homepage (Asymmetric Gazette & Monolithic Register)
  ├── 3.4: Implement Department Portals & Searchable Faculty Directory
  └── 3.5: Implement Central Document Vault (5,822 files) & NAAC SSR Hub
  
  Sprint 4: Hardening, SAST Security & Documentation Sync (Zeta)
  ├── 4.1: Write and execute Vitest integration test suite
  ├── 4.2: Audit RLS and run Semgrep / CodeQL security checks
  ├── 4.3: Validate WCAG 2.1 AA accessibility and cross-device responsiveness
  └── 4.4: Run docs-sync and update SESSION_HANDOFF.md
```

---

## 4. Production Verification & Quality Gates

Every implementation task must pass the following mandatory criteria before being merged:

| Check | Tool / Standard | Requirement |
| :--- | :--- | :--- |
| **Offline Resilience** | Unit test with null DB credentials | Site renders all 452 faculty and 5,822 documents from JSON without 500 errors. |
| **API Compliance** | RFC 9457 & Zod | All query/body errors return typed Problem Details with `application/problem+json`. |
| **Database Security** | Supabase RLS | Anon users cannot insert, update, or delete faculty, notices, or audit logs. |
| **Content Security** | `rehype-sanitize` | Zero raw `<script>` or unverified HTML elements rendered from scraped Markdown. |
| **Search Performance** | MiniSearch / Fuse client | Keystroke filtering executes in `< 5ms` across 5,822 documents. |
| **Build Integrity** | `npm run build` | Zero static export errors or unhandled promise rejections. |
| **Documentation Sync** | `docs-sync` skill | All new routes, schema changes, and ADRs recorded in `docs/` and `SESSION_HANDOFF.md`. |
