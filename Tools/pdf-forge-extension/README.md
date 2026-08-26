# pdf-forge-extension — **ForgeMark**

Chrome extension (Manifest V3): convert any PDF to clean Markdown,
**entirely locally** — right-click a PDF link or page, or drag-drop into
the popup. Zero network calls. Privacy is the differentiator: most web
"PDF to Markdown" converters upload your document to their server.

> **Brand: ForgeMark.** Internal code name stays `pdf-forge` (repo slug,
> deployment history); all user-facing surfaces say ForgeMark. Name
> verified 2026-08-26: zero Chrome Web Store listings for "forgemark"
> vs. three conflicting "PDF Forge"/"PDFForge" listings plus the
> established pdfforge company — "PDF Forge" is unusable publicly.
> "MarkForge" was also rejected (existing CWS Markdown-conversion
> extension + Markforged trademark). Known accepted risk: `entireio/
> forgemark` (~35★ GitHub, markdown commenting tool) exists but is not
> on CWS and is in a different niche.

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

## Name & publication status (2026-08-26)

**Public name decided: ForgeMark** (see banner above). Publication plan:
free-only v1 listing. Chrome Web Store payments are deprecated, so no
charging through the store ever — paid tier later via an embedded license
provider (e.g. ExtensionPay) plus a privacy-policy URL (CWS requirement
even for free extensions; a GitHub Pages page suffices). No full
storefront needed.

## Icon

Canonical mark: `icons/icon.svg` (anvil with sparks). CWS/manifest icons
must be bitmaps — rasterize to 16/48/128 px PNG before submission.

## Confidence

**Medium-High.** Engine logic is a direct port of working, debrief-tracked
code now guarded by tests; extension scaffolding is standard MV3 but
untested until loaded in Chrome with real PDFs — same bar as the CLI's
original 3-real-PDF pass.
