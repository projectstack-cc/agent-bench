# Recon: full-project-pass — 2026-09-28

**Scope:** every project under `Projects/`, `Tools/`, and `Deployments/`,
read directly. No project had been opened via Recon at this breadth before.
**Method:** `cto`-style read of READMEs, package manifests, config, source
entry points, and mission records, followed by a Librarian-style cross-check
against `HQ/CompanyIntelligence/`. **Nothing was written to Company
Intelligence** — this report produces recommendations only, per
`Recon/README.md`.

---

## ~~Structural finding that gates everything else: `Projects/` is untracked~~

> **CORRECTED 2026-09-29. This section was WRONG. Kept in place rather than
> deleted, per this repo's "correct forward, never rewrite" rule.** The
> original text claimed five projects had no git repository at all. Five of
> eight are committed, and four of those are pushed to GitHub. See the
> corrected finding below.

### Corrected finding: per-project repos exist; the ignore rule is doing its job

`.gitignore` line 13 (`/Projects/`) correctly prevents each project's nested
repo from being absorbed into agent-bench's history. Verified individually:

| Project | Repo | Commits | Branch | Remote |
|---|---|---|---|---|
| `AuditSafeAI` | yes | 2 | master | none (local only) |
| `Disarray` | **no** | — | — | — |
| `Eclipse Circuit` | yes | 21 | master | none (local only) |
| `ForgeMark` | yes | 8 | main | `projectstack-cc/forgemark` |
| `MangaAggregator` | **no** | — | — | — (research doc only, no code) |
| `OtakuReader` | yes | 26 | `successor/docker-sqlite` | `projectstack-cc/OtakuReader` |
| `StreamNest` | yes | 11 | master | `projectstack-cc/streamnest` |
| `video-extractor` | **no** | — | — | — |

**Residual, much narrower risk — three projects with no repo at all:**

1. **`Disarray`** — the real one. It is now the harness engine plus a live
   local server and web UI (~1,600 lines of engine code, all written this
   session), and none of it is committed. Everything else here has at least a
   local history; this has nothing.
2. **`video-extractor`** — 9 files, an MV3 extension. No uncommitted work from
   this session, so low urgency, but it is the only other code project with no
   repo.
3. **`MangaAggregator`** — a research report, no code. Nothing to lose.

**Also worth flagging, opposite in character:** `AuditSafeAI` and
`Eclipse Circuit` are committed locally with **no remote** — 21 commits of
world-building and the company's most advanced product plan exist on one disk.
`OtakuReader` has a small amount of uncommitted work (a modified
`mangadex-client.ts`, three untracked files including two binary scripts).

### Why the original was wrong — recorded deliberately

The check used `find ... -type f`, which only matches *files*. A nested
repository's `.git` is a **directory**, so every nested repo was invisible to
that filter. Two projects were then confirmed by a separate directory listing,
and the conclusion was generalized from those two to all eight.

This is precisely the failure mode already recorded twice in
`HQ/CompanyIntelligence/failure-history.md`: asserting a conclusion from a
partial observation and stating it as fact. The correct check — a per-project
`[ -e "$dir/.git" ]` test — takes one line and answers it immediately. Had the
"untracked code" claim been promoted into `failure-history.md` as originally
recommended, it would have been a false entry in the company's institutional
record, and it would have stayed there: nothing downstream re-tests a filed
lesson.

---

## Reusable engines found

1. **Heuristic PDF structure detection** — `Tools/pdf-forge/pdf-forge.js`
   (146 lines) and its verbatim port `Projects/ForgeMark/src/converter.js`.
   Heading/list/table detection, ragged-table bullet fallback, `[IMAGE: page N]`
   density heuristic, YAML frontmatter. **Guarded by 9 passing tests**
   (`Projects/ForgeMark/test/converter.test.mjs`, `e2e.test.mjs` — the e2e
   drives crafted PDF bytes through real pdf.js). Validated at 5,476-page
   scale (Blender manual, 2026-08-13). The most battle-tested asset in the
   portfolio — and duplicated across two locations with no shared source.

2. **`claude` CLI stream-json executor** —
   `Archive/harness-v1/src/engine/executor/claude-code.ts`. Real working
   code: spawns `claude -p`, parses `stream-json` events
   (system/assistant/result), extracts `total_cost_usd`/`duration_ms`,
   supports `cwd` and `--resume`. Carries a hard-won comment documenting the
   `--allowedTools` argument-order bug that also became an entry in
   `failure-history.md`. **Nothing equivalent exists in Disarray.**

3. **CEO prompt assembler** — `Archive/harness-v1/src/engine/ceo.ts`.
   `assemblePrompt()` implements the exact injection order the 2026-07-06
   architecture review verified: constitution → agent definition → project
   context → relevant memories → task. Plus `checkFirewall()` /
   `detectChallenges()` and `rankMemories()` (overlap + 30-day recency decay).

4. **CEO engine v1 (Python)** — `Archive/v1-tooling/ceo.py` (332 lines) and
   `obsidian_scraper.py` (372 lines) — the original the TS port mirrors.

5. **SolidStart SSR-on-Vercel adapter** — `Projects/OtakuReader/api/`. Per
   `Deployments/OtakuReader/roster.md` this took three incidents: correct
   `vercel.json` routing/`outputDirectory`; explicit `framework`/
   `buildCommand` (auto-detect picked the wrong `solidstart-1` vinxi preset);
   and exporting h3's `toNodeHandler` rather than `.fetch` (Vercel's Node
   runtime calls `(req, res)`; a Fetch-style handler that never calls
   `res.end()` hangs to `FUNCTION_INVOCATION_TIMEOUT`). Genuinely reusable,
   genuinely painful, undocumented anywhere else.

6. **MangaDex proxy architecture** — token-bucket rate limiting, two-tier
   cache, at-home URL assembly. Fully characterized in
   `Projects/MangaAggregator/RESEARCH_REPORT.md` (2026-09-11), including
   ToS constraints (no ads, no paid services, scanlation credit required)
   and the CORS prohibition requiring a backend proxy.

## Reusable components found

- **Drizzle/D1 schema as a harness-shaped data model** —
  `Projects/Disarray/packages/db/src/schema.ts`: `agents`, `memories`
  (typed `decision|preference|fact|context|lesson` + `importance` +
  `agentId`), `agentic_loops` (`status`/`currentStep`/`maxIterations`),
  `documents`, `automations`, `apiKeys`. Good shape for harness persistence.
- **MV3 extension scaffolding** — three independent implementations:
  ForgeMark (PDF→MD), video-extractor (media capture), Disarray's web app.
  ForgeMark's `VALIDATION.md` is a reusable test-matrix template.
- **AI-adjacent product decision records** — `Projects/AuditSafeAI/planning/`
  (PRD, roadmap, backlog, decisions, CHANGELOG) is the portfolio's most
  disciplined planning structure.

## Technical capabilities found

- SolidStart 2.x + Vite SSR on Vercel (OtakuReader) — hard-won.
- Next.js 16 + React 19 (AuditSafeAI); Next.js 15 + OpenNext/Cloudflare
  Pages (StreamNest); SolidJS/Vite/PWA (OtakuReader); React/Vite/turbo/pnpm
  monorepo (Disarray).
- Clerk + Supabase selected for AuditSafeAI over the original
  OpenNext-on-Workers plan, with 4 independent portfolio citations cited.
- A document-classification-and-scoring architecture scoped to
  **full-context + prompt-caching deliberately instead of vector RAG**, with
  the reasoning written down: a retrieval miss becomes a false negative, the
  one zero-tolerance error class, and RAG's advantage doesn't materialize at
  ~340 clauses / one certification body.

## Repeated architectural patterns found

1. **Reference + delta, never copy** — holds in `Deployments/roster.md` vs
   `HQ/Executives/`, in each project README deferring reasoning to
   `CompanyIntelligence/`, and in per-project `decisions.md` logs that
   "never retroactively rewrite."
2. **Adversarial self-verification before a ship verdict** — appears in
   `failure-history.md` (trusting a reviewer's own fix),
   `success-history.md` (re-running the toolchain rather than trusting
   self-report), the OtakuReader roster ("confirmed via live
   `vercel logs --follow`... not guessed"), and the pdf-forge debrief
   (leaning on a test suite, not verbal confirmation).
3. **Deploy to a real surface, then discover the real bugs** — every
   non-trivial project found its worst bugs only after founder use in
   production, not in review.
4. **Real upstream ≠ assumed upstream** — OtakuReader found `searchManga()`
   calling a MangaDex `/search` endpoint that does not exist, and
   `getChapterPages()` calling one that never existed. Both caught by curl
   against live data.

## Unfinished work found

- **AuditSafeAI** — the most substantively complete *planning* in the
  portfolio, with **zero implementation**. The folder contains only
  `planning/*.md`, `agents/README.md`, `.env.example`, and a Next.js
  scaffold. The blocking item per `decisions.md` is the real branch
  compliance document set, confirmed by the founder as "coming shortly" —
  as of this pass, still not present. No `debrief.md`; the mission has not run.
- **ForgeMark** — has a written `VALIDATION.md` protocol with **every
  checkbox unticked and the Ship/no-ship line blank**. The extension has
  never been load-tested in Chrome. Monetization plumbing (Gumroad/Lemon
  Squeezy key check) is documented as pending. This is Court VI's required
  pay-link artifact and it does not exist.
- **OtakuReader** — all three milestones closed and verified live
  2026-09-11, with a same-day post-launch bug round. One known unfixed
  follow-up flagged for `qa-critic`: the error-fallback cache read in
  `manga/[...path].ts` lacking a `.value !== null` guard. Note: the roster
  states this both as an open milestone-2 follow-up and as fixed in the
  later section — it contradicts itself and needs a check against source.
- **Disarray** — substantively a mockup (assessment below).
- **StreamNest** — Next.js 15 with a full `.next` build and `.open-next`
  Cloudflare output on disk. **No `Deployments/` mission record exists**,
  so it is invisible to the company's mission system.
- **MangaAggregator** — `RESEARCH_REPORT.md` only, no code, but an
  excellent dated research artifact that OtakuReader effectively consumed
  without credit in its own records.

## Abandoned opportunities found

- **The agent-harness GUI/dispatch tool.** Confirmed abandoned rather than
  deferred: `strategic-direction.md` names it as explicitly NOT a current
  priority (§13 step 9, after missions run by hand). `harness-plan.md` is
  stuck at "Phase 0 — In Progress" with phases 1–8 unticked, last touched
  2026-06-27. The working v1 engine sits in `Archive/harness-v1/` while
  `Projects/Disarray/` — a superficially similar monorepo — had no git repo
  and contained a different, unvalidated design at the time of this pass.
  **Superseded 2026-09-29:** the engine has since been ported into
  `packages/harness`, proven by a live dispatch, and wired to a local server
  and web UI. It still has no git repo — that part is unchanged.
- **Disarray as a product:** at the time of this pass, viable-looking but with
  the substance absent (assessment below). **Superseded 2026-09-29** — see the
  assessment section and the correction note.

## Honest technical assessment of Disarray (flagged, not filed as product)

`Projects/Disarray/README.md` markets "Memory — persistent agent memory with
semantic search (RAG)" and "Automations — n8n-powered workflows." Direct
source reading:

- **The MCP server does nothing.** All six tools in
  `apps/mcp-server/src/index.ts` return
  `JSON.stringify({ message: 'Task created', params })`. `search_memory`
  returns a fixed string.
- **The CLI is hardcoded fiction.** `disarray status` prints `"2 active"`,
  `"12 open"`, `"47 indexed"`. `disarray memory <q>` prints three hardcoded
  strings with invented percentages (90%/70%/80%) regardless of the query.
- **Vectorize is bound and unused.** `Env` declares `VECTORIZE`; the
  "semantic" search endpoint at `functions/api/index.ts:171` is
  `SELECT ... WHERE content LIKE '%query%'`. The RAG claim is false.
- **No authentication.** Every handler defaults inline —
  `workspace_id || 'ws-1'`, `creator_id || 'user-1'` — and CORS is `*`.
- **The Drizzle schema is decorative.** The API layer is raw SQL strings;
  `functions/api/` never uses the ORM.
- **The architecture is incompatible with a harness anyway.** Workers has no
  filesystem and no subprocess spawn, so it cannot do what
  `harness-plan.md` Phase 4.5 requires (open arbitrary folders, spawn
  `claude` with `cwd`). It is a multi-tenant SaaS shape; the harness is a
  single-user local-tool shape.

This matters beyond Disarray: **README claims that outrun implementation are
the exact failure mode `failure-history.md` already records twice** (a
"silent soft-lock with zero console errors"; a self-report of "67/67 tests
passing" that hid a real rules bug).

---

## Recommended Company Intelligence updates

*(Proposals only — Librarian cross-check + founder approval required.)*

| # | Target file | Proposed change |
|---|-------------|-----------------|
| 1 | `technical-assets.md` | Add OtakuReader to the deployed/live asset list: SolidStart 2.x on Vercel, all three incident milestones closed, verified live 2026-09-11. Currently absent from the inventory. |
| 2 | `technical-assets.md` | Add `Archive/harness-v1/` engine (398 lines: prompt assembler + `claude` stream-json executor) as a recoverable asset, flagged as the only working agent-execution code in the portfolio. |
| 3 | `patterns.md` | New pattern: **"a README's capability list is a claim, not evidence — verify against source before filing it as a technical asset."** Instance: Disarray's RAG/n8n/CLI claims vs. hardcoded output. |
| 4 | `patterns.md` | New pattern: **"a multi-incident deploy fix is reusable knowledge — write it where the next project will find it."** The SolidStart/Vercel three-incident chain belongs in `Skills/`, not a project README. |
| 5 | `failure-history.md` | New entry: **a conclusion drawn from a filtered observation, then generalized.** *(Replaces the original recommendation, which claimed "untracked source code as a data-loss risk, 5 of 8 projects have no repo" — that was factually wrong and must NOT be promoted. Five of eight are committed, four with GitHub remotes. See the corrected structural finding above for the verified table. The lesson worth filing is the method failure: a `find -type f` filter silently excluded every nested `.git` directory, and the surviving observation was generalized to all eight. Concrete mitigation: any "N of M" claim in a Recon report must be backed by a per-item enumeration, not a sampled one.)** |
| 6 | `failure-history.md` | New entry: **docs can contradict themselves across their own sections.** `Deployments/OtakuReader/roster.md` states the `.value !== null` cache guard both as an open follow-up and as fixed. |
| 7 | `success-history.md` | New entry: **curl the real upstream, don't trust the endpoint name.** OtakuReader's `/search` and `getChapterPages` findings were caught only by direct requests against live MangaDex. |
| 8 | `success-history.md` | New entry: **deploying to production is itself a discovery mechanism.** Every serious bug in OtakuReader and pdf-forge surfaced only after founder use on a real surface. |
| 9 | `products.md` | Update ForgeMark: brand resolved, engine ported and under 9 passing tests, **but `VALIDATION.md` is entirely unticked and no store/pay-link exists** — built and unlaunched, not productized. |
| 10 | `products.md` | Update AuditSafeAI: planning complete and thorough; implementation zero, blocked on the branch document set. Milestone 1 has not run. |
| 11 | `products.md` | Note `video-extractor` and `MangaAggregator` as real projects absent from the product inventory. ~~Previously said "StreamNest and video-extractor, untracked" — StreamNest is committed to GitHub; the "untracked" claim was the corrected error.~~ |
| 12 | `strategic-direction.md` | Cross-reference the sell-first mandate against reality: the single artifact that would satisfy it (ForgeMark's pay link) is unbuilt, and the one completed debrief says adoption slipped badly. Sell-first has not actually started. |
| 13 | `knowledge-domains.md` | File the MangaDex/AniList/Jikan API characterization (researched 2026-09-11) plus the MangaDex ToS prohibitions on ads and paid services — a live constraint on any manga-adjacent monetization. |
| 14 | `engines.md` | Add the heuristic-PDF-structure-detection engine with both implementation sites named and the duplication risk flagged. |
| 15 | `project-history.md` | Record that the harness stopped at Phase 0 with its working v1 engine archived, so a future session doesn't re-derive that Disarray is not a harness. |

## Open questions for the founder

1. **Disarray — it now has no git repo at all, and it is the only project where
   that matters.** As of this pass it holds the harness engine, the local
   server, and the web UI (~1,600 lines of engine code written 2026-09-29),
   none of it committed. *(The original wording of this question called Disarray
   "untracked, substantively a mockup, and architecturally incompatible with
   the harness" — the "mockup" and "incompatible" claims were superseded when
   the engine was ported and proven by a live dispatch. The untracked part was
   and remains correct.)*
2. **StreamNest — abandoned or active?** No mission record, no deployment
   entry, no mention in Company Intelligence. Same for `video-extractor`.
3. **Should the OtakuReader deployment record close?** All milestones report
   verified-live, but there is no `debrief.md` and `Deployments/README.md`
   still describes the pattern as awaiting its first real mission.
4. **AuditSafeAI's blocking document set** — "coming shortly" as of
   2026-07-21, still outstanding ~10 weeks later. It is the only thing
   between the company and its most advanced product.
5. **`AuditSafeAI` and `Eclipse Circuit` have no git remote.** 21 commits of
   Eclipse Circuit world-building and the company's most advanced product plan
   exist on a single disk. Low urgency, but unlike the other five there is no
   off-machine copy.

## Confidence

**Corrected 2026-09-29.** The original read:

> **High** on everything sourced directly from source code, config, mission
> records, and git state — all findings above were read, not inferred.

That confidence claim was itself the error. A finding was reported on "git
state" that was wrong, because the tool used to read git state silently
excluded the thing being looked for. Verified-directly is not the same as
verified-completely, and this report overstated the difference.

**Revised:**
- **High** on all findings enumerated per-item in a table above — the repo
  table was built by testing each project individually, not by filtering.
- **High** on Disarray's stub status and on the ported-engine state, both
  re-confirmed by running code rather than reading it.
- **Medium** on StreamNest and video-extractor contents (build artifacts
  dominated the file listings; application code was not read).


**Medium** on the Disarray "mockup" characterization: I read the API
function, MCP server, and CLI in full, but did not run the app, hit the
database, or exercise the Turborepo build. A working `Vectorize` path
existing elsewhere that I did not locate would soften it.

**Not assessed:** StreamNest and video-extractor source in depth (build
artifacts dominated the file listings); Eclipse Circuit narrative/game
content; `HQ/Skills/` and `engines.md` beyond spot checks.

---

*Recon pass complete. No Company Intelligence file was modified. Per
`Recon/README.md`, promotion requires the Librarian cross-check and founder
approval — this report is the input to that gate, not a substitute for it.*
