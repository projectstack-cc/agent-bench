# Librarian: Agent Harness Constitution Migration (2026-07-06)

Performed the full architectural review requested by the user: centralized
duplicated agent rules into `Agents/_constitution.md`, added a new `ops`
agent, reframed backend/frontend/ue-dev toward outcome ownership, added
confidence reporting + anti-hallucination + decomposition/rejection
authority (CEO) + opportunity scoring (research). Full changelog at
`project_files/agent-harness-architecture-review-2026-07-06.md`.

## What made this safe rather than cosmetic

Stripping duplicated rules out of 9 agent files only preserves behavior if
the dispatch pipeline actually delivers the shared rules to a cold `claude -p`
subprocess. Verified `assemblePrompt()` in `harness/src/engine/ceo.ts` only
injected the single agent's `.md` before this change — a bare "see the
constitution" pointer would have been a silent no-op. Fixed by adding
`loadConstitution()` to the vault connector and prepending it in
`assemblePrompt()`. This is the one place vault content (markdown) and app
code (TypeScript) are coupled — future refactors of `ceo.ts` need to keep
this injection, or every agent silently loses the shared rules again. Now
documented in the Librarian's own "Constitution Health" checklist so this
doesn't need rediscovering.

## Verified before declaring done

- `npx tsc --noEmit` clean after touching connector.ts/direct.ts/mcp.ts/
  ceo.ts/AgentSidebar.tsx/DispatchPanel.tsx/harness.ts
- `listAgents()`'s regex (`^agent-.+\.md$`) confirmed against the real
  10 files on disk (9 original + agent-ops.md) — no orphaned/invisible agent
- No leftover duplicated ERP-firewall boilerplate anywhere in `Agents/`
  (grepped for the old canned-refusal phrasing post-edit)
- Rule-number cross-references (`Rule 6`, `Rule 3`) in agent files checked
  against the constitution's actual numbering

## Not verified — flagged, not silently assumed

- No live dispatch was run through the actual Tauri app to confirm the
  constitution renders correctly inside a real assembled prompt end-to-end.
  Given this harness's own Phase 5-7 lesson (compile-clean was previously
  mistaken for "done" until a real dispatch caught a real bug), the next
  session should run one real dispatch of any agent and check the streamed
  prompt actually contains the `# Global Constitution` section before
  treating this migration as fully proven, not just structurally sound.

## Not touched, deliberately

- `harness/src/store/harness.ts`'s `hireAgent()` chain (Phase 8, marked
  untested in existing project memory) — its agent-drafting prompt could
  reference this new constitution convention later, but editing further
  into an already-large uncommitted diff, on a feature this review didn't
  ask about, wasn't worth the risk.
- The OneDrive Obsidian vault — separate instance from this repo's working
  vault; not touched.
- `Agents/ceo.py`, `obsidian_scraper.py`, and the `.bat` files sitting loose
  in `Agents/` — pre-existing, not created by this migration. Worth a future
  housekeeping pass (the OneDrive vault already moved its equivalents to
  `Agents/tooling/`) but reorganizing them wasn't part of this request and
  moving files needs a confirm-first pass, not a silent bundle into an
  unrelated architecture review.
