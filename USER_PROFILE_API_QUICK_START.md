# User Profile API - Developer Quick Start Card

## 🎯 In 2 Minutes

### What This Is
A complete user profile management API with admin interface for the ANTUF application.

### What You Can Do
- View/edit user profiles
- Admin: manage all users (list, search, filter, edit, delete)
- Pagination, filtering, and search
- Avatar display with fallback initials

---

## ⚡ 5-Second Examples

### Get User Profile
```javascript
const user = await fetch('/api/user/profile').then(r => r.json());
```

### Update Profile
```javascript
await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: '9841234567', bio: 'Hi' })
});
```

### List Users (Admin)
```javascript
const users = await fetch('/api/admin/users/profile').then(r => r.json());
```

### Search Users (Admin)
```javascript
const results = await fetch('/api/admin/users/profile?search=john').then(r => r.json());
```

### Edit User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Name', role: 'admin' })
});
```

### Delete User (Admin)
```javascript
await fetch('/api/admin/users/USER_ID/profile', { method: 'DELETE' });
```

---

## 🚀 Access Now

### Visit Admin User Management
```
http://localhost:3000/dashboard/admin/alluser
```

Features:
- ✅ View all users with avatars
- ✅ Search by name/email
- ✅ Filter by role and status
- ✅ Pagination
- ✅ Edit user details
- ✅ Delete users

---

## 📍 Files

### Components
```
/components/admin/user/UserManagement.js    Full UI component
/app/dashboard/admin/alluser/page.js       Access point
```

### API Routes
```
/app/api/user/profile/route.js                    User endpoints
/app/api/admin/users/profile/route.js            Admin endpoints
/app/api/admin/users/[userId]/profile/route.js   Admin by ID
```

### Models
```
/models/user.js    User schema
```

---

## 📚 Documentation

| File | Use When | Read Time |
|------|----------|-----------|
| USER_PROFILE_API_README.md | First time | 5 min |
| USER_PROFILE_API_SETUP_SUMMARY.md | Getting started | 10 min |
| USER_PROFILE_API_QUICK_REF.md | Need quick lookup | 2 min |
| USER_PROFILE_API_GUIDE.md | Need full details | 20 min |
| USER_PROFILE_API_INTEGRATION.md | Building UI | 30 min |
| USER_PROFILE_API_TROUBLESHOOTING.md | Something broke | 5-10 min |

---

## 🔗 8 Endpoints

### User Endpoints (Any authenticated user)
```
GET  /api/user/profile              Get own profile
POST /api/user/profile              Update own profile
```

### Admin Endpoints (Admin role required)
```
GET    /api/admin/users/profile     List all users
POST   /api/admin/users/profile     Update user
DELETE /api/admin/users/profile     Delete user

GET    /api/admin/users/[userId]/profile    Get user details
PATCH  /api/admin/users/[userId]/profile    Update user
DELETE /api/admin/users/[userId]/profile    Delete user
```

---

## 🔍 Query Parameters

### For `/api/admin/users/profile`
```
?page=1            Page number (default: 1)
&limit=20          Items per page (default: 20)
&search=john       Search by name/email
&role=user         Filter by role (user|admin)
&isActive=true     Filter by status (true|false)
```

Example:
```javascript
fetch('/api/admin/users/profile?page=2&limit=10&search=john&role=admin')
```

---

## 📝 Request Body Fields

All optional. Send only what you need:
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "9841234567",
  address: "123 Main St",
  city: "Kathmandu",
  state: "Bagmati",
  country: "Nepal",
  zipCode: "44600",
  bio: "My bio",
  password: "newPassword123",  // Auto-hashed
  image: "https://...",
  
  // Admin only:
  userId: "USER_ID",           // For targeting specific user
  role: "admin",               // Change user role
  isActive: true               // Activate/deactivate
}
```

---

## ✅ What's Included

### Features
- ✅ User authentication required
- ✅ Admin role-based access control
- ✅ Pagination support
- ✅ Search and filter
- ✅ Image fallback with initials
- ✅ Secure password hashing
- ✅ Input validation
- ✅ Proper error handling

### UI Components
- ✅ Full user management table
- ✅ Search bar
- ✅ Role and status filters
- ✅ Edit dialog
- ✅ Delete confirmation
- ✅ Pagination controls
- ✅ User avatars

### Documentation
- ✅ Setup guide
- ✅ API reference
- ✅ Quick reference
- ✅ Integration guide
- ✅ Troubleshooting

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Login first |
| 403 Forbidden | Not admin - check role |
| 404 Not Found | User doesn't exist - check ID |
| Email exists | Email must be unique |
| Network error | Check server is running |
| Image not shown | Uses initials as fallback |

See `USER_PROFILE_API_TROUBLESHOOTING.md` for more.

---

## 🏃 Getting Started

### Option 1: Use Admin UI (Easiest)
1. Visit: `http://localhost:3000/dashboard/admin/alluser`
2. Browse all users
3. Search/filter/edit/delete

### Option 2: Call API Directly
```javascript
// In React component
const response = await fetch('/api/user/profile');
const user = await response.json();
console.log(user);
```

### Option 3: Use Component
```javascript
import UserManagement from '@/components/admin/user/UserManagement';
export default () => <UserManagement />;
```

---

## 💡 Common Patterns

### Fetch and Display
```javascript
const [user, setUser] = useState(null);

useEffect(() => {
  fetch('/api/user/profile')
    .then(r => r.json())
    .then(setUser);
}, []);
```

### Submit Form
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/user/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  const result = await response.json();
  console.log(result);
};
```

### List with Pagination
```javascript
const [page, setPage] = useState(1);

const handlePageChange = async (newPage) => {
  const response = await fetch(`/api/admin/users/profile?page=${newPage}`);
  const { data, pagination } = await response.json();
  setPage(newPage);
};
```

---

## 🔐 Authentication

- All endpoints require NextAuth session
- Automatically sent from cookies
- Check with: `fetch('/api/auth/session')`

---

## 📊 Response Format

### Success
```javascript
{
  "success": true,
  "data": { /* user(s) */ },
  "pagination": { /* if applicable */ }
}
```

### Error
```javascript
{
  "err": "Error message"
}
```

---

## 🎓 Next Steps

1. **Try It:** Visit `/dashboard/admin/alluser`
2. **Test It:** Call endpoints in browser console
3. **Build It:** Use component or API in your code
4. **Customize It:** See integration guide

---

## 📖 Documentation Links

Start here:
- **First time?** → USER_PROFILE_API_README.md
- **Need quick lookup?** → USER_PROFILE_API_QUICK_REF.md  
- **Want full details?** → USER_PROFILE_API_GUIDE.md
- **Building UI?** → USER_PROFILE_API_INTEGRATION.md
- **Have an error?** → USER_PROFILE_API_TROUBLESHOOTING.md

---

## ⚙️ No Setup Required

Everything is already configured:
- ✅ API routes ready
- ✅ Database models ready
- ✅ Components ready
- ✅ Authentication integrated

Just start using it!

---

## 🎯 Summary

| What | Location |
|------|----------|
| **Use Admin UI** | `/dashboard/admin/alluser` |
| **Component** | `/components/admin/user/UserManagement.js` |
| **API Routes** | `/app/api/user/profile/route.js` |
| **Docs** | `USER_PROFILE_API_*.md` files |

---

**Status:** ✅ Ready to Use  
**Updated:** November 8, 2025  
**Questions?** Check the documentation or component code.
