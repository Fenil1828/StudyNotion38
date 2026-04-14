# 🚀 Quick Deploy Reference

## Build Summary
```
✅ Frontend Build:  924.63 kB JS + 27.99 kB CSS
✅ Backend:        Ready to deploy
✅ Database:       Configure MongoDB URL
✅ APIs:           Configure API keys
```

---

## One-Command Deploy (After Setup)

```bash
# 1. Commit your code
git add .
git commit -m "Ready for Vercel deployment"
git push origin main

# 2. Go to Vercel and import repository
# 3. Set environment variables (see below)
# 4. Click Deploy!
```

---

## Required Environment Variables

### Frontend (.env in Vercel)
```
REACT_APP_BASE_URL=https://api.yourdomain.com/api/v1
REACT_APP_GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
REACT_APP_GEMINI_API_KEY=AIzaxxxxxxxxxxxx
REACT_APP_GROQ_API_KEY=gsk_xxxxxxxxxxxx
```

### Backend (.env in server folder)
```
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/studynotion
MAIL_HOST=smtp.gmail.com
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=xxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxx
RAZORPAY_KEY_ID=razor_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxx
GEMINI_API_KEY=AIzaxxxxxxxxxxxx
GROQ_API_KEY=gsk_xxxxxxxxxxxx
JWT_SECRET=your-secret-key-here
```

---

## Deployment URLs After Deploy

```
Frontend: https://your-project-name.vercel.app
Backend:  https://your-backend-name.vercel.app
API:      https://your-backend-name.vercel.app/api/v1
```

---

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm run build` locally to see error |
| Blank page | Check browser console, verify API URL |
| API errors | Check backend environment variables |
| 404 errors | Ensure routes are configured in backend |

---

## Files Created for Deployment

- `vercel.json` - Vercel configuration
- `VERCEL_DEPLOYMENT_GUIDE.md` - Detailed guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `.env.example` - Frontend env template
- `server/.env.example` - Backend env template

---

## Next Steps

1. ✅ Build complete
2. ➡️ Push to GitHub
3. ➡️ Create Vercel account
4. ➡️ Connect repository
5. ➡️ Add environment variables
6. ➡️ Deploy!

Your app is ready! 🎉
