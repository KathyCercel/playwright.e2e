import { Page, expect } from '@playwright/test';

const homePage = {
  homeLink: (page: Page) => page.getByRole('link', { name: 'Home' }),
  mainHeader: (page: Page) => page.locator('h1'),
  teamsSection: (page: Page) => page.locator('[data-qa-id="team-section"]'),
  quickLinks: (page: Page) => page.locator('[data-qa-id="quick-links"]'),
  recentActivity: (page: Page) => page.locator('[data-qa-id="recent-activity"]'),
  searchInput: (page: Page) => page.locator('input[type="search"]'),
  createTeamButton: (page: Page) => page.locator('[data-qa-id="create-team"]'),
  uploadBtns: (page: Page) => page.locator('a[data-qa-id="webnav-globalnav-upload"]'),

  async expectMainHeaderVisible(page: Page) {
    await expect(homePage.mainHeader(page)).toBeVisible();
  },

  async expectTeamsSectionVisible(page: Page) {
    await expect(homePage.teamsSection(page)).toBeVisible();
  },

  async expectQuickLinksVisible(page: Page) {
    await expect(homePage.quickLinks(page)).toBeVisible();
  },

  async expectRecentActivityVisible(page: Page) {
    await expect(homePage.recentActivity(page)).toBeVisible();
  },

  async expectCreateTeamButtonVisible(page: Page) {
    await expect(homePage.createTeamButton(page)).toBeVisible();
  },

  async expectUploadButtonEnabled(page: Page) {
    const uploadButtons = homePage.uploadBtns(page);
    const count = await uploadButtons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const uploadBtn = uploadButtons.nth(i);
      const isVisible = await uploadBtn.isVisible();
      const href = await uploadBtn.getAttribute('href');
      if (isVisible && href?.includes('/upload')) {
        expect(href).toContain('/upload');
        return;
      }
    }
    throw new Error('No visible upload button with correct href found.');
  },

  async searchFromHome(page: Page, value: string) {
    const input = homePage.searchInput(page);
    await expect(input).toBeVisible();
    await input.fill(value);
    await expect(input).toHaveValue(value);
  }
};

export default homePage;
