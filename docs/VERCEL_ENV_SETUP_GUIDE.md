# 🚀 Vercel Production Environment Setup Guide

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **ANTUF Project Settings**: https://vercel.com/dashboard/antuf/settings/environment-variables
- **Deployments**: https://vercel.com/dashboard/antuf/deployments

---

## Step-by-Step Setup Instructions

### Step 1: Access Vercel Environment Variables

1. Go to: https://vercel.com/dashboard/antuf/settings/environment-variables
2. You should see three tabs: "Development", "Preview", "Production"
3. Click on the **"Production"** tab
4. This is where we'll add all the environment variables

### Step 2: Add Critical Variables First

These MUST be added for sliders to work:

#### Variable 1: DB_URL
```
Name:        DB_URL
Value:       mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
Environment: Production
```

**Steps:**
1. Click "Add New"
2. Enter "DB_URL" in the Name field
3. Paste the MongoDB URL in the Value field
4. Make sure "Production" is selected
5. Click "Add" or "Save"

#### Variable 2: NEXTAUTH_SECRET
```
Name:        NEXTAUTH_SECRET
Value:       ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
Environment: Production
```

#### Variable 3: NEXTAUTH_URL
```
Name:        NEXTAUTH_URL
Value:       https://antuf.org
Environment: Production
```

#### Variable 4: NEXTAUTH_URL_INTERNAL
```
Name:        NEXTAUTH_URL_INTERNAL
Value:       https://antuf.org
Environment: Production
```

### Step 3: Add OAuth Variables

#### Google OAuth
```
Name:        GOOGLE_CLIENT_ID
Value:       349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com
Environment: Production

Name:        GOOGLE_CLIENT_SECRET
Value:       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
Environment: Production

Name:        GOOGLE_API_KEY
Value:       AIzaSyA9WDyVexsB7Ezcf4BW51reOHIU3H0n6fg
Environment: Production
```

#### GitHub OAuth
```
Name:        GITHUB_CLIENT_ID
Value:       Ov23liHhOrNTMMlMppZW
Environment: Production

Name:        GITHUB_CLIENT_SECRET
Value:       ecfbc0376fd624e53a227e522cc3095f258173b6
Environment: Production
```

### Step 4: Add Cloudinary Variables

```
Name:        CLOUDINARY_CLOUD_NAME
Value:       dfu758f7t
Environment: Production

Name:        CLOUDINARY_API_KEY
Value:       716736663386284
Environment: Production

Name:        CLOUDINARY_API_SECRET
Value:       Tp89Vv77JsiXImfpRvifX1y1pKQ
Environment: Production
```

### Step 5: Add Stripe Variables

```
Name:        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
Value:       pk_test_51RYghWI1GT4gvU5DAuYW7o5SuuVIonB1Mhb48jTw48wDlVOUjDVvjGmgWGxseXvfrbRiRW9THFKeQCay3WsxyYpk007H6JvwWi
Environment: Production

Name:        STRIPE_SECRET_KEY
Value:       sk_test_51SE8BUI842Eoe4ZfcoDAWqlAdrDac9ch09GrWrbv18vzY1cR14z3oP7SO6bUTMurTHxecZCEZxghKFOtxaCVEqbq00iMeP941O
Environment: Production

Name:        STRIPE_WEBHOOK_SECRET
Value:       your_stripe_webhook_secret_here
Environment: Production
```

### Step 6: Add reCAPTCHA Variables

```
Name:        NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value:       6LfcX_QrAAAAAONk16hPK676Wga-N9tHlFSf-D5F
Environment: Production

Name:        RECAPTCHA_SECRET_KEY
Value:       6LfcX_QrAAAAAF8oIdu10tJjMtE7_rYlM6Wn77-h
Environment: Production
```

### Step 7: Add Judge0 Variable

```
Name:        NEXT_PUBLIC_JUDGE0_API_KEY
Value:       bed7cbad0emsh3064b3ad56470aap1b3ea1jsn58e572615934
Environment: Production
```

### Step 8: Add Stream API Variables

```
Name:        NEXT_PUBLIC_STREAM_API_KEY
Value:       c9587tt8muyq
Environment: Production

Name:        STREAM_API_SECRET
Value:       yewhg673tgx7txb5quwj4jsprurxkaqqptttjzm3b5yfrf5mux6ts5yvhb28pjqa
Environment: Production
```

### Step 9: Add Admin Email

```
Name:        ADMIN_EMAIL
Value:       your-admin-email@example.com
Environment: Production
```

---

## After Adding All Variables

### Expected Result
- After adding all variables, Vercel will automatically detect the changes
- You should see a message indicating a redeploy is starting
- The redeploy typically takes 3-5 minutes

### Watch the Deployment
1. Go to: https://vercel.com/dashboard/antuf/deployments
2. You should see a recent deployment in progress
3. Wait for it to complete (look for ✓ green checkmark)
4. Estimated time: 3-5 minutes

### Verify the Fix

1. **Visit Production Site**
   - Go to: https://antuf.org
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

2. **Check Sliders**
   - Look at the homepage
   - Sliders should display REAL content (not demo)
   - Images should load from Cloudinary

3. **Verify API**
   - Open DevTools: F12
   - Go to Network tab
   - Look for `/api/sliders` request
   - Check the response - should show real slider data
   - Response should NOT be empty or error

4. **Check Console**
   - Ensure no red error messages
   - No 500 errors
   - No connection refused messages

---

## Troubleshooting

### Issue: Still Seeing Demo Slider

**Possible Causes:**
- Deployment still in progress
- Browser cache showing old version
- Environment variables not fully propagated

**Solutions:**
1. Wait 5-10 minutes for full deployment
2. Hard refresh browser: Cmd+Shift+R
3. Clear browser cache (DevTools → Application → Clear storage)
4. Check deployment status: https://vercel.com/dashboard/antuf/deployments

### Issue: API Returns Error 500

**Possible Causes:**
- DB_URL not set or incorrect
- MongoDB server down
- Connection string format wrong

**Solutions:**
1. Verify DB_URL value matches exactly:
   ```
   mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163
   ```
2. Check Vercel logs for errors:
   - Go to: Deployments → Latest → Logs
   - Look for database connection errors

### Issue: Deployment Failed

**Possible Causes:**
- Build error
- Invalid environment variable format
- Configuration issue

**Solutions:**
1. Check build logs in Vercel
2. Verify all variable values are correct
3. Try manual redeploy: Deployments → Latest → Click "Redeploy"

### Issue: Some Features Not Working

**Possible Causes:**
- Specific OAuth or payment variables missing
- API keys expired or invalid

**Solutions:**
1. Verify all OAuth variables are added
2. Check that NEXT_PUBLIC_ variables are accessible
3. Test individual features through admin dashboard

---

## Variable Categories

### 🔴 Critical (MUST ADD)
These are essential for the site to work:
- DB_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- NEXTAUTH_URL_INTERNAL

### 🟡 Important (Should Add)
These enable major features:
- Google OAuth (for login)
- GitHub OAuth (for login)
- Cloudinary (for images)
- Stripe (for payments)

### 🟢 Optional (Can Add Later)
These add extra functionality:
- reCAPTCHA (for security)
- Judge0 API (for code execution)
- Stream API (for messaging)
- Payment gateways (alternative to Stripe)

---

## Copy-Paste Template

If you prefer to copy all at once, use: `.env.production.template`

This file contains all variables organized by category.

---

## Monitoring After Setup

### Check Status
1. **Deployments Page**: https://vercel.com/dashboard/antuf/deployments
2. **Environment Variables**: https://vercel.com/dashboard/antuf/settings/environment-variables
3. **Production Site**: https://antuf.org

### Expected Metrics
- Deployment time: 3-5 minutes
- Build size: ~500KB
- Time to first meaningful paint: < 2s
- Sliders load time: < 1s

### Important Notes

⚠️ **Security Best Practices:**
- Never commit .env files to GitHub
- Use Vercel for production credentials
- Rotate API keys periodically
- Monitor for suspicious activity

✅ **After Deployment:**
- Database queries should work
- API endpoints should respond
- Images should load quickly
- No 500 errors in console

---

## Additional Resources

- **Vercel Docs**: https://vercel.com/docs/projects/environment-variables
- **Next.js Docs**: https://nextjs.org/docs/basic-features/environment-variables
- **MongoDB Connection**: https://www.mongodb.com/docs/drivers/node/current/connection/
- **NextAuth.js**: https://next-auth.js.org/getting-started/example

---

## Quick Checklist

- [ ] DB_URL added and verified
- [ ] NEXTAUTH_SECRET added
- [ ] NEXTAUTH_URL set to https://antuf.org
- [ ] Google OAuth variables added
- [ ] GitHub OAuth variables added
- [ ] Cloudinary variables added
- [ ] Stripe variables added
- [ ] reCAPTCHA variables added
- [ ] All other optional variables added
- [ ] Waited 5 minutes for deployment
- [ ] Hard refreshed production site
- [ ] Verified sliders display real data
- [ ] No console errors visible

---

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Verify environment variable values
4. See `docs/SLIDER_DEBUG_CHECKLIST.md` for more diagnostics

---

**You're all set! Happy deploying! 🚀**
