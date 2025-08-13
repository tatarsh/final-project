import { expect } from '@playwright/test';
import { loginLocators } from './loginLocator';

export class LoginAssertions {
  constructor(public page: any) {}

  async verifyLoginErrorVisible() {
    await expect(this.page.locator(loginLocators.errorMessage)).toBeVisible();
  }

  async verifyLoginErrorText(expectedText: string) {
    await expect(this.page.locator(loginLocators.errorMessage)).toHaveText(expectedText);
  }

  async verifyLoginFormVisible() {
    await expect(this.page.locator(loginLocators.usernameField)).toBeVisible();
    await expect(this.page.locator(loginLocators.passwordField)).toBeVisible();
    await expect(this.page.locator(loginLocators.loginButton)).toBeVisible();
  }

  async verifyLoginButtonEnabled() {
    await expect(this.page.locator(loginLocators.loginButton)).toBeEnabled();
  }

  async verifyLoginButtonText(expectedText: string) {
    await expect(this.page.locator(loginLocators.loginButton)).toHaveText(expectedText);
  }

  async verifyUsernameFieldEmpty() {
    await expect(this.page.locator(loginLocators.usernameField)).toHaveValue('');
  }

  async verifyPasswordFieldEmpty() {
    await expect(this.page.locator(loginLocators.passwordField)).toHaveValue('');
  }

  async verifyUsernameFieldValue(expectedValue: string) {
    await expect(this.page.locator(loginLocators.usernameField)).toHaveValue(expectedValue);
  }

  async verifyPasswordFieldValue(expectedValue: string) {
    await expect(this.page.locator(loginLocators.passwordField)).toHaveValue(expectedValue);
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async verifyLoginFormPlaceholders() {
    await expect(this.page.locator(loginLocators.usernameField)).toHaveAttribute('placeholder', 'Username');
    await expect(this.page.locator(loginLocators.passwordField)).toHaveAttribute('placeholder', 'Password');
  }

  async verifyNoErrorMessages() {
    await expect(this.page.locator(loginLocators.errorMessage)).not.toBeVisible();
  }
}
