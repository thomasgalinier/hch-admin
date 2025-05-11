import { defineConfig, devices } from '@playwright/test';
import path from "path";

export default defineConfig({
  testDir: './playwright/tests',
  timeout: 30 * 1000,
  retries: 2,
  globalSetup: require.resolve('./playwright/global-setup'),

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    trace: 'on-first-retry',
    storageState: path.resolve(__dirname, './playwright/.auth/admin.json'),
  },
  projects: [
    { name: 'chromium', use: devices['Desktop Chrome'] },
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'webkit', use: devices['Desktop Safari'] },
  ],

});