import { defineConfig } from '@playwright/test';

const base = (process.env.BASE_PATH ?? '/developer-portfolio/').replace(/\/?$/, '/');
const port = 4321;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${port}${base}` },
  webServer: {
    command: 'node scripts/serve-subpath.mjs',
    url: `http://localhost:${port}${base}`,
    env: { BASE_PATH: base, PORT: String(port) },
    reuseExistingServer: !process.env.CI,
  },
});
