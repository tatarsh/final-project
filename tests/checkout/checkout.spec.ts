import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/checkout/checkout';
import { CheckoutAssertions } from '../../pages/checkout/checkoutAssertion';
import { CartPage } from '../../pages/cart/cart';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { TestUtils } from '../utils/testUtils';
import { testData } from '../../fixture/testData';

test.describe('Checkout Functionality Tests', () => {
  let checkoutPage: CheckoutPage;
  let checkoutAssert: CheckoutAssertions;
  let cartPage: CartPage;
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    checkoutAssert = new CheckoutAssertions(page);
    cartPage = new CartPage(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Login and navigate to checkout
    await page.goto(testData.baseURL);
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await homePage.addAllProductsToCart();
    await homePage.goToCart();
          await cartPage.proceedToCheckout();
  });

  test.describe('Checkout Information Page', () => {
    test('should display all checkout information page elements correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Information Page UI Elements
       * Objective: Verify all checkout information page elements are visible and properly displayed
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Verify page title is displayed
       * 3. Verify checkout form is visible
       * 4. Verify all form fields are present
       * 5. Verify continue and cancel buttons are visible
       * Expected Results:
       * - All checkout page elements should be visible
       * - Form fields should be properly labeled
       * - Buttons should be enabled and clickable
       */
      TestUtils.logTestStep('Verifying checkout information page UI elements');
      await checkoutAssert.verifyCheckoutInformationPageElements();
      await checkoutAssert.verifyFirstNameFieldVisible();
      await checkoutAssert.verifyLastNameFieldVisible();
      await checkoutAssert.verifyPostalCodeFieldVisible();
      await checkoutAssert.verifyContinueButtonVisible();
      await checkoutAssert.verifyContinueButtonEnabled();
      await checkoutAssert.verifyCancelButtonVisible();
      await checkoutAssert.verifyCancelButtonEnabled();
    });

    test('should display correct page title and URL', async ({ page }) => {
      /*
       * Test Case: Checkout Information Page Title and URL
       * Objective: Verify checkout information page has correct title and URL
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Verify page title matches expected value
       * 3. Verify URL contains checkout path
       * Expected Results:
       * - Page title should be "Swag Labs"
       * - URL should contain "checkout-step-one.html"
       */
      TestUtils.logTestStep('Verifying checkout information page title and URL');
      await checkoutAssert.verifyPageTitle(testData.pageTitles.checkout);
      await checkoutAssert.verifyURL(testData.urls.checkout);
    });

    test('should display form field placeholders correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Form Field Placeholders
       * Objective: Verify form fields display correct placeholder text
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Verify first name field placeholder
       * 3. Verify last name field placeholder
       * 4. Verify postal code field placeholder
       * Expected Results:
       * - First name field should show "First Name"
       * - Last name field should show "Last Name"
       * - Postal code field should show "Zip/Postal Code"
       */
      TestUtils.logTestStep('Verifying form field placeholders');
      await checkoutAssert.verifyFirstNameFieldPlaceholder();
      await checkoutAssert.verifyLastNameFieldPlaceholder();
      await checkoutAssert.verifyPostalCodeFieldPlaceholder();
    });
  });

  test.describe('Checkout Form Validation', () => {
    test('should require all fields to be filled before continuing', async ({ page }) => {
      /*
       * Test Case: Required Field Validation
       * Objective: Verify all checkout form fields are required
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Leave all fields empty
       * 3. Click continue button
       * 4. Verify error message is displayed
       * Expected Results:
       * - Error message should indicate missing information
       * - User should remain on checkout information page
       * - Form should not proceed to next step
       */
      TestUtils.logTestStep('Testing required field validation');
      
      await checkoutPage.continueToOverview();
      
      // Verify error message is displayed
      await checkoutAssert.verifyErrorDisplayed();
      await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    });

    test('should validate first name field', async ({ page }) => {
      /*
       * Test Case: First Name Field Validation
       * Objective: Verify first name field validation works correctly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill only first name field
       * 3. Leave other fields empty
       * 4. Click continue button
       * 5. Verify error message is displayed
       * Expected Results:
       * - Error message should indicate missing information
       * - User should remain on checkout information page
       */
      TestUtils.logTestStep('Testing first name field validation');
      
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        '',
        ''
      );
      await checkoutPage.continueToOverview();
      
      await checkoutAssert.verifyErrorDisplayed();
      await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    });

    test('should validate last name field', async ({ page }) => {
      /*
       * Test Case: Last Name Field Validation
       * Objective: Verify last name field validation works correctly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill only last name field
       * 3. Leave other fields empty
       * 4. Click continue button
       * 5. Verify error message is displayed
       * Expected Results:
       * - Error message should indicate missing information
       * - User should remain on checkout information page
       */
      TestUtils.logTestStep('Testing last name field validation');
      
      await checkoutPage.fillCheckoutInformation(
        '',
        testData.checkoutData.valid.lastName,
        ''
      );
      await checkoutPage.continueToOverview();
      
      await checkoutAssert.verifyErrorDisplayed();
      await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    });

    test('should validate postal code field', async ({ page }) => {
      /*
       * Test Case: Postal Code Field Validation
       * Objective: Verify postal code field validation works correctly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill only postal code field
       * 3. Leave other fields empty
       * 4. Click continue button
       * 5. Verify error message is displayed
       * Expected Results:
       * - Error message should indicate missing information
       * - User should remain on checkout information page
       */
      TestUtils.logTestStep('Testing postal code field validation');
      
      await checkoutPage.fillCheckoutInformation(
        '',
        '',
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
      
      await checkoutAssert.verifyErrorDisplayed();
      await TestUtils.verifyURLContains(page, 'checkout-step-one.html');
    });

    test('should accept valid checkout information', async ({ page }) => {
      /*
       * Test Case: Valid Checkout Information Submission
       * Objective: Verify checkout form accepts valid information and proceeds
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill all fields with valid information
       * 3. Click continue button
       * 4. Verify navigation to checkout overview page
       * Expected Results:
       * - Form should accept valid information
       * - User should be redirected to checkout overview page
       * - URL should change to checkout-step-two.html
       */
      TestUtils.logTestStep('Testing valid checkout information submission');
      
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
      
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    });
  });

  test.describe('Checkout Overview Page', () => {
    test.beforeEach(async ({ page }) => {
      // Fill checkout information and proceed to overview
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
    });

    test('should display all checkout overview page elements correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Overview Page UI Elements
       * Objective: Verify all checkout overview page elements are visible and properly displayed
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Verify page title is displayed
       * 3. Verify checkout summary is visible
       * 4. Verify all buttons are present
       * Expected Results:
       * - All overview page elements should be visible
       * - Checkout summary should display correctly
       * - Buttons should be enabled and clickable
       */
      TestUtils.logTestStep('Verifying checkout overview page UI elements');
      await checkoutAssert.verifyCheckoutOverviewPageElements();
      await checkoutAssert.verifyFinishButtonVisible();
      await checkoutAssert.verifyFinishButtonEnabled();
      await checkoutAssert.verifyCancelButtonVisible();
      await checkoutAssert.verifyCancelButtonEnabled();
    });

    test('should display correct page title and URL', async ({ page }) => {
      /*
       * Test Case: Checkout Overview Page Title and URL
       * Objective: Verify checkout overview page has correct title and URL
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Verify page title matches expected value
       * 3. Verify URL contains overview path
       * Expected Results:
       * - Page title should be "Swag Labs"
       * - URL should contain "checkout-step-two.html"
       */
      TestUtils.logTestStep('Verifying checkout overview page title and URL');
      await checkoutAssert.verifyPageTitle(testData.pageTitles.checkout);
      await checkoutAssert.verifyURL(testData.urls.checkoutOverview);
    });

    test('should display checkout summary information correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Summary Information Display
       * Objective: Verify checkout summary displays correct information
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Verify payment information is displayed
       * 3. Verify shipping information is displayed
       * 4. Verify item total is displayed
       * 5. Verify tax is displayed
       * 6. Verify total is displayed
       * Expected Results:
       * - Payment information should show "SauceCard #31337"
       * - Shipping information should show "Free Pony Express Delivery!"
       * - Item total should be calculated correctly
       * - Tax should be calculated correctly
       * - Total should be sum of item total and tax
       */
      TestUtils.logTestStep('Verifying checkout summary information');
      
      await checkoutAssert.verifyPaymentInformationDisplayed();
      await checkoutAssert.verifyShippingInformationDisplayed();
      await checkoutAssert.verifyItemTotalDisplayed();
      await checkoutAssert.verifyTaxDisplayed();
      await checkoutAssert.verifyTotalDisplayed();
    });

    test('should display all cart items in overview', async ({ page }) => {
      /*
       * Test Case: Cart Items in Checkout Overview
       * Objective: Verify all cart items are displayed in checkout overview
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Verify all items from cart are displayed
       * 3. Verify item names, prices, and quantities
       * Expected Results:
       * - All 6 products should be displayed
       * - Item names should match cart items
       * - Prices should match cart item prices
       * - Quantities should be correct
       */
      TestUtils.logTestStep('Verifying cart items in checkout overview');
      
      const itemCount = await checkoutPage.getCheckoutItemCount();
      expect(itemCount).toBe(6);
      
      // Verify specific products are displayed
      await checkoutAssert.verifyItemDisplayedInOverview(testData.products.sauceLabsBackpack.name);
      await checkoutAssert.verifyItemDisplayedInOverview(testData.products.sauceLabsBikeLight.name);
      await checkoutAssert.verifyItemDisplayedInOverview(testData.products.sauceLabsBoltTshirt.name);
    });

    test('should calculate totals correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Total Calculations
       * Objective: Verify checkout totals are calculated correctly
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Get item total value
       * 3. Get tax value
       * 4. Get total value
       * 5. Verify total equals item total plus tax
       * Expected Results:
       * - Item total should be sum of all item prices
       * - Tax should be calculated correctly
       * - Total should be item total plus tax
       */
      TestUtils.logTestStep('Verifying checkout total calculations');
      
      const itemTotalValue = await checkoutPage.getSubtotal();
      const taxValue = await checkoutPage.getTax();
      const totalValue = await checkoutPage.getTotal();
      
      expect(totalValue).toBeCloseTo(itemTotalValue + taxValue, 2);
    });
  });

  test.describe('Checkout Completion', () => {
    test.beforeEach(async ({ page }) => {
      // Fill checkout information and proceed to overview
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
    });

    test('should complete checkout successfully', async ({ page }) => {
      /*
       * Test Case: Successful Checkout Completion
       * Objective: Verify checkout can be completed successfully
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Click finish button
       * 3. Verify navigation to checkout complete page
       * Expected Results:
       * - User should be redirected to checkout complete page
       * - URL should change to checkout-complete.html
       * - Success message should be displayed
       */
      TestUtils.logTestStep('Completing checkout successfully');
      
      await checkoutPage.finishCheckout();
      await TestUtils.verifyURLContains(page, 'checkout-complete.html');
    });

    test('should display checkout complete page correctly', async ({ page }) => {
      /*
       * Test Case: Checkout Complete Page Display
       * Objective: Verify checkout complete page displays correctly
       * Test Steps:
       * 1. Complete checkout process
       * 2. Verify success message is displayed
       * 3. Verify back home button is visible
       * 4. Verify page title and URL
       * Expected Results:
       * - Success message should be displayed
       * - Back home button should be visible and enabled
       * - Page title should be correct
       * - URL should be checkout-complete.html
       */
      TestUtils.logTestStep('Verifying checkout complete page');
      
      await checkoutPage.finishCheckout();
      await checkoutAssert.verifyCheckoutCompletePageElements();
      await checkoutAssert.verifySuccessMessageDisplayed();
      await checkoutAssert.verifyBackHomeButtonVisible();
      await checkoutAssert.verifyBackHomeButtonEnabled();
      await checkoutAssert.verifyPageTitle(testData.pageTitles.checkoutComplete);
      await checkoutAssert.verifyURL(testData.urls.checkoutComplete);
    });

    test('should navigate back to inventory when back home is clicked', async ({ page }) => {
      /*
       * Test Case: Back Home Navigation
       * Objective: Verify back home button navigates to inventory page
       * Test Steps:
       * 1. Complete checkout process
       * 2. Click back home button
       * 3. Verify navigation to inventory page
       * Expected Results:
       * - User should be redirected to inventory page
       * - URL should change to inventory.html
       * - Inventory page elements should be visible
       */
      TestUtils.logTestStep('Navigating back to inventory via back home button');
      
      await checkoutPage.finishCheckout();
      await checkoutPage.goBackToCart();
      await TestUtils.verifyURLContains(page, 'inventory.html');
      
      // Verify we're on inventory page
      await homePage.waitForProductsToLoad();
      const productCount = await homePage.getProductCount();
      expect(productCount).toBe(6);
    });
  });

  test.describe('Checkout Cancellation', () => {
    test('should cancel checkout from information page', async ({ page }) => {
      /*
       * Test Case: Cancel Checkout from Information Page
       * Objective: Verify checkout can be cancelled from information page
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Click cancel button
       * 3. Verify navigation back to inventory page
       * Expected Results:
       * - User should be redirected to inventory page
       * - URL should change to inventory.html
       * - Cart should still contain items
       */
      TestUtils.logTestStep('Cancelling checkout from information page');
      
      await checkoutPage.cancelCheckout();
      await TestUtils.verifyURLContains(page, 'cart.html');
      
      // Verify cart still contains items
      await homePage.goToCart();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(6);
    });

    test('should cancel checkout from overview page', async ({ page }) => {
      /*
       * Test Case: Cancel Checkout from Overview Page
       * Objective: Verify checkout can be cancelled from overview page
       * Test Steps:
       * 1. Navigate to checkout overview page
       * 2. Click cancel button
       * 3. Verify navigation back to inventory page
       * Expected Results:
       * - User should be redirected to inventory page
       * - URL should change to inventory.html
       * - Cart should still contain items
       */
      TestUtils.logTestStep('Cancelling checkout from overview page');
      
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
      await checkoutPage.cancelCheckout();
      
      await TestUtils.verifyURLContains(page, 'inventory.html');
      
      // Verify cart still contains items
      await homePage.goToCart();
      const itemCount = await cartPage.getCartItemCount();
      expect(itemCount).toBe(6);
    });
  });

  test.describe('Checkout Edge Cases', () => {
    test('should handle special characters in form fields', async ({ page }) => {
      /*
       * Test Case: Special Characters in Checkout Form
       * Objective: Verify checkout form handles special characters correctly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill fields with special characters
       * 3. Submit form
       * 4. Verify form accepts special characters
       * Expected Results:
       * - Form should accept special characters
       * - No errors should occur
       * - User should proceed to overview page
       */
      TestUtils.logTestStep('Testing special characters in checkout form');
      
      await checkoutPage.fillCheckoutInformation(
        'John@#$%',
        'Doe&*()',
        '12345!@#'
      );
      await checkoutPage.continueToOverview();
      
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    });

    test('should handle long text in form fields', async ({ page }) => {
      /*
       * Test Case: Long Text in Checkout Form
       * Objective: Verify checkout form handles long text correctly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill fields with long text
       * 3. Submit form
       * 4. Verify form accepts long text
       * Expected Results:
       * - Form should accept long text
       * - No errors should occur
       * - User should proceed to overview page
       */
      TestUtils.logTestStep('Testing long text in checkout form');
      
      const longText = 'A'.repeat(100);
      await checkoutPage.fillCheckoutInformation(
        longText,
        longText,
        longText
      );
      await checkoutPage.continueToOverview();
      
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    });

    test('should handle numeric values in name fields', async ({ page }) => {
      /*
       * Test Case: Numeric Values in Name Fields
       * Objective: Verify checkout form accepts numeric values in name fields
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Fill name fields with numeric values
       * 3. Submit form
       * 4. Verify form accepts numeric values
       * Expected Results:
       * - Form should accept numeric values in name fields
       * - No errors should occur
       * - User should proceed to overview page
       */
      TestUtils.logTestStep('Testing numeric values in name fields');
      
      await checkoutPage.fillCheckoutInformation(
        '12345',
        '67890',
        '11111'
      );
      await checkoutPage.continueToOverview();
      
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    });
  });

  test.describe('Checkout Performance and Responsiveness', () => {
    test('should load checkout pages quickly', async ({ page }) => {
      /*
       * Test Case: Checkout Page Load Performance
       * Objective: Verify checkout pages load efficiently
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Measure page load time
       * 3. Fill form and proceed to overview
       * 4. Measure overview page load time
       * Expected Results:
       * - Pages should load within reasonable time
       * - All elements should be visible
       * - No performance issues should occur
       */
      TestUtils.logTestStep('Testing checkout page load performance');
      
      // Test information page load
      const infoStartTime = Date.now();
      await checkoutPage.waitForCheckoutForm();
      const infoLoadTime = Date.now() - infoStartTime;
      
      // Test overview page load
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      
      const overviewStartTime = Date.now();
      await checkoutPage.continueToOverview();
      await checkoutPage.waitForCheckoutOverview();
      const overviewLoadTime = Date.now() - overviewStartTime;
      
      // Log performance metrics
      TestUtils.logTestStep(`Checkout information page loaded in ${infoLoadTime}ms`);
      TestUtils.logTestStep(`Checkout overview page loaded in ${overviewLoadTime}ms`);
      
      // Verify pages loaded successfully
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
    });

    test('should handle rapid form interactions smoothly', async ({ page }) => {
      /*
       * Test Case: Rapid Form Interaction Smoothness
       * Objective: Verify checkout form handles rapid interactions smoothly
       * Test Steps:
       * 1. Navigate to checkout information page
       * 2. Rapidly fill form fields
       * 3. Submit form quickly
       * 4. Verify smooth processing
       * Expected Results:
       * - All interactions should be smooth
       * - No lag or delays should occur
       * - Form should process correctly
       */
      TestUtils.logTestStep('Testing rapid form interaction smoothness');
      
      // Rapidly fill and submit form
      await checkoutPage.fillCheckoutInformation(
        testData.checkoutData.valid.firstName,
        testData.checkoutData.valid.lastName,
        testData.checkoutData.valid.postalCode
      );
      await checkoutPage.continueToOverview();
      
      // Verify smooth processing
      await TestUtils.verifyURLContains(page, 'checkout-step-two.html');
      await checkoutPage.waitForCheckoutOverview();
    });
  });
});
