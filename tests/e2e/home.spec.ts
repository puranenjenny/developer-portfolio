import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page loads with all assets under the subpath', async ({ page }) => {
  const failed: string[] = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
  });
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(failed).toEqual([]);
});

test('skip link moves focus to main content', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
});

test('no accessibility violations (axe)', async ({ page }) => {
  await page.goto('./');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('has no horizontal scroll on a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('./');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});
