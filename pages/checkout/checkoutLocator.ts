export const checkoutLocators = {
  // Checkout Information Form
  checkoutInfo: '.checkout_info',
  firstNameField: '[data-test="firstName"]',
  lastNameField: '[data-test="lastName"]',
  postalCodeField: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  
  // Checkout Overview
  checkoutItems: '.cart_item',
  checkoutItemNames: '.inventory_item_name',
  checkoutItemPrice: '.inventory_item_price',
  subtotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
  finishButton: '[data-test="finish"]',
  backToCartButton: '[data-test="cancel"]',
  backToCartButtonStepTwo: '[data-test="cancel"]',
  
  // Checkout Complete
  completeHeader: '.complete-header',
  completeMessage: '.complete-text',
  backToProductsButton: '[data-test="back-to-products"]',
  backHomeButton: '[data-test="back-to-products"]',
  
  // Additional elements
  paymentInfo: '.summary_info',
  shippingInfo: '.summary_info',
  
  // Helper functions
  checkoutItemByName: (itemName: string) => `.cart_item:has(.inventory_item_name:has-text("${itemName}"))`,
  
  // Error messages
  errorMessage: '[data-test="error"]',
  firstNameError: '[data-test="firstName-error"]',
  lastNameError: '[data-test="lastName-error"]',
  postalCodeError: '[data-test="postalCode-error"]'
};
