import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly itemName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemName = page.locator('.inventory_item_name');
  }

  async getItemNameText() {
    return await this.itemName.textContent();
  }
}