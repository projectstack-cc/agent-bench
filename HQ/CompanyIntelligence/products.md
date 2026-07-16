# Products

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). Status reflects what Recon could verify
from a repo-level read plus the founder's direct corrections — not a
guarantee of current completion state where noted as unread.

---

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

**Confidence: High on stack completeness, Low on why it's stalled** (not
investigated). **The most complete, closest-to-shippable product found in
this entire Recon pass** — full Stripe payments, Clerk auth, Supabase, a
defined video-to-PDF-manual conversion pipeline (`/convert`, `/dashboard`,
`/jobs` routes). Flagged as the highest-priority item for a direct founder
decision (finish it vs. formally park it) before spending more Opportunity
Court cycles on brand-new ideas.

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
