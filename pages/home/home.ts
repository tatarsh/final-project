import { BasePage } from '../basePage';
import { homeLocators } from './homeLocator';

export class HomePage extends BasePage {
  async sortProducts(value: string) {
    await this.selectOption(homeLocators.productSort, value);
    await this.waitForPageLoad();
  }

  async addBackpackToCart() {
    await this.click(homeLocators.addToCartButton);
  }

  async removeBackpackFromCart() {
    await this.click(homeLocators.removeFromCartButton);
  }

  async addAllProductsToCart() {
    const addButtons = await this.page.locator(homeLocators.addToCartButtons).all();
    for (const button of addButtons) {
      await button.click();
      await this.waitForTimeout(500);
    }
  }

  async removeAllProductsFromCart() {
    const removeButtons = await this.page.locator(homeLocators.removeFromCartButtons).all();
    for (const button of removeButtons) {
      await button.click();
      await this.waitForTimeout(500);
    }
  }

  async goToCart() {
    await this.click(homeLocators.cartIcon);
  }

  async getProductCount() {
    return await this.getElementCount(homeLocators.productItems);
  }

  async getCartBadgeCount() {
    const badge = this.page.locator(homeLocators.cartBadge);
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() || '0');
    }
    return 0;
  }

  async clickProductByName(productName: string) {
    const productLink = this.page.locator(`text=${productName}`);
    await productLink.click();
  }

  async getProductPrice(productName: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    const priceElement = productItem.locator(homeLocators.productPrice);
    return await priceElement.textContent();
  }

  async getProductDescription(productName: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    const descElement = productItem.locator(homeLocators.productDescription);
    return await descElement.textContent();
  }

  async isProductInCart(productName: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    const removeButton = productItem.locator(homeLocators.removeFromCartButton);
    return await removeButton.isVisible();
  }

  async openMenu() {
    await this.click(homeLocators.menuButton);
  }

  async closeMenu() {
    await this.click(homeLocators.closeMenuButton);
  }

  async logout() {
    await this.click(homeLocators.logoutLink);
  }

  async resetAppState() {
    await this.click(homeLocators.resetAppStateLink);
  }

  async getAllProducts() {
    const products: Array<{ name: string | null; price: string | null; description: string | null }> = [];
    const productItems = await this.page.locator(homeLocators.productItems).all();
    
    for (const item of productItems) {
      const name = await item.locator(homeLocators.productName).textContent();
      const price = await item.locator(homeLocators.productPrice).textContent();
      const description = await item.locator(homeLocators.productDescription).textContent();
      
      products.push({ name, price, description });
    }
    
    return products;
  }

  async waitForProductsToLoad() {
    await this.waitForElement(homeLocators.productItems);
    await this.waitForPageLoad();
  }

  async addBikeLightToCart() {
    const bikeLightButton = this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await bikeLightButton.click();
  }

  getProductImageSelector(productName: string) {
    return `${homeLocators.productItemByName(productName)} img`;
  }
}
