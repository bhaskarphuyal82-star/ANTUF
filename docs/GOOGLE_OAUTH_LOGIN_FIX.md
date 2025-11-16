# Google OAuth Login Fix - Access Denied Error

## Problem
When attempting to log in with Google on localhost:3000, users received the error:
```
Access denied. You do not have permission to sign in.
```

## Root Cause
The User model had a **required password field**, but OAuth users (Google, GitHub, etc.) don't have passwords. When NextAuth tried to create a new user during the first Google OAuth login, it would fail because:
1. The `password` field was marked as `required: true`
2. No password is generated or provided for OAuth users
3. The `signIn` callback would catch this error and return `false`, blocking the login

## Solution Implemented

### 1. Updated User Model (`/models/user.js`)
- Made `password` field optional: `required: false`
- Added default value: `default: null`
- Added new `provider` field to track login method:
  ```javascript
  provider: {
    type: String,
    enum: ["credentials", "google", "github", "facebook", "linkedin"],
    default: "credentials",
  }
  ```

### 2. Enhanced Auth Options (`/utils/authOptions.js`)

#### a) Credentials Provider Improvement
- Better error handling to distinguish between missing user and missing password
- Now shows appropriate message for OAuth-only accounts

#### b) SignIn Callback Enhancement
- Provides fallback for user name (uses email prefix if name not provided)
- Explicitly sets `password: null` for OAuth users
- Logs user creation/login for debugging
- Better error handling with console logging

#### c) JWT Callback Improvement
- Handles both initial user creation and subsequent token refreshes
- Checks for user object first (faster for OAuth)
- Falls back to database lookup for existing sessions
- Properly serializes MongoDB ObjectIds to strings

#### d) Session Callback Improvement
- Safely checks if `token.user` exists before spreading
- Includes provider information in session
- Properly handles missing fields with defaults

### 3. Environment Setup
Ensure the following environment variables are set in `.env.local`:
```
GOOGLE_CLIENT_ID=349121129295-44pcbd13jl3qfcf1lqakn5jjckmtri9r.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET=ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7
NEXTAUTH_URL=http://localhost:3000
```

## Testing Steps
1. Clear browser cookies and local storage
2. Navigate to localhost:3000
3. Click "Log In with Google" button
4. Complete Google OAuth flow
5. Check console for logs:
   - First time: `New google user created: [email]`
   - Subsequent: `Existing user logged in: [email]`

## Related Files Modified
- `/models/user.js` - Added optional password and provider fields
- `/utils/authOptions.js` - Enhanced OAuth handling and callbacks
- `.env.local` - Ensure Google OAuth credentials are present

## Important Notes
- This fix works for all OAuth providers (Google, GitHub, Facebook, LinkedIn)
- Existing users with passwords will continue to work with credentials provider
- The `provider` field now tracks how each user created their account
- All callbacks now have improved error logging for easier debugging

## Debugging
If issues persist, check:
1. Console logs in development server terminal
2. Browser console for any CORS or network errors
3. MongoDB connection status
4. Google OAuth app authorized origins and redirect URIs include `http://localhost:3000`
