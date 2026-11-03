# Business Logic & Institutional Domain Rules: GPCET

## 1. Institutional Governance & Hierarchy

G. Pullaiah College of Engineering & Technology (GPCET) is an Autonomous Institution affiliated with Jawaharlal Nehru Technological University Anantapur (JNTUA), approved by AICTE, accredited by NAAC with 'A+' Grade, and accredited by NBA for core engineering programs.

### Academic Department Hierarchy
The institution comprises 8 primary academic departments:
1. **CSE**: Computer Science & Engineering
2. **AI**: Artificial Intelligence (Computer Science & Engineering - AI)
3. **ECE**: Electronics & Communication Engineering
4. **EEE**: Electrical & Electronics Engineering
5. **ME**: Mechanical Engineering
6. **CIVIL**: Civil Engineering
7. **HS**: Humanities & Basic Sciences (Physics, Chemistry, Mathematics, English)
8. **MBA**: Master of Business Administration

### Faculty Designation Hierarchy & Order
When rendering faculty rosters, members must strictly follow academic protocol:
1. **Head of Department (HOD) / Professor & Head**: Always listed first with distinct designation badge.
2. **Professors**: Listed by seniority / Ph.D completion date.
3. **Associate Professors**: Listed before Assistant Professors.
4. **Assistant Professors**: Grouped by appointment seniority.
5. **Technical / Lab Staff**: Rendered in a separate technical support subsection.

---

## 2. Academic Regulations & Syllabus Conventions

As an autonomous institution, GPCET formulates its own syllabi under academic regulations revised every 2 to 3 years:
- **R20 Regulation**: Current dominant undergraduate curriculum (implemented 2020–2021).
- **R19 Regulation**: Previous undergraduate curriculum.
- **R18 Regulation**: Earlier curriculum iteration.
- **R15 Regulation**: Legacy autonomous curriculum.

### Syllabus Document Identification Rules
- A syllabus document must be categorized by:
  - **Department** (e.g. `CSE`)
  - **Program** (`B.Tech` vs `M.Tech` vs `MBA`)
  - **Regulation** (`R20`, `R19`, `R18`)
  - **Semester / Year** (`I B.Tech I Sem`, `II B.Tech II Sem`, etc.)
- When displaying course structures, credit allocations (Lecture-Tutorial-Practical-Credits: L-T-P-C) must be preserved in rendered course tables.

---

## 3. Accreditation & Institutional Reporting Rules

### NAAC Self-Study Report (SSR) Structure
The portal must organize accreditation documentation under the official 7 NAAC criteria:
- **Criterion 1**: Curricular Aspects (e.g., feedback analysis, curriculum design, value-added courses)
- **Criterion 2**: Teaching-Learning and Evaluation (e.g., student-teacher ratio, CIE, student performance)
- **Criterion 3**: Research, Innovations and Extension (e.g., funded projects, patents, MoUs)
- **Criterion 4**: Infrastructure and Learning Resources (e.g., library automation, IT facilities)
- **Criterion 5**: Student Support and Progression (e.g., scholarships, placement records, grievance)
- **Criterion 6**: Governance, Leadership and Management (e.g., strategic plan, financial audits, IQAC)
- **Criterion 7**: Institutional Values and Best Practices (e.g., green campus, code of conduct)

### NBA Outcome-Based Education (OBE) Rules
Every department page must explicitly expose its:
- **Vision & Mission**: Department-specific institutional commitments.
- **PEOs**: Program Educational Objectives (3–5 years post-graduation goals).
- **POs**: Program Outcomes (12 standard engineering graduate attributes).
- **PSOs**: Program Specific Outcomes (2–3 department-specific capabilities).
- **Board of Studies (BoS)**: Roster of university nominees, industry experts, and internal faculty.

---

## 4. URL Redirection & Link Continuity Invariants

1. **Legacy WordPress Links**: Any link pointing to old slugs (e.g. `gpcet.ac.in/cse_home`) must resolve to the Next.js equivalent (`/departments/cse`) via `src/data/url-map.json`.
2. **Protocol Upgrade**: All `http://www.gpcet.ac.in/wp-content/uploads/...` URLs are strictly upgraded to HTTPS.
3. **Fallback to Direct PDF**: If a legacy document does not have a dedicated HTML landing page, the link directly streams the asset from the indexed media repository.

---

## 5. Institutional Visual & Data Representation Policy

To maintain the dignity of an autonomous engineering institution and avoid the look of generic commercial marketing:
1. **Zero AI Slop Rule**: Prohibit generic SaaS cards, floating pastel badges, and purple gradients. The visual language must mirror a serious civic institution and broadsheet gazette.
2. **Tabular Numerals & Monospace Codes**: All official codes (`R20`, `R19`), course identifiers (`20A05401`), NAAC metric tags (`3.4.3`), file sizes (`2.4 MB`), and intake numbers (`360`) must be styled with `tabular-nums` in `JetBrains Mono`.
3. **Verified Academic Data Integrity**: No placeholder names, mock statistics, or generic testimonials are permitted. All content must source directly from the 452 faculty profiles, 936 content pages, and 5,822 cataloged documents.
4. **Planning References**:
   - Implementation Plan: [`docs/PLAN.md`](./PLAN.md)
   - Actionable Step Checklist: [`docs/TODO.md`](./TODO.md)
   - Design System & Anti-Slop: [`docs/references/design-system-and-anti-slop.md`](./references/design-system-and-anti-slop.md)

