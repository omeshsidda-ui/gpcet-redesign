---
name: docs-sync
description: >-
  Synchronize project documentation with actual code, migrations, and architecture changes.
  Use at the end of substantial coding tasks to eliminate documentation drift and context drift
  across AGENTS.md, README.md, docs/ARCHITECTURE.md, docs/DATABASE.md, docs/API.md,
  docs/BUSINESS_LOGIC.md, docs/decisions/, and SESSION_HANDOFF.md.
triggers:
  - "sync docs"
  - "update documentation"
  - "check documentation drift"
  - "session handoff"
  - "document changes"
---

# Documentation Synchronization (`docs-sync`)

Act as a Senior Software Documentation Engineer. Your mission is to keep project documentation 100% accurate, up-to-date, and immediately actionable for subsequent AI coding sessions and human engineers, eliminating **documentation drift** and **context drift**.

---

## 1. Inspect Changes (Source of Truth)
Before modifying any documentation:
- Run `git status` and `git diff --stat` (and examine key diffs) to see the exact delta.
- Identify all created, modified, renamed, or deleted files.
- Inspect database schema changes (e.g. Supabase migrations, Prisma schemas, raw SQL).
- Inspect API contract changes (Next.js route handlers, Server Actions, query parameters, payload shapes).
- Inspect UI, styling tokens, or component hierarchy changes.
- Inspect newly added or modified configuration files, environment variables, or package scripts.

---

## 2. Determine What Needs Updating
Documentation must only be updated when **durable project knowledge** has changed. Never touch files indiscriminately.
Target files according to their domain:

| Domain | Authoritative File | When to Update |
| :--- | :--- | :--- |
| **Agent Operations** | `AGENTS.md` | When CLI commands, project rules, core invariants, or skills change. |
| **Project Overview** | `README.md` | When quickstart instructions, repository tree, or major features change. |
| **System Design** | `docs/ARCHITECTURE.md` | When component boundaries, data flow, state management, or tech stack change. |
| **Data Schema** | `docs/DATABASE.md` | When tables, columns, relations, indexes, or Supabase RLS policies change. |
| **API Endpoints** | `docs/API.md` | When route handlers, Server Actions, request/response types, or error envelopes change. |
| **Domain Rules** | `docs/BUSINESS_LOGIC.md` | When academic policies, accreditation calculations, or validation rules change. |
| **Architectural Choices** | `docs/decisions/*.md` (ADRs) | When choosing or replacing a core technology, auth pattern, or DB model. |
| **Release History** | `docs/CHANGELOG.md` | When user-visible features, fixes, or breaking changes land. |
| **Session State** | `SESSION_HANDOFF.md` | At the end of every substantial development turn. |

---

## 3. Preserve Accuracy & Avoid Duplication
- **Implementation is Truth**: The actual code, schema, and migrations are the single source of truth. Never document aspirational features as if they are already implemented.
- **No Hallucinations**: Never invent config keys, endpoints, or props that do not exist.
- **Link, Don't Copy**: Point to authoritative reference files (e.g. `[ARCHITECTURE.md](./docs/ARCHITECTURE.md)`) instead of repeating explanations across multiple markdown files.
- **Prune Dead Context**: Actively delete references to deleted components, obsolete environment variables, or abandoned scripts.

---

## 4. Architecture Decision Records (ADRs)
When an important architectural choice is made (e.g. database selection, authentication model, routing paradigm, state management library):
1. Create a numbered Markdown file in `docs/decisions/` (e.g. `001-database-choice.md`).
2. Follow standard ADR structure:
   - **Status**: Proposed / Accepted / Superseded / Deprecated
   - **Context**: The problem being solved and constraints.
   - **Decision**: The selected solution and technology.
   - **Consequences**: Positive benefits, trade-offs, and maintenance requirements.
   - **Alternatives Considered**: Other tools evaluated and why they were rejected.

---

## 5. Verification Checklist
Before declaring documentation synchronized:
1. **Links & Paths**: Check all Markdown relative links (`[link](path)`) to ensure target files exist.
2. **Commands**: Verify all CLI commands against `package.json` scripts.
3. **Schemas**: Verify column names and types in `docs/DATABASE.md` against actual migrations.
4. **API Signatures**: Verify parameter names and HTTP status codes in `docs/API.md` against route files.
5. **No Contradictions**: Ensure no file contradicts another (e.g. one file saying "Postgres" and another saying "MongoDB").

---

## 6. Session Handoff (`SESSION_HANDOFF.md`)
At the end of every session, overwrite or update `SESSION_HANDOFF.md` with:
```markdown
# Session Handoff

## Current Status
- **Current State**: [Brief 1-2 sentence description of working branch/state]
- **Completed in this Session**:
  - [Task 1]
  - [Task 2]
- **Key Decisions Made**:
  - [Decision 1 (link to ADR if applicable)]
- **Tests & Verification**:
  - [Results of builds, unit tests, security scans, visual inspections]
- **Known Issues / Blockers**:
  - [Any unresolved bugs or environment caveats]
- **Recommended Next Steps**:
  1. [Next concrete action]
  2. [Subsequent action]
```
Keep this file bounded and concise so future agents can resume immediately without reading thousands of lines of chat history.

---

## 7. Final Report Output
Always provide a concise summary in the conversation turn:
- **Synchronized Documentation Files**: List of updated files.
- **ADRs Created / Updated**: Links to new decisions.
- **Pruned Stale Information**: Outdated context removed.
- **Verification Evidence**: Commands run and links validated.
