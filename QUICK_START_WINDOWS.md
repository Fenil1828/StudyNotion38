# Quick Start - Vercel Deployment for Windows

## 🚀 One-Command Deployment Setup

### Step 1: Run Dependency Check (2 minutes)

**On Windows PowerShell (as Administrator):**

```powershell
# Navigate to project
cd C:\Users\VRUSHTI\Desktop\StudyNotion

# Run the checker
.\check-deployment.bat
```

**Expected Output:**
```
✓ Node is installed
✓ npm is installed
✓ Found: package.json
✓ Found: server\package.json
✓ Found: vercel.json
...
✓ All critical checks passed!
```

---

## 📦 Step 2: Install Dependencies (3-5 minutes)

```powershell
# Clean previous installations
rm -r node_modules -Force -ErrorAction SilentlyContinue
rm -r server\node_modules -Force -ErrorAction SilentlyContinue

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Verify installations
npm list --depth=0
cd server && npm list --depth=0 && cd ..
```

**Expected Output:**
```
npm list:
├── react@18.2.0
├── react-redux@9.2.0
├── axios@1.10.0
... (40+ packages)

server npm list:
├── express@5.1.0
├── mongoose@8.15.1
├── jsonwebtoken@9.0.2
... (35+ packages)
```

---

## 🔧 Step 3: Setup Environment Variables (2 minutes)

**Create `server\.env` file:**

```powershell
# Create file
New-Item -Path "server\.env" -ItemType File -Force

# Add contents (use Notepad or your editor)
# server/.env content:
```

```env
PORT=5000
NODE_ENV=production

# Database - REQUIRED (get from MongoDB Atlas)
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/studynotion

# Authentication - REQUIRED (create a strong key)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long_2024

# Cloudinary - REQUIRED (for image uploads)
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email - REQUIRED (Gmail app password)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_gmail_app_password

# Payment - REQUIRED (from Razorpay dashboard)
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# AI Services - REQUIRED (Groq API)
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key_optional
```

**Verify variables are set:**
```powershell
cd server
Get-Content .env | Measure-Object -Line
# Should show: about 12-15 lines
cd ..
```

---

## ✅ Step 4: Verify Build (3 minutes)

```powershell
# Test build locally
npm run build

# Verify build completed
ls build/
ls build/static/js/
ls build/static/css/

# Check for errors (should show "Compiled successfully")
# If build fails, check error message and fix
```

---

## 🌳 Step 5: Git Setup (2 minutes)

```powershell
# Check git is initialized
git status

# If not initialized:
git init

# Add all files (excluding .env via .gitignore)
git add .

# Verify .env is NOT staged
git status | findstr "\.env"
# Should return nothing

# Commit code
git commit -m "chore: Deployment-ready code for Vercel

- All dependencies verified ✓
- Build successful ✓
- Environment variables configured ✓
- Ready for: npm run build && vercel --prod"

# Verify commit
git log -1
```

---

## 🔑 Step 6: Prepare Vercel (2 minutes)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
# Opens browser for authentication

# Verify login
vercel whoami
```

---

## 📤 Step 7: Connect GitHub (2 minutes)

**Push code to GitHub:**

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/StudyNotion.git

# Push code
git branch -M main
git push -u origin main

# Verify on GitHub.com
# Should see latest commit
```

---

## 🚀 Step 8: Deploy to Vercel (5 minutes)

```powershell
# Option 1: Link existing project (if you have one)
vercel link

# Option 2: Create new project
vercel
# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your-Account
# ? Link to existing project? No
# ? What is your project's name? studynotion
# ? In which directory is your code? ./
# ? Want to modify these settings? No
# ? Auto-detected framework: React. Correct? Yes

# Deploy to production
vercel --prod
```

**After deployment, you'll get:**
```
✓ Production: https://your-project.vercel.app
✓ Production deployment ready [29s]
```

---

## 🔌 Step 9: Add Environment Variables to Vercel

```powershell
# Pull environment file
vercel env pull

# Should create .env.local file
cat .env.local

# Or manually add via Vercel Dashboard:
```

1. Go to https://vercel.com/dashboard
2. Click your project (studynotion)
3. Go to Settings → Environment Variables
4. Add each variable:

```
MONGODB_URL = mongodb+srv://...
JWT_SECRET = your_jwt_secret
CLOUDINARY_NAME = your_name
CLOUDINARY_API_KEY = your_key
CLOUDINARY_API_SECRET = your_secret
MAIL_HOST = smtp.gmail.com
MAIL_USER = your_email@gmail.com
MAIL_PASS = your_app_password
RAZORPAY_KEY_ID = rzp_live_...
RAZORPAY_KEY_SECRET = your_secret
GROQ_API_KEY = your_groove_key
NODE_ENV = production
REACT_APP_BASE_URL = https://your-project.vercel.app
```

---

## ✨ Step 10: Verify Deployment

```powershell
# Check deployment logs
vercel logs https://your-project.vercel.app

# Test frontend loads
curl https://your-project.vercel.app

# Test backend API
curl https://your-project.vercel.app/api/v1/status

# Check in browser
Start-Process https://your-project.vercel.app
```

---

## 📝 Complete Command Summary (Copy & Paste)

```powershell
# 1. Clean install
rm -r node_modules -Force -ErrorAction SilentlyContinue
rm -r server\node_modules -Force -ErrorAction SilentlyContinue
npm install
cd server && npm install && cd ..

# 2. Build
npm run build

# 3. Git commit
git add .
git commit -m "chore: Ready for Vercel deployment"

# 4. Push to GitHub
git push origin main

# 5. Install Vercel CLI
npm install -g vercel

# 6. Login
vercel login

# 7. Deploy
vercel --prod

# 8. Add environment variables in Vercel Dashboard

# 9. Verify
vercel logs https://your-project.vercel.app
```

---

## ⏱️ Total Time Estimate

| Step | Time | Status |
|------|------|--------|
| Dependency Check | 2 min | ⏳ |
| Install Dependencies | 5 min | ⏳ |
| Setup Environment | 2 min | ⏳ |
| Verify Build | 3 min | ⏳ |
| Git Setup | 2 min | ⏳ |
| Prepare Vercel | 2 min | ⏳ |
| GitHub Connection | 2 min | ⏳ |
| Deploy to Vercel | 5 min | ⏳ |
| Add Variables | 2 min | ⏳ |
| Verify Deployment | 3 min | ⏳ |
| **TOTAL** | **~30 minutes** | ✅ |

---

## 🎯 What You Get After Deployment

✅ **Frontend Live:** https://your-project.vercel.app
✅ **API Live:** https://your-project.vercel.app/api
✅ **Auto-Deploys:** On every git push to main
✅ **Free SSL:** HTTPS enabled automatically
✅ **CDN:** Global edge network for fast loading
✅ **Auto-Scaling:** Handles traffic spikes
✅ **Monitoring:** Vercel dashboard with logs
✅ **Rollback:** Easy version history

---

## ❓ Troubleshooting

### "Dependencies missing"
```powershell
npm install && cd server && npm install && cd ..
```

### "Build failed"
```powershell
npm run build 2>&1 | tail -100
# Check error message and fix imports
```

### "Environment variables undefined"
```powershell
# Check Vercel Dashboard Settings → Environment Variables
# Ensure all variables are added
vercel env pull
```

### "API not responding"
```powershell
# Check backend is running
curl https://your-project.vercel.app/api/v1/status

# Check logs
vercel logs https://your-project.vercel.app
```

### ".env file committed"
```powershell
git rm --cached server/.env
git commit -m "Remove .env from git"
git push origin main
```

---

## ✅ Final Checklist Before Running

- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] GitHub account created
- [ ] Vercel account created (free at vercel.com)
- [ ] MongoDB Atlas connection string ready
- [ ] Cloudinary credentials ready
- [ ] Gmail app password ready
- [ ] Razorpay API keys ready
- [ ] Groq API key ready
- [ ] All environment variables prepared

---

## 🎉 You're Ready!

Everything is set up. Follow the commands above and your app will be live on Vercel in ~30 minutes!

**Support:**
- Vercel Docs: https://vercel.com/docs
- React Deployment: https://create-react-app.dev/docs/deployment/
- Stack Overflow: Search "[vercel] your-error-here"

**Let's Go! 🚀**
