# 🎯 ANTUF PRODUCTION DEPLOYMENT - VERCEL ENV SETUP

## ⚠️ IMPORTANT: Use These Production Credentials

**Production Domain**: https://tutorialsmaterial.com (not antuf.org)

---

## Quick Deployment (Copy-Paste Ready)

### Step 1: Open Vercel Dashboard
Go to: https://vercel.com/dashboard/projects

### Step 2: Select ANTUF Project
Click on the "antuf" project

### Step 3: Go to Environment Variables
Settings → Environment Variables

### Step 4: Select "Production" Tab
Make sure you're adding to PRODUCTION environment

### Step 5: Add Each Variable Below

---

## 🔴 CRITICAL VARIABLES (MUST ADD - Sliders Won't Work Without These)

### 1. Database Connection
```
Name:  DB_URL
Value: mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
```

### 2. NextAuth Secret
```
Name:  NEXTAUTH_SECRET
Value: ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
```

### 3. NextAuth Production URL
```
Name:  NEXTAUTH_URL
Value: https://tutorialsmaterial.com
```

### 4. NextAuth Internal URL
```
Name:  NEXTAUTH_URL_INTERNAL
Value: https://tutorialsmaterial.com
```

### 5. API URLs
```
Name:  API
Value: https://tutorialsmaterial.com/api

Name:  NEXT_PUBLIC_API
Value: https://tutorialsmaterial.com/api

Name:  CLIENT_URL
Value: https://tutorialsmaterial.com
```

---

## 🟡 IMPORTANT VARIABLES (Should Add)

### Google OAuth
```
Name:  GOOGLE_CLIENT_ID
Value: 349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com

Name:  GOOGLE_CLIENT_SECRET
Value: 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

Name:  GOOGLE_API_KEY
Value: AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg

Name:  GOOGLE_CALLBACK_URL
Value: https://tutorialsmaterial.com/api/auth/callback/google
```

### GitHub OAuth
```
Name:  GITHUB_CLIENT_ID
Value: Ov23liHhOrNTMMlMppZW

Name:  GITHUB_CLIENT_SECRET
Value: ecfbc0376fd624e53a227e522cc3095f258173b6
```

### Cloudinary (PRODUCTION CREDENTIALS)
```
Name:  CLOUDINARY_CLOUD_NAME
Value: dkxttcalf

Name:  CLOUDINARY_API_KEY
Value: 466425782678433

Name:  CLOUDINARY_API_SECRET
Value: W1N-bWrRKk-ieEMmAVCMLGee8TQ
```

### Stripe
```
Name:  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi

Name:  STRIPE_SECRET_KEY
Value: sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O

Name:  STRIPE_WEBHOOK_SECRET
Value: your_stripe_webhook_secret_here
```

---

## 🟢 OPTIONAL VARIABLES (Can Add Later)

### reCAPTCHA
```
Name:  NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value: 6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F

Name:  RECAPTCHA_SECRET_KEY
Value: 6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h
```

### Judge0 API
```
Name:  NEXT_PUBLIC_JUDGE0_API_KEY
Value: bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934
```

### Admin Email
```
Name:  ADMIN_EMAIL
Value: your-admin-email@example.com
```

---

## ✅ Deployment Checklist

```
☐ All CRITICAL variables added (DB_URL, NEXTAUTH_*)
☐ API URLs point to https://tutorialsmaterial.com
☐ Cloudinary credentials are PRODUCTION ones (dkxttcalf)
☐ All 20+ variables added to PRODUCTION environment
☐ Watched deployment complete (3-5 minutes)
☐ Visited https://tutorialsmaterial.com
☐ Hard refreshed (Cmd+Shift+R)
☐ Verified sliders show REAL data (not demo)
☐ Checked API /api/sliders returns 200
☐ No errors in browser console
```

---

## After Adding Variables

1. **Vercel Auto-Redeploys**
   - Automatic redeploy starts
   - Takes 3-5 minutes to build
   - You'll see deployment progress at: https://vercel.com/dashboard/antuf/deployments

2. **Wait for Green Checkmark**
   - Build completes with ✓ green checkmark
   - Deployment shows "Ready"

3. **Verify Production**
   - Visit: https://tutorialsmaterial.com
   - Hard refresh: Cmd+Shift+R
   - Sliders should show REAL data from database

---

## Key Differences (Production vs Development)

| Setting | Development | Production |
|---------|-------------|-----------|
| Domain | http://localhost:3000 | https://tutorialsmaterial.com |
| Cloudinary | dfu758f7t (dev) | dkxttcalf (production) |
| NEXTAUTH_URL | http://localhost:3000 | https://tutorialsmaterial.com |
| API URL | /api | https://tutorialsmaterial.com/api |

---

## Troubleshooting

### Sliders Still Show Demo
1. Hard refresh: Cmd+Shift+R
2. Check deployment status (should be ✓)
3. Wait 2-3 more minutes
4. Check /api/sliders in DevTools Network tab

### API Returns Error
1. Verify DB_URL is correct
2. Check all CRITICAL variables added
3. View Vercel logs for error message
4. Try manual redeploy

### Cloudinary Images Not Loading
1. Verify CLOUDINARY_CLOUD_NAME is: dkxttcalf (not dfu758f7t)
2. Verify CLOUDINARY_API_KEY and SECRET are correct
3. Check image URLs in database

---

## Environment Variable Count

**Total Variables to Add**: ~24

- Critical: 7 (Database + Auth + API URLs)
- Important: 10 (OAuth + Cloudinary + Stripe)
- Optional: 7 (reCAPTCHA + Judge0 + Admin + Payments)

---

## Estimated Timeline

- Preparation: 2 minutes
- Add variables: 10-15 minutes
- Deployment: 3-5 minutes
- Verification: 5-10 minutes
- **Total: ~30 minutes**

---

## Production URL

**Main Site**: https://tutorialsmaterial.com

**Check Sliders**: https://tutorialsmaterial.com (homepage)

**API Endpoint**: https://tutorialsmaterial.com/api/sliders

---

## Status

✅ **Ready to Deploy**

All code is built and tested. Just add environment variables to Vercel and it's live!
