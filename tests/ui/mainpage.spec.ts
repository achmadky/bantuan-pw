import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';
import { gotoBantuanKita, takeScreenshot } from './fixtures/global';

test.describe('Bantuan Kita Home', () => {
  test('Homepage should load and display bantuan list', async ({ page }) => {
    const homePage = new HomePage(page);

    // Use fixture instead of repeating logic
    await gotoBantuanKita(page);

    await homePage.checkTitle();
    await homePage.checkBanner();
    await homePage.checkFilters();
    await homePage.checkCards();
    await homePage.checkWhatsAppButton();

    await takeScreenshot(page, 'bantuan-kita-home.png');
  });
});
