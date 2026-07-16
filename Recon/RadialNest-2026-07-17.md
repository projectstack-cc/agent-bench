# Recon: RadialNest — 2026-07-17

**Confidence: High** — read `RadialNest_PROMPT.md`, `RadialNest.csproj` directly.

## Reusable engines found

None extracted as standalone — this is the founder's only native Windows
desktop project (C# + WPF + .NET 8), a genuinely different technical
capability than everything else in the portfolio (which is entirely
web/Cloudflare/Node stack). Worth noting as a real, proven-but-unusual
capability, not folded into "the stack" generically.

## Reusable components found

None identified at this depth.

## Technical capabilities found

WPF + WinForms hybrid (tray icon via WinForms, UI via WPF), global hotkey
handling, a circular "weapon wheel"-style app launcher UI pattern.

## Repeated architectural patterns found

**A dedicated build-prompt file documenting AI-agent gotchas before
building** — `RadialNest_PROMPT.md` explicitly documents a WPF/WinForms
namespace-collision problem and the exact aliasing convention required to
avoid it, written *before* the build as a constraint document. Same
authoring habit as `lights-out`'s and `tiny-world`'s decisions.md files —
third independent instance of this pattern (see INDEX).

## Unfinished work found

Not assessed at source-code depth — `RadialNest_MVP_Upgrade.md` exists at
root, suggesting a planned but possibly incomplete upgrade pass. Worth a
dedicated look if this project becomes a priority.

## Abandoned opportunities found

Not determined at this depth — no recent-activity signal was checked
(would require `git log`, not done in this pass).

## Recommended Company Intelligence updates

- `capabilities.md`: native Windows desktop (WPF/.NET) is a real,
  demonstrated capability — currently `capabilities.md` only lists the
  web/Cloudflare stack from `founder-profile.md`; this is evidence of a
  broader actual range.
- `patterns.md`: per-project AI-build-gotcha documentation — third
  citation, strengthens this from "a habit" to "a validated company
  practice" worth formalizing (e.g., a Recon/Debrief template field for it).
