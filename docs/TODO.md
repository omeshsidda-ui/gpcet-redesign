# Actionable Implementation Checklist: GPCET Redesign

## Next Immediate Steps (Coordinator Final Acceptance Gate & Production Cutover)
> **Action 1 (Final Acceptance Gate)**: Run `npm test && npm run test:contracts && npx tsc --noEmit && npm run build` and verify live `npm run start` HTTP smoke checks across public and admin routes.
> **Action 2 (Production Deployment & CMS Cutover)**: Apply `supabase/migrations/*.sql`, generate and execute `supabase/seed.sql` via `npm run seed:generate`, configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `ADMIN_SYNC_TOKEN`, then switch `/admin#cutover-settings` to Native CMS Mode per [ADR-006](./decisions/006-production-cms-cutover.md).

---

## Subagent Responsibility Matrix

| Subagent | Role & Primary Skills | Core Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Alpha** | Database Architect (`supabase`, `supabase-postgres-best-practices`) | Migrations, RLS, Indexes, Triggers, Seeder script (`supabase/seed.sql`) | 🟢 Complete & Verified |
| **Beta (Agent 3)** | API, Search & Storage Lead (`api-design-skills`, `code-security`) | REST Handlers (`health`, `faculty`, `documents`, `notices`, `inquiries`, `assets/proxy`), MiniSearch lean index (<180 KB), Storage migration | 🟢 Complete & Verified |
| **Gamma** | Data Layer & Cache Engineer (`senior-backend`, `vercel-react-best-practices`) | `src/lib/data/`, Fail-safe offline fallback (452 faculty, 5,822 docs) | 🟢 Complete & Verified |
| **Delta** | Durable Workflow Lead (`workflow`, `senior-backend`) | `src/lib/workflow/sync-notices.ts`, `src/app/api/v1/admin/sync/notices/route.ts`, cache invalidation | 🟢 Complete & Verified |
| **Epsilon** | Frontend Design Specialist (`frontend-design`, `impeccable`) | Next.js 15 UI, tokens, Global Shell, Gazette hero, Dept matrix, Document vault, NAAC/NBA/Admissions/Placements pages | 🟢 Complete & Verified |
| **Admin CMS** | Staff CMS & Cutover Lead (`supabase`, `code-security`) | `src/app/admin/**`, `src/lib/auth/admin-auth.ts`, `src/lib/actions/admin-actions.ts`, ADR-006 | 🟢 Complete & Verified |
| **Zeta (Agent 7)** | Security, QA, A11y & Docs Sync Lead (`security-review`, `web-design-guidelines`, `docs-sync`) | `src/middleware.ts`, `tests/security-and-pages.test.js` (80/80 tests passing), Anti-slop & WCAG AA audit, Docs sync | 🟢 Complete & Verified |

---

## Phase 1: Environment & Project Scaffolding
- [x] Ingest complete live WordPress website into offline raw cache (`cache/`).
- [x] Extract and organize 936 Markdown files with cleaned tables into `content/`.
- [x] Extract and deduplicate 452 structured faculty records into `src/data/faculty/*.json`.
- [x] Catalog 5,822 media and syllabus documents into `src/data/media-manifest.json`.
- [x] Build URL rewrite mapping (2,784 routes) into `src/data/url-map.json`.
- [x] Download core brand crests, campus landmarks, and leadership portraits to `public/assets/`.
- [x] Author comprehensive anti-slop design specifications in `NEXTJS_REDESIGN_PLAN.md` and `docs/PLAN.md`.
- [x] Author production database architecture, schema, indexes, and RLS in `docs/DATABASE.md`.
- [x] Author production API contracts, RFC 9457 problem catalog, and Zod schemas in `docs/API.md`.
- [x] Author production system architecture, caching tier, and durable execution in `docs/ARCHITECTURE.md`.
- [x] Record ADR-004 (Durable Workflows), ADR-005 (Fail-Safe Hybrid Access), and ADR-006 (Production CMS Cutover) in `docs/decisions/`.
- [x] Partition 2.43 MB media manifest into build-time lean MiniSearch chunk (`public/search-index.json` < 180 KB).
- [x] Install Next.js 15, React 19, Tailwind CSS v4, Supabase SSR, and essential UI packages in `package.json`.
- [x] Configure `next.config.ts` (remote image domains, 2,784 legacy URL edge redirects, static build optimization).
- [x] Configure `src/app/globals.css` with CSS custom variables for the 75/20/5 color tokens and typography scale.
- [x] Setup web fonts (*Newsreader* serif + *Plus Jakarta Sans* + *JetBrains Mono*) via `next/font/google` in `src/app/layout.tsx`.

---

## Phase 2: Production Backend & Database Layer (`Subagent Alpha & Beta / Agent 3`)
- [x] Create `supabase/migrations/20261102000001_core_schema.sql` (departments, regulations, faculty, documents, notices, inquiries, audit_logs).
- [x] Create `supabase/migrations/20261102000002_indexes.sql` (B-tree on FKs, partial indexes, GIN on `fts_vector`, `pg_trgm` autocomplete).
- [x] Create `supabase/migrations/20261102000003_rls_policies.sql` (Public read, protected inquiries insert, admin mutation via `app_metadata.role`).
- [x] Create `supabase/migrations/20261102000004_triggers.sql` (Automated `updated_at` and append-only `audit_logs` triggers).
- [x] Implement `scripts/seed-supabase.js` to seed 452 faculty profiles and 5,822 documents into PostgreSQL (`supabase/seed.sql` generated).
- [x] Implement `src/lib/api/problem.js` (RFC 9457 Problem Details factory, Zod error parser, `toProblemResponse` serializer).
- [x] Implement `src/lib/validations/` (`faculty.schema.js`, `document.schema.js`, `inquiry.schema.js`, `notice.schema.js`, `content.schema.ts`).
- [x] Implement `src/app/api/v1/health/route.ts` (Database ping, offline cache status, uptime).
- [x] Implement `src/app/api/v1/faculty/route.ts` and `src/app/api/v1/faculty/[slug]/route.ts`.
- [x] Implement `src/app/api/v1/documents/route.ts` (Search across 5,822 cataloged items connected to tsvector GIN index & offline manifest).
- [x] Implement `src/app/api/v1/notices/route.ts` (Active circulars & marquee ticker).
- [x] Implement `src/app/api/v1/inquiries/route.ts` (Admissions inquiry submission with sliding-window rate limit & honeypot bot check).
- [x] Implement `src/app/api/v1/assets/proxy/route.ts` (SSRF-protected streaming proxy with hostname allowlist `*.gpcet.ac.in`).
- [x] Implement `scripts/build-search-index.js` (Generates pre-indexed MiniSearch chunk <180 KB in `public/search-index.json`).
- [x] Implement `src/lib/search/search-client.ts` (Client-side lazy loader for sub-5ms keystroke search in Cmd+K modal).
- [x] Implement `scripts/migrate-assets-to-supabase.js` (Batch asset uploader to Supabase Storage bucket `academic-documents` with rate limiting and progress tracking).

---

## Phase 3: Fail-Safe Data Layer & Durable Scraper Workflow (`Subagent Gamma & Delta`)
- [x] Implement `src/lib/supabase/` SSR client helpers (`server.ts`, `client.ts`, `admin.ts`).
- [x] Implement `src/lib/data/faculty.js` with offline JSON fallback (452 verified faculty records).
- [x] Implement `src/lib/data/documents.js` with offline JSON fallback and PostgreSQL tsvector GIN index connection (5,822 cataloged documents).
- [x] Implement `src/lib/data/notices.js` with offline fallback notices.
- [x] Implement `src/lib/data/departments.js` with canonical metadata getters.
- [x] Implement `src/lib/workflow/sync-notices.ts` (Vercel Workflow SDK durable synchronization pipeline).
- [x] Implement `src/app/api/v1/admin/sync/notices/route.ts` (Authenticated workflow trigger endpoint supporting Bearer token and Supabase SSR roles).

---

## Phase 4: Frontend Global Shell & Institutional Layout (`Subagent Epsilon / Agent 4`)
- [x] Implement `src/components/global/TopInstitutionalBar.tsx` (Autonomous status, JNTUA badge, NAAC seal, EAPCET PULE code, quick portals).
- [x] Implement `src/components/global/InstitutionalNavbar.tsx` (Official crest, desktop mega-menu dropdowns, mobile drawer, Cmd+K trigger).
- [x] Implement `src/components/global/GlobalSearchModal.tsx` (`Cmd+K` command palette with instant MiniSearch index, keyboard navigation, and deferred faculty indexing).
- [x] Implement `src/components/global/InstitutionalFooter.tsx` (Statutory strip, AICTE/NBA/NAAC crests, RTI disclosures, campus coordinates).
- [x] Scaffold `src/app/layout.tsx` integrating Google fonts (Newsreader, Plus Jakarta Sans, JetBrains Mono), skip-to-content accessibility link, TopBar, Navbar, Footer, and SearchModal.

---

## Phase 5: Core Page Implementations (`Subagent Epsilon`)
- [x] Build `src/app/page.tsx` (`AsymmetricHeroSpread`, `LiveAcademicGazette`, `DepartmentalMatrix`, `LeadershipDiscourse`, `ResearchExcellenceBand`).
- [x] Build `src/app/departments/page.tsx`, `src/app/departments/[dept]/layout.tsx` & `page.tsx`, plus `laboratories`, `board-of-studies`, `syllabus`, and `events` tabs.
- [x] Build `src/app/departments/[dept]/faculty/page.tsx` & `[slug]/page.tsx` (`FacultyRosterTable` & `FacultyProfileView` scholar dossier).
- [x] Build `src/app/documents/page.tsx` (`DocumentVaultClient` & `DocumentRow` for 5,822 cataloged files).
- [x] Build `src/app/accreditation/page.tsx`, `src/app/accreditation/naac/page.tsx`, `src/app/accreditation/naac/[criteria]/page.tsx` (Criteria 1–7, 48 SSR metrics via `src/lib/naac-data.ts`), and `src/app/accreditation/nba/page.tsx`.
- [x] Build `src/app/administration/page.tsx`, `src/app/campus-life/page.tsx`, `src/app/admissions/page.tsx` (`AdmissionsInquiryForm`), and `src/app/placements/page.tsx`.

---

## Phase 6: Staff Admin CMS, Security Verification & Handoff (`Admin CMS & Subagent Zeta`)
- [x] Implement authenticated Staff Admin CMS (`src/app/admin/**`, `src/lib/auth/admin-auth.ts`, `src/lib/actions/admin-actions.ts`, `src/components/admin/**`) and record `docs/decisions/006-production-cms-cutover.md`.
- [x] Implement `src/middleware.ts` enforcing strict HTTP security headers (`Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`) and Supabase SSR cookie refresh on `/admin/*`.
- [x] Author and run full automated test suite across `tests/*.test.js` (13 test files, 80 tests passing via `npm test` covering middleware CSP/headers, inquiry rate limiting, client-bundle `service_role` isolation, admin RBAC/CSRF, RFC 9457 errors, Route Handlers, Zod schemas, RLS migrations, offline fallback across 452 faculty & 5,822 documents, MiniSearch <180 KB index, durable workflow sync, and NAAC Criteria 1–7).
- [x] Verify `rehype-sanitize` (`MarkdownRenderer.tsx`) and `sanitizeScrapedMarkdown()` (`src/lib/institutional-content.ts`) neutralize `<script>`, `<iframe>`, `javascript:` URLs, inline event handlers, and `[fusion_*]` shortcodes.
- [x] Audit anti-slop compliance and WCAG AA accessibility (removed cosmetic status dot in `TopInstitutionalBar.tsx` and `backdrop-blur-sm` scrims; verified skip-to-content, focus-visible rings, `tabular-nums`, keyboard navigation, and responsive Mobile/Tablet/Desktop layouts).
- [x] Run `docs-sync` to synchronize `docs/TODO.md`, `docs/CHANGELOG.md`, `docs/ARCHITECTURE.md`, and `SESSION_HANDOFF.md`.
