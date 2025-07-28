import { expect } from '@playwright/test';

export class HomeAssertions {
  constructor(public page) {}

  async verifyCartCount(count: number) {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText(count.toString());
  }
}
