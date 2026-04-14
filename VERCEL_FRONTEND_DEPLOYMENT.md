# Vercel Frontend Deployment Guide - Step by Step

## Prerequisites
- GitHub account with your repository pushed
- Vercel account (free at vercel.com)
- Git installed on your machine

---

## STEP 1: Prepare Your Repository
### 1.1 Ensure all code is committed
```bash
cd c:\Users\VRUSHTI\Desktop\Edtech\StudyNotion38
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 1.2 Verify package.json has build script
✅ Your `package.json` already has:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

---

## STEP 2: Create Vercel Account
1. Go to **https://vercel.com/signup**
2. Sign up using your GitHub account (recommended)
3. Verify your email
4. You're ready to deploy!

---

## STEP 3: Connect GitHub Repository to Vercel

### Method A: From Vercel Dashboard (Recommended)
1. Go to **https://vercel.com/dashboard**
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub URL: `https://github.com/YOUR-USERNAME/StudyNotion38`
5. Click **"Import"**

### Method B: Using Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd c:\Users\VRUSHTI\Desktop\Edtech\StudyNotion38
vercel
```

---

## STEP 4: Configure Project Settings in Vercel

### 4.1 Basic Settings
When importing, Vercel should auto-detect:
- **Framework**: React ✓
- **Build Command**: `npm run build` ✓
- **Output Directory**: `build` ✓
- **Install Command**: `npm install` ✓

### 4.2 Environment Variables
1. In Vercel Dashboard, go to **Settings → Environment Variables**
2. Add these variables:

| Key | Value | Environment |
|-----|-------|-------------|
| `REACT_APP_BASE_URL` | `https://your-backend.vercel.app/api/v1` | Production |
| `REACT_APP_BASE_URL` | `http://localhost:4000/api/v1` | Preview & Development |
| `RAZORPAY_KEY` | `rzp_test_PTmzlB9wb4v2lp` | All |

**How to add:**
1. Click **Environment Variables**
2. Fill in Key: `REACT_APP_BASE_URL`
3. Fill in Value: `https://your-backend.vercel.app/api/v1`
4. Select environments (Production, Preview, Development)
5. Click **"Save"**
6. Repeat for `RAZORPAY_KEY`

### 4.3 Root Directory
- Set to `.` (current directory) or leave empty
- ✓ Vercel will auto-detect `package.json`

---

## STEP 5: Deploy

### Option A: Automatic Deployment (Recommended)
1. Simply push to main branch:
```bash
git push origin main
```
2. Vercel automatically deploys on every push
3. View deployment status in Vercel Dashboard

### Option B: Manual Deployment via CLI
```bash
vercel --prod
```

### Option C: Via Dashboard
1. Go to **Vercel Dashboard**
2. Open your project
3. Click **Redeploy** (top right)

---

## STEP 6: Test Your Deployment

### 6.1 Get Your Live URL
After successful deployment, Vercel gives you:
- **Production URL**: `https://your-project.vercel.app`
- View in Dashboard under "Deployments"

### 6.2 Test Features
1. Visit your production URL
2. Test login/signup functionality
3. Verify API calls work (check DevTools Console)
4. Test payment features (Razorpay)

---

## STEP 7: Set up Custom Domain (Optional)

1. In Vercel Dashboard → **Settings → Domains**
2. Click **"Add"**
3. Enter your custom domain (e.g., `studynotion.com`)
4. Follow DNS instructions from your domain provider
5. Wait for DNS propagation (5-30 minutes)

---

## STEP 8: Monitor & Debug

### 8.1 View Logs
- **Build Logs**: Dashboard → Project → Deployments
- **Runtime Logs**: Dashboard → Project → Functions

### 8.2 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm run build` works locally |
| 404 errors | Verify `vercel.json` routes configuration |
| API calls fail | Check `REACT_APP_BASE_URL` environment variable |
| Blank page | Clear cache, check browser console errors |
| Timeouts | Increase build timeout in settings |

---

## STEP 9: Continuous Deployment

Vercel automatically redeploys when:
- ✅ You push to main branch
- ✅ Pull requests are created (preview deployments)
- ✅ You click rebuild in dashboard

---

## Quick Command Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (creates preview)
vercel

# Deploy to production
vercel --prod

# View project info
vercel project inspect

# View deployments
vercel ls
```

---

## Expected Timeline
- **First Deploy**: 2-5 minutes
- **Subsequent Deploys**: 1-3 minutes
- **DNS Propagation** (if custom domain): 5-48 hours

---

## After Deployment Checklist
- ✅ All pages load correctly
- ✅ Login/Signup works
- ✅ API calls complete successfully
- ✅ Images/assets load
- ✅ Razorpay integration works
- ✅ Database connections work
- ✅ Emails send (if applicable)

---

## Need Help?
- **Vercel Docs**: https://vercel.com/docs
- **React Deployment**: https://vercel.com/guides/deploying-react-with-vercel
- **Troubleshoot**: https://vercel.com/support

---

**Your Frontend is now ready to deploy! 🚀**
