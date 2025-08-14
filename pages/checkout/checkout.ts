import { BasePage } from '../basePage';
import { checkoutLocators } from './checkoutLocator';

export class CheckoutPage extends BasePage {
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.type(checkoutLocators.firstNameField, firstName);
    await this.type(checkoutLocators.lastNameField, lastName);
    await this.type(checkoutLocators.postalCodeField, postalCode);
  }

  async continueToOverview() {
    await this.click(checkoutLocators.continueButton);
  }

  async finishCheckout() {
    await this.click(checkoutLocators.finishButton);
  }

  async cancelCheckout() {
    await this.click(checkoutLocators.cancelButton);
  }

  async goBackToCart() {
    // Step one and step two both use a cancel button to go back to cart
    if (await this.isElementVisible(checkoutLocators.backToCartButton)) {
      await this.click(checkoutLocators.backToCartButton);
      return;
    }
    if (await this.isElementVisible(checkoutLocators.backToCartButtonStepTwo)) {
      await this.click(checkoutLocators.backToCartButtonStepTwo);
      return;
    }
    // On checkout complete page, back home navigates to inventory
    if (await this.isElementVisible(checkoutLocators.backHomeButton)) {
      await this.click(checkoutLocators.backHomeButton);
      return;
    }
  }

  async backHome() {
    await this.click(checkoutLocators.backHomeButton);
  }

  async getCheckoutItemCount() {
    return await this.getElementCount(checkoutLocators.checkoutItems);
  }

  async getCheckoutItemNames() {
    const itemNames = await this.page.locator(checkoutLocators.checkoutItemNames).allTextContents();
    return itemNames;
  }

  async getCheckoutItemPrice(itemName: string) {
    const itemElement = this.page.locator(checkoutLocators.checkoutItemByName(itemName));
    const priceElement = itemElement.locator(checkoutLocators.checkoutItemPrice);
    return await priceElement.textContent();
  }

  async getSubtotal() {
    const subtotalElement = this.page.locator(checkoutLocators.subtotal);
    const text = await subtotalElement.textContent();
    const match = text?.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : NaN;
  }

  async getTax() {
    const taxElement = this.page.locator(checkoutLocators.tax);
    const text = await taxElement.textContent();
    const match = text?.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : NaN;
  }

  async getTotal() {
    const totalElement = this.page.locator(checkoutLocators.total);
    const text = await totalElement.textContent();
    const match = text?.match(/\$([0-9]+\.[0-9]{2})/);
    return match ? parseFloat(match[1]) : NaN;
  }

  async clearCheckoutForm() {
    await this.clearField(checkoutLocators.firstNameField);
    await this.clearField(checkoutLocators.lastNameField);
    await this.clearField(checkoutLocators.postalCodeField);
  }

  async waitForCheckoutForm() {
    await this.waitForElement(checkoutLocators.firstNameField);
    await this.waitForElement(checkoutLocators.lastNameField);
    await this.waitForElement(checkoutLocators.postalCodeField);
    await this.waitForElement(checkoutLocators.continueButton);
  }

  async waitForCheckoutOverview() {
    await this.waitForElement(checkoutLocators.checkoutItems);
    await this.waitForElement(checkoutLocators.finishButton);
    await this.waitForElement(checkoutLocators.cancelButton);
  }

  async waitForCheckoutComplete() {
    await this.waitForElement(checkoutLocators.completeHeader);
    await this.waitForElement(checkoutLocators.completeMessage);
  }

  async verifyCheckoutPageElements() {
    await this.waitForElement(checkoutLocators.checkoutInfo);
    await this.waitForElement(checkoutLocators.firstNameField);
    await this.waitForElement(checkoutLocators.lastNameField);
    await this.waitForElement(checkoutLocators.postalCodeField);
    await this.waitForElement(checkoutLocators.continueButton);
    await this.waitForElement(checkoutLocators.cancelButton);
  }
}
