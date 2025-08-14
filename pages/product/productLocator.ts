export const productLocators = {
  // Product Information
  productName: '.inventory_details_name',
  productPrice: '.inventory_details_price',
  productDescription: '.inventory_details_desc',
  productImage: '.inventory_details_img',
  
  // Action Buttons
  addToCartButton: '[data-test^="add-to-cart"]',
  removeFromCartButton: '[data-test^="remove"]',
  backToProductsButton: '[data-test="back-to-products"]',
  
  // Cart and Menu
  cartBadge: '.shopping_cart_badge',
  cartIcon: '.shopping_cart_link',
  menuButton: '#react-burger-menu-btn',
  closeMenuButton: '#react-burger-cross-btn',
  logoutLink: '#logout_sidebar_link',
  resetAppStateLink: '#reset_sidebar_link',
  
  // Helper functions for dynamic selectors
  addToCartButtonByName: (productName: string) => `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
  removeFromCartButtonByName: (productName: string) => `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`
};
