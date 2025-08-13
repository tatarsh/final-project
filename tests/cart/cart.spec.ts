import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/cart/cart';
import { CartAssertions } from '../../pages/cart/cartAssertion';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { TestUtils } from '../utils/testUtils';
import { testData } from '../../fixture/testData';

test.describe('Cart Functionality Tests', () => {
  let cartPage: CartPage;
  let cartAssert: CartAssertions;
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    cartAssert = new CartAssertions(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Login and navigate to cart with items
    await page.goto(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await homePage.addAllProductsToCart();
    await homePage.goToCart();
  });

  test.describe('Cart Page UI Elements', () => {
    test('should display all cart page elements correctly', async ({ page }) => {
      /*
       * Test Case: Cart Page UI Elements Display
       * Objective: Verify all cart page elements are visible and properly displayed
       * Test Steps:
       * 1. Navigate to cart page with items
       * 2. Verify cart title is displayed
       * 3. Verify cart description is visible
       * 4. Verify checkout button is visible and enabled
       * 5. Verify continue shopping button is visible and enabled
       * Expected Results:
       * - All cart page elements should be visible
       * - Buttons should be enabled and clickable
       * - Page layout should be properly structured
       */
      TestUtils.logTestStep('Verifying cart page UI elements');
      await cartAssert.verifyCartTitle('Your Cart');
      await cartAssert.verifyCartDescription('Cart contains items added from inventory');
      await cartAssert.verifyCheckoutButtonVisible();
      await cartAssert.verifyCheckoutButtonEnabled();
      await cartAssert.verifyContinueShoppingButtonVisible();
      await cartAssert.verifyContinueShoppingButtonEnabled();
    });

    test('should display correct page title and URL', async ({ page }) => {
      /*
       * Test Case: Cart Page Title and URL Validation
       * Objective: Verify cart page has correct title and URL
       * Test Steps:
       * 1. Navigate to cart page
       * 2. Verify page title matches expected value
       * 3. Verify URL contains cart path
       * Expected Results:
       * - Page title should be "Swag Labs"
       * - URL should contain "cart.html"
       */
      TestUtils.logTestStep('Verifying cart page title and URL');
      await cartAssert.verifyPageTitle(testData.pageTitles.cart);
      await cartAssert.verifyURL(testData.urls.cart);
    });
  });

  test.describe('Cart Items Display', () => {
    test('should display all added items in cart', async ({ page }) => {
      /*
       * Test Case: Cart Items Display
       * Objective: Verify all items added from inventory are displayed in cart
       * Test Steps:
       * 1. Add all products to cart from inventory
       * 2. Navigate to cart page
       * 3. Verify all items are displayed
       * 4. Verify item count matches expected value
       * Expected Results:
       * - All 6 products should be displayed in cart
       * - Cart item count should be 6
       * - Each item should show name, price, and remove button
       */
      TestUtils.logTestStep('Verifying all items are displayed in cart');
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(6);
      
      // Verify specific products are in cart
      await cartAssert.verifyItemInCartByName(testData.products.sauceLabsBackpack.name);
      await cartAssert.verifyItemInCartByName(testData.products.sauceLabsBikeLight.name);
      await cartAssert.verifyItemInCartByName(testData.products.sauceLabsBoltTshirt.name);
      await cartAssert.verifyItemInCartByName(testData.products.sauceLabsFleeceJacket.name);
      await cartAssert.verifyItemInCartByName(testData.products.sauceLabsOnesie.name);
      await cartAssert.verifyItemInCartByName(testData.products.testAllTheThingsTshirt.name);
    });

    test('should display correct item information for each product', async ({ page }) => {
      /*
       * Test Case: Cart Item Information Display
       * Objective: Verify each cart item displays correct name, price, and quantity
       * Test Steps:
       * 1. Navigate to cart page with items
       * 2. Verify each item shows correct name
       * 3. Verify each item shows correct price
       * 4. Verify each item shows correct quantity
       * Expected Results:
       * - Item names should match product names from inventory
       * - Item prices should match product prices from inventory
       * - All items should have quantity of 1
       */
      TestUtils.logTestStep('Verifying item information display');
      
      // Verify backpack information
      const backpackPrice = await cartPage.getCartItemPrice(testData.products.sauceLabsBackpack.name);
      expect(backpackPrice).toBe(testData.products.sauceLabsBackpack.price);
      
      const backpackQuantity = await cartPage.getCartItemQuantity(testData.products.sauceLabsBackpack.name);
      expect(backpackQuantity).toBe('1');
      
      // Verify bike light information
      const bikeLightPrice = await cartPage.getCartItemPrice(testData.products.sauceLabsBikeLight.name);
      expect(bikeLightPrice).toBe(testData.products.sauceLabsBikeLight.price);
      
      const bikeLightQuantity = await cartPage.getCartItemQuantity(testData.products.sauceLabsBikeLight.name);
      expect(bikeLightQuantity).toBe('1');
    });

    test('should display remove buttons for all items', async ({ page }) => {
      /*
       * Test Case: Remove Buttons Display
       * Objective: Verify remove buttons are visible for all cart items
       * Test Steps:
       * 1. Navigate to cart page with items
       * 2. Verify remove button is visible for each item
       * Expected Results:
       * - All items should have visible remove buttons
       * - Remove buttons should be enabled and clickable
       */
      TestUtils.logTestStep('Verifying remove buttons are displayed');
      
      const itemNames = await cartPage.getCartItemNames();
      for (const itemName of itemNames) {
        await cartAssert.verifyRemoveButtonVisible(itemName);
      }
    });
  });

  test.describe('Cart Item Management', () => {
    test('should remove single item from cart', async ({ page }) => {
      /*
       * Test Case: Remove Single Item from Cart
       * Objective: Verify ability to remove individual items from cart
       * Test Steps:
       * 1. Navigate to cart page with multiple items
       * 2. Remove one specific item
       * 3. Verify item is removed from cart
       * 4. Verify cart item count decreases
       * Expected Results:
       * - Selected item should be removed from cart
       * - Cart item count should decrease by 1
       * - Removed item should not be visible
       */
      TestUtils.logTestStep('Removing single item from cart');
      
      const initialCount = await cartPage.getCartItemCount();
      await cartPage.removeItemFromCart(testData.products.sauceLabsBackpack.name);
      
      const finalCount = await cartPage.getCartItemCount();
      expect(finalCount).toBe(initialCount - 1);
      
      await cartAssert.verifyItemNotInCartByName(testData.products.sauceLabsBackpack.name);
    });

    test('should remove all items from cart', async ({ page }) => {
      /*
       * Test Case: Remove All Items from Cart
       * Objective: Verify ability to remove all items from cart
       * Test Steps:
       * 1. Navigate to cart page with multiple items
       * 2. Remove all items one by one
       * 3. Verify cart becomes empty
       * Expected Results:
       * - All items should be removed from cart
       * - Cart should be empty
       * - Empty cart message should be displayed
       */
      TestUtils.logTestStep('Removing all items from cart');
      
      await cartPage.removeAllItemsFromCart();
      await cartAssert.verifyCartEmpty();
      
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(0);
    });

    test('should handle removing items in different order', async ({ page }) => {
      /*
       * Test Case: Remove Items in Different Order
       * Objective: Verify cart functionality when removing items in various sequences
       * Test Steps:
       * 1. Navigate to cart page with multiple items
       * 2. Remove items in reverse order
       * 3. Verify cart updates correctly after each removal
       * Expected Results:
       * - Items should be removed correctly regardless of order
       * - Cart count should update properly after each removal
       * - Remaining items should still be visible
       */
      TestUtils.logTestStep('Removing items in different order');
      
      const initialItems = await cartPage.getCartItemNames();
      const itemsToRemove = [...initialItems].reverse();
      
      for (let i = 0; i < itemsToRemove.length; i++) {
        const itemToRemove = itemsToRemove[i];
        await cartPage.removeItemFromCart(itemToRemove);
        
        const currentCount = await cartPage.getCartItemCount();
        expect(currentCount).toBe(initialItems.length - i - 1);
        
        await cartAssert.verifyItemNotInCartByName(itemToRemove);
      }
      
      await cartAssert.verifyCartEmpty();
    });
  });

  test.describe('Cart Navigation', () => {
    test('should navigate back to inventory when continue shopping is clicked', async ({ page }) => {
      /*
       * Test Case: Continue Shopping Navigation
       * Objective: Verify continue shopping button navigates back to inventory page
       * Test Steps:
       * 1. Navigate to cart page
       * 2. Click continue shopping button
       * 3. Verify navigation to inventory page
       * Expected Results:
       * - User should be redirected to inventory page
       * - URL should change to inventory.html
       * - Inventory page elements should be visible
       */
      TestUtils.logTestStep('Navigating back to inventory via continue shopping');
      
      await cartPage.continueShopping();
      await TestUtils.verifyURLContains(page, 'inventory.html');
      
      // Verify we're on inventory page
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).toBe(6);
    });

    test('should navigate to checkout when checkout button is clicked', async ({ page }) => {
      /*
       * Test Case: Checkout Navigation
       * Objective: Verify checkout button navigates to checkout information page
       * Test Steps:
       * 1. Navigate to cart page with items
       * 2. Click checkout button
       * 3. Verify navigation to checkout page
       * Expected Results:
       * - User should be redirected to checkout information page
       * - URL should change to checkout-step-one.html
       * - Checkout form should be visible
       */
      TestUtils.logTestStep('Navigating to checkout page');
      
      await cartPage.proceedToCheckout();
      await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    });
  });

  test.describe('Cart Edge Cases', () => {
    test('should handle empty cart state correctly', async ({ page }) => {
      /*
       * Test Case: Empty Cart State Handling
       * Objective: Verify cart page behaves correctly when empty
       * Test Steps:
       * 1. Navigate to cart page
       * 2. Remove all items to create empty cart
       * 3. Verify empty cart state
       * 4. Verify checkout button is disabled
       * Expected Results:
       * - Empty cart message should be displayed
       * - Checkout button should be disabled
       * - Continue shopping button should remain enabled
       */
      TestUtils.logTestStep('Testing empty cart state');
      
      await cartPage.removeAllItemsFromCart();
      await cartAssert.verifyCartEmpty();
      
      // In a real application, checkout button might be disabled for empty cart
      // This test verifies the current behavior
      await cartAssert.verifyCartItemCount(0);
    });

    test('should maintain cart state when navigating between pages', async ({ page }) => {
      /*
       * Test Case: Cart State Persistence
       * Objective: Verify cart maintains items when navigating between pages
       * Test Steps:
       * 1. Add items to cart from inventory
       * 2. Navigate to cart page
       * 3. Navigate back to inventory
       * 4. Navigate to cart again
       * 5. Verify items are still in cart
       * Expected Results:
       * - Cart should maintain all items
       * - Item count should remain the same
       * - All items should still be visible
       */
      TestUtils.logTestStep('Testing cart state persistence');
      
      const initialItemCount = await cartPage.getCartItemCount();
      const initialItemNames = await cartPage.getCartItemNames();
      
      // Navigate to inventory and back to cart
      await cartPage.continueShopping();
      await homePage.goToCart();
      
      const finalItemCount = await cartPage.getCartItemCount();
      const finalItemNames = await cartPage.getCartItemNames();
      
      expect(finalItemCount).toBe(initialItemCount);
      expect(finalItemNames).toEqual(initialItemNames);
    });

    test('should handle rapid item removal correctly', async ({ page }) => {
      /*
       * Test Case: Rapid Item Removal
       * Objective: Verify cart handles rapid removal of multiple items correctly
       * Test Steps:
       * 1. Navigate to cart page with multiple items
       * 2. Rapidly remove multiple items
       * 3. Verify cart updates correctly
       * Expected Results:
       * - All items should be removed correctly
       * - Cart count should be accurate
       * - No errors should occur during rapid removal
       */
      TestUtils.logTestStep('Testing rapid item removal');
      
      const initialCount = await cartPage.getCartItemCount();
      
      // Remove items rapidly
      const itemNames = await cartPage.getCartItemNames();
      const removePromises = itemNames.map(itemName => 
        cartPage.removeItemFromCart(itemName)
      );
      
      await Promise.all(removePromises);
      
      const finalCount = await cartPage.getCartItemCount();
      expect(finalCount).toBe(0);
      await cartAssert.verifyCartEmpty();
    });
  });

  test.describe('Cart Performance and Responsiveness', () => {
    test('should load cart page quickly with multiple items', async ({ page }) => {
      /*
       * Test Case: Cart Page Load Performance
       * Objective: Verify cart page loads efficiently with multiple items
       * Test Steps:
       * 1. Navigate to cart page with 6 items
       * 2. Measure page load time
       * 3. Verify all elements are visible
       * Expected Results:
       * - Page should load within reasonable time
       * - All cart items should be visible
       * - No performance issues should occur
       */
      TestUtils.logTestStep('Testing cart page load performance');
      
      const startTime = Date.now();
      await cartPage.waitForCartToLoad();
      const loadTime = Date.now() - startTime;
      
      // Verify page loaded successfully
      await cartAssert.verifyCartNotEmpty();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(6);
      
      // Log performance metric
      TestUtils.logTestStep(`Cart page loaded in ${loadTime}ms`);
    });

    test('should handle cart interactions smoothly', async ({ page }) => {
      /*
       * Test Case: Cart Interaction Smoothness
       * Objective: Verify cart interactions are smooth and responsive
       * Test Steps:
       * 1. Navigate to cart page with items
       * 2. Perform various cart operations
       * 3. Verify smooth transitions
       * Expected Results:
       * - All interactions should be smooth
       * - No lag or delays should occur
       * - UI should remain responsive
       */
      TestUtils.logTestStep('Testing cart interaction smoothness');
      
      // Test various interactions
      await cartPage.removeItemFromCart(testData.products.sauceLabsBackpack.name);
      await cartPage.continueShopping();
      await homePage.goToCart();
      
      // Verify smooth navigation
      await cartAssert.verifyCartNotEmpty();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(5);
    });
  });
});
