// popup.js — drag-drop / file-picker conversion surface.
import { convert } from './converter.js';
import * as pdfjsLib from '../vendor/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = '../vendor/pdf.worker.min.mjs';

const drop = document.getElementById('drop');
const fileInput = document.getElementById('file');
const status = document.getElementById('status');
const FREE_PAGE_CAP = 50; // Pro unlocks longer docs — pricing TBD, flag to founder

function setStatus(text, cls = '') {
  status.textContent = text;
  status.className = cls;
}

async function handleFile(file) {
  if (!file || !/\.pdf$/i.test(file.name)) {
    setStatus('That is not a PDF.', 'err');
    return;
  }
  setStatus(`Converting ${file.name}…`);
  const t0 = performance.now();
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { markdown, numPages } = await convert(bytes, file.name, { pdfjsLib });
    if (numPages > FREE_PAGE_CAP) {
      setStatus(`${file.name}: ${numPages} pages — over the free ${FREE_PAGE_CAP}-page limit. Pro will unlock this.`, 'err');
      return;
    }
    download(markdown, file.name.replace(/\.pdf$/i, '') + '.md');
    setStatus(`✓ ${numPages} pages → Markdown in ${((performance.now() - t0) / 1000).toFixed(1)}s`, 'ok');
  } catch (err) {
    setStatus(`✗ Failed: ${err.message}`, 'err');
  }
}

function download(markdown, filename) {
  const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

drop.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));
['dragover', 'dragenter'].forEach((ev) =>
  drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('hover'); }));
['dragleave', 'dragend'].forEach((ev) =>
  drop.addEventListener(ev, () => drop.classList.remove('hover')));
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  drop.classList.remove('hover');
  handleFile(e.dataTransfer.files[0]);
});
