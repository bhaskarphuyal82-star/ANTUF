# 🔧 BUILD ERROR FIX: Module Not Found

## Error Message
```
Module not found: Can't resolve '@/components/admin/CardPrint/AdminCardPrintViewer'
```

## Root Cause
This is a **build cache issue**, not an actual missing file. The file exists at:
```
/components/admin/CardPrint/AdminCardPrintViewer.js
```

But the Next.js build cache thinks it doesn't exist.

## Solution

### Option 1: Clear Build Cache (Recommended)

**For Development**:
```bash
# Navigate to project directory
cd /Users/aasish/Project/antuf

# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

**For Production Build**:
```bash
# Navigate to project directory
cd /Users/aasish/Project/antuf

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build

# Start
npm start
```

### Option 2: Hard Reset (If Option 1 Doesn't Work)

```bash
# Navigate to project directory
cd /Users/aasish/Project/antuf

# Clear all cache and node_modules
rm -rf .next node_modules package-lock.json

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

### Option 3: Manual Cache Clear in VS Code

1. Close the dev server (Ctrl+C)
2. Delete the `.next` folder in project root
3. Restart the dev server
4. Hard refresh browser (Ctrl+F5)

---

## Why This Happens

Next.js caches module resolution during build time. When files are added or modified:
- The cache doesn't automatically update
- Module import statements fail even though files exist
- Clearing `.next` forces a full rebuild

---

## Verification

After clearing cache, you should see:

✅ File found at `/components/admin/CardPrint/AdminCardPrintViewer.js`  
✅ No "Module not found" error  
✅ Card preview opens without errors  
✅ Image edit feature works  

---

## File Location Verification

The file exists here:
```
/Users/aasish/Project/antuf/
└── components/
    └── admin/
        └── CardPrint/
            └── AdminCardPrintViewer.js ✅
```

And is imported correctly in:
```
/Users/aasish/Project/antuf/
└── app/
    └── dashboard/
        └── admin/
            └── orders/
                └── page.js (line 41)
```

---

## Quick Steps

1. **Stop dev server** (if running)
   ```
   Ctrl+C
   ```

2. **Clear cache**
   ```bash
   rm -rf .next
   ```

3. **Restart dev server**
   ```bash
   npm run dev
   ```

4. **Hard refresh browser**
   ```
   Ctrl+F5
   ```

---

## If Still Not Working

1. Check file path is correct:
   ```bash
   ls -la /Users/aasish/Project/antuf/components/admin/CardPrint/AdminCardPrintViewer.js
   ```

2. Verify file export:
   ```bash
   tail -n 5 /Users/aasish/Project/antuf/components/admin/CardPrint/AdminCardPrintViewer.js
   ```
   Should show: `export default AdminCardPrintViewer;`

3. Check import path:
   - Verify: `import AdminCardPrintViewer from "@/components/admin/CardPrint/AdminCardPrintViewer";`
   - Path must match file location exactly (case-sensitive)

---

## Prevention

To avoid this in the future:
- Always clear `.next` after adding new components
- Use `npm run dev` instead of just restarting
- Full rebuild occasionally: `npm run build`

---

**Status**: This is a build cache issue, not a code problem.  
**Solution**: Clear `.next` folder and restart dev server.  
**Time to Fix**: < 2 minutes  
**Confidence**: 99%
