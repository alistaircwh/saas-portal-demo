import { test, expect } from "@playwright/test";

test.describe("POST /api/contact", () => {
  test("returns 200 with valid payload", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Test User",
        email: "test@example.com",
        company: "Test Co",
        devices: "1-50",
        message: "Looking to protect our fleet.",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  test("returns 400 when name is missing", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { email: "test@example.com", company: "Test Co" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  test("returns 400 when email is missing", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Test User", company: "Test Co" },
    });
    expect(res.status()).toBe(400);
  });

  test("returns 400 when company is missing", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "Test User", email: "test@example.com" },
    });
    expect(res.status()).toBe(400);
  });

  test("returns 400 with empty body", async ({ request }) => {
    const res = await request.post("/api/contact", { data: {} });
    expect(res.status()).toBe(400);
  });

  test("optional fields (devices, message) do not cause errors", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Minimal User",
        email: "min@example.com",
        company: "Min Corp",
      },
    });
    expect(res.status()).toBe(200);
  });
});
