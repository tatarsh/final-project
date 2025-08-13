import { BasePage } from '../basePage';
import { loginLocators } from './loginLocator';

export class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.type(loginLocators.usernameField, username);
    await this.type(loginLocators.passwordField, password);
    await this.click(loginLocators.loginButton);
    await this.waitForPageLoad();
  }

  async clearLoginForm() {
    await this.clearField(loginLocators.usernameField);
    await this.clearField(loginLocators.passwordField);
  }

  async getUsernameValue() {
    return await this.getAttribute(loginLocators.usernameField, 'value');
  }

  async getPasswordValue() {
    return await this.getAttribute(loginLocators.passwordField, 'value');
  }

  async isLoginButtonEnabled() {
    return await this.page.isEnabled(loginLocators.loginButton);
  }

  async isUsernameFieldVisible() {
    return await this.isElementVisible(loginLocators.usernameField);
  }

  async isPasswordFieldVisible() {
    return await this.isElementVisible(loginLocators.passwordField);
  }

  async getLoginButtonText() {
    return await this.getText(loginLocators.loginButton);
  }

  async waitForLoginForm() {
    await this.waitForElement(loginLocators.usernameField);
    await this.waitForElement(loginLocators.passwordField);
    await this.waitForElement(loginLocators.loginButton);
  }

  async loginWithEmptyCredentials() {
    await this.click(loginLocators.loginButton);
  }

  async loginWithUsernameOnly(username: string) {
    await this.type(loginLocators.usernameField, username);
    await this.click(loginLocators.loginButton);
  }

  async loginWithPasswordOnly(password: string) {
    await this.type(loginLocators.passwordField, password);
    await this.click(loginLocators.loginButton);
  }
}
