import { expect } from '@playwright/test';
import { homeLocators } from './homeLocator';

export class HomeAssertions {
  constructor(public page: any) {}

  async verifyCartCount(count: number) {
    const cartBadge = this.page.locator(homeLocators.cartBadge);
    await expect(cartBadge).toHaveText(count.toString());
  }

  async verifyCartBadgeVisible() {
    await expect(this.page.locator(homeLocators.cartBadge)).toBeVisible();
  }

  async verifyCartBadgeNotVisible() {
    await expect(this.page.locator(homeLocators.cartBadge)).not.toBeVisible();
  }

  async verifyProductCount(expectedCount: number) {
    const productItems = this.page.locator(homeLocators.productItems);
    await expect(productItems).toHaveCount(expectedCount);
  }

  async verifyProductVisible(productName: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    await expect(productItem).toBeVisible();
  }

  async verifyProductNotVisible(productName: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    await expect(productItem).not.toBeVisible();
  }

  async verifyProductPrice(productName: string, expectedPrice: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    const priceElement = productItem.locator(homeLocators.productPrice);
    await expect(priceElement).toHaveText(expectedPrice);
  }

  async verifyProductDescription(productName: string, expectedDescription: string) {
    const productItem = this.page.locator(homeLocators.productItemByName(productName));
    const descElement = productItem.locator(homeLocators.productDescription);
    await expect(descElement).toHaveText(expectedDescription);
  }

  async verifyAddToCartButtonVisible(productName: string) {
    const addButton = this.page.locator(homeLocators.addToCartButtonByName(productName));
    await expect(addButton).toBeVisible();
  }

  async verifyRemoveFromCartButtonVisible(productName: string) {
    const removeButton = this.page.locator(homeLocators.removeFromCartButtonByName(productName));
    await expect(removeButton).toBeVisible();
  }

  async verifyAddToCartButtonNotVisible(productName: string) {
    const addButton = this.page.locator(homeLocators.addToCartButtonByName(productName));
    await expect(addButton).not.toBeVisible();
  }

  async verifyRemoveFromCartButtonNotVisible(productName: string) {
    const removeButton = this.page.locator(homeLocators.removeFromCartButtonByName(productName));
    await expect(removeButton).not.toBeVisible();
  }

  async verifySortDropdownVisible() {
    await expect(this.page.locator(homeLocators.productSort)).toBeVisible();
  }

  async verifySortOptionSelected(expectedValue: string) {
    const sortDropdown = this.page.locator(homeLocators.productSort);
    await expect(sortDropdown).toHaveValue(expectedValue);
  }

  async verifyMenuButtonVisible() {
    await expect(this.page.locator(homeLocators.menuButton)).toBeVisible();
  }

  async verifyCartIconVisible() {
    await expect(this.page.locator(homeLocators.cartIcon)).toBeVisible();
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async verifyProductsSortedByNameAscending() {
    const productNames = await this.page.locator(homeLocators.productName).allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  }

  async verifyProductsSortedByNameDescending() {
    const productNames = await this.page.locator(homeLocators.productName).allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  }

  async verifyProductsSortedByPriceAscending() {
    const productPrices = await this.page.locator(homeLocators.productPrice).allTextContents();
    const sortedPrices = [...productPrices].sort((a, b) => 
      parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', ''))
    );
    expect(productPrices).toEqual(sortedPrices);
  }

  async verifyProductsSortedByPriceDescending() {
    const productPrices = await this.page.locator(homeLocators.productPrice).allTextContents();
    const sortedPrices = [...productPrices].sort((a, b) => 
      parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', ''))
    );
    expect(productPrices).toEqual(sortedPrices);
  }
}
