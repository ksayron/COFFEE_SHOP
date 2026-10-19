// Design exploration assets only. Does not install npm dependencies.
import https from 'node:https';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

async function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { family: 4 }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && redirects < 4) {
        response.resume();
        get(new URL(response.headers.location, url).href, redirects + 1).then(resolve, reject);
        return;
      }
      if (response.statusCode !== 200) { response.resume(); reject(new Error(`HTTP ${response.statusCode}: ${url}`)); return; }
      const parts = [];
      response.on('data', part => parts.push(part));
      response.on('end', () => resolve(Buffer.concat(parts)));
      response.on('error', reject);
    });
    request.setTimeout(25000, () => request.destroy(new Error('Asset request timeout')));
    request.on('error', reject);
  });
}

const staging = new URL('../.local/demo-assets/', import.meta.url);
const images = new URL('../apps/web/public/images/demos/', import.meta.url);
const fonts = new URL('../apps/web/public/fonts/demos/', import.meta.url);
await Promise.all([staging, images, fonts].map(directory => mkdir(directory, { recursive: true })));
const results = await Promise.allSettled([
  (async () => {
    const photo = await get('https://images.unsplash.com/photo-1760132800545-67831c723bb1?auto=format&fit=max&w=1800&q=85');
    await writeFile(new URL('storefront-original.jpg', staging), photo);
    for (const width of [800, 1600]) {
      await sharp(photo).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 84 }).toFile(fileURLToPath(new URL(`storefront-${width}.webp`, images)));
    }
    console.log('Storefront photo downloaded and compressed');
  })(),
  ...[
    ['unbounded', 'unbounded/Unbounded%5Bwght%5D.ttf'],
    ['ibm-plex-mono', 'ibmplexmono/IBMPlexMono-Regular.ttf'],
  ].map(async ([name, source]) => {
    const base = 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/';
    const [font, license] = await Promise.all([get(base + source), get(base + source.split('/')[0] + '/OFL.txt')]);
    await writeFile(new URL(name + '.ttf', staging), font);
    await writeFile(new URL(name + '-OFL.txt', fonts), license.toString('utf8').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, ''));
    console.log(`${name}: source and license downloaded`);
  }),
]);
for (const result of results) if (result.status === 'rejected') { console.error(result.reason.message); process.exitCode = 1; }
