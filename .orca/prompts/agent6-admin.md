You are Agent 6 (Staff Admin CMS Lead) on the GPCET Redesign project.
Your mission is to build the administrative portal and authentication flow for college staff, enabling native authoring and phasing out legacy WordPress scraping.

### Prerequisites to Read:
- docs/decisions/002-auth-architecture.md
- docs/decisions/004-durable-workflow-and-cache-invalidation.md
- docs/DATABASE.md (RLS policies for public.is_staff())

### Detailed Tasks:
1. Implement Staff Authentication in src/app/admin/login/page.tsx:
   - Email/password authentication using Supabase SSR client with HttpOnly session cookies.
   - Protected layout in src/app/admin/layout.tsx: verifies user role in app_metadata (admin, editor, hod). Redirects unauthorized visitors.
2. Build Notice & Circular Authoring Dashboard in src/app/admin/notices/:
   - page.tsx: List of active notices with filters and quick toggle for homepage ticker.
   - new/page.tsx & [id]/page.tsx: Form with title, category, priority, Markdown editor with live preview, PDF attachment upload, and instant revalidateTag('notices') on publish.
3. Build Faculty Directory Editor in src/app/admin/faculty/:
   - List and edit faculty designations, qualifications, and active status.
4. Establish Production Cutover Architecture:
   - Provide an admin toggle to switch between Scraper Sync Mode (pulling from WP) and Native CMS Mode (direct Supabase authoring).
   - Document the cutover steps in docs/decisions/006-production-cms-cutover.md.

### Deliverables:
- src/app/admin/layout.tsx, login/page.tsx, notices/page.tsx, notices/new/page.tsx, faculty/page.tsx
- src/lib/actions/admin-actions.ts (Server Actions with CSRF protection)
- docs/decisions/006-production-cms-cutover.md

### Acceptance Gate:
Staff login persists session via HttpOnly cookies; non-staff users receive 403 Forbidden; new notice publishes and invalidates cache tags cleanly.
