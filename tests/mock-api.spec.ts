import { test, expect } from '@playwright/test';
import productList from '../mocks/productList.json';

test('Mock API and validate UI', async ({ page }) => {
  // Intercept API call and mock response
  await page.route('**/api/products', async route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productList),
    });
  });

  // Navigate to test page
  await page.goto('https://demo.opencart.com');

  // Assert mocked products appear - adjust this for real selectors
  for (const product of productList) {
    await expect(page.getByText(product.title)).toBeVisible();
  }
});