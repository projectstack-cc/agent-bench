// Copies pdf.js ESM build + worker into the extension's vendor/ directory so
// the extension has zero CDN/runtime-network dependencies.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = dirname(require.resolve('pdfjs-dist/package.json'));
const vendorDir = join(root, 'vendor');

mkdirSync(vendorDir, { recursive: true });
copyFileSync(join(dist, 'build', 'pdf.min.mjs'), join(vendorDir, 'pdf.min.mjs'));
copyFileSync(join(dist, 'build', 'pdf.worker.min.mjs'), join(vendorDir, 'pdf.worker.min.mjs'));
console.log('Vendored pdf.js into', vendorDir);
