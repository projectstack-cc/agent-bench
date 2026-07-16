# Technical Assets

**First populated 2026-07-17**, via Reconnaissance on `xpanda-ops-platform`
(ERP Firewall exception, `HQ/DECISIONS.md`). Distinct from `engines.md`
(reusable code) — these are operational limits and infrastructure patterns
worth knowing as facts, not code to reuse directly.

---

## D1's ~100-bound-parameter limit per SQL statement

**Confidence: High** — a real production incident, not a documented spec
limit found in isolation. `xpanda-ops-platform` hit this at ~100
concurrent active jobs (an `IN (...)` query bound one parameter per job)
and fixed it with a chunking helper (chunks at 90). Any future product
using Cloudflare D1 at meaningful scale should budget for this limit
before hitting it blind, not after.

## R2 object storage for file attachments (proven pattern)

**Confidence: High.** `xpanda-ops-platform` uses R2 for photo capture/
serving via an authenticated streaming route, as an alternative to the
platform's own documented default (base64-in-D1 for small files). A
working pattern for any future product needing file attachments beyond
what fits reasonably in a database row.
