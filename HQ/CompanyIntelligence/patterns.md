# Patterns

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). These are recurring *technical* patterns
across projects — distinct from `success-history.md`/`failure-history.md`,
which are process lessons.

---

## Clerk + Supabase — the company's de facto default SaaS starter stack

**Confidence: High** — 4 independent citations: `tapin`, `cinevault`,
`step3-ai`, and likely `formflow`. Strong enough to call a validated
default, not a coincidence. `cto` should treat this as the starting-point
stack for any future SaaS-shaped opportunity unless there's a specific
reason to deviate — it's already been chosen independently four times.

## One-time purchase over subscription, for consumer game/app products

**Confidence: High.** `tiny-world` and `lights-out` independently reached
the identical conclusion for the identical stated reason: billing-trust
anxiety in the target audience (parents, casual players) makes a one-time
purchase convert better than a subscription ask. Worth weighing directly
for any future consumer-facing (non-B2B) product `cfo`/`product` evaluate.

## Vanilla HTML/CSS/JS + GitHub Pages for small client marketing sites

**Confidence: High.** `precision-maintenance` and `projectstack` share the
exact shape: no framework, no build step, static hosting. A proven,
low-overhead delivery pattern specifically for small local-business client
sites — distinct from the React/Next.js pattern used for the company's own
SaaS-shaped products.

## Per-project decisions/ADR file as a build-time habit

**Confidence: High.** Three independent instances: `lights-out/planning/decisions.md`,
`tiny-world/planning/decisions.md`, `RadialNest_PROMPT.md`. This is
already a real, organically-occurring habit, not a process HQ is inventing
from scratch — the Debrief/Recon apparatus is formalizing something that
already happens per-project. Worth a Debrief/Recon template field
explicitly asking "was a decisions log kept for this mission" once real
missions start running, rather than losing this habit under HQ's more
formal structure.

## Historical note, not a live pattern

Pre-HQ, a `Agents/` CEO-harness folder (the same convention this
repo used before the V2 migration) was deployed directly into at least two
other projects (`tiny-world`, `lights-out`), not just this repo. Real
evidence of how the agent-harness pattern was actually used before HQ
existed — superseded now that Deployments/roster.md replaces copying a
whole `Agents/` folder per project, not something to repeat going forward.

---

## External reference only — not a company asset

`odysseus` (found in `.dev/` but confirmed via `git remote` to belong to
`pewdiepie-archdaemon`, a third party — not built by this founder) has two
patterns worth *knowing about* if the founder's own long-term agent-
platform ambitions are ever pursued, but they must never be cited as
something this company built or owns:
- Persistent memory via vector DB.
- Hardware-aware local-model-fit selection.
