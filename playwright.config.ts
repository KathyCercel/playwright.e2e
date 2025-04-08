import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    baseURL: 'https://www.hudl.com',
    storageState: 'storageState.json',
  },
  projects: [
    {
      name: '🟦 Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: '🦊 Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: '🍎 Safari (WebKit)',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: '📱 Mobile Chrome (Pixel 5)',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: '📱 Mobile Safari (iPhone 12)',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: '🧊 Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: '🌐 Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
