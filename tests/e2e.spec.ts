import { test, expect } from '@playwright/test';

test.use({ storageState: 'storageState.json' });

test.describe('Hudl Home Page - User Flow & Visibility Checks', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.hudl.com/home');
        await page.waitForLoadState('networkidle');
    });


    const selectors = {
        mainHeader: 'h1',
        teamsSection: '[data-qa-id="team-section"]',
        quickLinks: '[data-qa-id="quick-links"]',
        recentActivity: '[data-qa-id="recent-activity"]',
        searchInput: 'input[type="search"]',
        createTeamButton: '[data-qa-id="create-team"]',
        uploadButton: '[data-qa-id="webnav-globalnav-upload"]',
        messageButton: '[data-qa-id="webnav-globalnav-messages"]'
    };

    test('Verify user can see and interact with main elements on home page', async ({ page }) => {
        await expect(page.locator(selectors.mainHeader)).toBeVisible();
        await expect(page.locator(selectors.teamsSection)).toBeVisible();
        await expect(page.locator(selectors.quickLinks)).toBeVisible();
        await expect(page.locator(selectors.recentActivity)).toBeVisible();
    });

    test('Verify user can use search bar', async ({ page }) => {
        const search = page.locator(selectors.searchInput);
        await expect(search).toBeVisible();
        await search.fill('Highlights');
        await search.press('Enter');
        await page.waitForLoadState('networkidle');
        await expect(page).not.toHaveURL('https://www.hudl.com/home');
    });

    test('Verify user can navigate to upload page and return back', async ({ page }) => {
        await page.locator(selectors.uploadButton).click();
        await expect(page).toHaveURL('https://www.hudl.com/upload');
        await page.goBack();
        await expect(page).toHaveURL('https://www.hudl.com/home');
    });

    test('Verify user can open messaging and come back', async ({ page }) => {
        await page.locator(selectors.messageButton).click();
        await expect(page.url()).toContain('app.hudl.com/messaging');
        await page.goBack();
        await expect(page.url()).toContain('hudl.com/home');
    });

    test('E2E: User logs in, uses search, navigates, and logs out', async ({ page }) => {
        await expect(page).toHaveURL('https://www.hudl.com/home');
        const search = page.locator(selectors.searchInput);
        await search.fill('Game Review');
        await search.press('Enter');
        await page.waitForLoadState('networkidle');

        await page.locator(selectors.uploadButton).click();
        await expect(page).toHaveURL('https://www.hudl.com/upload');
        await page.goBack();

        const profileIcon = page.locator('svg[aria-labelledby="uiexpandregionverticalTitle"]');
        await profileIcon.hover();
        const logout = page.locator('a[data-qa-id="webnav-usermenu-logout"]');
        await logout.click();
        await expect(page).toHaveURL(/login/);
    });
});
