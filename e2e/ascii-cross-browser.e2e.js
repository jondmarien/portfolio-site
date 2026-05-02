const { expect, test } = require('@playwright/test');

test('hero alias remains readable after initial animation time', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(document.querySelector('.ascii-text-container pre')) ||
        Number(getComputedStyle(document.querySelector('.hero-alias-fallback')).opacity) > 0,
      ),
      { timeout: 15000 },
    )
    .toBe(true);
  await page.waitForTimeout(3000);

  const heroAliasIsReadable = await page.evaluate(() => {
    const alias = document.querySelector('.hero-alias');
    const ascii = document.querySelector('.ascii-text-container pre');
    const fallback = document.querySelector('.hero-alias-fallback');
    if (!alias) {
      return false;
    }

    if (!ascii) {
      return Number(getComputedStyle(fallback).opacity) > 0;
    }

    return ascii.scrollWidth <= alias.clientWidth + 8 && ascii.scrollHeight <= alias.clientHeight + 8;
  });

  expect(heroAliasIsReadable, `${testInfo.project.name} hero alias should remain readable`).toBe(true);
});
