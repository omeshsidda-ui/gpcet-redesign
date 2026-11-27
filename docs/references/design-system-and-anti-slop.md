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
3. 🚫 **No Gradient-Filled Headline Text**: Headlines are rendered in solid charcoal ink (`#181112`) or pure Alabaster. Authority is conveyed through typographic weight, leading, and scale—never colored fills.
4. 🚫 **No Floating SaaS Card Triads**: Replace generic 3-card grids with monolithic tabular registers, asymmetric editorial spreads, or full-width stone surface bands.
5. 🚫 **No Uppercase Kicker Badges**: Eliminate tracked-out micro-eyebrows (`<span className="text-xs uppercase tracking-widest text-indigo-500">WELCOME</span>`). Let the headline and masthead establish hierarchy.
6. 🚫 **No Cosmetic Status Dots**: Remove pulsing green/blue "Admissions Open" or "Live" badges unless connected to an active WebSocket connection.
7. 🚫 **No Decorative Floating Icons**: Every icon must clarify navigation, download mime-type, or afford a distinct user action.
8. 🚫 **No Unorchestrated Entrances**: Banned scroll-bouncing cards, staggered floating animations on every section, and infinite marquee loops. The interface uses a single, deliberate page-load reveal, followed by crisp 120ms transitions.
9. 🚫 **No Placeholder Copy**: Every statistic, regulation code (`R20`, `R19`), HOD name, and intake number is drawn directly from the verified 936-page dataset.
10. 🚫 **No Excessive Rounded Corners**: Never use `rounded-2xl`, `rounded-3xl`, or `rounded-full` (except for circular avatars). Use disciplined radiuses: 4px (`rounded-sm`), 6px (`rounded`), 8px (`rounded-md`).

---

## 2. Institutional Color Hierarchy & Proportions

The official 250 × 250 crest sits on white beside the full college name. Preserve its square aspect ratio. Use the same asset in the footer, staff login and browser icon.

| Token | Light value | Role |
| --- | --- | --- |
| `--bg` | `#FCF9F7` | Ivory page ground |
| `--surface` | `#F5EFEA` | Stone-rose register headings and reading bands |
| `--surface-raised` | `#FFFFFF` | Forms, dialogs and documents |
| `--ink` | `#181112` | Primary text |
| `--muted` | `#5C4B4E` | Captions and secondary text |
| `--brand-crimson` | `#B12B2C` | Actions and active states |
| `--ruby` | `#8B0E1A` | Masthead, hero, section rules and footer |
| `--burgundy` | `#6E0A14` | Caption bands and pressed surfaces |
| `--brass-gold` | `#B8860B` | Statutory distinction accents |
| `--distinction-ink` | `#785707` | Legible distinction text on light surfaces |
| `--rule` | `rgba(140, 20, 32, 0.12)` | Structural hairlines |

## 3. Typographic System & Optical Hierarchy

Typography creates the authoritative collegiate dignity of GPCET. It pairs a **dignified optical serif** with a **crisp operational sans** and **tabular monospace numbers**:

### 1. Dignified Display Serif (*Newsreader* / *Erode*)
- Used for: Masthead hero title, department titles, Chairman/Principal quotes, convocation statements.
- Optical grading: High contrast, tight tracking (`-0.025em`), leading `0.95` to `1.05`, sentence case.
- Font source: Google Fonts (*Newsreader*) or Fontshare (*Erode*).

### 2. Operational UI Sans (*Instrument Sans*)
- Used for: Navigation links, mega-menu groups, department tabs, document table data, button text, body paragraphs.
- Characteristics: Crisp geometric-humanist proportions, open apertures, clean legibility at UI and reading sizes. Body copy constrained to max `68ch`–`72ch` measure in primary `--ink`.

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

## 4. Page composition

Desktop navigation occupies its own row below the crest. Compact screens use a modal navigation sheet. The homepage opens with a 46/54 split between the ruby title panel and captioned campus photograph. Below 56rem the photograph follows the introduction. College figures and the academic gazette share the next spread.

Public index pages use a crimson top rule, large Newsreader heading and contextual actions or figures. Document and faculty registers retain their mobile views. Staff screens use white form sheets and the same institutional colors.

## 5. Motion & Micro-Interactions

### A. The Masked Headline Reveal
On initial page mount, the main serif title enters with a sharp exponential ease-out:

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
  animation: maskedReveal 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-masked-headline-stagger {
  display: block;
  animation: maskedReveal 240ms cubic-bezier(0.16, 1, 0.3, 1) 90ms forwards;
}
```

### B. Micro-Interaction Standards
1. **Button Transitions**: 120ms sharp ease-out on `:hover` and `:active`. Never fade text opacity; change surface background tone or ink depth.
2. **Focus Visibility (WCAG 2.4.7)**: Dual-ring outline: `outline: 2px solid var(--ruby); outline-offset: 2px;`.
3. **Tabular Numerals**: Numeric counters and file sizes transition cleanly without width jitter.
4. **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, all transforms and staggers collapse to instant opacity transitions.
