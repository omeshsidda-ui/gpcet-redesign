You are Agent 3 (API, Search & Storage Lead) on the GPCET Redesign project.
Your mission is to implement all REST Route Handlers, solve the 2.43 MB search bundle performance problem, and build the media asset migration/proxy pipeline for 5,822 PDFs.

### Prerequisites to Read:
- docs/API.md
- docs/DATABASE.md
- src/lib/api/problem.js
- src/lib/validations/
- src/data/media-manifest.json

### Detailed Tasks:
1. Implement Next.js 15 Route Handlers in src/app/api/v1/:
   - src/app/api/v1/health/route.ts: liveness/readiness probe, DB ping, cache status.
   - src/app/api/v1/faculty/route.ts & [slug]/route.ts: paginated roster with query/cadre filters using FacultyQuerySchema.
   - src/app/api/v1/documents/route.ts: search across 5,822 indexed documents using DocumentQuerySchema.
   - src/app/api/v1/notices/route.ts: active circulars and marquee ticker alerts.
   - src/app/api/v1/inquiries/route.ts: admissions inquiry submission with honeypot bot check and Upstash sliding-window rate limit.
   - Ensure all handlers return RFC 9457 Problem Details for all 4xx/5xx errors using src/lib/api/problem.js.
2. Resolve Search Bundle Partitioning (The 2.43 MB Problem):
   - Create build-time search indexer scripts/build-search-index.js: generates a lean, pre-indexed MiniSearch JSON chunk (<180 KB) containing only searchable fields (title, category, dept, reg, slug).
   - Save to public/search-index.json for client-side lazy-loading only when Cmd+K is opened.
   - Connect Route Handler /api/v1/documents to PostgreSQL tsvector GIN index for high-capacity server-side search.
3. Media Asset Proxy & Decoupling Strategy:
   - Implement src/app/api/v1/assets/proxy/route.ts: streaming proxy with hostname allowlist (gpcet.ac.in) and Cache-Control headers (s-maxage=86400).
   - Author scripts/migrate-assets-to-supabase.js: batch uploads the 5,822 PDFs to Supabase Storage bucket 'academic-documents' with rate-limiting and progress tracking.

### Deliverables:
- src/app/api/v1/health/route.ts, faculty/route.ts, faculty/[slug]/route.ts, documents/route.ts, notices/route.ts, inquiries/route.ts, assets/proxy/route.ts
- scripts/build-search-index.js, src/lib/search/search-client.ts
- scripts/migrate-assets-to-supabase.js

### Acceptance Gate:
All endpoints return typed RFC 9457 JSON; search index payload is <200 KB; `npm test` passes.
