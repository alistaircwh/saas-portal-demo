import { test, expect } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("contact page loads", async ({ page }) => {
    await expect(page).toHaveURL("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("contact form renders all required fields", async ({ page }) => {
    await expect(page.getByPlaceholder(/jane smith/i)).toBeVisible();
    await expect(page.getByPlaceholder(/jane@company.com/i)).toBeVisible();
    await expect(page.getByPlaceholder(/acme corp/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("submit button is disabled while submitting", async ({ page }) => {
    // Block the network request so we can observe the "Sending..." state
    await page.route("/api/contact", async (route) => {
      await new Promise((r) => setTimeout(r, 500));
      await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
    });

    await page.getByPlaceholder(/jane smith/i).fill("Test User");
    await page.getByPlaceholder(/jane@company\.com/i).fill("test@example.com");
    await page.getByPlaceholder(/acme corp/i).fill("Acme");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByRole("button", { name: /sending/i })).toBeDisabled();
  });

  test("successful form submission shows success state", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ success: true }) })
    );

    await page.getByPlaceholder(/jane smith/i).fill("Alice Tan");
    await page.getByPlaceholder(/jane@company\.com/i).fill("alice@startup.my");
    await page.getByPlaceholder(/acme corp/i).fill("Startup Sdn Bhd");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/message received/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/tailored quote/i)).toBeVisible();
  });

  test("API error shows error message", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ error: "Internal server error" }) })
    );

    await page.getByPlaceholder(/jane smith/i).fill("Bob Lim");
    await page.getByPlaceholder(/jane@company\.com/i).fill("bob@corp.my");
    await page.getByPlaceholder(/acme corp/i).fill("Corp My");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText(/something went wrong/i)).toBeVisible({ timeout: 5000 });
  });

  test("required fields are enforced by browser validation", async ({ page }) => {
    // Click submit without filling anything — HTML5 required attribute should block it
    await page.getByRole("button", { name: /send message/i }).click();
    // Page should not navigate away; form should still be visible
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
    await expect(page).toHaveURL("/contact");
  });
});
