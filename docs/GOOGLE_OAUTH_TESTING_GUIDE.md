# Google OAuth Testing Checklist - localhost:3000

## Before Testing
- [ ] Development server running: `npm run dev`
- [ ] Check `.env.local` has Google OAuth credentials:
  - GOOGLE_CLIENT_ID set
  - GOOGLE_CLIENT_SECRET set
  - NEXTAUTH_URL = http://localhost:3000
  - NEXTAUTH_SECRET set

## Testing Steps

### 1. Clean Browser State
```bash
# Option 1: Manual
- Open DevTools (F12)
- Go to Application tab
- Clear Cookies for localhost:3000
- Clear Local Storage

# Option 2: Automatic (Chrome)
- Ctrl/Cmd + Shift + Delete
- Select "Cookies and other site data"
- Time range: "All time"
- Click Clear data
```

### 2. First Time Google Login (New User)
1. Navigate to http://localhost:3000
2. Find login button and click "Log In with Google"
3. Complete Google OAuth flow in popup
4. Expected result:
   - User created in MongoDB
   - Session established
   - Redirected to dashboard/home page
   - Check terminal log: `New google user created: [email@gmail.com]`

### 3. Subsequent Login (Existing User)
1. Sign out (if logged in)
2. Clear browser cookies
3. Click "Log In with Google" again
4. Expected result:
   - No new user created
   - Session reestablished
   - Check terminal log: `Existing user logged in: [email@gmail.com]`

### 4. Switching Login Methods
If user previously registered with email/password:
1. Click "Log In with Google" with same email
2. OAuth should link to existing account
3. User can now login with either method

## Troubleshooting

### Error: "Access denied. You do not have permission to sign in"
- [ ] Check `.env.local` for Google credentials
- [ ] Verify Google OAuth app authorized origins include `http://localhost:3000`
- [ ] Check MongoDB connection in `.env.local`
- [ ] Clear browser cookies and retry
- [ ] Check terminal for error logs

### Error: "Sign in with this provider not supported"
- [ ] Provider (Google) not configured in authOptions.js
- [ ] Environment variables not loaded
- [ ] Restart dev server: `npm run dev`

### No redirect after Google login
- [ ] Check browser console for JavaScript errors
- [ ] Verify NEXTAUTH_URL = http://localhost:3000
- [ ] Check Next.js build errors in terminal
- [ ] Verify database connection

### MongoDB Connection Issues
- [ ] Check DB_URL in `.env.local`
- [ ] Verify network connectivity to MongoDB Atlas
- [ ] Check VPN if applicable
- [ ] Review MongoDB connection logs

## Server Logs to Monitor
```
# Success messages
New google user created: [email]
Existing user logged in: [email]

# Error messages
SignIn callback error: [error details]
JWT callback error: [error details]
Session callback error: [error details]
```

## Files to Check
- `/utils/authOptions.js` - OAuth configuration
- `/models/user.js` - User schema (password now optional)
- `/app/api/auth/[...nextauth]/route.js` - NextAuth route handler
- `.env.local` - Environment variables

## Quick Fix Commands
```bash
# Restart dev server
npm run dev

# Clear Node cache and rebuild
rm -rf .next
npm run dev

# Check environment variables
grep GOOGLE .env.local

# View MongoDB logs
# (depends on your MongoDB setup)
```

## Expected Behavior After Fix
✓ First-time users can log in with Google OAuth
✓ Returning users can log in with Google OAuth
✓ Users can link multiple login methods
✓ Password field is optional for OAuth users
✓ No "Access denied" errors for valid OAuth flows
