import { BasePage } from '../basePage';
import { loginLocators } from './loginLocator';

export class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.type(loginLocators.usernameField, username);
    await this.type(loginLocators.passwordField, password);
    await this.click(loginLocators.loginButton);
  }
}
