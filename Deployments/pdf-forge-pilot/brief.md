# Mission Brief: pdf-forge-pilot

Company asset build — a reusable internal tool, not a product. Below the
Opportunity Court threshold: one agent, one sitting, one deliverable,
routed directly rather than board-evaluated.

## Mission Objectives

Build `pdf-forge.js`, a Node.js CLI tool that converts a PDF file to clean
Markdown so research and recon workflows stop losing information trapped
in PDFs. It should:

- Take a PDF file path as an argument.
- Output a `.md` file to a specified directory (default: `./Recon/`).
- Preserve document structure: headings (heuristic detection), lists,
  paragraphs.
- Convert tables to Markdown tables, falling back to bullet lists if
  extraction is too mangled to trust as a table.
- Note images as `[IMAGE: page X]` placeholders.
- Add YAML frontmatter: `source`, `pages`, `converted_at`,
  `converter_version`.

## Success Metrics

1. Converts a 10-page PDF in under 5 seconds locally.
2. Output is readable Markdown, not a raw text dump.
3. The founder uses it on 3 real PDFs from their Downloads folder within
   48 hours of delivery.
4. Code stays under 150 lines (not counting comments).

## Constraints

- No external APIs — local execution only, zero token cost per
  conversion.
- No UI framework — CLI only, no web interface.
- No backend service — runs on the founder's machine, no deployment.
- If table extraction is unreliable, fall back gracefully to bullet
  notation rather than ship broken tables.
- Dependency: `pdf-parse` — cheap, well-documented, no exotic
  dependencies. First real use of a PDF-parsing library anywhere in this
  repo (only referenced as an external pattern in
  `HQ/CompanyIntelligence/engines.md` before now).
- Decomposition trigger (founder's instruction): if `backend`'s estimate
  exceeds 4 hours, split into Phase 1 (CLI-only, basic paragraph
  extraction) and Phase 2 (heading heuristics + table handling).

## Required Skills

Document parsing/heuristic structure detection. No existing engine in the
portfolio covers this (`HQ/CompanyIntelligence/engines.md`) — genuinely
new, small technical work, not a reuse case.

## Context

`Recon/` already exists as this repo's research-report directory, which
is exactly why it's the tool's default output location — no new
directory needed. Separately, `Recon/pdf-tools-2026-07-17.md` documents
an unrelated GitHub-only React/Vite PDF *editing* tool (127 commits) —
noted here only so it isn't later mistaken for this mission; it shares no
code, scope, or output format with `pdf-forge.js`.

The tool itself lives at `Tools/pdf-forge/` — a new top-level directory,
the first home for a standalone company-infrastructure CLI tool in this
repo (founder's choice among three options; see
`Deployments/pdf-forge-pilot/` scaffolding for the decision record). Not
`HQ/Skills/` — that directory holds generic, reusable *guidance*, not
runnable code, and is the debrief-time promotion target this mission
evaluates, not where the tool starts.

## Debrief

**Not written yet.** Trigger: after the founder has used `pdf-forge.js`
on 3 real PDFs from their Downloads folder, within 48 hours of delivery.
Write `Deployments/pdf-forge-pilot/debrief.md` at that point, run through
`agent-librarian.md`'s Debrief Gate, covering:

- Accuracy of heading detection.
- Table handling quality (real tables vs. bullet fallback rate).
- Speed against the 5-second/10-page bar.
- An explicit recommendation on whether this should become a standard
  tool registered in `HQ/Skills/`.
