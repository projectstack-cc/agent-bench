# pdf-forge

Local CLI that converts a PDF into clean Markdown — headings, lists, and
tables preserved heuristically, YAML frontmatter added, zero external
calls, zero token cost per conversion. Built for `pdf-forge-pilot`; see
`Deployments/pdf-forge-pilot/brief.md` for the full mission context and
`Deployments/pdf-forge-pilot/debrief.md` (once written) for real-world
accuracy findings.

## Install

```
cd Tools/pdf-forge
npm install
```

## Use

```
node pdf-forge.js <path-to-pdf> [outputDir]
```

`outputDir` defaults to `./Recon/` (relative to wherever you run the
command from). The output filename matches the input, with `.md`.

Example:

```
node pdf-forge.js "C:/Users/scook/Downloads/report.pdf"
node pdf-forge.js ./some.pdf ./notes/
```

## What it does

- Extracts text page by page via `pdf-parse`.
- Heuristically detects headings (short lines, no trailing sentence
  punctuation, ALL-CAPS or Title Case), list items (bullet/numbered
  markers), and paragraphs (everything else, joined).
- Detects runs of 3+ lines with a consistent multi-space-delimited column
  count and renders them as a Markdown table; if a detected run's rows
  don't actually line up to the same column count, it falls back to a
  bullet per row rather than emit a broken table.
- Adds YAML frontmatter: `source`, `pages`, `converted_at`,
  `converter_version`.

## What it doesn't do (be aware)

- **No real image extraction.** `pdf-parse` only gives text, not layout
  or embedded images. `[IMAGE: page X]` placeholders are a **heuristic
  proxy** — pages whose extracted text is much sparser than the
  document's average are flagged as likely image-heavy. This will miss
  images on text-dense pages and can false-positive on genuinely
  sparse/short text pages. Treat placeholders as a hint to go check the
  original PDF, not a guarantee.
- Heading/table detection is heuristic, not a real layout parser — dense
  or unusually formatted PDFs (multi-column layouts, heavy footnotes)
  will convert less cleanly than a simple single-column report.

## Confidence

**Confidence:** Medium — the extraction and heuristics have been run
against locally generated sample PDFs during development, not yet
against the real-world PDFs this tool is meant for. The 3-real-PDF usage
pass (see brief.md's Debrief trigger) is what raises this to High or
surfaces where it breaks.
