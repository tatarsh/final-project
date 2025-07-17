import { test, expect } from '@playwright/test';
import { mockRoutes } from '../utils/mock-routes';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('SauceDemo POM Automation with Mocks', () => {
  test.beforeEach(async ({ page }) => {
    await mockRoutes(page);
    await page.goto('https://www.saucedemo.com/');
  });

  test('should login and add item to cart using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/cart/);
    const itemName = await cartPage.getItemNameText();
    expect(itemName).toContain('Sauce Labs Backpack');
  });
});