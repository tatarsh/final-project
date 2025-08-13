import { BasePage } from '../basePage';
import { cartLocators } from './cartLocator';

export class CartPage extends BasePage {
  async proceedToCheckout() {
    await this.click(cartLocators.checkoutButton);
  }

  async continueShopping() {
    await this.click(cartLocators.continueShoppingButton);
  }

  async removeItemFromCart(itemName: string) {
    const removeButton = this.page.locator(cartLocators.removeButtonByName(itemName));
    await removeButton.click();
  }

  async removeAllItemsFromCart() {
    const removeButtons = await this.page.locator(cartLocators.removeButtons).all();
    for (const button of removeButtons) {
      await button.click();
      await this.waitForTimeout(500);
    }
  }

  async getCartItemCount() {
    return await this.getElementCount(cartLocators.cartItems);
  }

  async getCartItemNames() {
    const itemNames = await this.page.locator(cartLocators.cartItemNames).allTextContents();
    return itemNames;
  }

  async getCartItemPrice(itemName: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    const priceElement = itemElement.locator(cartLocators.cartItemPrice);
    return await priceElement.textContent();
  }

  async getCartItemQuantity(itemName: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    const quantityElement = itemElement.locator(cartLocators.cartItemQuantity);
    return await quantityElement.textContent();
  }

  async isItemInCart(itemName: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    return await itemElement.isVisible();
  }

  async isCartEmpty() {
    const cartItems = await this.getElementCount(cartLocators.cartItems);
    return cartItems === 0;
  }

  async waitForCartToLoad() {
    await this.waitForElement(cartLocators.cartItems);
    await this.waitForPageLoad();
  }

  async getTotalPrice() {
    const totalElement = this.page.locator(cartLocators.totalPrice);
    if (await totalElement.isVisible()) {
      return await totalElement.textContent();
    }
    return null;
  }

  async verifyCartPageElements() {
    await this.waitForElement(cartLocators.cartItems);
    await this.waitForElement(cartLocators.checkoutButton);
    await this.waitForElement(cartLocators.continueShoppingButton);
  }
}
