# 🚀 GetStream Video API - Quick Setup Guide

## Step 1: Get Your API Keys (2 minutes)

1. Go to [https://getstream.io/](https://getstream.io/)
2. Click **"Sign Up"** or **"Start Free"**
3. Create your account (free tier available)
4. Create a new app or use the default app
5. Go to **Dashboard** → **Your App** → **Settings**
6. Copy your **API Key** and **Secret**

## Step 2: Configure Environment Variables (1 minute)

Create or edit `.env.local` file in your project root:

```bash
# /Users/aasish/Project/antuf/.env.local

# GetStream Video API Configuration
NEXT_PUBLIC_STREAM_API_KEY=your_api_key_here
STREAM_API_SECRET=your_secret_here
```

**Replace:**
- `your_api_key_here` with your actual GetStream API Key
- `your_secret_here` with your actual GetStream Secret

## Step 3: Restart Development Server (30 seconds)

```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test Video Call (1 minute)

1. Navigate to your admin chat page
2. Select a chat conversation
3. Click the **green video camera icon** in the header
4. Allow browser camera/microphone permissions
5. Video call should connect!

## 🎉 That's it! You're ready to use video calls.

---

## 🔍 Verify Your Setup

### Check Environment Variables
```bash
# In your terminal:
cd /Users/aasish/Project/antuf
cat .env.local | grep STREAM
```

Expected output:
```
NEXT_PUBLIC_STREAM_API_KEY=abc123...
STREAM_API_SECRET=xyz789...
```

### Test in Browser Console
Open browser DevTools (F12) and check:

```javascript
// Should NOT be undefined
console.log(process.env.NEXT_PUBLIC_STREAM_API_KEY);
```

---

## ⚠️ Common Issues

### Issue: "GetStream API credentials not configured"

**Solution:**
```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Check content
cat .env.local

# 3. Verify no spaces in key names
# ❌ Wrong: NEXT_PUBLIC_STREAM_API_KEY =abc123
# ✅ Correct: NEXT_PUBLIC_STREAM_API_KEY=abc123

# 4. Restart dev server
npm run dev
```

### Issue: Video call won't connect

**Checklist:**
- [ ] Browser camera permission granted?
- [ ] Microphone permission granted?
- [ ] Using HTTPS or localhost?
- [ ] API keys are correct?
- [ ] Server restarted after adding keys?

### Issue: "Failed to generate token"

**Fix:**
1. Double-check `STREAM_API_SECRET` in .env.local
2. Make sure there are no quotes around the values
3. Restart the dev server

---

## 📋 .env.local Template

Copy this template:

```bash
# ============================================
# GETSTREAM VIDEO API
# ============================================
# Get your keys from: https://getstream.io/
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_API_SECRET=

# ============================================
# Add your other environment variables below
# ============================================
# DATABASE_URL=
# NEXTAUTH_SECRET=
# etc...
```

---

## 🎯 Quick Commands Reference

```bash
# Check if packages installed
npm list @stream-io/video-react-sdk stream-chat

# Install if missing
npm install @stream-io/video-react-sdk stream-chat

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔐 Security Notes

### DO ✅
- Keep `STREAM_API_SECRET` in `.env.local` (server-side only)
- Add `.env.local` to `.gitignore`
- Use `NEXT_PUBLIC_` prefix for client-safe keys
- Restart server after changing env variables

### DON'T ❌
- Don't commit `.env.local` to git
- Don't expose `STREAM_API_SECRET` in client code
- Don't share your API keys publicly
- Don't use test keys in production

---

## 📞 Need Help?

1. **Check the main guide:** `docs/GETSTREAM_VIDEO_COMPLETE_GUIDE.md`
2. **GetStream Docs:** [https://getstream.io/video/docs/react/](https://getstream.io/video/docs/react/)
3. **Browser Console:** Check for error messages (F12)
4. **Network Tab:** Check if API calls are succeeding

---

## ✨ Features Available

Once setup is complete, you'll have:

- ✅ Real-time video calling
- ✅ HD video/audio quality
- ✅ Camera on/off toggle
- ✅ Microphone mute/unmute
- ✅ Fullscreen mode
- ✅ Call duration timer
- ✅ Professional UI
- ✅ Error handling
- ✅ Secure authentication

**Total setup time: ~5 minutes** ⏱️

---

**Last Updated:** November 9, 2025  
**Status:** Ready to Use ✅
