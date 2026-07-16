# Strategic Direction

**Confidence: High for "current initiative," Medium for anything projected
forward** — this file describes where the company is right now, not a
forecast.

---

## Open strategic question, current as of 2026-07-17: what generates supporting revenue first?

`step3-ai` — Opportunity Court II's top-ranked candidate — is **iceboxed**,
explicitly, until supporting revenue exists elsewhere to fund its AI-API
cold-start cost (see `products.md`). A follow-up research pass (per the
founder's direction: search from lived operational experience, not just
"clone the one algorithm," since a from-scratch rebuild is required either
way — no build-time advantage to "already exists") generated four real
hypotheses from `xpanda-ops-platform`'s own documented pain points
(yield/scrap tracking, QC checklists, job-shop tracking, OSHA compliance).
**All four are real pains; all four are already served by funded
competitors; none cleared the evidence bar.** Filed as researched-and-
rejected in `products.md`.

**Narrowed, not open-ended:** the nesting engine's 1-week market-wedge
research spike is now the most credible next step of everything evaluated
across two Opportunity Court sessions and this research pass — not by
default, but because nothing else beat it. One new, concrete input for
that spike: Fulcrum (a funded job-shop competitor) already bundles
nesting — a specific competitor to check directly, not just the standalone
nesting vendors already known. Not yet run.

## Current initiative: Headquarters (V2 architecture)

As of 2026-07-16, the company is mid-migration from a V1 Tauri desktop
harness (archived, `Archive/harness-v1/`) to the Headquarters/Deployment
architecture described in `project_files/hq-v2-architecture.md`. This is
foundational work, not a feature — it's the filing system and governance
model every future mission runs on.

**Not yet done** (see that document's §13 Implementation Order):
- No real Deployment has run through the new `roster.md`/`brief.md` pattern yet.
- No Debrief has happened yet — the gate is designed, untested with real content.
- The Obsidian vault (13 projects, 17 skills, per founder-profile.md's
  Medium-confidence note) has not yet been extracted. It is being retired;
  extraction has to happen before that retirement is final, or that history
  is simply lost.

**Done, 2026-07-17:** First real Reconnaissance sweep (`Recon/2026-07-17-INDEX.md`),
15 projects across `C:\Users\scook\.dev` and GitHub. `products.md`,
`engines.md`, `patterns.md`, `capabilities.md` are populated for the first
time as a direct result — see those files.

## Correction to "zero operational history" (2026-07-17)

**The audit's headline finding (2026-07-16) — zero missions, zero shipped
products, zero real revenue — needs one correction, not a reversal.**
Recon surfaced ProjectStack Web Solutions: a real, live client-services
landing page (`projectstack.cc`, GitHub org `projectstack-cc`), with
`precision-maintenance` and `tapin` hosted under that org. **Per the
founder directly (2026-07-17): ProjectStack has produced zero revenue and
zero interested clients to date.** So the "zero revenue" part of the
headline finding still holds exactly as stated — but "zero operational
history" was too strong. A real go-to-market attempt (a landing page, a
positioned agency offering) has already been tried and has not yet
converted. That's a data point for `marketing`/`product` on a channel
already attempted, not a new revenue line — see `founder-profile.md` and
`products.md` for the filed detail.

**Still open, not resolved here:** whether `precision-maintenance` (an
HVAC business's live site) represents actual paying client work is
unconfirmed — the founder's answer was specifically about ProjectStack
itself, not that site's billing status. Flagged rather than assumed either
way.

## Second correction — XPanda Foam, and a real future opportunity (2026-07-17)

The follow-up Recon pass on `xpanda-ops-platform` surfaced "Steve" as the
system's operational owner; the founder confirmed being Steve, then
corrected two things the same day:

1. **Employment, not ownership.** XPanda Foam is the founder's employer
   (salaried), not a business they own — no revenue, no company-asset
   status, not part of the $5,000/mo target.
2. **The platform itself is the founder's own IP,** built voluntarily, not
   at the employer's direction. **Confirmed directly, with a real plan:
   once complete, the founder will strip XPanda Foam branding and bring it
   to market as its own product.** This isn't a hypothetical or a
   retained-knowledge caveat anymore — it's a concrete future company
   opportunity. See `products.md` for the filed entry.

**Net effect:** the technical entries in `engines.md`/`patterns.md`/
`technical-assets.md` stand as the founder's own IP and real technical
groundwork for that future product, not as a company asset today. The
IP-status question is resolved by the founder's own confirmation and isn't
re-flagged further in this company's filings — see `agent-security.md`'s
own standard: raise a risk once, clearly, and proceed once the user has
heard it and responded, rather than repeating it.

**Worth keeping as a process lesson regardless:** the ERP Firewall (Global
Constitution Rule 6) was worked around with a logged, founder-authorized
exception *before* ownership was confirmed. The firewall's caution was
well-founded, not overly conservative — future ERP-adjacent exceptions
should establish ownership/IP status as part of the authorization
conversation, not after findings are already filed.

## Standing priorities (from the Company Thesis)

1. Every engineering hour spent should trace to a real, evidence-backed
   opportunity — not novelty or excitement (`agent-coo.md`).
2. No dependency on audience-building or paid content marketing
   (`founder-profile.md` constraints).
3. Institutional learning compounds — each mission's Debrief should make
   the next mission cheaper to run, not just longer to read about.

## What's explicitly NOT a current priority

Rebuilding a GUI/dispatch tool. Per
`project_files/hq-v2-architecture.md` §13, that's step 9 — after several
real missions have run by hand and it's clear what tooling would actually
help, not before.
