#!/bin/bash

# StudyNotion - Deployment Dependency Checker
# Run this script to verify all dependencies before deployment

echo "=========================================="
echo "StudyNotion Dependency Checker"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter for failures
FAILURES=0

# Function to check command
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        $1 --version | head -1
    else
        echo -e "${RED}✗${NC} $1 is NOT installed"
        FAILURES=$((FAILURES + 1))
    fi
    echo ""
}

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1"
    else
        echo -e "${RED}✗${NC} Missing: $1"
        FAILURES=$((FAILURES + 1))
    fi
}

# Function to check directory
check_directory() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} Found: $1 ($(du -sh $1 | cut -f1))"
    else
        echo -e "${RED}✗${NC} Missing: $1"
        FAILURES=$((FAILURES + 1))
    fi
}

echo "1. SYSTEM REQUIREMENTS"
echo "======================"
check_command "node"
check_command "npm"

echo ""
echo "2. NODE VERSION CHECK"
echo "===================="
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 16 ]; then
    echo -e "${GREEN}✓${NC} Node version is $(node -v) (v16+ required)"
else
    echo -e "${RED}✗${NC} Node version is $(node -v) (v16+ required)"
    FAILURES=$((FAILURES + 1))
fi
echo ""

echo ""
echo "3. PROJECT FILES"
echo "================"
check_file "package.json"
check_file "server/package.json"
check_file "vercel.json"
check_file "src/index.js"
check_file "server/index.js"
check_file ".gitignore"

echo ""
echo "4. DEPENDENCIES INSTALLATION"
echo "============================"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend node_modules exists"
    FRONTEND_PACKAGES=$(ls node_modules | wc -l)
    echo "  → $FRONTEND_PACKAGES packages installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend node_modules not found (run: npm install)"
fi

if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend node_modules exists"
    BACKEND_PACKAGES=$(ls server/node_modules | wc -l)
    echo "  → $BACKEND_PACKAGES packages installed"
else
    echo -e "${YELLOW}⚠${NC} Backend node_modules not found (run: cd server && npm install && cd ..)"
fi
echo ""

echo ""
echo "5. CRITICAL FRONTEND PACKAGES"
echo "============================="

# Check package.json for required packages
required_frontend=("react" "react-dom" "react-redux" "axios" "react-router-dom" "tailwindcss")

for pkg in "${required_frontend[@]}"; do
    if grep -q "\"$pkg\"" package.json; then
        VERSION=$(grep "\"$pkg\"" package.json | head -1 | cut -d'"' -f4)
        echo -e "${GREEN}✓${NC} $pkg: $VERSION"
    else
        echo -e "${RED}✗${NC} $pkg: NOT FOUND"
        FAILURES=$((FAILURES + 1))
    fi
done
echo ""

echo ""
echo "6. CRITICAL BACKEND PACKAGES"
echo "============================"

# Check server/package.json for required packages
required_backend=("express" "mongoose" "jsonwebtoken" "dotenv" "cors" "bcrypt")

for pkg in "${required_backend[@]}"; do
    if grep -q "\"$pkg\"" server/package.json; then
        VERSION=$(grep "\"$pkg\"" server/package.json | head -1 | cut -d'"' -f4)
        echo -e "${GREEN}✓${NC} $pkg: $VERSION"
    else
        echo -e "${RED}✗${NC} $pkg: NOT FOUND"
        FAILURES=$((FAILURES + 1))
    fi
done
echo ""

echo ""
echo "7. BUILD ARTIFACTS"
echo "=================="
if [ -d "build" ]; then
    echo -e "${GREEN}✓${NC} Build folder exists"
    BUILD_SIZE=$(du -sh build | cut -f1)
    echo "  → Size: $BUILD_SIZE"
else
    echo -e "${YELLOW}⚠${NC} Build folder not found (run: npm run build)"
fi
echo ""

echo ""
echo "8. ENVIRONMENT CONFIGURATION"
echo "============================"
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓${NC} server/.env exists"
    ENV_VARS=$(grep -c "=" server/.env)
    echo "  → $ENV_VARS variables configured"
else
    echo -e "${YELLOW}⚠${NC} server/.env not found (create with required variables)"
fi

if grep -q "server/.env" .gitignore 2>/dev/null; then
    echo -e "${GREEN}✓${NC} server/.env is in .gitignore"
else
    echo -e "${RED}✗${NC} server/.env NOT in .gitignore"
    FAILURES=$((FAILURES + 1))
fi
echo ""

echo ""
echo "9. GIT CONFIGURATION"
echo "===================="
if [ -d ".git" ]; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
    COMMITS=$(git rev-list --count HEAD 2>/dev/null || echo "0")
    echo "  → $COMMITS commits"
else
    echo -e "${YELLOW}⚠${NC} Git repository not initialized (run: git init)"
fi
echo ""

echo ""
echo "10. SENSITIVITY FILES CHECK"
echo "==========================="

# Check if sensitive files might be in git
if [ -d ".git" ]; then
    git status --short | grep -E "(\.env|node_modules|build)" && \
        echo -e "${RED}✗${NC} Found sensitive files in git status" || \
        echo -e "${GREEN}✓${NC} No sensitive files detected"
else
    echo -e "${YELLOW}⚠${NC} Cannot check (not a git repo)"
fi
echo ""

echo ""
echo "=========================================="
if [ $FAILURES -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready for deployment.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. npm run build"
    echo "2. git add . && git commit -m 'Deploy'"
    echo "3. git push origin main"
    echo "4. vercel --prod"
else
    echo -e "${RED}✗ $FAILURES checks failed. Please fix before deployment.${NC}"
fi
echo "=========================================="
