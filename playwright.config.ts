// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({
  testDir: './tests',
  timeout: 7000,
  expect: { //assertions timeouts:
    timeout: 3000,
  },
  reporter: 'html',
  use: {
      launchOptions: {
        args: ['--disable-cache']
      // args:['--start-maximized'],
      },
    browserName: 'chromium',
    // Default = headed
    // HEADLESS=true → headless
    headless: process.env.HEADLESS === 'true'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  
  ],

});
module.exports = config
