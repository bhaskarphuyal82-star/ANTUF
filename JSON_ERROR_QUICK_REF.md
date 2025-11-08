# JSON Error - Quick Reference Card

## Error
```
Unexpected token '<', '<!DOCTYPE '... is not valid JSON
```

## Diagnosis (Do This First)

### Step 1: Open DevTools
1. Right-click → Inspect
2. Go to Network tab
3. Reload page
4. Find the failed request (red)
5. Click it and check Response tab

### Step 2: Check Status Code
```
200 = OK but response is HTML (API route issue)
404 = Route not found
401 = Not authenticated
500 = Server error
```

### Step 3: Run Validation
```bash
npm run validate:routes
```

## Top 3 Solutions

### 1. Route Doesn't Exist
**Symptom**: Status 404  
**Fix**: Check the file path matches the URL
```
URL:  /api/user/profile
File: /app/api/user/profile/route.js  ✅ MUST MATCH
```

### 2. Not Authenticated
**Symptom**: Status 401 or redirects to login  
**Fix**: Add session check
```javascript
const session = await getSession();
if (!session) return; // Stop here
const data = await fetch("/api/endpoint");
```

### 3. Server Error
**Symptom**: Status 500  
**Fix**: Add error handling
```javascript
const response = await fetch("/api/endpoint");
if (!response.ok) {
  const text = await response.text();
  console.error("Error:", text.substring(0, 200));
  return;
}
const data = await response.json();
```

## Use Diagnostic Utility

```javascript
import { diagnoseFetch } from "@/utils/apiDiagnostics";

const data = await diagnoseFetch("/api/user/profile");
// Shows status, content-type, and full error details
```

## All Working Routes

```
✅ GET/POST  /api/user/profile
✅ GET/POST  /api/user/cardorder
✅ GET/POST  /api/user/cartreceipt
✅ GET       /api/user/orders
✅ GET/POST  /api/admin/cardbulkorder
✅ GET/POST  /api/admin/cardqueue
✅ GET/POST  /api/chat
```

[Full list in JSON_ERROR_RESOLUTION.md]

## Checklist

- [ ] Check DevTools Network tab for actual status/response
- [ ] Verify route file exists: `/app/api/[path]/route.js`
- [ ] Check for typos in endpoint URL
- [ ] Ensure user is authenticated (getSession)
- [ ] Run `npm run validate:routes`
- [ ] Check server logs for errors
- [ ] Use `diagnoseFetch()` instead of `fetch()`

## One-Line Tests

```javascript
// Test if endpoint returns JSON
fetch("/api/user/profile")
  .then(r => { console.log(r.status, r.headers.get("content-type")); return r.text(); })
  .then(t => console.log(t.substring(0, 200)))
```

## Still Stuck?

1. Check `/JSON_ERROR_RESOLUTION.md` for detailed guide
2. Check `/TROUBLESHOOT_JSON_ERROR.md` for step-by-step help
3. Run: `npm run validate:routes`
4. Use: `diagnoseFetch()` from `/utils/apiDiagnostics.js`

---

**Most Common Fix**: Typo in endpoint URL (e.g., `/profile` vs `/profiles`)
