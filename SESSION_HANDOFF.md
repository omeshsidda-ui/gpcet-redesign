# Session Handoff: GPCET Redesign (Agent 3 - API, Search & Storage Lead)

## Current Status
- **Current State**: All Next.js 15 App Router REST Route Handlers in `src/app/api/v1/` are fully implemented with strict RFC 9457 Problem Details error envelopes; the 2.43 MB search bundle problem is completely solved via build-time MiniSearch index partitioning (reduced to **170.61 KB**, satisfying the <180 KB target and <200 KB acceptance gate); SSRF-protected media asset streaming proxy implemented; batch Supabase Storage migration pipeline authoring completed; 44/44 automated integration tests passing (`npm test`); zero documentation drift.
- **Completed in this Session**:
  - **Next.js 15 REST Route Handlers (`src/app/api/v1/`)**:
    - `health/route.ts`: Liveness & readiness probe, Supabase DB ping, offline cache status (452 faculty, 5,822 documents), `no-store, no-cache`.
    - `faculty/route.ts`: Paginated roster with department, cadre, and search query filters using `FacultyQuerySchema`, returning RFC 9457 422 on invalid parameters, edge cache headers (`s-maxage=3600, stale-while-revalidate=86400`).
    - `faculty/[slug]/route.ts`: Individual scholar dossier lookup with Next.js 15 async `params` resolution, returning RFC 9457 404 Problem Details when not found.
    - `documents/route.ts`: Search across 5,822 indexed documents with `DocumentQuerySchema`, connected to PostgreSQL `tsvector` GIN indexes (`idx_docs_fts`) in Supabase and transparent offline JSON fallback.
    - `notices/route.ts`: Active circulars, exam notifications, and marquee ticker alerts with `NoticeQuerySchema`, 5-minute edge cache (`s-maxage=300`).
    - `inquiries/route.ts`: Admissions inquiry submission with honeypot bot mitigation (`botCheck`), sliding-window IP rate limiting (5 req/10 min) with SHA-256 IP hashing, Upstash Redis pipeline support + in-memory sliding-window fallback, returning 201 Created or RFC 9457 422/429.
    - `assets/proxy/route.ts`: Streaming proxy with hostname allowlist (`*.gpcet.ac.in`), strict SSRF protection (blocking localhost, private subnets, attacker subdomain tricks), and 24-hour cache headers (`s-maxage=86400`).
  - **Search Bundle Partitioning (The 2.43 MB Problem Solved)**:
    - Authored `scripts/build-search-index.js`: Partitioned raw 2.43 MB manifest into a lean build-time MiniSearch chunk (`public/search-index.json`), indexing 766 core academic documents (all syllabi, calendars, timetables, circulars, accreditation files, forms) at **170.61 KB** (strictly `< 180 KB`).
    - Implemented `src/lib/search/search-client.ts`: Browser-ready lazy loader that fetches `search-index.json` only when `Cmd+K` is triggered, caching the instance in memory for sub-5ms keystroke autocomplete with prefix and fuzzy scoring.
    - Added npm script `"search:build": "node scripts/build-search-index.js"`.
  - **Media Asset Migration & Decoupling Strategy**:
    - Authored `scripts/migrate-assets-to-supabase.js`: Batch asset upload pipeline targeting Supabase Storage bucket `'academic-documents'` with worker pool concurrency limiting, progress tracking, and dry-run simulation mode.
    - Added npm script `"assets:migrate": "node scripts/migrate-assets-to-supabase.js"`.
  - **Automated Integration Test Suite**:
    - Added `tests/api-route-handlers.test.js` (12 tests verifying every Route Handler, status code, error envelope, and SSRF filter).
    - Added `tests/search-and-storage.test.js` (3 tests verifying build-search-index payload size < 180 KB, search client sub-15ms execution, and storage path normalization).
    - Total test suite expanded to **44/44 passing tests** via `npm test`.
  - **Documentation Synchronization**:
    - Updated `docs/API.md` with `/api/v1/assets/proxy` specification and Dual-Tier Search Architecture.
    - Updated `docs/TODO.md` checking off Phase 2 backend & search milestones.
    - Synchronized `SESSION_HANDOFF.md`.
- **Key Invariants Verified**:
  1. All 4xx and 5xx API errors return `application/problem+json` matching RFC 9457 specification.
  2. Public search index payload is strictly 170.61 KB (under the 180 KB requirement and 200 KB acceptance gate).
  3. Media asset proxy blocks external hostnames (`evil.com`), internal IPs (`127.0.0.1`), and subdomain confusion exploits (`attacker-gpcet.ac.in`).
  4. 100% test pass rate across 44 automated integration tests.
- **Recommended Next Steps for Orchestrator**:
  1. Dispatch **Subagent Epsilon** to install frontend dependencies (`tailwindcss@4`, `lucide-react`) and assemble institutional layout components (`TopInstitutionalBar`, `InstitutionalNavbar`, `GlobalSearchModal` consuming `src/lib/search/search-client.ts`, `InstitutionalFooter`).
  2. Dispatch **Subagent Delta** to author the Vercel Workflow SDK durable synchronization worker in `src/lib/workflow/sync-notices.ts` and the admin trigger route `/api/v1/admin/sync/notices`.
