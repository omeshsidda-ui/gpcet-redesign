---
name: go-project
description: "Guide for advancing a project implementation by executing tasks from an existing PLAN.md and TODO.md, and keeping the documentation in sync with actual progress. Use this skill whenever the user wants to continue working on a project, implement the next steps, make progress on planned tasks, or says things like 'let's continue', 'next step', 'implement this', 'do the next task', or references an existing PLAN.md or TODO.md. Also use when the user asks to build, code, or implement something that is already described in docs/PLAN.md or docs/TODO.md."
---

# Go Project

When an AI agent resumes work on a project that has an existing `docs/PLAN.md` and `docs/TODO.md`, the agent must read these files first, understand the current state, execute the next task, and update the documentation to reflect progress. This skill ensures continuity between sessions and prevents the agent from re-deriving the plan or deviating from established decisions.

## Workflow

When the user asks you to continue, implement, or make progress on a project, follow this workflow:

1. **Read existing docs** — Read `docs/PLAN.md`, `docs/TODO.md`, and any files in `docs/references/` if they exist. Understand the design decisions already made and what tasks remain.
2. **Confirm understanding** — Briefly summarize to yourself: what is the project, what was the last completed step, and what is the next immediate step?
3. **Execute the next task** — Implement the task described in TODO.md as the "Next immediate step." Follow the design in PLAN.md. Do not deviate from established decisions unless the user explicitly requests it.
4. **Update TODO.md** — Mark completed tasks with `[x]`. Reveal the next task as the new "Next immediate step." If new tasks were discovered during implementation, add them. Remove the "Next immediate step" section and recreate it at the top with the new next task.
5. **Update PLAN.md if needed** — If design decisions changed during implementation (e.g., a library didn't work as expected and an alternative was chosen), update PLAN.md to reflect the new decision. Do NOT add new decisions that the user didn't confirm.
6. **Save research to references/** — If you looked up an API, library, or technical detail during implementation, save the findings to `docs/references/` instead of keeping them in context. Follow the same guidelines as the create-project skill: write in markdown, include the source at the top, summarize key findings, and note trade-offs or caveats.
7. **Summarize in conversation** — Report what was done, what was completed, and what the next step is.

## Important Rules

- **Follow the plan.** PLAN.md contains finalized decisions. Do not ignore them or invent alternatives without user approval.
- **Only do the next step.** Do not implement multiple tasks ahead unless the user explicitly asks for bulk progress. Focus on one step at a time to allow the user to review and steer.
- **Do not add speculative tasks.** If new work is discovered, add it to TODO.md only if it is directly necessary to complete the current goal. Do not add "nice-to-have" or future enhancements.
- **Update docs immediately after completing work.** Do not wait until the end of the session. Update TODO.md (and PLAN.md if needed) as soon as a task is done.
- **If PLAN.md and TODO.md are missing or incomplete,** ask the user whether to create them using the create-project skill, or proceed without them.

## Example

**User:** "Let's continue with the CSV to JSON CLI tool. Implement the core logic."

**Agent action:**
1. Read `docs/PLAN.md` — confirms: single Python script, stdlib only, `csv.DictReader` → `json.dump`.
2. Read `docs/TODO.md` — next immediate step is "Implement `csv_to_json()` function."
3. Create `csv_to_json.py` with the core logic matching the plan.
4. Test with a sample CSV file.
5. Update `docs/TODO.md`:
   - Mark "Implement `csv_to_json()` function" as `[x]`.
   - Set new next immediate step: "Add CLI argument parsing with `argparse`."
6. Report: "I've implemented the core `csv_to_json()` function. It reads CSV via `DictReader` and outputs formatted JSON. The next step is to add the CLI interface. I've updated `docs/TODO.md`."
