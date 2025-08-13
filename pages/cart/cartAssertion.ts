import { expect } from '@playwright/test';
import { cartLocators } from './cartLocator';

export class CartAssertions {
  constructor(public page: any) {}

  async verifyItemInCart() {
    await expect(this.page.locator(cartLocators.cartItem)).toBeVisible();
  }

  async verifyItemInCartByName(itemName: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    await expect(itemElement).toBeVisible();
  }

  async verifyItemNotInCartByName(itemName: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    await expect(itemElement).not.toBeVisible();
  }

  async verifyCartItemCount(expectedCount: number) {
    const cartItems = this.page.locator(cartLocators.cartItems);
    await expect(cartItems).toHaveCount(expectedCount);
  }

  async verifyCartEmpty() {
    const cartItems = this.page.locator(cartLocators.cartItems);
    await expect(cartItems).toHaveCount(0);
  }

  async verifyCartNotEmpty() {
    const cartItems = this.page.locator(cartLocators.cartItems);
    await expect(cartItems).not.toHaveCount(0);
  }

  async verifyCheckoutButtonVisible() {
    await expect(this.page.locator(cartLocators.checkoutButton)).toBeVisible();
  }

  async verifyCheckoutButtonEnabled() {
    await expect(this.page.locator(cartLocators.checkoutButton)).toBeEnabled();
  }

  async verifyContinueShoppingButtonVisible() {
    await expect(this.page.locator(cartLocators.continueShoppingButton)).toBeVisible();
  }

  async verifyContinueShoppingButtonEnabled() {
    await expect(this.page.locator(cartLocators.continueShoppingButton)).toBeEnabled();
  }

  async verifyCartTitle(expectedTitle: string) {
    await expect(this.page.locator(cartLocators.cartTitle)).toHaveText(expectedTitle);
  }

  async verifyCartDescription(expectedDescription: string) {
    await expect(this.page.locator(cartLocators.cartDescription)).toHaveText(expectedDescription);
  }

  async verifyItemPrice(itemName: string, expectedPrice: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    const priceElement = itemElement.locator(cartLocators.cartItemPrice);
    await expect(priceElement).toHaveText(expectedPrice);
  }

  async verifyItemQuantity(itemName: string, expectedQuantity: string) {
    const itemElement = this.page.locator(cartLocators.cartItemByName(itemName));
    const quantityElement = itemElement.locator(cartLocators.cartItemQuantity);
    await expect(quantityElement).toHaveText(expectedQuantity);
  }

  async verifyRemoveButtonVisible(itemName: string) {
    const removeButton = this.page.locator(cartLocators.removeButtonByName(itemName));
    await expect(removeButton).toBeVisible();
  }

  async verifyRemoveButtonNotVisible(itemName: string) {
    const removeButton = this.page.locator(cartLocators.removeButtonByName(itemName));
    await expect(removeButton).not.toBeVisible();
  }

  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async verifyCartItemsOrder(itemNames: string[]) {
    const actualItemNames = await this.page.locator(cartLocators.cartItemNames).allTextContents();
    expect(actualItemNames).toEqual(itemNames);
  }

  async verifyTotalPriceVisible() {
    await expect(this.page.locator(cartLocators.totalPrice)).toBeVisible();
  }

  async verifyTotalPriceText(expectedText: string) {
    await expect(this.page.locator(cartLocators.totalPrice)).toHaveText(expectedText);
  }
}
