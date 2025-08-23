import { Page, expect } from "@playwright/test";

export class TawarkanPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- Selectors ---
  linkKembali = () => this.page.getByRole("link", { name: "Kembali" });
  buttonKembali = () => this.page.getByRole("button", { name: "Kembali" });
  logo = () => this.page.getByRole("img", { name: "Bantuan-kita Logo" });
  heading = () => this.page.getByRole("heading", { level: 1, name: "Tawarkan Bantuan" });
  paragraph = () =>
    this.page.getByText("Bagikan keahlian Anda untuk membantu orang lain");
  hapusAkunBtn = () => this.page.getByRole("button", { name: "Hapus Akun" });

  nameInput = () => this.page.getByLabel("Nama Lengkap *");
  whatsappInput = () => this.page.getByLabel("Nomor WhatsApp *");
  skillInput = () => this.page.getByLabel("Keahlian/Layanan *");
  cityInput = () => this.page.getByLabel("Kota *");
  tarifInput = () => this.page.getByLabel("Kisaran Tarif (Opsional)");
  descInput = () => this.page.getByLabel("Deskripsi Layanan *");

  submitBtn = () => this.page.getByRole("button", { name: "Kirim Penawaran" });
  alert = () => this.page.getByRole("alert");

  // --- Actions ---
  async verifyBanner() {
    await expect(this.linkKembali()).toBeVisible();
    await expect(this.buttonKembali()).toBeVisible();
    await expect(this.logo()).toBeVisible();
    await expect(this.heading()).toBeVisible();
    await expect(this.paragraph()).toBeVisible();
    await expect(this.hapusAkunBtn()).toBeVisible();
  }

  async verifyFormElements() {
    await expect(this.nameInput()).toBeVisible();
    await expect(this.whatsappInput()).toBeVisible();
    await expect(this.skillInput()).toBeVisible();
    await expect(this.cityInput()).toBeVisible();
    await expect(this.tarifInput()).toBeVisible();
    await expect(this.descInput()).toBeVisible();
  }

  async fillForm({
    name,
    whatsapp,
    skill,
    city,
    tarif,
    description,
  }: {
    name: string;
    whatsapp: string;
    skill: string;
    city: string;
    tarif?: string;
    description: string;
  }) {
    await this.nameInput().fill(name);
    await this.whatsappInput().fill(whatsapp);
    await this.skillInput().fill(skill);
    await this.cityInput().fill(city);
    if (tarif) {
      await this.tarifInput().fill(tarif);
    }
    await this.descInput().fill(description);
  }

  async submitForm() {
    await expect(this.submitBtn()).toContainText("Kirim Penawaran");
    await this.submitBtn().click();
  }

  async verifyAlert() {
    await expect(this.alert()).toBeVisible();
  }
}
