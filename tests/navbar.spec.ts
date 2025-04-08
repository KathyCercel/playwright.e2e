import { test } from '@playwright/test';
import navbar from '../pages/navbar';

test.use({ storageState: 'storageState.json' });

test.describe('Dashboard Navbar Navigation', () => {

    test('Verify Home button navigates to /home', async ({ page }) => {
        await page.goto('https://www.hudl.com/upload');
        await navbar.assertNavigation(page, navbar.homeButton(page), 'https://www.hudl.com/home');
    });

    test('Verify Watch Now button navigates to fan.hudl.com', async ({ page }) => {
        await page.goto('https://www.hudl.com/home');
        await navbar.assertNavigation(page, navbar.watchNowButton(page), /fan\.hudl\.com/);
    });

    test('Verify Upload button navigates to /upload', async ({ page }) => {
        await page.goto('https://www.hudl.com/home');
        await navbar.assertNavigation(page, navbar.globalUploadButton(page), 'https://www.hudl.com/upload');
    });

    test('Verify Calendar button navigates to app.hudl.com/calendar', async ({ page }) => {
        await page.goto('https://app.hudl.com');
        await navbar.assertNavigation(page, navbar.onbordingCalendarButton(page), /app\.hudl\.com\/calendar/);
    });

    test('Verify Messages button navigates to app.hudl.com/messaging', async ({ page }) => {
        await page.goto('https://app.hudl.com');
        await navbar.assertNavigation(page, navbar.messagesButton(page), /app\.hudl\.com\/messaging/);
    });

    test('Verify profile dropdown reveals Log Out option', async ({ page }) => {
        await page.goto('https://app.hudl.com');
        await navbar.assertLogoutVisible(page);
    });

});
