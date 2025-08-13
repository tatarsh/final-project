import { Page } from '@playwright/test';

export class TestUtils {
  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(page: Page) {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Take a screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${name}_${timestamp}.png` });
  }

  /**
   * Generate random string for test data
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email for testing
   */
  static generateRandomEmail(): string {
    return `test_${this.generateRandomString(8)}@example.com`;
  }

  /**
   * Generate random phone number
   */
  static generateRandomPhone(): string {
    return `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  }

  /**
   * Wait for element to be visible with custom timeout
   */
  static async waitForElement(page: Page, selector: string, timeout: number = 10000) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  static async waitForElementHidden(page: Page, selector: string, timeout: number = 10000) {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  /**
   * Check if element exists on page
   */
  static async elementExists(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    return await element.count() > 0;
  }

  /**
   * Get element text safely
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    const element = page.locator(selector);
    if (await element.count() > 0) {
      return await element.textContent() || '';
    }
    return '';
  }

  /**
   * Click element safely with retry
   */
  static async clickElementWithRetry(page: Page, selector: string, maxRetries: number = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await page.click(selector);
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Fill form field safely
   */
  static async fillField(page: Page, selector: string, value: string) {
    await page.waitForSelector(selector);
    await page.fill(selector, value);
  }

  /**
   * Select option from dropdown safely
   */
  static async selectOption(page: Page, selector: string, value: string) {
    await page.waitForSelector(selector);
    await page.selectOption(selector, { value });
  }

  /**
   * Verify page URL contains expected path
   */
  static async verifyURLContains(page: Page, expectedPath: string) {
    const currentURL = page.url();
    if (!currentURL.includes(expectedPath)) {
      throw new Error(`Expected URL to contain '${expectedPath}', but got '${currentURL}'`);
    }
  }

  /**
   * Verify page title
   */
  static async verifyPageTitle(page: Page, expectedTitle: string) {
    const actualTitle = await page.title();
    if (actualTitle !== expectedTitle) {
      throw new Error(`Expected page title '${expectedTitle}', but got '${actualTitle}'`);
    }
  }

  /**
   * Log test step information
   */
  static logTestStep(step: string, details?: string) {
    console.log(`\n🔍 Test Step: ${step}`);
    if (details) {
      console.log(`   Details: ${details}`);
    }
  }

  /**
   * Log test assertion
   */
  static logAssertion(assertion: string, expected: any, actual: any) {
    console.log(`   ✅ Assertion: ${assertion}`);
    console.log(`      Expected: ${expected}`);
    console.log(`      Actual: ${actual}`);
  }

  /**
   * Generate test data for different scenarios
   */
  static generateTestData() {
    return {
      validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      invalidUser: {
        username: 'invalid_user',
        password: 'wrong_password'
      },
      lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
      }
    };
  }
}
