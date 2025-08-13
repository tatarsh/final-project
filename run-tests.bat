@echo off
echo ========================================
echo    Playwright Test Runner (Windows)
echo ========================================
echo.

:menu
echo Select an option:
echo 1. Run all tests
echo 2. Run tests with Playwright UI
echo 3. Run tests in headed mode
echo 4. Run specific test suite
echo 5. Install dependencies
echo 6. Verify setup
echo 7. Exit
echo.
set /p choice="Enter your choice (1-7): "

if "%choice%"=="1" goto run-all
if "%choice%"=="2" goto run-ui
if "%choice%"=="3" goto run-headed
if "%choice%"=="4" goto run-specific
if "%choice%"=="5" goto install
if "%choice%"=="6" goto verify
if "%choice%"=="7" goto exit
echo Invalid choice. Please try again.
goto menu

:run-all
echo Running all tests...
call npx playwright test
pause
goto menu

:run-ui
echo Opening Playwright UI...
call npx playwright test --ui
pause
goto menu

:run-headed
echo Running tests in headed mode...
call npx playwright test --headed
pause
goto menu

:run-specific
echo.
echo Available test suites:
echo 1. Login tests
echo 2. Home/Inventory tests
echo 3. Cart tests
echo 4. Checkout tests
echo 5. Product tests
echo 6. End-to-end flow tests
echo.
set /p suite="Enter suite number (1-6): "

if "%suite%"=="1" call npx playwright test tests/login/
if "%suite%"=="2" call npx playwright test tests/home/
if "%suite%"=="3" call npx playwright test tests/cart/
if "%suite%"=="4" call npx playwright test tests/checkout/
if "%suite%"=="5" call npx playwright test tests/product/
if "%suite%"=="6" call npx playwright test tests/userFlow.spec.ts --grep "Complete shopping flow"
pause
goto menu

:install
echo Installing dependencies...
call npm install
echo Installing Playwright browsers...
call npx playwright install
echo Dependencies installed successfully!
pause
goto menu

:verify
echo Verifying project setup...
call node verify-setup.js
pause
goto menu

:exit
echo Goodbye!
exit /b 0
