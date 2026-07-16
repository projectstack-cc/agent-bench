# Recon: lights-out — 2026-07-17

**Confidence: High** — already deeply read earlier in this session
(`planning/decisions.md`, `planning/handoff-*.md`, `planning/reviews/`);
this is a filing pass against that existing knowledge, not a fresh read.

## Reusable engines found

A generalized game-suite engine: shared `board.ts`/`base-game.ts` with
optional capability-flag methods (`needsRoll`, `applyRoll`, `hasMandatoryJumps`)
that individual games opt into — a real, working plugin-style extension
pattern for adding a new game without modifying the shared engine.

## Reusable components found

Procedural Web Audio API sound generation (no audio file assets at all) —
directly reusable for any future game project on this stack.

## Technical capabilities found

Tauri v2 + vanilla TypeScript, Canvas 2D + SVG rendering, IndexedDB
persistence (`SaveManager` wrapper), local minimax/rule-based AI (no cloud
AI calls — deterministic, offline).

## Repeated architectural patterns found

- **JSON config + TypeScript rules-module per game** — adding a new game
  requires data entry + a rules module, not engine changes (ADR-007).
  Directly reusable pattern for any future multi-variant product.
- **One-time purchase, free tier + $9.99 unlock** — same pattern as
  `tiny-world`, independently reasoned (see that report and the INDEX).
- **A dedicated per-project decisions/ADR file** — `planning/decisions.md`
  documents every major technical choice with context/decision/consequences/
  alternatives-considered. The same authoring habit shows up in
  `RadialNest_PROMPT.md` and `tiny-world/planning/decisions.md` — a real,
  recurring pattern worth naming company-wide (see INDEX).

## Unfinished work found

Per this session's earlier reading of `planning/handoff-2026-07-10.md`:
Empire Street Milestone A was dispatched but its result was never verified
before the session ended — status as of that handoff was "treat as not
started, re-dispatch." Current status unknown without re-checking
`git log`/`git status` directly against the live repo.

## Abandoned opportunities found

None identified — this looks like an actively-maintained project, not
abandoned.

## Recommended Company Intelligence updates

- `engines.md`: the capability-flag game engine pattern (`needsRoll`/
  `applyRoll`/etc.) and the JSON-config + rules-module pattern — both
  already partially captured in `HQ/CompanyIntelligence/success-history.md`
  and `agent-ceo.md`'s process lessons from this same project; this entry
  is the *technical* pattern, distinct from the *process* lessons already filed.
- `patterns.md`: per-project ADR/decisions file as a company-wide authoring
  habit — cited three times now (lights-out, tiny-world, RadialNest).
