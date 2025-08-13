# 🧪 Playwright E2E Testing Framework - Sauce Demo

A comprehensive end-to-end testing framework built with Playwright for the Sauce Demo e-commerce application. This project demonstrates industry best practices including Page Object Model (POM), comprehensive test coverage, and robust test utilities.

## 🚀 Features

- **Full E2E Coverage**: Complete testing of login, inventory, cart, checkout, and product details
- **Page Object Model**: Clean, maintainable test architecture
- **Comprehensive Test Data**: Centralized test data management
- **Performance Testing**: Page load time measurements
- **Cross-Browser Support**: Built-in viewport and compatibility testing
- **Detailed Test Documentation**: Each test includes comprehensive test case descriptions

## 📁 Project Structure

```
final-project/
├── fixture/
│   └── testData.json          # Centralized test data
├── pages/                     # Page Object Model
│   ├── basePage.ts           # Base page with common methods
│   ├── login/                # Login page objects
│   ├── home/                 # Inventory/home page objects
│   ├── cart/                 # Cart page objects
│   ├── checkout/             # Checkout page objects
│   └── product/              # Product details page objects
├── tests/                    # Test specifications
│   ├── utils/
│   │   └── testUtils.ts      # Common test utilities
│   ├── login/
│   │   └── login.spec.ts     # Login functionality tests
│   ├── home/
│   │   └── home.spec.ts      # Inventory page tests
│   ├── cart/
│   │   └── cart.spec.ts      # Cart functionality tests
│   ├── checkout/
│   │   └── checkout.spec.ts  # Checkout process tests
│   ├── product/
│   │   └── product.spec.ts   # Product details tests
│   └── userFlow.spec.ts      # End-to-end flow tests
├── playwright.config.ts       # Playwright configuration
└── package.json              # Project dependencies
```

## 🛠️ Test Coverage

### 1. **Login Functionality** (`tests/login/login.spec.ts`)
- ✅ UI elements validation
- ✅ Successful login scenarios (standard, performance glitch users)
- ✅ Failed login scenarios (locked out, invalid credentials, empty fields)
- ✅ Form field validation and clearing
- ✅ Page navigation and URL validation

### 2. **Home/Inventory Page** (`tests/home/home.spec.ts`)
- ✅ UI elements and layout verification
- ✅ Product count and information display
- ✅ Product sorting (name and price, ascending/descending)
- ✅ Add/remove from cart functionality
- ✅ Cart badge functionality
- ✅ Navigation to cart and product details

### 3. **Cart Management** (`tests/cart/cart.spec.ts`)
- ✅ Cart page UI elements
- ✅ Cart items display and information
- ✅ Item management (add/remove single, remove all)
- ✅ Navigation between pages
- ✅ Edge cases and performance testing

### 4. **Checkout Process** (`tests/checkout/checkout.spec.ts`)
- ✅ Checkout information page
- ✅ Form validation and field requirements
- ✅ Checkout overview page
- ✅ Checkout completion
- ✅ Cancellation scenarios
- ✅ Edge cases and performance

### 5. **Product Details** (`tests/product/product.spec.ts`)
- ✅ Product details page navigation
- ✅ Product information display
- ✅ Add/remove from cart functionality
- ✅ Navigation and menu functionality
- ✅ Cross-browser compatibility

### 6. **End-to-End Flows** (`tests/userFlow.spec.ts`)
- ✅ Complete shopping flow
- ✅ Quick smoke test
- ✅ Performance testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd final-project

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

#### Run All Tests
```bash
npm test
```

#### Run Specific Test Suites
```bash
# Run only login tests
npx playwright test tests/login/

# Run only cart tests
npx playwright test tests/cart/

# Run only end-to-end tests
npx playwright test tests/userFlow.spec.ts
```

#### Run Tests in Different Modes
```bash
# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in debug mode
npx playwright test --debug

# Run tests with specific browser
npx playwright test --project=chromium
```

#### Generate Test Reports
```bash
# Generate HTML report
npx playwright show-report

# Generate JUnit report
npx playwright test --reporter=junit
```

## 📊 Test Data Management

The project uses a centralized `fixture/testData.json` file containing:

- **User Credentials**: Standard, locked, problem, and performance glitch users
- **Product Information**: Names, prices, and descriptions for all 6 products
- **Sort Options**: All available sorting configurations
- **Checkout Data**: Valid and invalid checkout information
- **Expected Messages**: Error messages and success confirmations
- **Page Titles & URLs**: Expected page metadata

## 🏗️ Architecture

### Page Object Model (POM)
Each page has three components:
1. **Page Class**: Contains page interactions and business logic
2. **Locators**: Centralized element selectors
3. **Assertions**: Page-specific validation methods

### Base Page
Common functionality shared across all pages:
- Element waiting and interaction
- Screenshot capture
- Page load verification
- Common utility methods

### Test Utilities
Reusable helper functions:
- Performance measurement
- Test step logging
- Element interaction with retry logic
- URL and page verification

## 🔧 Configuration

### Playwright Config (`playwright.config.ts`)
- **Browser**: Chromium, Firefox, WebKit
- **Viewport**: 1280x720
- **Headless**: true (configurable)
- **Timeout**: 30 seconds
- **Retries**: 2 retries on failure

### Test Data (`fixture/testData.json`)
- **Base URL**: https://www.saucedemo.com/
- **Users**: Multiple user types for different scenarios
- **Products**: Complete product catalog
- **Validation Data**: Expected outcomes and error messages

## 📈 Performance Testing

The framework includes built-in performance testing:
- Page load time measurements
- Interaction responsiveness testing
- Cross-viewport compatibility testing
- Performance threshold validation

## 🧪 Test Execution Examples

### Quick Smoke Test
```bash
npx playwright test tests/userFlow.spec.ts --grep "Quick smoke test"
```

### Performance Test
```bash
npx playwright test tests/userFlow.spec.ts --grep "Performance test"
```

### Complete E2E Flow
```bash
npx playwright test tests/userFlow.spec.ts --grep "Complete shopping flow"
```

## 📝 Test Documentation

Each test includes comprehensive documentation:
- **Test Case**: Clear description of what is being tested
- **Objective**: What the test aims to verify
- **Test Steps**: Detailed step-by-step execution
- **Expected Results**: What should happen when the test passes

## 🚨 Troubleshooting

### Common Issues

1. **Element Not Found**: Check if the application has loaded completely
2. **Timeout Errors**: Increase timeout values in configuration
3. **Browser Issues**: Ensure Playwright browsers are installed
4. **Test Data Issues**: Verify `testData.ts` file is properly formatted
5. **Terminal Encoding Issues**: If commands show as `ցnpm`, `ցnpx`, try using Command Prompt instead of PowerShell

### Quick Fixes

**If tests won't run:**
```bash
npm run verify          # Check project setup
npm install            # Install dependencies
npx playwright install # Install browsers
```

**Run with Playwright UI (Recommended for debugging):**
```bash
npm run test:ui
```

**Debug Mode:**
```bash
npm run test:debug
```

**For detailed troubleshooting, see:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 📊 Reporting

### HTML Report
```bash
npx playwright show-report
```
Generates an interactive HTML report with:
- Test execution results
- Screenshots on failure
- Performance metrics
- Test execution timeline

### JUnit Report
```bash
npx playwright test --reporter=junit
```
Generates XML reports compatible with CI/CD systems.

## 🔄 Continuous Integration

The framework is designed to work seamlessly with CI/CD pipelines:
- JUnit reporter for CI integration
- Screenshot capture on failures
- Performance metrics collection
- Parallel test execution support

## 📚 Best Practices Implemented

1. **Page Object Model**: Clean separation of concerns
2. **Centralized Test Data**: Easy maintenance and updates
3. **Comprehensive Assertions**: Robust validation methods
4. **Performance Monitoring**: Built-in performance testing
5. **Cross-Browser Support**: Multi-browser compatibility
6. **Detailed Documentation**: Clear test case descriptions
7. **Error Handling**: Graceful failure handling
8. **Test Utilities**: Reusable helper functions

## 🤝 Contributing

1. Follow the existing POM architecture
2. Add comprehensive test case documentation
3. Include both positive and negative test scenarios
4. Add performance testing where applicable
5. Update test data as needed

## 📄 License

This project is for educational and demonstration purposes.

---

**Ready for Demo**: This framework provides a complete, production-ready E2E testing solution with comprehensive coverage of all major e-commerce functionalities.
