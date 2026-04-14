@echo off
REM StudyNotion - Deployment Dependency Checker (Windows)
REM Run this script to verify all dependencies before deployment

echo.
echo ==========================================
echo StudyNotion Deployment Checker (Windows)
echo ==========================================
echo.

setlocal enabledelayedexpansion
set FAILURES=0

REM Color codes (using echo with special characters)
set GREEN=[92m
set RED=[91m
set YELLOW=[93m
set NC=[0m

echo 1. SYSTEM REQUIREMENTS
echo =======================

REM Check Node
node --version >nul 2>&1
if %errorlevel%==0 (
    echo [92m✓[0m Node is installed
    node --version
) else (
    echo [91m✗[0m Node is NOT installed
    set /a FAILURES=%FAILURES%+1
)
echo.

REM Check npm
npm --version >nul 2>&1
if %errorlevel%==0 (
    echo [92m✓[0m npm is installed
    npm --version
) else (
    echo [91m✗[0m npm is NOT installed
    set /a FAILURES=%FAILURES%+1
)
echo.

echo 2. PROJECT FILES
echo =================

if exist "package.json" (
    echo [92m✓[0m Found: package.json
) else (
    echo [91m✗[0m Missing: package.json
    set /a FAILURES=%FAILURES%+1
)

if exist "server\package.json" (
    echo [92m✓[0m Found: server\package.json
) else (
    echo [91m✗[0m Missing: server\package.json
    set /a FAILURES=%FAILURES%+1
)

if exist "vercel.json" (
    echo [92m✓[0m Found: vercel.json
) else (
    echo [91m✗[0m Missing: vercel.json
    set /a FAILURES=%FAILURES%+1
)

if exist "src\index.js" (
    echo [92m✓[0m Found: src\index.js
) else (
    echo [91m✗[0m Missing: src\index.js
    set /a FAILURES=%FAILURES%+1
)

if exist "server\index.js" (
    echo [92m✓[0m Found: server\index.js
) else (
    echo [91m✗[0m Missing: server\index.js
    set /a FAILURES=%FAILURES%+1
)

if exist ".gitignore" (
    echo [92m✓[0m Found: .gitignore
) else (
    echo [91m✗[0m Missing: .gitignore
)
echo.

echo 3. DEPENDENCIES INSTALLATION
echo =============================

if exist "node_modules" (
    echo [92m✓[0m Frontend node_modules exists
) else (
    echo [93m⚠[0m Frontend node_modules not found - run: npm install
)

if exist "server\node_modules" (
    echo [92m✓[0m Backend node_modules exists
) else (
    echo [93m⚠[0m Backend node_modules not found - run: cd server ^&^& npm install ^&^& cd ..
)
echo.

echo 4. BUILD ARTIFACTS
echo ==================

if exist "build" (
    echo [92m✓[0m Build folder exists
) else (
    echo [93m⚠[0m Build folder not found - run: npm run build
)
echo.

echo 5. ENVIRONMENT CONFIGURATION
echo =============================

if exist "server\.env" (
    echo [92m✓[0m server\.env exists
) else (
    echo [93m⚠[0m server\.env not found - Create with required variables
)

find /i "server/.env" .gitignore >nul 2>&1
if %errorlevel%==0 (
    echo [92m✓[0m server\.env is in .gitignore
) else (
    echo [91m✗[0m server\.env NOT in .gitignore
    set /a FAILURES=%FAILURES%+1
)
echo.

echo 6. GIT CONFIGURATION
echo ====================

if exist ".git" (
    echo [92m✓[0m Git repository initialized
) else (
    echo [93m⚠[0m Git repository not initialized - run: git init
)
echo.

echo ==========================================
if %FAILURES%==0 (
    echo [92m✓ All critical checks passed!
    echo Ready for deployment.
    echo.
    echo Next steps:
    echo 1. npm install
    echo 2. cd server ^&^& npm install ^&^& cd ..
    echo 3. npm run build
    echo 4. git add .
    echo 5. git commit -m "Deploy"
    echo 6. git push origin main
    echo 7. vercel --prod
) else (
    echo [91m✗ %FAILURES% checks failed!
    echo Please fix before deployment.
)
echo [0m==========================================
echo.

pause
