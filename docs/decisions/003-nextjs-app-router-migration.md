# 003. Architecture Decision: Next.js 15 App Router & React 19 Frontend Overhaul

- **Status**: Accepted
- **Date**: 2026-11-02
- **Author**: Lead Software Architect

## Context & Problem Statement
The existing GPCET institutional website runs on a 2015-era WordPress instance with Avada Theme and Fusion Builder. The site suffers from poor mobile responsiveness, slow time-to-first-byte (>2.5s), broken tables on mobile screens, unindexed PDFs, and severe visual clutter. An institutional overhaul is required to provide high-speed access for prospective students, recruiters, and accreditation inspectors (NAAC/NBA).

## Decision
Migrate the entire frontend to **Next.js 15 (App Router)** with **React 19**, **TypeScript**, and **Tailwind CSS**:
1. **Server Components by Default**: Zero client bundle for static content pages, resulting in instantaneous page transitions and perfect Lighthouse SEO scores.
2. **Intentional Design System**: Replacing bloated WordPress builder CSS with a disciplined Tailwind CSS token system (Imperial Navy `#0C2340`, Academic Oxblood `#8A1538`, Burnished Brass `#B8860B`).
3. **Structured Static Content**: Pre-rendering the 936 Markdown files with sanitized rehype parsing.

## Consequences
### Positive
- Page load times drop from >3.5 seconds to <200 milliseconds.
- Clean mobile-responsive layouts replacing clipped WordPress desktop tables.
- Accessible navigation adhering to WCAG AA guidelines.
- Version-controlled design and content repository.

### Trade-offs & Mitigations
- Full migration requires re-implementing 8 departmental portal layouts. *Mitigation: Standardize on reusable departmental layout templates (`src/app/departments/[dept]/layout.tsx`).*

## Alternatives Considered
- **Updating WordPress / Avada Theme**: Rejected because it maintains technical debt, database vulnerabilities, and sluggish performance.
- **Astro**: Considered for static markdown rendering, but Next.js 15 was preferred for its integrated Server Actions, dynamic API route handlers, and unified deployment with Supabase.
