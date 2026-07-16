# Company Architecture V2 — Headquarters

**Author:** CEO persona, per `HQ/Executives/agent-ceo.md`
**Date:** 2026-07-16
**Status:** Approved and partially implemented — §13 steps 1-4 are done
(Obsidian-tied tooling archived, Librarian rewritten, HQ/Executives live,
Company Intelligence skeleton seeded). Steps 5-9 (a real Deployment,
Debrief, Folder Dive, compaction, tooling decision) are still ahead — see
`HQ/CompanyIntelligence/strategic-direction.md` for current status.
**Supersedes:** V1's Tauri desktop harness (`Archive/harness-v1/`, archived this session)

---

## 0. Read this first — four tensions the directive doesn't resolve on its own

The mission directive asks for things that pull against each other. A design
that just complies with every line item without naming these conflicts would
be a worse document than one that stops and resolves them. As CEO, that's
exactly the kind of unexamined assumption I'm supposed to challenge, not
inherit quietly.

**1. "Deployment copies only the required executives" vs. "less duplication,
lower tokens."** Literally copying full executive files per mission *is*
duplication — the more missions run, the more forked copies of "cto" exist,
each capable of drifting from HQ and from each other. §3 resolves this:
deployment is by **reference + delta**, not by file copy. A mission gets a
thin roster pointer (which executive, which HQ version, what's different for
this mission) — not a duplicated agent definition.

**2. "Every project leaves the company smarter" vs. "minimize context."**
Unbounded institutional learning is append-only growth; token minimization is
the opposite force. This is the same failure mode already logged against V1
("watch Memories/ growth... the fix is tightening the prompt or adding a
manual override, not re-architecting" — `project_agent_harness` memory,
Phase 7). §6 makes curation and periodic compaction a named, recurring
responsibility, not an afterthought — Company Intelligence is not an
append-only log.

**3. Debrief's "which lessons should Headquarters inherit" is a write path
into the single source of truth.** V1 deliberately never auto-wrote agent
definitions (the Hire Agent workflow's draft output required a manual save,
by design). Auto-applying debrief lessons to HQ would quietly reverse that
decision. §5 makes inheritance a **reviewed, gated** step — the debrief
*proposes*, it never *commits*.

**4. Two vaults currently exist**, and the directive explicitly wants
Obsidian-independence. **Resolved by explicit user decision (2026-07-16):
the Obsidian vault is being scrapped outright**, not kept as a fallback or
personal-notes archive — "maintaining Obsidian is more work than it's
worth." This repo is now the sole filing system. §6 and §11 cover what that
means concretely: one Folder Dive extraction pass against the vault's real
content before it's retired (so the 13 projects/17 skills of actual history
aren't just lost), then no further dependency on it at all — not even as an
optional fallback.

**5. The Librarian's current identity is Obsidian-shaped and doesn't survive
this decision as-is.** `agent-librarian.md` today says "maintain the
Obsidian vault structure" in its own Identity line and its whole Vault
Convention section is an Obsidian folder tree. Retiring Obsidian without
rewriting Librarian would leave the one agent most responsible for filing-
system hygiene describing a system that no longer exists. §5, §7, and §11
below treat this as required, not optional — Librarian becomes the owner of
*this* repo's filing system (HQ structure, the INDEX described in §6, and
the Debrief/Folder Dive intake gate), which is a promotion in scope, not a
demotion from losing Obsidian.

---

## 1. Complete Company Architecture

Five components, each with one job:

```
Headquarters (HQ)        → single source of truth. Read-only during missions.
Company Intelligence     → the company's knowledge base. Lives inside HQ.
Deployments               → per-mission rosters + local memory. Reference HQ, never fork it.
Debrief                   → gated learning capture at mission end. Proposes, doesn't commit.
Folder Dive                → repo analysis that feeds Company Intelligence. Recommends, doesn't commit.
```

The load-bearing idea: **HQ is written to by exactly two gated processes**
(debrief inheritance, folder dive intake), both reviewed before they land,
never by a mission directly and never automatically. Everything else reads
HQ; nothing but those two gates writes it.

This is a markdown-and-git system, not an application. V1 spent eight phases
building a Tauri GUI around a dispatch loop that Claude Code already does
natively (the Agent tool, exactly as used for the Opportunity Court session
this design follows). V2 doesn't require a GUI to function — see §10 and
§13 on what a future UI would sit *on top of*, not what it blocks on.

---

## 2. Recommended Folder Structure

```
agent-bench/                          (this repo — becomes canonical HQ home, see §11)
├── HQ/
│   ├── INDEX.md                      (table of contents — read this first, see §6)
│   ├── Executives/
│   │   ├── _constitution.md          (Organizational Policies — unchanged from V1)
│   │   ├── agent-ceo.md
│   │   ├── agent-coo.md
│   │   ├── agent-cto.md
│   │   ├── agent-cfo.md
│   │   ├── agent-marketing.md
│   │   ├── agent-product.md
│   │   ├── agent-ux.md
│   │   ├── agent-security.md
│   │   ├── agent-qa-critic.md
│   │   ├── agent-ops.md
│   │   ├── agent-backend.md
│   │   ├── agent-frontend.md
│   │   ├── agent-content.md
│   │   ├── agent-ue-dev.md
│   │   ├── agent-zernio-mcp.md
│   │   ├── agent-librarian.md
│   │   └── _changelog/               (one file per agent — see §8)
│   │
│   ├── CompanyIntelligence/          (see §6 for full structure)
│   │   ├── briefing.md               (compact digest — what actually gets read per dispatch)
│   │   ├── founder-profile.md
│   │   ├── company-thesis.md
│   │   ├── strategic-direction.md
│   │   ├── capabilities.md
│   │   ├── products.md
│   │   ├── engines.md
│   │   ├── components.md
│   │   ├── technical-assets.md
│   │   ├── knowledge-domains.md
│   │   ├── patterns.md
│   │   ├── lessons/                  (curated, compacted — not append-only)
│   │   ├── project-history.md
│   │   ├── failure-history.md
│   │   └── success-history.md
│   │
│   └── Skills/                       (generic, reusable — mirrors the 17 in the Obsidian vault)
│
├── Deployments/
│   └── {mission-slug}/
│       ├── roster.md                 (which executives, which HQ version, mission overlay — see §4)
│       ├── brief.md                  (Mission Brief/Objectives/Success Metrics/Constraints/Required Skills)
│       ├── memories/{agent}.md       (mission-local only — never auto-merges to HQ)
│       └── debrief.md                (written at mission close — see §5)
│
├── FolderDives/
│   └── {repo-slug}-{date}.md         (recommendations only — see §7)
│
├── Archive/
│   ├── harness-v1/                   (V1, archived this session)
│   └── Memories/                     (pre-V2 memory, untouched)
│
└── project_files/                    (planning docs — this file lives here until approved)
```

---

## 3. Deployment Workflow — reference, not copy

A deployment does **not** duplicate executive files. It creates a thin
pointer + delta:

```markdown
# Deployment: empire-street-milestone-a
## Roster
| Executive | HQ Version Pinned | Mission Overlay |
|-----------|-------------------|------------------|
| cto       | v3                | Reuse Pop Race's needsRoll/applyRoll pattern — don't invent a parallel mechanism |
| frontend  | v5                | Trademark-safe naming per naming.md: House→Tower, Hotel→Skyscraper |
| qa-critic | v2                | Live-play gate required before commit, not static checks alone |
```

**Field agents "evolve during the mission"** by writing to their own
`Deployments/{mission}/memories/{agent}.md` — mission-scoped notes,
discoveries, and corrections that shape how they operate for the rest of
*this* mission. This is real evolution (the agent behaves differently by
mission's end than at mission start) without ever forking the HQ file. The
canonical `HQ/Executives/agent-cto.md` is unchanged and unchangeable by the
mission itself.

**Workflow:**
1. CEO reads the mission ask, selects the roster (same routing logic as
   today's `agent-ceo.md`).
2. CEO writes `roster.md` (pin HQ versions, note mission-specific overlay —
   short, a paragraph per executive, not a restatement of their whole file).
3. CEO writes `brief.md` — excerpts pulled from `CompanyIntelligence/`, not
   full copies (Founder Context = a link + the 2-3 lines that actually apply,
   not the whole founder-profile.md).
4. Each dispatch assembles context as: HQ executive definition (pinned
   version) + this mission's overlay + this mission's own memories +
   `briefing.md` (compact) — the same "assemble, don't duplicate" pattern
   `agent-ceo.md`'s Step 4 already uses today, just now versioned and
   mission-scoped.
5. Mission runs. Memories accumulate locally.
6. Mission closes → Debrief (§5).

---

## 4. Field Operations

Every deployment's `brief.md` carries: Executive Team (the roster from §3),
Mission Objectives, Success Metrics, Constraints, Required Skills, a Company
Context excerpt, and a Founder Context excerpt. All four "context" fields are
**excerpts with a pointer back to the source**, not copies — an executive
that needs more than the excerpt reads the source file directly (it's in the
same repo); the excerpt exists to keep the common case cheap, not to be the
only copy of the truth.

Field agents collaborate the same way the Opportunity Court board just did:
independent reasoning, no rubber-stamping, disagreement resolved by the CEO
reasoning through it rather than averaging — this is already written into
`agent-ceo.md`'s Board Convening section and the Global Constitution's Rule
8. Nothing new needed here; V2 reuses it.

---

## 5. Agent Debrief — gated, not automatic

At mission completion, every deployed executive answers the eight questions
from the directive, written into `Deployments/{mission}/debrief.md`:

```markdown
## Debrief: {agent} — {mission}
- What did I learn?
- What mistakes occurred?
- What assumptions changed?
- Which improvements should Headquarters inherit? [HQ-CANDIDATE]
- Which improvements are project-specific? [LOCAL-ONLY]
- Which reasoning became stronger?
- Which reasoning became weaker?
- If Headquarters inherited only ONE lesson, what should it be? [HEADLINE]
```

**The gate:** `[HQ-CANDIDATE]` and `[HEADLINE]` items are *proposals*, not
commits. They sit in `debrief.md` until a review step promotes them:

1. **Librarian pre-screens** (this is now Librarian's central job, not a
   side duty — see §0 tension 5 and §11) — checks a candidate lesson isn't a
   duplicate of something HQ already knows, doesn't contradict the Global
   Constitution, and is phrased as a durable rule rather than a one-off war
   story.
2. **CEO or the user approves** the promotion explicitly — the same standard
   V1 held for Hire Agent's draft output ("creating a new agent definition
   file... should go through explicit user confirmation... not get silently
   saved" — `project_agent_harness` memory, Phase 8). Debrief inheritance is
   the same category of action and gets the same treatment.
3. Only then does the lesson get written into the relevant `HQ/Executives/`
   file (as a dated addition, see §8) or `CompanyIntelligence/lessons/` —
   **and Librarian updates `INDEX.md`'s one-line entry for whatever changed**
   in the same pass, so the index never drifts from what it's indexing (§6).

This directly answers Tension 3 from §0: the write path into the source of
truth is real, but it is never silent and never automatic.

---

## 6. Company Intelligence — replaces the Obsidian dependency

Two tiers, not one — this is what resolves Tension 2 (learning vs. tokens):

**Tier 1 — source files** (`CompanyIntelligence/*.md`, minus `briefing.md`):
the full record. Founder Profile, Company Thesis, Capabilities, Products,
Engines, Components, Technical Assets, Knowledge Domains, Patterns, Project
History, Failure History, Success History, Strategic Direction. Read in full
only when an executive genuinely needs the detail (a `cto` verifying reuse
potential, a Folder Dive pass).

**Tier 2 — `briefing.md`**: a compact, curated digest — the actual document
"read before executive meetings," per the directive. Capped in length by
design (a target size, not a hard rule to be gamed). Regenerated
periodically by a **compaction pass**, not appended to indefinitely:

- New entries land in Tier 1 first (via the gated debrief/folder-dive intake).
- On a cadence (every N missions, or on request), the librarian re-derives
  `briefing.md` from current Tier 1 state — superseded lessons drop out,
  patterns that recurred across missions get promoted to a single stronger
  statement instead of three redundant ones.
- This is explicitly **not** an append-only lessons log. An append-only log
  is the anti-pattern already flagged in project memory; compaction is the
  fix, made structural instead of hoped-for.

`lessons/` under Tier 1 is itself organized by domain (not one giant file)
so compaction can work on one slice at a time without re-reading everything.

**Tier 0 — `HQ/INDEX.md`: the table of contents.** Added per explicit user
request — the thing an agent reads *before* deciding whether it even needs
`briefing.md` or a Tier 1 file. Pure navigation, no substance of its own:

```markdown
# HQ Index — read this first

## Executives (HQ/Executives/)
| File | Role | Version | Updated |
|------|------|---------|---------|
| agent-cto.md | Portfolio technical feasibility & architecture risk | v1 | 2026-07-16 |
| agent-cfo.md | Portfolio financial modeling & revenue discipline | v1 | 2026-07-16 |
| ... | | | |

## Company Intelligence (HQ/CompanyIntelligence/)
| File | Contains | Last compacted |
|------|----------|------------------|
| founder-profile.md | Who the founder is, strengths, constraints | 2026-07-16 |
| engines.md | Reusable technical engines identified so far | — (empty, pending first Folder Dive) |
| ... | | |

## Recently changed
- 2026-07-16 — briefing.md regenerated (compaction pass #1)
```

Three-tier escalation, cheapest first: **INDEX** (one line per file — is this
file even relevant?) → **briefing.md** (curated substance — do I have enough
without going deeper?) → **Tier 1 source** (full detail — only when the
first two aren't enough). Most dispatches stop at tier 0 or 1.

**No new metadata format required.** Every `HQ/Executives/agent-*.md` file
already opens with a `# Agent: {name}` / `# Role: {one line}` header — that
existing convention *is* the self-description INDEX rows are built from.
§8 extends that same header with `# Version:` and `# Last Updated:` lines
instead of introducing YAML frontmatter or a second format to keep in sync —
one convention, reused, not a parallel one invented for this (the same
"don't over-engineer" discipline §12 risk 7 already commits to).
`CompanyIntelligence/*.md` files get an equivalent one-line header for the
same reason.

**Ownership:** Librarian regenerates `INDEX.md` in the same pass as any
gated promotion (§5, §7) and the periodic compaction pass above — one owner,
one cadence, not a separate index-maintenance task competing for attention.

**Opportunity Court, updated:** per the directive, it no longer inspects
repositories directly. It reads `briefing.md` + `founder-profile.md` +
`company-thesis.md` + the current mission's brief and constraints. A Folder
Dive (§7) is what earns a repository's contents a place in Company
Intelligence in the first place — Opportunity Court then reads the distilled
result, not the raw repo. This is the token-usage win the directive asks for,
made concrete.

---

## 7. Folder Dive

A `cto`-led operation (reuse assessment is already `cto`'s Core
Responsibility — no new agent needed, consistent with keeping the roster
modular rather than growing an 8th board seat for every operation):

**Input:** a target repository (an existing project, or the OneDrive
Obsidian vault's `Projects/` entries during migration — see §11).

**Process:**
1. `cto` reads the repo (code, docs, commit history where relevant) —
   technical judgment: is this actually reusable, or does it just look like it.
2. Extract: reusable engines, reusable components, technical capabilities,
   repeated architectural patterns, unfinished work, abandoned opportunities.
3. Cross-check against current Company Intelligence — is this actually new,
   or does it confirm/contradict something already recorded? This step is
   Librarian's, not `cto`'s — filing judgment (where does this go, does it
   duplicate an existing entry) is a different skill than technical
   extraction, same division of labor as Debrief's gate (§5).
4. Write `FolderDives/{repo-slug}-{date}.md`: findings + **recommended**
   Company Intelligence updates. Recommendations only.

**The gate is identical to Debrief's:** a Folder Dive report never writes
`CompanyIntelligence/` directly. Librarian pre-screens, CEO/user approves,
then it lands — same reviewers, same standard, one shared gate mechanism
instead of two different ones to maintain.

---

## 8. Agent Lifecycle

Per §6's "no new metadata format" decision, each `HQ/Executives/agent-{name}.md`
extends its existing comment header instead of gaining a separate
frontmatter block:

```
# Agent: cto
# Role: Chief Technology Officer — Portfolio Technical Feasibility & Architecture Risk
# Stack: N/A — advisory, no codebase ownership
# API: Claude (default)
# Harness: CEO-Linked Agent System — harness-level, not project-scoped
# Version: 3
# Last Updated: 2026-07-14
# Deployments: tapin-onboarding-redesign, empire-street-milestone-a, ...
# Track Record: strengthened — reuse-verification discipline (3 missions);
#   weakened — initial build-hour estimates (consistently 20-30% low)
# Specialties: Cloudflare Workers architecture, monorepo reuse assessment
```

- **`Version`** bumps only on a gated debrief/folder-dive promotion (§5, §7)
  — never on a routine edit.
- **`Deployments`** is an append-only list of mission slugs — cheap, and it's
  the audit trail, not the knowledge itself.
- **`_changelog/{agent}.md`** holds one entry per version bump: what changed,
  which mission's debrief triggered it, one line.
- **`Track Record`** and **`Specialties`** are the "evolve like an
  experienced executive" part of the directive — updated only through the
  same gate, so an executive's stated track record is always something a
  human actually reviewed, not something it wrote about itself.
- These same header lines are exactly what `INDEX.md` (§6) reads to build
  its Executives table — one source, no duplicate bookkeeping.

---

## 9. Executive Governance

Mostly already written — V2 codifies what the Opportunity Court session
already demonstrated working, rather than inventing new rules:

- **Equal authority, no rubber-stamping** — Global Constitution Rule 8, and
  the Board Convening section already in `agent-ceo.md`.
- **Evidence changes decisions** — an executive that reverses a position
  when shown evidence (as QA Director did in Round 10 of the Opportunity
  Court transcript) is functioning correctly, not being inconsistent.
- **Assumptions are challenged** by the CEO's existing Rejection &
  Decomposition Authority, extended: a mission with no verification
  checkpoint until the end is a decompose trigger (already added this
  session); a mission proposal with no evidence behind a claimed opportunity
  is a reject trigger.
- **Final decisions**: CEO reasons through disagreement rather than
  averaging opinions (demonstrated in the Opportunity Court's Final
  Deliberation) — codify this explicitly as the decision rule, not just a
  pattern that happened once.
- **Project approval**: a mission does not deploy on an opportunity with no
  real evidence behind it (Global Constitution Rule 1, `coo`'s Automatic
  Rejections) or with no rollback/verification plan for its first milestone
  (extension of `ops`'s Deploy Doctrine to the mission level). The user gives
  final go/no-go on any mission that commits real engineering hours —
  engineering time is capital, per the directive's own framing, and
  spending capital is not an agent-level decision.

---

## 10. Token Efficiency — how the design actually delivers on this

This isn't a separate section bolted on to satisfy the directive; it's the
consequence of §3 and §6 done correctly:

- Deployment by reference (§3) means N missions never produce N copies of an
  executive — one canonical file, always.
- Two-tier Company Intelligence (§6) means most dispatches read a capped
  `briefing.md`, not the full knowledge base.
- Gated writes (§5, §7) mean HQ grows by curated promotion, not by every
  mission's raw output landing in the source of truth.
- No GUI/SQLite/Task-Board layer to keep in sync with the markdown source of
  truth — V1's dispatch-persistence code (Phases 5-6) existed to make an
  in-memory UI durable; a markdown+git system is durable by construction and
  needs none of it.

---

## 11. Migration Plan from Version 1

**Done, 2026-07-16 (carried forward as-is, content unchanged except noted):**
- All 17 `agent-*.md` files (the original roster plus `coo/cto/cfo/marketing/
  product/ux/security` built this session) → `HQ/Executives/`, each header
  extended with `Version`/`Last Updated`/`Deployments` lines (§8 — a header
  extension, not a separate frontmatter block, per §6's "no new metadata
  format" decision).
- `_constitution.md` → `HQ/Executives/_constitution.md`, with its Vault-First
  rule, Record-What-You-Learn rule, and Tool Access rule rewritten for the
  new paths and the open dispatch-mechanism question (not left stale).
- `_tool-registry.md` → **archived**, not carried into HQ
  (`Archive/v1-tooling/_tool-registry.md`). It existed solely to work
  around a self-inflicted V1 problem: spawning `claude -p` as a cold
  subprocess from Tauri has no permission-dialog surface, so tools needed an
  explicit allowlist. If V2's dispatch path is Claude Code's own Agent tool
  (as used for the coo/cto/etc. board this session) rather than a spawned
  CLI subprocess, that problem doesn't exist and this file becomes
  unnecessary — that's the working assumption archiving it acted on.
  **If a future dispatch mechanism turns out to need it after all,
  un-archive it rather than rewrite it from scratch — its content is still
  correct for that scenario, just currently inapplicable.**

**Done, 2026-07-16:**
- `HQ/INDEX.md` generated for the first time, `CompanyIntelligence/`
  seeded (`founder-profile.md`, `company-thesis.md`, `strategic-direction.md`,
  `capabilities.md`, `project-history.md`, `success-history.md`,
  `failure-history.md` populated with real, sourced content; `products.md`,
  `engines.md`, `components.md`, `technical-assets.md`,
  `knowledge-domains.md`, `patterns.md`, `lessons/` left empty on purpose,
  pending Folder Dive/Debrief).
- V1's Obsidian-tied tooling (`ceo.py`, `obsidian_scraper.py`, both `.bat`
  wrappers) archived to `Archive/v1-tooling/`.
- V1's `Memories/` and `.ceo-logs/` moved under `Archive/` — not migrated
  into the new structure, per the "left behind" list below. Two genuinely
  reusable items were pulled forward before archiving rather than lost:
  a dormant, never-approved "investor agent" proposal
  (`CompanyIntelligence/project-history.md`) and a real lesson about a
  stale memory becoming self-reinforcing (`CompanyIntelligence/failure-history.md`).
- The empty `Projects/{general,tapin,tiny-world}/` placeholder tree (V1's
  scaffold convention, no content in it) was deleted rather than migrated
  — `Deployments/` replaces that convention outright.

**Still requires a real pass, not yet done:**
- **Decided (2026-07-16): the Obsidian vault is being scrapped, full stop**
  — not kept as a fallback, not preserved as personal notes. This repo is
  the only filing system going forward.
- Before it's retired, run a Folder Dive (§7) against each `Projects/` entry
  (13 real projects) to extract what's reusable into `CompanyIntelligence/`.
  This is real work, not a checkbox — budget it as its own set of missions,
  not a single afternoon. Anything not extracted before retirement is lost;
  treat that as a real deadline, not a someday task.
- `Skills/` (17, already curated as generic/reusable per the 2026-07-01
  librarian reorg) → `HQ/Skills/`, likely closer to a direct copy since
  they were already vetted for genericness — verify each is still current
  before moving, don't assume 14-day-old memory is still accurate. Until
  that pass runs, `HQ/Skills/` starts empty rather than guessed-at.
- **Librarian gets rewritten as part of this migration, not after it**
  (§0 tension 5) — its Identity and Vault Convention sections currently
  describe Obsidian specifically; both need to describe `HQ/` instead
  before Librarian can credibly own the INDEX (§6) or gate promotions (§5, §7).
- **V1's Obsidian-tied tooling is archived, not migrated:** `Agents/ceo.py`
  (a pre-Claude-Code prompt assembler that pastes into Cline, hardcoded to
  the OneDrive vault path), `Agents/obsidian_scraper.py` (scrapes *into*
  Obsidian format), and their `.bat` wrappers. All three exist to serve a
  vault that no longer exists — archive alongside `harness-v1/`, don't carry
  forward.

**Explicitly left behind, not migrated:**
- The Tauri/React/SQLite application itself (`Archive/harness-v1/`) — stays
  archived. See §13 for what a future UI would look like if rebuilt.
- The Hire Agent workflow's specific code (`hireAgent()` in `harness.ts`) —
  the *concept* (research → draft → qa-critic review → manual save) survives
  as a Deployment pattern; the specific TS implementation doesn't need to.
- `.ceo-logs/*.json` — V1's audit trail format. Deployments/{mission}/ now
  serves that purpose with more structure; the old JSON logs can stay in
  `Archive/` as history, not migrated into the new structure.

**Verification before this plan executes:** the OneDrive vault's actual
current state should be re-checked directly (not trusted from memory) before
any Folder Dive pass against it — the reorg memory is 14 days old and this
document treats it as directional context, not fact.

---

## 12. Risks

1. **Duplication creep despite the reference model.** §3's roster.md
   pattern only works if it's actually followed — the failure mode is
   someone (agent or user, under time pressure) pasting a full executive
   definition into a mission folder "just this once." Mitigate by making
   the roster template short enough that copying is more work than
   referencing.
2. **Company Intelligence bloat if compaction is skipped.** The two-tier
   design (§6) only delivers token savings if the compaction pass actually
   runs on a cadence. An unmaintained `briefing.md` that just grows is the
   same failure this design exists to prevent.
3. **The gate becomes a bottleneck.** If the user is the only approver for
   every debrief/folder-dive promotion, and missions run frequently, review
   load could stall inheritance entirely. Librarian pre-screening (§5, §7)
   exists specifically to reduce what reaches the user to real candidates,
   not raw output — watch whether that's enough in practice.
4. **Version drift on long missions.** A mission pinned to `cto v3` that
   runs for weeks while HQ moves to `v5` needs an explicit policy: does the
   mission re-pin, or finish on the pinned version? Not resolved here —
   flag as an open implementation decision, not silently defaulted.
5. **Data loss risk in the OneDrive vault migration.** Real project history
   (13 projects) lives somewhere Folder Dive hasn't touched yet. Treat
   extraction as a careful, verified pass, not a fast one.
6. **Losing V1's visual dispatch/task-board UX** if that mattered to actual
   daily usage, not just to the architecture. Worth an explicit check-in
   after a few real V2 missions: is markdown+CLI sufficient, or is a viewer
   genuinely missed.
7. **This document itself over-engineering the redesign.** The directive
   asked for a first-principles redesign, and thirteen deliverables is a lot
   of surface area — the implementation order in §13 exists specifically so
   this doesn't become an unfinished eight-phase GUI's spiritual successor.
   Ship §1-§6 before touching §7 onward.

---

## 13. Recommended Implementation Order

1. **Archive V1's Obsidian-tied tooling** (`ceo.py`, `obsidian_scraper.py`,
   both `.bat` wrappers) alongside `harness-v1/` — clears the deck before
   anything new is built on top of it.
2. **Rewrite Librarian** for the HQ filing system (§0 tension 5, §11) —
   this has to happen before step 3, since Librarian owns the INDEX that
   step 3 creates.
3. **HQ/Executives migration** — move the 16 agent files into
   `HQ/Executives/`, extend each header with `Version`/`Last Updated`
   (§8), archive `_tool-registry.md` per §11's recommendation, update
   cross-reference paths.
4. **Company Intelligence skeleton** — create the folder structure, seed
   `founder-profile.md`, `company-thesis.md`, `strategic-direction.md` from
   what's already known (this conversation, project memory, the Opportunity
   Court's Founder Profile), generate `HQ/INDEX.md` for the first time.
   Empty stubs (not invented content) for the rest — Products, Engines,
   Components, Technical Assets, Patterns, the three History files — until
   a real Deployment or Folder Dive populates them.
5. **One real Deployment, by hand** — pick a small, real, already-planned
   piece of work and run it through `roster.md` + `brief.md` +
   mission-local memories, without building any tooling first. Prove the
   pattern manually before automating anything.
6. **Debrief that one deployment** — write the actual `debrief.md`, run it
   through the gate, promote exactly one real lesson. This validates §5 and
   §8 together with real content, not a hypothetical.
7. **First Folder Dive against the Obsidian vault** — before it's retired
   (§11), one real project, cto-led + Librarian-filed, producing one real
   recommendation set, reviewed and partially promoted. Repeat for the
   remaining 12 projects and 17 skills before considering the vault safe to
   stop maintaining.
8. **Compaction pass #1** — once Tier 1 has real content from steps 5-7,
   generate `briefing.md` for the first time and check its size against the
   token-efficiency goal in §10.
9. **Only then**, decide whether any tooling (a dispatch script, a viewer, a
   revived UI) is worth building — informed by what steps 5-8 actually felt
   like to run by hand, not by pre-guessing what a Phase 9/10 backlog needs.

---

## 14. Future Expansion Opportunities

- A read-only Company Intelligence viewer — deferred until §13 step 7,
  and if built, salvaged from `Archive/harness-v1/`'s existing
  `ExplorerPanel`/`FilePanel` components rather than rebuilt from scratch.
- Cross-mission pattern detection — if three missions independently hit the
  same architecture risk, that's a stronger signal than any one debrief;
  worth automating the *detection* (not the promotion — the gate stays)
  once enough real mission history exists to detect anything.
- Scheduled Folder Dive sweeps across the full OneDrive vault's 13 projects,
  once the manual first pass (§13 step 5) has validated the report format.
- Channel connectors (Discord/Telegram) — already in V1's deferred backlog
  (Phase 9); still a reasonable later layer on top of a stable HQ, not
  before one exists.
- The "Project Xyril" rebrand (already flagged in project memory as
  deferred until the architecture stabilizes) — Headquarters is arguably the
  more fitting moment for that identity work than V1 ever reached.

---

## Confidence

**High** — the executive roster, governance patterns, and constitution this
design builds on are read directly from the current repo state, not
recalled from memory. **Medium** — the OneDrive Obsidian vault's exact
current contents (§6, §11 migration scope) rely on a 14-day-old memory
record and need direct verification before that part of the plan executes.
**Low, flagged explicitly rather than guessed at** — version-drift policy
(§12, risk 4) and whether V1's UI is actually missed in practice (§12, risk
6) are open questions this document doesn't resolve, on purpose, rather than
picking an answer with no evidence behind it.

---

## Status

Approved 2026-07-16, with two additions folded in before implementation:
full Obsidian retirement (not kept as a fallback) and the `HQ/INDEX.md`
table-of-contents pattern (§6). §13 steps 1-4 are done — see the top of
this document and §11's "Done, 2026-07-16" list for exactly what changed.

**What's next (§13 steps 5-9, none started):** a real Deployment run by
hand through `Deployments/`, its Debrief, a real Folder Dive against the
Obsidian vault before it's fully retired, the first compaction pass once
there's real content to compact, and only then a decision on whether any
tooling is worth rebuilding.
