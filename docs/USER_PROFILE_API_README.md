# User Profile API - Documentation Index

## 📚 Documentation Overview

This is a complete User Profile API implementation for the ANTUF application. All documentation is organized by use case and experience level.

---

## 🚀 Getting Started

### For First-Time Users
Start here if you're new to the API:

1. **[USER_PROFILE_API_SETUP_SUMMARY.md](USER_PROFILE_API_SETUP_SUMMARY.md)** ⭐ START HERE
   - What was created
   - Quick start guide
   - File structure
   - Quick API examples
   - Common use cases

2. **[USER_PROFILE_API_QUICK_REF.md](USER_PROFILE_API_QUICK_REF.md)** ⚡ QUICK LOOKUP
   - Endpoints summary table
   - Quick examples
   - Query parameters
   - Status codes
   - Common issues

---

## 📖 Complete Guides

### For Complete API Reference
Read these for detailed information:

1. **[USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md)** 📚 FULL REFERENCE
   - All endpoints explained in detail
   - Request/response examples
   - Query parameters
   - Error responses
   - User model schema
   - Best practices
   - Common use cases

2. **[USER_PROFILE_API_INTEGRATION.md](USER_PROFILE_API_INTEGRATION.md)** 🔧 INTEGRATION
   - Custom hooks for API usage
   - React component examples
   - Avatar component
   - Form components
   - Error handling patterns
   - Caching strategies
   - Testing examples

---

## 🛠️ Troubleshooting & Support

### For Issues and Errors
When things don't work as expected:

**[USER_PROFILE_API_TROUBLESHOOTING.md](USER_PROFILE_API_TROUBLESHOOTING.md)** ❓ HELP
- 401 Unauthorized - not authenticated
- 403 Forbidden - not authorized
- 404 Not Found - user doesn't exist
- 400 Bad Request - invalid parameters
- Email already exists - duplicate email
- Validation errors - field requirements
- Network errors - connection issues
- CORS errors - cross-origin issues
- 500 Server errors - server problems
- Image not displaying - fallback issues
- Testing with cURL and Postman
- Debug checklist

---

## 🎯 Quick Navigation by Use Case

### I want to...

#### View User Profile
→ See [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md#1-get-user-profile)
```javascript
fetch('/api/user/profile')
```

#### Update User Profile
→ See [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md#2-post-apiuserprofile)
```javascript
fetch('/api/user/profile', { method: 'POST', body: JSON.stringify({...}) })
```

#### List All Users (Admin)
→ See [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md#3-get-apiadminusersprofile)
```javascript
fetch('/api/admin/users/profile?page=1&limit=20')
```

#### Search Users (Admin)
→ See [USER_PROFILE_API_QUICK_REF.md](USER_PROFILE_API_QUICK_REF.md#common-examples)
```javascript
fetch('/api/admin/users/profile?search=john&role=user')
```

#### Update Specific User (Admin)
→ See [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md#7-patch-apiadminusersuseridprofile)
```javascript
fetch('/api/admin/users/USER_ID/profile', { method: 'PATCH', body: JSON.stringify({...}) })
```

#### Delete User (Admin)
→ See [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md#8-delete-apiadminusersuseridprofile)
```javascript
fetch('/api/admin/users/USER_ID/profile', { method: 'DELETE' })
```

#### Build User Management UI
→ See [USER_PROFILE_API_INTEGRATION.md](USER_PROFILE_API_INTEGRATION.md)
- Use existing component at `/components/admin/user/UserManagement.js`
- Or build custom using provided hooks and examples

#### Integrate into React Component
→ See [USER_PROFILE_API_INTEGRATION.md](USER_PROFILE_API_INTEGRATION.md#1-user-profile-hook)
- Custom hooks for API calls
- Form component examples
- Avatar component

#### Fix "401 Unauthorized" Error
→ See [USER_PROFILE_API_TROUBLESHOOTING.md](USER_PROFILE_API_TROUBLESHOOTING.md#1-401-unauthorized---not-authenticated)

#### Fix "403 Forbidden" Error
→ See [USER_PROFILE_API_TROUBLESHOOTING.md](USER_PROFILE_API_TROUBLESHOOTING.md#2-403-forbidden---access-denied-admin-only)

---

## 📁 File Locations

### API Routes
```
/app/api/user/profile/route.js                    User endpoints
/app/api/admin/users/profile/route.js            Admin endpoints
/app/api/admin/users/[userId]/profile/route.js   Admin by ID endpoint
```

### Components
```
/components/admin/user/UserManagement.js         Full user management UI
/app/dashboard/admin/alluser/page.js            Admin users page
```

### Models
```
/models/user.js                                  User schema
```

### Documentation
```
USER_PROFILE_API_SETUP_SUMMARY.md       ⭐ START HERE
USER_PROFILE_API_QUICK_REF.md           ⚡ Quick lookup
USER_PROFILE_API_GUIDE.md               📚 Full reference
USER_PROFILE_API_INTEGRATION.md         🔧 Integration examples
USER_PROFILE_API_TROUBLESHOOTING.md     ❓ Help & issues
USER_PROFILE_API_README.md              📄 This file
```

---

## 🔑 Key Features

### For Users
- ✅ View own profile
- ✅ Update profile information
- ✅ Change password
- ✅ Upload profile image
- ✅ Manage addresses

### For Admins
- ✅ List all users with pagination
- ✅ Search users by name/email
- ✅ Filter by role and status
- ✅ View user details
- ✅ Edit user profiles
- ✅ Activate/deactivate users
- ✅ Change user roles
- ✅ Delete users

### Technical Features
- ✅ 8 API endpoints
- ✅ Pagination and filtering
- ✅ Advanced search
- ✅ Proper authentication
- ✅ Role-based access control
- ✅ Input validation
- ✅ Error handling
- ✅ Secure password hashing
- ✅ Transaction logging

---

## 🎨 UI Components

### User Management Component
- **Location:** `/components/admin/user/UserManagement.js`
- **Features:**
  - User table with avatars
  - Search and filter
  - Pagination
  - Edit dialog
  - Delete functionality
  - Responsive design

### Admin Page
- **Location:** `/app/dashboard/admin/alluser/page.js`
- **URL:** `/dashboard/admin/alluser`
- **Features:**
  - Full-page user management
  - Ready to use

---

## 🚀 Quick Start

### 1. Access Admin User Management
```
URL: http://localhost:3000/dashboard/admin/alluser
```

### 2. Use API Directly
```javascript
// Get profile
const user = await fetch('/api/user/profile').then(r => r.json());

// List users (admin)
const users = await fetch('/api/admin/users/profile').then(r => r.json());
```

### 3. Build Custom Component
```javascript
import UserManagement from '@/components/admin/user/UserManagement';

export default function Page() {
  return <UserManagement />;
}
```

---

## 📋 Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/user/profile` | Get own/any profile | ✓ |
| POST | `/api/user/profile` | Update own/any profile | ✓ |
| GET | `/api/admin/users/profile` | List all users | ✓ Admin |
| POST | `/api/admin/users/profile` | Update user | ✓ Admin |
| DELETE | `/api/admin/users/profile` | Delete user | ✓ Admin |
| GET | `/api/admin/users/[userId]/profile` | Get user details | ✓ Admin |
| PATCH | `/api/admin/users/[userId]/profile` | Update user | ✓ Admin |
| DELETE | `/api/admin/users/[userId]/profile` | Delete user | ✓ Admin |

---

## ⚙️ Configuration

### No Additional Setup Required
- ✅ API routes already configured
- ✅ Database models ready
- ✅ Components ready to use
- ✅ Authentication integrated

### Environment Variables
Make sure these are set in `.env.local`:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=mongodb://...
```

---

## 🧪 Testing

### Test in Browser Console
```javascript
// Get profile
fetch('/api/user/profile').then(r => r.json()).then(console.log)

// Update profile
fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '9841234567' })
}).then(r => r.json()).then(console.log)
```

### Test with cURL
```bash
curl http://localhost:3000/api/user/profile
curl -X POST http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{"phone":"9841234567"}'
```

### Test with Postman
1. Import endpoints
2. Set authentication
3. Send requests
4. Check responses

---

## 📊 Response Format

### Success Response
```javascript
{
  "success": true,
  "data": { /* user or array of users */ },
  "msg": "Operation successful",
  "pagination": { /* if applicable */ }
}
```

### Error Response
```javascript
{
  "err": "Error message",
  "status": 400
}
```

---

## 🔒 Security

- ✅ All endpoints require authentication
- ✅ Admin-only endpoints have role checks
- ✅ Passwords are hashed
- ✅ Users can only edit their own profile (unless admin)
- ✅ Session-based security
- ✅ Email uniqueness enforced

---

## 🆘 Getting Help

1. **Check the right documentation:**
   - Started? → [USER_PROFILE_API_SETUP_SUMMARY.md](USER_PROFILE_API_SETUP_SUMMARY.md)
   - Quick lookup? → [USER_PROFILE_API_QUICK_REF.md](USER_PROFILE_API_QUICK_REF.md)
   - Full details? → [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md)
   - Integration? → [USER_PROFILE_API_INTEGRATION.md](USER_PROFILE_API_INTEGRATION.md)
   - Problem? → [USER_PROFILE_API_TROUBLESHOOTING.md](USER_PROFILE_API_TROUBLESHOOTING.md)

2. **Check the component:**
   - `/components/admin/user/UserManagement.js`

3. **Check the API routes:**
   - `/app/api/user/profile/route.js`
   - `/app/api/admin/users/profile/route.js`

4. **Check server logs** for detailed error messages

---

## 📝 Notes

- All endpoints support both snake_case and camelCase
- Images are validated and placeholder URLs are filtered
- Password changes are automatically hashed
- User avatars show initials if image fails
- Pagination defaults: page=1, limit=20
- Search is case-insensitive
- All timestamps are in ISO format

---

## 🎓 Learning Path

**Beginner (30 min)**
1. Read: [USER_PROFILE_API_SETUP_SUMMARY.md](USER_PROFILE_API_SETUP_SUMMARY.md)
2. Try: Access `/dashboard/admin/alluser`
3. Test: Simple API calls in console

**Intermediate (1-2 hours)**
1. Read: [USER_PROFILE_API_QUICK_REF.md](USER_PROFILE_API_QUICK_REF.md)
2. Read: [USER_PROFILE_API_GUIDE.md](USER_PROFILE_API_GUIDE.md) sections relevant to your use case
3. Test: All endpoints with different parameters

**Advanced (2-3 hours)**
1. Read: [USER_PROFILE_API_INTEGRATION.md](USER_PROFILE_API_INTEGRATION.md)
2. Study: Component at `/components/admin/user/UserManagement.js`
3. Build: Custom components using hooks and API

**Troubleshooting (As needed)**
1. Check: [USER_PROFILE_API_TROUBLESHOOTING.md](USER_PROFILE_API_TROUBLESHOOTING.md)
2. Debug: Using browser console and server logs
3. Test: With cURL or Postman

---

## ✨ Summary

You now have a **complete, production-ready User Profile API** with:
- 8 fully functional endpoints
- Complete admin user management UI
- Comprehensive documentation
- Error handling and validation
- Authentication and authorization
- Pagination and filtering
- Search functionality

**Start using it today!** Visit `/dashboard/admin/alluser` or check the API documentation.

---

**Last Updated:** November 8, 2025  
**Status:** ✅ Complete and Ready to Use  
**Questions?** See the appropriate documentation file above.
