# StudyNotion - Complete Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Verify All Dependencies are Installed

Run these commands to check dependencies:

```bash
# Clean install all dependencies
npm install
cd server && npm install && cd ..

# Verify installations
npm list --depth=0
cd server && npm list --depth=0 && cd ..
```

### 2. Check Node and npm Versions

```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

**Recommended Versions:**
- Node.js: 18.x or 20.x
- npm: 9.x or higher

---

## 🔍 Build Verification Steps

### Step 1: Test Local Build

```bash
# Frontend build test
npm run build

# Check build folder exists
ls -la build/

# Backend server test (without running full)
cd server
npm run dev
# Press Ctrl+C to stop
cd ..
```

### Step 2: Verify Key Files Exist

```bash
# Check these files exist:
- package.json (root)
- server/package.json
- vercel.json
- server/index.js
- src/index.js
- build/ (after running npm run build)
- server/.env (local only - DO NOT commit)
```

### Step 3: Clean npm Cache Before Building

```bash
npm cache clean --force
cd server && npm cache clean --force && cd ..
npm install
cd server && npm install && cd ..
npm run build
```

---

## 🌍 Environment Variables Setup

### Create Backend Environment File

Create `server/.env` file with:

```env
# Server Config
PORT=5000
NODE_ENV=production

# Database
MONGODB_URL=your_mongodb_connection_string_here

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Cloudinary (for image uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# AI Services
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key (optional)
```

### ⚠️ Important: .env File Security

**DO NOT COMMIT** `server/.env` to Git:

```bash
# Check .gitignore has these lines
echo "server/.env" >> .gitignore
echo ".env" >> .gitignore
echo "node_modules/" >> .gitignore
```

---

## 🚀 Vercel Deployment Process

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel account
vercel login

# 3. Deploy from root directory
cd /path/to/StudyNotion
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set project name: studynotion
# - Framework: React
# - Root directory: ./
# - Build command: npm run build
# - Output directory: build

# 4. Add environment variables via CLI or Dashboard
vercel env add MONGODB_URL
vercel env add JWT_SECRET
vercel env add CLOUDINARY_NAME
# ... add all other variables from server/.env

# 5. Deploy production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard (GitHub Integration)

```bash
# 1. Push code to GitHub
git add .
git commit -m "Final deployment ready code"
git push origin main

# 2. Go to https://vercel.com/dashboard
# 3. Click "Add New..." > "Project"
# 4. Import GitHub repository
# 5. Configure project:
#    - Framework: React
#    - Root Directory: ./
#    - Build Command: npm run build
#    - Output Directory: build
# 6. Add Environment Variables in dashboard
# 7. Click Deploy
```

---

## 🔧 Vercel Configuration File (vercel.json)

Current configuration in `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "react",
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "status": 200
    }
  ],
  "env": {
    "REACT_APP_BASE_URL": "@react_app_base_url",
    "NODE_ENV": "production"
  }
}
```

---

## 📦 Package Dependencies Summary

### Frontend Dependencies (package.json)
- React: 18.2.0
- Redux Toolkit: 2.8.2
- Axios: 1.10.0
- React Router: 7.6.2
- Tailwind CSS: 3.2.7
- Video React: 0.16.0
- And 30+ other packages

**Total:** ~50 packages

### Backend Dependencies (server/package.json)
- Express: 5.1.0
- MongoDB/Mongoose: 8.15.1
- JWT: 9.0.2
- Nodemailer: 7.0.3
- Cloudinary: 2.6.1
- Razorpay: 2.9.6
- Dotenv: 16.6.1
- And 25+ other packages

**Total:** ~40 packages

**Total Project Size:** ~350MB (node_modules), ~3MB (code)

---

## 🔄 Git Commit Best Practices

### Before Committing

```bash
# 1. clean build artifacts (keep for verification, remove before final commit)
rm -rf build/
rm -rf server/node_modules/
rm -rf node_modules/

# 2. Reinstall fresh dependencies
npm install
cd server && npm install && cd ..

# 3. Run build one more time
npm run build

# 4. Check git status
git status
```

### Proper Git Commit Workflow

```bash
# 1. Stage files (excluding sensitive files)
git add .
git add -f .gitignore  # Add .gitignore explicitly

# 2. Verify nothing sensitive is staged
git diff --cached

# 3. Write descriptive commit message
git commit -m "feat: Final deployment-ready code for Vercel

- All dependencies verified and installed
- Build tested successfully
- Environment variables configured
- Ready for production deployment"

# 4. Check commit
git log -1

# 5. Push to GitHub
git push origin main
```

### Useful Git Commands

```bash
# Check what will be committed
git status

# See all files in staging
git diff --cached --name-only

# Remove accidentally staged sensitive files
git reset HEAD server/.env

# Check commit history
git log --oneline -10

# See detailed changes
git diff HEAD~1
```

---

## ✅ Pre-Deployment Checklist

- [ ] Dependencies installed locally (`npm install`, `cd server && npm install`)
- [ ] Local build successful (`npm run build`)
- [ ] No build errors or warnings
- [ ] `server/.env` created with all variables (LOCAL ONLY)
- [ ] `.gitignore` includes `server/.env` and `node_modules/`
- [ ] Git repository initialized (`git init`)
- [ ] All code committed (`git commit`)
- [ ] Repository pushed to GitHub
- [ ] Vercel account created at https://vercel.com
- [ ] Vercel environment variables added or CLI vars set
- [ ] `vercel.json` reviewed and correct
- [ ] Backend routes test successful
- [ ] Frontend API calls routed correctly
- [ ] No console errors or warnings

---

## 🎯 Post-Deployment Verification

After deployment, test:

```bash
# 1. Frontend loads
curl https://your-project.vercel.app

# 2. Backend API responds
curl https://your-project.vercel.app/api/v1/status

# 3. Check Vercel logs
vercel logs https://your-project.vercel.app

# 4. Monitor in Vercel Dashboard
# https://vercel.com/dashboard
```

---

## 🐛 Common Deployment Issues

### Issue: "MODULE_NOT_FOUND"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules server/node_modules
npm install && cd server && npm install && cd ..
```

### Issue: "Build failed"
```bash
# Check vercel.json routes
# Check all imports are correct
# Verify no syntax errors: npm run build locally
```

### Issue: "Environment variables undefined"
```bash
# Set in Vercel Dashboard or CLI:
vercel env pull  # Pull from production
# Check server/.env variables match
```

### Issue: "Backend not responding"
```bash
# Verify server/index.js listens on correct port
# Check routes are registered
# Verify database connection string
```

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **React Build:** https://create-react-app.dev/docs/deployment/
- **Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables
- **Troubleshooting:** https://vercel.com/docs/troubleshoot

---

## 🎉 You're Ready to Deploy!

Run this final command:

```bash
npm run build && vercel --prod
```

**Good luck! 🚀**
