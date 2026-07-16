# Agent Harness Architecture Review — 2026-07-06

CEO-led architectural review of every agent definition in the harness, per
explicit user request. Scope: `Agents/*.md` and the minimal harness code
needed to make the changes actually take effect (not a rewrite of any
agent's identity, responsibilities, or tone).

---

## Changelog

### New files

- **`Agents/_constitution.md`** — shared global constitution. Holds every
  rule that was previously copy-pasted, near-verbatim, across all 9 agent
  files: the ERP Firewall refusal text, "read the vault before starting,"
  "identify yourself," "update the vault after." Also adds four rule sets
  that didn't exist anywhere before: anti-hallucination, confidence
  reporting, model-cost routing, and produces/consumes handoff framing.
  **Why:** objective 1 (remove duplication into a shared constitution) only
  works if the duplication is actually removed from the 9 files rather than
  just documented twice — see the injection fix below for why this is safe.

- **`Agents/agent-ops.md`** — new Release & Reliability agent. Owns
  deployment, environment/secrets rotation, monitoring, rollback, and
  incident response across projects.
  **Why (objective 13):** once backend and frontend were reframed as
  outcome-owners (data integrity/API reliability; UX quality) rather than
  stack-owners, it became visible that neither of them owns *whether the
  shipped thing is actually live and recoverable* — backend stops at schema/
  API correctness, frontend stops at "build is green." That's a real,
  previously-silent gap, not a role invented for its own sake. Scored against
  the same lean-org bar the Research Agent now applies to its own
  opportunities (objective 11): one new agent, not three.

### Harness code (minimal, required for the above to actually function)

- **`harness/src/engine/vault/connector.ts`** — added `loadConstitution()`
  to the `VaultConnector` interface.
- **`harness/src/engine/vault/direct.ts`** — implements `loadConstitution()`
  (reads `Agents/_constitution.md`); added `'ops'` to the hardcoded
  `listAgents()` fallback array.
- **`harness/src/engine/vault/mcp.ts`** — stubbed `loadConstitution()`
  consistent with the connector's other not-yet-implemented methods.
- **`harness/src/engine/ceo.ts`** (`assemblePrompt()`) — now loads and
  prepends the constitution as a `# Global Constitution` section before
  `# Agent Definition` in every dispatch.
  **Why this is not scope creep:** without this, stripping the ERP Firewall/
  vault/memory rules out of the 9 agent files and replacing them with "see
  the constitution" would have silently broken every dispatch — a cold
  `claude -p` subprocess never sees a file it wasn't handed, so a bare
  pointer to a file it never received is not a rule, it's a no-op. This was
  flagged explicitly before any agent file was touched, and is the one place
  vault content and app code are coupled (now documented as such in the
  Librarian's Constitution Health checklist).
- **`harness/src/components/AgentSidebar.tsx`**,
  **`harness/src/components/DispatchPanel.tsx`**,
  **`harness/src/store/harness.ts`** — added `ops` to the hardcoded agent
  roster lists so the new agent is actually selectable/dispatchable, not
  just a file sitting in `Agents/`.

### Edited: every existing agent definition

Applied consistently across `agent-ceo.md`, `agent-frontend.md`,
`agent-backend.md`, `agent-content.md`, `agent-qa-critic.md`,
`agent-research.md`, `agent-ue-dev.md`, `agent-zernio-mcp.md`,
`agent-librarian.md`:

- **ERP Firewall** sections trimmed from a full restated block + canned
  refusal quote to a one-line pointer at the Global Constitution's Rule 6.
  The refusal behavior is unchanged — the constitution is injected into
  every dispatch, so the agent still produces the refusal, it just isn't
  re-authoring the same paragraph nine times.
- **`## Always` sections** trimmed of the boilerplate now covered by the
  constitution ("read the vault first," "identify as the X agent," "update
  the vault after") with a one-line note that the constitution is injected
  automatically. Each agent's *actually agent-specific* Always items
  (time-boxing, build-green checks, testing SQL locally, etc.) were kept
  verbatim — nothing domain-specific was cut.
- **Confidence reporting** (objective 4) added to each agent's Deliverables
  Format / Review Format, tailored to what "High confidence" means in that
  domain (verified live URL for ops, playtested-in-editor for ue-dev, tested
  against a real Supabase instance for backend, etc.) rather than a generic
  copy-pasted line.
- **Anti-hallucination** (objective 5) is carried by the constitution for
  all agents; qa-critic additionally got a domain-specific line (no invented
  performance numbers without profiling) since fabricated benchmarks are its
  most likely failure mode.
- **Handoffs** (objective 9): backend, frontend, and content's dependency
  sections gained an explicit "produces / consumed by" line alongside their
  existing "coordinate with" tables, naming the actual artifact instead of
  just the relationship.

### Edited: technology ownership → outcome ownership (objective 3)

Identity sections reframed for **backend**, **frontend**, and **ue-dev** —
the three agents whose original Identity paragraph led with a stack list
rather than a reason to exist:

- backend: "you own data architecture/API design/auth" → "you own data
  integrity, secure access, and reliable APIs; Supabase/D1/Workers is the
  current implementation, not the point"
- frontend: "you handle visual layer work" → "you own the quality of the
  user-facing experience; React/Tailwind is the current implementation"
- ue-dev: "you design game systems, architect Blueprints" → "you own
  working, fun game systems that ship; UE5/Blueprints is the current
  implementation"

content, qa-critic, research, ceo, librarian, and zernio-mcp were already
outcome-framed in their original Identity paragraphs (content: "make them
sellable"; qa-critic: production risk; research: "actionable intelligence")
and were left as-is — this was a targeted fix for the three agents that
actually had the tech-ownership problem, not a rewrite of all nine.

### Edited: agent-research.md (objective 11)

- 5-Minute Triage gained two new questions: whether a realistic MVP ships in
  under 30 hours of solo-founder time, and whether the opportunity is
  workflow replacement (favored) or ecosystem replacement (flagged as a
  longer path, not disqualified).
- The Research Brief template gained an **Opportunity Scores** table:
  Escape Velocity (switching friction — low friction for the *user to leave
  their current tool* scores high), Solo Founder Feasibility, and a
  Workflow-vs-Ecosystem rating, with an explicit instruction that a
  large-TAM opportunity with a low score on either isn't a GO on market size
  alone.

### Edited: agent-ceo.md (objective 12)

- Core Responsibilities table gained **Reject** and **Decompose** rows.
- New **Rejection & Decomposition Authority** section: concrete criteria for
  when to reject a request outright (no realistic delivery path, expertise
  gap not worth hiring for, unjustified rebuild of existing vault work) vs.
  when to decompose one into milestones (multi-sitting scope, multi-agent
  bundling, framing that skips checkable intermediate steps), with a
  milestone-format template.
- Challenge Protocol triggers extended to include oversized bundled requests
  and requests with no realistic delivery path.

### Edited: agent-librarian.md

- Fixed the Vault Convention diagram, which listed `frontend.md`/`backend.md`
  etc. — the real files on disk are `agent-frontend.md`, matching what
  `listAgents()` in `direct.ts` actually globs for (`^agent-.+\.md$`). A file
  named without the `agent-` prefix is invisible to the roster, not just a
  style inconsistency — worth calling out explicitly since it's the kind of
  drift the Librarian exists to catch.
- Agent Definition Health checklist updated: explicitly exempts
  `_constitution.md` (no `# Agent:` header by design), adds a check for
  outcome-vs-tech Identity framing, and flags an agent restating a
  constitution rule verbatim as drift rather than thoroughness.
- New **Constitution Health** checklist: rule-number references still valid,
  no agent contradicts a constitution rule, and — because this is the one
  place vault content and app code are coupled — a reminder to verify
  `assemblePrompt()` in `harness/src/engine/ceo.ts` still performs the
  injection after any future refactor.
- Added `agent-ops.md` to the documented roster.

---

## Migration Summary

**What's new architecturally:**

1. A shared constitution (`Agents/_constitution.md`) is now injected into
   every dispatch by `assemblePrompt()`, ahead of the per-agent definition.
   This is the canonical source for: ERP Firewall, vault-first search,
   memory recording, anti-hallucination, confidence reporting, model-cost
   routing, and handoff framing. Individual agent files carry only what's
   actually specific to them, plus short pointers back to the constitution
   where a rule applies.

2. One new agent role, **ops** (Release & Reliability), fills the
   deploy/monitor/rollback/incident-response gap that fell out of reframing
   backend and frontend as outcome-owners. Wired into the CEO's routing
   table/keywords, the harness's hardcoded agent-roster lists (sidebar,
   dispatch panel, default store state), and the vault's `listAgents()`
   fallback.

3. The CEO gained explicit authority to reject unrealistic requests and to
   decompose oversized ones into milestones, rather than always routing
   whatever it's handed (objective 12).

4. The Research Agent's opportunity scoring now includes Escape Velocity,
   Solo Founder Feasibility, a sub-30-hour MVP filter, and a workflow-vs-
   ecosystem preference (objective 11).

**Verification performed:**

- Confirmed the injection point exists and works structurally by reading
  `assemblePrompt()` before and after the edit — the constitution string is
  now unconditionally prepended when non-empty, with no change to the
  existing firewall-check/challenge-detection/prompt-shape logic.
- Confirmed the actual on-disk naming convention (`agent-{name}.md`) against
  `direct.ts`'s `listAgents()` regex before correcting the Librarian's
  documented convention, rather than assuming which one was stale.
- Did not run the Tauri app end-to-end (this was a documentation/definition
  review, not a feature build) — the Librarian pass below is a checklist
  audit of the files as written, not a live dispatch test. Recommend a real
  test dispatch (per the harness's own Phase 5-7 lesson in project memory:
  compile-clean claims weren't trustworthy until an actual dispatch caught a
  real bug) before treating this migration as fully verified in practice.

**Confidence:** Medium-High — every file edit was read back in context
before and after; the code changes are small and mechanically verified by
inspection. Not High: no live dispatch was run through the harness to
confirm the constitution actually renders correctly inside a real
`claude -p` prompt end-to-end.

**Out of scope, deliberately not touched:**

- The `hireAgent()` workflow chain in `harness/src/store/harness.ts`
  (Phase 8, marked "genuinely UNTESTED" in project memory) — its drafting
  prompts could reference the new constitution/outcome-ownership convention,
  but that chain is mid-flight, unverified, unrelated to this review's scope,
  and editing it further risked compounding an already-uncommitted, already
  large diff.
- The OneDrive Obsidian vault (`C:\Users\scook\OneDrive\Documents\Obsidian
  Vault`) — a separate vault instance per project memory; this review only
  touched the harness's own working vault at `.dev\agent-bench\Agents\`.
