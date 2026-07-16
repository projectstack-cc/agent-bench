# Failure History

**Confidence: High for entries below** — sourced from directly-read files
from a real prior session (the "lights-out" project's own handoff docs),
not inferred.

---

## Shipping without a QA gate

A game module was committed without a QA gate and shipped completely
unplayable — a silent soft-lock with zero console errors, so nothing
flagged it automatically. Root cause was process, not a hard bug to catch:
"build everything, then review once" skipped the checkpoint that would have
caught it. Fixed going forward by making this an explicit CEO Decompose
trigger (`agent-ceo.md`).

## A reviewer's own suggested fix, trusted without re-checking

A second review passed along a "fix" for the above bug that reused a bound
formula copied from the *original* review's own suggested fix — which
turned out to be wrong against the actual spec. The lesson: a suggested fix
is a hypothesis, even when it's your own prior reasoning, not verified
ground truth until checked against the spec again. Now explicit in
`agent-qa-critic.md`'s Always section.

## A background dispatch's result assumed complete without being read

A session ended immediately after dispatching an agent for a large build,
before the completion notification arrived. The next session had to treat
that work as entirely unverified — checking `git status`/`git diff` before
assuming anything existed or was correct, rather than trusting the dispatch
had succeeded. Now explicit in `agent-ceo.md`'s Always section.

## A stale memory became self-reinforcing

A memory claimed "WebSearch/WebFetch are permission-denied in this
environment" — actually a CLI argument-order bug (`--allowedTools` was
consuming the prompt itself, so *every* tool call failed instantly, not
just web tools) fixed on 2026-07-06. The stale memory told future dispatches
to "flag this constraint early... rather than attempting workarounds," so
later agents cited the memory instead of testing — which is why a fixed bug
kept looking broken. Lesson, now binding: if a dispatch reports a tool as
denied, verify against a fresh isolated test before writing it into memory
as a constraint; don't just restate what a prior memory claimed. This is
exactly why Debrief/Folder Dive promotions are gated (`agent-librarian.md`)
rather than auto-written — an unreviewed claim can outlive the bug that
caused it.

## Evidence-honesty under a fixed target

Asked for a "Top 10" ranked opportunity list, real citable evidence only
supported 6 candidates. Padding to 10 would have violated the anti-
hallucination standard — the honest response was a shorter list plus an
explicit note on what wasn't found (2026-07-15, Opportunity Court). Not a
failure exactly, but the discipline that prevents this pattern from
becoming one: a fixed-count deliverable is not license to invent entries to
hit the count.
