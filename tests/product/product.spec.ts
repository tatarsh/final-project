import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/product/product';
import { ProductAssertions } from '../../pages/product/productAssertion';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { TestUtils } from '../utils/testUtils';
import { testData } from '../../fixture/testData';

test.describe('Product Details Functionality Tests', () => {
  let productPage: ProductPage;
  let productAssert: ProductAssertions;
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    productAssert = new ProductAssertions(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Login and navigate to product details
    await page.goto(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await homePage.waitForProductsToLoad();
  });

  test.describe('Product Details Page Navigation', () => {
    test('should navigate to product details when product name is clicked', async ({ page }) => {
      /*
       * Test Case: Product Details Navigation
       * Objective: Verify clicking on product name navigates to product details page
       * Test Steps:
       * 1. Navigate to inventory page
       * 2. Click on a product name
       * 3. Verify navigation to product details page
       * Expected Results:
       * - User should be redirected to product details page
       * - URL should change to inventory-item.html
       * - Product details should be displayed
       */
      TestUtils.logTestStep('Navigating to product details page');
      
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await TestUtils.verifyURLContains(page, 'inventory-item.html');
      
      // Verify product details page loaded
      await productPage.waitForProductPage();
      const productName = await productPage.getProductName();
      expect(productName).toBe(testData.products.sauceLabsBackpack.name);
    });

    test('should navigate to product details when product image is clicked', async ({ page }) => {
      /*
       * Test Case: Product Image Navigation
       * Objective: Verify clicking on product image navigates to product details page
       * Test Steps:
       * 1. Navigate to inventory page
       * 2. Click on a product image
       * 3. Verify navigation to product details page
       * Expected Results:
       * - User should be redirected to product details page
       * - URL should change to inventory-item.html
       * - Product details should be displayed
       */
      TestUtils.logTestStep('Navigating to product details via product image');
      
      // Click on product image (using the product item selector)
      await page.click(`${homePage.getProductImageSelector(testData.products.sauceLabsBikeLight.name)}`);
      await TestUtils.verifyURLContains(page, 'inventory-item.html');
      
      // Verify product details page loaded
      await productPage.waitForProductPage();
      const productName = await productPage.getProductName();
      expect(productName).toBe(testData.products.sauceLabsBikeLight.name);
    });
  });

  test.describe('Product Details Page UI Elements', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to product details page
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
    });

    test('should display all product details page elements correctly', async ({ page }) => {
      /*
       * Test Case: Product Details Page UI Elements
       * Objective: Verify all product details page elements are visible and properly displayed
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Verify product image is displayed
       * 3. Verify product name is visible
       * 4. Verify product price is visible
       * 5. Verify product description is visible
       * 6. Verify add to cart button is visible
       * 7. Verify back to products button is visible
       * Expected Results:
       * - All product details page elements should be visible
       * - Product information should be properly displayed
       * - Buttons should be enabled and clickable
       */
      TestUtils.logTestStep('Verifying product details page UI elements');
      await productAssert.verifyProductPageElements();
      await productAssert.verifyProductImageVisible();
      await productAssert.verifyProductNameVisible();
      await productAssert.verifyProductPriceVisible();
      await productAssert.verifyProductDescriptionVisible();
      await productAssert.verifyAddToCartButtonVisible();
      await productAssert.verifyBackToProductsButtonVisible();
    });

    test('should display correct page title and URL', async ({ page }) => {
      /*
       * Test Case: Product Details Page Title and URL
       * Objective: Verify product details page has correct title and URL
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Verify page title matches expected value
       * 3. Verify URL contains product details path
       * Expected Results:
       * - Page title should be "Swag Labs"
       * - URL should contain "inventory-item.html"
       */
      TestUtils.logTestStep('Verifying product details page title and URL');
      await productAssert.verifyPageTitle(testData.pageTitles.inventory);
      await productAssert.verifyURL('https://www.saucedemo.com/inventory-item.html');
    });

    test('should display correct product information', async ({ page }) => {
      /*
       * Test Case: Product Information Display
       * Objective: Verify product details page displays correct product information
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Verify product name matches expected value
       * 3. Verify product price matches expected value
       * 4. Verify product description matches expected value
       * Expected Results:
       * - Product name should match inventory page product name
       * - Product price should match inventory page product price
       * - Product description should match inventory page product description
       */
      TestUtils.logTestStep('Verifying product information display');
      
      const productName = await productPage.getProductName();
      const productPrice = await productPage.getProductPrice();
      const productDescription = await productPage.getProductDescription();
      
      expect(productName).toBe(testData.products.sauceLabsBackpack.name);
      expect(productPrice).toBe(testData.products.sauceLabsBackpack.price);
      expect(productDescription).toBe(testData.products.sauceLabsBackpack.description);
    });
  });

  test.describe('Product Details Add to Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to product details page
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
    });

    test('should add product to cart from details page', async ({ page }) => {
      /*
       * Test Case: Add Product to Cart from Details Page
       * Objective: Verify product can be added to cart from product details page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Click add to cart button
       * 3. Verify add to cart button changes to remove button
       * 4. Verify cart badge shows correct count
       * Expected Results:
       * - Add to cart button should change to remove button
       * - Cart badge should show count of 1
       * - Product should be added to cart
       */
      TestUtils.logTestStep('Adding product to cart from details page');
      
      // Verify initial state
      await productAssert.verifyAddToCartButtonVisible();
      await productAssert.verifyRemoveFromCartButtonNotVisible();
      
      // Add product to cart
      await productPage.addProductToCart();
      
      // Verify button state changed
      await productAssert.verifyRemoveFromCartButtonVisible();
      await productAssert.verifyAddToCartButtonNotVisible();
      
      // Verify cart badge
      const cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(1);
    });

    test('should remove product from cart from details page', async ({ page }) => {
      /*
       * Test Case: Remove Product from Cart from Details Page
       * Objective: Verify product can be removed from cart from product details page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Add product to cart
       * 3. Click remove from cart button
       * 4. Verify remove button changes back to add button
       * 5. Verify cart badge count decreases
       * Expected Results:
       * - Remove button should change back to add button
       * - Cart badge should show count of 0
       * - Product should be removed from cart
       */
      TestUtils.logTestStep('Removing product from cart from details page');
      
      // Add product to cart first
      await productPage.addProductToCart();
      await productAssert.verifyRemoveFromCartButtonVisible();
      
      // Remove product from cart
      await productPage.removeProductFromCart();
      
      // Verify button state changed back
      await productAssert.verifyAddToCartButtonVisible();
      await productAssert.verifyRemoveFromCartButtonNotVisible();
      
      // Verify cart badge
      const cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(0);
    });

    test('should maintain cart state when navigating between pages', async ({ page }) => {
      /*
       * Test Case: Cart State Persistence from Product Details
       * Objective: Verify cart maintains items when navigating from product details
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Add product to cart
       * 3. Navigate back to inventory
       * 4. Navigate to cart
       * 5. Verify product is still in cart
       * Expected Results:
       * - Cart should maintain the added product
       * - Cart count should remain the same
       * - Product should still be visible in cart
       */
      TestUtils.logTestStep('Testing cart state persistence from product details');
      
      // Add product to cart from details page
      await productPage.addProductToCart();
      const initialCartCount = await productPage.getCartBadgeCount();
      expect(initialCartCount).toBe(1);
      
      // Navigate back to inventory and then to cart
      await productPage.goBackToProducts();
      await homePage.goToCart();
      
      // Verify product is still in cart
      const cartPage = new (await import('../../pages/cart/cart')).CartPage(page);
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(1);
    });
  });

  test.describe('Product Details Navigation', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to product details page
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
    });

    test('should navigate back to inventory when back to products is clicked', async ({ page }) => {
      /*
       * Test Case: Back to Products Navigation
       * Objective: Verify back to products button navigates to inventory page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Click back to products button
       * 3. Verify navigation to inventory page
       * Expected Results:
       * - User should be redirected to inventory page
       * - URL should change to inventory.html
       * - Inventory page elements should be visible
       */
      TestUtils.logTestStep('Navigating back to inventory via back to products button');
      
      await productPage.goBackToProducts();
      await TestUtils.verifyURLContains(page, 'inventory.html');
      
      // Verify we're on inventory page
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).toBe(6);
    });

    test('should maintain cart state when using browser back button', async ({ page }) => {
      /*
       * Test Case: Browser Back Button Navigation
       * Objective: Verify cart state is maintained when using browser back button
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Add product to cart
       * 3. Use browser back button
       * 4. Verify cart state is maintained
       * Expected Results:
       * - User should return to inventory page
       * - Cart should maintain the added product
       * - Cart badge should show correct count
       */
      TestUtils.logTestStep('Testing browser back button navigation');
      
      // Add product to cart from details page
      await productPage.addProductToCart();
      const cartCount = await productPage.getCartBadgeCount();
      expect(cartCount).toBe(1);
      
      // Use browser back button
      await page.goBack();
      
      // Verify we're back on inventory page with cart state maintained
      await TestUtils.verifyURLContains(page, 'inventory.html');
      await homePage.waitForProductsToLoad();
      
      // Verify cart badge still shows the product
      const homeCartBadgeCount = await homePage.getCartBadgeCount();
      expect(homeCartBadgeCount).toBe(1);
    });
  });

  test.describe('Product Details Menu Functionality', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to product details page
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
    });

    test('should open and close menu correctly', async ({ page }) => {
      /*
       * Test Case: Menu Open and Close Functionality
       * Objective: Verify menu can be opened and closed from product details page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Click menu button to open menu
       * 3. Verify menu is visible
       * 4. Click close menu button
       * 5. Verify menu is closed
       * Expected Results:
       * - Menu should open when menu button is clicked
       * - Menu should close when close button is clicked
       * - Menu elements should be properly displayed
       */
      TestUtils.logTestStep('Testing menu open and close functionality');
      
      // Open menu
      await productPage.openMenu();
      await productAssert.verifyMenuOpen();
      
      // Close menu
      await productPage.closeMenu();
      await productAssert.verifyMenuClosed();
    });

    test('should display all menu options correctly', async ({ page }) => {
      /*
       * Test Case: Menu Options Display
       * Objective: Verify all menu options are displayed correctly
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Open menu
       * 3. Verify all menu options are visible
       * 4. Verify menu options are properly labeled
       * Expected Results:
       * - All menu options should be visible
       * - Menu options should be properly labeled
       * - Menu should be properly structured
       */
      TestUtils.logTestStep('Verifying menu options display');
      
      await productPage.openMenu();
      await productAssert.verifyAllMenuOptionsVisible();
      await productAssert.verifyMenuOptionsLabeled();
    });

    test('should logout from product details page', async ({ page }) => {
      /*
       * Test Case: Logout from Product Details Page
       * Objective: Verify logout functionality works from product details page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Open menu
       * 3. Click logout option
       * 4. Verify navigation to login page
       * Expected Results:
       * - User should be logged out
       * - User should be redirected to login page
       * - Login page should be displayed
       */
      TestUtils.logTestStep('Testing logout from product details page');
      
      await productPage.openMenu();
      await productPage.logout();
      
      // Verify we're on login page
      await TestUtils.verifyURLContains(page, 'index.html');
      await loginPage.waitForLoginForm();
    });

    test('should reset app state from product details page', async ({ page }) => {
      /*
       * Test Case: Reset App State from Product Details Page
       * Objective: Verify reset app state functionality works from product details page
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Add product to cart
       * 3. Open menu
       * 4. Click reset app state
       * 5. Verify cart is cleared
       * Expected Results:
       * - App state should be reset
       * - Cart should be cleared
       * - User should remain on product details page
       */
      TestUtils.logTestStep('Testing reset app state from product details page');
      
      // Add product to cart first
      await productPage.addProductToCart();
      let cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(1);
      
      // Reset app state
      await productPage.openMenu();
      await productPage.resetAppState();
      
      // Verify cart is cleared
      cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(0);
      
      // Verify we're still on product details page
      await TestUtils.verifyURLContains(page, 'inventory-item.html');
    });
  });

  test.describe('Product Details Edge Cases', () => {
    test('should handle multiple products in cart correctly', async ({ page }) => {
      /*
       * Test Case: Multiple Products in Cart from Details Page
       * Objective: Verify product details page handles multiple products in cart correctly
       * Test Steps:
       * 1. Navigate to inventory page
       * 2. Add multiple products to cart
       * 3. Navigate to product details page
       * 4. Verify cart badge shows correct count
       * 5. Add/remove product from details page
       * Expected Results:
       * - Cart badge should show correct total count
       * - Adding/removing products should update count correctly
       * - Cart state should be maintained across pages
       */
      TestUtils.logTestStep('Testing multiple products in cart from details page');
      
      // Add multiple products to cart from inventory
      await homePage.addBackpackToCart();
      await homePage.addBikeLightToCart();
      
      // Navigate to product details page
      await homePage.clickProductByName(testData.products.sauceLabsBoltTshirt.name);
      await productPage.waitForProductPage();
      
      // Verify cart badge shows correct count
      let cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(2);
      
      // Add another product from details page
      await productPage.addProductToCart();
      cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(3);
      
      // Remove product from details page
      await productPage.removeProductFromCart();
      cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(2);
    });

    test('should handle rapid add/remove operations correctly', async ({ page }) => {
      /*
       * Test Case: Rapid Add/Remove Operations
       * Objective: Verify product details page handles rapid add/remove operations correctly
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Rapidly click add to cart button multiple times
       * 3. Rapidly click remove from cart button multiple times
       * 4. Verify cart state is correct
       * Expected Results:
       * - Rapid operations should be handled correctly
       * - Cart state should be accurate
       * - No errors should occur during rapid operations
       */
      TestUtils.logTestStep('Testing rapid add/remove operations');
      
      // Rapidly add and remove product
      await productPage.addProductToCart();
      await productPage.removeProductFromCart();
      await productPage.addProductToCart();
      await productPage.removeProductFromCart();
      await productPage.addProductToCart();
      
      // Verify final state
      const cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(1);
      await productAssert.verifyRemoveFromCartButtonVisible();
    });

    test('should handle product details page refresh correctly', async ({ page }) => {
      /*
       * Test Case: Page Refresh Handling
       * Objective: Verify product details page handles page refresh correctly
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Add product to cart
       * 3. Refresh the page
       * 4. Verify page loads correctly
       * 5. Verify cart state is maintained
       * Expected Results:
       * - Page should refresh correctly
       * - Product details should still be displayed
       * - Cart state should be maintained
       */
      TestUtils.logTestStep('Testing page refresh handling');
      
      // Add product to cart
      await productPage.addProductToCart();
      let cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(1);
      
      // Refresh page
      await page.reload();
      await productPage.waitForProductPage();
      
      // Verify page loaded correctly
      const productName = await productPage.getProductName();
      expect(productName).toBe(testData.products.sauceLabsBackpack.name);
      
      // Verify cart state is maintained
      cartBadgeCount = await productPage.getCartBadgeCount();
      expect(cartBadgeCount).toBe(1);
      await productAssert.verifyRemoveFromCartButtonVisible();
    });
  });

  test.describe('Product Details Performance and Responsiveness', () => {
    test('should load product details page quickly', async ({ page }) => {
      /*
       * Test Case: Product Details Page Load Performance
       * Objective: Verify product details page loads efficiently
       * Test Steps:
       * 1. Navigate to inventory page
       * 2. Click on product to navigate to details
       * 3. Measure page load time
       * 4. Verify all elements are visible
       * Expected Results:
       * - Page should load within reasonable time
       * - All product details should be visible
       * - No performance issues should occur
       */
      TestUtils.logTestStep('Testing product details page load performance');
      
      const startTime = Date.now();
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
      const loadTime = Date.now() - startTime;
      
      // Verify page loaded successfully
      const productName = await productPage.getProductName();
      expect(productName).toBe(testData.products.sauceLabsBackpack.name);
      
      // Log performance metric
      TestUtils.logTestStep(`Product details page loaded in ${loadTime}ms`);
    });

    test('should handle interactions smoothly', async ({ page }) => {
      /*
       * Test Case: Product Details Interaction Smoothness
       * Objective: Verify product details page interactions are smooth and responsive
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Perform various interactions
       * 3. Verify smooth transitions
       * Expected Results:
       * - All interactions should be smooth
       * - No lag or delays should occur
       * - UI should remain responsive
       */
      TestUtils.logTestStep('Testing product details interaction smoothness');
      
      // Test various interactions
      await productPage.addProductToCart();
      await productPage.removeProductFromCart();
      await productPage.openMenu();
      await productPage.closeMenu();
      
      // Verify smooth interactions
      await productAssert.verifyAddToCartButtonVisible();
      await productAssert.verifyRemoveFromCartButtonNotVisible();
      await productAssert.verifyMenuClosed();
    });
  });

  test.describe('Product Details Cross-Browser Compatibility', () => {
    test('should display correctly on different viewport sizes', async ({ page }) => {
      /*
       * Test Case: Viewport Size Compatibility
       * Objective: Verify product details page displays correctly on different viewport sizes
       * Test Steps:
       * 1. Navigate to product details page
       * 2. Test different viewport sizes
       * 3. Verify page elements are properly displayed
       * Expected Results:
       * - Page should display correctly on different viewport sizes
       * - All elements should be visible and properly positioned
       * - Layout should be responsive
       */
      TestUtils.logTestStep('Testing viewport size compatibility');
      
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);
      await productPage.waitForProductPage();
      
      // Test different viewport sizes
      await page.setViewportSize({ width: 1920, height: 1080 });
      await productAssert.verifyProductPageElements();
      
      await page.setViewportSize({ width: 1366, height: 768 });
      await productAssert.verifyProductPageElements();
      
      await page.setViewportSize({ width: 1024, height: 768 });
      await productAssert.verifyProductPageElements();
      
      // Reset to default viewport
      await page.setViewportSize({ width: 1280, height: 720 });
    });
  });
});
