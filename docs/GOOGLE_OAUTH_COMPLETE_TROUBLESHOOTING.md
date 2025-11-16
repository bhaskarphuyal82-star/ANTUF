# Google OAuth "Access Denied" - Complete Troubleshooting

## ⚡ Quick Fix (Try These First)

### 1. Clear Everything and Restart
```bash
# Kill dev server (Ctrl+C)
rm -rf .next node_modules/.cache
npm run dev
```

### 2. Clear Browser Data
- **Chrome**: Ctrl+Shift+Delete → "All time" → Clear data
- **Firefox**: Ctrl+Shift+Delete → "Everything" → Delete Now
- Or use **Private/Incognito Window**

### 3. Verify Environment Variables
```bash
cat .env.local | grep -E "GOOGLE|NEXTAUTH"
```

Must show:
```
GOOGLE_CLIENT_ID=349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=[some long string]
NEXTAUTH_URL=http://localhost:3000
```

If missing, copy from `.env.local` backup or documentation.

---

## 🔍 Step-by-Step Diagnosis

### Step 1: Run Debug Script
```bash
node debug-oauth.js
```

This will check:
- ✓ Environment variables
- ✓ MongoDB connection
- ✓ User collection
- ✓ Schema validation
- ✓ User creation capability

**Expected Output:**
```
========== GOOGLE OAUTH DEBUG ==========

1. Checking Environment Variables...
✓ All required env vars present
  - GOOGLE_CLIENT_ID: 349121129295-44pcbd13...
  - NEXTAUTH_URL: http://localhost:3000

2. Testing MongoDB Connection...
✓ MongoDB connected

3. Checking User Collection...
✓ Users collection exists
  - Total users: 5
  - Google OAuth users: 2
  - Users with null password: 2

4. User Schema Validation...
✓ User schema loaded
  - Name: required=true, minLength=1
  - Email: required=true, unique=true
  - Password: required=false, default=null
  - Provider: enum=credentials,google,github,facebook,linkedin

5. Testing User Creation...
✓ Test user created successfully
  - Email: test-oauth-1731323456789@gmail.com
  - Provider: google
✓ Test user cleaned up

========== DEBUG COMPLETE ==========
```

**If any step fails**, note which one and follow the specific fix below.

---

## 🛠️ Specific Fixes

### Issue 1: "Missing environment variables"

**Solution:**
```bash
# Check if .env.local exists
ls -la .env.local

# If missing, copy from template
cp .env.example .env.local

# Then add Google credentials:
echo "GOOGLE_CLIENT_ID=349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com" >> .env.local
echo "GOOGLE_CLIENT_SECRET=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" >> .env.local

# Restart dev server
npm run dev
```

### Issue 2: "MongoDB connection failed"

**Solution:**
```bash
# Verify MongoDB URL
grep DB_URL .env.local

# Test connection manually
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.DB_URL).then(() => { console.log('✓ Connected'); process.exit(0); }).catch(err => { console.error('✗ Error:', err.message); process.exit(1); });"

# If it fails:
# 1. Check MongoDB Atlas dashboard
# 2. Verify IP whitelist includes your IP
# 3. Verify password has no special characters (or is URL encoded)
# 4. Try with simpler password if possible
```

### Issue 3: "Users collection not found"

**Solution:**
The collection will be created automatically on first user creation. This is normal.

To pre-create it:
```bash
# In MongoDB Atlas:
# 1. Go to Database → Collections
# 2. Click "Create Collection"
# 3. Name it "users"
# 4. Create an index on "email" field (unique)
```

### Issue 4: "Users with validation errors"

**Check:**
```bash
# These constraints were relaxed to support OAuth:
- name: minLength changed from 3 to 1 (OAuth users might have short names)
- password: now optional (OAuth users don't have passwords)
- provider: added to track login method
```

**If you still see errors:**
```bash
# Check actual user in database
# In MongoDB Atlas terminal:
db.users.findOne({email: "test@gmail.com"})

# Check for these issues:
# 1. Name field too short (should be at least 1 char)
# 2. Name field missing entirely (should have fallback)
# 3. Email field not lowercase
# 4. Email field duplicate (check for multiple entries)
```

---

## 📋 Terminal Log Inspection

When you attempt Google login, watch the **dev server terminal** for these logs:

### ✓ Successful Flow
```
[NextAuth SignIn] Starting signin for: user@gmail.com Provider: google
[NextAuth SignIn] Creating new google user: user@gmail.com
[NextAuth SignIn] ✓ New google user created: user@gmail.com
[NextAuth SignIn] ✓ SignIn successful for: user@gmail.com
[NextAuth JWT] Initial token creation for: user@gmail.com
[NextAuth Session] Session updated for: user@gmail.com
```

### ✗ Error: User Creation Fails
```
[NextAuth SignIn] Starting signin for: user@gmail.com Provider: google
[NextAuth SignIn] Creating new google user: user@gmail.com
[NextAuth SignIn] Failed to create user: {ERROR MESSAGE}
```

**Common creation errors:**
- `E11000 duplicate key error` → User already exists, but provider not updated
- `Cast to String failed` → Invalid name field
- `email: Path `email` is required` → Google didn't provide email
- `name: Path `name` is required` → Google didn't provide name and fallback failed

**Fix for duplicate:**
```bash
# Find and inspect the user
db.users.findOne({email: "user@gmail.com"})

# Update provider field
db.users.updateOne(
  {email: "user@gmail.com"},
  {$set: {provider: "google", password: null}}
)

# Try login again
```

---

## 🌐 Browser Console Debugging

Press **F12** in browser and check Console tab:

### Check NextAuth Status
```javascript
// In browser console:
import { getSession } from 'next-auth/react';
getSession().then(session => console.log('Session:', session));
```

### Manual SignIn Test
```javascript
import { signIn } from 'next-auth/react';

signIn('google', { redirect: false }).then(result => {
  console.log('SignIn result:', result);
  console.log('Error:', result?.error);
  console.log('Status:', result?.status);
  console.log('OK:', result?.ok);
});
```

### Check for Network Errors
1. Open **Network** tab (F12)
2. Attempt Google login
3. Look for `/api/auth/signin/google` request
4. Check Response tab for any errors

---

## 🔐 Google OAuth Configuration Check

### On Google Cloud Console
1. Go to https://console.cloud.google.com
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click your OAuth 2.0 Client ID
5. Verify under "Authorized redirect URIs":
   ```
   http://localhost:3000/api/auth/callback/google
   http://localhost:3000/api/auth/signin/google
   ```

### In Your App
```bash
# Verify in code:
grep -r "GOOGLE_CLIENT" .env.local

# These should match Google Cloud Console:
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
```

---

## 🧪 Testing Workflow

### First Time Setup Test
```bash
# 1. Clear everything
rm -rf .next
rm debug-oauth-test.json

# 2. Run debug script
node debug-oauth.js

# 3. Check output (all should be ✓)

# 4. Start dev server
npm run dev

# 5. Open private window: http://localhost:3000

# 6. Click "Log In with Google"

# 7. Complete OAuth flow

# 8. Check terminal for [NextAuth SignIn] logs

# 9. Should see "✓ SignIn successful" message
```

### If All Checks Pass But Still Failing

This indicates the issue is **NOT** in:
- Environment setup ❌
- MongoDB ❌
- Schema ❌

Check:
- [ ] Browser cached bad session → Use private window
- [ ] Google API keys rotated → Verify in Google Cloud Console
- [ ] NextAuth session secret changed → Must remain constant
- [ ] NEXTAUTH_URL changed → Must match localhost:3000

---

## 📞 Debugging Checklist

Before asking for help, verify:

- [ ] `.env.local` exists and has all variables
- [ ] `npm run dev` running without errors
- [ ] MongoDB connection works (`debug-oauth.js` passes)
- [ ] User model schema loads correctly
- [ ] Private/incognito browser window used
- [ ] No cached bad session
- [ ] Google OAuth app URIs include `http://localhost:3000`
- [ ] Terminal shows `[NextAuth...]` logs (not old output)

---

## 📊 File Changes Made

### 1. `/models/user.js`
- ✓ `password`: optional (required: false)
- ✓ `provider`: added field to track OAuth method
- ✓ `name`: minLength reduced from 3 to 1
- ✓ `email`: added index for faster queries

### 2. `/utils/authOptions.js`
- ✓ Enhanced `signIn` callback with detailed logging
- ✓ Improved `jwt` callback for OAuth
- ✓ Improved `session` callback
- ✓ Better error handling in Credentials provider
- ✓ Google Provider now has `prompt: "consent"` option

### 3. New Files
- ✓ `debug-oauth.js` - Automated diagnostic tool

---

## 🚀 Final Verification

Run this before declaring victory:

```bash
# 1. Debug script passes
node debug-oauth.js

# 2. Dev server runs clean
npm run dev  # Should have no errors

# 3. Can create user manually
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user').default;
mongoose.connect(process.env.DB_URL).then(async () => {
  const user = await User.create({
    email: 'test@example.com',
    name: 'Test',
    provider: 'google',
    password: null
  });
  console.log('✓ User created:', user.email);
  await User.deleteOne({_id: user._id});
  process.exit(0);
});
"

# 4. Test login in private window
# - Open private browser window
# - Go to http://localhost:3000
# - Click "Log In with Google"
# - Check for [NextAuth SignIn] ✓ logs in terminal
```

---

## 💡 Advanced: Manual Database Check

```bash
# MongoDB Atlas terminal:

# 1. Count all users
db.users.countDocuments()

# 2. Find your Google user
db.users.findOne({email: "yourtest@gmail.com"})

# 3. Check it has correct fields
db.users.findOne({email: "yourtest@gmail.com"}, {
  email: 1,
  name: 1,
  provider: 1,
  password: 1,
  createdAt: 1
})

# 4. Fix provider if needed
db.users.updateOne(
  {email: "yourtest@gmail.com"},
  {$set: {provider: "google"}}
)

# 5. Check indexes
db.users.getIndexes()
# Should include index on "email" field
```

---

## Still Stuck?

Please provide:
1. Output of `node debug-oauth.js`
2. Terminal logs from the `[NextAuth...]` attempt
3. Browser console errors (if any)
4. Google Cloud Console OAuth configuration screenshot
5. `.env.local` (without secrets, just confirm variables are set)
