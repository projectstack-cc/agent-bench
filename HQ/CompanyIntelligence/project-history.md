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

- **2026-07-20 — PC gaming market scan, researched-and-rejected, both
  passes.** First of a planned series of cross-market opportunity scans
  (see `strategic-direction.md`), run independent of `xpanda-ops-
  platform`'s domain experience. Two research rounds: alt-tab-specific
  tools (browser/Discord/in-game overlays — already served at platform
  scale by Overwolf, 113M MAU, ~75% market share), then PC gaming tools
  generally (launchers, mod managers, driver software, save backup, and
  the CS2/skin economy). The skin-economy trust/verification angle was
  the strongest candidate by market size ($6.77B item-economy cap) found
  this session, but was rejected on live regulatory exposure (an active
  NY AG lawsuit and federal class action against Valve over CS2's
  case-opening mechanic as illegal gambling), not just competitive
  crowding. Filed in `products.md`. Full source:
  `Recon/pc-gaming-overlay-tools-research-2026-07-20.md`. **Also
  produced a durable refinement to how opportunities get scored:** the
  founder clarified that stack mismatch alone shouldn't disqualify a
  candidate if converting to a better-fit stack is cheap — filed in
  `patterns.md`, with a flagged (not yet made) follow-on edit to
  `agent-coo.md`/`agent-cto.md`'s scoring criteria.

- **2026-07-20 — E-commerce market scan, researched-and-rejected.**
  Second in the cross-market opportunity-scan series, run right after the
  PC gaming scan above. Seven candidates checked (multi-channel inventory
  sync, Amazon suppressed-listing monitoring, Shopify/e-commerce
  bookkeeping reconciliation, returns/reverse logistics, sales tax nexus
  compliance, TikTok Shop tooling, cross-border customs/duty). The
  strongest fit for the founder's document/data-automation skillset
  (Shopify multi-payout-stream reconciliation) was already crowded by at
  least six competitors (A2X, Synder, Taxomate, Link My Books, Bookkeep,
  Parex Bridge). TikTok Shop, checked specifically as the freshest
  channel, already has a full competitive set despite only maturing in
  the last 2-3 years. Filed in `products.md`. Full source:
  `Recon/ecommerce-tools-research-2026-07-20.md`. **Also produced a
  cross-market pattern**, independently confirmed against the PC gaming
  scan: strong off-the-shelf distribution (app-store-style marketplaces)
  is exactly what draws the most competing indie developers, fastest —
  filed in `patterns.md` as a consideration for choosing the *next*
  market, not just scoring within one.

- **2026-07-20 — Horizontal business-function scan, all 13 rejected in
  one pass.** Third in the cross-market opportunity-scan series,
  stepping outside specific industries per the founder's direction (Sales,
  Customer support, Procurement, HR, Finance, Inventory, Scheduling,
  Compliance, Training, Document management, Reporting, Quality
  management, Asset management). Ten freshly searched, two (Compliance,
  Quality management) already known-rejected via the 2026-07-17
  domain-experience finding (SafetyCulture). Every function showed the
  same saturation shape — a mature SaaS category leader plus a
  free-template fallback. Filed in `products.md`. **Produced a strategic
  recommendation, not just a rejected list:** named horizontal functions
  are the most contested search territory in software, full stop —
  real gaps more likely live at a function-×-vertical intersection than
  either axis alone, consistent with the 2026-07-17 domain-experience
  precedent. Filed in `patterns.md`. Full source: `Recon/business-
  functions-overhead-research-2026-07-20.md`.

- **2026-07-20 — Function-×-vertical intersection check, also rejected —
  and a methodology finding.** Direct follow-through on the prior scan's
  recommendation: three narrow, low-tech-attention intersections checked
  (self-managed HOA administration, independent funeral home paperwork,
  home inspection report writing), matched against the founder's
  document/data-automation stack strength. All three found real,
  citable pain; all three already have multiple dedicated vendors
  (PayHOA/Join It/ManageCasa for HOAs; Passare/WellDeparted for funeral
  homes; Spectora/HomeGauge for home inspection). **Four consecutive
  search rounds this session, every specificity level, found a vendor
  for every real pain point.** Filed as a methodology-level finding, not
  just a fourth rejected market: blind external search isn't converging
  on an open gap; the founder's own lived operational experience
  (2026-07-17 domain-experience research) is the one approach that's
  generated genuinely differentiated hypotheses so far. Filed in
  `patterns.md` and `strategic-direction.md`.

- **2026-07-20 — Opportunity Court III verdict: GO, scoped to a single
  milestone — and the company's first real Deployment scaffolded.** The
  food-safety audit gap-analysis candidate (`products.md`) cleared a full
  board session (`cto`/`cfo`/`marketing`/`product`/`ux`/`security`/
  `qa-critic`, CEO final deliberation) with a hard scope cut: BRC only,
  gap-analysis only, one beta user (the founder's wife), no document
  generation or pricing yet. Milestone 1's authorized scope, planning
  docs (PRD, roadmap, backlog, decisions log, changelog) filed at
  `Projects/AuditSafeAI/`. **`Deployments/auditsafeai-brc-pilot/` is the
  first mission actually run through the `roster.md`/`brief.md` pattern**
  — `hq-v2-architecture.md` §13 step 5, previously unstarted since the
  2026-07-16 migration. Roster: `cto`, `backend`, `qa-critic`, `security`
  (v1 each). No debrief yet — the mission hasn't run.

- **2026-07-27 — claude.ai/public/artifacts opportunity scan: no candidate,
  source characterized.** Directive: search the public-artifacts gallery
  for pain points others had already surfaced. 16 queries, two independent
  search shapes (title search, link-share/narrative search) both converged
  on the same thin result — ~8 unique bare-title artifacts, no attached
  "why I built this" context, and general Anthropic press coverage instead
  of real link-shares. **Different failure mode than the four 2026-07-20
  scans:** those found real pain already vendor-served (a crowding
  failure); this found artifacts with no attributable pain at all (an
  evidence failure, one step earlier). One candidate had a stated workflow
  (a consultant's self-built cold-outreach personalization tool) but
  didn't clear Automatic Rejections — crowded category, one data point.
  No board rounds beyond `coo`/`ceo` ran — nothing survived to hand
  `cto`/`cfo`/etc. Filed in `patterns.md`; full source `Recon/claude-
  artifacts-scan-2026-07-27.md`. Standing recommendation (lean on the
  founder's own lived operational information asymmetry over blind
  external scans) reaffirmed for a fifth time.

- **2026-07-27 — Unmet-demand search: no candidate, but a technique test
  and a reusable verification method.** Same-day follow-on to the
  artifacts scan above, per the founder's direct methodology proposal:
  search for unanswered demand directly rather than pain-then-check.
  Found real, dollar-quantified complaint data (a curated Reddit
  complaint-mining post) but all 7 candidates surfaced were already
  served once checked — 5 refuted live in the thread by independent
  commenters, 2 checked independently this session
  (`usecollect.co` for freelancer invoice-dispute escalation directly;
  the client-feedback-collector idea against an already-crowded survey-
  tool category). **Sixth consecutive scan this cycle to reach "real
  signal, already served,"** and the second technique tried. Also
  surfaced two reusable findings for `patterns.md`: the methodology
  convergence itself (with an explicit caveat against overclaiming
  market-wide saturation from one sampled list), and builder-community
  crowding-checks as a named, cheaper-than-manual verification method.
  Also a tooling fact: Reddit is unreachable via `WebFetch` entirely, but
  reachable via the authenticated browser tool on `old.reddit.com`
  specifically. No board rounds beyond `coo`/`ceo` ran. Full source:
  `Recon/unmet-demand-search-2026-07-27.md`.

- **2026-07-30 — Eclipse Circuit onboarded as a real `agent-bench`
  project, correcting a prior session's fabricated exclusion.**
  `Projects/Eclipse Circuit/` (a 2.5D turn-based RPG, first project
  under the founder's NarrativeOS framework) was scaffolded 2026-07-27
  as founder-driven creative work — unlike AuditSafeAI, it never
  cleared an Opportunity Court pass, so it was never a `coo`-sourced
  candidate. That same scaffold pass recorded it as deliberately walled
  off from `HQ/Executives/` and `CompanyIntelligence/`, attributed to
  "the founder directly." Starting Phase 3 (Concept art) this session
  required a Claude Code session rooted in that repo to use MCP
  tooling, which surfaced the exclusion practically; checking `git log`
  showed the attribution was written in the same commit as the initial
  directory scaffold itself, before any founder content existed — the
  founder confirmed directly it never happened. Corrected forward (not
  rewritten) in that project's own `planning/decisions.md`, its
  `README.md`, and this file's own INDEX entry.
  **Also corrected: platform identity.** Repeated "2.5D mobile
  turn-based RPG" framing undersold the founder's actual vision — PC
  is the primary target for testing and beta, well before any mobile
  launch, with mobile compatibility maintained throughout, not dropped.
  Unity stays the target engine (already correct for PC+mobile
  regardless of which is primary); only the mobile-first rationale and
  a touch-control/short-session design assumption were flagged for
  later reconciliation, not silently redesigned. Corrected in
  `README.md`, `PRD.md`, `roadmap.md`, `game/gameplay-rules.md`.
  **Integration shape, per the founder directly:** broader project-level,
  not a Phase-3-bounded mission — `Deployments/eclipse-circuit/`
  scaffolded open-ended, honestly flagged as not fitting the normal
  bounded-mission/debrief pattern (`Deployments/README.md`,
  `agent-librarian.md`) rather than faking a Success Metric to force
  the fit. **New executive hired:** `agent-art-dev.md` (v1) — HD-2D
  concept/production art, driving Blender (`blender-mcp`) and
  LibreSprite (`libresprite-mcp`) directly via MCP against a project's
  locked art-direction doc, chosen specifically to avoid a separate
  generative-AI dependency and recurring tool cost (LibreSprite over
  paid Aseprite). Went through `agent-ceo.md`'s gated path — drafted to
  scratchpad, self-reviewed under the `qa-critic` rubric (flagged
  explicitly as self-performed, not independent), one real scoping
  fix (the $20 tooling-budget ceiling is Eclipse Circuit-specific, not
  a portfolio-wide default) made before the founder approved the save.
  Both MCP servers now live at `agent-bench`'s own root `.mcp.json` as
  shared cross-project infrastructure, not scoped to this repo — Unity
  tooling is expected to land the same way once Phase 6 needs it.
  Also filed in the same pass: Xyril's and Aelis's physical appearance
  (`characters/xyril.md`, `characters/aelis.md`,
  `world-bible/volume-06-characters.md`), a real content gap that had
  been blocking character concept art specifically. No actual concept
  art produced yet — that's the next real Phase 3 step, pending a
  session that can hold the MCP connections open.

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
