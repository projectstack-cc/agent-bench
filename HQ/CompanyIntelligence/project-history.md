# Project History

**Confidence: mixed, flagged per entry.** This is a running log of missions
and known projects, not a curated digest — `briefing.md` is where the
compacted version lives once there's enough here to compact.

---

## Verified this session (High confidence)

- **2026-07-15 — Opportunity Court board session.** Ran the full 10-round
  executive board process against real market research. Verdict: build
  "Actions Ledger" (GitHub Actions cost monitoring). Not yet built — this
  was opportunity vetting, not a shipped product. Full transcript was
  published as an artifact; the underlying research (6 evidence-backed
  candidates, 3 researched-and-rejected) is the actual reusable output —
  worth pulling into `products.md`/`engines.md` reasoning if this
  opportunity is ever picked up as a real mission.
- **2026-07-16 — V1 Tauri Harness archived.** Phases 0-8 (CLI executor,
  workspace/Open Folder, Task Board, SQLite backbone, memory promotion
  pipeline, unverified Hire Agent workflow) committed as a restore point,
  then moved to `Archive/harness-v1/`. Reason: pivot to the Headquarters
  architecture — see `strategic-direction.md`.
- **2026-07-16 — Executive roster expanded.** Added `coo`, `cto`, `cfo`,
  `marketing`, `product`, `ux`, `security` to the original 9-agent roster,
  each conformed to the existing agent-definition standard after review.
- **2026-07-16 — HQ v2 migration (in progress).** This file's own creation
  is part of it — see `strategic-direction.md` for what's done vs. pending.

## Dormant proposal, never approved (High confidence it exists as a draft;
not a decision)

A 2026-07-06 dispatch drafted a full `agent-investor.md` definition — an
"Investment Committee" persona gating proposals on five constraints (30-day
ship window, organic customer acquisition without paid ads, revenue before
feature #10, workflow-fit over from-scratch ecosystem-building, a 2x
leverage test) with a GO/NO GO/RESEARCH MORE/PIVOT vote. It explicitly
asked for user permission to write the file and never received it — the
file was never created, and no executive in the current 17-agent roster is
this exact persona. `coo` and `cfo` cover overlapping ground (constraint
filtering, revenue timing) from a different angle. Recorded here rather
than acted on, per this company's own gated-write standard — if this is
still wanted, it's a real decision for the user, not something to silently
resurrect from a memory file.

## Known via a separate, real prior session (High confidence — files were
directly read this session, not recalled from memory)

A separate project, "lights-out" (a browser/desktop game suite — Crown
Court, Tactician, Pop Race, Bump & Run, Empire Street), produced real
operational lessons about running this CEO/executive pattern in practice.
Those lessons are already folded into `agent-ceo.md` (Decompose triggers,
Parallel Dispatch Safety) and `agent-qa-critic.md` (don't trust a dispatched
agent's self-report; a suggested fix is a hypothesis, not verified ground
truth) — not repeated here, follow those files directly. See
`success-history.md`/`failure-history.md` for the specific incidents.

## From project memory, NOT independently re-verified this session (Medium/Low confidence)

A ~13-project inventory (TapIn, xpanda-ops-platform, erp-lite, step3-ai,
cinevault, odysseus, tiny-worlds, pdf-tools, RadialNest,
precision-maintenance, formflow, subscription-worker, packslip-pro) exists
per a 2026-07-01 Obsidian vault reorg record. **This needs re-verification
via Folder Dive, not treated as current fact** — the record is over two
weeks old at time of writing and the Obsidian vault itself is being
retired, which is exactly the kind of change that could make a stale
inventory wrong in either direction (projects added, abandoned, or renamed
since).
