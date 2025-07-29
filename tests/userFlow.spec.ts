import { test } from '@playwright/test';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { HomeAssertions } from '../pages/home/homeAssertion';
import { CartAssertions } from '../pages/cart/cartAssertion';
import testData from '../fixture/addToCartData.json';

test.describe('User shopping flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(testData.baseURL);
    await loginPage.login(testData.username, testData.password);
  });

  test('Filter, add to cart and verify', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const homeAssert = new HomeAssertions(page);
    const cartAssert = new CartAssertions(page);

    await homePage.sortProducts(testData.sortOption);
    await homePage.addBackpackToCart();
    await homeAssert.verifyCartCount(1);
    await homePage.goToCart();
    await cartAssert.verifyItemInCart();
  });
});

