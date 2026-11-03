---
name: orca-orchestration
description: >-
  Coordinate supervised Orca workers: threaded messages, blocking ask/reply, task dispatch, worker_done/escalation waits, task DAGs, decision gates, coordinator loops, and decomposing work across agents. Use when orchestrating multiple coding agents (Antigravity CLI, Claude Code, Codex) across parallel Git worktrees, dispatching tasks, supervising workers, or collecting results.
triggers:
  - "orchestration"
  - "orca orchestration"
  - "orchestrate agents"
  - "worker-start"
  - "dispatch worker"
  - "task dag"
  - "multi-agent coordination"
  - "worker_done"
  - "supervisor agent"
  - "fan-out prompts"
---

# Orca Multi-Agent Orchestration (`orca-orchestration`)

Orca transforms an individual AI coding session into an entire **fleet coordination center**. Instead of running a single agent sequentially, a **Coordinator Agent** (e.g. Antigravity CLI) can decompose large features into a Directed Acyclic Graph (DAG) of discrete tasks, spin up supervised **Worker Agents** (such as Claude Code, OpenAI Codex, or other Antigravity instances) in isolated Git worktrees, supervise their progress, answer questions, and synthesize the final deliverable.

---

## 1. Orchestration Architecture & Roles

```
                      ┌──────────────────────────────────────────────┐
                      │              Coordinator Agent               │
                      │     (Antigravity CLI / Master Planner)       │
                      │  - Decomposes tasks into DAGs                │
                      │  - Dispatches workers via worker-start       │
                      │  - Monitors mailbox via orchestration check   │
                      │  - Resolves gates & reviews diffs            │
                      └──────────────────────┬───────────────────────┘
                                             │
                 ┌───────────────────────────┼───────────────────────────┐
                 │ Dispatches Task A         │ Dispatches Task B         │ Dispatches Task C
                 ▼                           ▼                           ▼
    ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
    │     Worker Agent 1      │ │     Worker Agent 2      │ │     Worker Agent 3      │
    │      (Claude Code)      │ │     (OpenAI Codex)      │ │   (Antigravity Sub)     │
    │  Worktree: feat-schema  │ │   Worktree: feat-api    │ │   Worktree: feat-ui     │
    │  Signals: worker_done   │ │  Calls: orca ask (?)    │ │  Signals: worker_done   │
    └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

### Roles:
1. **Coordinator**: Plans the architecture, breaks tasks into specs, dispatches workers, answers worker queries, and merges code.
2. **Worker**: Runs inside an isolated git worktree, receives a structured task specification with a preamble, implements code, asks questions if blocked via `orca orchestration ask`, and reports completion via `worker_done`.

---

## 2. Dispatching Workers (`worker-start`)

The coordinator uses `orca orchestration worker-start` to assign a task specification to a worker agent. Orca handles spinning up the terminal, provisioning the worktree, and injecting the standard orchestration preamble.

### Common Worker Start Modes

#### Mode A: Stacked Child Worktree (Recommended for sub-features)
Spawns a child worktree branching off the current working state:
```bash
orca orchestration worker-start \
  --spec "Implement Supabase Server Client and cookie session handlers in src/lib/supabase/server.ts according to docs/DATABASE.md" \
  --worktree new-child \
  --name "worker-supabase-client" \
  --agent codex \
  --setup "pnpm install" \
  --json
```

#### Mode B: Independent Top-Level Worktree (Recommended for parallel spikes)
Spawns a clean branch off a specific base repository:
```bash
orca orchestration worker-start \
  --spec "Audit and refactor Tailwind responsive breakpoints across mobile (390px) and tablet (768px)" \
  --worktree new-top-level \
  --repo id:current \
  --name "worker-responsive-audit" \
  --agent claude \
  --json
```

#### Mode C: Current Workspace (Supervised terminal in active context)
```bash
orca orchestration worker-start \
  --spec "Run end-to-end typecheck and build validation" \
  --worktree current \
  --agent opencode \
  --json
```

---

## 3. Worker Execution & Preamble Protocol

When a worker starts, Orca automatically injects a structured preamble into its context:
```text
=== ORCA ORCHESTRATION TASK PREAMBLE ===
Task ID: task_7f21b
Dispatch ID: disp_8819a
Worktree: C:/worktrees/feat-schema
Coordinator: term_coord_01
Rules:
1. You are isolated in this git worktree. Make changes freely.
2. If you need clarification from the coordinator, run:
   orca orchestration ask --to coordinator --question "<your question>"
3. When your task is complete and verified, signal completion:
   orca orchestration send --to coordinator --type worker_done --subject "Complete" --body "<summary>"
========================================
```

### Worker Commands:

#### Asking Questions (Blocking Query)
If a worker encounters an ambiguous contract or missing secret:
```bash
orca orchestration ask \
  --to coordinator \
  --question "Should the alumni table include graduation_year as integer or date?" \
  --json
```
*(The worker pauses until the coordinator sends a reply).*

#### Reporting Completion (`worker_done`)
When the worker has completed the task and verified tests pass:
```bash
orca orchestration send \
  --to coordinator \
  --type worker_done \
  --subject "Task task_7f21b Completed" \
  --body "Created server.ts Supabase client with cookie persistence. TypeScript checks passed." \
  --json
```

---

## 4. Coordinator Supervisory Loop

The Coordinator does not burn tokens polling in tight loops. Instead, it uses `orca orchestration check` with `--wait` to sleep until events arrive.

### 1. Wait for Incoming Events
```bash
orca orchestration check \
  --terminal active \
  --wait \
  --types "worker_done,escalation,question" \
  --json
```

The output returns incoming deliveries:
```json
{
  "deliveries": [
    {
      "id": "deliv_4410",
      "from": "disp_8819a",
      "type": "question",
      "body": "Should the alumni table include graduation_year as integer or date?"
    }
  ]
}
```

### 2. Answering Worker Questions
```bash
orca orchestration reply \
  --to "disp_8819a" \
  --delivery "deliv_4410" \
  --body "Use integer for graduation_year (e.g. 2024)." \
  --json
```

### 3. Acknowledging Processed Deliveries
```bash
orca orchestration check --terminal active --ack "deliv_4410" --json
```

### 4. Handling `worker_done`
When `worker_done` arrives:
1. Inspect the worker's changes:
   ```bash
   orca worktree snapshot --worktree "path:<worker-worktree-path>" --json
   ```
2. If acceptable, merge the worker branch into your main task branch:
   ```bash
   git merge <worker-branch>
   ```
3. Clean up the worker worktree:
   ```bash
   orca worktree remove --worktree "path:<worker-worktree-path>" --json
   ```

---

## 5. Broadcasting to the Fleet

You can send broadcast messages or status alerts to multiple agents simultaneously using target group aliases:

```bash
# Broadcast to all agents
orca orchestration send --to "@all" --subject "Repo Lock" --body "Please commit work; DB migration starting." --json

# Broadcast to idle agents
orca orchestration send --to "@idle" --subject "New Task Available" --body "Check task board for issue #42." --json

# Target specific agent models
orca orchestration send --to "@claude" --subject "Style Guide" --body "Follow AGENTS.md anti-slop rules." --json
```

---

## 6. The 100x Parallel Spike Pattern ("Prompt Racing")

When solving a complex architectural or UI problem where multiple approaches exist:
1. Spawn 3 workers on 3 independent worktrees:
   - Worker 1 (`codex`): Approach A (e.g., Client-side filtering).
   - Worker 2 (`claude`): Approach B (e.g., Server Actions with URL searchParams).
   - Worker 3 (`antigravity`): Approach C (e.g., Route Handler + SWR caching).
2. Wait for all 3 `worker_done` events.
3. Compare the snapshots and performance metrics.
4. Merge the highest-quality approach and delete the others.
