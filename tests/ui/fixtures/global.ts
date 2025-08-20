import { Page } from '@playwright/test';

export async function gotoBantuanKita(page: Page) {
  await page.goto('https://bantuan-kita.vercel.app/'); // change with your real URL
}

export async function takeScreenshot(page: Page, name: string = 'homepage.png') {
  await page.screenshot({ path: `screenshots/${name}`, fullPage: true });
}
