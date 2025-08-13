export const cartLocators = {
  cartItems: '.cart_item',
  cartItem: '.cart_item',
  cartItemNames: '.inventory_item_name',
  cartItemPrice: '.inventory_item_price',
  cartItemQuantity: '.cart_quantity',
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  removeButtons: '[data-test^="remove-"]',
  
  // Helper functions for cart item selectors
  cartItemByName: (itemName: string) => `.cart_item:has(.inventory_item_name:has-text("${itemName}"))`,
  removeButtonByName: (itemName: string) => `${cartLocators.cartItemByName(itemName)} [data-test^="remove-"]`,
  
  // Additional cart elements
  totalPrice: '.cart_total_label',
  cartTitle: '.title',
  cartDescription: '.cart_desc_label'
};
