# Google OAuth Debug Guide - Access Denied Issue

## Problem
Google OAuth login still shows: "Access denied. You do not have permission to sign in."

## What We've Done
✓ Made password field optional in User model  
✓ Added provider field to track OAuth method  
✓ Enhanced signIn callback with detailed logging  
✓ Improved JWT and session callbacks  
✓ Added error handling for email case sensitivity  

## Debug Steps (Follow in Order)

### Step 1: Check Terminal Logs
When attempting Google login, look at the **development server terminal** for logs starting with `[NextAuth ...]`:

**Expected Logs on Success:**
```
[NextAuth SignIn] Starting signin for: user@gmail.com Provider: google
[NextAuth SignIn] Creating new google user: user@gmail.com
[NextAuth SignIn] ✓ New google user created: user@gmail.com
[NextAuth SignIn] ✓ SignIn successful for: user@gmail.com
[NextAuth JWT] Initial token creation for: user@gmail.com
[NextAuth Session] Session updated for: user@gmail.com
```

**If You See Any Errors:**
- Note the error message after `[NextAuth SignIn]` or `[NextAuth JWT]`
- This will tell us exactly where the flow breaks

### Step 2: Check Browser Console
Open DevTools (F12) → Console tab and look for:
- Any JavaScript errors
- Network errors in Network tab
- Check the request to `/api/auth/signin/google`

### Step 3: Verify Database Connection
In terminal, run:
```bash
# Check if MongoDB connection is working
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL).then(() => {
  console.log('✓ MongoDB connected');
  process.exit(0);
}).catch(err => {
  console.error('✗ MongoDB failed:', err.message);
  process.exit(1);
});
"
```

### Step 4: Check Environment Variables
Verify that `.env.local` has:
```bash
# In terminal:
grep -E "GOOGLE_CLIENT|NEXTAUTH" .env.local
```

Expected output:
```
GOOGLE_CLIENT_ID=349121129295-...
GOOGLE_CLIENT_SECRET=GOCSPX-...
NEXTAUTH_SECRET=ff39b85c...
NEXTAUTH_URL=http://localhost:3000
```

### Step 5: Clear Build Cache and Restart
```bash
# Kill current dev server (Ctrl+C)
rm -rf .next
npm run dev
```

### Step 6: Test with Fresh Browser Session
1. Open **private/incognito window** (Ctrl+Shift+P in Chrome)
2. Go to http://localhost:3000
3. Click "Log In with Google"
4. Watch terminal for `[NextAuth ...]` logs
5. Check browser console for errors

## Common Error Messages and Solutions

### Error: "Access denied. You do not have permission to sign in."
**Cause:** `signIn` callback returned `false`

**Check:**
```
1. Terminal logs - see what error occurred
2. Is the email being captured correctly?
3. Is the database connection successful?
4. Are there validation errors in User.create()?
```

**Test Fix:**
Add this to your browser console while on login page:
```javascript
// Check if Google OAuth is loading
console.log('GOOGLE_CLIENT_ID:', window.GOOGLE_CLIENT_ID);
// Try manual signIn
import { signIn } from 'next-auth/react';
signIn('google', { redirect: false }).then(r => console.log('Result:', r));
```

### Error: "Failed to create user"
**Check:**
1. User schema validation - ensure all required fields are provided
2. Duplicate email in database
3. MongoDB unique index violation

**Fix:**
```bash
# Check for duplicate users
mongo "mongodb://..." --eval "db.users.find({email: 'test@gmail.com'}).count()"

# If duplicates exist, remove them
mongo "mongodb://..." --eval "db.users.deleteMany({email: 'test@gmail.com'})"
```

### Error: "Email is required" or "Name is required"
**Cause:** Google OAuth not providing these fields

**Solution:**
The code now provides defaults:
- Name: defaults to email prefix if not provided
- Email: always required by Google, so this shouldn't happen
- Image: optional

### Error in JWT or Session Callbacks
**Check:** Did signIn succeed? If signIn failed, JWT/Session won't be called

**Verify:**
1. Look for `[NextAuth SignIn] ✓ SignIn successful`
2. If you only see error logs, the issue is in signIn callback

## What Each Log Message Means

| Log | Meaning | Status |
|-----|---------|--------|
| `[NextAuth SignIn] Starting signin` | Provider contacted Google, got user data | Good start |
| `[NextAuth SignIn] Creating new` | First-time user, creating account | Normal for new users |
| `[NextAuth SignIn] Found existing` | User already in database | Normal for returning users |
| `[NextAuth SignIn] ✓ SignIn successful` | **Everything OK, proceeding** | ✓ Success |
| `[NextAuth SignIn] Callback error` | **Something failed** | ✗ Check error message |
| `[NextAuth JWT] Initial token` | Creating JWT token | Next step after signIn |
| `[NextAuth Session] Session updated` | Session created, ready to use | ✓ Complete |

## Database Check Commands

```bash
# Check user count
db.users.countDocuments()

# Find your test user
db.users.findOne({ email: 'test@gmail.com' })

# Check if password is null
db.users.findOne({ email: 'test@gmail.com' }, { password: 1, provider: 1 })

# Check all fields for a user
db.users.findOne({ email: 'test@gmail.com' }).pretty()
```

## NextAuth Session Check

In your app, add this temporary debug component:
```javascript
'use client';
import { useSession } from 'next-auth/react';

export default function SessionDebug() {
  const { data: session, status } = useSession();
  
  return (
    <pre>
      Status: {status}
      Session: {JSON.stringify(session, null, 2)}
    </pre>
  );
}
```

## Still Stuck?

### Get Full Error Stack
Modify `/utils/authOptions.js` signIn callback:
```javascript
} catch (error) {
  console.error("[NextAuth SignIn] Full error:", error);
  console.error("[NextAuth SignIn] Stack:", error.stack);
  return false;
}
```

### Enable NextAuth Debug Mode
Add to `.env.local`:
```
DEBUG=next-auth:*
```

### Check NextAuth Logs
```bash
# Run with debug logging
DEBUG=next-auth:* npm run dev
```

This will show you **everything** NextAuth is doing.

## Final Checklist Before Testing

- [ ] `.env.local` has Google credentials
- [ ] `.next` folder deleted (old build cache)
- [ ] Development server restarted
- [ ] Browser cache cleared (or private window used)
- [ ] MongoDB connection verified
- [ ] Google OAuth app authorized origins include `http://localhost:3000`
- [ ] Terminal is showing live logs (not scrolled up)

## When Reporting the Issue

Please provide:
1. **Terminal logs** from attempted login (copy the `[NextAuth ...]` lines)
2. **Browser console errors** (if any)
3. **Environment variable** confirmation (GOOGLE_CLIENT_ID, etc.)
4. **Database connection status** (working/failing)
5. **Browser/OS** (Chrome on Mac, Firefox on Windows, etc.)
