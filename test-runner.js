#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🧪 Playwright Test Runner - Project Verification');
console.log('===============================================\n');

// Check if we're in the right directory
console.log('📁 Current directory:', process.cwd());
console.log('📦 Package.json exists:', require('fs').existsSync('package.json'));
console.log('⚙️  Playwright config exists:', require('fs').existsSync('playwright.config.ts'));
console.log('📝 Test files exist:', require('fs').existsSync('tests/'));
console.log('🔧 Page objects exist:', require('fs').existsSync('pages/'));
console.log('📊 Test data exists:', require('fs').existsSync('fixture/testData.ts'));

console.log('\n🚀 Attempting to run a simple test...\n');

try {
  // Try to run a simple test
  const result = execSync('npx playwright test --list', { 
    encoding: 'utf8',
    stdio: 'pipe'
  });
  console.log('✅ Test discovery successful:');
  console.log(result);
} catch (error) {
  console.log('❌ Test discovery failed:');
  console.log('Error:', error.message);
  console.log('\n💡 This might be due to:');
  console.log('   - Node.js not being installed');
  console.log('   - Playwright not being installed');
  console.log('   - Test configuration issues');
}

console.log('\n🔍 Project structure verification complete!');
console.log('📚 Check the README.md for setup instructions.');

