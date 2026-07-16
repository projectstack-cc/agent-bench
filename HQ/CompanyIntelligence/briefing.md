# Company Briefing

*Compaction pass #3 — 2026-07-17. Regenerated from Tier 1 state, not
appended to. If this file is getting long, that's a signal to compact
harder, not to keep adding.*

---

## The founder (High confidence — directly stated)

**Steve / Stephen** (also operates under the `Zer0Flaw` git/dev identity —
one person, not two). Senior full-stack engineer/systems architect. React,
TypeScript, Cloudflare, Node, DB/API design. Full-time employed elsewhere
(likely temporary, biggest constraint on hours) **and** operates XPanda
Foam, a real manufacturing business (stable, ongoing — see below).
Dislikes social media and content marketing; no ad budget. Wants portfolio
income and independence, not a single big swing. Full detail:
`founder-profile.md`.

## The thesis (High confidence — directly stated)

Engineering time is capital. Agents are employees, projects are missions,
repositories are products, knowledge is a company asset. Every mission
must leave the company smarter, not just further along. Target: $5,000/mo
portfolio income via evidence-based opportunity selection, not hype. This
target is about *new* opportunities — it doesn't already include XPanda
Foam (below). Full detail: `company-thesis.md`.

## Where the company actually is (High confidence — corrected twice, 2026-07-17)

The 2026-07-16 audit's "zero operational history" finding needed two
corrections, not a reversal:

1. **ProjectStack Web Solutions** — a real, live landing page already
   tried. Zero revenue, zero clients to date.
2. **XPanda Foam** — the founder confirmed being "Steve," resolving
   `xpanda-ops-platform`'s ownership question. This is the founder's own,
   actively-operated manufacturing business, running on a real production
   ERP the founder built (581 commits, real incidents fixed, still being
   actively developed). Revenue/profitability not stated, not assumed, not
   counted toward the $5,000/mo target unless the founder says to. This
   *is* real operational and production-system experience the founder can
   draw on, though — treat it as evidence of capability, not as "outside
   the portfolio, doesn't count."

Still true: no real Deployment or Debrief has run through HQ's own formal
process yet. Full detail: `strategic-direction.md`.

## What two Reconnaissance passes found (High confidence, 16 projects total)

- **The single most valuable reusable asset in the whole portfolio**: a
  kerf-aware bin-packing/nesting engine (`xpanda-ops-platform`) — a hard,
  generalizable CS problem with value well beyond foam manufacturing.
- **A proven, in-production Stripe billing engine** (`subscription-worker`,
  serving `projectstack.cc`) — check this before building new billing infra.
- **Clerk + Supabase is the validated default SaaS stack** (4+ citations).
  **One-time purchase beats subscription for consumer apps** (2 citations).
- **Three independent working examples of document-automation** now exist
  (`xpanda-ops-platform`'s packing-slip parser, `pdf-tools`, the stalled
  `packslip-pro`) — check these before scoping that category from scratch.
- `step3-ai` ("video-to-manual") is the most complete, closest-to-
  shippable *new* product in the portfolio, stalled for unknown reasons —
  worth a direct look before chasing new ideas.
- A "strangler fig" incremental-modernization pattern is live and proven
  in `xpanda-ops-platform` (a React pilot under `/v2`, legacy stack
  otherwise untouched) — the reference for any future "should we
  modernize this" decision.

Full detail: `products.md`, `engines.md`, `patterns.md`,
`technical-assets.md`, `Recon/2026-07-17-INDEX.md`,
`Recon/xpanda-ops-platform-2026-07-17.md`.

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
`ceo` (routes) and `librarian` (files, and gates ERP exceptions — see
`HQ/DECISIONS.md`). Full detail: `capabilities.md` or `HQ/INDEX.md`.

## What's still NOT known — don't assume

`components.md`, `knowledge-domains.md` remain empty. Whether
`precision-maintenance`/`tapin` represent paying client revenue is
unconfirmed. XPanda Foam's revenue is not established. The Obsidian vault
(13 projects, 17 skills) still hasn't been extracted before its retirement.
