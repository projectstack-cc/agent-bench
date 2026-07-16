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

---

## Kerf-aware bin-packing / nesting engine — flagship entry

**Confidence: High** — read directly (`Recon/xpanda-ops-platform-2026-07-17.md`,
ERP Firewall exception, `HQ/DECISIONS.md`).

**Source:** `xpanda-ops-platform`, `src/lib/blockEngine.ts` (ported 1:1
from a trusted-legacy vanilla-JS version, made pure and DOM-free so it
runs client- or server-side). **Proven in production** — real, dated
changelog entries (P228 and after), including a fix making the save path
"recompute authoritatively" server-side rather than trust client math.

**What it does:** computes optimal part placement within stock material
given kerf (blade width) loss, with multi-part, multi-orientation support
— a working solution to 2D cutting-stock/bin-packing, a genuinely hard,
generalizable computer-science problem.

**Reuse potential: the single most valuable, most generalizable technical
asset found across both Recon passes (16 projects total).** The same
algorithm class applies well beyond foam manufacturing — sheet metal,
fabric, glass, PCB panelization. Any future opportunity involving
optimal material cutting/layout should check this first, not scope a
bin-packing solution from scratch.

## BOL/PDF coordinate rendering engine

**Confidence: High.** Source: `xpanda-ops-platform`,
`logistics/bol-shared.js` — the documented single source of truth for PDF
generation coordinates, shared by the BOL generator and load builder.
Directly reusable pattern for any future product needing consistent
client-side PDF generation (`pdf-lib`).

## Packing-slip PDF parser

**Confidence: High.** Source: `xpanda-ops-platform`,
`jobs/packing-slip-parser.js` — extracts customer, address, line items,
dates, and PO# from uploaded PDFs client-side (`pdf.js`). **The third
working example of the document-automation opportunity category**,
alongside `pdf-tools` and the stalled `packslip-pro` (see `products.md`) —
and the most production-proven of the three. Check this before scoping any
future document-automation opportunity from scratch.

## Session-based auth + granular RBAC

**Confidence: High.** Source: `xpanda-ops-platform` —
`PATH_PERMISSION_MAP`/`API_PERMISSION_MAP` arrays mapping routes to
`{view, edit}` permission keys, a JSON permission blob per role, and a
documented three-step process for adding a new permission. A real,
working, low-dependency RBAC pattern — no external auth provider, D1-backed.
Worth checking against Clerk-based auth (the company's other validated
default, see `patterns.md`) when a future opportunity's cost sensitivity
or dependency-minimalism favors a self-hosted option.
