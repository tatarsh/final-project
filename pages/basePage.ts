import { Page } from '@playwright/test';

export class BasePage {
  constructor(public page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async type(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string) {
    return this.page.textContent(selector);
  }

  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async isElementVisible(selector: string) {
    return await this.page.isVisible(selector);
  }

  async getElementCount(selector: string) {
    return await this.page.locator(selector).count();
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, { value });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async getAttribute(selector: string, attribute: string) {
    return await this.page.getAttribute(selector, attribute);
  }

  async hover(selector: string) {
    await this.page.hover(selector);
  }

  async doubleClick(selector: string) {
    await this.page.dblclick(selector);
  }

  async rightClick(selector: string) {
    await this.page.click(selector, { button: 'right' });
  }

  async clearField(selector: string) {
    await this.page.fill(selector, '');
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
