import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: 'https://bantuan-kita.vercel.app',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});
