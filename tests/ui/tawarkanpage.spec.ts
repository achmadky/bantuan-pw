import { test } from "@playwright/test";
import { gotoTawarkan, takeScreenshot } from "./fixtures/global";
import { TawarkanPage } from "./pages/TawarkanPage";

test.describe("Tawarkan Bantuan Page", () => {
  test("should load, display all elements, and submit form", async ({ page }) => {
    // Go to Tawarkan page
    await gotoTawarkan(page);

    const tawarkanPage = new TawarkanPage(page);

    // Verify banner + form
    await tawarkanPage.verifyBanner();
    await tawarkanPage.verifyFormElements();

    // Fill form
    await tawarkanPage.fillForm({
      name: "playwright-ui-automation",
      whatsapp: "0",
      skill: "Test Automation",
      city: "Cloud",
      tarif: "10000",
      description: "Test Automation Playwright UI",
    });

    // Submit form
    await tawarkanPage.submitForm();

    // Verify alert
    await tawarkanPage.verifyAlert();

    // Screenshot
    await takeScreenshot(page, "tawarkan.png");
  });
});
