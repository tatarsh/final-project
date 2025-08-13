import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { HomeAssertions } from '../pages/home/homeAssertion';
import { CartAssertions } from '../pages/cart/cartAssertion';
import { TestUtils } from './utils/testUtils';
import { testData } from '../fixture/testData';

test.describe('User Shopping Flow - End-to-End Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let cartPage: CartPage;
  let homeAssert: HomeAssertions;
  let cartAssert: CartAssertions;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    homeAssert = new HomeAssertions(page);
    cartAssert = new CartAssertions(page);
  });

  test('Complete shopping flow - login, browse, add to cart, checkout', async ({ page }) => {
    /*
     * Test Case: Complete End-to-End Shopping Flow
     * Objective: Verify the complete user journey from login to checkout completion
     * Test Steps:
     * 1. Navigate to login page
     * 2. Login with valid credentials
     * 3. Browse inventory and sort products
     * 4. Add products to cart
     * 5. Navigate to cart and verify items
     * 6. Proceed to checkout
     * 7. Complete checkout process
     * Expected Results:
     * - User should successfully complete entire shopping flow
     * - All pages should load correctly
     * - Cart should maintain state throughout
     * - Checkout should complete successfully
     */
    TestUtils.logTestStep('Starting complete end-to-end shopping flow test');

    // Step 1: Login
    await page.goto(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await TestUtils.verifyURLContains(page, 'inventory.html');
    TestUtils.logTestStep('Successfully logged in and navigated to inventory');

    // Step 2: Browse and sort products
    await homePage.waitForProductsToLoad();
    const productCount = await homePage.getProductCount();
    expect(productCount).toBe(6);
    TestUtils.logTestStep(`Inventory page loaded with ${productCount} products`);

    // Sort products by name (A to Z)
    await homePage.sortProducts(testData.sortOptions.nameAsc);
    TestUtils.logTestStep('Products sorted by name (A to Z)');

    // Step 3: Add products to cart
    await homePage.addBackpackToCart();
    await homePage.addBikeLightToCart();
    await homeAssert.verifyCartCount(2);
    TestUtils.logTestStep('Added 2 products to cart');

    // Step 4: Navigate to cart and verify
    await homePage.goToCart();
    await TestUtils.verifyURLContains(page, 'cart.html');
    await cartAssert.verifyItemInCartByName(testData.products.sauceLabsBackpack.name);
    await cartAssert.verifyItemInCartByName(testData.products.sauceLabsBikeLight.name);
    TestUtils.logTestStep('Cart page loaded with correct items');

    // Step 5: Proceed to checkout
    await cartPage.proceedToCheckout();
    await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    TestUtils.logTestStep('Navigated to checkout information page');

    // Step 6: Fill checkout information
    const checkoutPage = new (await import('../pages/checkout/checkout')).CheckoutPage(page);
    await checkoutPage.fillCheckoutInformation(
      testData.checkoutData.valid.firstName,
      testData.checkoutData.valid.lastName,
      testData.checkoutData.valid.postalCode
    );
    await checkoutPage.continueToOverview();
    await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    TestUtils.logTestStep('Checkout information submitted successfully');

    // Step 7: Complete checkout
    await checkoutPage.finishCheckout();
    await TestUtils.verifyURLContains(page, 'checkout-complete.html');
    TestUtils.logTestStep('Checkout completed successfully');

    // Step 8: Navigate back to inventory
    await checkoutPage.goBackToCart();
    await cartPage.continueShopping();
    await TestUtils.verifyURLContains(page, 'inventory.html');
    await homePage.waitForProductsToLoad();
    TestUtils.logTestStep('Successfully returned to inventory page');

    TestUtils.logTestStep('Complete end-to-end shopping flow test passed successfully');
  });

  test('Quick smoke test - basic functionality verification', async ({ page }) => {
    /*
     * Test Case: Quick Smoke Test
     * Objective: Verify basic functionality works correctly
     * Test Steps:
     * 1. Login to application
     * 2. Sort products
     * 3. Add item to cart
     * 4. Verify cart count
     * 5. Go to cart and verify item
     * Expected Results:
     * - Basic functionality should work without errors
     * - Cart should function correctly
     * - Navigation should work properly
     */
    TestUtils.logTestStep('Starting quick smoke test');

    // Login
    await page.goto(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await homePage.waitForProductsToLoad();

    // Sort and add to cart
    await homePage.sortProducts(testData.sortOptions.nameAsc);
    await homePage.addBackpackToCart();
    await homeAssert.verifyCartCount(1);

    // Verify cart
    await homePage.goToCart();
    await cartAssert.verifyItemInCart();

    TestUtils.logTestStep('Quick smoke test passed successfully');
  });

  test('Performance test - page load times', async ({ page }) => {
    /*
     * Test Case: Performance Test
     * Objective: Verify pages load within acceptable time limits
     * Test Steps:
     * 1. Measure login page load time
     * 2. Measure inventory page load time
     * 3. Measure cart page load time
     * Expected Results:
     * - All pages should load within reasonable time
     * - No performance degradation should occur
     */
    TestUtils.logTestStep('Starting performance test');

    // Measure login page load
    const loginStartTime = Date.now();
    await page.goto(testData.baseURL);
    await loginPage.waitForLoginForm();
    const loginLoadTime = Date.now() - loginStartTime;
    TestUtils.logTestStep(`Login page loaded in ${loginLoadTime}ms`);

    // Measure inventory page load
    const inventoryStartTime = Date.now();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await homePage.waitForProductsToLoad();
    const inventoryLoadTime = Date.now() - inventoryStartTime;
    TestUtils.logTestStep(`Inventory page loaded in ${inventoryLoadTime}ms`);

    // Measure cart page load
    const cartStartTime = Date.now();
    await homePage.addBackpackToCart();
    await homePage.goToCart();
    await cartPage.waitForCartToLoad();
    const cartLoadTime = Date.now() - cartStartTime;
    TestUtils.logTestStep(`Cart page loaded in ${cartLoadTime}ms`);

    // Performance assertions (adjust thresholds as needed)
    expect(loginLoadTime).toBeLessThan(5000);
    expect(inventoryLoadTime).toBeLessThan(8000);
    expect(cartLoadTime).toBeLessThan(5000);

    TestUtils.logTestStep('Performance test completed successfully');
  });
});

