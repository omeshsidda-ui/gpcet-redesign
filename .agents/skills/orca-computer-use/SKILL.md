---
name: orca-computer-use
description: >-
  Drive the GUI of visible local desktop application windows through the `orca computer` CLI. Use when you need to inspect accessibility trees, click buttons, type text, open menus, capture window screenshots, or interact with native OS dialogs and external applications (Chrome, Edge, Postman, Figma, simulator windows) that cannot be controlled via API, CLI, or filesystem commands. Prefer programmatic paths over GUI automation whenever possible.
triggers:
  - "orca computer"
  - "computer-use"
  - "gui automation"
  - "desktop click"
  - "native window"
  - "window screenshot"
---

# Orca Computer Use (`orca-computer-use`)

The **Orca Computer Use** interface enables AI agents to interact with native desktop application windows on the host operating system (Windows, macOS, Linux). It operates through accessibility tree inspection, coordinate-based clicks, keyboard typing, and window screenshots.

---

## 1. Golden Rule: Prefer Programmatic Paths First

> ⚠️ **IMPORTANT**: Computer Use (GUI interaction) is the slowest and most fragile path.
> - **Always prefer** shell commands, direct API requests, database queries, and filesystem operations.
> - **Always prefer** `orca-browser` for web pages inside Orca's embedded Chromium browser.
> - **Use `orca-computer-use` ONLY** when an external desktop application or native OS dialog has no CLI, API, or programmatic interface.

---

## 2. Window Discovery & Inspection

Before interacting, locate the target application window:

```bash
# List all visible windows and their window IDs
orca computer windows --json
```

Output:
```json
{
  "windows": [
    { "id": "win_1042", "title": "Google Chrome", "app": "chrome.exe", "bounds": { "x": 0, "y": 0, "w": 1920, "h": 1080 } },
    { "id": "win_2055", "title": "Postman", "app": "Postman.exe", "bounds": { "x": 100, "y": 100, "w": 1200, "h": 800 } }
  ]
}
```

### Inspect Accessibility Tree
Inspect native controls (buttons, textboxes, tabs) inside a specific window:
```bash
orca computer snapshot --window "win_2055" --json
```

---

## 3. Mouse & Keyboard Interaction

### Coordinate & Element Clicks
```bash
# Click a specific element discovered in snapshot
orca computer click --window "win_2055" --element "@c4" --json

# Click specific (x, y) coordinates
orca computer click --window "win_2055" --x 450 --y 220 --json

# Double click / Right click
orca computer click --window "win_2055" --x 450 --y 220 --button right --json
orca computer click --window "win_2055" --x 450 --y 220 --count 2 --json
```

### Typing and Key Combinations
```bash
# Type text into focused control
orca computer type --window "win_2055" --text "https://api.college.edu/v1/students" --json

# Send keyboard shortcuts (e.g. Ctrl+S, Enter, Alt+F4)
orca computer key --window "win_2055" --key "Ctrl+Enter" --json
orca computer key --window "win_2055" --key "Escape" --json
```

---

## 4. Window Screenshots

```bash
# Capture full application window
orca computer screenshot --window "win_2055" --output "brain/screenshots/postman-result.png" --json

# Capture specific desktop region
orca computer screenshot --bounds "100,100,800,600" --output "brain/screenshots/crop.png" --json
```
