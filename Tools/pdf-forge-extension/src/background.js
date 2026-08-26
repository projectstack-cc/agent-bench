// pdf-forge extension — MV3 service worker.
// Right-click any PDF (page or link) → "Convert to Markdown" → runs the
// shared engine locally → saves a .md download. Nothing leaves the machine.

import { convert } from './converter.js';
import * as pdfjsLib from '../vendor/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../vendor/pdf.worker.min.mjs';

const MENU_ID = 'pdf-forge-convert';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: MENU_ID,
    title: 'Convert to Markdown (PDF Forge)',
    contexts: ['link', 'page'],
  });
});

async function fetchPdfBytes(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not fetch PDF (${res.status})`);
  return new Uint8Array(await res.arrayBuffer());
}

const outputName = (url) => {
  const path = new URL(url).pathname;
  const base = decodeURIComponent(path.split('/').filter(Boolean).pop() || 'document.pdf');
  return base.replace(/\.pdf$/i, '') + '.md';
};

async function handleConversion(url, tabId) {
  const bytes = await fetchPdfBytes(url);
  const name = outputName(url);
  const { markdown } = await convert(bytes, name.replace(/\.md$/, '.pdf'), { pdfjsLib });
  const blobUrl = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
  try {
    await chrome.downloads.download({ url: blobUrl, filename: name, saveAs: true });
    await notify(tabId, `✓ Converted to ${name}`);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

async function notify(tabId, message) {
  if (tabId == null || tabId < 0) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (msg) => {
        const el = document.createElement('div');
        el.textContent = msg;
        Object.assign(el.style, {
          position: 'fixed', bottom: '16px', right: '16px', zIndex: 2147483647,
          padding: '10px 14px', borderRadius: '8px', font: '13px system-ui',
          background: '#1a1a2e', color: '#e0e0e0', boxShadow: '0 2px 12px rgba(0,0,0,.4)',
        });
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      },
      args: [message],
    });
  } catch {
    // Tabs we can't inject into (PDF viewer internals, chrome:// pages) —
    // the download itself is still the confirmation.
  }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID) return;
  const url = info.linkUrl || info.pageUrl || info.frameUrl;
  handleConversion(url, tab ? tab.id : null).catch(async (err) => {
    await notify(tab ? tab.id : null, `✗ PDF Forge failed: ${err.message}`);
  });
});
