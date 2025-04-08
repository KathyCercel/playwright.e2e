import { Page } from '@playwright/test';

const loginPage = {
    loginSelect: (page: Page) => page.locator('[data-qa-id="login-select"]'),
    loginHudl: (page: Page) => page.locator('[data-qa-id="login-hudl"]'),
    emailInput: (page: Page) => page.locator('#username'),
    continueWithEmailButton: (page: Page) => page.locator('button._button-login-id'),
    passwordInput: (page: Page) => page.locator('#password'),
    continueWithPasswordButton: (page: Page) => page.locator('button._button-login-password'),
    forgotPasswordLink: (page: Page) => page.getByRole('link', { name: /Forgot password/i }),
    alertMessage: (page: Page) => page.locator('[role="alert"]'),
    navbar: (page: Page) => page.locator('[data-qa-id="gloabl-navbar"]'),
    uploadBtn: (page: Page) => page.locator('[data-qa-id="webnav-globalnav-upload"]'),
    mainHeader: (page: Page) => page.locator('h1'),
    recentActivity: (page: Page) => page.locator('[data-qa-id="recent-activity"]'),
    searchInput: (page: Page) => page.locator('input[type="search"]'),
    createTeamButton: (page: Page) => page.locator('[data-qa-id="create-team"]')
};

export default loginPage;
