import { BasePage } from '../basePage';
import { homeLocators } from './homeLocator';

export class HomePage extends BasePage {
  async sortProducts(value: string) {
    await this.page.selectOption(homeLocators.productSort, value);
  }

  async addBackpackToCart() {
    await this.click(homeLocators.addToCartButton);
  }

  async goToCart() {
    await this.click(homeLocators.cartIcon);
  }
}
