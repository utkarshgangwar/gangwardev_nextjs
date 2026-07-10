import { test, expect } from "@playwright/test";

// Use a baseline URL (Playwright reads this from your config base URL, usually http://localhost:3000)
const BASE_URL = "http://localhost:3000";

test.describe("Portfolio Core Navigation Flow", () => {
  test("should land on the home page and verify primary profile elements", async ({
    page,
  }) => {
    // 1. Visit the landing page
    await page.goto(BASE_URL);

    // 2. Check that the title or prominent entry element is visible
    await expect(page).toHaveTitle(/Utkarsh/i);
  });

  test("should successfully navigate to the About section/page", async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    // 3. Find the navigation element for About and click it
    // (Adjust the selector text based on your actual navbar component labels)
    const aboutLink = page.getByRole("link", { name: /about/i });
    await aboutLink.click();

    // 4. Assert that the URL changed or the layout scrolled to the section
    await expect(page).toHaveURL(/.*about/);

    // 5. Verify the actual profile name renders in the real browser DOM
    const profileName = page.getByText("Utkarsh Gangwar");
    await expect(profileName).toBeVisible();
  });

  test("should navigate to the Stacks section and verify technology canvas container loads", async ({
    page,
  }) => {
    await page.goto(BASE_URL);

    // Wait until the network is completely idle and components are hydrated
    await page.waitForLoadState("networkidle");

    // Click the navigation link
    const stacksLink = page.getByRole("link", { name: /tech stack/i });
    await stacksLink.click();

    // Verify redirection
    await expect(page).toHaveURL(/.*stacks/);
  });
});
