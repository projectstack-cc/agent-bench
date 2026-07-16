# Strategic Direction

**Confidence: High for "current initiative," Medium for anything projected
forward** — this file describes where the company is right now, not a
forecast.

---

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

## Second correction — XPanda Foam (2026-07-17, resolved same day in two steps)

The follow-up Recon pass on `xpanda-ops-platform` surfaced "Steve" as the
system's operational owner; the founder confirmed being Steve. Two
corrections followed, same day:

1. **Employment, not ownership.** XPanda Foam is the founder's employer
   (salaried), not a business they own — no revenue, no company-asset
   status, not part of the $5,000/mo target.
2. **IP position, per the founder directly.** `xpanda-ops-platform` was
   built voluntarily — the founder wasn't asked to build it. The founder's
   own stated position: XPanda Foam would need to negotiate a license if
   the founder left, implying the founder holds the IP, not the employer.
   **Filed as the founder's understanding of the arrangement, a risk
   statement rather than a verified legal conclusion** — employment
   invention-assignment terms vary and this company can't verify the
   actual contract — but a considered, plausible position, not a guess,
   and not second-guessed further here.

**Net effect:** the technical entries in `engines.md`/`patterns.md`/
`technical-assets.md` are reasonable to keep, framed as the founder's own
accumulated engineering experience and knowledge — not as a company asset,
and not without the light IP caveat above. `products.md`'s
`xpanda-ops-platform` entry stays correctly excluded from the company's
own product/asset base.

**Worth keeping as a process lesson regardless of how the IP question
resolves:** the ERP Firewall (Global Constitution Rule 6) was worked
around with a logged, founder-authorized exception *before* either of
these two facts was confirmed. The firewall's caution was well-founded,
not overly conservative — future ERP-adjacent exceptions should establish
ownership/IP status as part of the authorization conversation, not after
findings are already filed.

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
