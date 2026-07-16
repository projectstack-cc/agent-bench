# Products

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). Status reflects what Recon could verify
from a repo-level read plus the founder's direct corrections — not a
guarantee of current completion state where noted as unread.

---

## xpanda-ops-platform → a real future product candidate (de-branded)

**Confidence: High on the technical asset; the market plan is the
founder's own stated intent, not yet a scoped mission.**

Currently built and maintained by the founder as an employee of XPanda
Foam (salaried role — not this company's asset today, generates no
current revenue). **The founder owns the platform's IP and has a concrete
plan: once complete, strip XPanda Foam branding and bring it to market as
its own product.** This is arguably the strongest candidate in the entire
company's history — a production-proven ERP (581 commits, real incidents
found and fixed) built around a genuinely hard, generalizable technical
core (the kerf-aware bin-packing engine, `engines.md`), not a from-scratch
idea needing validation.

**Not yet a mission:** "complete" isn't defined, no de-branding scope
exists, and no Opportunity Court pass has evaluated this specific
opportunity (market size for a generalized nesting/ERP tool, competitive
landscape, pricing, target buyer beyond foam manufacturing). Worth a real
`coo`/`product`/`cfo` evaluation when the founder is ready to scope it as
an actual mission — this file records that the opportunity exists, it
doesn't pre-judge that evaluation.

**Extraction doesn't have to wait for the whole platform.** Per the
founder directly, individual tools/components (the bin-packing engine
being the clearest candidate) can be extracted and monetized before the
entire platform is de-branded — de-branding isn't all-or-nothing.

**Hard access constraint, standing (`HQ/DECISIONS.md`):** read-only
Reconnaissance only, permanently, until whatever's being extracted is
actually separated from the live system. No writes, no execution, no
agent dispatch against the live repo in any other capacity — it runs its
own task-executing agents against a real production system at XPanda
Foam, and the founder cannot risk any failure there. Extraction means
building a new, separate implementation informed by the founder's own
knowledge of the pattern, not touching the live repo.

## ProjectStack Web Solutions

**Confidence: High on existence, direct from the founder on status.** A
live client-services landing page (`projectstack.cc`), positioned as a
custom-systems agency for real businesses, based in Casselberry, FL. Has
its own GitHub org (`projectstack-cc`) hosting `precision-maintenance` and
`tapin`. **Per the founder (2026-07-17): zero revenue, zero interested
clients to date.** See `founder-profile.md` for the full framing — this is
a real, already-tried go-to-market attempt, not a revenue line.

## precision-maintenance

**Confidence: High on existence, unconfirmed on client/billing status.** A
live site for an HVAC business, hosted under `projectstack-cc`. Vanilla
HTML/CSS/JS + GitHub Pages (see `patterns.md`). Whether this represents
actual paying client work is an open question — not assumed either way.

## TapIn

**Confidence: High that it's a real, substantial product; Low on current
completion status** (Recon read the repo shape, not the app itself).
Digital business cards, hosted under `projectstack-cc`. Monorepo
(`apps`/`packages`), has its own `CHANGELOG.md`/`backlog.md`. Worth a
direct status check before assuming where it actually stands.

## step3-ai ("video-to-manual")

**Confidence: High** — reason for stalling confirmed directly by the
founder (2026-07-17), correcting Opportunity Court II's "unverified, low
confidence" framing. **The most complete, closest-to-shippable product
found in this entire Recon pass** — full Stripe payments, Clerk auth,
Supabase, a defined video-to-PDF-manual conversion pipeline (`/convert`,
`/dashboard`, `/jobs` routes).

**Why it actually stalled: unit economics, not a technical blocker.** The
conversion pipeline depends on AI API calls with real per-conversion cost.
The founder archived it deliberately — a cold-start cash-flow problem:
running it at scale before there's paying revenue means absorbing API cost
with no income to cover it, and there's no subscriber base yet to spread
that cost across. **This is a different, and cheaper, question to resolve
than Opportunity Court II assumed.** The board's "verify the pipeline
works" test is still worth doing, but it was never the actual blocker —
the real open question is a pricing/unit-economics model that covers
per-conversion API cost from the first paying customer, not "does the code
run."

**A real, reusable lesson from evaluating and rejecting Bring-Your-Own-API-
Key:** the founder considered BYOK to shift API cost onto the customer,
and rejected it with a sharp insight — anyone with their own AI API key
could likely replicate this workflow themselves without needing the
product at all. **This is a genuine competitive-moat risk specific to thin
AI-wrapper products**, not just a step3-ai detail — filed as a pattern in
`patterns.md` for any future AI-powered opportunity this company
evaluates.

## Tiny World

**Confidence: High.** Phaser.js toddler educational game. Itch.io/PWA
distribution, $9.99 one-time purchase (see `patterns.md`'s billing-model
pattern). Has its own `planning/` directory with a real decisions log.

## pdf-tools (GitHub-only)

**Confidence: Medium** — surveyed via WebFetch, not a local read; removed
locally for disk space. A "Document Modification center," React+Vite,
127 commits — substantial, not a stub. Directly matches the founder's own
stated interest in document/CSV/PDF automation as an opportunity category
(`agent-coo.md`'s Opportunity Discovery list). **This may already be that
opportunity, built.** Recommend a direct clone-and-read pass before
evaluating any new document-automation opportunity in a future Opportunity
Court session.

## packslip-pro

**Confidence: High on state, Medium on original intent.** Scaffolded, never
customized past template — stalled. Matches a real `coo`-relevant
opportunity category (Shopify + document automation) — the same category
`pdf-tools` matches, and `pdf-tools` is far more developed. Check
`pdf-tools` first if this category comes up again; flag `packslip-pro` for
a founder decision (revive or formally close out) rather than letting it
sit ambiguously.

## cinevault (GitHub-only)

**Confidence: Medium** — surveyed via WebFetch, not a local read. Movie
tracker, React/Supabase/Clerk/TMDB, PWA, CI/CD via GitHub Actions.

## formflow (GitHub-only)

**Confidence: Low-Medium** — WebFetch couldn't load the README; survey was
incomplete. 4 commits — likely early-stage or abandoned. Recommend a
direct, authenticated check if this project's status ever matters to a
real decision.
