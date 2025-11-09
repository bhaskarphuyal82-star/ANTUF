# Video Call Feature - Quick Troubleshooting Guide

## ⚡ Quick Fixes

### Issue: "User ID contains invalid characters"
**Fix**: User ID sanitization is now automatic in all files. If you still see this:
1. Check that you're using the latest code
2. Verify all three files have `sanitizeUserId()`:
   - `/components/VideoCall/VideoCallComponent.js`
   - `/app/api/video-call/route.js`
   - `/app/api/video-call/token/route.js`

### Issue: Build fails with module import error
**Fix**: 
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: "GetStream API credentials not configured"
**Fix**: Add to `.env.local`:
```bash
NEXT_PUBLIC_STREAM_API_KEY=your_key
STREAM_API_SECRET=your_secret
```

### Issue: Video call button doesn't appear
**Fix**: Ensure dynamic import path is correct:
- AdminChat: `../../VideoCall/VideoCallComponent`
- UserChat: `../../VideoCall/VideoCallComponent`

## 🔍 Common Error Messages

| Error | Location | Solution |
|-------|----------|----------|
| "Cannot find module" | Build time | Check import paths |
| "Invalid user ID" | Runtime | User ID sanitization applied |
| "Unauthorized" | API call | Session expired, re-login |
| "Failed to initialize call" | Video component | Check API credentials |

## ✅ Verification Checklist

After implementation, verify:
- [ ] Build completes without errors
- [ ] Video call button appears in both admin and user chat
- [ ] Clicking button opens video call modal
- [ ] Audio/video controls work
- [ ] Call disconnects properly
- [ ] No console errors related to GetStream

## 🎯 Files Changed Summary

| File | Changes | Status |
|------|---------|--------|
| `VideoCallComponent.js` | Added sanitizeUserId() | ✅ Complete |
| `route.js` (video-call) | Added sanitizeUserId() | ✅ Complete |
| `route.js` (token) | Added sanitizeUserId() | ✅ Complete |
| `AdminChat.js` | Fixed import path | ✅ Complete |
| `UserChat.js` | Verified import path | ✅ Complete |

## 🚀 Testing Commands

```bash
# Build and check for errors
npm run build

# Run development server
npm run dev

# Check for linting issues
npm run lint
```

## 📞 Support

If issues persist after following this guide:
1. Check the full documentation: `VIDEO_CALL_IMPLEMENTATION.md`
2. Review browser console for detailed error messages
3. Check GetStream dashboard for API usage/errors
4. Verify all environment variables are set correctly

---
**Quick Reference**: This is a condensed troubleshooting guide. For complete implementation details, see `VIDEO_CALL_IMPLEMENTATION.md`.
