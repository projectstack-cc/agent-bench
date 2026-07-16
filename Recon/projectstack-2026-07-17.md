# Recon: projectstack — 2026-07-17

**Confidence: High** — read `index.html`, `main.js` directly; git remote and
`subscription-worker`'s `ALLOWED_ORIGINS` cross-checked.

## Reusable engines found

None in this repo itself — it's a static site — but it's the live consumer
of `subscription-worker`'s engine (see that report).

## Reusable components found

A vanilla HTML/CSS/JS marketing-site shell (nav with scroll state, mobile
nav toggle) — see cross-project pattern in the INDEX; this and
`precision-maintenance` share the same shape.

## Technical capabilities found

None beyond standard static-site JS.

## Repeated architectural patterns found

Vanilla HTML/CSS/JS marketing site, no framework, no build step — same
pattern as `precision-maintenance`. Worth naming once (see INDEX), not twice.

## Unfinished work found

None apparent from a static-site read.

## Abandoned opportunities found

None — appears live and current.

## Recommended Company Intelligence updates

**The significant finding here isn't technical — it's organizational, and
belongs in `founder-profile.md`/`strategic-direction.md`, not just
`engines.md`:**

- This is "ProjectStack Web Solutions" — a real, apparently operating
  client-services web agency ("custom systems for real businesses... based
  in Casselberry, FL"), with its own GitHub organization
  (`projectstack-cc`) that several other repos (`tapin`,
  `precision-maintenance`) are hosted under instead of the personal
  `Zer0Flaw` account. **Nothing in current Company Intelligence mentions
  this business exists.** Recommend the CEO/user reconcile whether
  ProjectStack is: (a) an existing revenue source that should already
  count toward the $5,000/mo target, (b) a separate business entirely
  out of this company's scope, or (c) something in between (e.g., the
  distribution channel for future missions). This changes the Company
  Thesis's "we need to find new opportunities" framing materially if (a).
  Flagged as a real open question, not decided here.
