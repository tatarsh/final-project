import { Page, Locator } from '@playwright/test';
import { LoginLocators } from './loginLocator';

export class LoginAssertion {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.usernameInput = page.locator(LoginLocators.usernameInput);
    this.passwordInput = page.locator(LoginLocators.passwordInput);
    this.loginButton = page.locator(LoginLocators.loginButton);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}