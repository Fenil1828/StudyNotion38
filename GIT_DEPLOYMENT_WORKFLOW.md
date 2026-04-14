# Git Workflow for Vercel Deployment

## 📝 Before Committing - Dependency Check

### Step 1: Clean Installation

```bash
# Remove node_modules directories
rm -rf node_modules
rm -rf server/node_modules

# Clean npm cache
npm cache clean --force
cd server && npm cache clean --force && cd ..

# Fresh install
npm install
cd server && npm install && cd ..

# Verify installations succeeded
npm list --depth=0
cd server && npm list --depth=0 && cd ..
```

### Step 2: Build Verification

```bash
# Run production build
npm run build

# Check for build errors
# Output should show:
# - "Compiled successfully"
# - build/ folder created
# - build/static/js/ contains app bundle
# - build/static/css/ contains styles

# Verify critical files exist
ls -la build/
ls -la build/static/js/
ls -la build/static/css/
```

### Step 3: Environment Setup

```bash
# Create server/.env with all required variables
cat > server/.env << 'EOF'
PORT=5000
NODE_ENV=production
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
GROQ_API_KEY=your_groq_key
EOF

# DO NOT commit this file!
```

---

## 🔒 Git Configuration

### Step 1: Setup .gitignore (if not exists)

```bash
# Check current .gitignore
cat .gitignore

# Ensure these lines exist (add if missing)
echo "" >> .gitignore
echo "# Environment variables - NEVER COMMIT" >> .gitignore
echo "server/.env" >> .gitignore
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
echo "" >> .gitignore
echo "# Node/npm" >> .gitignore
echo "node_modules/" >> .gitignore
echo "npm-debug.log*" >> .gitignore
echo "yarn-error.log*" >> .gitignore
echo "" >> .gitignore
echo "# Build artifacts" >> .gitignore
echo "build/" >> .gitignore
echo "dist/" >> .gitignore
echo ".next/" >> .gitignore
echo "" >> .gitignore
echo "# IDE" >> .gitignore
echo ".vscode/" >> .gitignore
echo ".idea/" >> .gitignore
echo "*.swp" >> .gitignore
```

### Step 2: Verify .gitignore is Correct

```bash
# Show current .gitignore
cat .gitignore

# Verify sensitive files are ignored
git check-ignore server/.env
git check-ignore node_modules/
git check-ignore build/

# Make sure .gitignore itself is tracked
git add .gitignore
```

---

## 🔄 Git Commit Workflow

### Step 1: Check Status

```bash
# See what files will be committed
git status

# Expected output should NOT include:
# - server/.env
# - node_modules/
# - build/
# - .env files
```

### Step 2: Stage Files

```bash
# Stage all tracked files
git add .

# Verify nothing sensitive is staged
git diff --cached --name-only | grep -E "(\.env|node_modules|build)"

# If sensitive files appear, remove them:
git reset HEAD server/.env
git reset HEAD node_modules/
git reset HEAD build/
```

### Step 3: Write Deployment Commit

```bash
# Option 1: Simple commit
git commit -m "chore: Deployment-ready code for Vercel"

# Option 2: Detailed commit (recommended)
git commit -m "chore: Prepare codebase for Vercel deployment

- All dependencies verified and locked
- Production build tested successfully  
- Environment variable structure configured
- Vercel configuration validated
- API routes checked
- Ready for: npm run build && vercel --prod"

# Option 3: Very detailed (if many changes)
git commit -m "chore: Final deployment code for Vercel

Build Verification:
- npm install: ✅ All dependencies installed
- npm run build: ✅ Build successful
- Build size: ✅ 1.1 MB (within limits)
- No build errors: ✅ Verified

Configuration:
- vercel.json: ✅ Configured
- server/.env: ✅ Local setup (not committed)
- .gitignore: ✅ Sensitive files ignored
- package.json scripts: ✅ Ready

Backend:
- Express server: ✅ Running on port 5000
- MongoDB connection: ✅ Configured
- Routes registered: ✅ 6 main routes
- Middleware: ✅ CORS, Auth, Validation

Frontend:
- React build: ✅ Production optimized
- API routing: ✅ setupProxy configured
- Redux state: ✅ Slices configured  
- Components: ✅ 40+ ready

Next Step: vercel --prod"
```

### Step 4: Verify Commit

```bash
# See commit details
git log -1

# Show full commit with diff
git log -1 -p

# Show commit stats
git log -1 --stat
```

---

## 🌐 Push to GitHub

### Step 1: Add GitHub Remote (if needed)

```bash
# Check current remotes
git remote -v

# If no remote, add GitHub
git remote add origin https://github.com/YOUR_USERNAME/StudyNotion.git

# Or update existing
git remote set-url origin https://github.com/YOUR_USERNAME/StudyNotion.git
```

### Step 2: Push Code

```bash
# Push to main branch
git push origin main

# Or if using different branch
git push origin develop

# Verify push was successful
git log --oneline -5
```

### Step 3: Verify on GitHub

- Go to https://github.com/YOUR_USERNAME/StudyNotion
- Check that latest commit appears
- Verify no .env files are visible
- Confirm build/ folder is not pushed

---

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
# Creates .vercel/project.json locally (add to .gitignore!)

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# Check deployment
vercel logs
```

### Option 2: Vercel Dashboard

```bash
# 1. Go to https://vercel.com/dashboard
# 2. Click "Add New" > "Project"
# 3. Select "Import Git Repository"
# 4. Choose StudyNotion repository
# 5. Configure:
#    - Root Directory: ./
#    - Build Command: npm run build
#    - Output Directory: build
#    - Framework: React
# 6. Add Environment Variables
# 7. Click Deploy
```

---

## 📦 Environment Variables for Vercel

### Add via Vercel Dashboard

1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable:

```
MONGODB_URL = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
CLOUDINARY_NAME = your_cloudinary_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
MAIL_HOST = smtp.gmail.com
MAIL_USER = your_email@gmail.com
MAIL_PASS = your_app_password
RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_KEY_SECRET = your_razorpay_key_secret
GROQ_API_KEY = your_groq_api_key
NODE_ENV = production
REACT_APP_BASE_URL = https://your-project.vercel.app
```

### Or via Vercel CLI

```bash
vercel env add MONGODB_URL
vercel env add JWT_SECRET
vercel env add CLOUDINARY_NAME
# ... continue for all variables

# Verify variables are set
vercel env list
```

---

## ✅ Complete Deployment Checklist

- [ ] Dependencies cleaned (rm -rf node_modules)
- [ ] Fresh install successful (npm install)
- [ ] Build successful (npm run build)
- [ ] No build errors or warnings
- [ ] Build folder created with assets
- [ ] server/.env created with all variables
- [ ] server/.env is in .gitignore
- [ ] No nodes_modules in git
- [ ] No build/ folder in git
- [ ] .gitignore tracked in git
- [ ] All files staged (git add .)
- [ ] No sensitive files staged  
- [ ] Commit created with message
- [ ] Code pushed to GitHub
- [ ] GitHub shows latest commit
- [ ] Vercel CLI installed
- [ ] Vercel login successful
- [ ] Environment variables in Vercel
- [ ] Production deploy successful
- [ ] Frontend loads at Vercel URL
- [ ] API endpoints responding
- [ ] Database queries working
- [ ] Email sending working
- [ ] File uploads to Cloudinary working
- [ ] Razorpay payment flow working
- [ ] AI chatbot (Groq) working

---

## 🐛 Troubleshooting

### Build Failed on Vercel
```bash
# Try locally first
npm run build

# Check for errors
npm run build 2>&1 | tail -50

# Verify all imports exist
grep -r "import.*from" src/ | grep "\./"
```

### Environment Variables Not Working
```bash
# Pull production environment
vercel env pull

# Check variables loaded
cat .env.local

# Verify in server code
console.log("MONGODB_URL:", process.env.MONGODB_URL)
```

### API Calls Failing
```bash
# Check setupProxy.js exists and is correct
cat src/setupProxy.js

# Verify API endpoints in src/services/apis.js
# Verify backend routes in server/routes/

# Test backend locally
cd server && npm start
curl http://localhost:4000/api/v1/status
```

---

## 📞 Useful Git Commands

```bash
# See all commits
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Completely undo last commit
git reset --hard HEAD~1

# See difference from last commit
git diff

# See staged changes
git diff --cached

# Check specific file status
git status src/App.js

# Remove file from staging
git reset HEAD src/App.js

# See who changed what
git blame src/App.js

# See branch info
git branch -v
```

---

## 🎉 Final Command

When everything is ready, run:

```bash
# Build locally one more time
npm run build

# Commit
git add . && git commit -m "chore: Ready for Vercel deployment"

# Push to GitHub
git push origin main

# Deploy
vercel --prod

# Done!
```

**Deployment complete! 🚀**
