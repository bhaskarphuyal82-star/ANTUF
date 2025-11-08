# User Profile API - Quick Reference

## Base URLs
```
User Profile: /api/user/profile
Admin Users: /api/admin/users/profile
Admin User By ID: /api/admin/users/[userId]/profile
```

## Endpoints Summary

### User Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/user/profile` | Get own/admin get any profile | ✓ |
| POST | `/api/user/profile` | Update own/admin update any | ✓ |

### Admin Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/admin/users/profile` | List all users | ✓ Admin |
| POST | `/api/admin/users/profile` | Update user | ✓ Admin |
| DELETE | `/api/admin/users/profile` | Delete user | ✓ Admin |
| GET | `/api/admin/users/[userId]/profile` | Get user details | ✓ Admin |
| PATCH | `/api/admin/users/[userId]/profile` | Update user | ✓ Admin |
| DELETE | `/api/admin/users/[userId]/profile` | Delete user | ✓ Admin |

---

## Quick Examples

### Get User Profile
```javascript
const response = await fetch('/api/user/profile');
const user = await response.json();
```

### Update Profile
```javascript
await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '9841234567', bio: 'New bio' })
});
```

### List Users (Admin)
```javascript
const response = await fetch('/api/admin/users/profile?page=1&limit=20');
const { data, pagination } = await response.json();
```

### Search Users (Admin)
```javascript
const response = await fetch('/api/admin/users/profile?search=john&role=user');
const users = await response.json();
```

### Update User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ isActive: false, role: 'admin' })
});
```

### Delete User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', {
  method: 'DELETE'
});
```

---

## Query Parameters

### GET /api/admin/users/profile
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search name/email
- `role`: Filter by role ('user' or 'admin')
- `isActive`: Filter by status ('true' or 'false')

**Example:**
```
/api/admin/users/profile?page=1&limit=10&search=john&role=user&isActive=true
```

---

## Request Body Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | String | No | 3-20 characters |
| email | String | No | Must be unique |
| phone | String | No | - |
| address | String | No | - |
| city | String | No | - |
| state | String | No | - |
| country | String | No | - |
| zipCode | String | No | - |
| bio | String | No | Max 500 chars |
| image | String | No | Image URL |
| password | String | No | Will be hashed |
| motherName | String | No | - |
| fatherName | String | No | - |
| citizenshipNumber | String | No | - |
| district | String | No | - |
| citizenshipFront | String | No | Image URL |
| citizenshipBack | String | No | Image URL |
| isActive | Boolean | No | Admin only |
| role | String | No | Admin only ('user' or 'admin') |
| userId | String | No | Admin only - target user |

---

## Response Examples

### Success (200, 201)
```javascript
{
  "success": true,
  "msg": "Operation successful",
  "data": { /* user object or array */ },
  "pagination": { /* if applicable */ }
}
```

### Error (400, 401, 403, 404, 500)
```javascript
{
  "err": "Error message"
}
```

---

## Status Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 200 | Success | - |
| 201 | Created | - |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | Not authorized/admin |
| 404 | Not Found | User doesn't exist |
| 500 | Server Error | Server error |

---

## Component Usage

```javascript
import UserManagement from '@/components/admin/user/UserManagement';

export default function AdminUsersPage() {
  return <UserManagement />;
}
```

Navigate to `/dashboard/admin/alluser` to access the full user management interface.

---

## Debugging Tips

1. **Check Console**: Browser console shows fetch errors
2. **Check Network Tab**: See request/response details
3. **Check Server Logs**: Backend errors logged to server console
4. **Verify Authentication**: Ensure user is logged in
5. **Verify Admin Role**: Admin endpoints require admin privileges
6. **Check User ID Format**: Use valid MongoDB ObjectId

---

## Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | User not logged in - login first |
| 403 Forbidden | Not admin - only admins can use admin endpoints |
| 404 Not Found | User ID doesn't exist - verify ID |
| Email already exists | Email must be unique - try different email |
| Validation errors | Check field requirements and formats |

---

## Links

- Full Documentation: `USER_PROFILE_API_GUIDE.md`
- API Docs: `API_DOCUMENTATION.md`
- Component: `/components/admin/user/UserManagement.js`
- Page: `/app/dashboard/admin/alluser/page.js`
- Models: `/models/user.js`
- Routes: `/app/api/user/profile/route.js`, `/app/api/admin/users/profile/route.js`
