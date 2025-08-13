#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Playwright Project Setup...\n');

// Check if package.json exists
if (fs.existsSync('package.json')) {
  console.log('✅ package.json found');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.devDependencies && packageJson.devDependencies['@playwright/test']) {
    console.log('✅ @playwright/test dependency found');
  } else {
    console.log('❌ @playwright/test dependency missing');
  }
} else {
  console.log('❌ package.json not found');
}

// Check if playwright.config.ts exists
if (fs.existsSync('playwright.config.ts')) {
  console.log('✅ playwright.config.ts found');
} else {
  console.log('❌ playwright.config.ts not found');
}

// Check if tsconfig.json exists
if (fs.existsSync('tsconfig.json')) {
  console.log('✅ tsconfig.json found');
} else {
  console.log('❌ tsconfig.json not found');
}

// Check if test files exist
const testDirs = ['tests', 'pages', 'fixture', 'types'];
testDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/ directory found`);
  } else {
    console.log(`❌ ${dir}/ directory not found`);
  }
});

// Check if node_modules exists
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules directory found');
} else {
  console.log('❌ node_modules directory not found - run npm install');
}

console.log('\n📋 Next Steps:');
console.log('1. If node_modules is missing, run: npm install');
console.log('2. Install Playwright browsers: npx playwright install');
console.log('3. Run tests: npm test');
console.log('4. Open Playwright UI: npx playwright test --ui');
console.log('\n🚀 Ready to run tests!');
