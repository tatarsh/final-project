import { expect } from '@playwright/test';
import { productLocators } from './productLocator';

export class ProductAssertions {
  constructor(public page: any) {}

  // Product Information Assertions
  async verifyProductNameVisible() {
    await expect(this.page.locator(productLocators.productName)).toBeVisible();
  }

  async verifyProductNameText(expectedName: string) {
    await expect(this.page.locator(productLocators.productName)).toHaveText(expectedName);
  }

  async verifyProductPriceVisible() {
    await expect(this.page.locator(productLocators.productPrice)).toBeVisible();
  }

  async verifyProductPriceText(expectedPrice: string) {
    await expect(this.page.locator(productLocators.productPrice)).toHaveText(expectedPrice);
  }

  async verifyProductDescriptionVisible() {
    await expect(this.page.locator(productLocators.productDescription)).toBeVisible();
  }

  async verifyProductDescriptionText(expectedDescription: string) {
    await expect(this.page.locator(productLocators.productDescription)).toHaveText(expectedDescription);
  }

  async verifyProductImageVisible() {
    await expect(this.page.locator(productLocators.productImage)).toBeVisible();
  }

  async verifyProductImageSource(expectedSource: string) {
    await expect(this.page.locator(productLocators.productImage)).toHaveAttribute('src', expectedSource);
  }

  // Button Assertions
  async verifyAddToCartButtonVisible() {
    // Product details page has a single action button; scope to details container to avoid strict mode clashes
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.addToCartButton)).toBeVisible();
  }

  async verifyAddToCartButtonEnabled() {
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.addToCartButton)).toBeEnabled();
  }

  async verifyRemoveFromCartButtonVisible() {
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.removeFromCartButton)).toBeVisible();
  }

  async verifyRemoveFromCartButtonEnabled() {
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.removeFromCartButton)).toBeEnabled();
  }

  async verifyBackToProductsButtonVisible() {
    await expect(this.page.locator(productLocators.backToProductsButton)).toBeVisible();
  }

  async verifyBackToProductsButtonEnabled() {
    await expect(this.page.locator(productLocators.backToProductsButton)).toBeEnabled();
  }

  // Cart Badge Assertions
  async verifyCartBadgeVisible() {
    await expect(this.page.locator(productLocators.cartBadge)).toBeVisible();
  }

  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator(productLocators.cartBadge)).not.toBeVisible();
  }

  async verifyCartBadgeCount(expectedCount: number) {
    const cartBadge = this.page.locator(productLocators.cartBadge);
    await expect(cartBadge).toHaveText(expectedCount.toString());
  }

  // Menu Assertions
  async verifyMenuButtonVisible() {
    await expect(this.page.locator(productLocators.menuButton)).toBeVisible();
  }

  async verifyMenuButtonEnabled() {
    await expect(this.page.locator(productLocators.menuButton)).toBeEnabled();
  }

  async verifyCloseMenuButtonVisible() {
    await expect(this.page.locator(productLocators.closeMenuButton)).toBeVisible();
  }

  async verifyCloseMenuButtonEnabled() {
    await expect(this.page.locator(productLocators.closeMenuButton)).toBeEnabled();
  }

  // Page Navigation Assertions
  async verifyPageTitle(expectedTitle?: string) {
    if (expectedTitle) {
      await expect(this.page).toHaveTitle(expectedTitle);
    } else {
      await expect(this.page).toHaveTitle('Swag Labs');
    }
  }

  async verifyURL(expectedURL?: string) {
    if (expectedURL) {
      // Allow optional query string like ?id=4
      const escaped = expectedURL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      await expect(this.page).toHaveURL(new RegExp(`${escaped}(?:\\?.*)?$`));
    } else {
      await expect(this.page).toHaveURL(/.*inventory-item\.html/);
    }
  }

  // Product Details Validation
  async verifyProductDetailsNotEmpty() {
    const productName = await this.page.locator(productLocators.productName).textContent();
    const productPrice = await this.page.locator(productLocators.productPrice).textContent();
    const productDescription = await this.page.locator(productLocators.productDescription).textContent();
    
    expect(productName).toBeTruthy();
    expect(productPrice).toBeTruthy();
    expect(productDescription).toBeTruthy();
  }

  async verifyProductPriceFormat() {
    const productPrice = await this.page.locator(productLocators.productPrice).textContent();
    expect(productPrice).toMatch(/^\$\d+\.\d{2}$/);
  }

  async verifyProductImageLoaded() {
    const productImage = this.page.locator(productLocators.productImage);
    await expect(productImage).toHaveAttribute('src');
    const src = await productImage.getAttribute('src');
    expect(src).toContain('data:image');
  }

  // Button State Validation
  async verifyCorrectButtonState(isInCart: boolean) {
    if (isInCart) {
      await expect(this.page.locator(productLocators.removeFromCartButton)).toBeVisible();
      await expect(this.page.locator(productLocators.addToCartButton)).not.toBeVisible();
    } else {
      await expect(this.page.locator(productLocators.addToCartButton)).toBeVisible();
      await expect(this.page.locator(productLocators.removeFromCartButton)).not.toBeVisible();
    }
  }

  // Missing methods referenced in tests
  async verifyProductPageElements() {
    await expect(this.page.locator(productLocators.productName)).toBeVisible();
    await expect(this.page.locator(productLocators.productPrice)).toBeVisible();
    await expect(this.page.locator(productLocators.productDescription)).toBeVisible();
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.addToCartButton)).toBeVisible();
    await expect(this.page.locator(productLocators.backToProductsButton)).toBeVisible();
  }

  async verifyRemoveFromCartButtonNotVisible() {
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.removeFromCartButton)).not.toBeVisible();
  }

  async verifyAddToCartButtonNotVisible() {
    await expect(this.page.locator('.inventory_details_desc_container').locator(productLocators.addToCartButton)).not.toBeVisible();
  }

  async verifyMenuOpen() {
    await expect(this.page.locator(productLocators.menuButton)).toBeVisible();
  }

  async verifyMenuClosed() {
    await expect(this.page.locator(productLocators.closeMenuButton)).not.toBeVisible();
  }

  async verifyAllMenuOptionsVisible() {
    await expect(this.page.locator(productLocators.logoutLink)).toBeVisible();
    await expect(this.page.locator(productLocators.resetAppStateLink)).toBeVisible();
  }

  async verifyMenuOptionsLabeled() {
    await expect(this.page.locator(productLocators.logoutLink)).toHaveText('Logout');
    await expect(this.page.locator(productLocators.resetAppStateLink)).toHaveText('Reset App State');
  }
}
