import { test, expect } from "@playwright/test";
import { gotoTawarkan, takeScreenshot } from "./fixtures/global";

test.describe("Tawarkan Bantuan Page", () => {
  test("should load, display all elements, and submit form", async ({ page }) => {
    // Go to Tawarkan page
    await gotoTawarkan(page);

    // === Banner section ===
    await expect(page.getByRole("link", { name: "Kembali" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Kembali" })).toBeVisible();
    await expect(page.getByRole("img", { name: "Bantuan-kita Logo" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1, name: "Tawarkan Bantuan" })).toBeVisible();
    await expect(
      page.getByText("Bagikan keahlian Anda untuk membantu orang lain")
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Hapus Akun" })).toBeVisible();

    // === Main form ===


    const nameInput = page.getByLabel("Nama Lengkap *");
    const whatsappInput = page.getByLabel("Nomor WhatsApp *");
    const skillInput = page.getByLabel("Keahlian/Layanan *");
    const cityInput = page.getByLabel("Kota *");
    const tarifInput = page.getByLabel("Kisaran Tarif (Opsional)");
    const descInput = page.getByLabel("Deskripsi Layanan *");

    await expect(nameInput).toBeVisible();
    await expect(whatsappInput).toBeVisible();
    await expect(skillInput).toBeVisible();
    await expect(cityInput).toBeVisible();
    await expect(tarifInput).toBeVisible();
    await expect(descInput).toBeVisible();

    // === Fill out form ===
    await nameInput.fill("playwright-ui-automation");
    await whatsappInput.fill("0");
    await skillInput.fill("Test Automation");
    await cityInput.fill("Cloud");
    await tarifInput.fill("10000");
    await descInput.fill("Test Automation Playwright UI");

    // === Submit button ===
    const submitBtn = page.getByRole("button", { name: "Kirim Penawaran" });
    await expect(submitBtn).toContainText("Kirim Penawaran");

    await submitBtn.click();

    // === Notifications & Alerts ===
    await expect(page.getByRole("alert")).toBeVisible();

    await takeScreenshot(page, "tawarkan.png");
  });
});
