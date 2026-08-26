// pdf-forge conversion engine — browser port of Tools/pdf-forge/pdf-forge.js.
// Heuristics preserved line-for-line from the validated CLI version so the
// debrief findings carry over. pdf.js supplies page text instead of pdf-parse.
// No Node APIs, no network calls — safe for MV3 service workers and pages.

export const CONVERTER_VERSION = 'ext-0.1.0';

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

  for (let i = 0; i < rawLines.length;) {
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

function findImagePages(pageTexts) {
  const lens = pageTexts.map((t) => t.replace(/\s/g, '').length);
  const avg = lens.reduce((a, b) => a + b, 0) / (lens.length || 1);
  const threshold = Math.max(50, avg * 0.25);
  return lens.reduce((pages, len, idx) => (len < threshold ? [...pages, idx + 1] : pages), []);
}

const buildFrontmatter = (sourceName, numPages) =>
  ['---', `source: "${sourceName}"`, `pages: ${numPages}`, `converted_at: "${new Date().toISOString()}"`,
   `converter_version: "${CONVERTER_VERSION}"`, '---', ''].join('\n');

/**
 * Convert PDF bytes to Markdown.
 * @param {Uint8Array} data raw PDF bytes
 * @param {string} sourceName filename for frontmatter
 * @param {{pdfjsLib: object}} deps injected pdf.js namespace
 * @returns {Promise<{markdown: string, numPages: number}>}
 */
export async function convert(data, sourceName, { pdfjsLib }) {
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const pageTexts = [];

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent({ normalizeWhitespace: false, disableCombineTextItems: false });
    let lastY, text = '';
    for (const item of content.items) {
      text += lastY === item.transform[5] || lastY === undefined ? item.str : '\n' + item.str;
      lastY = item.transform[5];
    }
    pageTexts[pageNum - 1] = text;
  }

  const imagePages = new Set(findImagePages(pageTexts));
  const body = pageTexts
    .map((text, idx) => {
      const placeholder = imagePages.has(idx + 1) ? `[IMAGE: page ${idx + 1}]` : '';
      return [pageToMarkdown(text), placeholder].filter(Boolean).join('\n\n');
    })
    .filter(Boolean)
    .join('\n\n');

  return {
    markdown: buildFrontmatter(sourceName, doc.numPages) + '\n' + body + '\n',
    numPages: doc.numPages,
  };
}

// Exposed for unit tests — the heuristic layer is the product's core.
export { pageToMarkdown, findImagePages };

