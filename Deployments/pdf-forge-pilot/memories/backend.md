# backend — pdf-forge-pilot memory

## What was built

`Tools/pdf-forge/pdf-forge.js` — single-file Node CLI, 122 code lines
(excl. blanks/comments, well under the 150-line budget). Uses `pdf-parse`
with a custom `pagerender` hook to capture per-page text (needed for
`pages` frontmatter and the image-placeholder heuristic — `pdf-parse`'s
default output is one flattened string with no page boundaries).
[HQ-CANDIDATE]: the `pagerender` override pattern for getting per-page
text out of `pdf-parse` is reusable for any future PDF-parsing tool in
this portfolio — worth a note in `engines.md` if a second tool ever needs
it.

## What worked

Verified end-to-end against 3 real PDFs from the founder's own Downloads
folder (not the official 3-PDF debrief-trigger pass — that's the
founder's own usage, tracked separately):
- A 69-page home inspection report: 0.51-0.56s, well under the 5s/10-page
  bar. Headings, a bullet list, and one `[IMAGE: page 3]` placeholder all
  fired correctly.
- A 10-page SDS sheet: genuine 2-column key/value tables detected and
  rendered as real Markdown tables (not fallback bullets) — the
  column-count-consistency heuristic works on real repeated-footer table
  data, not just synthetic test input.
- A short estimate PDF: fast, no errors.

## What surprised me

The heading heuristic (short line, no trailing sentence punctuation,
ALL-CAPS or Title Case) over-fires on short field labels that aren't
really section headings (e.g. a form's "Occupancy" / "Vacant" pair each
became their own heading). This is a real precision cost, not a
hypothetical — visible in the actual 69-page inspection report output.
Documented plainly in `Tools/pdf-forge/README.md`'s "what it doesn't do"
section rather than hidden. Worth checking during the debrief whether
this is common enough across the founder's real 3-PDF pass to warrant a
heuristic refinement (e.g. requiring a following non-heading line before
committing to heading status) before any `HQ/Skills/` promotion.

## Reusable pattern

Table-run detection (3+ consecutive lines with a matching multi-space-
delimited column count) plus a hard fallback to per-row bullets when a
detected run's columns don't actually agree — this is the "fallback
gracefully rather than ship broken tables" constraint made concrete, and
would generalize to any other whitespace-formatted-text-to-Markdown
conversion task.
