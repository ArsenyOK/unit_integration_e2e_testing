import { test, expect } from './fixtures/coverage';

test('user can add product and checkout with SAVE10', async ({ page }) => {
  await page.goto('/products');

  // добавить товар
  await page.getByRole('button', { name: /Add to cart/i }).first().click();

  // убедиться, что в хедере счётчик изменился
  await expect(page.getByRole('link', { name: /^Cart/ })).toContainText('(1)');

  // перейти в корзину
  await page.getByRole('link', { name: /^Cart/ }).click();

  // применить купон
  await page.getByPlaceholder(/SAVE10/).fill('SAVE10');
  await page.getByRole('button', { name: /Apply/i }).click();

  // скидка видна
  await expect(page.getByText(/Discount:/)).toBeVisible();

  // оформить заказ
  await page.getByRole('button', { name: /Checkout/ }).click();
  await expect(page.getByText(/Order placed successfully/)).toBeVisible();
});
