# API Integration Guide

## Quick Start

This guide shows how to use the ANTUF card management APIs in your application.

---

## Available APIs

### 1. User Profile API
**File:** `/api/user/profile`
- GET - Fetch current or specific user profile
- POST - Update user profile (with image support)

**Use in:** User dashboard, profile settings, card viewer

---

### 2. Admin Card Queue API
**Files:** 
- `/api/admin/cardqueue` - List/Create print orders
- `/api/admin/cardqueue/[id]` - Update order status

**Use in:** Admin orders management page

---

### 3. Admin User Profile API
**Files:**
- `/api/admin/users/profile` - List/Create/Delete users
- `/api/admin/users/[userId]/profile` - Get/Update/Delete specific user

**Use in:** Admin user management

---

## Integration Examples

### Fetching User Images in Tables

**Problem:** User photos not showing in tables

**Solution:**

```javascript
// In your component
const [userImages, setUserImages] = useState({});

useEffect(() => {
  const fetchImages = async () => {
    const imageMap = {};
    for (const user of users) {
      try {
        const response = await fetch(`/api/user/profile?userId=${user._id}`);
        if (response.ok) {
          const userData = await response.json();
          imageMap[user._id] = userData.image;
        }
      } catch (error) {
        console.warn(`Failed to fetch image for ${user._id}`);
      }
    }
    setUserImages(imageMap);
  };
  
  fetchImages();
}, [users]);

// In render
<Avatar
  src={userImages[user._id] || undefined}
  sx={{ width: 60, height: 60, bgcolor: "#4A90E2" }}
  onError={(e) => {
    const firstLetter = user.name?.charAt(0)?.toUpperCase() || "?";
    const secondLetter = user.name?.split(" ")[1]?.charAt(0)?.toUpperCase() || "";
    e.target.textContent = firstLetter + secondLetter;
  }}
>
  {user.name?.charAt(0)?.toUpperCase() || "U"}
</Avatar>
```

---

### Displaying Card Preview with Image Editing

**Use:** AdminCardPrintViewer component

```javascript
import AdminCardPrintViewer from "@/components/admin/CardPrint/AdminCardPrintViewer";

// In component
const handleViewCard = async (order) => {
  // Fetch full user details including image
  const response = await fetch(`/api/user/profile?userId=${order.userId}`);
  const userData = await response.json();
  
  setSelectedCardOrder(order);
  setUserDetailsForCard(userData); // Includes image!
  setCardViewOpen(true);
};

// In render
{selectedCardOrder && (
  <AdminCardPrintViewer
    open={cardViewOpen}
    onClose={handleCloseCardView}
    order={selectedCardOrder}
    userDetails={userDetailsForCard}
  />
)}
```

---

### Admin User Management

**List all users with search:**

```javascript
const searchUsers = async (searchTerm) => {
  const url = searchTerm 
    ? `/api/admin/users/profile?search=${searchTerm}&limit=50`
    : `/api/admin/users/profile?limit=50`;
    
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data); // Array of users
  console.log(data.pagination); // Pagination info
};
```

**Update user image:**

```javascript
const updateUserImage = async (userId, imageUrl) => {
  const response = await fetch(`/api/admin/users/${userId}/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageUrl })
  });
  const data = await response.json();
  toast.success('Image updated successfully!');
};
```

**Get specific user details:**

```javascript
const fetchUserDetails = async (userId) => {
  const response = await fetch(`/api/admin/users/${userId}/profile`);
  const data = await response.json();
  console.log(data.data); // Full user profile with image
};
```

---

### Card Print Management

**Fetch pending orders:**

```javascript
const fetchPendingOrders = async () => {
  const response = await fetch('/api/admin/cardqueue?status=pending');
  const data = await response.json();
  console.log(data.queues); // Array of pending orders
};
```

**Update order status:**

```javascript
const updateOrderStatus = async (orderId, newStatus) => {
  const response = await fetch(`/api/admin/cardqueue/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus })
  });
  const data = await response.json();
  toast.success(`Order updated to ${newStatus}`);
};
```

---

## API Response Patterns

### Success Response
```json
{
  "success": true,
  "data": {...},
  "msg": "Operation successful"
}
```

### Error Response
```json
{
  "err": "Description of error"
}
```

### Pagination Response
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "pages": 5,
    "hasMore": true
  }
}
```

---

## Common Issues & Solutions

### Issue: Images not loading in Avatar

**Cause:** Image URL is invalid or placeholder URL

**Solution:**
```javascript
// Filter out placeholder URLs
if (image === "https://placehold.co/600x400" || !image) {
  image = undefined; // Let Avatar show fallback text
}
```

### Issue: Permission Denied Error

**Cause:** User is not admin

**Solution:**
```javascript
// Check admin role before calling admin APIs
if (session?.user?.role !== "admin" && !session?.user?.isAdmin) {
  throw new Error("Admin access required");
}
```

### Issue: Slow pagination

**Cause:** Loading too many records

**Solution:**
```javascript
// Use pagination
const response = await fetch(
  `/api/admin/users/profile?page=1&limit=20`
);
```

### Issue: Search not working

**Cause:** Special characters in search term

**Solution:**
```javascript
// Encode search term
const encoded = encodeURIComponent(searchTerm);
const response = await fetch(
  `/api/admin/users/profile?search=${encoded}`
);
```

---

## Best Practices

✅ **Always filter images:**
```javascript
if (userData.image === "https://placehold.co/600x400") {
  userData.image = null;
}
```

✅ **Use pagination for large lists:**
```javascript
const response = await fetch('/api/admin/users/profile?page=1&limit=50');
```

✅ **Add error handling:**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
} catch (error) {
  console.error("API Error:", error);
  toast.error("Failed to load data");
}
```

✅ **Cache frequently used data:**
```javascript
const [userCache, setUserCache] = useState({});

const getUser = async (userId) => {
  if (userCache[userId]) return userCache[userId];
  
  const response = await fetch(`/api/admin/users/${userId}/profile`);
  const data = await response.json();
  setUserCache(prev => ({ ...prev, [userId]: data.data }));
  return data.data;
};
```

✅ **Show loading states:**
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await fetch(url);
    // Process response
  } finally {
    setLoading(false);
  }
};
```

---

## Testing with cURL

### List users
```bash
curl -X GET http://localhost:3000/api/admin/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get specific user
```bash
curl -X GET http://localhost:3000/api/admin/users/USER_ID/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update user image
```bash
curl -X PATCH http://localhost:3000/api/admin/users/USER_ID/profile \
  -H "Content-Type: application/json" \
  -d '{"image": "https://example.com/photo.jpg"}'
```

---

## Performance Tips

1. **Use pagination** - Fetch 20-50 items per page
2. **Cache data** - Don't refetch unchanged data
3. **Batch requests** - Fetch related data together
4. **Lazy load images** - Load images only when visible
5. **Use filters** - Search/filter on server, not client

---

## File References

- **User API:** `/app/api/user/profile/route.js`
- **Card Queue API:** `/app/api/admin/cardqueue/route.js`
- **Admin User API:** `/app/api/admin/users/profile/route.js`
- **Card Viewer:** `/components/admin/CardPrint/AdminCardPrintViewer.js`
- **Orders Page:** `/app/dashboard/admin/orders/page.js`
- **Card Management:** `/components/admin/CardManagement/AdminCardManagement.js`

---

## Support

For issues or questions, check the documentation files:
- `API_DOCUMENTATION.md` - Detailed API specs
- `ADMIN_USER_API.md` - Admin user management API
