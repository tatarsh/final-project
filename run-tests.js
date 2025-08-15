#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Playwright E2E Testing Framework - Test Runner');
console.log('================================================\n');

const testOptions = [
  {
    name: 'Quick Smoke Test',
    command: 'npx playwright test tests/userFlow.spec.ts --grep "Quick smoke test"',
    description: 'Basic functionality verification (fastest)'
  },
  {
    name: 'Performance Test',
    command: 'npx playwright test tests/userFlow.spec.ts --grep "Performance test"',
    description: 'Page load time measurements'
  },
  {
    name: 'Complete E2E Flow',
    command: 'npx playwright test tests/userFlow.spec.ts --grep "Complete shopping flow"',
    description: 'Full user journey from login to checkout'
  },
  {
    name: 'Login Tests',
    command: 'npx playwright test tests/login/',
    description: 'All login functionality tests'
  },
  {
    name: 'Home/Inventory Tests',
    command: 'npx playwright test tests/home/',
    description: 'All inventory page tests'
  },
  {
    name: 'Cart Tests',
    command: 'npx playwright test tests/cart/',
    description: 'All cart functionality tests'
  },
  {
    name: 'Checkout Tests',
    command: 'npx playwright test tests/checkout/',
    description: 'All checkout process tests'
  },
  {
    name: 'Product Details Tests',
    command: 'npx playwright test tests/product/',
    description: 'All product details tests'
  },
  {
    name: 'All Tests',
    command: 'npx playwright test',
    description: 'Run complete test suite'
  }
];

function displayMenu() {
  console.log('Available Test Options:\n');
  testOptions.forEach((option, index) => {
    console.log(`${index + 1}. ${option.name}`);
    console.log(`   ${option.description}`);
    console.log(`   Command: ${option.command}\n`);
  });
  console.log('0. Exit\n');
}

function runTest(command, description) {
  console.log(`\n🚀 Running: ${description}`);
  console.log(`Command: ${command}\n`);
  
  try {
    const startTime = Date.now();
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`\n✅ Test completed successfully in ${duration} seconds!`);
  } catch (error) {
    console.error('\n❌ Test execution failed!');
    console.error('Error:', error.message);
  }
}

function main() {
  if (process.argv.length > 2) {
    const arg = process.argv[2].toLowerCase();
    
    if (arg === 'smoke') {
      runTest(testOptions[0].command, testOptions[0].name);
      return;
    } else if (arg === 'performance') {
      runTest(testOptions[1].command, testOptions[1].name);
      return;
    } else if (arg === 'e2e') {
      runTest(testOptions[2].command, testOptions[2].name);
      return;
    } else if (arg === 'all') {
      runTest(testOptions[8].command, testOptions[8].name);
      return;
    } else if (arg === 'help') {
      displayMenu();
      return;
    }
  }

  displayMenu();
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Select an option (0-9): ', (answer) => {
    const choice = parseInt(answer);
    
    if (choice === 0) {
      console.log('\n👋 Goodbye!');
      rl.close();
      return;
    }
    
    if (choice >= 1 && choice <= testOptions.length) {
      const selectedOption = testOptions[choice - 1];
      rl.close();
      runTest(selectedOption.command, selectedOption.name);
    } else {
      console.log('\n❌ Invalid option. Please try again.');
      rl.close();
      main();
    }
  });
}

// Check if Playwright is installed
try {
  require('@playwright/test');
} catch (error) {
  console.error('❌ Playwright is not installed. Please run:');
  console.error('   npm install');
  console.error('   npx playwright install');
  process.exit(1);
}

main();
