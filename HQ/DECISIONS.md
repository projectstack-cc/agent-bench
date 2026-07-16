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

## 2026-07-17 — Standing scope for the `xpanda-ops-platform` exception: Recon only, permanently, until de-branded

**Context:** `xpanda-ops-platform` was confirmed as a real future company
product candidate (owned IP, plan to de-brand and bring to market — see
`HQ/CompanyIntelligence/products.md`). This makes the exception above more
consequential and longer-lived than a one-off audit, so its actual limits
need to be explicit, not inferred.

**Decision, per the founder directly:** access to `xpanda-ops-platform`
stays **read-only Reconnaissance, and nothing more, for as long as it
remains XPanda Foam's live system** — no writes, no execution, no
dispatching any agent against it in any capacity beyond Recon's read-only
analysis. Reason given: the platform has its own agents that execute real
tasks against a live production system, and the founder cannot risk any
failure to that codebase while it's still doing its actual job at XPanda
Foam. This limit lifts only once the platform (or the specific piece being
extracted) is stripped of XPanda Foam branding and separated from that
live system — not before.

**Also clarified:** the founder is open to extracting and monetizing
individual tools/components from the platform (e.g., the bin-packing
engine) **before** the whole platform is fully de-branded — de-branding
doesn't have to happen all-at-once. Any such extraction is still bound by
the read-only-until-separated rule above; "extracting a tool" means
building a new, separate implementation informed by the founder's own
knowledge of the pattern, not modifying or exporting code from the live
repo.

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
