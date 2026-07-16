# Decisions

One entry per structural decision — short, dated, never retroactively
rewritten (correct it forward with a new entry instead). Recommended by
the 2026-07-16 Executive Company Audit (`project_files/hq-executive-audit-2026-07-16.md`
§1) as a `[NOW]` fix; created 2026-07-17 on its first real use rather than
left as an unbuilt recommendation.

---

## 2026-07-17 — ERP Firewall exception for Reconnaissance on `xpanda-ops-platform`

**Context:** The Global Constitution's Rule 6 (ERP Firewall) prohibits any
non-ERP agent from reading `xpanda-ops-platform`. Reconnaissance
(`cto`-led, per `Recon/README.md`) is a non-ERP operation and was
excluded from it by that rule during the 2026-07-17 Recon sweep.

**Decision:** The founder explicitly authorized a Reconnaissance pass on
`xpanda-ops-platform` specifically, stating it's believed to be the most
valuable thing built so far. Granted as a **narrow, explicit exception**,
not a firewall repeal: Recon is read-only by design and produces
recommendations only (Librarian gate → founder approval before anything
lands in Company Intelligence), which is precisely why this exception is
low-risk despite the firewall's general purpose. This does **not** grant
ERP agents' write access, does not open ongoing non-ERP engagement with
the project, and does not apply to any other ERP-scoped project without
its own separate authorization.

**Not changed:** Rule 6's text itself is untouched — this is a logged,
one-instance exception, not a rule amendment. If Recon on ERP-scoped
projects becomes a recurring, wanted pattern, that's a real reason to
amend Rule 6 properly later, not to keep granting one-off verbal exceptions.

---

## 2026-07-16 — Obsidian vault retired outright (context, backfilled)

Full detail: `project_files/hq-v2-architecture.md` §0 tension 4, §11. The
founder decided to scrap the Obsidian vault entirely rather than keep it
as a fallback or personal-notes archive — this repo became the sole filing
system. Backfilled here for continuity; not a new decision.

## 2026-07-16 — Deployment by reference, not by copy (context, backfilled)

Full detail: `project_files/hq-v2-architecture.md` §3. Resolved the
directive's own "copy the executives" vs. "minimize duplication" tension —
a mission pins an HQ executive version and states a short delta, it never
duplicates the executive's full file. Backfilled here for continuity; not
a new decision.
