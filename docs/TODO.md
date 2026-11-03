# Actionable Implementation Checklist: GPCET Redesign

## Next Immediate Steps (Subagent Beta & Epsilon Dispatch)
> **Action 1 (Subagent Beta)**: Wire Next.js 15 App Router Route Handlers in `src/app/api/v1/` (`health`, `faculty`, `documents`, `notices`, `inquiries`) utilizing `src/lib/api/problem.js`, Zod schemas in `src/lib/validations/`, and `src/lib/data/`.  
> **Action 2 (Subagent Epsilon)**: Install Next.js 15 / Tailwind v4 dependencies and assemble institutional frontend shell components.

---

## Subagent Responsibility Matrix

| Subagent | Role & Primary Skills | Core Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Alpha** | Database Architect (`supabase`, `supabase-postgres-best-practices`) | Migrations, RLS, Indexes, Triggers, Seeder script (`supabase/seed.sql`) | 🟢 Complete & Verified |
| **Beta** | API & Security Engineer (`api-design-skills`, `code-security`) | RFC 9457 utils, Zod schemas, `/api/v1/*` Route Handlers, Rate limiting | 🟡 Handlers In Progress |
| **Gamma** | Data Layer & Cache Engineer (`senior-backend`, `vercel-react-best-practices`) | `src/lib/data/`, Fail-safe offline fallback (452 faculty, 5,822 docs) | 🟢 Complete & Verified |
| **Delta** | Durable Workflow Lead (`workflow`, `senior-backend`) | Vercel Workflow SDK scraper sync & cache invalidation | 🟡 Ready for Dispatch |
| **Epsilon**| Frontend Design Specialist (`frontend-design`, `impeccable`) | Next.js 15 UI, tokens, Gazette hero, Dept matrix, Document vault | 🟡 Ready for Dispatch |
| **Zeta** | Security & QA Lead (`security-review`, `codeql`, `docs-sync`) | Automated test suite (29 tests passing), SAST scans, Docs sync | 🟢 Test Suite Verified |

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
- [x] Record ADR-004 (Durable Workflows) and ADR-005 (Fail-Safe Hybrid Access) in `docs/decisions/`.
- [x] Install Next.js 15, React 19, Tailwind CSS, Supabase SSR, and essential UI packages in `package.json`.
- [x] Configure `next.config.ts` (remote image domains, 2,784 legacy URL edge redirects, static build optimization).
- [x] Configure `src/app/globals.css` with CSS custom variables for the 75/20/5 color tokens and typography scale.
- [ ] Setup web fonts (*Newsreader* serif + *Plus Jakarta Sans* + *JetBrains Mono*).

---

## Phase 2: Production Backend & Database Layer (`Subagent Alpha & Beta`)
- [x] Create `supabase/migrations/20261102000001_core_schema.sql` (departments, regulations, faculty, documents, notices, inquiries, audit_logs).
- [x] Create `supabase/migrations/20261102000002_indexes.sql` (B-tree on FKs, partial indexes, GIN on `fts_vector`, `pg_trgm` autocomplete).
- [x] Create `supabase/migrations/20261102000003_rls_policies.sql` (Public read, protected inquiries insert, admin mutation via `app_metadata.role`).
- [x] Create `supabase/migrations/20261102000004_triggers.sql` (Automated `updated_at` and append-only `audit_logs` triggers).
- [x] Implement `scripts/seed-supabase.js` to seed 452 faculty profiles and 5,822 documents into PostgreSQL (`supabase/seed.sql` generated).
- [x] Implement `src/lib/api/problem.js` (RFC 9457 Problem Details factory and Zod error parser).
- [x] Implement `src/lib/validations/` (`faculty.schema.js`, `document.schema.js`, `inquiry.schema.js`, `notice.schema.js`).
- [ ] Implement `src/app/api/v1/health/route.ts` (Database ping, offline cache status, uptime).
- [ ] Implement `src/app/api/v1/faculty/route.ts` and `src/app/api/v1/faculty/[slug]/route.ts`.
- [ ] Implement `src/app/api/v1/documents/route.ts` (Search across 5,822 cataloged items).
- [ ] Implement `src/app/api/v1/notices/route.ts` (Active circulars & marquee ticker).
- [ ] Implement `src/app/api/v1/inquiries/route.ts` (Admissions inquiry submission with rate limit & honeypot).

---

## Phase 3: Fail-Safe Data Layer & Durable Scraper Workflow (`Subagent Gamma & Delta`)
- [x] Implement `src/lib/supabase/` SSR client helpers (`server.ts`, `client.ts`, `admin.ts`).
- [x] Implement `src/lib/data/faculty.js` with offline JSON fallback (452 verified faculty records).
- [x] Implement `src/lib/data/documents.js` with offline JSON fallback (5,822 cataloged documents).
- [x] Implement `src/lib/data/notices.js` with offline fallback notices.
- [x] Implement `src/lib/data/departments.js` with canonical metadata getters.
- [ ] Implement `src/lib/workflow/sync-notices.ts` (Vercel Workflow SDK durable synchronization pipeline).
- [ ] Implement `src/app/api/v1/admin/sync/notices/route.ts` (Authenticated workflow trigger endpoint).

---

## Phase 4: Frontend Global Shell & Institutional Layout (`Subagent Epsilon`)
- [ ] Implement `src/components/global/TopInstitutionalBar.tsx` (Autonomous status, JNTUA badge, NAAC seal).
- [ ] Implement `src/components/global/InstitutionalNavbar.tsx` (Official crest, desktop mega-menu dropdowns, mobile drawer).
- [ ] Implement `src/components/global/GlobalSearchModal.tsx` (`Cmd+K` command palette with instant search).
- [ ] Implement `src/components/global/InstitutionalFooter.tsx` (Statutory strip, AICTE/NBA/NAAC crests, RTI disclosures).
- [ ] Scaffold `src/app/layout.tsx` integrating TopBar, Navbar, Footer, and SearchModal.

---

## Phase 5: Core Page Implementations (`Subagent Epsilon`)
- [ ] Build `src/app/page.tsx` (Asymmetric Hero Spread 58/42 + Live Academic Gazette + 8-Department Monolithic Register).
- [ ] Build `src/app/departments/[dept]/layout.tsx` & `page.tsx` (Persistent tabbed sub-nav, Overview, PEOs, POs).
- [ ] Build `src/app/departments/[dept]/faculty/page.tsx` & `[slug]/page.tsx` (Filterable roster & scholar dossier).
- [ ] Build `src/app/documents/page.tsx` (Central Document & Syllabus Vault with 5,822 items).
- [ ] Build `src/app/accreditation/naac/page.tsx` & `[criteria]/page.tsx` (Criteria 1–7 SSR Metric Dashboard).
- [ ] Build `src/app/administration/page.tsx`, `src/app/campus-life/page.tsx`, `src/app/admissions/page.tsx`, `src/app/placements/page.tsx`.

---

## Phase 6: Security Verification, Testing & Handoff (`Subagent Zeta`)
- [x] Author and run automated integration test suite in `tests/*.test.js` (29 tests passing via `npm test` covering RFC 9457 errors, Zod schemas, RLS migrations, offline fallback across 452 faculty & 5,822 documents).
- [ ] Verify Content-Security-Policy (CSP) in `src/middleware.ts` and run Semgrep / CodeQL security checks.
- [ ] Audit accessibility: Full keyboard navigation (WCAG AA), contrast ratios $\ge$ 4.5:1.
- [ ] Audit responsive behavior across Mobile (390px), Tablet (768px), and Desktop (1440px).
- [ ] Run `docs-sync` to verify zero documentation drift across all files in `docs/`.
