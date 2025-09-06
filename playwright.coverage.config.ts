
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:4200', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'ng serve --port 4220',  
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
});
