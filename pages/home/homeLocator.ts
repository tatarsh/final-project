export const homeLocators = {
  productSort: '.product_sort_container',
  addToCartButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
  removeFromCartButton: '[data-test="remove-sauce-labs-backpack"]',
  addToCartButtons: '[data-test^="add-to-cart-"]',
  removeFromCartButtons: '[data-test^="remove-"]',
  cartIcon: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',
  productItems: '.inventory_item',
  productName: '.inventory_item_name',
  productPrice: '.inventory_item_price',
  productDescription: '.inventory_item_desc',
  menuButton: '#react-burger-menu-btn',
  closeMenuButton: '#react-burger-cross-btn',
  logoutLink: '#logout_sidebar_link',
  resetAppStateLink: '#reset_sidebar_link',
  
  // Helper function for product-specific selectors
  productItemByName: (productName: string) => `.inventory_item:has(.inventory_item_name:has-text("${productName}"))`,
  addToCartButtonByName: (productName: string) => `.inventory_item:has(.inventory_item_name:has-text("${productName}")) [data-test^="add-to-cart-"]`,
  removeFromCartButtonByName: (productName: string) => `.inventory_item:has(.inventory_item_name:has-text("${productName}")) [data-test^="remove-"]`
};
