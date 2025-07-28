import { expect } from '@playwright/test';
import { loginLocators } from './loginLocator';

export class LoginAssertions {
  constructor(public page) {}

  async verifyLoginErrorVisible() {
    await expect(this.page.locator(loginLocators.errorMessage)).toBeVisible();
  }
}
