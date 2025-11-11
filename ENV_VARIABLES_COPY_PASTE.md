# 🔐 ANTUF VERCEL ENVIRONMENT VARIABLES - COPY PASTE REFERENCE

## ⚠️ IMPORTANT INSTRUCTIONS

1. **Go to**: https://vercel.com/dashboard/antuf/settings/environment-variables
2. **Select**: "Production" tab (NOT Development or Preview)
3. **For EACH variable**:
   - Click "Add New"
   - Copy the **Name** exactly (with underscores, case-sensitive)
   - Paste the **Value** exactly (no extra spaces)
   - Make sure "Production" is selected
   - Click "Add" or "Save"

---

## 🔴 CRITICAL VARIABLES (Add these FIRST!)

These 7 variables are **ESSENTIAL** - sliders won't load without them.

### 1. Database Connection

**Name**: `DB_URL`

**Value**:
```
mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
```

---

### 2. NextAuth Secret

**Name**: `NEXTAUTH_SECRET`

**Value**:
```
ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
```

---

### 3. NextAuth URL

**Name**: `NEXTAUTH_URL`

**Value**:
```
https://antuf.org
```

---

### 4. NextAuth URL Internal

**Name**: `NEXTAUTH_URL_INTERNAL`

**Value**:
```
https://antuf.org
```

---

### 5. API Endpoint

**Name**: `API`

**Value**:
```
https://antuf.org/api
```

---

### 6. Public API Endpoint

**Name**: `NEXT_PUBLIC_API`

**Value**:
```
https://antuf.org/api
```

---

### 7. Client URL

**Name**: `CLIENT_URL`

**Value**:
```
https://antuf.org
```

---

## 🟡 IMPORTANT VARIABLES (Add these for features)

These 12 variables enable key features. Highly recommended.

### 8. Google Client ID

**Name**: `GOOGLE_CLIENT_ID`

**Value**:
```
349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com
```

---

### 9. Google Client Secret

**Name**: `GOOGLE_CLIENT_SECRET`

**Value**:
```
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
```

---

### 10. Google API Key

**Name**: `GOOGLE_API_KEY`

**Value**:
```
AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg
```

---

### 11. Google Callback URL

**Name**: `GOOGLE_CALLBACK_URL`

**Value**:
```
https://antuf.org/api/auth/callback/google
```

---

### 12. GitHub Client ID

**Name**: `GITHUB_CLIENT_ID`

**Value**:
```
Ov23liHhOrNTMMlMppZW
```

---

### 13. GitHub Client Secret

**Name**: `GITHUB_CLIENT_SECRET`

**Value**:
```
ecfbc0376fd624e53a227e522cc3095f258173b6
```

---

### 14. Cloudinary Cloud Name

**Name**: `CLOUDINARY_CLOUD_NAME`

**Value**:
```
dkxttcalf
```

---

### 15. Cloudinary API Key

**Name**: `CLOUDINARY_API_KEY`

**Value**:
```
466425782678433
```

---

### 16. Cloudinary API Secret

**Name**: `CLOUDINARY_API_SECRET`

**Value**:
```
W1N-bWrRKk-ieEMmAVCMLGee8TQ
```

---

### 17. Stripe Publishable Key

**Name**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

**Value**:
```
pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi
```

---

### 18. Stripe Secret Key

**Name**: `STRIPE_SECRET_KEY`

**Value**:
```
sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O
```

---

### 19. Stripe Webhook Secret

**Name**: `STRIPE_WEBHOOK_SECRET`

**Value**:
```
your_stripe_webhook_secret_here
```

---

## 🟢 OPTIONAL VARIABLES (Add for extra features)

These are optional but recommended for full functionality.

### 20. reCAPTCHA Site Key

**Name**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

**Value**:
```
6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F
```

---

### 21. reCAPTCHA Secret Key

**Name**: `RECAPTCHA_SECRET_KEY`

**Value**:
```
6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h
```

---

### 22. Judge0 API Key

**Name**: `NEXT_PUBLIC_JUDGE0_API_KEY`

**Value**:
```
bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934
```

---

### 23. Admin Email

**Name**: `ADMIN_EMAIL`

**Value**:
```
your-admin-email@example.com
```

(Replace with your actual admin email)

---

## 📋 CHECKLIST

### Critical (7 variables)

- [ ] DB_URL
- [ ] NEXTAUTH_SECRET
- [ ] NEXTAUTH_URL
- [ ] NEXTAUTH_URL_INTERNAL
- [ ] API
- [ ] NEXT_PUBLIC_API
- [ ] CLIENT_URL

### Important (12 variables)

- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] GOOGLE_API_KEY
- [ ] GOOGLE_CALLBACK_URL
- [ ] GITHUB_CLIENT_ID
- [ ] GITHUB_CLIENT_SECRET
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET

### Optional (4+ variables)

- [ ] NEXT_PUBLIC_RECAPTCHA_SITE_KEY
- [ ] RECAPTCHA_SECRET_KEY
- [ ] NEXT_PUBLIC_JUDGE0_API_KEY
- [ ] ADMIN_EMAIL

---

## 🚀 NEXT STEPS

1. Copy a **Name** from above
2. Go to Vercel: https://vercel.com/dashboard/antuf/settings/environment-variables
3. Click "Production" tab
4. Click "Add New"
5. Paste the **Name**
6. Paste the **Value**
7. Confirm scope is "Production"
8. Click "Add"
9. Repeat for all 22 variables

---

## ⏱️ TIMELINE

- Each variable: ~2 minutes
- All 22 variables: ~45 minutes
- Deployment: 3-5 minutes
- **Total time**: ~50 minutes to deployment

---

## ✅ VERIFICATION

After adding all variables, Vercel will auto-deploy. Then:

1. Visit: https://antuf.org
2. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. Open DevTools: F12
4. Check Console for errors
5. Look for sliders with real data

---

## 💡 TIPS

- **Copy carefully**: No extra spaces or line breaks
- **Case sensitive**: Variable names must match exactly
- **Production scope**: Always select "Production"
- **One by one**: Add each variable individually
- **Vercel redeploy**: Happens automatically after you save

---

## 🆘 TROUBLESHOOTING

**Q: Variables won't save?**
- A: Make sure you click "Add" button and wait for confirmation

**Q: Where do I go?**
- A: https://vercel.com/dashboard/antuf/settings/environment-variables

**Q: Which tab?**
- A: "Production" (not Development or Preview)

**Q: How long until deployment?**
- A: 3-5 minutes after last variable is saved

**Q: Sliders still show demo?**
- A: Wait another 2 minutes, hard refresh, check if DB_URL is correct

---

**Production Domain**: https://antuf.org
**Vercel Project**: antuf
**Status**: ✅ Ready to Deploy

Good luck! 🚀
