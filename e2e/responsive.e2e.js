const { expect, test } = require('@playwright/test');

const mobileBreakpoint = 768;

test.describe('responsive portfolio layout', () => {
  test('keeps core content reachable without horizontal overflow', async ({ page }, testInfo) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1, name: /jon marien/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /security research/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /projects/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /community/i })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: /contact/i })).toBeVisible();

    const asciiFitsHeroFrame = await page.evaluate(() => {
      const alias = document.querySelector('.hero-alias');
      const ascii = document.querySelector('.ascii-text-container pre');
      if (!alias || !ascii) {
        return true;
      }

      return ascii.scrollWidth <= alias.clientWidth + 8 && ascii.scrollHeight <= alias.clientHeight + 8;
    });
    expect(asciiFitsHeroFrame, `${testInfo.project.name} ASCII hero text should fit its frame`).toBe(true);

    const hasHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth + 2;
    });
    expect(hasHorizontalOverflow, `${testInfo.project.name} should not overflow horizontally`).toBe(false);
  });

  test('uses the correct navigation pattern for desktop and mobile', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();

    if (viewport.width <= mobileBreakpoint) {
      const menuButton = page.getByRole('button', { name: 'Menu', exact: true });
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeHidden();
      await expect(page.getByLabel('Sidebar links')).toBeHidden();

      await menuButton.click();
      await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      await expect(page.getByRole('navigation', { name: /mobile navigation/i })).toBeVisible();

      await page.keyboard.press('Escape');
      await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await expect(menuButton).toBeFocused();
      await expect(page.getByRole('contentinfo')).toContainText('github');
      await expect(page.getByRole('contentinfo')).toContainText('jon@d-sports.org');
      return;
    }

    await expect(page.getByLabel('Portfolio sidebar')).toBeVisible();
    await expect(page.getByRole('navigation', { name: /primary navigation/i })).toBeVisible();
  });

  test('activates contact navigation when scrolled to the document bottom', async ({ page }) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    await page.mouse.move(viewport.width / 2, viewport.height / 2);
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(() => {
          const contact = document.getElementById('contact');
          return Boolean(contact && contact.getBoundingClientRect().top < window.innerHeight);
        }),
      )
      .toBe(true);

    if (viewport.width <= mobileBreakpoint) {
      const menuButton = page.getByRole('button', { name: 'Menu', exact: true });
      await expect(menuButton).toBeVisible();
      await page.evaluate(() => document.querySelector('.mobile-menu-toggle')?.click());
      await expect(page.getByRole('navigation', { name: /mobile navigation/i }).getByRole('link', { name: /contact/i })).toHaveAttribute(
        'aria-current',
        'location',
      );
      return;
    }

    await expect(page.getByRole('navigation', { name: /primary navigation/i }).getByRole('link', { name: /contact/i })).toHaveAttribute(
      'aria-current',
      'location',
    );
  });

  test('keeps image preview controls usable on small viewports', async ({ page }) => {
    await page.goto('/');

    await page.getByAltText('Portrait of Jon Marien').click();

    await expect(page.getByRole('dialog', { name: /portrait of jon marien/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /close image preview/i })).toBeVisible();
  });

  test('lets expanded project details use the available mobile width', async ({ page }, testInfo) => {
    await page.goto('/');
    const viewport = page.viewportSize();
    if (viewport.width > mobileBreakpoint) {
      test.skip();
    }

    const detailsButton = page.getByRole('button', { name: /show details about automotive security capstone/i });
    await detailsButton.click();

    const mobileDetailsUseAvailableWidth = await page.evaluate(() => {
      const project = Array.from(document.querySelectorAll('.project-item')).find((item) =>
        item.querySelector('button[aria-label*="Automotive Security Capstone"]'),
      );
      const content = project?.querySelector('.project-card-content');
      if (!project || !content) {
        return false;
      }

      return content.getBoundingClientRect().width >= project.getBoundingClientRect().width * 0.9;
    });

    expect(mobileDetailsUseAvailableWidth, `${testInfo.project.name} expanded project details should not be squeezed`).toBe(true);
  });
});
