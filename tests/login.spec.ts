import { test, expect } from '@playwright/test';
import loginPage from '../pages/loginPage';
import { validateUserInitials } from '../helpers/login';

test.use({ storageState: 'storageState.json' });

test.describe('User Dashboard', () => {
  test('should display dashboard with key UI elements', async ({ page }) => {
    await page.goto('https://www.hudl.com/home');

    const navbar = await loginPage.navbar(page);
    await expect(navbar).toBeVisible({ timeout: 5000 });

    const watchNow = page.getByRole('link', { name: /Watch Now/i });
    await expect(watchNow).toBeVisible();
    await expect(watchNow).toHaveAttribute('href', expect.stringContaining('fan.hudl.com'));

    await validateUserInitials(page);
  });
});
