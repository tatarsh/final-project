import { Page, Locator, expect } from "@playwright/test";
export class basePage {
    protected page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async typing (locator: Locator, value: string) {
        await locator.fill(value);
    }
    async click(locator:Locator) {
        await locator.click();
    }
    async assertVisibile(locator: Locator) {
        await expect(locator).toBeVisible();
    }
}
