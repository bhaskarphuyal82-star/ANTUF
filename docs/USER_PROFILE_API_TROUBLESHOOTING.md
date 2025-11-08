# User Profile API - Troubleshooting Guide

## Common Issues & Solutions

### 1. 401 Unauthorized - "Not authenticated"

**Error Message:**
```javascript
{
  "err": "Not authenticated"
}
```

**Causes:**
- User is not logged in
- Session has expired
- Cookies not being sent

**Solutions:**
```javascript
// 1. Check if user is logged in
const response = await fetch('/api/auth/session');
const session = await response.json();
console.log(session); // Should show user data

// 2. Ensure credentials are included in fetch
const response = await fetch('/api/user/profile', {
  method: 'GET',
  credentials: 'include' // Important for sending cookies
});

// 3. Login first before making API calls
// Navigate to login page and authenticate

// 4. Check browser cookies
// Open DevTools → Application → Cookies
// Look for "next-auth.session-token"
```

---

### 2. 403 Forbidden - "Access denied. Admin only."

**Error Message:**
```javascript
{
  "err": "Access denied. Admin only."
}
```

**Causes:**
- User doesn't have admin role
- Trying to access admin-only endpoint as regular user
- Admin flag not set in database

**Solutions:**
```javascript
// 1. Check current user's role
const response = await fetch('/api/user/profile');
const user = await response.json();
console.log('User role:', user.role); // Should be 'admin'

// 2. Use correct endpoint
// ✓ Correct for regular users:
fetch('/api/user/profile')

// ✗ Wrong - requires admin:
fetch('/api/admin/users/profile')

// 3. For developers: Update user role in database
// In MongoDB shell:
// db.users.updateOne({ email: 'user@example.com' }, { $set: { role: 'admin' } })
```

---

### 3. 404 Not Found - "User not found"

**Error Message:**
```javascript
{
  "err": "User not found"
}
```

**Causes:**
- User ID doesn't exist
- Invalid user ID format
- User was deleted
- Typo in user ID

**Solutions:**
```javascript
// 1. Verify user ID exists
const userId = 'USER_ID'; // Must be valid MongoDB ObjectId
console.log('User ID:', userId);

// 2. Check if user exists
const response = await fetch('/api/admin/users/profile?userId=' + userId);
if (response.status === 404) {
  console.log('User does not exist');
}

// 3. List all users to find correct ID
const response = await fetch('/api/admin/users/profile');
const { data } = await response.json();
console.log('All users:', data);

// 4. Use search to find user
const response = await fetch('/api/admin/users/profile?search=john');
const { data } = await response.json();
```

---

### 4. 400 Bad Request - "User ID is required"

**Error Message:**
```javascript
{
  "err": "User ID is required"
}
```

**Causes:**
- Missing required parameter
- userId not provided in request body or query

**Solutions:**
```javascript
// 1. For POST requests - include userId in body
fetch('/api/admin/users/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'VALID_USER_ID', // Required!
    name: 'Updated Name'
  })
});

// 2. For DELETE requests - include userId in query
fetch('/api/admin/users/profile?userId=VALID_USER_ID', {
  method: 'DELETE'
});

// 3. For GET requests with specific user
fetch('/api/admin/users/VALID_USER_ID/profile', {
  method: 'GET'
});
```

---

### 5. Email Already Exists

**Error Message:**
```javascript
{
  "err": "Email already exists"
}
```

**Causes:**
- Trying to update user with email already used by another user
- Unique email constraint violation

**Solutions:**
```javascript
// 1. Check if email is unique
const response = await fetch('/api/admin/users/profile?search=email@example.com');
const { data } = await response.json();
if (data.length > 0) {
  console.log('Email already in use');
}

// 2. Use different email
fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'newemail@example.com' // Must be unique
  })
});

// 3. Update without changing email
fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Name',
    phone: '9841234567'
    // Don't include email to keep existing
  })
});
```

---

### 6. Validation Error - "minLength exceeded"

**Error Message:**
```javascript
{
  "err": "name must be at least 3 characters"
}
```

**Causes:**
- Name too short (min 3 characters)
- Name too long (max 20 characters)
- Bio too long (max 500 characters)

**Solutions:**
```javascript
// 1. Validate name length
const name = 'Jo'; // ✗ Too short
if (name.length < 3 || name.length > 20) {
  console.log('Name must be 3-20 characters');
}

// 2. Validate bio length
const bio = 'This is a very long bio...'; // Check length
if (bio.length > 500) {
  console.log('Bio must be 500 characters or less');
}

// 3. Send valid data
fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe', // ✓ 8 characters (between 3-20)
    bio: 'Software developer' // ✓ Valid length
  })
});
```

---

### 7. Network Error - "Failed to fetch"

**Error Message:**
```javascript
Error: Failed to fetch
TypeError: fetch failed
```

**Causes:**
- Network connection issue
- CORS error
- Server not running
- Invalid URL

**Solutions:**
```javascript
// 1. Check network connection
navigator.onLine ? console.log('Online') : console.log('Offline');

// 2. Check server is running
fetch('/api/health').then(r => console.log('Server OK'));

// 3. Check URL is correct
const url = '/api/user/profile'; // ✓ Correct path
const url = 'http://localhost:3000/api/user/profile'; // ✓ Full URL

// 4. Handle network errors
try {
  const response = await fetch('/api/user/profile');
  const data = await response.json();
} catch (error) {
  console.error('Network error:', error.message);
  // Retry logic
  setTimeout(() => {
    // Retry after delay
  }, 2000);
}
```

---

### 8. CORS Error

**Error Message:**
```
Access to XMLHttpRequest at 'http://...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Causes:**
- Making request to different domain
- Missing CORS headers
- Cross-origin issue

**Solutions:**
```javascript
// 1. Use relative URLs (same origin)
fetch('/api/user/profile'); // ✓ Correct

// 2. If cross-origin needed, ensure credentials
fetch('https://api.example.com/user', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

// 3. Check Next.js config for CORS
// In next.config.js, configure headers if needed
```

---

### 9. 500 Internal Server Error

**Error Message:**
```javascript
{
  "err": "Some error message"
}
```

**Causes:**
- Database connection issue
- Server-side error in API
- Unhandled exception
- Invalid data causing database error

**Solutions:**
```javascript
// 1. Check server logs
// Look at terminal/console where Next.js is running
// Search for error stack trace

// 2. Check database connection
// Verify MongoDB is running
// Check connection string in .env

// 3. Send valid data
const body = JSON.stringify({
  name: 'John Doe',
  email: 'john@example.com',
  // All required fields
});

// 4. Log full error response
try {
  const response = await fetch('/api/user/profile');
  if (!response.ok) {
    const error = await response.json();
    console.error('Full error:', error);
  }
} catch (error) {
  console.error('Request failed:', error);
}
```

---

### 10. Image Not Displaying

**Problem:**
- User image shows broken/placeholder
- Image URL in response is null or invalid

**Solutions:**
```javascript
// 1. Check if image URL is valid
const user = await response.json();
console.log('Image URL:', user.image);
if (!user.image) {
  console.log('Using fallback/placeholder');
}

// 2. Upload image first before updating profile
// Use /api/upload or similar endpoint to get image URL
const formData = new FormData();
formData.append('file', file);
const uploadResponse = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
const { imageUrl } = await uploadResponse.json();

// 3. Update profile with image URL
fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    image: imageUrl // Now valid image URL
  })
});

// 4. Use fallback in UI if image fails
<img 
  src={user.image} 
  onError={(e) => e.target.src = '/placeholder.jpg'}
/>
```

---

## Testing with cURL

```bash
# Test GET user profile
curl -X GET http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json"

# Test POST update profile
curl -X POST http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{"phone":"9841234567","bio":"Updated bio"}'

# Test admin list users
curl -X GET "http://localhost:3000/api/admin/users/profile?page=1&limit=20" \
  -H "Content-Type: application/json"

# Test admin delete user
curl -X DELETE "http://localhost:3000/api/admin/users/profile?userId=USER_ID" \
  -H "Content-Type: application/json"
```

---

## Testing with Postman

1. Create new request
2. Set method (GET, POST, PATCH, DELETE)
3. Enter URL: `http://localhost:3000/api/user/profile`
4. Add headers:
   - `Content-Type: application/json`
5. Add body (for POST/PATCH):
   ```json
   {
     "phone": "9841234567",
     "bio": "Updated bio"
   }
   ```
6. Click Send
7. Check Response tab for results

---

## Debug Checklist

- [ ] User is logged in
- [ ] Correct endpoint URL
- [ ] Correct HTTP method (GET, POST, PATCH, DELETE)
- [ ] Required parameters provided
- [ ] Request body is valid JSON
- [ ] Admin role when needed
- [ ] Valid user ID format
- [ ] Network connection working
- [ ] Server is running
- [ ] Database is connected
- [ ] Check browser DevTools Console for errors
- [ ] Check server logs for errors

---

## Get Help

1. Check error message carefully
2. Review this guide for matching error
3. Check server console logs
4. Verify data format and types
5. Test with cURL or Postman
6. Check component at `/components/admin/user/UserManagement.js` for reference implementation

---

## Links

- Quick Reference: `USER_PROFILE_API_QUICK_REF.md`
- Full Guide: `USER_PROFILE_API_GUIDE.md`
- Component: `/components/admin/user/UserManagement.js`
- API Routes: `/app/api/user/profile/route.js`
- Admin Routes: `/app/api/admin/users/profile/route.js`
