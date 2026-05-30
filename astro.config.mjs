// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from "@astrojs/cloudflare";

// Production domain — drives sitemap + canonical/OG URLs.
// Keep in sync with `url` in src/config/site.ts and the Sitemap line in robots.txt.
const SITE_URL = 'https://sugarmamasweets.shop';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [sitemap()],

  image: {
    // Sharp is the default image service; keep it explicit for clarity.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  adapter: cloudflare()
});