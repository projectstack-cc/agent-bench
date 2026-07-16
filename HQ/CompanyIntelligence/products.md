# Products

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). Status reflects what Recon could verify
from a repo-level read plus the founder's direct corrections — not a
guarantee of current completion state where noted as unread.

---

## xpanda-ops-platform (XPanda Foam production ERP)

**Confidence: High** — read directly via an authorized ERP Firewall
exception (`Recon/xpanda-ops-platform-2026-07-17.md`, `HQ/DECISIONS.md`).

**Ownership resolved 2026-07-17:** the founder confirmed being "Steve,"
the operational owner referenced throughout the platform's `AGENTS.md`.
This is the founder's own system, not client or third-party work — see
`founder-profile.md` for the full framing.

**What it is:** a real, continuously and actively developed production ERP
for XPanda Foam, a foam-manufacturing business — Jobs, Logistics, QC,
Safety, Admin, and Reporting modules, a disciplined numbered-prompt change
process (past P248), 581 commit-log entries, `CHANGELOG.md` last touched
the day before this Recon ran. **Not a scaffold or prototype** — real
production incidents have been found and fixed (a D1 scaling limit, a
deploy-asset cache bug, a Windows-specific build patch). Contains the
single most technically sophisticated reusable asset found across both
Recon passes (see `engines.md`'s kerf-aware bin-packing engine entry).

**Not established:** XPanda Foam's revenue or profitability — not stated
by the founder, not assumed here, and not counted toward the company's
$5,000/mo portfolio target unless explicitly said to be.

**In progress:** a "strangler fig" React/Next.js modernization pilot
(one module ported, rest on the stable legacy vanilla-JS stack) — see
`patterns.md`.

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
