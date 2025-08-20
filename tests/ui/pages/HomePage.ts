import { Page, expect, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly title = /Bantuan-kita/i;
  readonly bannerHeading: Locator;
  readonly offerHelpLink: Locator;
  readonly searchHelpInput: Locator;
  readonly searchCityInput: Locator;
  readonly cardHeading: Locator;
  readonly whatsappButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bannerHeading = page.getByRole('heading', { level: 1, name: 'Bantuan-kita' });
    this.offerHelpLink = page.getByRole('link', { name: 'Tawarkan Bantuan' });
    this.searchHelpInput = page.getByPlaceholder('Cari bantuan...');
    this.searchCityInput = page.getByPlaceholder('Cari kota...');
    this.cardHeading = page.locator('h3').first();
    this.whatsappButtons = page.getByRole('button', { name: 'WhatsApp' });
  }

  async checkTitle() {
    await expect(this.page).toHaveTitle(this.title);
  }

  async checkBanner() {
    await expect(this.bannerHeading).toBeVisible();
    await expect(this.offerHelpLink).toBeVisible();
  }

  async checkFilters() {
    await expect(this.searchHelpInput).toBeVisible();
    await expect(this.searchCityInput).toBeVisible();
  }

async checkCards() {
  const cards = this.page.locator('.card');
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await expect(card.locator('h3')).toBeVisible(); // Example: card title
    await expect(card.locator('p')).toBeVisible();  // Example: card description
    await expect(card.locator('a')).toHaveAttribute('href', /whatsapp/); // Example: button/link
  }
}

  async checkWhatsAppButton() {
    await expect(this.whatsappButtons.first()).toBeVisible();
  }
}
