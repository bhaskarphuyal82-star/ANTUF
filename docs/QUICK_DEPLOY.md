# ⚡ VERCEL DEPLOYMENT - QUICK REFERENCE

## 🎯 ONE-PAGE DEPLOYMENT GUIDE

### Step 1: Go to Vercel Settings
https://vercel.com/dashboard/antuf/settings/environment-variables

### Step 2: Click "Production" Tab

### Step 3: Add These 12 CRITICAL Variables

```
1. DB_URL = mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163

2. NEXTAUTH_SECRET = ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7

3. NEXTAUTH_URL = https://antuf.org

4. NEXTAUTH_URL_INTERNAL = https://antuf.org

5. API = https://antuf.org/api

6. NEXT_PUBLIC_API = https://antuf.org/api

7. CLIENT_URL = https://antuf.org

8. GOOGLE_CLIENT_ID = 349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com

9. GOOGLE_CLIENT_SECRET = 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

10. CLOUDINARY_CLOUD_NAME = dkxttcalf

11. CLOUDINARY_API_KEY = 466425782678433

12. CLOUDINARY_API_SECRET = W1N-bWrRKk-ieEMmAVCMLGee8TQ
```

### Step 4: Wait 5 Minutes for Deployment

Watch: https://vercel.com/dashboard/antuf/deployments

### Step 5: Verify

Visit: https://antuf.org

Hard refresh: Cmd+Shift+R

---

## ✅ What You Should See

- Homepage loads
- Sliders show REAL data (not demo)
- Images load from Cloudinary
- No errors in console

---

## ❌ If Sliders Still Show Demo

1. Wait 2-3 more minutes
2. Hard refresh: Cmd+Shift+R
3. Clear browser cache
4. Check: https://vercel.com/dashboard/antuf/deployments

---

## 📋 Additional Variables (Optional)

```
GOOGLE_API_KEY = AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg
GOOGLE_CALLBACK_URL = https://antuf.org/api/auth/callback/google
GITHUB_CLIENT_ID = Ov23liHhOrNTMMlMppZW
GITHUB_CLIENT_SECRET = ecfbc0376fd624e53a227e522cc3095f258173b6
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi
STRIPE_SECRET_KEY = sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O
STRIPE_WEBHOOK_SECRET = your_stripe_webhook_secret_here
NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F
RECAPTCHA_SECRET_KEY = 6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h
ADMIN_EMAIL = your-admin-email@example.com
```

---

## 📞 Need Help?

See: `/DEPLOY_TO_VERCEL.md` (full detailed guide)

---

**Status**: ✅ Ready to Deploy

**Domain**: https://antuf.org

**Time**: ~30 minutes

Let's go! 🚀
