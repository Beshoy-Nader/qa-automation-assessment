import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Location of Playwright test files
  testDir: './playwright/tests',

  // Maximum time allowed for a single test
  timeout: 30 * 1000,

  // Allow tests in different files to run in parallel
  fullyParallel: true,

  // Fail CI if test.only was accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 2 : 0,

  // Use a single worker in CI for more stable execution
  workers: 1,

  // Test reports
  reporter: [
    ['html', { outputFolder: './results/playwright' }],
    ['list'],
    ['json', { outputFile: './results/playwright-results.json' }],
  ],

  // Shared configuration
  use: {
    // Base URL for SauceDemo
    baseURL: 'https://www.saucedemo.com',

    // Capture trace when a test fails and is retried
    trace: 'on-first-retry',

    // Capture screenshot when a test fails
    screenshot: 'only-on-failure',

    // Keep video only for failed tests
    video: 'retain-on-failure',
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});