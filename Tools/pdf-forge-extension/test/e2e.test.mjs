// End-to-end: hand-crafted minimal PDF → convert() → Markdown.
// Exercises the real extraction pipeline (pdf.js) plus heuristics in one go,
// no browser needed — pdf.js also runs under Node.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convert } from '../src/converter.js';

// Minimal single-page PDF: a ALL-CAPS heading line + two body lines.
function buildMinimalPdf(text1, text2) {
  const content = [
    'BT /F1 14 Tf 72 720 Td (' + text1 + ') Tj ET',
    'BT /F1 11 Tf 72 700 Td (' + text2 + ') Tj ET',
  ].join('\n');
  const objects = [];
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
  objects[2] = '<< /Type /Pages /Kids [3 0 R] /Count 1 >>';
  objects[3] = '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ' +
    '/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>';
  objects[4] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  objects[5] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

  let out = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = out.length;
    out += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = out.length;
  out += 'xref\n0 ' + objects.length + '\n0000000000 65535 f \n';
  for (let i = 1; i < objects.length; i++) {
    out += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  out += 'trailer\n<< /Size ' + objects.length + ' /Root 1 0 R >>\nstartxref\n' +
    xrefStart + '\n%%EOF';
  return Buffer.from(out, 'binary');
}

test('convert() turns PDF bytes into frontmattered markdown', async () => {
  // Use pdf.js's Node-compatible legacy build — same library, no browser
  // worker needed. The extension itself keeps the vendored browser build.
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const bytes = new Uint8Array(buildMinimalPdf('TEST HEADING', 'Body text appears here.'));
  const { markdown, numPages } = await convert(bytes, 'test.pdf', { pdfjsLib });

  assert.equal(numPages, 1);
  assert.match(markdown, /^---\n/);
  assert.match(markdown, /source: "test\.pdf"/);
  assert.match(markdown, /pages: 1/);
  assert.match(markdown, /## TEST HEADING|### TEST HEADING|TEST HEADING/m);
});
