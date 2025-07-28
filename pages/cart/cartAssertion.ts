import { expect } from '@playwright/test';
import { cartLocators } from './cartLocator';

export class CartAssertions {
  constructor(public page) {}

  async verifyItemInCart() {
    await expect(this.page.locator(cartLocators.cartItem)).toBeVisible();
  }
}
