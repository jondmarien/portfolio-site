const { expect, test } = require('@playwright/test');

test.setTimeout(60000);

async function waitForAsciiLayer(page) {
  await expect
    .poll(
      () =>
        page.evaluate(() => {
          const filters = [...document.querySelectorAll('.ascii-filter')];
          const liveFilter = filters.find((filter) => {
            const base = filter.querySelector('.ascii-filter-pre-base');
            const accent = filter.querySelector('.ascii-filter-pre-accent');
            return Boolean(base?.textContent.trim()) && Boolean(accent?.textContent.trim());
          });
          const base = liveFilter?.querySelector('.ascii-filter-pre-base');
          const accent = liveFilter?.querySelector('.ascii-filter-pre-accent');

          return Boolean(base?.textContent.trim()) && base.textContent === accent?.textContent;
        }),
      { timeout: 15000 },
    )
    .toBe(true);
}

async function getAsciiAlignment(page) {
  return page.evaluate(() => {
    const alias = document.querySelector('.hero-alias');
    const fallback = document.querySelector('.hero-alias-fallback');
    const liveFilter = [...document.querySelectorAll('.ascii-filter')].find((filter) => {
      const baseLayer = filter.querySelector('.ascii-filter-pre-base');
      const accentLayer = filter.querySelector('.ascii-filter-pre-accent');
      return Boolean(baseLayer?.textContent.trim()) && Boolean(accentLayer?.textContent.trim());
    });
    const base = liveFilter?.querySelector('.ascii-filter-pre-base');
    const accent = liveFilter?.querySelector('.ascii-filter-pre-accent');
    if (!alias || !fallback || !base || !accent) return null;

    const aliasRect = alias.getBoundingClientRect();
    const baseRect = base.getBoundingClientRect();
    const accentRect = accent.getBoundingClientRect();
    const fallbackStyle = getComputedStyle(fallback);
    const baseStyle = getComputedStyle(base);
    const accentStyle = getComputedStyle(accent);

    return {
      baseToAccentLeft: Math.abs(baseRect.left - accentRect.left),
      baseToAccentTop: Math.abs(baseRect.top - accentRect.top),
      baseToAccentWidth: Math.abs(baseRect.width - accentRect.width),
      baseToAccentHeight: Math.abs(baseRect.height - accentRect.height),
      baseToAliasLeft: baseRect.left - aliasRect.left,
      baseToAliasTop: baseRect.top - aliasRect.top,
      accentToAliasLeft: accentRect.left - aliasRect.left,
      accentToAliasTop: accentRect.top - aliasRect.top,
      fallbackOpacity: Number(fallbackStyle.opacity),
      baseZIndex: Number(baseStyle.zIndex),
      accentZIndex: Number(accentStyle.zIndex),
      backgroundAttachment: accentStyle.backgroundAttachment,
      mixBlendMode: accentStyle.mixBlendMode,
      sameText: base.textContent === accent.textContent && accent.textContent.trim().length > 0,
    };
  });
}

test('hero alias remains readable after initial animation time', async ({ page }, testInfo) => {
  await page.goto('/');
  await waitForAsciiLayer(page);
  await page.waitForTimeout(3000);

  const heroAliasIsReadable = await page.evaluate(() => {
    const alias = document.querySelector('.hero-alias');
    const ascii = document.querySelector('.ascii-filter-pre-accent');
    const fallback = document.querySelector('.hero-alias-fallback');
    if (!alias) {
      return false;
    }

    if (!ascii) {
      return Number(getComputedStyle(fallback).opacity) > 0;
    }

    const asciiRect = ascii.getBoundingClientRect();
    const aliasRect = alias.getBoundingClientRect();
    return asciiRect.width <= aliasRect.width + 1 && asciiRect.height <= aliasRect.height + 1;
  });

  expect(heroAliasIsReadable, `${testInfo.project.name} hero alias should remain readable`).toBe(true);
});

test('hero alias remains readable after loading at a section hash', async ({ page }, testInfo) => {
  await page.goto('/#projects');
  await page.evaluate(() => window.scrollTo(0, 0));
  await waitForAsciiLayer(page);
  await page.waitForTimeout(1000);

  const heroAliasIsReadable = await page.evaluate(() => {
    const alias = document.querySelector('.hero-alias');
    const ascii = document.querySelector('.ascii-filter-pre-accent');
    const fallback = document.querySelector('.hero-alias-fallback');
    if (!alias) {
      return false;
    }

    if (!ascii) {
      return Number(getComputedStyle(fallback).opacity) > 0;
    }

    const asciiRect = ascii.getBoundingClientRect();
    const aliasRect = alias.getBoundingClientRect();
    return asciiRect.width <= aliasRect.width + 1 && asciiRect.height <= aliasRect.height + 1;
  });

  expect(heroAliasIsReadable, `${testInfo.project.name} hero alias should survive hash-route load`).toBe(true);
});

test('hero ASCII layers stay aligned through scroll without fixed blended text', async ({ page }, testInfo) => {
  await page.goto('/');
  await waitForAsciiLayer(page);
  await page.waitForTimeout(1000);

  const before = await getAsciiAlignment(page);
  expect(before, `${testInfo.project.name} should render base and accent ASCII layers`).not.toBeNull();
  expect(before.sameText).toBe(true);
  expect(before.baseToAccentLeft).toBeLessThanOrEqual(1);
  expect(before.baseToAccentTop).toBeLessThanOrEqual(1);
  expect(before.baseToAccentWidth).toBeLessThanOrEqual(1);
  expect(before.baseToAccentHeight).toBeLessThanOrEqual(1);
  expect(before.fallbackOpacity).toBeLessThanOrEqual(0.05);
  expect(before.baseZIndex).toBeGreaterThan(before.accentZIndex);
  expect(before.backgroundAttachment).not.toBe('fixed');
  expect(before.mixBlendMode).not.toBe('difference');

  await page.evaluate(() => window.scrollTo(0, 420));
  await page.waitForTimeout(250);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);

  const after = await getAsciiAlignment(page);
  expect(after, `${testInfo.project.name} should keep both ASCII layers after scroll`).not.toBeNull();
  expect(after.sameText).toBe(true);
  expect(after.baseToAccentLeft).toBeLessThanOrEqual(1);
  expect(after.baseToAccentTop).toBeLessThanOrEqual(1);
  expect(after.baseToAccentWidth).toBeLessThanOrEqual(1);
  expect(after.baseToAccentHeight).toBeLessThanOrEqual(1);
  expect(Math.abs(after.baseToAliasLeft - before.baseToAliasLeft)).toBeLessThanOrEqual(1);
  expect(Math.abs(after.baseToAliasTop - before.baseToAliasTop)).toBeLessThanOrEqual(1);
  expect(Math.abs(after.accentToAliasLeft - before.accentToAliasLeft)).toBeLessThanOrEqual(1);
  expect(Math.abs(after.accentToAliasTop - before.accentToAliasTop)).toBeLessThanOrEqual(1);
  expect(after.fallbackOpacity).toBeLessThanOrEqual(0.05);
  expect(after.baseZIndex).toBeGreaterThan(after.accentZIndex);
});
