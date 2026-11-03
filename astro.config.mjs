import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// BASE_PATH examples: "/" (local), "/developer-portfolio/", "/developer-portfolio/pr-12/"
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://puranenjenny.github.io',
  base,
  trailingSlash: 'always',
  integrations: [react()],
});
