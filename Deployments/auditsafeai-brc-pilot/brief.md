# Mission Brief: auditsafeai-brc-pilot

## Mission Objectives

Validate whether an AI-generated BRC compliance gap analysis can be made
accurate enough to trust, on one real branch's real compliance
documents, graded against one domain expert's (the founder's wife's)
independent assessment. This is a technical validation pilot, not a
product launch — see `Projects/AuditSafeAI/planning/PRD.md` for full
product context (not repeated here).

## Success Metrics

The wife's grading against her own independent assessment of the same
documents, against the bar defined in `Projects/AuditSafeAI/planning/
PRD.md`: no false negatives on major/critical-severity gaps, no gap
claims she can point to as clearly fabricated. Confirm the exact bar
with her directly before running the pilot (`backlog.md`'s first
blocking task) — the proposed bar in `PRD.md` is a starting point, not
final.

## Constraints

- BRC only — no other certification body.
- Gap analysis and suggested fixes (text) only — no document generation.
- No pricing, tiering, or Terms & Conditions work — this is an internal
  pilot with one known, informed user, not a public release.
- The record/controlled-document classification boundary
  (`Projects/AuditSafeAI/planning/PRD.md`'s permanent boundary) must be
  built correctly even though generation isn't in scope — don't defer
  this to Milestone 3 as if it were new work then.
- Gap claims must cite a specific BRC clause from a properly sourced
  copy of the current BRC Global Standard — no ungrounded LLM assertions.

## Required Skills

Document parsing/classification, retrieval-grounded LLM scoring design,
evaluation-harness design for hallucination-checking. No existing engine
in the portfolio covers this (`HQ/CompanyIntelligence/engines.md`) — this
is genuinely new technical work, not a reuse case.

## Company Context (excerpt — see `HQ/CompanyIntelligence/products.md` for full detail)

Sourced from real domain-expert demand, not a market scan. Real
competition exists in a similar shape (IONI) but positioned toward
building a program from scratch, not recertification gap-auditing —
this mission's differentiation depends on that distinction holding up in
practice, not just in positioning.

## Founder Context (excerpt — see `HQ/CompanyIntelligence/founder-profile.md`)

Limited free time; this mission should not assume dedicated full-time
attention. The wife is an engaged, informed domain expert acting as
beta tester, not a passive test subject — her grading is the actual
success metric, treat her feedback as authoritative on domain accuracy.

## Debrief

Not written yet — this mission hasn't run. Write
`Deployments/auditsafeai-brc-pilot/debrief.md` at close, per
`agent-librarian.md`'s Debrief Gate, whichever way the pilot result
lands (pass or fail is itself a real, reportable finding).
