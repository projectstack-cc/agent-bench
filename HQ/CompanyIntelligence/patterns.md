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

## "Strangler fig" incremental modernization — live, in production

**Confidence: High.** Source: `xpanda-ops-platform`. The platform's stated
architecture is deliberately anti-framework (vanilla HTML/JS, `AGENTS.md`
explicitly bans introducing React platform-wide) — but a scoped
React/Next.js pilot ("Cutting v2") runs in parallel, isolated under a `/v2`
path prefix with its own deploy pipeline, alongside the stable legacy
system. A real, deliberate incremental-migration pattern: prove a new
stack on one bounded module before committing platform-wide. Worth
naming explicitly as a company capability for any future "should we
modernize this legacy piece" decision — more mature than a from-scratch
rewrite, and already validated in production.

## Server-side recomputation of client-submitted calculations

**Confidence: High.** Source: `xpanda-ops-platform` — the block-nesting
save route explicitly "recomputes authoritatively" server-side rather than
trusting client math. A real integrity/security pattern worth carrying
into any future product doing client-side computation with server
persistence.

## Next.js-on-Cloudflare-Workers-via-OpenNext — a named debugging reference

**Confidence: High.** Source: `xpanda-ops-platform`. A nontrivial
integration many teams struggle with, proven working here with specific,
dated bugs found and fixed: `basePath` vs. `assetPrefix` asset-routing
mismatches (two separate incidents), a stale-build asset cache bug from an
idempotency guard skipping a required file move, a missing CSS import
causing a fully-unstyled deploy, and a Windows-specific patch required for
`@opennextjs/aws` v0.3.x. The next Next.js-on-Workers migration this
company does shouldn't have to rediscover any of these — check this entry
first.

## A project-level constitution, independently convergent with HQ's own design

**Confidence: High.** `xpanda-ops-platform`'s `AGENTS.md` is functionally a
project-scoped constitution — explicit scope guardrails ("established,
treat as stable" vs. "intentionally not yet built"), tracked technical
debt with an explicit "don't fix unless asked" framing, and a strict
numbered-prompt implementation/changelog discipline. It predates this
session's HQ/V2 architecture entirely and independently arrived at similar
governance instincts. Worth reading directly — not just filing as a
curiosity — the next time `HQ/Executives/_constitution.md` or the
Deployment/Debrief templates get revised; it's a working, production-
tested reference, not a theoretical design.

## Versioned, hash-verified external skill dependencies (mechanism only)

**Confidence: High on the mechanism; explicitly NOT a company asset in
content.** `xpanda-ops-platform` fetches `.agents/skills/*` from a
third-party GitHub repo (`Leonxlnx/taste-skill`) via a hash-verified
`skills-lock.json`, not authored in-house. The skill *content* is not
company IP and must never be filed as such — but the lockfile *mechanism*
itself (versioned, hash-verified external dependencies for agent skills)
is a pattern worth knowing about if `HQ/Skills/` ever needs to reference
external, non-authored skills alongside its own.

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
