import { expect, Page } from '@playwright/test';
import loginPage from '../pages/loginPage'

export const logout = async (page: Page) => {
    await page.waitForSelector('[aria-labelledby="uiexpandregionverticalTitle"]', { timeout: 10000 });
    const dropdownIcon = page.locator('svg[aria-labelledby="uiexpandregionverticalTitle"]');
    await dropdownIcon.hover();

    const logoutLink = page.locator('a[data-qa-id="webnav-usermenu-logout"]');
    await logoutLink.waitFor({ state: 'visible', timeout: 5000 });
    await logoutLink.click();
};

export const loginFromHomePage = async (page: Page) => {
    await page.goto('https://www.hudl.com');
    await page.locator('[data-qa-id="login-select"]').click();
    await page.locator('[data-qa-id="login-hudl"]').click();

    await page.waitForURL(/identity\.hudl\.com.*login/);
}

export const login = async (page: Page, email: string, password: string) => {
    await page.goto('https://www.hudl.com');

    loginFromHomePage(page);

    const emailInput = await loginPage.emailInput(page);
    emailInput.waitFor({ state: 'visible' });
    emailInput.fill(email);

    const continueEmailButton = await loginPage.continueWithEmailButton(page)
    continueEmailButton.click();

    const passwordInput = await loginPage.passwordInput(page)
    passwordInput.waitFor({ state: 'visible' });
    passwordInput.fill(password);

    const continuePasswordButton = await loginPage.continueWithPasswordButton(page)
    continuePasswordButton.click();

    await page.waitForLoadState('networkidle');
    await page.goto('https://www.hudl.com/home');
};

export const validateUserInitials = async (page: Page) => {
    const userInitials = page.getByRole('heading', { level: 5 });
    const count = await userInitials.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
        const initials = await userInitials.nth(i).innerText();
        expect(initials).toMatch(/^[A-Z]{1,3}$/);
    }
};

