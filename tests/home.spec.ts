import { test, expect } from '@playwright/test';
import homePage from '../pages/homePage';

test.use({ storageState: 'storageState.json' });

test.describe('Hudl Home Page - UI Visibility & Functional Checks', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.hudl.com/home');
        await page.waitForLoadState('networkidle');
    });

    test('Verify user can see main header on home page', async ({ page }) => {
        const mainHeader = homePage.mainHeader(page);
        await expect(mainHeader).toBeVisible();
    });

    test('Verify user can see team section', async ({ page }) => {
        const teamsSection = homePage.teamsSection(page);
        await expect(teamsSection).toBeVisible();
    });

    test('Verify user can see quick links', async ({ page }) => {
        const quickLinks = homePage.quickLinks(page);
        await expect(quickLinks).toBeVisible();
    });

    test('Verify user can view recent activity', async ({ page }) => {
        const recentActivity = homePage.recentActivity(page);
        await expect(recentActivity).toBeVisible();
    });

    test('Verify user can search from home page', async ({ page }) => {
        const search = homePage.searchInput(page);
        await expect(search).toBeVisible();
        await search.fill('test search');
        await expect(search).toHaveValue('test search');
    });

    test('Verify user can see the Create Team button', async ({ page }) => {
        const createTeamButton = homePage.createTeamButton(page);
        await expect(createTeamButton).toBeVisible();
        await expect(createTeamButton).toHaveText(/create team/i);
    });
});
