# Success History

**Confidence: High for entries below** — sourced from directly-read files
from a real prior session (the "lights-out" project's own handoff/review
docs), not inferred.

---

## Independent re-verification catches real bugs

A dispatched agent's self-report ("67/67 tests passing, clean typecheck,
clean build") was not sufficient on its own — a session that independently
re-read the diff and re-ran `tsc`/`vitest`/`vite build` caught a real rules
bug (a home-arrival bound formula that was wrong against spec) that two
prior review passes had missed. This is why `agent-qa-critic.md`'s Always
section requires independent re-verification, not agent self-report, before
a "Ship it" verdict.

## QA gates before commit, not after, prevent silent breakage

A milestone shipped once without an intermediate QA gate broke silently
(a card-draw subsystem with zero console errors and a complete soft-lock).
The fix — decompose large builds into gated milestones with a qa-critic
review between each — is now built into `agent-ceo.md`'s Decompose
triggers.

## Evidence-driven position changes are the system working, not a flaw

In the Opportunity Court session (2026-07-15), the QA Director persona
reversed a "reject" position to "conditional" after the CFO's counter-
argument — a genuine update on evidence, not a rubber stamp. This is the
governance model (`project_files/hq-v2-architecture.md` §9) working as
designed.
