# Slider Production Debugging Checklist

## Quick Status Check

Run this to verify everything locally:

```bash
# 1. Test API endpoint
curl -s http://localhost:3000/api/sliders | jq '.[0]'

# 2. Check database connection
curl -s http://localhost:3000/api/sliders | jq 'length'

# 3. Test with Node.js directly (from project root)
node -e "
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { dbName: 'antuf' })
  .then(() => {
    console.log('✓ Database connected successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err.message);
    process.exit(1);
  });
"
```

## Production Deployment Checklist

### ✅ Step 1: Verify Source Code
- [x] Home.js has fallback demo slider logic
- [x] sliderSlice.js has error handling
- [x] API endpoint /api/sliders exists
- [x] Database model is properly defined

### ⏳ Step 2: Set Vercel Environment Variables
- [ ] Go to: https://vercel.com/dashboard/antuf/settings/environment-variables
- [ ] Add `DB_URL=mongodb://mongo:dwgsKvMSlfRFpdWFTVCkjhElACYSECDl@shuttle.proxy.rlwy.net:47163`
- [ ] Add `NEXTAUTH_URL=https://antuf.org`
- [ ] Add `NEXTAUTH_SECRET=ff39b85c4ec7d2a97c240ba4e9a1db27630e9f3ce02731e5e4622d6bcf9c74e7`
- [ ] Add other required env vars from .env.local

### ⏳ Step 3: Monitor Deployment
- [ ] Wait for Vercel to redeploy (watch: https://vercel.com/dashboard/antuf/deployments)
- [ ] Deployment should complete in 3-5 minutes
- [ ] Check for build errors in logs

### ✅ Step 4: Verify Production
- [ ] Visit https://antuf.org in incognito/private browser
- [ ] Open DevTools (F12)
- [ ] Check Network tab for `/api/sliders` response
- [ ] Should show real slider data, not error
- [ ] Slider should display with real image/content

### ✅ Step 5: Add Sample Data (if needed)
- [ ] If sliders are empty, go to admin panel
- [ ] Create slider: https://antuf.org/dashboard/admin/slider/create
- [ ] Fill in all fields and save
- [ ] Verify slider appears on homepage

## Expected Behavior

### ✓ Working (Real Data)
```
GET https://antuf.org/api/sliders
Response: [
  {
    "_id": "...",
    "image": "https://...",
    "title": "...",
    "sub_title": "...",
    "button_link": "...",
    ...
  }
]
Status: 200
```

### ✗ Issue (No Env Vars Set)
```
GET https://antuf.org/api/sliders
Response: [
  {
    "_id": "demo-1",
    "image": "https://via.placeholder.com/...",
    "title": "Welcome to ANTUF",
    ...
  }
]
Status: 200 (but demo data shown instead of real)
```

## Common Issues and Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Slider shows demo placeholder | Missing DB_URL env var | Add DB_URL to Vercel |
| API returns 500 error | Database connection failed | Verify MongoDB URI is correct |
| Sliders show but no image | Image URL is invalid | Re-upload slider with valid image URL |
| Changes not showing after env update | Vercel cache | Wait for redeploy (5-10 min) or manually redeploy |
| API works locally but not on production | Localhost URLs in env | Use production URLs (https://antuf.org) |

## Manual Fix Script

If automatic deployment doesn't work:

```bash
# 1. Commit all changes
git status
git add .
git commit -m "Fix: Set production environment variables"

# 2. Force redeploy on Vercel
vercel --prod --force

# 3. Or use GitHub integration (if connected):
git push origin main  # Automatically triggers Vercel redeploy
```

## Verify Fix Worked

After setting environment variables and waiting for deployment:

```javascript
// Test in browser console (F12)
fetch('/api/sliders')
  .then(r => r.json())
  .then(data => {
    console.log('Sliders data:', data);
    console.log('Is demo:', data[0]?._id?.includes('demo'));
    console.log('Count:', data.length);
  });
```

**Expected output:**
```
Sliders data: [...real data...]
Is demo: false
Count: 1+ (depends on database)
```

## Key Files to Monitor

For any issues, check these files in Vercel logs:

1. `/app/api/sliders/route.js` - API handler
2. `/utils/dbConnect.js` - Database connection
3. `/slice/sliderSlice.js` - Redux fetch logic
4. `/components/home/Home.js` - Frontend rendering

## Contact Support

If issues persist:

1. Check Vercel logs: https://vercel.com/dashboard/antuf/deployments
2. Check MongoDB Atlas (if using Atlas)
3. Verify firewall rules allow connection
4. Test MongoDB connection string locally first
