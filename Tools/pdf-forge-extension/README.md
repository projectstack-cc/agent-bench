# pdf-forge-extension

Chrome extension (Manifest V3): convert any PDF to clean Markdown,
**entirely locally** — right-click a PDF link or page, or drag-drop into
the popup. Zero network calls. Privacy is the differentiator: most web
"PDF to Markdown" converters upload your document to their server.

## Architecture

- `src/converter.js` — the conversion engine, ported line-for-line from
  the validated CLI (`Tools/pdf-forge/pdf-forge.js`) so its debrief findings
  carry over. pdf.js replaces pdf-parse for text extraction.
- `src/background.js` — MV3 service worker. Context-menu entry on PDF
  links/pages; converts and saves via the downloads API.
- `src/popup.html`/`popup.js` — drag-drop / file-picker surface.
- `vendor/` — vendored pdf.js (`pdf.min.mjs` + worker), no CDN dependency.

## Free vs. Pro (designed-in monetization, per Court VI sell-first gate)

- **Free:** unlimited single-file local conversion up to 50 pages
  (`FREE_PAGE_CAP` in `popup.js`).
- **Pro (license key, one-time purchase — price TBD):** docs >50 pages +
  batch queue. Storefront/license plumbing pending — CWS removed native
  payments, so a Gumroad/Lemon Squeezy key check is the plan; that store
  page doubles as Court VI's required pay-link artifact.

## Development setup

```
cd Tools/pdf-forge-extension
npm install          # installs pdfjs-dist
npm run vendor       # copies build files into vendor/
```

Then load unpacked (`Tools/pdf-forge-extension/`) at
`chrome://extensions` with Developer Mode enabled.

## Confidence

**Medium-High.** Engine logic is a direct port of working, debrief-tracked
code; extension scaffolding is standard MV3 but untested until loaded in
Chrome with real PDFs — same bar as the CLI's original 3-real-PDF pass.
