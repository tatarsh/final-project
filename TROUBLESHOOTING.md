# Troubleshooting Guide

## Common Issues and Solutions

### 1. Terminal Command Issues (Character Encoding)

**Problem:** Commands like `npm`, `npx`, `node` show as `ցnpm`, `ցnpx`, `ցnode`

**Solution:** This indicates a PowerShell encoding issue. Try these steps:
- Close and reopen PowerShell
- Run PowerShell as Administrator
- Use Command Prompt instead: `cmd` then run commands
- Check Windows language settings

### 2. Node.js Not Installed

**Problem:** `'node' is not recognized as an internal or external command`

**Solution:** Install Node.js:
1. Download from [nodejs.org](https://nodejs.org/)
2. Install with default settings
3. Restart terminal/PowerShell
4. Verify with: `node --version`

### 3. Playwright Not Installed

**Problem:** `'npx' is not recognized` or Playwright errors

**Solution:** Install dependencies:
```bash
npm install
npx playwright install
```

### 4. Test Execution Issues

**Problem:** Tests fail to run or show errors

**Solutions:**
1. **Check configuration:**
   ```bash
   npm run verify
   ```

2. **Install browsers:**
   ```bash
   npx playwright install
   ```

3. **Run with UI (recommended for debugging):**
   ```bash
   npm run test:ui
   ```

4. **Run specific test suite:**
   ```bash
   npm run test:login
   npm run test:home
   npm run test:cart
   npm run test:checkout
   npm run test:product
   ```

### 5. TypeScript Compilation Errors

**Problem:** TypeScript errors when running tests

**Solutions:**
1. **Check tsconfig.json exists and is correct**
2. **Verify all imports are correct**
3. **Check for missing dependencies**

### 6. WebServer Configuration Error

**Problem:** `Error: Process from config.webServer was not able to start`

**Solution:** This project tests the public Sauce Demo website, so no local server is needed. The `webServer` configuration has been removed from `playwright.config.ts`.

### 7. Test Data Import Issues

**Problem:** `Cannot find module '../fixture/testData'`

**Solution:** The test data is now in TypeScript format (`testData.ts`) and properly typed. All imports should work correctly.

## Running Tests Successfully

### Step 1: Verify Setup
```bash
npm run verify
```

### Step 2: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 3: Run Tests

**Option 1: Run all tests**
```bash
npm test
```

**Option 2: Run with Playwright UI (Recommended)**
```bash
npm run test:ui
```

**Option 3: Run specific test suites**
```bash
npm run test:login      # Login tests only
npm run test:home       # Home/Inventory tests only
npm run test:cart       # Cart tests only
npm run test:checkout   # Checkout tests only
npm run test:product    # Product tests only
npm run test:e2e        # End-to-end flow tests
```

**Option 4: Run with headed browser (see browser)**
```bash
npm run test:headed
```

**Option 5: Debug mode**
```bash
npm run test:debug
```

## Project Structure Verification

Ensure your project has these files and directories:
```
final-project/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── tests/
│   ├── login/
│   ├── home/
│   ├── cart/
│   ├── checkout/
│   ├── product/
│   ├── userFlow.spec.ts
│   └── utils/
├── pages/
│   ├── basePage.ts
│   ├── login/
│   ├── home/
│   ├── cart/
│   ├── checkout/
│   └── product/
├── fixture/
│   └── testData.ts
└── types/
    └── testData.d.ts
```

## Still Having Issues?

1. **Check Node.js version:** `node --version` (should be 16+)
2. **Check npm version:** `npm --version`
3. **Clear npm cache:** `npm cache clean --force`
4. **Delete node_modules and reinstall:** 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
5. **Check Windows Defender/Firewall** - may block npm/npx
6. **Use Command Prompt instead of PowerShell**

## Success Indicators

When everything is working correctly, you should see:
- ✅ All verification checks pass
- ✅ Tests run without TypeScript errors
- ✅ Playwright UI opens successfully
- ✅ Tests execute and show results
- ✅ HTML reports generate correctly

## Getting Help

If you continue to have issues:
1. Check the error messages carefully
2. Verify all files exist in the correct locations
3. Ensure Node.js is properly installed
4. Try running commands in Command Prompt instead of PowerShell
5. Check Windows system requirements and updates
