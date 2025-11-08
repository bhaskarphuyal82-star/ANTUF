# User Profile API - Complete Setup Summary

## What Was Created

### 1. **API Routes** (Endpoints)

#### User Endpoints
- **`GET /api/user/profile`** - Get user's own profile or admin get any profile
- **`POST /api/user/profile`** - Update user's own profile or admin update any profile

#### Admin Endpoints  
- **`GET /api/admin/users/profile`** - List all users with filters, search, pagination
- **`POST /api/admin/users/profile`** - Update user profile (admin bulk)
- **`DELETE /api/admin/users/profile`** - Delete user (admin)
- **`GET /api/admin/users/[userId]/profile`** - Get specific user details (admin)
- **`PATCH /api/admin/users/[userId]/profile`** - Update specific user (admin)
- **`DELETE /api/admin/users/[userId]/profile`** - Delete specific user (admin)

### 2. **React Components**

#### UserManagement Component
- **Location:** `/components/admin/user/UserManagement.js`
- **Features:**
  - Complete user management table with avatars
  - Search by name/email
  - Filter by role and status
  - Pagination support
  - Edit user dialog
  - Delete user functionality
  - Responsive design with Material-UI

#### Admin Users Page
- **Location:** `/app/dashboard/admin/alluser/page.js`
- **Features:**
  - Wrapper page for UserManagement component
  - Responsive container layout
  - Access via `/dashboard/admin/alluser`

### 3. **Documentation Files**

| File | Purpose |
|------|---------|
| `USER_PROFILE_API_GUIDE.md` | Complete API reference with all endpoints, parameters, examples |
| `USER_PROFILE_API_QUICK_REF.md` | Quick reference table and common examples |
| `USER_PROFILE_API_TROUBLESHOOTING.md` | Common issues, errors, and solutions |
| `USER_PROFILE_API_INTEGRATION.md` | Integration guide with code examples and best practices |

---

## Quick Start

### Access User Management UI
1. Navigate to: `http://localhost:3000/dashboard/admin/alluser`
2. Features available:
   - View all users
   - Search users
   - Filter by role and status
   - Edit user details
   - Delete users
   - Pagination

### API Usage

#### Get User Profile
```javascript
const response = await fetch('/api/user/profile');
const user = await response.json();
```

#### Update Profile
```javascript
await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '9841234567',
    bio: 'Updated bio'
  })
});
```

#### List Users (Admin)
```javascript
const response = await fetch('/api/admin/users/profile?page=1&limit=20');
const { data, pagination } = await response.json();
```

#### Search Users (Admin)
```javascript
const response = await fetch('/api/admin/users/profile?search=john&role=user');
const users = await response.json();
```

#### Update User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ isActive: false, role: 'admin' })
});
```

#### Delete User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', {
  method: 'DELETE'
});
```

---

## File Structure

```
/app/api/
├── user/
│   └── profile/
│       └── route.js ................... User profile endpoints
└── admin/
    └── users/
        ├── profile/
        │   └── route.js ............... Admin user list/update/delete
        └── [userId]/
            └── profile/
                └── route.js ........... Admin user by ID

/components/admin/user/
└── UserManagement.js ................. Full user management UI

/app/dashboard/admin/
└── alluser/
    └── page.js ....................... Admin users page

/models/
└── user.js ........................... User schema

Documentation/
├── USER_PROFILE_API_GUIDE.md ......... Complete guide
├── USER_PROFILE_API_QUICK_REF.md .... Quick reference
├── USER_PROFILE_API_INTEGRATION.md .. Integration guide
└── USER_PROFILE_API_TROUBLESHOOTING.md Troubleshooting
```

---

## Authentication & Authorization

### Required for All Endpoints
- NextAuth session (automatic from cookies)

### Access Control
- **User endpoints**: 
  - Users can access their own profile
  - Admins can access any profile
  
- **Admin endpoints**:
  - Restricted to users with `role === "admin"` or `isAdmin === true`

### Error Responses
- **401**: Not authenticated - user needs to login
- **403**: Forbidden - user lacks required permissions
- **404**: Not found - resource doesn't exist
- **400**: Bad request - invalid parameters

---

## User Model Fields

```javascript
{
  _id: ObjectId,
  name: String (3-20 chars),
  email: String (unique),
  image: String,
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  bio: String (max 500),
  motherName: String,
  fatherName: String,
  citizenshipNumber: String,
  district: String,
  citizenshipFront: String,
  citizenshipBack: String,
  role: String (user|admin),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Features Implemented

### User Features
- ✅ View own profile
- ✅ Update own profile (name, email, phone, address, bio, etc.)
- ✅ Change password
- ✅ Upload profile image
- ✅ Manage identity documents
- ✅ Add permanent addresses

### Admin Features
- ✅ List all users with pagination
- ✅ Search users by name/email
- ✅ Filter users by role and status
- ✅ View user details
- ✅ Edit user profiles
- ✅ Activate/deactivate users
- ✅ Change user roles
- ✅ Delete users
- ✅ User avatar display with fallback initials

### API Features
- ✅ Pagination support (page, limit)
- ✅ Advanced filtering (role, isActive)
- ✅ Search functionality (name, email)
- ✅ Proper error handling
- ✅ Validation on backend
- ✅ Image URL filtering (removes placeholders)
- ✅ Secure password hashing
- ✅ Transaction logging

---

## Common Use Cases

### Use Case 1: User Updates Their Profile
```javascript
// User navigates to profile page
fetch('/api/user/profile')  // Get profile
// Edit fields
fetch('/api/user/profile', {  // Update
  method: 'POST',
  body: JSON.stringify({ phone: '...', bio: '...' })
})
```

### Use Case 2: Admin Manages Users
```javascript
// Admin navigates to /dashboard/admin/alluser
// UserManagement component shows all users
// Admin can search, filter, paginate, edit, delete users
```

### Use Case 3: Admin Updates Specific User
```javascript
// Admin clicks edit button
// Dialog opens with user details
// Admin makes changes and saves
fetch('/api/admin/users/USER_ID/profile', {
  method: 'PATCH',
  body: JSON.stringify({ name: '...', role: 'admin' })
})
```

### Use Case 4: Admin Deletes User
```javascript
// Admin clicks delete button
// Confirms deletion
fetch('/api/admin/users/USER_ID/profile', {
  method: 'DELETE'
})
```

---

## Testing the APIs

### Using Postman
1. Create request
2. Choose method (GET, POST, PATCH, DELETE)
3. Enter endpoint URL
4. Add headers: `Content-Type: application/json`
5. Add body for POST/PATCH
6. Send request

### Using cURL
```bash
# Get profile
curl http://localhost:3000/api/user/profile

# Update profile
curl -X POST http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{"phone":"9841234567"}'

# List users
curl http://localhost:3000/api/admin/users/profile
```

### Using Browser Console
```javascript
fetch('/api/user/profile')
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## Troubleshooting

### 401 Unauthorized
- **Cause**: User not logged in
- **Solution**: Login first, then try API calls

### 403 Forbidden
- **Cause**: Not admin for admin endpoints
- **Solution**: Check user role in database

### 404 Not Found
- **Cause**: User doesn't exist
- **Solution**: Verify user ID is correct

### Email Already Exists
- **Cause**: Email must be unique
- **Solution**: Use different email

See `USER_PROFILE_API_TROUBLESHOOTING.md` for more issues and solutions.

---

## Performance Notes

### Pagination
- Default limit: 20 users per page
- Adjust as needed for performance

### Caching
- Consider implementing client-side caching
- Cache user profiles for 5-10 minutes
- Invalidate cache after updates

### Search
- Searches are case-insensitive
- Covers name and email fields
- Real-time search supported

---

## Security Considerations

- ✅ All endpoints require authentication
- ✅ Admin-only endpoints have role checks
- ✅ Passwords are hashed with bcrypt
- ✅ User can only edit their own profile (unless admin)
- ✅ Sensitive fields are selected appropriately
- ✅ Email uniqueness enforced
- ✅ Session-based authentication via NextAuth

---

## Next Steps

1. **Test the UI**
   - Visit `/dashboard/admin/alluser`
   - Create a test user
   - Try search, filter, edit, delete

2. **Integrate into Your App**
   - Use UserManagement component
   - Or use hooks/API directly
   - See `USER_PROFILE_API_INTEGRATION.md`

3. **Customize as Needed**
   - Modify UserManagement component
   - Add additional fields
   - Extend API with more filters

4. **Add More Features** (Optional)
   - Bulk user import
   - User roles management
   - Permission system
   - Audit logging

---

## Support & Documentation

| Document | Purpose |
|----------|---------|
| `USER_PROFILE_API_GUIDE.md` | Full API documentation with all endpoints |
| `USER_PROFILE_API_QUICK_REF.md` | Quick lookup table |
| `USER_PROFILE_API_INTEGRATION.md` | Code examples and integration patterns |
| `USER_PROFILE_API_TROUBLESHOOTING.md` | Common issues and solutions |

---

## Summary

✅ **Complete User Profile API** with 8 endpoints  
✅ **Full-Featured UI Component** for user management  
✅ **Comprehensive Documentation** with examples  
✅ **Error Handling** and validation  
✅ **Admin Features** for user management  
✅ **Pagination & Filtering** support  
✅ **Authentication & Authorization**  
✅ **Ready to Use** - no additional setup needed  

The system is production-ready and fully documented. Start using it now!

---

## Questions?

See the documentation files or check the component implementation at:
- Component: `/components/admin/user/UserManagement.js`
- API Routes: `/app/api/user/profile/route.js` and `/app/api/admin/users/profile/route.js`
