# 002. Architecture Decision: Authentication via `@supabase/ssr` with HttpOnly Cookie Sessions

- **Status**: Accepted
- **Date**: 2026-11-02
- **Author**: Lead Software Architect

## Context & Problem Statement
Administrative staff and faculty members need authenticated access to manage circulars, review admissions inquiries, and update departmental data. The authentication architecture must be fully compatible with Next.js 15 Server Components, Server Actions, and Edge Middleware without leaking tokens in client-side JavaScript.

## Decision
We select **Supabase Authentication using `@supabase/ssr`** with encrypted, `HttpOnly`, `SameSite=Lax`, and `Secure` cookie sessions:
1. **Middleware Session Refresh**: Next.js Edge Middleware intercepts requests to refresh expired JWTs and write updated cookies before Server Components render.
2. **Role-Based Access Control (RBAC)**: Authorization roles (`admin`, `editor`, `admissions_officer`) are stored exclusively in `app_metadata` (never `user_metadata` which is client-editable).
3. **Database Enforcement**: Supabase Row Level Security (RLS) policies directly validate `auth.jwt() -> 'app_metadata' ->> 'role'` using `TO authenticated` syntax.

## Consequences
### Positive
- Zero XSS token theft risk: JWT access tokens and refresh tokens are never accessible via `window.localStorage` or client JS.
- Seamless compatibility with Next.js 15 async Server Components and Server Actions.
- Declarative RLS policies ensure the database enforces permissions even if frontend route guards are bypassed.

### Trade-offs & Mitigations
- Token refresh requires Edge middleware setup. *Mitigation: Implement standard `@supabase/ssr` middleware wrapper.*
- Stale claims if roles are modified mid-session. *Mitigation: Keep token lifespans short (15-30 mins) and force token refresh on sensitive actions.*

## Alternatives Considered
- **NextAuth.js (Auth.js)**: Rejected because it requires managing separate PostgreSQL adapter tables and doesn't integrate natively with Supabase RLS.
- **Client-only Supabase JS with localStorage**: Strongly rejected due to XSS vulnerability and inability to pre-render authenticated Server Components.
