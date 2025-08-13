import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/login';
import { LoginAssertions } from '../../pages/login/loginAssertion';
import { TestUtils } from '../utils/testUtils';
import { testData } from '../../fixture/testData';
import { loginLocators } from '../../pages/login/loginLocator';

test.describe('Login Functionality Tests', () => {
  let loginPage: LoginPage;
  let loginAssert: LoginAssertions;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    loginAssert = new LoginAssertions(page);
    
    // Navigate to login page before each test
    await loginPage.navigate(testData.baseURL);
    await TestUtils.waitForPageLoad(page);
  });

  test.describe('Login Page UI Elements', () => {
    test('should display all login form elements correctly', async ({ page }) => {
      /*
       * Test Case: Verify Login Page UI Elements
       * 
       * Objective: Ensure all login form elements are visible and properly displayed
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Verify username field is visible
       * 3. Verify password field is visible
       * 4. Verify login button is visible and enabled
       * 5. Verify form placeholders are correct
       * 6. Verify page title and URL
       * 
       * Expected Results:
       * - All form elements should be visible
       * - Login button should be enabled
       * - Placeholders should display correct text
       * - Page title should be "Swag Labs"
       */

      TestUtils.logTestStep('Verify login form elements are visible');
      await loginAssert.verifyLoginFormVisible();

      TestUtils.logTestStep('Verify login button is enabled');
      await loginAssert.verifyLoginButtonEnabled();

      TestUtils.logTestStep('Verify form placeholders');
      await loginAssert.verifyLoginFormPlaceholders();

      TestUtils.logTestStep('Verify page title');
      await loginAssert.verifyPageTitle(testData.pageTitles.login);

      TestUtils.logTestStep('Verify page URL');
      await loginAssert.verifyURL(testData.urls.login);
    });

    test('should have correct form field attributes', async ({ page }) => {
      /*
       * Test Case: Verify Form Field Attributes
       * 
       * Objective: Ensure form fields have correct attributes and validation
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Verify username field attributes
       * 3. Verify password field attributes
       * 4. Verify login button text
       * 
       * Expected Results:
       * - Username field should be empty initially
       * - Password field should be empty initially
       * - Login button should display "Login" text
       */

      TestUtils.logTestStep('Verify form fields are empty initially');
      await loginAssert.verifyUsernameFieldEmpty();
      await loginAssert.verifyPasswordFieldEmpty();

      TestUtils.logTestStep('Verify login button text');
      await loginAssert.verifyLoginButtonText('Login');
    });
  });

  test.describe('Successful Login Scenarios', () => {
    test('should login successfully with valid standard user credentials', async ({ page }) => {
      /*
       * Test Case: Successful Login with Standard User
       * 
       * Objective: Verify successful login with valid standard user credentials
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter valid username (standard_user)
       * 3. Enter valid password (secret_sauce)
       * 4. Click login button
       * 5. Verify successful navigation to inventory page
       * 
       * Expected Results:
       * - User should be redirected to inventory page
       * - No error messages should be displayed
       * - URL should change to inventory page
       */

      TestUtils.logTestStep('Login with valid standard user credentials');
      await loginPage.login(testData.users.standard.username, testData.users.standard.password);

      TestUtils.logTestStep('Verify successful navigation to inventory page');
      await TestUtils.verifyURLContains(page, 'inventory.html');
      await TestUtils.verifyPageTitle(page, testData.pageTitles.inventory);

      TestUtils.logTestStep('Verify no error messages are displayed');
      await loginAssert.verifyNoErrorMessages();
    });

    test('should login successfully with valid performance glitch user credentials', async ({ page }) => {
      /*
       * Test Case: Successful Login with Performance Glitch User
       * 
       * Objective: Verify successful login with performance glitch user (tests performance handling)
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter valid username (performance_glitch_user)
       * 3. Enter valid password (secret_sauce)
       * 4. Click login button
       * 5. Wait for performance delay and verify successful navigation
       * 
       * Expected Results:
       * - User should be redirected to inventory page after performance delay
       * - No error messages should be displayed
       */

      TestUtils.logTestStep('Login with performance glitch user credentials');
      await loginPage.login(testData.users.performance.username, testData.users.performance.password);

      TestUtils.logTestStep('Wait for performance delay and verify successful navigation');
      await TestUtils.waitForPageLoad(page);
      await TestUtils.verifyURLContains(page, 'inventory.html');
    });
  });

  test.describe('Failed Login Scenarios', () => {
    test('should display error message for locked out user', async ({ page }) => {
      /*
       * Test Case: Locked Out User Login Attempt
       * 
       * Objective: Verify appropriate error message is displayed for locked out user
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter locked out username (locked_out_user)
       * 3. Enter valid password (secret_sauce)
       * 4. Click login button
       * 5. Verify error message is displayed
       * 6. Verify user remains on login page
       * 
       * Expected Results:
       * - Error message should be displayed: "Epic sadface: Sorry, this user has been locked out."
       * - User should remain on login page
       * - Form fields should retain entered values
       */

      TestUtils.logTestStep('Attempt login with locked out user');
      await loginPage.login(testData.users.locked.username, testData.users.locked.password);

      TestUtils.logTestStep('Verify error message is displayed');
      await loginAssert.verifyLoginErrorVisible();
      await loginAssert.verifyLoginErrorText(testData.expectedMessages.lockedUserError);

      TestUtils.logTestStep('Verify user remains on login page');
      await TestUtils.verifyURLContains(page, 'index.html');

      TestUtils.logTestStep('Verify form fields retain entered values');
      await loginAssert.verifyUsernameFieldValue(testData.users.locked.username);
      await loginAssert.verifyPasswordFieldValue(testData.users.locked.password);
    });

    test('should display error message for invalid credentials', async ({ page }) => {
      /*
       * Test Case: Invalid Credentials Login Attempt
       * 
       * Objective: Verify appropriate error message is displayed for invalid credentials
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter invalid username
       * 3. Enter invalid password
       * 4. Click login button
       * 5. Verify error message is displayed
       * 6. Verify user remains on login page
       * 
       * Expected Results:
       * - Error message should be displayed: "Epic sadface: Username and password do not match any user in this service"
       * - User should remain on login page
       */

      TestUtils.logTestStep('Attempt login with invalid credentials');
      await loginPage.login('invalid_user', 'wrong_password');

      TestUtils.logTestStep('Verify error message is displayed');
      await loginAssert.verifyLoginErrorVisible();
      await loginAssert.verifyLoginErrorText(testData.expectedMessages.invalidCredentialsError);

      TestUtils.logTestStep('Verify user remains on login page');
      await TestUtils.verifyURLContains(page, 'index.html');
    });

    test('should display error message for empty username', async ({ page }) => {
      /*
       * Test Case: Empty Username Login Attempt
       * 
       * Objective: Verify appropriate error message is displayed when username is empty
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Leave username field empty
       * 3. Enter valid password
       * 4. Click login button
       * 5. Verify error message is displayed
       * 
       * Expected Results:
       * - Error message should be displayed
       * - User should remain on login page
       */

      TestUtils.logTestStep('Attempt login with empty username');
      await loginPage.loginWithPasswordOnly(testData.users.standard.password);

      TestUtils.logTestStep('Verify error message is displayed');
      await loginAssert.verifyLoginErrorVisible();

      TestUtils.logTestStep('Verify user remains on login page');
      await TestUtils.verifyURLContains(page, 'index.html');
    });

    test('should display error message for empty password', async ({ page }) => {
      /*
       * Test Case: Empty Password Login Attempt
       * 
       * Objective: Verify appropriate error message is displayed when password is empty
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter valid username
       * 3. Leave password field empty
       * 4. Click login button
       * 5. Verify error message is displayed
       * 
       * Expected Results:
       * - Error message should be displayed
       * - User should remain on login page
       */

      TestUtils.logTestStep('Attempt login with empty password');
      await loginPage.loginWithUsernameOnly(testData.users.standard.username);

      TestUtils.logTestStep('Verify error message is displayed');
      await loginAssert.verifyLoginErrorVisible();

      TestUtils.logTestStep('Verify user remains on login page');
      await TestUtils.verifyURLContains(page, 'index.html');
    });

    test('should display error message for empty credentials', async ({ page }) => {
      /*
       * Test Case: Empty Credentials Login Attempt
       * 
       * Objective: Verify appropriate error message is displayed when both fields are empty
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Leave username field empty
       * 3. Leave password field empty
       * 4. Click login button
       * 5. Verify error message is displayed
       * 
       * Expected Results:
       * - Error message should be displayed
       * - User should remain on login page
       */

      TestUtils.logTestStep('Attempt login with empty credentials');
      await loginPage.loginWithEmptyCredentials();

      TestUtils.logTestStep('Verify error message is displayed');
      await loginAssert.verifyLoginErrorVisible();

      TestUtils.logTestStep('Verify user remains on login page');
      await TestUtils.verifyURLContains(page, 'index.html');
    });
  });

  test.describe('Form Field Validation', () => {
    test('should clear form fields when clearLoginForm is called', async ({ page }) => {
      /*
       * Test Case: Form Field Clearing
       * 
       * Objective: Verify form fields can be cleared programmatically
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter some text in username and password fields
       * 3. Call clearLoginForm method
       * 4. Verify fields are cleared
       * 
       * Expected Results:
       * - Both username and password fields should be empty
       */

      TestUtils.logTestStep('Enter text in form fields');
      await loginPage.type('#user-name', 'test_username');
      await loginPage.type('#password', 'test_password');

      TestUtils.logTestStep('Clear form fields');
      await loginPage.clearLoginForm();

      TestUtils.logTestStep('Verify fields are cleared');
      await loginAssert.verifyUsernameFieldEmpty();
      await loginAssert.verifyPasswordFieldEmpty();
    });

    test('should handle special characters in form fields', async ({ page }) => {
      /*
       * Test Case: Special Characters in Form Fields
       * 
       * Objective: Verify form fields can handle special characters
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Enter special characters in username field
       * 3. Enter special characters in password field
       * 4. Verify fields accept the input
       * 
       * Expected Results:
       * - Fields should accept special characters
       * - Values should be stored correctly
       */

      const specialUsername = 'user@#$%^&*()';
      const specialPassword = 'pass!@#$%^&*()';

      TestUtils.logTestStep('Enter special characters in form fields');
      await loginPage.type(loginLocators.usernameField, specialUsername);
      await loginPage.type(loginLocators.passwordField, specialPassword);

      TestUtils.logTestStep('Verify special characters are stored correctly');
      await loginAssert.verifyUsernameFieldValue(specialUsername);
      await loginAssert.verifyPasswordFieldValue(specialPassword);
    });
  });

  test.describe('Login Button Behavior', () => {
    test('should disable login button when form is empty', async ({ page }) => {
      /*
       * Test Case: Login Button State with Empty Form
       * 
       * Objective: Verify login button behavior when form fields are empty
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Ensure form fields are empty
       * 3. Verify login button state
       * 
       * Expected Results:
       * - Login button should be enabled (allows empty form submission for error handling)
       */

      TestUtils.logTestStep('Verify form fields are empty');
      await loginAssert.verifyUsernameFieldEmpty();
      await loginAssert.verifyPasswordFieldEmpty();

      TestUtils.logTestStep('Verify login button is enabled');
      await loginAssert.verifyLoginButtonEnabled();
    });

    test('should enable login button when form has content', async ({ page }) => {
      /*
       * Test Case: Login Button State with Form Content
       * 
       * Objective: Verify login button behavior when form fields have content
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Fill username field
       * 3. Fill password field
       * 4. Verify login button state
       * 
       * Expected Results:
       * - Login button should be enabled
       */

      TestUtils.logTestStep('Fill form fields with content');
      await loginPage.type(loginLocators.usernameField, 'test_user');
      await loginPage.type(loginLocators.passwordField, 'test_pass');

      TestUtils.logTestStep('Verify login button is enabled');
      await loginAssert.verifyLoginButtonEnabled();
    });
  });

  test.describe('Page Navigation and URL Validation', () => {
    test('should maintain correct URL structure during login process', async ({ page }) => {
      /*
       * Test Case: URL Structure Validation
       * 
       * Objective: Verify URL structure remains correct during login process
       * 
       * Test Steps:
       * 1. Navigate to login page
       * 2. Verify initial URL
       * 3. Attempt login with invalid credentials
       * 4. Verify URL remains on login page
       * 5. Attempt login with valid credentials
       * 6. Verify URL changes to inventory page
       * 
       * Expected Results:
       * - Initial URL should be login page
       * - Failed login should keep user on login page
       * - Successful login should redirect to inventory page
       */

      TestUtils.logTestStep('Verify initial URL is login page');
      await TestUtils.verifyURLContains(page, 'index.html');

      TestUtils.logTestStep('Attempt failed login and verify URL remains');
      await loginPage.login('invalid_user', 'wrong_password');
      await TestUtils.verifyURLContains(page, 'index.html');

      TestUtils.logTestStep('Attempt successful login and verify URL changes');
      await loginPage.login(testData.users.standard.username, testData.users.standard.password);
      await TestUtils.verifyURLContains(page, 'inventory.html');
    });
  });
});
