---
name: orca-browser
description: >-
  Control and automate Orca ADE's embedded Chromium browser. Use when inspecting local dev servers, testing web pages, taking screenshots, driving UI interactions (clicks, form fills), verifying responsive layouts, capturing DOM/computed CSS in Design Mode, or running visual QA without leaving Orca.
triggers:
  - "orca browser"
  - "browser snapshot"
  - "embedded browser"
  - "inspect element orca"
  - "visual qa orca"
  - "orca screenshot"
  - "orca click"
  - "orca goto"
---

# Orca Embedded Browser Automation (`orca-browser`)

Orca ADE integrates a built-in Chromium browser engine directly adjacent to your code editor and terminal splits. This eliminates the traditional friction of switching between IDE, terminal, and external browser windows.

For AI agents, the embedded browser provides a deterministic **Snapshot-Interact-Verify loop** to validate UI changes, test authentication flows, inspect DOM/CSS, and capture screenshots for visual QA.

---

## 1. Core Browser Workflow (Snapshot-Interact Loop)

```
       ┌──────────────┐
       │  orca goto   │  Navigate to local dev server (e.g. http://localhost:3000)
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │orca snapshot │  Parse accessibility tree & assign element IDs (@e1, @e2)
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │  orca click  │  Interact with elements using resolved handles
       │  orca fill   │
       └──────┬───────┘
              │
              ▼
       ┌──────────────┐
       │orca screenshot  Verify visual fidelity and pixel-perfect styling
       └──────────────┘
```

---

## 2. Browser Commands Reference

### Navigation
```bash
# Navigate to a URL
orca goto --url "http://localhost:3000/admissions" --json

# Reload the active tab
orca reload --json

# Navigate history
orca go-back --json
orca go-forward --json
```

### Snapshotting DOM & Accessibility Tree
```bash
orca snapshot --json
```
The snapshot returns a structured tree where interactive elements receive short, deterministic tokens:
```json
{
  "url": "http://localhost:3000/admissions",
  "elements": [
    { "id": "@e1", "role": "heading", "name": "Undergraduate Admissions", "tag": "h1" },
    { "id": "@e2", "role": "textbox", "name": "Candidate Full Name", "tag": "input" },
    { "id": "@e3", "role": "button", "name": "Apply Online", "tag": "button" }
  ]
}
```

### Interactions
Always use the `@e<index>` tokens returned by the most recent `snapshot`:

```bash
# Fill an input field
orca fill --element "@e2" --value "Jane Doe" --json

# Click a button or link
orca click --element "@e3" --json

# Send keyboard keys
orca press --key "Tab" --json
orca press --key "Enter" --json

# Scroll the page
orca scroll --direction down --amount 500 --json
orca scroll --to bottom --json
```

### Screenshots & Visual QA
```bash
# Capture full viewport screenshot
orca screenshot --output "brain/screenshots/landing-desktop.png" --json

# Capture element-specific cropped screenshot
orca screenshot --element "@e3" --output "brain/screenshots/apply-button.png" --json
```

### JavaScript Evaluation
Execute inline JavaScript inside the browser tab context:
```bash
orca evaluate --script "window.localStorage.getItem('supabase.auth.token')" --json
orca evaluate --script "document.querySelectorAll('a').length" --json
```

---

## 3. Design Mode & Deep CSS Inspection

Orca features a dedicated **Design Mode** that lets agents and developers inspect any rendered component:

```bash
# Inspect computed CSS and layout bounding box of a target element
orca inspect --element "@e1" --json
```
Returns:
- Computed CSS values: `font-family`, `font-size`, `line-height`, `color`, `background-color`, `padding`, `margin`, `box-shadow`.
- Bounding client rect: `x`, `y`, `width`, `height`.
- Parent hierarchy and active Tailwind classes.

Use this data to audit UI against project design guidelines (e.g., WCAG contrast, typography rhythm, 4–6 tone color palette).

---

## 4. Responsive Layout Testing

Test breakpoints by altering the browser viewport dimensions:

```bash
# Mobile Viewport (iPhone 14 / 390px)
orca viewport --width 390 --height 844 --json
orca screenshot --output "brain/screenshots/mobile-390.png" --json

# Tablet Viewport (iPad / 768px)
orca viewport --width 768 --height 1024 --json
orca screenshot --output "brain/screenshots/tablet-768.png" --json

# Desktop Viewport (1440px)
orca viewport --width 1440 --height 900 --json
orca screenshot --output "brain/screenshots/desktop-1440.png" --json
```

---

## 5. Visual QA Checklist for AI Agents
1. Start dev server (`pnpm dev` or `npm run dev`).
2. Run `orca goto --url http://localhost:3000`.
3. Check mobile (390px) for horizontal overflow, clipped text, or overlapping buttons.
4. Check desktop (1440px) for container constraints, typography scale, and alignment.
5. Snapshot interactions: submit a form, verify validation errors display properly.
6. Feed screenshots back to refine Tailwind styling if visual discrepancies exist.
