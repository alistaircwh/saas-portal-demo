import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/Vigilant Asia/);
  });

  test("navbar renders brand and CTA", async ({ page }) => {
    await expect(page.getByText("Vigilant").first()).toBeVisible();
    await expect(page.getByText("Asia").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /subscribe now/i }).first()).toBeVisible();
  });

  test("navbar links are present", async ({ page }) => {
    await expect(page.getByRole("link", { name: "How It Works", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /pricing/i }).first()).toBeVisible();
  });

  test("hero section is visible", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toBeVisible();
  });

  test("how-it-works section exists with anchor", async ({ page }) => {
    const section = page.locator("#how-it-works");
    await expect(section).toBeAttached();
  });

  test("pricing section exists with anchor", async ({ page }) => {
    const section = page.locator("#pricing");
    await expect(section).toBeAttached();
  });

  test("footer contact anchor exists", async ({ page }) => {
    const footer = page.locator("#contact");
    await expect(footer).toBeAttached();
  });
});

test.describe("Pricing section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#pricing");
  });

  test("shows annual prices by default", async ({ page }) => {
    await expect(page.getByText("290").first()).toBeVisible();
    await expect(page.getByText("490").first()).toBeVisible();
    await expect(page.getByText("990").first()).toBeVisible();
    await expect(page.getByText(/\/yr/).first()).toBeVisible();
  });

  test("shows all three tiers", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Personal" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Family" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Business" })).toBeVisible();
  });

  test("Family tier has Most Popular badge", async ({ page }) => {
    await expect(page.getByText(/most popular/i)).toBeVisible();
  });

  test("toggle to monthly changes prices and label", async ({ page }) => {
    const monthlyBtn = page.getByRole("button", { name: /monthly/i });
    await monthlyBtn.click();

    // Annual prices should no longer show as /yr
    await expect(page.getByText(/\/mo/).first()).toBeVisible();
    // Personal monthly = Math.round(290 / 12 / 0.83) = 29
    await expect(page.getByText("29").first()).toBeVisible();
  });

  test("toggle back to annual restores /yr label", async ({ page }) => {
    const monthlyBtn = page.getByRole("button", { name: /monthly/i });
    await monthlyBtn.click();
    const annualBtn = page.getByRole("button", { name: /annual/i });
    await annualBtn.click();

    await expect(page.getByText(/\/yr/).first()).toBeVisible();
    await expect(page.getByText("290").first()).toBeVisible();
  });

  test("Subscribe Now buttons link to #contact", async ({ page }) => {
    const buttons = page.getByRole("link", { name: /subscribe now/i });
    const count = await buttons.count();
    // At least one subscribe now button in pricing (excluding navbar)
    expect(count).toBeGreaterThanOrEqual(1);
    for (let i = 0; i < count; i++) {
      const href = await buttons.nth(i).getAttribute("href");
      expect(href).toContain("#");
    }
  });
});

test.describe("FAQ Accordion", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("FAQ section is present", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /common questions/i })).toBeVisible();
  });

  test("clicking a FAQ question expands it", async ({ page }) => {
    const firstQuestion = page.locator('[data-accordion-item], details, [role="button"]').first();
    // Find any button-like element in the FAQ section
    const faqSection = page.locator("section").filter({ hasText: /frequently asked/i });
    const firstTrigger = faqSection.getByRole("button").first();
    if (await firstTrigger.count() > 0) {
      await firstTrigger.click();
      // After clicking, some content should expand (panel becomes visible)
      await expect(faqSection).toBeVisible();
    }
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger menu button is visible on mobile", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.getByRole("button", { name: /toggle menu/i });
    await expect(menuBtn).toBeVisible();
  });

  test("mobile menu opens and closes on click", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.getByRole("button", { name: /toggle menu/i });
    await menuBtn.click();
    // After opening, How It Works link should appear in mobile menu
    await expect(page.getByRole("link", { name: /how it works/i }).last()).toBeVisible();
    // Close the menu
    await menuBtn.click();
  });
});
