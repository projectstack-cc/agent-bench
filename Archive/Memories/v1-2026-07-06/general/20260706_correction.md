# ceo,research / general — correction

The "WebSearch/WebFetch are permission-denied in this environment" memories
from 2026-07-02 and 2026-07-06 (archived to `Archive/Memories/general/` and
`Archive/Memories/research/`) were never a real environment restriction. Root
cause: `harness/src/engine/executor/claude-code.ts` built CLI args as
`-p --output-format ... --allowedTools <list> <prompt>` — the `claude` CLI's
`--allowedTools <list>` consumes the next positional argument, so it silently
swallowed the prompt itself and the whole dispatch failed instantly (0-char,
0ms), not just the web tools specifically. Fixed 2026-07-06 by moving the
prompt to immediately follow `-p`. Verified directly: a replay of the exact
research-agent prompt that produced the stale memory, run through the fixed
argument order, executed 3 real WebSearch calls with zero permission denials
and returned sourced results.

The stale memory then became self-reinforcing: it explicitly told future
research dispatches to "flag this constraint early... rather than attempting
workarounds," so subsequent agents cited it instead of testing — which is
why it survived past the actual fix. If a future dispatch reports a tool as
denied, verify it against a fresh, isolated test before writing it into
memory as a constraint; don't just restate what a prior memory claimed.

---
Source: manual correction, harness architecture session, 2026-07-06
