#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const CONVERTER_VERSION = '1.0.0';
const BULLET_RE = /^[•‣◦⁃∙▪●*-]\s+/;
const NUM_RE = /^(\d+[.)]|[a-zA-Z][.)])\s+/;
const END_RE = /[.,;]$/;

const isListItem = (line) => BULLET_RE.test(line.trim()) || NUM_RE.test(line.trim());
const normalizeListItem = (line) => {
  const t = line.trim();
  return BULLET_RE.test(t) ? '- ' + t.replace(BULLET_RE, '') : '- ' + t.replace(NUM_RE, '');
};

function isHeading(line) {
  const t = line.trim();
  if (!t || t.length > 70 || END_RE.test(t) || isListItem(t)) return false;
  return (t === t.toUpperCase() && /[A-Z]/.test(t)) || (t.length < 60 && /^([A-Z][\w'&/-]*\s*){1,8}$/.test(t));
}

const headingLevel = (line) => (line.trim() === line.trim().toUpperCase() && line.trim().length < 40 ? 2 : 3);

function splitColumns(line) {
  const cols = line.trim().split(/\s{2,}|\t+/).map((c) => c.trim()).filter(Boolean);
  return cols.length >= 2 ? cols : null;
}

// Runs of >=3 consecutive lines with the same column count are candidate tables.
function detectTableRuns(lines) {
  const runs = [];
  let run = [], runCols = null;
  const flush = (end) => {
    if (run.length >= 3) runs.push({ start: end - run.length, end, rows: run });
    run = []; runCols = null;
  };
  lines.forEach((line, i) => {
    const cols = splitColumns(line);
    if (cols && (runCols === null || cols.length === runCols)) { run.push(cols); runCols = cols.length; }
    else { flush(i); if (cols) { run = [cols]; runCols = cols.length; } }
  });
  flush(lines.length);
  return runs;
}

// Falls back to a bullet per row if a run's rows don't actually share a column count.
function tableToMarkdown(rows) {
  const n = rows[0].length;
  if (!rows.every((r) => r.length === n)) return rows.map((r) => '- ' + r.join(' — ')).join('\n');
  const [header, ...body] = rows;
  const sep = '| ' + header.map(() => '---').join(' | ') + ' |';
  return ['| ' + header.join(' | ') + ' |', sep, ...body.map((r) => '| ' + r.join(' | ') + ' |')].join('\n');
}

function pageToMarkdown(pageText) {
  const rawLines = pageText.split('\n').map((l) => l.trimEnd()).filter((l) => l.trim());
  if (!rawLines.length) return '';

  const tableRuns = detectTableRuns(rawLines);
  const blocks = [];
  let paragraph = [], list = [];
  const flushParagraph = () => { if (paragraph.length) blocks.push(paragraph.join(' ')); paragraph = []; };
  const flushList = () => { if (list.length) blocks.push(list.join('\n')); list = []; };

  for (let i = 0; i < rawLines.length; ) {
    const run = tableRuns.find((r) => r.start === i);
    if (run) {
      flushParagraph(); flushList();
      blocks.push(tableToMarkdown(run.rows));
      i = run.end;
      continue;
    }
    const line = rawLines[i];
    if (isHeading(line)) { flushParagraph(); flushList(); blocks.push('#'.repeat(headingLevel(line)) + ' ' + line.trim()); }
    else if (isListItem(line)) { flushParagraph(); list.push(normalizeListItem(line)); }
    else { flushList(); paragraph.push(line.trim()); }
    i++;
  }
  flushParagraph(); flushList();
  return blocks.join('\n\n');
}

// pdf-parse doesn't extract images; flag pages whose text density is
// anomalously low relative to the document average as likely image-heavy.
// A proxy, not real image detection -- documented in README.md.
function findImagePages(pageTexts) {
  const lens = pageTexts.map((t) => t.replace(/\s/g, '').length);
  const avg = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const threshold = Math.max(50, avg * 0.25);
  return lens.reduce((pages, len, idx) => (len < threshold ? [...pages, idx + 1] : pages), []);
}

const buildFrontmatter = (sourceFile, numPages) =>
  ['---', `source: "${path.basename(sourceFile)}"`, `pages: ${numPages}`, `converted_at: "${new Date().toISOString()}"`,
   `converter_version: "${CONVERTER_VERSION}"`, '---', ''].join('\n');

async function convert(pdfPath, outDir) {
  const buffer = fs.readFileSync(pdfPath);
  const pageTexts = [];
  const pagerender = (pageData) =>
    pageData.getTextContent({ normalizeWhitespace: false, disableCombineTextItems: false }).then((content) => {
      let lastY, text = '';
      for (const item of content.items) {
        text += lastY === item.transform[5] || lastY === undefined ? item.str : '\n' + item.str;
        lastY = item.transform[5];
      }
      pageTexts[pageData.pageIndex] = text;
      return text;
    });

  const data = await pdfParse(buffer, { pagerender });
  const imagePages = new Set(findImagePages(pageTexts));
  const body = pageTexts
    .map((text, idx) => {
      const placeholder = imagePages.has(idx + 1) ? `[IMAGE: page ${idx + 1}]` : '';
      return [pageToMarkdown(text), placeholder].filter(Boolean).join('\n\n');
    })
    .filter(Boolean)
    .join('\n\n');

  const markdown = buildFrontmatter(pdfPath, data.numpages) + '\n' + body + '\n';
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, path.basename(pdfPath, path.extname(pdfPath)) + '.md');
  fs.writeFileSync(outPath, markdown);
  return outPath;
}

function main() {
  const [pdfPath, outDirArg] = process.argv.slice(2);
  if (!pdfPath) {
    console.error('Usage: node pdf-forge.js <path-to-pdf> [outputDir]');
    process.exit(1);
  }
  const outDir = outDirArg || './Recon/';
  const start = Date.now();
  convert(pdfPath, outDir)
    .then((outPath) => console.log(`Wrote ${outPath} (${((Date.now() - start) / 1000).toFixed(2)}s)`))
    .catch((err) => { console.error('pdf-forge failed:', err.message); process.exit(1); });
}

if (require.main === module) main();

module.exports = { convert, pageToMarkdown, findImagePages };
