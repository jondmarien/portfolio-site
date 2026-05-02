const { defineConfig, devices } = require('@playwright/test');

const baseURL = 'http://127.0.0.1:5173';
const responsiveTestMatch = '**/responsive.e2e.js';
const asciiTestMatch = '**/ascii-cross-browser.e2e.js';

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: process.env.CI ? 'list' : 'html',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop-1280',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'desktop-1440',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'tablet-820',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 820, height: 1180 },
      },
    },
    {
      name: 'boundary-767',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 767, height: 900 },
      },
    },
    {
      name: 'boundary-769',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 769, height: 900 },
      },
    },
    {
      name: 'mobile-390',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: 'mobile-375',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },
    {
      name: 'mobile-landscape',
      testMatch: responsiveTestMatch,
      use: {
        ...devices['Pixel 5 landscape'],
        viewport: { width: 844, height: 390 },
      },
    },
    {
      name: 'ascii-chromium',
      testMatch: asciiTestMatch,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'ascii-firefox',
      testMatch: asciiTestMatch,
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'ascii-webkit',
      testMatch: asciiTestMatch,
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
  webServer: {
    command: 'bun run dev -- --host 127.0.0.1 --port 5173',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
