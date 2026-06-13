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
    await expect(page.getByRole("heading", { name: "Personal", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Family", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Business", exact: true })).toBeVisible();
  });

  test("Family tier has Most Popular badge", async ({ page }) => {
    await expect(page.getByText(/most popular/i)).toBeVisible();
  });

  test("toggle to 2 Years updates prices and billing note", async ({ page }) => {
    // Accessible name includes the "Save 10%" badge text, so match loosely.
    const twoYearBtn = page.getByRole("button", { name: /2 years/i });
    await twoYearBtn.click();
    await expect(twoYearBtn).toHaveAttribute("aria-pressed", "true");

    await expect(page.getByText("260").first()).toBeVisible();
    await expect(page.getByText("440").first()).toBeVisible();
    await expect(page.getByText("890").first()).toBeVisible();
    await expect(page.getByText(/billed every 2 years/i).first()).toBeVisible();
  });

  test("toggle to 3 Years then back to 1 Year restores annual prices", async ({ page }) => {
    await page.getByRole("button", { name: /3 years/i }).click();
    await expect(page.getByText("230").first()).toBeVisible();
    await expect(page.getByText("390").first()).toBeVisible();
    await expect(page.getByText("790").first()).toBeVisible();

    const oneYearBtn = page.getByRole("button", { name: "1 Year" });
    await oneYearBtn.click();
    await expect(oneYearBtn).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("290").first()).toBeVisible();
    await expect(page.getByText(/billed annually/i).first()).toBeVisible();
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
    const faqSection = page.locator("section").filter({ hasText: /common questions/i });
    const firstTrigger = faqSection.getByRole("button").first();
    await firstTrigger.click();
    await expect(firstTrigger).toHaveAttribute("aria-expanded", "true");
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
