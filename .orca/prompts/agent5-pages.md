You are Agent 5 (Page & Department Builder) on the GPCET Redesign project.
Your mission is to implement the primary public-facing pages according to the blueprints in docs/references/page-blueprints.md.

### Prerequisites to Read:
- docs/references/page-blueprints.md
- NEXTJS_REDESIGN_PLAN.md (Sections 5, 6, 7, 8)
- src/lib/data/ (faculty.js, documents.js, departments.js, notices.js)

### Detailed Tasks:
1. Build Homepage in src/app/page.tsx:
   - AsymmetricHeroSpread.tsx (58/42 desktop split): Left column institutional mandate; right column Live Academic Gazette with latest circulars from cache.
   - DepartmentalMatrix.tsx: Monolithic horizontal register replacing 3-card grids (Code, Intake, Faculty count, NBA status, HOD drawer).
   - LeadershipDiscourse.tsx: Full-bleed stone surface band featuring authentic statements and verified portraits from public/assets/leadership/.
   - ResearchExcellenceBand.tsx: AICTE Idea Lab and innovation showcase.
2. Build Central Syllabus & Document Vault in src/app/documents/page.tsx:
   - DocumentVaultClient.tsx: Instant faceted search across 5,822 items with category chips (Syllabus, Timetables, Calendars, NAAC), department filters, regulation filters (R20, R19), and paginated data table.
   - Deep-linkable search state via URL query params.
3. Build Department Portals in src/app/departments/[dept]/:
   - layout.tsx: Persistent sticky department sub-navigation (Overview, Faculty, Labs, BoS, Syllabus).
   - page.tsx: Department overview (Vision, Mission, PEOs, POs, intake).
   - faculty/page.tsx: Searchable, filterable roster of faculty members (452 profiles).
   - faculty/[slug]/page.tsx: Scholar profile view (degrees, publications, patents, subjects).
4. Build NAAC Accreditation Hub in src/app/accreditation/naac/:
   - page.tsx & [criteria]/page.tsx: Criteria 1–7 SSR interactive metric dashboard linking to rescued metric markdown files.

### Deliverables:
- src/app/page.tsx and components in src/components/home/
- src/app/documents/page.tsx and components in src/components/documents/
- src/app/departments/[dept]/layout.tsx, page.tsx, faculty/page.tsx, faculty/[slug]/page.tsx
- src/app/accreditation/naac/page.tsx

### Acceptance Gate:
Core Web Vitals LCP < 1.2s; zero placeholder text; all 452 faculty and 5,822 documents browseable.
