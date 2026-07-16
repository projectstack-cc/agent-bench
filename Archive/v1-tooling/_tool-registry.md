# Tool Registry — Zer0Flaw Agent Harness

Not itself an agent. Excluded from the Librarian's `# Agent: {name}` health
audit, same as `_constitution.md`.

## Why this exists

Every dispatch runs as a cold, non-interactive `claude -p` subprocess — there
is no terminal for a permission dialog, so any tool needing one (WebSearch,
WebFetch, Edit, Write, Bash) is silently denied unless explicitly allowlisted
via `--allowedTools`. Until now that allowlist was a single hardcoded list
shared by every agent regardless of role, which meant a reviewer (qa-critic)
had Write/Edit access to the code it was supposed to only critique.

**This is enforced in code, not by agents reading this file.** A subprocess
never sees a file it wasn't handed — same coupling the Global Constitution's
injection has with `assemblePrompt()`. The source of truth is
`harness/src/engine/executor/tool-registry.ts` (`AGENT_TOOLS`); this file
mirrors it for humans and for agents reasoning about their own scope. If you
change one, change the other — the Librarian's Constitution Health checklist
now checks both stay in sync.

## Registry

**Baseline** (every agent not listed below, including any future/unlisted
one): `WebSearch, WebFetch, Read, Grep, Glob, Edit, Write, Bash` — the same
full grant every agent had before this registry existed. WebSearch/WebFetch
were added to that baseline deliberately (see Phase 5-7 verification in
project memory) to fix an earlier silent-denial bug; this registry does not
re-narrow that baseline per agent from an inferred "probably doesn't need
X" — that guess is exactly the failure mode (silent tool denial, not an
error) that caused the original bug. It only overrides the baseline where an
agent's own definition makes the mismatch unambiguous:

| Agent | Tools | Why |
|-------|-------|-----|
| qa-critic | WebSearch, WebFetch, Read, Grep, Glob, Bash | Its own dispatched task text says it directly: "don't rewrite it yourself, just review." **No Edit/Write** — a critic that can rewrite what it's critiquing defeats the review |
| research | WebSearch, WebFetch, Read, Grep, Glob | Identity: "delivers actionable intelligence" as response text; never described as touching the codebase. **No Edit/Write/Bash** |
| zernio-mcp | Read, Grep, Glob | Identity, verbatim: "You do not write marketing copy, design visuals, or strategize content... you execute the publishing layer." No Edit/Write/Bash/web — see gap below |
| coo | WebSearch, WebFetch, Read, Grep, Glob | Same pattern as research: delivers opportunity briefs as response text, never described as touching a codebase or writing files itself. No Edit/Write/Bash |
| cto, cfo, marketing, product, ux, security | WebSearch, WebFetch, Read, Grep, Glob | Same pattern as coo/research: all six are advisory/board-level roles, explicit in their own Identity sections that they assess and deliver judgment as response text rather than implement. `cto` reads the codebase to verify reuse claims (Read/Grep/Glob covers this) but doesn't write to it. No Edit/Write/Bash for any of the six |
| *(every other agent: ceo, backend, frontend, content, ue-dev, ops, librarian)* | Baseline (all 8) | No unambiguous evidence in their definitions to narrow from the existing grant — don't guess |

Internal synthesis calls (`runClaude` — prompt-building, memory promotion)
get **no tools at all**: they synthesize from context already embedded in
the prompt text, so there's nothing for them to call out to.

## Known gap — not fixed here

`zernio-mcp`'s actual job (publish to Facebook/Instagram) requires the Zernio
MCP server's own tools, which don't exist in this static `--allowedTools`
list and can't yet, since `vault/mcp.ts` is still a stub. Recorded here
rather than papered over: this agent cannot actually publish until the MCP
connector is implemented (tracked separately, not invented as fixed).

## The CLI gotcha that caused this

`--allowedTools <list>` consumes the next positional argument — including
the prompt itself, if the prompt is placed after the flag. Every dispatch in
`harness/src/engine/executor/claude-code.ts` previously built args as
`-p --output-format ... --allowedTools <list> <prompt>`, so `<prompt>` was
swallowed by `--allowedTools` and the CLI failed immediately with no prompt
at all (confirmed against `.ceo-logs/session-2026-07-02T12_50_*.json` — all
three `hireAgent()` steps show `responseLengthChars: 0`, `durationMs: 0`).
Fixed by placing the prompt immediately after `-p`, before any other flag.
Verified directly against the installed CLI, not assumed.
