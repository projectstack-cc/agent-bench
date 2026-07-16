# Engines

**First populated 2026-07-17**, via the first real Reconnaissance sweep
(`Recon/2026-07-17-INDEX.md`). Filed through the Librarian gate with the
founder's explicit batch approval — not auto-promoted.

---

## Stripe subscription billing engine (Cloudflare Worker + KV)

**Confidence: High** — read directly (`Recon/subscription-worker-2026-07-17.md`).

**Source:** `subscription-worker` repo. **Proven, already in production** —
actively serving `projectstack.cc` (confirmed via `wrangler.toml`'s
`ALLOWED_ORIGINS`), not a prototype.

**What it does:** receives Stripe webhook events, stores subscription
status in Cloudflare KV keyed by customer email, serves subscription
status to authenticated frontends, creates Stripe Customer Portal sessions.
Includes Stripe webhook signature verification and CORS handling via an
allowlist env var.

**Reuse potential:** directly reusable for any future subscription-billed
product on the founder's existing Cloudflare stack — this is the single
most immediately reusable technical asset found in the entire Recon pass.
`cto` should check this first before scoping new billing infrastructure
for any future mission that needs subscriptions.

---

## Game engine capability-flag pattern + JSON-config + rules-module pattern

**Confidence: High** — already partially known this session (`lights-out`
was read directly in an earlier turn); confirmed again via Recon.

**Source:** `lights-out`. Two related patterns:
- **Capability flags** (`needsRoll`/`applyRoll`/`retainsTurn`/`onTurnEnd`,
  mirroring an existing `hasMandatoryJumps` pattern) — lets a shared game
  engine support per-game optional mechanics without special-casing game
  IDs in shell code.
- **JSON config + TypeScript rules-module per game** — adding a new game
  means writing config + a rules module, not modifying the shared engine.

**Reuse potential:** directly applicable to any future multi-game or
multi-variant product (see also `tiny-world`, which shares the general
game-product shape). Distinct from the *process* lessons already filed in
`success-history.md`/`agent-ceo.md` from this same project — this entry is
the technical pattern, not the QA-discipline lesson.
