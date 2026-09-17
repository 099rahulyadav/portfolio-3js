import { test, expect } from "@playwright/test";

test("home hydrates, renders WebGL and navigates through Next.js", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("canvas")).toBeVisible({ timeout: 20000 });
  await expect(page.locator(".tabular-nums")).not.toHaveText("--:--:--");
  await page.evaluate(() => { window.__navigationCheck = "client"; });
  await page.getByRole("link", { name: "Get in touch", exact: true }).click();
  await expect(page).toHaveURL(/\/about#contact$/);
  await expect(page.locator("#contact")).toBeInViewport({ timeout: 15000 });
  expect(await page.evaluate(() => window.__navigationCheck)).toBe("client");
  expect(errors).toEqual([]);
});

test("all ten routes hydrate without missing local assets", async ({ page }) => {
  const errors = [];
  const failures = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().startsWith("http://127.0.0.1:3001")) failures.push(response.url());
  });
  const routes = ["/", "/about", "/projects", "/achievements", ...["lead-unity", "one-pick", "chessy", "claster", "one-tele", "career-logic-ai"].map((slug) => `/projects/${slug}`)];
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  expect(errors).toEqual([]);
  expect(failures).toEqual([]);
});

test("certificate opens and closes with Escape", async ({ page }) => {
  await page.goto("/achievements");
  await page.waitForTimeout(2000);
  await page.locator("[data-cell]").first().click({ force: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveAttribute("aria-label", "Hackfusion 2026 certificate");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("mobile menu and reduced-motion navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Projects", exact: true }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("unknown project returns 404", async ({ page }) => {
  const response = await page.goto("/projects/not-a-project");
  expect(response.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});

test("mobile project gallery opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/lead-unity");
  await page.getByRole("button", { name: "Open Student UI", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
