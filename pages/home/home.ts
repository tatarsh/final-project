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
    await this.waitForProductsToLoad();
    const addButtons = this.page.locator(homeLocators.addToCartButtons);
    while (await addButtons.count() > 0) {
      await addButtons.first().click();
      await this.waitForTimeout(100);
    }
  }

  async removeAllProductsFromCart() {
    const removeButtons = this.page.locator(homeLocators.removeFromCartButtons);
    while (await removeButtons.count() > 0) {
      await removeButtons.first().click();
      await this.waitForTimeout(100);
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
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    await productItem.locator(homeLocators.productName).click();
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
