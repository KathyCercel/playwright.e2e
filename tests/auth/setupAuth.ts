import { chromium } from '@playwright/test';
import { login } from '../../helpers/login';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.HUDL_EMAIL || '';
const PASSWORD = process.env.HUDL_PASSWORD || '';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await login(page, EMAIL, PASSWORD);

        const storageState = await context.storageState();
        fs.writeFileSync('storageState.json', JSON.stringify(storageState));
        console.log('✅ Authenticated session saved to storageState.json');
    } catch (error) {
        console.error('❌ Failed to log in and save storage state:', error);
    } finally {
        await browser.close();
    }
})();
