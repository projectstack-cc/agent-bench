# Deployment: pdf-forge-pilot

Below the Opportunity Court threshold — one agent, one sitting, one
deliverable, routed directly by the founder rather than board-evaluated.
See `brief.md` for full scope.

## Roster

| Executive | HQ Version Pinned | Mission Overlay |
|-----------|--------------------|-------------------|
| `backend` | v1 | Ships `Tools/pdf-forge/pdf-forge.js` — a local-only Node.js CLI that converts a PDF to Markdown (heuristic headings/lists, table-or-fallback-bullets, image placeholders, YAML frontmatter). Zero external APIs, zero UI, zero backend service — a single script plus its `package.json`, not a product. Hard budget: ≤150 lines excluding comments. If real scoping puts the build above 4 hours, stop after Phase 1 (CLI skeleton + `pdf-parse` wiring + paragraph extraction + frontmatter + file output) and report the blocker rather than pushing into Phase 2 (heading/list/table heuristics + image-placeholder heuristic) uncommitted. `pdf-parse` is the first PDF-parsing dependency used anywhere in this repo — no existing engine to reuse (`HQ/CompanyIntelligence/engines.md`). Cross-reference only, not related: `Recon/pdf-tools-2026-07-17.md` documents a separate, unrelated GitHub-only PDF *editing* tool. |
