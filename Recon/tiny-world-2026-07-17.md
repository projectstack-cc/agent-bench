# Recon: tiny-world — 2026-07-17

**Confidence: High** — read `planning/decisions.md`, `package.json` directly.

## Reusable engines found

None extracted as a standalone package — Phaser.js game logic is
project-specific — but see the cross-project monetization pattern below,
which is a reusable *decision*, not code.

## Reusable components found

A `Agents/` folder (`ceo.py`, `obsidian_scraper.py`, `agent-*.md`,
`.bat` wrappers) — the same V1 CEO-harness pattern already archived in
`agent-bench`'s `Archive/v1-tooling/`. Confirms the pre-HQ pattern was
deployed to at least one other project, not just this one — real evidence
for how the multi-agent approach was actually exercised before HQ existed.

## Technical capabilities found

Phaser.js 3.x, Vite build, PWA/"Add to Home Screen" distribution via
itch.io (no app store).

## Repeated architectural patterns found

**One-time purchase over subscription, explicitly reasoned as a
trust/billing-anxiety decision** — `planning/decisions.md` DEC-003 states
this almost identically to `lights-out`'s own ADR-009 (free tier + one-time
$9.99 unlock), independently arrived at in both projects. This is a real,
twice-validated founder pattern, not a one-off — see the INDEX.

Also: Phaser.js chosen over Unreal Engine/Unity/Godot/three.js
specifically for 2D-only, no-app-store-account, JS-native reasons
(`decisions.md` DEC-001) — worth `patterns.md` as "game engine choice
criteria" if a third game project ever gets built.

## Unfinished work found

Not assessed at source-code depth this pass.

## Abandoned opportunities found

None identified at this depth.

## Recommended Company Intelligence updates

- `patterns.md`: "One-time purchase over subscription for consumer
  game/app products" — cited independently in `tiny-world` and
  `lights-out`. High confidence, real pattern, not a guess.
- `patterns.md`: "Per-project `Agents/` CEO-harness folders predate HQ" —
  worth noting as history, not a live pattern to repeat (superseded by HQ).
- `products.md`: Tiny World — Phaser.js toddler educational game,
  itch.io/PWA distribution, $9.99 one-time.
