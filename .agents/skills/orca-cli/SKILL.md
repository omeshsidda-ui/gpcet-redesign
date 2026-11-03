---
name: orca-cli
description: >-
  Operate Orca-managed worktrees, folder contexts, terminals, repos, automations, artifacts, skill sharing, worktree comments, and Orca's embedded browser through the `orca` CLI. Use when the user says "orca", "orca-cli", "$orca-cli", "Orca worktree", "child worktree", "spawn codex/claude in a worktree", "read/wait/send Orca terminal", "handoff" / "handover" / "give this to another agent", "Orca browser", "orca artifacts", or "share skills". Prefer it over raw git worktree, ad hoc PTYs, or Computer Use when Orca state is involved.
triggers:
  - "orca"
  - "orca-cli"
  - "$orca-cli"
  - "orca worktree"
  - "child worktree"
  - "spawn agent in worktree"
  - "orca terminal"
  - "terminal send"
  - "terminal wait"
  - "orca handoff"
  - "orca browser"
---

# Orca CLI (`orca-cli`)

The **Orca Command Line Interface (`orca`)** is the primary control plane for **Orca ADE (Agent Development Environment)** created by Stably AI. Orca allows developers to run, manage, and orchestrate a fleet of parallel AI coding agents (Antigravity CLI, Claude Code, OpenAI Codex CLI, OpenCode, Cursor, Pi) in isolated Git worktrees.

When running inside an Orca terminal (identified by `ORCA_APP_VERSION`, `ORCA_WORKSPACE_ID`, `ORCA_WORKTREE_ID`, and `ORCA_TERMINAL_HANDLE` in your environment), you can command Orca directly to create worktrees, control terminals, open and snapshot pages in the embedded browser, manage artifacts, and hand off tasks.

---

## 1. CLI Executable Resolution

Before running commands, identify the correct executable alias for your environment:

1. **`ORCA_CLI_COMMAND` environment variable**: If set (e.g. in managed WSL sessions), use its value.
2. **Dev checkout**: If `ORCA_DEV_REPO_ROOT` is set, use `orca-dev`.
3. **Linux outside an Orca terminal**: Use `orca-ide` (**Never bare `orca`**, which is the GNOME screen reader `/usr/bin/orca`).
4. **Standard Windows / macOS / Orca Terminal**: Use `orca`.

> **Rule**: Always prefer structured JSON output (`--json`) when executing commands programmatically so results can be parsed cleanly.

```bash
# Verify connection to running Orca instance
orca status --json
```

If Orca is not open, launch it via:
```bash
orca open --json
```

---

## 2. Worktree Management (`orca worktree`)

Orca automatically provisions native Git worktrees (`git worktree add`) so multiple agents can work on separate features, tests, or bug fixes simultaneously without file collisions or merge lockups.

### Common Worktree Selectors
Instead of memorizing long UUIDs, target worktrees using selectors:
- `active` / `current`: The currently focused worktree.
- `path:<absolute-or-relative-path>`: Target by filesystem path.
- `branch:<branch-name>`: Target by branch name (e.g. `branch:feat-auth`).
- `issue:<id>`: Target by linked issue ID (e.g. `issue:ENG-104`).

### Commands

#### Create an Isolated Worktree
```bash
# Basic creation (creates new branch and folder)
orca worktree create --name "feat-supabase-auth" --json

# Create with explicit base branch
orca worktree create --name "fix-nav-contrast" --base "main" --json

# Create with specific setup script or agent bootstrap
orca worktree create --name "refactor-api" --setup "npm install" --json
```

#### List Active Worktrees
```bash
orca worktree list --json
# or short alias:
orca ps --json
```
Output returns an array of worktrees with:
- `id`: Worktree identifier.
- `name`: Assigned name.
- `path`: Absolute filesystem path to the worktree checkout.
- `branch`: Git branch attached to this worktree.
- `terminals`: List of running terminal handles.
- `isCurrent`: Boolean flag indicating if this is your active worktree.

#### Inspect Worktree
```bash
orca worktree show --worktree "branch:feat-supabase-auth" --json
```

#### Worktree Snapshot (Diffs & State)
```bash
# Take a snapshot of code changes and modified files
orca worktree snapshot --worktree active --json
```

#### Remove / Clean Up Worktree
```bash
# Remove worktree after merging or abandoning a spike
orca worktree remove --worktree "branch:feat-supabase-auth" --force --json
```

---

## 3. Terminal Control (`orca terminal`)

Orca features high-performance WebGL terminals. Agents can inspect terminal outputs, wait for processes to complete, or inject prompts into other agent terminals.

### Commands

#### List Terminals
```bash
orca terminal list --json
```

#### Create a New Terminal Pane / Split
```bash
# Create terminal in active worktree
orca terminal create --worktree active --json

# Split terminal horizontally or vertically
orca terminal create --split horizontal --json
```

#### Send Commands or Prompts (`orca terminal send`)
Inject keystrokes or prompts into an agent terminal:
```bash
# Send a command to active terminal
orca terminal send --text "npm test" --enter --json

# Send instructions to a specific worker terminal
orca terminal send --terminal "term_2b081582-f92e-4c8f-aeeb" --text "Review the auth middleware implementation." --enter --json
```

#### Wait on Terminal State (`orca terminal wait`)
Pause execution until a running process or agent finishes its turn:
```bash
# Wait for an interactive agent (TUI) to become idle
orca terminal wait --terminal "term_2b081582-f92e-4c8f-aeeb" --for tui-idle --timeout-ms 60000 --json

# Wait for a command process to exit
orca terminal wait --for exit --timeout-ms 30000 --json
```

#### Read Terminal Output (`orca terminal read`)
Inspect what a worker agent or build script just logged:
```bash
# Read last 100 lines of screen output
orca terminal read --terminal "term_2b081582-f92e-4c8f-aeeb" --lines 100 --json
```

---

## 4. Embedded Chromium Browser Automation

Orca includes a built-in Chromium browser. You can navigate, snapshot DOM elements, click, fill forms, and take screenshots directly without external webdrivers.

### Interactive Snapshot-Interact Loop:
1. **Navigate**:
   ```bash
   orca goto --url "http://localhost:3000" --json
   ```
2. **Snapshot Accessibility & DOM Nodes**:
   ```bash
   orca snapshot --json
   ```
   *Returns an element tree with assigned element handles like `@e1`, `@e2`, `@e3`.*
3. **Interact**:
   ```bash
   # Click a button or link
   orca click --element "@e2" --json

   # Fill text into an input field
   orca fill --element "@e1" --value "admin@college.edu" --json

   # Press keyboard key
   orca press --key "Enter" --json
   ```
4. **Visual Screenshot**:
   ```bash
   orca screenshot --output "brain/screenshots/auth-page.png" --json
   ```

---

## 5. Artifacts, Comments & Code Reviews

Orca allows human developers and agents to annotate diffs and share structured documents.

### Worktree Comments
```bash
# Add a comment to an active worktree diff
orca comment create --worktree active --file "src/app/page.tsx" --line 42 --body "Ensure this query includes an index hint." --json

# List comments on the current worktree
orca comment list --worktree active --json
```

### Artifacts
```bash
# Open an artifact (markdown / preview) in an Orca panel
orca artifact open --file "docs/ARCHITECTURE.md" --json
```

---

## 6. Full Ownership Handoffs (`handoff`)

When you finish your phase of work (or need to hand off a task to another specialized agent like a tester or reviewer):

1. **Commit and Snapshot Changes**:
   ```bash
   git status
   orca worktree snapshot --worktree active --json
   ```
2. **Dispatch / Handoff**:
   ```bash
   orca terminal send --terminal "<target-terminal>" --text "Task complete on branch feat-auth. Please run E2E test suite." --enter --json
   ```
3. **Notify User**: Provide the branch name, worktree path, and summary of changes for seamless pickup.
