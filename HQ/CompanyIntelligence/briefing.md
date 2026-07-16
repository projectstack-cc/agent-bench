# Company Briefing

*Compaction pass #2 — 2026-07-17. Regenerated from Tier 1 state, not
appended to. If this file is getting long, that's a signal to compact
harder, not to keep adding.*

---

## The founder (High confidence — directly stated)

Senior full-stack engineer/systems architect. React, TypeScript,
Cloudflare, Node, DB/API design. Full-time employed elsewhere (**likely
temporary — re-check periodically**, it's the single biggest constraint on
available hours). Dislikes social media and content marketing; no ad
budget. Wants portfolio income and independence, not a single big swing.
Full detail: `founder-profile.md`.

## The thesis (High confidence — directly stated)

Engineering time is capital. Agents are employees, projects are missions,
repositories are products, knowledge is a company asset. Every mission
must leave the company smarter, not just further along. Target: $5,000/mo
portfolio income via evidence-based opportunity selection, not hype. Full
detail: `company-thesis.md`.

## Where the company actually is (High confidence — corrected 2026-07-17)

Mid-migration to the Headquarters architecture. The 2026-07-16 audit's
"zero operational history" finding needed one correction, not a reversal:
**a real go-to-market attempt already exists (ProjectStack Web Solutions,
a live landing page) — it has produced zero revenue and zero clients to
date.** Still no real Deployment or Debrief has run through the formal
process. First real Reconnaissance sweep ran 2026-07-17 — see below. Full
detail: `strategic-direction.md`.

## What Reconnaissance found (High confidence — 2026-07-17, first real
Recon pass, 15 projects)

- **A proven, already-in-production reusable asset exists**: a Stripe
  subscription billing engine (Cloudflare Worker + KV), live on
  `projectstack.cc`. Check this first before building new billing infra.
- **`step3-ai` ("video-to-manual") is the most complete, closest-to-
  shippable product in the whole portfolio** — full Stripe+Clerk+Supabase
  stack, unclear why it stalled. Worth a direct look before chasing new
  opportunities.
- **Clerk + Supabase is the validated default SaaS stack** (4 independent
  citations). **One-time purchase beats subscription for consumer
  apps** (2 citations, same stated reason: billing-trust anxiety).
- `pdf-tools` (GitHub-only, 127 commits) may already be the document-
  automation opportunity the founder keeps circling back to — check before
  treating that category as unbuilt.
- `xpanda-ops-platform` Recon is authorized and in progress, under an
  explicit, logged ERP Firewall exception — see `HQ/DECISIONS.md`.

Full detail: `products.md`, `engines.md`, `patterns.md`,
`Recon/2026-07-17-INDEX.md`.

## Standing lessons (High confidence — from a real prior session, already
binding on the relevant Executives)

1. Never trust a dispatched agent's self-report — independently re-verify.
2. A suggested fix is a hypothesis, even your own prior one.
3. Gate large builds into milestones with a review between each.
4. A background dispatch's result is unverified until read.

Written directly into `agent-ceo.md`/`agent-qa-critic.md`, not duplicated
here. Full incidents: `success-history.md`, `failure-history.md`.

## Executive roster (High confidence — current)

17 executives across build, operate, publish, and board functions, plus
`ceo` (routes) and `librarian` (files, and now gates ERP exceptions — see
`HQ/DECISIONS.md`). Full detail: `capabilities.md` or `HQ/INDEX.md`.

## What's still NOT known — don't assume

`components.md`, `technical-assets.md`, `knowledge-domains.md` remain
empty — this Recon pass read repo shape and manifests, not every file.
Whether `precision-maintenance`/`tapin` represent paying client revenue is
unconfirmed. `xpanda-ops-platform`'s actual content is still unknown
pending its dedicated Recon pass.
