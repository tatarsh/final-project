import { BasePage } from '../basePage';
import { cartLocators } from './cartLocator';

export class CartPage extends BasePage {
  async proceedToCheckout() {
    await this.click(cartLocators.checkoutButton);
  }
}
