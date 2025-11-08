# ANTUF API - Quick Start Guide

## 🚀 Getting Started

This guide will help you quickly start using the ANTUF card management APIs.

---

## Installation & Setup

No additional installation needed! All APIs are already integrated into the Next.js project.

**Prerequisites:**
- ✅ Next.js 13+ with App Router
- ✅ MongoDB connection via `dbConnect()`
- ✅ NextAuth.js for authentication
- ✅ User model with image field

---

## 5-Minute Setup

### 1. Fetch User Images for Avatar

```javascript
import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';

export function UserAvatar({ user }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchUserImage();
  }, [user._id]);

  const fetchUserImage = async () => {
    try {
      const response = await fetch(`/api/user/profile?userId=${user._id}`);
      if (response.ok) {
        const data = await response.json();
        setImage(data.image);
      }
    } catch (error) {
      console.warn('Failed to load image');
    }
  };

  return (
    <Avatar
      src={image || undefined}
      sx={{ width: 60, height: 60, bgcolor: '#4A90E2' }}
      onError={(e) => {
        const letters = (user.name?.charAt(0) || '?') + 
                       (user.name?.split(' ')[1]?.charAt(0) || '');
        e.target.textContent = letters;
      }}
    >
      {user.name?.charAt(0) || 'U'}
    </Avatar>
  );
}
```

### 2. Display Card Preview with Image

```javascript
import AdminCardPrintViewer from '@/components/admin/CardPrint/AdminCardPrintViewer';

export function OrderRow({ order }) {
  const [cardOpen, setCardOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleViewCard = async () => {
    const response = await fetch(`/api/user/profile?userId=${order.userId}`);
    const data = await response.json();
    setUserDetails(data);
    setCardOpen(true);
  };

  return (
    <>
      <button onClick={handleViewCard}>View Card</button>
      {userDetails && (
        <AdminCardPrintViewer
          open={cardOpen}
          onClose={() => setCardOpen(false)}
          order={order}
          userDetails={userDetails}
        />
      )}
    </>
  );
}
```

### 3. Search and List Users (Admin)

```javascript
async function searchUsers(query) {
  const response = await fetch(
    `/api/admin/users/profile?search=${encodeURIComponent(query)}&limit=50`
  );
  const data = await response.json();
  
  if (data.success) {
    console.log('Found users:', data.data);
    console.log('Total:', data.pagination.total);
  }
}
```

### 4. Update User Image (Admin)

```javascript
async function updateUserImage(userId, imageUrl) {
  const response = await fetch(`/api/admin/users/${userId}/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageUrl })
  });
  
  const data = await response.json();
  if (data.success) {
    console.log('Image updated!');
  }
}
```

---

## Common Tasks

### Task 1: Display User Profile with Photo

```javascript
const [user, setUser] = useState(null);

useEffect(() => {
  const fetchProfile = async () => {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setUser(data);
  };
  
  fetchProfile();
}, []);

if (user) {
  return (
    <div>
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Task 2: List Card Orders (Admin)

```javascript
const [orders, setOrders] = useState([]);

const fetchOrders = async () => {
  const response = await fetch('/api/admin/cardqueue?status=pending');
  const data = await response.json();
  setOrders(data.queues);
};

useEffect(() => {
  fetchOrders();
}, []);
```

### Task 3: Update Order Status (Admin)

```javascript
async function updateStatus(orderId, newStatus) {
  const response = await fetch(`/api/admin/cardqueue/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  
  const data = await response.json();
  return data.queue;
}
```

### Task 4: Search Users (Admin)

```javascript
async function listAllUsers() {
  const response = await fetch('/api/admin/users/profile?page=1&limit=50');
  const data = await response.json();
  
  return {
    users: data.data,
    total: data.pagination.total,
    hasMore: data.pagination.hasMore
  };
}
```

---

## API Response Examples

### Successful User Fetch
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/photo.jpg",
  "phone": "+1234567890",
  "city": "New York",
  "_id": "user_id"
}
```

### Successful List Users
```javascript
{
  "success": true,
  "data": [
    { "name": "John", "email": "john@example.com", ... },
    { "name": "Jane", "email": "jane@example.com", ... }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5,
    "hasMore": true
  }
}
```

### Error Response
```javascript
{
  "err": "Access denied. Admin only."
}
```

---

## Error Handling Best Practices

```javascript
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    
    // Check HTTP status
    if (!response.ok) {
      if (response.status === 401) {
        // Not authenticated
        redirectToLogin();
      } else if (response.status === 403) {
        // Not authorized (admin only)
        showError('Admin access required');
      } else if (response.status === 404) {
        // Not found
        showError('Resource not found');
      }
      return;
    }
    
    const data = await response.json();
    
    // Check for API errors
    if (data.err) {
      console.error('API Error:', data.err);
      return;
    }
    
    return data;
  } catch (error) {
    console.error('Network error:', error);
    showError('Failed to load data');
  }
};
```

---

## Debugging Tips

### Check Browser Console
```javascript
// Enable detailed logging
localStorage.setItem('DEBUG_API', 'true');

// Then check console for API calls
```

### Test with cURL
```bash
# Fetch users
curl -X GET http://localhost:3000/api/admin/users/profile \
  -H "Accept: application/json"

# Update user
curl -X PATCH http://localhost:3000/api/admin/users/USER_ID/profile \
  -H "Content-Type: application/json" \
  -d '{"image": "https://example.com/photo.jpg"}'
```

### Common Issues

**Issue:** "Not authenticated" error
- **Fix:** Ensure user is logged in (has valid session)

**Issue:** "Access denied. Admin only."
- **Fix:** Ensure user has admin role

**Issue:** Images not loading
- **Fix:** Check image URL is valid and accessible

**Issue:** Slow response
- **Fix:** Use pagination, avoid fetching all records

---

## Performance Optimization

### Batch Requests
```javascript
// Fetch multiple users at once
const userIds = ['id1', 'id2', 'id3'];
const promises = userIds.map(id => 
  fetch(`/api/user/profile?userId=${id}`)
);
const results = await Promise.all(promises);
```

### Cache Results
```javascript
const cache = {};

async function getUser(userId) {
  if (cache[userId]) return cache[userId];
  
  const response = await fetch(`/api/user/profile?userId=${userId}`);
  const data = await response.json();
  cache[userId] = data;
  return data;
}
```

### Use Pagination
```javascript
// Don't fetch all 10,000 users at once!
async function getUsers(page = 1) {
  const response = await fetch(
    `/api/admin/users/profile?page=${page}&limit=50`
  );
  return await response.json();
}
```

---

## What's Available

| Feature | Endpoint | Status |
|---------|----------|--------|
| Get user profile | `/api/user/profile` | ✅ Ready |
| Update profile | `/api/user/profile` | ✅ Ready |
| List users (admin) | `/api/admin/users/profile` | ✅ Ready |
| Search users | `/api/admin/users/profile?search=...` | ✅ Ready |
| Get user details (admin) | `/api/admin/users/{id}/profile` | ✅ Ready |
| Update user (admin) | `/api/admin/users/{id}/profile` | ✅ Ready |
| Delete user (admin) | `/api/admin/users/{id}/profile` | ✅ Ready |
| List orders | `/api/admin/cardqueue` | ✅ Ready |
| Create order | `/api/admin/cardqueue` | ✅ Ready |
| Update order | `/api/admin/cardqueue/{id}` | ✅ Ready |

---

## Next Steps

1. **Read Full Docs:** Check `API_DOCUMENTATION.md`
2. **Integration Guide:** Follow `API_INTEGRATION_GUIDE.md`
3. **Admin API Docs:** See `ADMIN_USER_API.md`
4. **Check Examples:** Look at `/app/dashboard/admin/orders/page.js`
5. **Test Endpoints:** Use provided cURL examples

---

## Support & Help

**For API errors:**
- Check console logs for detailed error messages
- Verify authentication (session valid)
- Check user has required permissions
- Validate request payload

**For integration issues:**
- Review existing components (AdminCardManagement, AdminCardPrintViewer)
- Check API_INTEGRATION_GUIDE.md for examples
- Ensure MongoDB connection is working
- Verify NextAuth.js is configured

---

## Environment Variables Needed

```env
# .env.local
MONGODB_URI=mongodb://...
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## That's It! 🎉

You're ready to use the ANTUF APIs. Start by:

1. Importing components
2. Using fetch() to call APIs
3. Handling responses and errors
4. Display data in your UI

Happy coding!
