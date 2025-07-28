import { test } from '@playwright/test';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { HomeAssertions } from '../pages/home/homeAssertion';
import { CartAssertions } from '../pages/cart/cartAssertion';

test('User can login, filter, add item to cart and verify cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const homeAssert = new HomeAssertions(page);
  const cartAssert = new CartAssertions(page);

  await loginPage.navigate('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
  await homePage.sortProducts('za');
  await homePage.addBackpackToCart();
  await homeAssert.verifyCartCount(1);
  await homePage.goToCart();
  await cartAssert.verifyItemInCart();
});
