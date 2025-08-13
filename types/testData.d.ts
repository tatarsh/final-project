declare module '*.json' {
  const value: any;
  export default value;
}

export interface TestData {
  baseURL: string;
  users: {
    standard: { username: string; password: string; description: string };
    locked: { username: string; password: string; description: string };
    problem: { username: string; password: string; description: string };
    performance: { username: string; password: string; description: string };
  };
  products: {
    sauceLabsBackpack: { name: string; price: string; description: string };
    sauceLabsBikeLight: { name: string; price: string; description: string };
    sauceLabsBoltTshirt: { name: string; price: string; description: string };
    sauceLabsFleeceJacket: { name: string; price: string; description: string };
    sauceLabsOnesie: { name: string; price: string; description: string };
    testAllTheThingsTshirt: { name: string; price: string; description: string };
  };
  sortOptions: {
    nameAsc: string;
    nameDesc: string;
    priceAsc: string;
    priceDesc: string;
  };
  checkoutData: {
    valid: { firstName: string; lastName: string; postalCode: string };
    invalid: { firstName: string; lastName: string; postalCode: string };
    specialCharacters: { firstName: string; lastName: string; postalCode: string };
  };
  expectedMessages: {
    lockedUserError: string;
    invalidCredentialsError: string;
    checkoutError: string;
    checkoutComplete: string;
    checkoutCompleteMessage: string;
  };
  pageTitles: {
    login: string;
    inventory: string;
    cart: string;
    checkout: string;
    checkoutComplete: string;
  };
  urls: {
    login: string;
    inventory: string;
    cart: string;
    checkout: string;
    checkoutOverview: string;
    checkoutComplete: string;
  };
}
