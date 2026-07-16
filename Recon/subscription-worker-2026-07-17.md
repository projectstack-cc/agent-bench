# Recon: subscription-worker — 2026-07-17

**Confidence: High** — read `src/index.js`, `wrangler.toml`, `README.MD` directly.

## Reusable engines found

**The whole repo is a proven, already-in-production reusable engine.** Its
own header comment says so explicitly: "A reusable Cloudflare Worker that
(1) receives Stripe webhook events, (2) stores subscription status in
Cloudflare KV keyed by customer email, (3) serves subscription status to
authenticated frontends, (4) creates Stripe Customer Portal sessions." Live
in production — `wrangler.toml`'s `ALLOWED_ORIGINS` includes
`https://projectstack.cc`, confirming a real deployed consumer.

## Reusable components found

None beyond the worker itself — it's a single-purpose service, correctly scoped.

## Technical capabilities found

Stripe webhook signature verification, KV-backed subscription state,
Stripe Customer Portal session creation, CORS handling keyed off an
allowlist env var. Directly reusable for any future product needing
subscription billing on the founder's existing Cloudflare stack.

## Repeated architectural patterns found

None internal to this repo (it's small and single-purpose) — but see the
cross-project INDEX for how this fits a larger pattern.

## Unfinished work found

None apparent — looks complete and deployed.

## Abandoned opportunities found

None.

## Recommended Company Intelligence updates

- `HQ/CompanyIntelligence/engines.md`: add this worker as the first real
  entry — "Stripe subscription billing engine (Cloudflare Worker + KV),
  proven in production via projectstack.cc. Reusable for any future
  subscription-billed product on the founder's stack." High confidence.
