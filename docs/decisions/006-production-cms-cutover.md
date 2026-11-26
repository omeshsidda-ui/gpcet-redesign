# 006. Architecture Decision: Production CMS Cutover from Legacy WordPress Scraper Sync to Native Supabase Authoring

- **Status**: Accepted
- **Date**: 2026-11-26
- **Author**: Staff Admin CMS Lead (Phase 6)
- **Supersedes / Extends**: [ADR-002](./002-auth-architecture.md), [ADR-004](./004-durable-workflow-and-cache-invalidation.md), [ADR-005](./005-fail-safe-hybrid-data-access-pattern.md)

## Context & Problem Statement

During the migration of G. Pullaiah College of Engineering & Technology (GPCET) from legacy WordPress (`https://www.gpcet.ac.in`) to Next.js 15 App Router, the institution initially relied on offline JSON extraction (`452` faculty profiles, `5,822` cataloged documents, `936` content pages) supplemented by scheduled **Scraper Sync Mode** polling via durable workflows ([ADR-004](./004-durable-workflow-and-cache-invalidation.md)).

To decommission legacy WordPress authoring and eliminate scraping latency for urgent circulars (EAPCET admissions counseling, JNTUA autonomous exam timetables, statutory notices, and faculty roster updates), college administrators and Heads of Department require an authenticated **Native CMS Mode** backed directly by Supabase PostgreSQL with Row Level Security (RLS) and instant cache tag invalidation.

## Decision

We establish a controlled two-mode **Production CMS Cutover Architecture** accessible through `/admin`:

### 1. Authentication & Role-Based Access Control (RBAC)
- **HttpOnly Cookie SSR Sessions**: Staff authenticate at `/admin/login` using `@supabase/ssr` (`signInWithPassword`), storing session tokens exclusively in `HttpOnly`, `SameSite=Lax` cookies.
- **Layout & Route Protection Rule**: `src/app/admin/layout.tsx` checks `getAdminSession()` without redirecting unauthenticated requests (preventing infinite redirect loops on `/admin/login`). Protected pages (`/admin`, `/admin/notices/**`, `/admin/faculty`) call `requireStaffSession(allowedRoles?)` in `src/lib/auth/admin-auth.ts`, redirecting unauthenticated visitors to `/admin/login` and rendering an explicit HTTP 403 Forbidden screen (`AdminForbidden`) for authenticated non-staff users.
- **Strict `app_metadata` Authorization**:
  - Authorization roles (`admin`, `editor`, `hod`, `counselor`) are read **exclusively** from `user.app_metadata.role` (never `user_metadata`).
  - **Module Scoping** (aligned with `supabase/migrations/20261102000003_rls_policies.sql`):
    - `admin`: Full access across overview, notices, faculty, and CMS cutover toggle.
    - `editor`: Notice & circular authoring, ticker toggling, manual cache sync, and faculty roster edits.
    - `hod`: Faculty directory editing (scoped to `app_metadata.department_code` when assigned).
    - `counselor`: Staff overview access (admissions inquiry workflows).

### 2. Server Action Mutation Security & Cache Invalidation
- All mutations in `src/lib/actions/admin-actions.ts` enforce:
  1. **CSRF Origin/Host Verification**: `verifyCsrfOrigin()` compares `origin` (or `referer` + `sec-fetch-site`) against `host` / `x-forwarded-host` before processing any mutation.
  2. **Server-Side Role Guard**: `requireStaffSession(..., { redirectOnUnauthenticated: false })`.
  3. **Zod Schema Validation**: Validates payloads against `NoticeCreateSchema` and `FacultyUpdateSchema`.
  4. **On-Demand Cache Purge**: Every notice or faculty mutation invokes `revalidateTag('notices')` / `revalidateTag('faculty')` alongside `revalidatePath()` for `/`, `/admin/notices`, and `/admin/faculty`.
  5. **XSS-Safe Markdown Authoring**: Notice authoring (`NoticeEditorForm`) uses `MarkdownRenderer` (`remark-gfm` + `rehype-sanitize` `academicSanitizeSchema`) for live sanitized previews.

### 3. Phased Cutover Protocol (`Scraper Sync Mode` → `Native CMS Mode`)
1. **Stage 1 — Pre-Cutover Verification (Scraper Sync Mode)**:
   - Run `npm run seed:generate` to populate `departments`, `academic_regulations`, `faculty` (452 rows), and `academic_documents` (5,822 rows) in Supabase PostgreSQL.
   - Provision staff accounts in Supabase Auth with `app_metadata.role` set via service-role provisioning script (never via client signup).
   - Verify RLS policies (`public.is_staff()`, `Staff can manage notices`, `Staff can manage faculty`) and audit log triggers (`trg_audit_notices`, `trg_audit_faculty`).
2. **Stage 2 — Parallel Validation**:
   - Staff author test circulars in `/admin/notices/new` and verify homepage ticker rendering and `revalidateTag('notices')` propagation.
   - HODs verify department faculty designations and active statuses in `/admin/faculty`.
3. **Stage 3 — Production Cutover (Native CMS Mode)**:
   - A Super-Admin (`role: 'admin'`) switches the toggle in `/admin#cutover-settings` (`setCmsSyncModeAction('native')`) and sets `CMS_SYNC_MODE=native` in deployment environment variables.
   - Legacy WordPress admin access is placed into read-only archive mode while retaining `next.config.ts` 2,784 edge 301 redirects.

### 4. Deterministic Rollback Plan
If an operational issue occurs after cutover:
1. Super-Admin switches `/admin#cutover-settings` back to **Scraper Sync Mode** (`setCmsSyncModeAction('scraper')`) and sets `CMS_SYNC_MODE=scraper`.
2. Trigger **Manual Sync & Purge** (`triggerManualSyncAction`) to invalidate `notices`, `documents`, and `faculty` cache tags.
3. Per [ADR-005](./005-fail-safe-hybrid-data-access-pattern.md), if Supabase becomes unreachable at any time, public read endpoints and admin preview views automatically fall back to offline JSON manifests (`src/data/faculty/*.json`, `src/lib/data/notices.js`) without returning 500 errors.

## Consequences

### Positive
- Eliminates WordPress dependency for day-to-day circular publishing and faculty updates.
- Enforces defense-in-depth across Next.js Server Components, CSRF-checked Server Actions, and PostgreSQL RLS policies.
- Provides instant sub-second notice publication via `revalidateTag('notices')` with automatic audit trails in `public.audit_logs`.

### Trade-offs & Mitigations
- Staff accounts must be provisioned with `app_metadata.role` by an administrator. *Mitigation: Non-staff authenticated accounts receive a clear 403 Forbidden screen explaining the missing `app_metadata.role` claim.*
- Local preview environments without Supabase credentials cannot persist writes. *Mitigation: `isSupabasePublicConfigured()` detects missing or placeholder credentials and degrades cleanly to read-only offline preview mode without throwing 500 errors.*
