// Unit tests for the ported conversion heuristics (pure functions — no
// browser or pdf.js needed). Run: node --test test/converter.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageToMarkdown, findImagePages } from '../src/converter.js';

test('plain paragraph lines are joined', () => {
  const md = pageToMarkdown('The quick brown fox\njumps over the lazy dog.');
  assert.equal(md, 'The quick brown fox jumps over the lazy dog.');
});

test('title-case and ALL-CAPS short lines become headings', () => {
  const md = pageToMarkdown('INTRODUCTION\nSome paragraph text follows here.\nSection Overview');
  assert.match(md, /^## INTRODUCTION/m);
  assert.match(md, /### Section Overview/);
});

test('sentences are not headings', () => {
  const md = pageToMarkdown('This looks important.\nAnother line of body copy.');
  assert.doesNotMatch(md, /^#+ /m);
});

test('bullet and numbered lists normalize to dashes', () => {
  const md = pageToMarkdown('• first item\n• second item\n1. numbered thing');
  assert.equal(md, '- first item\n- second item\n- numbered thing');
});

test('aligned multi-space runs become markdown tables', () => {
  const md = pageToMarkdown(
    'Name        Qty        Price\nBolt M8     100        $0.12\nWasher      240        $0.03');
  assert.match(md, /\| Name \| Qty \| Price \|/);
  assert.match(md, /\| --- \| --- \| --- \|/);
  assert.match(md, /\| Bolt M8 \| 100 \| \$0\.12 \|/);
});

test('ragged table runs fall back to bullets instead of broken tables', () => {
  // Third row has a different column count than the header rows.
  const md = pageToMarkdown(
    'Name        Qty\nBolt M8     100\njust some irregular prose line');
  assert.doesNotMatch(md, /\| --- \|/);
});

test('image detection flags sparse pages against document average', () => {
  const dense = 'word '.repeat(200); // ~1000 chars
  const sparse = 'diagram only';
  assert.deepEqual(findImagePages([dense, sparse, dense]), [2]);
});

test('empty pages produce no output', () => {
  assert.equal(pageToMarkdown(''), '');
});
