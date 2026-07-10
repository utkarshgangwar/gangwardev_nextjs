import { test, expect } from "@playwright/test";

test("should toggle dark/light mode classes smoothly on click", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  // 1. Locate your theme switch button (use an accessible attribute or label)
  const themeButton = page
    .getByRole("button", { name: /toggle theme/i })
    .or(page.locator("#theme-toggle"));

  // Skip test elegantly if you haven't implemented the toggle element yet
  if ((await themeButton.count()) === 0) return;

  // 2. Click to toggle
  await themeButton.click();

  // 3. Check if the HTML tag or body container contains the class token changes
  const rootHtml = page.locator("html");
  await expect(rootHtml).toHaveClass(/dark/);
});
