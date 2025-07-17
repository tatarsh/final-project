import { Page } from '@playwright/test';
import productsData from '../mocks/products.json';
import cartData from '../mocks/cart.json';

export async function mockRoutes(page: Page) {
  await page.route('**/inventory_items.json', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(productsData),
    })
  );

  await page.route('**/cart.json', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(cartData),
    })
  );
}