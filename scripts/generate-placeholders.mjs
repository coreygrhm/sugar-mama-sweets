/**
 * Generate soft, on-brand PLACEHOLDER images so the site builds and looks
 * complete before Leslie's real photos arrive.
 *
 * Run with:  node scripts/generate-placeholders.mjs
 *
 * Each file is clearly labeled "PLACEHOLDER" so it's obvious what to replace.
 * To swap in a real photo: drop a file with the SAME name into src/assets/
 * (or rename your photo to match), then delete this script if you like.
 *
 * Portrait tiles are ~4:5 (1000×1250). The OG/share image is 1200×630.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const OUT = join(here, '..', 'src', 'assets');

// Palette pulled from global.css (her cookie colors).
const CREAM = '#fbf6f0';
const BLUSH_SOFT = '#e8c4c4';
const BLUSH = '#d9a7a7';
const BLUSH_DEEP = '#c08a8a';
const TAN = '#c9a87c';
const INK = '#6b5e52';
const COOKIE = '#dcb98e'; // baked sugar-cookie edge
const ICING = '#fffaf4'; // royal-icing cream/white

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(w, h, label, monogram = 'S') {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.26;

  // Evenly-piped "pearl" border just inside the icing edge (not random chips).
  const pearlR = r * 0.78;
  const pearlSize = r * 0.05;
  const pearlCount = 18;
  let pearls = '';
  for (let i = 0; i < pearlCount; i++) {
    const a = (i / pearlCount) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(a) * pearlR;
    const py = cy + Math.sin(a) * pearlR;
    pearls += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${pearlSize.toFixed(1)}" fill="${ICING}" stroke="${BLUSH_SOFT}" stroke-width="${(pearlSize * 0.18).toFixed(2)}"/>`;
  }

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${CREAM}"/>
          <stop offset="100%" stop-color="${BLUSH_SOFT}"/>
        </linearGradient>
        <radialGradient id="icing" cx="42%" cy="38%" r="68%">
          <stop offset="0%" stop-color="${BLUSH_SOFT}"/>
          <stop offset="100%" stop-color="${BLUSH}"/>
        </radialGradient>
        <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="${(r * 0.05).toFixed(1)}" stdDeviation="${(r * 0.06).toFixed(1)}" flood-color="${INK}" flood-opacity="0.18"/>
        </filter>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#bg)"/>

      <!-- baked sugar-cookie base -->
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="${COOKIE}" filter="url(#soft)"/>
      <!-- smooth royal-icing flood, inset to reveal a cookie rim -->
      <circle cx="${cx}" cy="${cy}" r="${r * 0.9}" fill="url(#icing)"/>
      <!-- piped icing outline -->
      <circle cx="${cx}" cy="${cy}" r="${r * 0.9}" fill="none" stroke="${ICING}" stroke-width="${(r * 0.04).toFixed(1)}"/>
      <!-- piped pearl border -->
      ${pearls}
      <!-- soft highlight for a glossy icing feel -->
      <ellipse cx="${cx - r * 0.28}" cy="${cy - r * 0.32}" rx="${r * 0.3}" ry="${r * 0.18}" fill="${ICING}" opacity="0.28"/>
      <!-- hand-lettered monogram -->
      <text x="${cx}" y="${cy}" font-family="Georgia, 'Times New Roman', serif" font-size="${(r * 0.95).toFixed(0)}" fill="${BLUSH_DEEP}" text-anchor="middle" dominant-baseline="central" font-style="italic">${esc(monogram)}</text>

      <text x="${cx}" y="${cy + r + h * 0.075}" font-family="Georgia, serif" font-size="${Math.round(w * 0.045)}" fill="${INK}" text-anchor="middle" font-style="italic">Sugar Mama Sweets</text>
      <text x="${cx}" y="${cy + r + h * 0.12}" font-family="Arial, sans-serif" font-size="${Math.round(w * 0.03)}" fill="${INK}" text-anchor="middle" letter-spacing="2" opacity="0.85">PLACEHOLDER · ${esc(label)}</text>
    </svg>`);
}

async function make(name, w, h, label) {
  const buf = await sharp(svg(w, h, label)).jpeg({ quality: 82 }).toBuffer();
  await sharp(buf).toFile(join(OUT, name));
  console.log('  ✓', name, `(${w}×${h})`);
}

const PORTRAIT = [1000, 1250]; // ~4:5

const jobs = [
  ['hero.jpg', ...PORTRAIT, 'hero'],
  ['portrait.jpg', ...PORTRAIT, 'meet leslie'],
  ['teaser-1.jpg', ...PORTRAIT, 'teaser 1'],
  ['teaser-2.jpg', ...PORTRAIT, 'teaser 2'],
  ['teaser-3.jpg', ...PORTRAIT, 'teaser 3'],
  ['teaser-4.jpg', ...PORTRAIT, 'teaser 4'],
  ['gallery-01.jpg', ...PORTRAIT, 'gallery 01'],
  ['gallery-02.jpg', ...PORTRAIT, 'gallery 02'],
  ['gallery-03.jpg', ...PORTRAIT, 'gallery 03'],
  ['gallery-04.jpg', ...PORTRAIT, 'gallery 04'],
  ['gallery-05.jpg', ...PORTRAIT, 'gallery 05'],
  ['gallery-06.jpg', ...PORTRAIT, 'gallery 06'],
  ['gallery-07.jpg', ...PORTRAIT, 'gallery 07'],
  ['gallery-08.jpg', ...PORTRAIT, 'gallery 08'],
  ['gallery-09.jpg', ...PORTRAIT, 'gallery 09'],
  ['og-default.jpg', 1200, 630, 'share image'],
];

await mkdir(OUT, { recursive: true });
console.log('Generating placeholder images in src/assets/ …');
for (const [name, w, h, label] of jobs) await make(name, w, h, label);
console.log('Done. Replace these with real photos (same file names) when ready.');
