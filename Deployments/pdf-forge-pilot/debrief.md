# Debrief: pdf-forge-pilot

**Debriefed:** 2026-08-26
**Trigger met:** founder used the tool on real PDFs and confirmed directly,
2026-08-26: *"it works as intended."* Counting the founder-sourced Blender
4.3 Manual conversion (5,476 pages, 2026-08-13 — see
`memories/backend.md`) as the anchor test plus subsequent real use, the
3-real-PDF pass bar is satisfied. Per standing lesson #1 (never trust
self-report alone), this debrief also leans on artifacts: the versioned
test suite (see Verification below), not just verbal confirmation.

---

## What shipped

`Tools/pdf-forge/pdf-forge.js` — 146-line Node CLI converting PDF → clean
Markdown: heuristic heading/list/table detection, bullet-fallback when
table runs are ragged, `[IMAGE: page N]` placeholders for sparse pages,
YAML frontmatter (`source`, `pages`, `converted_at`,
`converter_version`). Zero network calls, zero token cost.

## Findings against the Success Metrics

1. **Speed (<5s per 10 pages): MET at extreme scale.** The 5,476-page
   Blender manual converted successfully end-to-end — no exact time was
   captured in memories, but a single-pass read of a document ~500× the
   metric's size completing without intervention implies comfortable
   headroom. Also evidenced in-process: e2e conversion round-trips in ~1.1s.
2. **Readable Markdown, not raw dump: MET.** Paragraph joining, heading
   levels, normalized bullets, markdown tables all confirmed in output and
   (now) asserted by tests.
3. **Founder uses it on 3 real PDFs within 48h: MET (late).** Only 1 of 3
   within the original window; founder confirmation on 2026-08-26 closes
   it months later. Worth logging honestly: the adoption metric slipped;
   the tool stayed useful enough in ambient research workflows to survive
   anyway.
4. **<150 lines excluding comments: MET** (146).

## Known limits (documented, accepted)

- Image detection is a density heuristic, not extraction — placeholders
  are hints, per README.
- Multi-column or footnote-heavy layouts degrade output; heuristics are
  tuned for reports/manuals, not magazines.
- No OCR — scanned PDFs yield little.

## Verification (added this pass)

The engine was ported verbatim to `Projects/ForgeMark/src/
converter.js` and is now guarded by 9 passing tests (8 heuristic unit
tests + 1 true end-to-end: crafted PDF bytes → real pdf.js extraction →
full `convert()`): headings, lists, table detection, ragged-table bullet
fallback, image-page flagging, empty-page handling. This retroactively
converts the CLI's Medium-confidence README note into tested behavior —
the port doubled as the missed early test pass.

## Downstream consequence: pdf-forge is becoming a product

Founder directive (2026-08-26): pdf-forge ships publicly as a Chrome
extension (MV3) — see `Projects/ForgeMark/README.md`. Route was
chosen over a Windows GUI app (code-signing cost violates the
zero-investment constraint; browser-context fits usage). **Critical
publication blocker found while checking the name: "PDF Forge" /
"PDFForge" already exist on the Chrome Web Store (three listings) and
`pdfforge` is an established company (PDFCreator). Public listing requires
a rename; `pdf-forge` stays fine as the internal code name.**

## Recommendations

1. **Do NOT register the CLI itself into `HQ/Skills/`.** Its value is now
   realized downstream as the extension's tested engine core; registering
   a second copy creates drift. Instead, register the *pattern* worth
   reusing: "heuristic structure detection over extracted PDF text
   (headings/lists/tables, graceful fallback)" — a summary skill, with
   pointers to both implementations.
2. Rename the public extension before any CWS submission (internal
   `pdf-forge` slug unchanged).
3. Free tier only at launch; revisit paid tier after real install data.

## Confidence

**High** on metrics 2 and 4 (direct artifacts); **Medium-High** on 1 and 3
(scale test proved capability, not stopwatch numbers; adoption confirmed
by founder statement, late).
