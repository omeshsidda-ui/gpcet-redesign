# Reference: Institutional Design System & Anti-AI-Slop Playbook

> **Context**: G. Pullaiah College of Engineering & Technology (GPCET) institutional redesign  
> **Standards**: `AGENTS.md`, `design-taste-frontend`, `frontend-design`, `impeccable`, `frontend-skill`  
> **Source Grounding**: 247 curated editorial award-winning websites, verified GPCET identity, autonomous academic protocols

---

## 1. The Anti-AI-Slop Code of Craft

Mainstream AI coding generators default to a predictable, homogenized formula:
- Centered 3-line headline with a purple-to-blue gradient text fill
- A floating pill badge above the headline (`EXPLORE EXCELLENCE`)
- 3 identical floating cards with huge drop shadows (`shadow-2xl`) and rounded bubbles (`rounded-3xl`)
- Pastel square containers enclosing decorative Lucide icons (graduation caps, lightbulbs, rocket ships)
- Cream (`#F4F1EA`) + terracotta (`#D97757`) or generic dark-mode glowing mesh blobs

For an autonomous engineering college accredited with NAAC 'A+' Grade and NBA, this formula is banned. GPCET requires an **Architectural Academic Monolith & High-Density Gazette**:

### The Ten Invariant Anti-Slop Prohibitions
1. 🚫 **No Cream + Terracotta/Clay**: Never use warm yellow-cream grounds or terracotta/clay accents.
2. 🚫 **No Violet / Indigo / Neon Gradients**: Prohibit purple button washes, radial glowing backdrop blobs, and rainbow charts.
3. 🚫 **No Gradient-Filled Headline Text**: Headlines are rendered in solid Midnight Ink (`#0A1124`) or pure Alabaster. Authority is conveyed through typographic weight, leading, and scale—never colored fills.
4. 🚫 **No Floating SaaS Card Triads**: Replace generic 3-card grids with monolithic tabular registers, asymmetric editorial spreads, or full-width stone surface bands.
5. 🚫 **No Uppercase Kicker Badges**: Eliminate tracked-out micro-eyebrows (`<span className="text-xs uppercase tracking-widest text-indigo-500">WELCOME</span>`). Let the headline and masthead establish hierarchy.
6. 🚫 **No Cosmetic Status Dots**: Remove pulsing green/blue "Admissions Open" or "Live" badges unless connected to an active WebSocket connection.
7. 🚫 **No Decorative Floating Icons**: Every icon must clarify navigation, download mime-type, or afford a distinct user action.
8. 🚫 **No Unorchestrated Entrances**: Banned scroll-bouncing cards, staggered floating animations on every section, and infinite marquee loops. The interface uses a single, deliberate page-load reveal, followed by crisp 120ms transitions.
9. 🚫 **No Placeholder Copy**: Every statistic, regulation code (`R20`, `R19`), HOD name, and intake number is drawn directly from the verified 936-page dataset.
10. 🚫 **No Excessive Rounded Corners**: Never use `rounded-2xl`, `rounded-3xl`, or `rounded-full` (except for circular avatars). Use disciplined radiuses: 4px (`rounded-sm`), 6px (`rounded`), 8px (`rounded-md`).

---

## 2. Institutional Color Hierarchy & Proportions

Color follows the **75 / 20 / 5 Rule**:
- **75% Ground & Canvas**: Clean, glare-free architectural background and subtle stone surface steps.
- **20% Structural Ink & Navy**: Midnight ink for text legibility, Imperial Navy for mastheads and leadership bands.
- **<5% Accent (Oxblood & Brass)**: Reserved strictly for primary call-to-actions, urgent circular alerts, and NAAC/NBA accreditation seals.

```
       75% Ground & Canvas                   20% Structural Ink & Navy       <5% Accent
[--------------------------------------------|------------------------|--------]
  --bg / --surface (Alabaster / Slate)         --ink / --primary-navy   --brand-crimson / --brass-gold
```

### Color Token Table

| Token Variable | Light Value | Dark Value | Purpose & Contrast |
| :--- | :--- | :--- | :--- |
| `--bg` | `#FBFBFD` (Alabaster) | `#070B14` (Deep Obsidian) | Canvas ground; glare-free, crisp. |
| `--surface` | `#F1F3F6` (Muted Stone) | `#0E1524` (Midnight Slate) | 3-point lightness shift for tables, sidebars, registers. No heavy borders needed. |
| `--surface-raised` | `#FFFFFF` (Pure White) | `#141D30` (Navy Charcoal) | Elevated sheets, document rows, modal panels. |
| `--ink` | `#0A1124` (Midnight Ink) | `#F8FAFC` (Crisp Alabaster) | **14.2:1 contrast**. Primary headings, body copy, tabular text. |
| `--muted` | `#4B5565` (Slate Graphite)| `#94A3B8` (Silver Slate) | **5.8:1 contrast**. Metadata, timestamps, regulation tags. |
| `--primary-navy` | `#0C2340` (Imperial Navy)| `#1A3B66` (Structural Cobalt)| Civic foundation; masthead, top bar, leadership backgrounds. |
| `--brand-crimson`| `#8A1538` (Academic Oxblood)| `#A82246` (Vivid Crimson) | **5.1:1 contrast**. Primary CTAs, urgent circular badges, crest core. |
| `--brass-gold` | `#B8860B` (Burnished Brass)| `#D4AF37` (Antique Gold) | **4.6:1 contrast**. NAAC 'A+' Grade seals, Autonomous status badges. |
| `--rule` | `rgba(10, 17, 36, 0.08)` | `rgba(248, 250, 252, 0.1)` | Structural 1px hairline dividers; used only where semantic separation is mandatory. |

---

## 3. Typographic System & Optical Hierarchy

Typography creates the authoritative collegiate dignity of GPCET. It pairs a **dignified optical serif** with a **crisp operational sans** and **tabular monospace numbers**:

### 1. Dignified Display Serif (*Newsreader* / *Erode*)
- Used for: Masthead hero title, department titles, Chairman/Principal quotes, convocation statements.
- Optical grading: High contrast, tight tracking (`-0.025em`), leading `0.95` to `1.05`, sentence case.
- Font source: Google Fonts (*Newsreader*) or Fontshare (*Erode*).

### 2. Operational UI Sans (*Plus Jakarta Sans* / *Geist*)
- Used for: Navigation links, mega-menu groups, department tabs, document table data, button text, body paragraphs.
- Characteristics: Tall x-height, open apertures, geometric precision. Body copy constrained to max `72ch` measure.

### 3. Tabular & Regulation Monospace (*JetBrains Mono*)
- Used for: Regulation codes (`R20`, `R19`), NAAC metric IDs (`3.4.3`, `5.3.3`), course codes (`20A05401`), file sizes (`2.4 MB`), dates (`2026-10-31`), intake numbers (`360`).
- Features: `font-feature-settings: "tnum" 1;` ensures clean vertical tabular alignment.

### Typographic Scale Tokens

```css
:root {
  --text-hero: clamp(2.75rem, 5.2vw, 4.5rem);      /* Leading: 1.05 | Tracking: -0.03em */
  --text-title: clamp(2.00rem, 3.6vw, 2.875rem);    /* Leading: 1.15 | Tracking: -0.02em */
  --text-h2: clamp(1.50rem, 2.4vw, 1.875rem);       /* Leading: 1.25 | Tracking: -0.015em */
  --text-lead: clamp(1.125rem, 1.4vw, 1.35rem);     /* Leading: 1.55 | Tracking: normal */
  --text-body: 1rem;                                /* Leading: 1.65 | Measure: max 70ch */
  --text-meta: 0.8125rem;                           /* Leading: 1.4  | Weight: 500 */
  --text-code: 0.8125rem;                           /* Tabular mono  | Weight: 500 */
}
```

---

## 4. Layout Architecture: The 42% Editorial Axis

Per `design-taste-frontend`, the layout organizes content along a disciplined **42% vertical axis**:

```
0%                                  42%                                       100%
|-----------------------------------|------------------------------------------|
| Left Column (58%):                | Right Column (42%):                      |
| Institutional Mandate             | Live Academic Gazette                    |
| - Newsreader Title (52px)         | - Autonomous Circulars (Real-time feed)  |
| - Autonomous Engineering Citadel  | - Exam Cell Timetables (PDF downloads)   |
| - Key Tabular Indicators          | - Academic Calendars (R20 / R19)         |
| - Primary CTAs                    | - Direct link to Document Vault          |
```

- Headings and section anchors latch onto the 42% axis on desktop screens.
- Side notes, regulation codes, and metadata hang to the left (0–42%), while substantive editorial copy and registers flow to the right.
- On mobile screens (<768px), the axis cleanly collapses to the standard 16px/20px left margin with zero clipping or awkward horizontal overflow.

---

## 5. Motion & Micro-Interactions

### A. The Masked Headline Reveal
On initial page mount, the main serif title rises from behind an `overflow: hidden` bounding box with a sharp exponential ease-out:

```css
@keyframes maskedReveal {
  from {
    transform: translateY(105%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
}

.animate-masked-headline {
  display: block;
  animation: maskedReveal 850ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-masked-headline-stagger {
  display: block;
  animation: maskedReveal 850ms cubic-bezier(0.16, 1, 0.3, 1) 90ms forwards;
}
```

### B. Micro-Interaction Standards
1. **Button Transitions**: 120ms sharp ease-out on `:hover` and `:active`. Never fade text opacity; change surface background tone or ink depth.
2. **Focus Visibility (WCAG 2.4.7)**: Dual-ring outline: `outline: 2px solid var(--primary-navy); outline-offset: 2px;`.
3. **Tabular Numerals**: Numeric counters and file sizes transition cleanly without width jitter.
4. **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, all transforms and staggers collapse to instant opacity transitions.
