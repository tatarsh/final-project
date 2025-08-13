import { expect } from '@playwright/test';
import { checkoutLocators } from './checkoutLocator';

export class CheckoutAssertions {
  constructor(public page: any) {}

  // Checkout Information Form Assertions
  async verifyCheckoutFormVisible() {
    await expect(this.page.locator(checkoutLocators.checkoutInfo)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.firstNameField)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.lastNameField)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toBeVisible();
  }

  async verifyContinueButtonEnabled() {
    await expect(this.page.locator(checkoutLocators.continueButton)).toBeEnabled();
  }

  async verifyCancelButtonEnabled() {
    await expect(this.page.locator(checkoutLocators.cancelButton)).toBeEnabled();
  }

  async verifyFirstNameFieldEmpty() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toHaveValue('');
  }

  async verifyLastNameFieldEmpty() {
    await expect(this.page.locator(checkoutLocators.lastNameField)).toHaveValue('');
  }

  async verifyPostalCodeFieldEmpty() {
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toHaveValue('');
  }

  async verifyFirstNameFieldValue(expectedValue: string) {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toHaveValue(expectedValue);
  }

  async verifyLastNameFieldValue(expectedValue: string) {
    await expect(this.page.locator(checkoutLocators.lastNameField)).toHaveValue(expectedValue);
  }

  async verifyPostalCodeFieldValue(expectedValue: string) {
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toHaveValue(expectedValue);
  }

  async verifyErrorMessageVisible() {
    await expect(this.page.locator(checkoutLocators.errorMessage)).toBeVisible();
  }

  async verifyErrorMessageText(expectedText: string) {
    await expect(this.page.locator(checkoutLocators.errorMessage)).toHaveText(expectedText);
  }

  // Checkout Overview Assertions
  async verifyCheckoutOverviewVisible() {
    await expect(this.page.locator(checkoutLocators.checkoutItems)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.finishButton)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.cancelButton)).toBeVisible();
  }

  async verifyCheckoutItemCount(expectedCount: number) {
    const checkoutItems = this.page.locator(checkoutLocators.checkoutItems);
    await expect(checkoutItems).toHaveCount(expectedCount);
  }

  async verifyCheckoutItemVisible(itemName: string) {
    const itemElement = this.page.locator(checkoutLocators.checkoutItemByName(itemName));
    await expect(itemElement).toBeVisible();
  }

  async verifyCheckoutItemPrice(itemName: string, expectedPrice: string) {
    const itemElement = this.page.locator(checkoutLocators.checkoutItemByName(itemName));
    const priceElement = itemElement.locator(checkoutLocators.checkoutItemPrice);
    await expect(priceElement).toHaveText(expectedPrice);
  }

  async verifySubtotalVisible() {
    await expect(this.page.locator(checkoutLocators.subtotal)).toBeVisible();
  }

  async verifyTaxVisible() {
    await expect(this.page.locator(checkoutLocators.tax)).toBeVisible();
  }

  async verifyTotalVisible() {
    await expect(this.page.locator(checkoutLocators.total)).toBeVisible();
  }

  async verifyFinishButtonEnabled() {
    await expect(this.page.locator(checkoutLocators.finishButton)).toBeEnabled();
  }

  // Checkout Complete Assertions
  async verifyCheckoutCompleteVisible() {
    await expect(this.page.locator(checkoutLocators.completeHeader)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.completeMessage)).toBeVisible();
  }

  async verifyCompleteHeaderText(expectedText: string) {
    await expect(this.page.locator(checkoutLocators.completeHeader)).toHaveText(expectedText);
  }

  async verifyCompleteMessageText(expectedText: string) {
    await expect(this.page.locator(checkoutLocators.completeMessage)).toHaveText(expectedText);
  }

  async verifyBackToProductsButtonVisible() {
    await expect(this.page.locator(checkoutLocators.backToProductsButton)).toBeVisible();
  }

  async verifyBackToProductsButtonEnabled() {
    await expect(this.page.locator(checkoutLocators.backToProductsButton)).toBeEnabled();
  }

  // Page Navigation Assertions
  async verifyPageTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyURL(expectedURL: string) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  // Form Validation Assertions
  async verifyFormFieldsRequired() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toHaveAttribute('required');
    await expect(this.page.locator(checkoutLocators.lastNameField)).toHaveAttribute('required');
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toHaveAttribute('required');
  }

  async verifyFormPlaceholders() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toHaveAttribute('placeholder', 'First Name');
    await expect(this.page.locator(checkoutLocators.lastNameField)).toHaveAttribute('placeholder', 'Last Name');
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toHaveAttribute('placeholder', 'Zip/Postal Code');
  }

  // Missing methods referenced in tests
  async verifyErrorDisplayed() {
    await expect(this.page.locator(checkoutLocators.errorMessage)).toBeVisible();
  }

  async verifyCheckoutInformationPageElements() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.lastNameField)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.continueButton)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.cancelButton)).toBeVisible();
  }

  async verifyFirstNameFieldVisible() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toBeVisible();
  }

  async verifyLastNameFieldVisible() {
    await expect(this.page.locator(checkoutLocators.lastNameField)).toBeVisible();
  }

  async verifyPostalCodeFieldVisible() {
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toBeVisible();
  }

  async verifyContinueButtonVisible() {
    await expect(this.page.locator(checkoutLocators.continueButton)).toBeVisible();
  }

  async verifyCancelButtonVisible() {
    await expect(this.page.locator(checkoutLocators.cancelButton)).toBeVisible();
  }

  async verifyFirstNameFieldPlaceholder() {
    await expect(this.page.locator(checkoutLocators.firstNameField)).toHaveAttribute('placeholder', 'First Name');
  }

  async verifyLastNameFieldPlaceholder() {
    await expect(this.page.locator(checkoutLocators.lastNameField)).toHaveAttribute('placeholder', 'Last Name');
  }

  async verifyPostalCodeFieldPlaceholder() {
    await expect(this.page.locator(checkoutLocators.postalCodeField)).toHaveAttribute('placeholder', 'Zip/Postal Code');
  }

  async verifyCheckoutOverviewPageElements() {
    await expect(this.page.locator(checkoutLocators.checkoutItems)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.finishButton)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.cancelButton)).toBeVisible();
  }

  async verifyFinishButtonVisible() {
    await expect(this.page.locator(checkoutLocators.finishButton)).toBeVisible();
  }

  async verifyPaymentInformationDisplayed() {
    await expect(this.page.locator(checkoutLocators.paymentInfo)).toBeVisible();
  }

  async verifyShippingInformationDisplayed() {
    await expect(this.page.locator(checkoutLocators.shippingInfo)).toBeVisible();
  }

  async verifyItemTotalDisplayed() {
    await expect(this.page.locator(checkoutLocators.subtotal)).toBeVisible();
  }

  async verifyTaxDisplayed() {
    await expect(this.page.locator(checkoutLocators.tax)).toBeVisible();
  }

  async verifyTotalDisplayed() {
    await expect(this.page.locator(checkoutLocators.total)).toBeVisible();
  }

  async verifyItemDisplayedInOverview(itemName: string) {
    await expect(this.page.locator(checkoutLocators.checkoutItemByName(itemName))).toBeVisible();
  }

  async verifyCheckoutCompletePageElements() {
    await expect(this.page.locator(checkoutLocators.completeHeader)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.completeMessage)).toBeVisible();
    await expect(this.page.locator(checkoutLocators.backHomeButton)).toBeVisible();
  }

  async verifySuccessMessageDisplayed() {
    await expect(this.page.locator(checkoutLocators.completeMessage)).toBeVisible();
  }

  async verifyBackHomeButtonVisible() {
    await expect(this.page.locator(checkoutLocators.backHomeButton)).toBeVisible();
  }

  async verifyBackHomeButtonEnabled() {
    await expect(this.page.locator(checkoutLocators.backHomeButton)).toBeEnabled();
  }
}
