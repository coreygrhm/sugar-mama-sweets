/**
 * Generate the social share / Open Graph image: src/assets/og-default.jpg
 *
 * This is the thumbnail shown when the site link is posted to Facebook,
 * Messenger, or texted. Standard size: 1200 × 630 (1.91:1).
 *
 * Because the hero is a PORTRAIT photo, a plain wide crop would chop the
 * cookies — so we compose a branded card instead: the photo on the right,
 * the business name + tagline + location on the left.
 *
 * Run with:  node scripts/generate-og.mjs
 * Re-run any time the hero photo or branding changes.
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(here, '..', 'src', 'assets');

// Source photo (her signature hero set) + brand text.
const SOURCE = 'hero.jpg';
const NAME_LINES = ['Sugar Mama', 'Sweets'];
const TAGLINE_LINES = ['Hand-decorated sugar cookies', "for life's sweetest moments"];
const EYEBROW = 'SCOTTSBORO, ALABAMA';

// Palette (from global.css)
const CREAM = '#fbf6f0';
const CREAM_DEEP = '#f6ece1';
const BLUSH = '#d9a7a7';
const BLUSH_DEEP = '#c08a8a';
const TAN = '#c9a87c';
const INK = '#3d332b';
const INK_SOFT = '#6b5e52';

const W = 1200;
const H = 630;

// Photo panel on the right.
const IMG_W = 372;
const IMG_H = 492;
const IMG_X = W - 72 - IMG_W;
const IMG_Y = (H - IMG_H) / 2;
const RADIUS = 22;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Embed the hero photo as a data URI so the whole card renders in one pass.
const heroBuf = await readFile(join(ASSETS, SOURCE));
const heroData = `data:image/jpeg;base64,${heroBuf.toString('base64')}`;

const TX = 92; // left text margin

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${CREAM}"/>
      <stop offset="100%" stop-color="${CREAM_DEEP}"/>
    </linearGradient>
    <clipPath id="round">
      <rect x="${IMG_X}" y="${IMG_Y}" width="${IMG_W}" height="${IMG_H}" rx="${RADIUS}" ry="${RADIUS}"/>
    </clipPath>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="${INK}" flood-opacity="0.22"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- subtle blush accent corner -->
  <circle cx="${W}" cy="0" r="220" fill="${BLUSH}" opacity="0.10"/>
  <circle cx="0" cy="${H}" r="180" fill="${TAN}" opacity="0.08"/>

  <!-- photo panel -->
  <rect x="${IMG_X}" y="${IMG_Y}" width="${IMG_W}" height="${IMG_H}" rx="${RADIUS}" ry="${RADIUS}" fill="${CREAM}" filter="url(#shadow)"/>
  <image href="${heroData}" xlink:href="${heroData}"
         x="${IMG_X}" y="${IMG_Y}" width="${IMG_W}" height="${IMG_H}"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#round)"/>

  <!-- eyebrow -->
  <text x="${TX}" y="208" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700"
        letter-spacing="4" fill="${TAN}">${esc(EYEBROW)}</text>

  <!-- business name -->
  <text x="${TX}" y="296" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-weight="700" fill="${INK}">${esc(NAME_LINES[0])}</text>
  <text x="${TX}" y="372" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-weight="700" fill="${INK}">${esc(NAME_LINES[1])}</text>

  <!-- divider -->
  <rect x="${TX}" y="404" width="78" height="4" rx="2" fill="${BLUSH_DEEP}"/>

  <!-- tagline -->
  <text x="${TX}" y="452" font-family="Georgia, 'Times New Roman', serif" font-size="29" font-style="italic" fill="${INK_SOFT}">${esc(TAGLINE_LINES[0])}</text>
  <text x="${TX}" y="490" font-family="Georgia, 'Times New Roman', serif" font-size="29" font-style="italic" fill="${INK_SOFT}">${esc(TAGLINE_LINES[1])}</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(join(ASSETS, 'og-default.jpg'));
console.log('✓ Wrote src/assets/og-default.jpg (1200×630) from', SOURCE);
