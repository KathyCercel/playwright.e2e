import { Page, expect } from '@playwright/test';

const navbar = {
    globalNavbar: (page: Page) => page.locator('[data-qa-id="gloabl-navbar"]'),
    homeButton: (page: Page) => page.getByRole('link', { name: 'Home' }),
    watchNowButton: (page: Page) => page.getByRole('link', { name: /Watch Now/i }),
    onbordingCalendarButton: (page: Page) => page.locator('[data-qa-id="onboarding-content-calendar"]').first(),
    notificationButton: (page: Page) => page.locator('[data-qa-id="webnav-globalnav-notifications"]'),
    profileDropDown: (page: Page) => page.locator('.hui-globaluseritem__avatar h5'),
    logoutDropDOwn: (page: Page) => page.locator('[data-qa-id="webnav-usermenu-logout"]'),
    teamSwitchMenu: (page: Page) => page.locator('[data-qa-id="webnav-teamswitcher-menu"]'),
    libraryButton: (page: Page) => page.locator('[data-qa-id="webnav-primarynav-video"]'),
    reportsButton: (page: Page) => page.locator('[data-qa-id="webnav-primarynav-reports"]'),
    teamsButton: (page: Page) => page.locator('[data-qa-id="webnav-primarynav-team"]'),
    hightlightsButton: (page: Page) => page.locator('[data-qa-id="webnav-primarynav-highlights"]'),
    recrutingButton: (page: Page) => page.locator('[data-qa-id="webnav-primarynav-recruiting"]'),
    globalUploadButton: (page: Page) => page.locator('a[data-qa-id="webnav-globalnav-upload"]:visible').first(),
    messagesButton: (page: Page) => page.locator('a[data-qa-id="webnav-globalnav-messages"]:visible').first(),

    async assertNavigation(page: Page, locator: ReturnType<Page['locator']>, expected: string | RegExp) {
        const element = await locator;
        await expect(element).toHaveCount(1);
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
        await element.scrollIntoViewIfNeeded();
        await element.hover();
        await Promise.all([
            page.waitForNavigation({ url: expected }),
            element.click()
        ]);
        await expect(page).toHaveURL(expected);
    },

    async assertLogoutVisible(page: Page) {
        const profileInitials = navbar.profileDropDown(page);
        await expect(profileInitials).toBeVisible({ timeout: 5000 });
        await profileInitials.click();

        const logoutLink = page
            .locator('div.hui-globaladditionalitems')
            .locator('a.hui-globalusermenu__item', { hasText: 'Log Out' })
            .first();

        await expect(logoutLink).toBeVisible({ timeout: 5000 });
        await expect(logoutLink).toHaveText('Log Out');
    }
};

export default navbar;
