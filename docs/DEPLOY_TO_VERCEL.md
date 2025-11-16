# 🚀 ANTUF PRODUCTION DEPLOYMENT TO VERCEL

## Quick Summary

**Production Domain**: https://antuf.org
**Vercel Project**: antuf
**Environment**: Production
**Time Required**: ~30 minutes

---

## Step-by-Step Deployment Guide

### Step 1: Open Vercel Dashboard

Go to: https://vercel.com/dashboard/antuf/settings/environment-variables

You should see three tabs: Development, Preview, Production

### Step 2: Click "Production" Tab

This is where we'll add all production environment variables.

### Step 3: Add Environment Variables

For EACH variable below:
1. Click "Add New"
2. Enter the Name (exactly as shown)
3. Enter the Value (copy from below)
4. Make sure "Production" is selected
5. Click "Add" or "Save"

---

## 🔴 CRITICAL VARIABLES (MUST ADD - SLIDERS DEPEND ON THESE)

### Database Connection
```
Name:  DB_URL
Value: mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
```
✓ Status: [ ] Added

### NextAuth Configuration
```
Name:  NEXTAUTH_SECRET
Value: ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7

Name:  NEXTAUTH_URL
Value: https://antuf.org

Name:  NEXTAUTH_URL_INTERNAL
Value: https://antuf.org
```
✓ Status: [ ] All Added

### API URLs (PRODUCTION DOMAIN)
```
Name:  API
Value: https://antuf.org/api

Name:  NEXT_PUBLIC_API
Value: https://antuf.org/api

Name:  CLIENT_URL
Value: https://antuf.org
```
✓ Status: [ ] All Added

---

## 🟡 IMPORTANT VARIABLES (Should Add - Enable Features)

### Google OAuth
```
Name:  GOOGLE_CLIENT_ID
Value: 349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com

Name:  GOOGLE_CLIENT_SECRET
Value: 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

Name:  GOOGLE_API_KEY
Value: AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg

Name:  GOOGLE_CALLBACK_URL
Value: https://antuf.org/api/auth/callback/google
```
✓ Status: [ ] All Added

### GitHub OAuth
```
Name:  GITHUB_CLIENT_ID
Value: Ov23liHhOrNTMMlMppZW

Name:  GITHUB_CLIENT_SECRET
Value: ecfbc0376fd624e53a227e522cc3095f258173b6
```
✓ Status: [ ] All Added

### Cloudinary (Image Hosting)
```
Name:  CLOUDINARY_CLOUD_NAME
Value: dkxttcalf

Name:  CLOUDINARY_API_KEY
Value: 466425782678433

Name:  CLOUDINARY_API_SECRET
Value: W1N-bWrRKk-ieEMmAVCMLGee8TQ
```
✓ Status: [ ] All Added

### Stripe (Payments)
```
Name:  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value: pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi

Name:  STRIPE_SECRET_KEY
Value: sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O

Name:  STRIPE_WEBHOOK_SECRET
Value: your_stripe_webhook_secret_here
```
✓ Status: [ ] All Added

---

## 🟢 OPTIONAL VARIABLES (Can Add Now or Later)

### reCAPTCHA (Security)
```
Name:  NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value: 6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F

Name:  RECAPTCHA_SECRET_KEY
Value: 6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h
```

### Judge0 API (Code Execution)
```
Name:  NEXT_PUBLIC_JUDGE0_API_KEY
Value: bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934
```

### Stream API (Real-time Messaging)
```
Name:  NEXT_PUBLIC_STREAM_API_KEY
Value: c9587tt8muyq

Name:  STREAM_API_SECRET
Value: yewhg673tgx7txb5quwj4jsprurxkaqqptttjzm3b5yfrf5mux6ts5yvhb28pjqa
```

### Admin Email
```
Name:  ADMIN_EMAIL
Value: your-admin-email@example.com
```

---

## Step 4: Monitor Deployment

After adding all variables, Vercel automatically redeploys:

1. **Go to Deployments**: https://vercel.com/dashboard/antuf/deployments
2. **Watch for Recent Deployment**: Should show building/in progress
3. **Wait for Green Checkmark**: ✓ Success (3-5 minutes)
4. **Check Logs if Error**: Click deployment to see logs

---

## Step 5: Verify Production

### Visit the Site
1. Go to: https://antuf.org
2. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
3. Wait for page to fully load

### Check Sliders
Look at the homepage slider:

**✓ GOOD** (After fix):
- Shows REAL slider content
- Images load from Cloudinary
- No placeholder text
- Smooth animations

**✗ BAD** (If still broken):
- Shows demo "Welcome to ANTUF"
- Placeholder image
- Generic text

### Verify API
1. Open DevTools: **F12**
2. Go to **Network** tab
3. Hard refresh page
4. Look for `/api/sliders` request
5. Check response:
   - Status: **200** ✓
   - Response: Real slider data ✓
   - No errors ✓

### Check Console
In DevTools **Console** tab:
- ✓ No red error messages
- ✓ No 500 errors
- ✓ No "connection refused"

---

## Deployment Checklist

```
Phase 1: Preparation
☐ Have this guide and credentials ready
☐ Accessed Vercel dashboard
☐ Selected ANTUF project

Phase 2: Add Critical Variables (5-10 min)
☐ DB_URL added
☐ NEXTAUTH_SECRET added
☐ NEXTAUTH_URL added (https://antuf.org)
☐ NEXTAUTH_URL_INTERNAL added (https://antuf.org)
☐ API URLs added (https://antuf.org/api)

Phase 3: Add Important Variables (5-10 min)
☐ Google OAuth added (3 variables)
☐ GitHub OAuth added (2 variables)
☐ Cloudinary added (3 variables)
☐ Stripe added (3 variables)

Phase 4: Monitor Deployment (5-10 min)
☐ Watched deployment progress
☐ Deployment completed successfully
☐ Green checkmark visible
☐ No build errors

Phase 5: Verify Production (5 min)
☐ Visited https://antuf.org
☐ Hard refreshed browser
☐ Sliders display REAL data
☐ No console errors
☐ /api/sliders returns 200
☐ Images load successfully
```

---

## Troubleshooting

### Problem: Sliders Still Show Demo

**Causes**:
- Deployment still in progress
- Browser cache showing old version
- Variables not fully saved

**Solutions**:
1. Wait 2-3 more minutes
2. Hard refresh: Cmd+Shift+R
3. Clear browser cache (DevTools → Application → Clear storage)
4. Check deployment status: https://vercel.com/dashboard/antuf/deployments

### Problem: API Returns 500 Error

**Causes**:
- DB_URL not correct
- MongoDB not accessible
- Connection string format wrong

**Solutions**:
1. Verify DB_URL is EXACTLY:
   ```
   mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
   ```
2. Check Vercel logs for error details
3. Try manual redeploy

### Problem: Deployment Failed

**Causes**:
- Build error
- Invalid variable format
- Configuration issue

**Solutions**:
1. Check deployment logs for error message
2. Verify all variable values are correct
3. Click "Redeploy" button on latest deployment

### Problem: Images Not Loading

**Causes**:
- Cloudinary credentials wrong
- Image URLs invalid in database

**Solutions**:
1. Verify Cloudinary variables:
   ```
   CLOUDINARY_CLOUD_NAME=dkxttcalf (correct)
   CLOUDINARY_API_KEY=466425782678433 (correct)
   ```
2. Check image URLs in database
3. Upload new slider with valid image

---

## Important URLs

| Purpose | URL |
|---------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| ANTUF Project | https://vercel.com/dashboard/antuf |
| Environment Variables | https://vercel.com/dashboard/antuf/settings/environment-variables |
| Deployments | https://vercel.com/dashboard/antuf/deployments |
| Production Site | https://antuf.org |
| API Endpoint | https://antuf.org/api/sliders |

---

## Summary

**What**: Deploy ANTUF to production on Vercel
**How**: Add 20+ environment variables to Production environment
**Domain**: https://antuf.org
**Time**: ~30 minutes total
**Difficulty**: Easy (copy-paste)
**Risk**: Zero (configuration only)

---

## Next Steps

1. **Open Vercel Dashboard**: https://vercel.com/dashboard/antuf/settings/environment-variables
2. **Add All Critical Variables** (marked 🔴 above)
3. **Add Important Variables** (marked 🟡 above)
4. **Wait for Deployment** (3-5 minutes)
5. **Verify** at https://antuf.org (hard refresh)
6. **Check Sliders** show real data (not demo)

**You're all set! Let's deploy! 🚀**
