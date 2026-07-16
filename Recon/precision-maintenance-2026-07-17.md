# Recon: precision-maintenance — 2026-07-17

**Confidence: High** — read `index.html`, `js/main.js` directly; confirmed
via GitHub that canonical location is now `projectstack-cc/precision-maintenance`
(the local remote still points at `Zer0Flaw/...`, which GitHub redirects).

## Reusable engines found

None — static site.

## Reusable components found

Same vanilla-JS marketing-site shell as `projectstack` (nav, carousel,
scroll-to-top, contact/quote forms, fade-on-scroll). See cross-project
pattern in the INDEX.

## Technical capabilities found

`CNAME` file present — hosted via GitHub Pages on a custom domain. A real,
live client site (HVAC services, Central Florida), not a demo.

## Repeated architectural patterns found

Same as `projectstack` — see INDEX, don't duplicate the entry.

## Unfinished work found

None apparent.

## Abandoned opportunities found

None — appears live.

## Recommended Company Intelligence updates

- Same organizational note as `projectstack-2026-07-17.md`: this is real,
  apparently-shipped client work under the `projectstack-cc` org, currently
  invisible to Company Intelligence. One combined entry covering both is
  sufficient — see the INDEX's recommendation, don't file two near-identical
  updates.
- `patterns.md`: "vanilla HTML/CSS/JS + GitHub Pages" is a proven,
  repeatable delivery pattern for small local-business client sites —
  worth naming as a company capability distinct from the React/Next.js
  SaaS pattern used elsewhere.
