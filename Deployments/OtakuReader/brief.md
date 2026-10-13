# Mission Brief: OtakuReader

Production incident follow-through — the shipped app 404s on Vercel
(`404: NOT_FOUND`, id `iad1::rd2sv-1789174346064-3815a732be27`). Founder
asked the CEO to route triage; diagnosis surfaced two separate problems
of different scope, so this mission covers both rather than closing after
the immediate incident.

## Mission Objectives

1. **Deploy fix (in progress, `ops`):** `Projects/OtakuReader` is a
   `@solidjs/start@2.0.5` SSR app deployed as if it were a static site.
   Root cause: `vercel.json` sets `"outputDirectory": "dist"`, but an SSR
   build has no `index.html` in `dist/client` — HTML is generated
   per-request by `dist/server/entry-server.mjs`. A prior, incomplete fix
   attempt (`api/[[path]].ts`, a hand-rolled Vercel Function wrapping
   `@solidjs/start/server`'s `createHandler`) was never committed and has
   real bugs (wrong relative import depth, Next.js-only `[[path]]`
   catch-all syntax where plain Vercel Functions need `[...path]`,
   undeclared `h3` dependency, no `rewrites` routing `/` to the function).
   `@solidjs/start` v2 is Vite-native with no Nitro/vinxi preset — a
   hand-written platform adapter is the correct approach for this
   version, not a workaround to avoid.
2. **Backend rework (not started):** `src/routes/api/**/+server.ts`
   (MangaDex proxy, Jikan proxy, AniList query, rate-limiting, caching)
   is written using SvelteKit's file convention (`+server.ts` filenames,
   `$lib` aliasing) inside a SolidStart project. SolidStart's file router
   (`@solidjs/start/dist/config/fs-router.js`) expects exported
   `GET`/`POST`/etc. from a plain route file — it does not recognize
   `+server.ts` at all. This code has never executed; it's dead weight
   independent of the deploy fix. Needs a rewrite to SolidStart's actual
   route/handler convention before the app has a working backend.

## Success Metrics

1. The production URL serves the app at `/` (verified live, not just a
   green build) — deploy-fix objective.
2. Manga search/browse/read flows actually hit a working proxy layer —
   backend-rework objective. Not met until the `+server.ts` files are
   ported and manually exercised against a real MangaDex/Jikan/AniList
   response.

## Constraints

- Deploy fix: no production deploy without explicit founder confirmation
  before the `vercel deploy`/push-to-`main` step (ops doctrine: no silent
  deploys to production). Local build/`vercel build` verification first.
- Don't touch the `+server.ts` files as part of the deploy-fix milestone
  — separate agent, separate milestone, avoid clobbering.
- Rollback path: Vercel instant rollback to prior deployment exists once
  a working deploy ships (per `agent-ops.md`'s project matrix pattern for
  Vercel-hosted projects).

## Required Skills

`@solidjs/start@2.0.5` Vercel Function adapter pattern (no existing
engine in the portfolio covers this — first project on this SolidStart
version). SolidStart file-based API route convention, for the backend
rework milestone.

## Context

No prior `Deployments/OtakuReader/` folder existed before this incident
— the project shipped its initial commit (`a475c35`) without one. This
mission starts retroactively at the incident.
