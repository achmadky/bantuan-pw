import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  reporter: [
    ['line'],
    ['allure-playwright']
  ],
  use: {
    headless: true,
    baseURL: 'https://bantuan-kita.vercel.app',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
});
