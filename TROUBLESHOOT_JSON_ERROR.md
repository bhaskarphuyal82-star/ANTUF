# Troubleshooting JSON Parsing Error

## Error Description
```
Unexpected token '<', '<!DOCTYPE '... is not valid JSON
```

This error occurs when the frontend tries to parse a response as JSON, but receives HTML instead.

## Common Causes & Solutions

### 1. **API Route Returning 404 (Next.js 404 Page)**
**Symptom**: Error happens after deployments or route changes  
**Solution**: 
- Verify the API route exists: `/app/api/[path]/route.js`
- Check for typos in route paths
- Ensure correct HTTP method (GET, POST, PUT, DELETE)

### 2. **Authentication Redirect**
**Symptom**: Error when user is not logged in  
**Solution**:
- Add session checks before calling protected APIs
- Wrap API calls with try-catch blocks
- Check for 401/403 status codes

```javascript
const response = await fetch("/api/protected", { method: "GET" });
if (!response.ok) {
  console.error("HTTP Error:", response.status, response.statusText);
  throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json();
```

### 3. **Middleware Redirecting Requests**
**File**: `/middleware.js`  
**Issue**: Middleware might redirect API calls to login page  
**Solution**:
- Exclude API routes from middleware redirects
- Check middleware logic for unintended redirects

### 4. **Server Error Returning HTML Error Page**
**Symptom**: 500 error with HTML error page  
**Solution**:
- Add proper error handling in API routes
- Always return `NextResponse.json()` for APIs
- Never use `res.send()` or `res.html()` in `/app/api/` routes

### 5. **Environment Variable Issues**
**Symptom**: Requests going to wrong URL  
**Solution**:
- Check `.env.local` for `NEXT_PUBLIC_API` variable
- Ensure API URLs are correct
- Look for mixed usage of `process.env.API` vs `process.env.NEXT_PUBLIC_API`

## Diagnosis Steps

### Step 1: Check Browser Network Tab
1. Open DevTools → Network tab
2. Look for the failing API request
3. Check the Response tab to see if HTML or JSON is returned
4. Note the status code (404, 401, 500, etc.)

### Step 2: Add Console Logging
```javascript
const response = await fetch("/api/user/profile");
console.log("Status:", response.status);
console.log("Content-Type:", response.headers.get("content-type"));
const text = await response.text();
console.log("Response:", text.substring(0, 200)); // First 200 chars
```

### Step 3: Check API Route Exists
```bash
# List all API routes
find app/api -name "route.js" -type f | sort
```

### Step 4: Run Build and Check for Errors
```bash
npm run build
```

## Common API Calls & Their Routes

| Component | Endpoint | Route File |
|-----------|----------|-----------|
| User Profile | `/api/user/profile` | `/app/api/user/profile/route.js` |
| User Card Orders | `/api/user/cardorder` | `/app/api/user/cardorder/route.js` |
| User Cart Receipts | `/api/user/cartreceipt` | `/app/api/user/cartreceipt/route.js` |
| Admin Card Bulk Order | `/api/admin/cardbulkorder` | `/app/api/admin/cardbulkorder/route.js` |
| Admin Card Queue | `/api/admin/cardqueue` | `/app/api/admin/cardqueue/route.js` |
| User Orders | `/api/user/orders` | `/app/api/user/orders/route.js` |
| User Billing | `/api/user/billing/[id]` | `/app/api/user/billing/[id]/route.js` |

## Verify All API Routes

Run this to check all routes return JSON:

```bash
# Start dev server
npm run dev

# In another terminal, test key endpoints
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Check response format
curl -v http://localhost:3000/api/user/profile | head -1
# Should show: Content-Type: application/json
```

## Fix Template

If you find an API route returning HTML, apply this fix:

**BEFORE (WRONG)**:
```javascript
export async function GET(req) {
  try {
    // ... logic ...
    res.send({ data: "..." }); // WRONG - Express style
  } catch (error) {
    res.status(500).send(error.message); // WRONG
  }
}
```

**AFTER (CORRECT)**:
```javascript
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // ... logic ...
    return NextResponse.json({ data: "..." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

## Common API Response Patterns

### Success Response
```javascript
return NextResponse.json(
  { msg: "Success", data: {...} },
  { status: 200 }
);
```

### Error Response
```javascript
return NextResponse.json(
  { error: "Error message" },
  { status: 400 | 401 | 403 | 404 | 500 }
);
```

### Paginated Response
```javascript
return NextResponse.json({
  items: [...],
  pagination: {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit)
  }
});
```

## Files Verified as Correct

✅ `/app/api/user/profile/route.js` - Returns JSON
✅ `/app/api/user/cardorder/route.js` - Returns JSON
✅ `/app/api/user/cartreceipt/route.js` - Returns JSON
✅ `/app/api/admin/cardbulkorder/route.js` - Returns JSON
✅ `/app/api/user/billing/[id]/route.js` - Returns JSON

## Next Steps

1. **Identify the exact API call**: Check browser DevTools Network tab
2. **Verify the route exists**: Confirm the file path
3. **Check the response**: Is it HTML or JSON?
4. **Check the status code**: 404, 401, 500, or 200?
5. **Add debugging**: Console.log the response before parsing
6. **Fix or report**: Apply the fix template or create an issue

## Files to Check for Future Issues

- All files in `/app/api/` directory
- Middleware logic in `/middleware.js`
- Environment variables in `.env.local`
- Authentication in `/utils/authOptions.js`
