---
name: create-project
description: "Guide for managing long-running AI agent tasks by persisting implementation plans, task lists, and research notes into project documentation files (docs/PLAN.md, docs/TODO.md, docs/references/). Use this skill whenever the user wants to create a PLAN.md, TODO.md, or reference notes, when starting a new project or planning a new feature, when the user says 'let's plan this out', 'create a plan', 'write down the next steps', or mentions organizing research or design decisions into docs. Also use when the conversation is getting long and the user wants to checkpoint progress into files to save context."
---

# Create Project

When an AI agent is working on a multi-step implementation task, the conversation context grows large and becomes costly. This skill helps the agent offload the plan, task list, and research findings into durable project files so that:
- The agent can resume work efficiently by reading these files instead of re-deriving the plan from conversation history.
- The user has a persistent record of decisions, architecture, and pending tasks.
- Future agents (or the same agent in a new session) can pick up where the previous one left off.

## Workflow

When the user asks you to plan, design, or organize research for a project, follow this workflow:

1. **Check existing docs** — Read `docs/PLAN.md`, `docs/TODO.md`, and any files in `docs/references/` if they already exist. Understand the current state before overwriting.
2. **Decide what to capture** — Ask yourself: what does the next agent (or future me) need to know to continue without re-asking the user?
3. **Resolve ambiguities before writing** — If the user's request leaves important design choices undefined (e.g., which auth provider, which database), ask the user to decide before writing PLAN.md. PLAN.md must contain zero undecided items. Do not proceed to step 4 until every ambiguity is resolved.
4. **Write docs** — Create or update the files described below.
5. **Summarize in conversation** — After writing, give the user a brief summary of what was saved and where.

## docs/PLAN.md

This is the high-level design document. It should contain:

- **Project / Feature Goal** — One-sentence summary of what we are building.
- **Design Principles** — Constraints or philosophies guiding the implementation (e.g., "keep it simple", "no external dependencies").
- **Architecture Overview** — Diagrams in text or bullet points showing major components and how they interact.
- **API / Interface Spec** — Function signatures, endpoints, or public APIs, if applicable.
- **Data Models** — Key schemas or types.
- **Dependencies** — External libraries, services, or tools required.
Use markdown headers. Keep it concise but complete enough that someone reading it can implement the feature without re-discovering the design.

**Important:** Document only what the user has actually decided or explicitly requested. Do NOT invent additional features, future extensibility points, or hypothetical requirements that the user did not mention. Every item in PLAN.md must be a finalized decision. If something is genuinely undecided, stop writing PLAN.md and ask the user to decide it. Do not list undecided items anywhere in PLAN.md. The next agent must be able to execute TODO.md by reading PLAN.md without encountering any ambiguity.

## docs/TODO.md

This is the actionable task list. It should contain:

- A checklist of concrete implementation steps.
- Mark completed items with `[x]` and pending items with `[ ]`.
- Group tasks by phase if the project is large (e.g., Phase 1: Setup, Phase 2: Core logic).
- Include a "Next immediate step" section at the top so the next agent knows exactly what to do first.

**Important:** Only list tasks that the user has explicitly requested or that are directly necessary to achieve the stated goal. Do NOT add speculative future enhancements, backlogs, or "nice-to-have" features that the user did not ask for. This prevents the next agent from making unwanted changes that deviate from the user's actual intent.

Update this file as tasks are completed or new ones are discovered.

## docs/references/

This directory holds detailed research notes, API documentation summaries, or technical deep-dives. Each file should cover one topic (e.g., `references/auth0-api.md`, `references/react-server-components.md`).

Guidelines:
- Write in markdown.
- Include the **source** (URL or document name) at the top, but do not rely on fetching it live every time — paste the relevant excerpts directly into the file.
- Summarize the **key findings** that influenced the design.
- Note any **trade-offs** or **caveats** discovered during research.

## When to update

- **Before a long break** — If the session is ending, write the current state to these files.
- **After a design decision** — When the user confirms an architectural choice, capture it in PLAN.md.
- **After research** — When you have looked up an API or library, save the findings to references/ instead of keeping them in context.
- **After completing a task** — Update TODO.md to mark items done and reveal the next steps.

## Example

**User:** "Let's build a CLI tool that converts CSV to JSON. Please plan it out and save the plan to docs."

**Agent action:**
1. Create `docs/PLAN.md` with goal, architecture (single Python script, argparse), API (`csv_to_json(file_path)`), dependencies (`stdlib only`).
2. Create `docs/TODO.md` with tasks: `[ ] Create project structure`, `[ ] Implement csv reader`, `[ ] Implement json writer`, `[ ] Add CLI args`.
3. Since no external research is needed yet, skip `docs/references/`.
4. Summarize: "I've saved the plan to `docs/PLAN.md` and the task list to `docs/TODO.md`."
