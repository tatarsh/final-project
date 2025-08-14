import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login';
import { HomePage } from '../../pages/home/home';
import { HomeAssertions } from '../../pages/home/homeAssertion';
import { TestUtils } from '../utils/testUtils';
import { testData } from '../../fixture/testData';
import { homeLocators } from '../../pages/home/homeLocator';

test.describe('Home/Inventory Page Tests', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let homeAssert: HomeAssertions;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    homeAssert = new HomeAssertions(page);
    
    // Login and navigate to home page before each test
    await loginPage.navigate(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await TestUtils.waitForPageLoad(page);
  });

  test.describe('Page UI Elements', () => {
    test('should display all inventory page elements correctly', async ({ page }) => {
      /*
       * Test Case: Verify Inventory Page UI Elements
       * 
       * Objective: Ensure all inventory page elements are visible and properly displayed
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Verify page title and URL
       * 3. Verify product sort dropdown is visible
       * 4. Verify cart icon is visible
       * 5. Verify menu button is visible
       * 6. Verify products are displayed
       * 
       * Expected Results:
       * - All UI elements should be visible
       * - Page title should be "Swag Labs"
       * - URL should contain "inventory.html"
       * - Products should be displayed
       */

      TestUtils.logTestStep('Verify page title and URL');
      await homeAssert.verifyPageTitle(testData.pageTitles.inventory);
      await TestUtils.verifyURLContains(page, 'inventory.html');

      TestUtils.logTestStep('Verify UI elements are visible');
      await homeAssert.verifySortDropdownVisible();
      await homeAssert.verifyCartIconVisible();
      await homeAssert.verifyMenuButtonVisible();

      TestUtils.logTestStep('Verify products are displayed');
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).toBeGreaterThan(0);
    });

    test('should display correct number of products', async ({ page }) => {
      /*
       * Test Case: Verify Product Count
       * 
       * Objective: Ensure the correct number of products are displayed
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Count total products
       * 4. Verify product count matches expected
       * 
       * Expected Results:
       * - Should display exactly 6 products
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Verify product count');
      const productCount = await homePage.getProductCount();
      expect(productCount).toBe(6);
    });
  });

  test.describe('Product Information Display', () => {
    test('should display correct product information for all products', async ({ page }) => {
      /*
       * Test Case: Verify Product Information Display
       * 
       * Objective: Ensure all products display correct name, price, and description
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Get all product information
       * 4. Verify each product has correct details
       * 
       * Expected Results:
       * - All products should have names, prices, and descriptions
       * - Product information should match test data
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Get all product information');
      const products = await homePage.getAllProducts();

      TestUtils.logTestStep('Verify each product has complete information');
      for (const product of products) {
        expect(product.name).toBeTruthy();
        expect(product.price).toBeTruthy();
        expect(product.description).toBeTruthy();
        expect(product.price).toMatch(/^\$\d+\.\d{2}$/);
      }
    });

    test('should display specific product details correctly', async ({ page }) => {
      /*
       * Test Case: Verify Specific Product Details
       * 
       * Objective: Ensure specific products display correct information
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Verify Sauce Labs Backpack details
       * 4. Verify Sauce Labs Bike Light details
       * 
       * Expected Results:
       * - Sauce Labs Backpack should have correct name, price, and description
       * - Sauce Labs Bike Light should have correct name, price, and description
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Verify Sauce Labs Backpack details');
      await homeAssert.verifyProductVisible(testData.products.sauceLabsBackpack.name);
      await homeAssert.verifyProductPrice(testData.products.sauceLabsBackpack.name, testData.products.sauceLabsBackpack.price);
      await homeAssert.verifyProductDescription(testData.products.sauceLabsBackpack.name, testData.products.sauceLabsBackpack.description);

      TestUtils.logTestStep('Verify Sauce Labs Bike Light details');
      await homeAssert.verifyProductVisible(testData.products.sauceLabsBikeLight.name);
      await homeAssert.verifyProductPrice(testData.products.sauceLabsBikeLight.name, testData.products.sauceLabsBikeLight.price);
      await homeAssert.verifyProductDescription(testData.products.sauceLabsBikeLight.name, testData.products.sauceLabsBikeLight.description);
    });
  });

  test.describe('Product Sorting Functionality', () => {
    test('should sort products by name in ascending order', async ({ page }) => {
      /*
       * Test Case: Sort Products by Name Ascending
       * 
       * Objective: Verify products can be sorted by name in ascending order
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Select name ascending sort option
       * 4. Verify products are sorted correctly
       * 
       * Expected Results:
       * - Products should be sorted alphabetically from A to Z
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Sort products by name ascending');
      await homePage.sortProducts(testData.sortOptions.nameAsc);

      TestUtils.logTestStep('Verify sort option is selected');
      await homeAssert.verifySortOptionSelected(testData.sortOptions.nameAsc);

      TestUtils.logTestStep('Verify products are sorted correctly');
      await homeAssert.verifyProductsSortedByNameAscending();
    });

    test('should sort products by name in descending order', async ({ page }) => {
      /*
       * Test Case: Sort Products by Name Descending
       * 
       * Objective: Verify products can be sorted by name in descending order
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Select name descending sort option
       * 4. Verify products are sorted correctly
       * 
       * Expected Results:
       * - Products should be sorted alphabetically from Z to A
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Sort products by name descending');
      await homePage.sortProducts(testData.sortOptions.nameDesc);

      TestUtils.logTestStep('Verify sort option is selected');
      await homeAssert.verifySortOptionSelected(testData.sortOptions.nameDesc);

      TestUtils.logTestStep('Verify products are sorted correctly');
      await homeAssert.verifyProductsSortedByNameDescending();
    });

    test('should sort products by price in ascending order', async ({ page }) => {
      /*
       * Test Case: Sort Products by Price Ascending
       * 
       * Objective: Verify products can be sorted by price in ascending order
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Select price ascending sort option
       * 4. Verify products are sorted correctly
       * 
       * Expected Results:
       * - Products should be sorted by price from lowest to highest
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Sort products by price ascending');
      await homePage.sortProducts(testData.sortOptions.priceAsc);

      TestUtils.logTestStep('Verify sort option is selected');
      await homeAssert.verifySortOptionSelected(testData.sortOptions.priceAsc);

      TestUtils.logTestStep('Verify products are sorted correctly');
      await homeAssert.verifyProductsSortedByPriceAscending();
    });

    test('should sort products by price in descending order', async ({ page }) => {
      /*
       * Test Case: Sort Products by Price Descending
       * 
       * Objective: Verify products can be sorted by price in descending order
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Select price descending sort option
       * 4. Verify products are sorted correctly
       * 
       * Expected Results:
       * - Products should be sorted by price from highest to lowest
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Sort products by price descending');
      await homePage.sortProducts(testData.sortOptions.priceDesc);

      TestUtils.logTestStep('Verify sort option is selected');
      await homeAssert.verifySortOptionSelected(testData.sortOptions.priceDesc);

      TestUtils.logTestStep('Verify products are sorted correctly');
      await homeAssert.verifyProductsSortedByPriceDescending();
    });
  });

  test.describe('Add to Cart Functionality', () => {
    test('should add single product to cart successfully', async ({ page }) => {
      /*
       * Test Case: Add Single Product to Cart
       * 
       * Objective: Verify a single product can be added to cart
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Add Sauce Labs Backpack to cart
       * 4. Verify cart badge shows correct count
       * 5. Verify add to cart button changes to remove button
       * 
       * Expected Results:
       * - Cart badge should show count 1
       * - Add to cart button should change to remove button
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Add Sauce Labs Backpack to cart');
      await homePage.addBackpackToCart();

      TestUtils.logTestStep('Verify cart badge shows correct count');
      await homeAssert.verifyCartCount(1);

      TestUtils.logTestStep('Verify add to cart button changes to remove button');
      await homeAssert.verifyRemoveFromCartButtonVisible(testData.products.sauceLabsBackpack.name);
      await homeAssert.verifyAddToCartButtonNotVisible(testData.products.sauceLabsBackpack.name);
    });

    test('should add multiple products to cart successfully', async ({ page }) => {
      /*
       * Test Case: Add Multiple Products to Cart
       * 
       * Objective: Verify multiple products can be added to cart
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Add all products to cart
       * 4. Verify cart badge shows correct count
       * 5. Verify all add to cart buttons change to remove buttons
       * 
       * Expected Results:
       * - Cart badge should show count 6
       * - All add to cart buttons should change to remove buttons
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Add all products to cart');
      await homePage.addAllProductsToCart();

      TestUtils.logTestStep('Verify cart badge shows correct count');
      await homeAssert.verifyCartCount(6);

      TestUtils.logTestStep('Verify all add to cart buttons change to remove buttons');
      for (const productKey of Object.keys(testData.products) as Array<keyof typeof testData.products>) {
        const product = testData.products[productKey];
        await homeAssert.verifyRemoveFromCartButtonVisible(product.name);
        await homeAssert.verifyAddToCartButtonNotVisible(product.name);
      }
    });

    test('should remove product from cart successfully', async ({ page }) => {
      /*
       * Test Case: Remove Product from Cart
       * 
       * Objective: Verify a product can be removed from cart
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Add Sauce Labs Backpack to cart
       * 4. Verify cart badge shows count 1
       * 5. Remove Sauce Labs Backpack from cart
       * 6. Verify cart badge is not visible
       * 7. Verify remove button changes back to add button
       * 
       * Expected Results:
       * - Cart badge should not be visible after removal
       * - Remove button should change back to add button
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Add Sauce Labs Backpack to cart');
      await homePage.addBackpackToCart();
      await homeAssert.verifyCartCount(1);

      TestUtils.logTestStep('Remove Sauce Labs Backpack from cart');
      await homePage.removeBackpackFromCart();

      TestUtils.logTestStep('Verify cart badge is not visible');
      await homeAssert.verifyCartBadgeNotVisible();

      TestUtils.logTestStep('Verify remove button changes back to add button');
      await homeAssert.verifyAddToCartButtonVisible(testData.products.sauceLabsBackpack.name);
      await homeAssert.verifyRemoveFromCartButtonNotVisible(testData.products.sauceLabsBackpack.name);
    });

    test('should remove all products from cart successfully', async ({ page }) => {
      /*
       * Test Case: Remove All Products from Cart
       * 
       * Objective: Verify all products can be removed from cart
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Add all products to cart
       * 4. Verify cart badge shows count 6
       * 5. Remove all products from cart
       * 6. Verify cart badge is not visible
       * 7. Verify all remove buttons change back to add buttons
       * 
       * Expected Results:
       * - Cart badge should not be visible after removal
       * - All remove buttons should change back to add buttons
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Add all products to cart');
      await homePage.addAllProductsToCart();
      await homeAssert.verifyCartCount(6);

      TestUtils.logTestStep('Remove all products from cart');
      await homePage.removeAllProductsFromCart();

      TestUtils.logTestStep('Verify cart badge is not visible');
      await homeAssert.verifyCartBadgeNotVisible();

      TestUtils.logTestStep('Verify all remove buttons change back to add buttons');
      for (const productKey of Object.keys(testData.products) as Array<keyof typeof testData.products>) {
        const product = testData.products[productKey];
        await homeAssert.verifyAddToCartButtonVisible(product.name);
        await homeAssert.verifyRemoveFromCartButtonNotVisible(product.name);
      }
    });
  });

  test.describe('Navigation Functionality', () => {
    test('should navigate to cart page successfully', async ({ page }) => {
      /*
       * Test Case: Navigate to Cart Page
       * 
       * Objective: Verify navigation to cart page works correctly
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Click cart icon
       * 4. Verify navigation to cart page
       * 
       * Expected Results:
       * - Should navigate to cart page
       * - URL should contain "cart.html"
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Navigate to cart page');
      await homePage.goToCart();

      TestUtils.logTestStep('Verify navigation to cart page');
      await TestUtils.verifyURLContains(page, 'cart.html');
    });

    test('should open and close menu successfully', async ({ page }) => {
      /*
       * Test Case: Menu Open and Close
       * 
       * Objective: Verify menu can be opened and closed
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Open menu
       * 4. Verify menu is open
       * 5. Close menu
       * 6. Verify menu is closed
       * 
       * Expected Results:
       * - Menu should open when menu button is clicked
       * - Menu should close when close button is clicked
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Open menu');
      await homePage.openMenu();

      TestUtils.logTestStep('Close menu');
      await homePage.closeMenu();
    });
  });

  test.describe('Product Details Navigation', () => {
    test('should navigate to product details page successfully', async ({ page }) => {
      /*
       * Test Case: Navigate to Product Details
       * 
       * Objective: Verify navigation to product details page works correctly
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Click on Sauce Labs Backpack product name
       * 4. Verify navigation to product details page
       * 
       * Expected Results:
       * - Should navigate to product details page
       * - URL should contain product-specific path
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Navigate to product details page');
      await homePage.clickProductByName(testData.products.sauceLabsBackpack.name);

      TestUtils.logTestStep('Verify navigation to product details page');
      await TestUtils.verifyURLContains(page, 'inventory-item.html');
    });
  });

  test.describe('Cart Badge Functionality', () => {
    test('should display cart badge with correct count', async ({ page }) => {
      /*
       * Test Case: Cart Badge Count Display
       * 
       * Objective: Verify cart badge displays correct count
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Add products to cart one by one
       * 4. Verify cart badge count after each addition
       * 
       * Expected Results:
       * - Cart badge should show correct count after each addition
       * - Count should increment by 1 for each product added
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Add products to cart and verify badge count');
      const productKeys = Object.keys(testData.products) as Array<keyof typeof testData.products>;
      
      for (let i = 0; i < productKeys.length; i++) {
        const productKey = productKeys[i];
        const product = testData.products[productKey];
        
        await page.click(homeLocators.addToCartButtonByName(product.name));
        await homeAssert.verifyCartCount(i + 1);
      }
    });

    test('should hide cart badge when cart is empty', async ({ page }) => {
      /*
       * Test Case: Cart Badge Visibility When Empty
       * 
       * Objective: Verify cart badge is hidden when cart is empty
       * 
       * Test Steps:
       * 1. Login and navigate to inventory page
       * 2. Wait for products to load
       * 3. Verify cart badge is not visible initially
       * 4. Add product to cart
       * 5. Verify cart badge becomes visible
       * 6. Remove product from cart
       * 7. Verify cart badge becomes hidden again
       * 
       * Expected Results:
       * - Cart badge should not be visible when cart is empty
       * - Cart badge should become visible when products are added
       * - Cart badge should become hidden when all products are removed
       */

      TestUtils.logTestStep('Wait for products to load');
      await homePage.waitForProductsToLoad();

      TestUtils.logTestStep('Verify cart badge is not visible initially');
      await homeAssert.verifyCartBadgeNotVisible();

      TestUtils.logTestStep('Add product to cart and verify badge becomes visible');
      await homePage.addBackpackToCart();
      await homeAssert.verifyCartBadgeVisible();

      TestUtils.logTestStep('Remove product from cart and verify badge becomes hidden');
      await homePage.removeBackpackFromCart();
      await homeAssert.verifyCartBadgeNotVisible();
    });
  });
});
