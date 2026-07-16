# Recon: xpanda-ops-platform — 2026-07-17

**Confidence: High.** Read `AGENTS.md` in full, `CHANGELOG.md`'s Manufacturing/Cutting
section in depth (~80 dated entries), `.git/logs/HEAD` (581 total ref-log
entries, first commit 2026-07-... through present — real, continuous
multi-month development, not a burst), `skills-lock.json`, and directory
structure. Did not read every module's source line-by-line — single-session
depth, not a full code audit.

**Authorization:** ERP Firewall exception, founder-authorized 2026-07-17,
logged in `HQ/DECISIONS.md`. Read-only. Nothing in this repo was modified.

---

## Verdict on the founder's stated belief

**Holds up, strongly.** This is not a scaffold or a pet project — it's a
real, continuously-developed, production ERP system for a foam
manufacturing operation, with 581 git ref-log entries, a disciplined
prompt-numbered change process (P1 through at least P248+ in one module
alone), explicit tracked technical debt, and evidence of real production
incidents being fixed (a D1 100-bound-parameter query limit hit at ~100
active jobs; a stale-asset-cache deploy bug; a `UNIQUE` constraint error on
BOL reprinting). The single most technically sophisticated asset found in
this entire two-pass Recon (across 16 projects total) is here: a
kerf-aware bin-packing/nesting engine for cutting optimization.

**Open question, not resolved by this pass:** the founder's business
relationship to this system is unconfirmed — `AGENTS.md` refers to "Steve"
as the person with D1 dashboard console access and the implicit
operational owner, which reads like a real client or business partner, not
the founder acting as end-user. Whether this represents the founder's own
company, a client engagement, or something else materially changes how it
should be filed in Company Intelligence (a product the founder owns vs.
service work for someone else). Flagged for the founder to clarify
directly, not guessed at.

---

## Reusable engines found

**Kerf-aware block-nesting/bin-packing engine** (`src/lib/blockEngine.ts`,
per CHANGELOG P228) — ported 1:1 from a "trusted legacy" vanilla-JS
version (`manufacturing/block-calculator.html`), made a pure, DOM-free,
client-and-server-usable module. Computes optimal part placement within
stock material given kerf (blade width) loss, with multi-part, multi-
orientation support. **This is a genuinely hard, generalizable
computer-science problem (2D cutting-stock/bin-packing) with real
value outside foam manufacturing** — the same class of algorithm applies
to sheet metal, fabric, glass, or PCB panelization. The single most
valuable, most generalizable technical asset found across both Recon
passes (16 projects total).

**BOL/PDF coordinate rendering engine** (`logistics/bol-shared.js`) —
explicitly documented as the single source of truth for PDF generation
coordinates, consumed by both the BOL generator and load builder.
Directly reusable pattern for any future product needing consistent
client-side PDF generation (`pdf-lib`).

**Packing-slip PDF parser** (`jobs/packing-slip-parser.js`) — extracts
customer, address, line items, dates, and PO# from uploaded PDFs
client-side (`pdf.js`). Directly relevant to the document-automation
opportunity category already flagged from `pdf-tools`/`packslip-pro` in
the prior Recon pass — this is a **third, working example** of that same
opportunity category, and the most production-proven of the three.

**Session-based auth + granular RBAC** — `PATH_PERMISSION_MAP`/
`API_PERMISSION_MAP` arrays mapping routes to `{view, edit}` permission
keys, JSON permission blob per role, hardcoded admin bypass, and a
documented three-step process for adding a new permission
("`AGENTS.md` §3: add the key to both maps + `PERMISSION_LABELS`, admin UI
auto-renders the toggle"). A real, working, low-dependency RBAC pattern —
no external auth provider, D1-backed.

---

## Reusable components found

From the in-progress React/Next.js "Cutting v2" pilot (see Patterns
below): `<Modal>`, `<Sheet>`, `<StatusPill>` primitives, explicitly built
as "anti-copy-paste" precedents; a `ThemeProvider`/`useTheme()` pair
faithfully re-implementing the legacy vanilla theme contract
(`localStorage` key, `data-theme` attribute, pre-hydration inline script
to prevent flash) so the new and legacy surfaces share theme state.

**Not a company asset — correction to an earlier assumption this pass
almost made:** `.agents/skills/*/SKILL.md` (design-taste-frontend,
brandkit, gpt-taste, etc.) initially looked like original company IP
matching the ~17 skills referenced in prior Obsidian vault memory.
**`skills-lock.json` shows they're fetched from a third-party GitHub repo
(`Leonxlnx/taste-skill`) via a hash-verified lockfile, not authored
in-house.** Do not file these as company-owned skills. The lockfile
*mechanism* itself — versioned, hash-verified external skill dependencies
— is a genuinely interesting reusable pattern, separate from the content.

---

## Technical capabilities found

**Next.js on Cloudflare Workers via OpenNext, proven working** — a
nontrivial integration many teams struggle with. Real, specific gotchas
documented and fixed: `basePath` vs. `assetPrefix` asset-routing
mismatches (two separate bugs, P203 and P205), a stale-build asset cache
bug from an idempotency guard skipping a required file move (P207), a
missing CSS import causing a fully-unstyled deploy (P208), and a
Windows-specific patch required for `@opennextjs/aws` v0.3.x (backslash
path literals breaking on Windows builds). **This debugging history is
itself a reusable technical asset** — the next Next.js-on-Workers
migration doesn't have to rediscover any of these.

**D1 scaling limit discovered and fixed in production**: D1 enforces a
~100-bound-parameter limit per SQL statement; an `IN (...)` query bound
one parameter per active job and broke at ~100 concurrent jobs (P231).
Fixed with a chunking helper (`allByJobIds`, chunks at 90). Directly
relevant to any future product using D1 at meaningful scale — a specific,
concrete limit worth knowing before hitting it blind.

**R2 object storage integration** for photo capture/serving
(`cutting-photos/<session>/…`), authenticated streaming serve route — a
working pattern for file attachments beyond the base64-in-D1 approach
`AGENTS.md` documents as the platform's default for small files.

---

## Repeated architectural patterns found

**A "strangler fig" modernization pattern, live and in progress**: the
platform's stated architecture is deliberately anti-framework (vanilla
HTML/JS, explicitly "Do NOT introduce React" per `AGENTS.md` §1) — but a
scoped React/Next.js pilot ("Cutting v2") is being built in parallel,
isolated under a `/v2` path prefix with its own deploy pipeline, alongside
the stable legacy system. This is a real, deliberate incremental-migration
pattern (prove a new stack on one bounded module before committing
platform-wide) — worth naming explicitly in `patterns.md` as a company
capability for any future "should we modernize this legacy piece"
decision, distinct from and more mature than a from-scratch rewrite.

**A more disciplined version of the "per-project decisions log" pattern**
already found 3× in the prior Recon pass (`lights-out`, `tiny-world`,
`RadialNest`): this repo's `Prompts/`, numbered sequentially, each with an
explicit "what NOT to touch" section, a completion checklist, and a
"Notify Steve" section for required manual steps — paired with a strict
`CHANGELOG.md`/`BACKLOG.md` discipline (`AGENTS.md` §10: "add a CHANGELOG
entry keyed to the prompt number... remove the completed item from
BACKLOG.md... as part of the same change"). This is the most mature,
production-tested version of a pattern this session's HQ design already
independently arrived at (`Deployments/{mission}/brief.md`,
`Deployments/{mission}/debrief.md`) — worth comparing directly when HQ's
own Deployment templates get their first real exercise, not just filing
as a curiosity.

**Server-side recomputation of client-submitted calculations** — the
block-nesting save route explicitly "recomputes authoritatively" server-
side rather than trusting client math (P228 changelog entry: "never
trusts client math"). A real integrity/security pattern worth carrying
into any future product doing client-side computation with server
persistence.

**A project-level constitution predating and independently converging
with HQ's own design** — `AGENTS.md` is functionally a project-scoped
constitution: explicit scope guardrails ("established, treat as stable"
vs. "intentionally not yet built, do not add unless requested"), tracked
technical debt with an explicit "don't fix unless asked" framing, and a
strict implementation order. This wasn't built with HQ in mind — it
predates this session's V2 architecture — and independently arrived at
very similar governance instincts (documented boundaries, explicit
non-goals, scoped change discipline). Worth reading directly the next time
HQ's own Debrief/Deployment templates get revised, as a working reference
rather than a theoretical design.

---

## Unfinished work found

The React "Cutting v2" pilot is mid-migration — one module ported
(Manufacturing/Cutting), the rest of the platform (Jobs, Logistics, QC,
Safety, Admin, Reports) still on the legacy vanilla stack, no stated
timeline for further modules. A native scrap-tracking database is
referenced repeatedly as a blocker ("first-pass yield still deferred,
blocked on native scrap DB") — appears to be planned but not started.
Customer master record is explicitly "planned but not yet scoped"
(`AGENTS.md` §6). Notifications (email/SMS) and a notifications bell UI
are deferred by explicit design choice, not oversight.

## Abandoned opportunities found

None found — this reads as a live, continuously and recently developed
system (`CHANGELOG.md` last touched 2026-07-16, the day before this Recon
pass), not a stalled or abandoned one.

---

## Recommended Company Intelligence updates

- `engines.md`: add the kerf-aware bin-packing/nesting engine as a
  flagship entry — highest generalizable value found across both Recon
  passes. Add the BOL/PDF coordinate-rendering pattern and the packing-
  slip parser (cross-reference: third real example of the document-
  automation opportunity category, alongside `pdf-tools`/`packslip-pro`).
- `patterns.md`: add the "strangler fig" incremental-modernization
  pattern (live example: Cutting v2 under `/v2`); add "server-side
  recomputation of client math" as a security/integrity pattern; note the
  Next.js-on-Workers-via-OpenNext gotchas as a named, reusable debugging
  reference (basePath/assetPrefix, the idempotency-guard cache bug, the
  Windows `@opennextjs/aws` patch); flag `AGENTS.md`'s own governance
  design as worth reading directly against HQ's Deployment templates.
- `technical-assets.md`: first real entries — D1's ~100-bound-parameter
  limit (concrete, specific, worth knowing before hitting it blind); R2
  photo-storage integration pattern.
- `products.md`: xpanda-ops-platform itself — real, production, actively
  used daily, per its own docs and 581-entry commit history. **Flag the
  open ownership/relationship question (is this the founder's own
  business or client work?) for the founder to answer directly** — this
  materially changes how it should be framed relative to the $5,000/mo
  target, the same category of open question `projectstack` raised in the
  prior pass.
- **Correction, not an addition:** the `.agents/skills/` content initially
  looked like a match for the Obsidian vault's ~17 skills — it is not
  company-authored (sourced from `Leonxlnx/taste-skill` via
  `skills-lock.json`). Do not file as company IP. The lockfile mechanism
  itself is a minor pattern worth one line in `patterns.md`, not the
  skill content.
