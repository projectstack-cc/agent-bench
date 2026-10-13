# Deployment: OtakuReader

Incident-triggered mission — see `brief.md` for full scope. Two
milestones, disjoint file sets, sequenced by priority not dependency.

## Roster

| Executive | HQ Version Pinned | Mission Overlay |
|-----------|--------------------|-------------------|
| `ops` | v1 | **Milestone 1 (done, verified locally via `vercel build`; not yet deployed).** Fix the Vercel deploy: correct `vercel.json` (routing/`outputDirectory` so `/` and app routes hit the SSR function while static client assets still serve directly), fix the hand-rolled adapter's bugs (import path, `[...path]` catch-all naming, add `h3` as a real dependency, handle the server build's code-split chunks), verify via local `npm run build` + `vercel build`. No production deploy without explicit founder confirmation first. Scope: `vercel.json`, `api/`, `package.json` deps only — does not touch `src/routes/api/**/+server.ts`. |
| `backend` | v1 | **Milestone 2 (done, committed `5bd89c0`; verified locally, not yet deployed).** Rewrote all 4 SvelteKit-convention `+server.ts` files to SolidStart's actual route convention (flattened filenames, `~/lib` alias, single-argument `APIEvent` signature, fixed a catch-all-params-are-a-string-not-an-array bug confirmed empirically against the installed radix3 router). Also fixed a bug this exposed for the first time: `searchManga()` in `src/lib/utils/api.ts` called a MangaDex endpoint (`/search`) that doesn't exist — MangaDex search is `GET /manga` with a title filter, same as `fetchBrowseManga()` already used. Verified via a raw Node `http` server driving `dist/server/entry-server.js`'s `.node` export against real upstreams (MangaDex data returned correctly, Jikan's own 504 handled as a clean fallback, AniList confirmed disabled server-side not a local issue, cover-route precedence over the catch-all confirmed). **Known follow-up flagged for qa-critic, not fixed:** `manga/[...path].ts`'s error-fallback cache read doesn't check `.value !== null`, so a genuine upstream failure after a prior cache-probe miss can return a 200 with an empty body instead of a real error. |
| `frontend` | v1 | **Milestone 3 (done, verified locally via `vite dev` + curl on `/` and `/browse`; client-side hydration/click-navigation not tested).** `src/app.tsx` has no `<Router>`/`<FileRoutes>` at all — confirmed by reading `node_modules/@solidjs/start/dist/client/StartClient.jsx`: the `solid-start:app` virtual module resolves directly to `app.tsx` with zero automatic Router wrapping on either the client or server render path (`StartServer` does the same). `app.tsx` currently renders `<slot />` (Svelte's content-projection syntax — invalid here, resolves to a no-op native `<slot>` element) where routed page content should appear, and renders `<Navigation />` as a sibling with no Router ancestor at all, so `useLocation()` inside it throws `<A> and 'use' router primitives can be only used inside a Route`. Confirmed pattern via `node_modules/@solidjs/start/dist/router.jsx` (exports `FileRoutes`) — fix is: `import { Router } from "@solidjs/router"` (already a dependency) + `import { FileRoutes } from "@solidjs/start/router"`, then `<Router root={(props) => <YourShellWithNavigationAndSuspense>{props.children}</YourShellWithNavigationAndSuspense>}><FileRoutes /></Router>`, restructured so `<Navigation />` renders inside the `root` render-prop (i.e. inside Router context), not outside it. Verify with `vite dev` — reproduces without any deploy involved. |

## Status

Milestones 1 and 3 committed (`5aa5e0e`) and pushed to `main` on
2026-09-11, which surfaced a second incident: the deploy went from 404
to a 504 `FUNCTION_INVOCATION_TIMEOUT`. Root cause (confirmed via live
`vercel logs --follow` during reproduction, not guessed): `api/render.ts`
exported a Web-Fetch-style handler, but Vercel's Node.js runtime invokes
functions with the classic `(req, res)` signature — h3 received a raw
Node request with a relative `.url` ("/"), threw `Invalid URL`
internally, and because a Fetch-style handler never calls `res.end()`,
the response hung until timeout. Fixed (commit `88a8a3d`) by exporting
h3/node's `toNodeHandler` instead of `.fetch` for the Vercel Function.
Also made `vercel.json`'s `framework`/`buildCommand`/`devCommand`
explicit — the project was auto-detected as the `solidstart-1` preset
(vinxi toolchain), which this project doesn't use; `vercel dev` failed
outright until this was fixed.

**Verified live** 2026-09-11: `https://otakureader.vercel.app/` and
`/browse` both return 200 with correctly rendered, route-distinct HTML.
404/504 incidents closed.

Milestone 2 committed `5bd89c0`, pushed and verified live 2026-09-11:
`/api/manga/manga?title=naruto` returns real MangaDex data in
production; Jikan proxy correctly returns a clean structured fallback
when Jikan's own API 504s. All three milestones closed.

## Post-launch bug rounds (2026-09-11/12, same day)

Founder testing surfaced a chain of real, previously-unreachable bugs
in the manga detail/reading/search pipeline — none were API problems;
MangaDex was reliable throughout (confirmed repeatedly via direct curl
tests against real upstream data).

- `searchManga()`/`fetchBrowseManga()` missing `includes[]=cover_art` →
  every thumbnail 404'd (empty `file` param). Fixed `a1548d2`'s ancestor
  commits.
- `getMangaDetail`/`getMangaFeed`/the reader's inline detail fetch all
  called MangaDex paths missing a `manga/` segment (only
  `fetchBrowseManga` had it right); `getChapterPages` called an endpoint
  that doesn't exist on MangaDex at all (real flow is
  `/at-home/server/{chapterId}` → build image URLs from
  `baseUrl+hash+filename`). Root cause of "click chapter → shows
  'Unknown'".
- A cache bug in `manga/[...path].ts`: a cache-probe write (meant to
  prevent stampedes) got read back as if it were real cached data on
  any subsequent failure in the same request, masking real errors as
  fake 200s with an empty body. Fixed with a `.value !== null` guard.
- Quick search (sidebar + mobile top bar) navigated to `/search?q=...`,
  but `search.tsx` never read that URL param — typing there did
  nothing on the destination page. Fixed via `useSearchParams`.
- Mobile tab bar had a stray inline style stacking ~168px of fixed
  content over the page with no compensating `<main>` padding —
  "top nav bar cuts off content". Reverted to its own CSS class's
  bottom-pinned default position.
- **Reading crash, root-caused via live Claude-in-Chrome testing (curl
  alone could never have caught this — it's purely client-side):**
  `Reader.tsx`'s `IntersectionObserver` used `rootMargin: "100vh 0px"`,
  which the browser API rejects (`SyntaxError`, pixels/percent only) —
  thrown uncaught inside `onMount`. Fixed, but pages still didn't
  render after — traced to a second, independent bug: `PageImage.tsx`
  had `<Show when={!loaded()&&!error()} fallback={<img onLoad=.../>}>`,
  meaning the `<img>` (the only thing that can ever set `loaded=true`)
  only mounted once `loaded` was already true — a permanent deadlock.
  Fixed by rendering the `<img>` unconditionally with the spinner as an

Fixes for the P1 round: committed `83ab396` on `main`
(2026-09-14), pushed with founder approval, **auto-deployed to
production and verified live** (2026-09-14): `otakureader.vercel.app`
home returns 200, and the production feed proxy returns English-only
chapters (Chainsaw Man ch.1, `translatedLanguage: "en"`). Mission bug
round closed; rollback available via Vercel instant rollback if needed.

### P1s fixed in `83ab396`
1. Feed: `translatedLanguage[]=en` server-side filter; `language` now
   mapped from the real `translatedLanguage` attribute (was always
   hardcoded `"en"`); external-URL/zero-page chapters filtered out.
2. Search + browse: `availableTranslatedLanguage[]=en` on catalog calls.
3. `ChapterList` release selector defaults to first release with `pages > 0`.
4. `getChapterPages`: falls back to `dataSaver` filenames when `data` is empty.

## English-only + "missing chapters" round (2026-09-14, commits `0c45b0c`, `ca518f0`)

Founder: "I don't want any non-english links; some manga only show a
fraction of what actually exists." Three fixes + one behavior change:

1. **Feed pagination** — `getMangaFeed` fetched one 500-item page; long
   runners were silently truncated. Now loops with offset (raw-count
   stop condition) up to 5000 chapters.
2. **Dead-end search results removed** — `unifiedSearch` previously
   merged AniList/Jikan entries whose non-MangaDex IDs 404'd when
   clicked. Search now only returns MangaDex-readable entries; metadata
   sources still enrich matches.
3. **Non-English fallback removed** (reverted the earlier all-languages
   fallback per founder preference) — no-EN titles show an empty list
   rather than vi/es-la links.
4. **Official external English chapters restored** — One Piece has only
   12 EN chapters on MangaDex, 11 of them external MangaPlus links that
   the zero-page filter was hiding (this was the "fraction of what
   exists" symptom for simulpub titles). External EN chapters now render
   with an "Official · opens externally" badge and open the publisher
   reader in a new tab. "Start Reading" prefers hosted chapters.

## Nav fix (2026-09-14, `b6fa897`)

The mobile tab bar / desktop sidebar "Search" item never linked to
`/browse` — the discovery lists shipped but had no entry point in the
nav (only direct URL). Replaced the nav item with `Browse → /browse`
(compass icon); search stays in the sidebar/top search bars. Deployed
and browser-verified: tab bar renders Home/Browse/Favorites/History,
click lands on `/browse` with all list chips rendering.

## "Chapters still failing" root cause round (2026-09-14)

Two separate fixes, committed `b379de5`, deployed, browser-verified:

1. **Service worker was the real culprit** (`public/sw.js`):
   - The file contained TypeScript annotations (`(event: any)`) in plain
     JS → SW script evaluation failed on fresh browsers; older valid SW
     versions already installed in returning visitors' browsers kept
     running with **cache-first, never-expiring `/api/` caching** — stale
     responses from the bug era (incl. dead at-home image URLs) were
     served forever, masking all backend fixes. Fresh browsers (no SW)
     worked, which is why Playwright round 1 passed while the founder
     still saw failures.
   - Fix: rewritten as valid plain JS (`node --check` ✓), API caching
     switched to **network-first** (cache = offline fallback only), cache
     names bumped v1→v2 so activate purges all stale caches.
   - Verified in browser: SW registers + activates, zero console errors,
     reader loads page images.
2. **Empty-chapter-list fallback** (`getMangaFeed`): manga with zero
   English chapters (e.g. One Piece Academy — vi/es-la only) rendered an
   empty chapter list after the English-first filter, reading as
   "chapters failed to load". Now falls back to the unfiltered feed
   when the EN fetch returns nothing; ChapterList's language selector
   still defaults to `all` in that case.

## Browse discovery lists (2026-09-14, `frontend` dispatch)

Committed `e978226`, pushed, auto-deployed, verified live (browse 200 +
top-rated proxy returning results in production).

- New chip row on `/browse`: All · 🔥 Trending · Most Popular · 🏆 Top 10
  All-Time (ranked list view) · Top Rated · Newest · Latest Updates ·
  Completed · A–Z (letter jump). All backed by MangaDex order/status/
  `hasAvailableChapters` params; `sortDir` + `hasChapters` + `limit`
  added to `fetchBrowseManga`.
- **Bug fixed en route:** the FilterPanel tag filter never worked — it
  sent tag display names as `tags[]`, but MangaDex requires UUIDs via
  `includedTags[]`. Now fetches the tag registry once
  (`getMangaTags()`) and maps names → UUIDs.
- **Bug fixed:** Rating sort used `averageRating` (invalid MD order
  key); corrected to `rating`.
- Known limitation: A–Z letter jump uses MD's `title` filter, which is
  word/substring matching, not strict prefix — acceptable for MVP.

## Post-launch dispatch round (2026-09-14)

| Executive | Task | Status |
|-----------|------|--------|
| `qa-critic` | Full codebase teardown, priority: chapter→pages pipeline + language filtering | Report delivered to founder — 8 findings, 4 P1 (see below) |
| `research` | English-language manga API landscape scan | Report delivered — 3 recommended additions (MangaPlus, MangaUpdates, Kitsu), all metadata/reading caveats documented |

Note: founder's "chapters not loading" report aligns with qa-critic P1-1
(external-URL chapters with 0 pages), P1-2 (feed not filtered to
`translatedLanguage[]=en`), P1-3 (release selector defaults to a
zero-page release), P1-4 (browse/search surface manga with no English
translations at all). Fixes are backend-scoped (`src/lib/utils/api.ts`,
`ChapterList.tsx`, `manga/[id].tsx`, browse/search routes) — disjoint from
any research integration work; safe to sequence fixes first.

  overlay instead. Also removed `Reader.tsx`'s custom
  IntersectionObserver-based virtualization entirely (its `.observe()`
  call ran before the observer variable was even assigned, so it never
  did anything) in favor of native `loading="lazy"/"eager"`. **Verified
  reading actually works** via direct browser testing: real page images
  load and render.
- Added a chapter source/scanlation-group selector: MangaDex often has
  many groups release the same chapter number, which read as broken
  duplicate rows (one manga tested: 133 releases across 37 real
  chapters). Now groups by chapter number with a selector chip row per
  duplicate set. Needed `includes[]=scanlation_group` on the feed
  request too, or the selector showed raw group UUIDs instead of names.
- Replaced the purple neumorphism theme with graphite/emerald per
  founder preference.

**Everything above is verified live**, several specifically via direct
Claude-in-Chrome browser testing (DOM inspection, network request logs,
console errors) rather than curl alone — the reading-crash chain in
particular could only be diagnosed that way.

## Milestone Gate

`qa-critic` reviews Milestone 1's serverless adapter and Milestone 3's
Router restructure together before any real `vercel deploy`/push-to-
`main` (they ship as one deploy), and reviews Milestone 2's rewritten
routes before that's considered done (per CEO decomposition rule: no
milestone ships without an intermediate checkpoint).
