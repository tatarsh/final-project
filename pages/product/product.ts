import { BasePage } from '../basePage';
import { productLocators } from './productLocator';

export class ProductPage extends BasePage {
  async addProductToCart() {
    await this.click(productLocators.addToCartButton);
  }

  async removeProductFromCart() {
    await this.click(productLocators.removeFromCartButton);
  }

  async goBackToProducts() {
    await this.click(productLocators.backToProductsButton);
  }

  async getProductName() {
    return await this.getText(productLocators.productName);
  }

  async getProductPrice() {
    return await this.getText(productLocators.productPrice);
  }

  async getProductDescription() {
    return await this.getText(productLocators.productDescription);
  }

  async getProductImage() {
    return await this.getAttribute(productLocators.productImage, 'src');
  }

  async isAddToCartButtonVisible() {
    return await this.isElementVisible(productLocators.addToCartButton);
  }

  async isRemoveFromCartButtonVisible() {
    return await this.isElementVisible(productLocators.removeFromCartButton);
  }

  async waitForProductPage() {
    await this.waitForElement(productLocators.productName);
    await this.waitForElement(productLocators.productPrice);
    await this.waitForElement(productLocators.productDescription);
    await this.waitForElement(productLocators.productImage);
  }

  async verifyProductPageElements() {
    await this.waitForElement(productLocators.productName);
    await this.waitForElement(productLocators.productPrice);
    await this.waitForElement(productLocators.productDescription);
    await this.waitForElement(productLocators.productImage);
    await this.waitForElement(productLocators.backToProductsButton);
  }

  async getCartBadgeCount() {
    const badge = this.page.locator(productLocators.cartBadge);
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() || '0');
    }
    return 0;
  }

  async openMenu() {
    await this.click(productLocators.menuButton);
  }

  async closeMenu() {
    await this.click(productLocators.closeMenuButton);
  }

  async logout() {
    await this.click(productLocators.logoutLink);
  }

  async resetAppState() {
    await this.click(productLocators.resetAppStateLink);
  }
}
