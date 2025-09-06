import fs from 'fs';
import path from 'path';
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);
    const cov = await page.evaluate(() => (globalThis as any).__coverage__);
    if (cov) {
      const out = path.join(process.cwd(), '.nyc_output');
      await fs.promises.mkdir(out, { recursive: true });
      const name = testInfo.title.replace(/[^a-z0-9_-]/gi, '_');
      const file = path.join(out, `pw-${name}.json`);
      await fs.promises.writeFile(file, JSON.stringify(cov), 'utf-8');
      console.log('[coverage] wrote', file);
    } else {
      console.log('[coverage] window.__coverage__ is undefined');
    }
  }
});
export { expect };
