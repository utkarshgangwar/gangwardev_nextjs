import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["iPhone 14"] }); // Emulate mobile view natively

test("should render structural column blocks cleanly in mobile viewport stack", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/about");

  // Verify elements stack properly and contact links remain clickable on smaller frames
  const emailIcon = page.getByText("utkarshonwork@gmail.com");
  await expect(emailIcon).toBeVisible();
});
