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
  published as an artifact; full source now durable at
  `Recon/opportunity-court-1-report-2026-07-15.md` (was scratchpad-only
  until 2026-07-17). Underlying research (6 evidence-backed candidates, 3
  researched-and-rejected) is the actual reusable output — worth pulling
  into `products.md`/`engines.md` reasoning if this opportunity is ever
  picked up as a real mission.
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
- **2026-07-16 — Executive Company Audit.** Full 15-area governance/
  architecture review (`project_files/hq-executive-audit-2026-07-16.md`).
  Headline finding: zero operational history behind every claim in Company
  Intelligence at that point. Reconnaissance named as the one framework
  worth building in full immediately, everything else tagged NOW (cheap,
  fix now) or DEFER (needs real mission data first).
- **2026-07-17 — First real Reconnaissance sweep.** 15 projects surveyed
  across `C:\Users\scook\.dev` and GitHub (`Recon/2026-07-17-INDEX.md`).
  Directly falsified part of the audit's headline finding: a real,
  already-tried go-to-market attempt (ProjectStack Web Solutions) exists,
  though it has produced zero revenue to date — see
  `strategic-direction.md`'s correction. Populated `products.md`,
  `engines.md`, `patterns.md`, and `capabilities.md` for the first time.
  `xpanda-ops-platform` Recon authorized by the founder as a follow-up,
  overriding the ERP Firewall for this read-only pass specifically — see
  `HQ/DECISIONS.md`.
- **2026-07-17 — xpanda-ops-platform Recon + ownership resolved (first
  pass).** ERP Firewall exception exercised (`HQ/DECISIONS.md`); verified
  independently (mtime-checked) that nothing in that repo was modified and
  no `CompanyIntelligence/` file was written by the pass itself, before
  reporting findings. Confirmed a real, actively-developed production ERP
  — 581 commits, real production incidents fixed, the single most
  technically sophisticated reusable asset found across both Recon passes
  (a kerf-aware bin-packing engine). The report's one open question — is
  "Steve" (the system's named operational owner) the founder or a
  client/partner — was resolved directly by the founder: **"I am Steve."**
  Filed (incorrectly, see next entry) as the founder's own business.
- **2026-07-17 — Ownership correction, same day.** The founder clarified
  directly: XPanda Foam is the founder's *employer* (salaried role), not
  an owned business — `xpanda-ops-platform` is work built as part of that
  job. This is a materially different fact than what was filed hours
  earlier, corrected in `founder-profile.md`, `strategic-direction.md`,
  and `products.md` the same day. Raised a real IP/confidentiality
  question about the already-filed technical detail
  (`engines.md`/`patterns.md`/`technical-assets.md`).
- **2026-07-17 — IP position clarified.** The founder stated: built
  voluntarily, not at the employer's direction; they hold the IP; XPanda
  Foam would need to negotiate a license if the founder left. Filed as a
  risk statement per `agent-security.md`'s standard, not re-verified
  against the actual employment contract.
- **2026-07-17 — Resolved, with a real future opportunity attached.** The
  founder confirmed ownership directly and stated the actual plan: once
  complete, `xpanda-ops-platform` will be stripped of XPanda Foam branding
  and brought to market as its own product. This closes the IP question
  (not re-flagged further in `engines.md`/`patterns.md`/`technical-assets.md`
  per `agent-security.md`'s own standard — raise a risk once, proceed once
  heard) and elevates the platform from "retained founder knowledge" to a
  real, filed future product candidate — see `products.md`. Arguably the
  strongest opportunity in the company's history to date: production-
  proven, not idea-stage.

**Process lesson, independent of how this resolved:** the ERP Firewall
(Global Constitution Rule 6) was worked around with a logged exception
*before* ownership was confirmed. Its caution was well-founded, not overly
conservative — future ERP-adjacent exceptions should establish ownership/
IP status as part of the authorization conversation, not after findings
are already filed.

- **2026-07-17 — Opportunity Court II.** Second board session, this time
  reading Company Intelligence as the briefing input (per the Headquarters
  design) instead of researching from a blank slate. Weighed existing
  internal assets (`step3-ai`, the nesting engine, `pdf-tools`/
  `packslip-pro`, `subscription-worker` as supporting infra, ProjectStack
  as a negative distribution data point) against freshly-researched new
  opportunities, on equal evidentiary footing. **Verdict: verify
  `step3-ai`'s video-conversion pipeline — a 7-day test, not a 30-day
  build.** No new external candidate cleared this board's evidence bar
  this session, reported honestly rather than padded. The nesting engine
  (real IP, real market, no confirmed wedge) was sequenced second, not
  rejected. Full transcript published as an artifact; full source now
  durable at `Recon/opportunity-court-2-report-2026-07-17.md`.
- **2026-07-17 — step3-ai's real stall reason confirmed, correcting
  Opportunity Court II.** The founder clarified directly: it was archived
  over AI-API-cost unit economics (cost per conversion, no revenue yet to
  cover it), not an unverified technical blocker — the board's central
  open question was answered, and it wasn't the question the board
  expected. The founder also explained rejecting a Bring-Your-Own-API-Key
  mitigation: a customer with their own key could likely replicate the
  workflow without the product. Both filed as reusable patterns
  (`patterns.md`) for any future AI-powered opportunity — a named risk
  category (AI-API cold start) and a real moat test (does BYOK make the
  product pointless). `products.md`'s step3-ai entry corrected accordingly.
- **2026-07-17 — step3-ai iceboxed, explicit founder decision.** Not
  pursued until supporting revenue exists elsewhere to fund free-trial API
  cost — a specific, checkable revisit condition, not a fixed date or "when
  the pipeline gets tested." Considered and rejected: premium-only pricing
  (real conversion/refund/review risk with no way to sample quality first)
  and BYOK (moat risk, see above). The actual constraint: day-1 paid
  conversions must cover free-trial cost, not eventual volume — a real
  formula (minimum viable price ≥ cost per free trial use ÷ day-1
  conversion rate) with no real numbers yet (API cost basis and expected
  conversion rate both unknown). This reopens the question of what the
  company actually pursues next for supporting revenue — Opportunity Court
  II's second-ranked candidate (the nesting engine) has its own unresolved
  blocker (a market-wedge research spike, not yet run).
- **2026-07-17 — Domain-experience research: 4 hypotheses, 0 cleared the
  bar.** Per the founder's direction — search from lived operational
  experience running `xpanda-ops-platform`, not just the one extractable
  algorithm, since a from-scratch rebuild is required either way (no
  build-time advantage to "already exists"). Generated 4 real hypotheses
  directly from the platform's own modules and documented pain points
  (yield/scrap tracking, QC checklists, job-shop tracking, OSHA
  compliance). All four are real, correctly-identified pains; all four are
  already served by funded competitors (SafetyCulture notably dominates
  two of the four categories; Fulcrum already bundles nesting — a new,
  useful data point for the nesting engine's own wedge research). Zero
  cleared the evidence bar. Filed as researched-and-rejected in
  `products.md` so they aren't re-researched later without new
  information. **Net effect: the nesting engine's 1-week wedge-research
  spike remains the most credible next step of everything evaluated
  across both Opportunity Court sessions and this pass** — not because
  this pass favored it, but because nothing beat it. Full source:
  `Recon/domain-experience-research-2026-07-17.md`.

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
