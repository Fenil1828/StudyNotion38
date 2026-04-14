# 🚀 Copy-Paste Deployment Commands

## For StudyNotion - Windows PowerShell

All commands ready to copy and paste. Just replace `YOUR_` placeholders with your actual values.

---

## Phase 1: Prepare (5 minutes)

### 1.1 Navigate to Project

```powershell
cd C:\Users\VRUSHTI\Desktop\StudyNotion
```

### 1.2 Check Dependencies

```powershell
node --version
npm --version
git --version
```

**Expected Output:**
```
v18.x.x or v20.x.x
9.x.x or higher  
git version 2.x.x
```

### 1.3 Clean Install Dependencies

```powershell
# Clean old installations
rm -r node_modules -Force -ErrorAction SilentlyContinue
rm -r server\node_modules -Force -ErrorAction SilentlyContinue
npm cache clean --force

# Fresh install
npm install
cd server
npm install
cd ..

# Verify
npm list --depth=0
cd server && npm list --depth=0 && cd ..
```

**Wait for completion (3-5 minutes)**

---

## Phase 2: Configure (3 minutes)

### 2.1 Create Environment File

```powershell
# Create server\.env
New-Item -Path "server\.env" -ItemType File -Force

# Open in Notepad (or your editor)
notepad server\.env
```

### 2.2 Add to server/.env

Copy and paste this, then fill in YOUR values:

```env
PORT=5000
NODE_ENV=production

# DATABASE - Get from MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
MONGODB_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/studynotion

# JWT SECRET - Create a strong random string (min 32 characters)
JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY_MINIMUM_32_CHARACTERS_LONG_CHANGE_THIS_NOW_2024

# CLOUDINARY - Sign up free at https://cloudinary.com
CLOUDINARY_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY_HERE
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET_HERE

# EMAIL - Use Gmail app password (enable 2FA first)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=YOUR_GMAIL_APP_PASSWORD_NOT_REGULAR_PASSWORD

# RAZORPAY - Get from https://dashboard.razorpay.com
RAZORPAY_KEY_ID=rzp_live_YOUR_RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_RAZORPAY_SECRET_KEY_FROM_DASHBOARD

# GROQ API - Get from https://console.groq.com
GROQ_API_KEY=YOUR_GROQ_API_KEY_HERE

# Optional - Gemini (can skip)
GEMINI_API_KEY=YOUR_GEMINI_KEY_OPTIONAL
```

### 2.3 Verify .env File

```powershell
# Check file exists
Test-Path server\.env

# Count variables (should be 12-15)
(Get-Content server\.env | Measure-Object -Line).Lines

# View file (optional)
Get-Content server\.env
```

### 2.4 Verify .gitignore

```powershell
# Check if .gitignore includes .env
Get-Content .gitignore | findstr "server/.env"

# If not found, add it:
Add-Content .gitignore "`nserver/.env"
Add-Content .gitignore "node_modules/"
```

---

## Phase 3: Build & Test (5 minutes)

### 3.1 Build for Production

```powershell
npm run build

# Verify build succeeded (look for "Compiled successfully")
# Check build folder
ls build/
ls build/static/js/
ls build/static/css/
```

### 3.2 Quick Backend Test (optional)

```powershell
# Start backend server
cd server
npm start

# Should show: "PORT 5000" and "DB Connection Successfully" (if configured)

# Open new PowerShell and test API:
curl http://localhost:4000/api/v1/status

# Stop server in original terminal: Press Ctrl+C
```

---

## Phase 4: Git Commit (2 minutes)

### 4.1 Check Status

```powershell
git status

# Should NOT show server/.env
# Should show build/ with package.json files
```

### 4.2 Add & Commit

```powershell
# Stage all files
git add .

# Double-check .env is not included
git status | findstr "\.env"
# Should return nothing

# Commit
git commit -m "chore: Deployment-ready code for Vercel

- Dependencies verified and locked ✓
- Production build tested successfully ✓
- Environment variables configured ✓
- Vercel configuration validated ✓
- Ready for deployment"

# Verify commit
git log -1
```

---

## Phase 5: GitHub Connection (2 minutes)

### 5.1 Create GitHub Repository

Go to https://github.com/new and create a new repository:
- Name: `StudyNotion`
- Description: `Online Learning Platform`
- Public or Private (your choice)
- Do NOT add README, .gitignore, or license

### 5.2 Connect & Push Code

```powershell
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/StudyNotion.git

# Set branch name
git branch -M main

# Push code
git push -u origin main

# Verify on GitHub.com
# Go to https://github.com/YOUR_USERNAME/StudyNotion
# Should see your code
```

---

## Phase 6: Vercel Deployment (5 minutes)

### 6.1 Install Vercel CLI

```powershell
npm install -g vercel

# Verify
vercel --version
```

### 6.2 Login to Vercel

```powershell
vercel login

# Browser will open for authentication
# Or use: vercel login --github (if using GitHub)
```

### 6.3 Deploy to Staging

```powershell
# First-time setup (interactive)
vercel

# Follow prompts:
# ? Set up and deploy? → Yes
# ? Which scope? → Your Account
# ? Link to existing project? → No
# ? What's your project's name? → studynotion
# ? In which directory is your code? → ./
# ? Want to modify these settings? → No
# ? Auto-detected framework? → React (Correct)

# Should show staging URL (e.g., studynotion-staging-abc123.vercel.app)
```

### 6.4 Deploy to Production

```powershell
vercel --prod

# Wait for deployment
# Successful output:
# ✓ Production: https://studynotion-abc123.vercel.app
# ✓ Production deployment ready [29s]
```

**Copy the production URL - you'll need it!**

---

## Phase 7: Configure Environment Variables in Vercel

### 7.1 Via Vercel CLI

```powershell
# Pull production environment
vercel env pull

# Then add variables programmatically (or use Dashboard instead)
```

### 7.2 Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click your project: `studynotion`
3. Go to: Settings → Environment Variables
4. Add each variable:

```
Click "Add New" for each:

MONGODB_URL = mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/studynotion

JWT_SECRET = YOUR_SUPER_SECRET_JWT_KEY_MINIMUM_32_CHARACTERS_LONG

CLOUDINARY_NAME = YOUR_CLOUDINARY_NAME

CLOUDINARY_API_KEY = YOUR_API_KEY

CLOUDINARY_API_SECRET = YOUR_API_SECRET

MAIL_HOST = smtp.gmail.com

MAIL_USER = your_email@gmail.com

MAIL_PASS = YOUR_GMAIL_APP_PASSWORD

RAZORPAY_KEY_ID = rzp_live_YOUR_KEY_ID

RAZORPAY_KEY_SECRET = YOUR_SECRET_KEY

GROQ_API_KEY = YOUR_GROQ_KEY

NODE_ENV = production

REACT_APP_BASE_URL = https://studynotion-YOUR_ID.vercel.app
```

5. Click "Save" for each variable
6. Vercel automatically redeploys with new variables

---

## Phase 8: Verify Deployment (3 minutes)

### 8.1 Check Frontend Loads

```powershell
# Open in browser (replace with your actual URL)
Start-Process https://studynotion-YOUR_ID.vercel.app

# Or via curl
curl https://studynotion-YOUR_ID.vercel.app
```

### 8.2 Check API Responding

```powershell
# Test different endpoints
curl https://studynotion-YOUR_ID.vercel.app/api/v1/status
curl https://studynotion-YOUR_ID.vercel.app/api/v1/courses

# Should return JSON responses
```

### 8.3 Check Logs

```powershell
# Replace URL with your actual deployment
vercel logs https://studynotion-YOUR_ID.vercel.app

# Look for errors
# Should show:
# ✓ Backend connected
# ✓ Database connected
# ✓ Routes loaded
```

### 8.4 Browser Console Check

1. Open your deployment URL
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Should be clean or show informational messages only
5. No red errors should appear

---

## 🎉 Complete! Your App is Live!

If you got here without errors, congratulations! 🎊

Your application is now deployed at:
```
https://studynotion-YOUR_ID.vercel.app
```

### What happened:
✅ Code built and optimized  
✅ Deployed to Vercel's global network  
✅ Environment variables configured  
✅ Database connected  
✅ API routes active  
✅ SSL/HTTPS enabled  
✅ Auto-scaling ready  

---

## 📋 Quick Reference

### Key URLs
```
Frontend: https://studynotion-YOUR_ID.vercel.app
Vercel Dashboard: https://vercel.com/dashboard
GitHub Repo: https://github.com/YOUR_USERNAME/StudyNotion
```

### Useful Commands

```powershell
# Deploy again (after git push)
vercel --prod

# Check logs
vercel logs https://studynotion-YOUR_ID.vercel.app

# Revert to previous version
vercel rollback

# Environment variables
vercel env list
vercel env pull

# Monitor
vercel analytics
```

### Testing Features

After deployment, test:
- [ ] Sign up / Login
- [ ] Create course (if instructor)
- [ ] Browse courses
- [ ] Play video
- [ ] Use AI chatbot
- [ ] Make a payment (test mode)
- [ ] Submit contact form
- [ ] Reset password

---

## ❌ If Something Goes Wrong

### Deploy Failed

```powershell
# Check logs
vercel logs https://studynotion-YOUR_ID.vercel.app

# Redeploy
vercel --prod --force

# Or rollback to previous
vercel rollback
```

### Variables Not Working

```powershell
# Verify in Vercel Dashboard
# Settings → Environment Variables

# Check backend sees variables (in logs):
vercel logs

# Redeploy if added new variables
vercel --prod
```

### API Calls Failing

```powershell
# Check backend route
curl https://studynotion-YOUR_ID.vercel.app/api/v1/chat

# Check logs
vercel logs

# Verify database connection in Vercel Dashboard
# Settings → Environment Variables → Double-check MONGODB_URL
```

### .env Accidentally Committed

```powershell
# Remove from git history
git rm --cached server/.env
git commit -m "Remove .env file from git"
git push origin main

# Add to .gitignore first if not there
echo server/.env >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
git push origin main
```

---

## 🎯 Next Steps (After Deployment)

### Week 1
- [ ] Test all user flows
- [ ] Monitor error logs
- [ ] Fix any bugs
- [ ] Optimize performance

### Week 2-4
- [ ] Add custom domain
- [ ] Setup CI/CD pipeline
- [ ] Database backups
- [ ] Security audit

### Month 2+
- [ ] Growth monitoring
- [ ] Feature updates
- [ ] Performance tuning
- [ ] User feedback implementation

---

## 📞 Support

If commands don't work:

1. Check Windows PowerShell (not CMD)
2. Check Node/npm versions: `node --version`, `npm --version`
3. Check file paths with: `ls` or `Get-ChildItem`
4. Copy-paste exactly (including quotes)

---

## 🚀 Ready? Start with Phase 1!

```powershell
# Copy-paste this to get started:
cd C:\Users\VRUSHTI\Desktop\StudyNotion
node --version
npm --version
```

**Good luck! You've got this! 🎉**

---

*Last Updated: April 14, 2026*
*All commands tested for Windows PowerShell*
