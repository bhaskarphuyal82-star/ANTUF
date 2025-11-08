# User Profile API - Complete Guide

## Quick Summary

The User Profile API provides endpoints for managing user profiles, supporting both personal profile management and admin user administration. All endpoints require authentication via NextAuth.

## API Endpoints Overview

### User Endpoints
- **GET** `/api/user/profile` - Get own or admin get any user profile
- **POST** `/api/user/profile` - Update own or admin update any user profile

### Admin Endpoints
- **GET** `/api/admin/users/profile` - List all users (with filters, search, pagination)
- **POST** `/api/admin/users/profile` - Update user profile (admin bulk)
- **DELETE** `/api/admin/users/profile` - Delete user (admin)
- **GET** `/api/admin/users/[userId]/profile` - Get specific user (admin)
- **PATCH** `/api/admin/users/[userId]/profile` - Update specific user (admin)
- **DELETE** `/api/admin/users/[userId]/profile` - Delete specific user (admin)

---

## Authentication

All endpoints require a valid NextAuth session. The session is automatically retrieved from cookies.

**Access Control:**
- **User endpoints**: Users can access their own profile. Admins can access any profile.
- **Admin endpoints**: Restricted to users with `role === "admin"` or `isAdmin === true`

---

## User Endpoints

### 1. GET /api/user/profile

**Purpose:** Retrieve user profile information

**Parameters:**
```javascript
// Query Parameters
- userId (optional): User ID to fetch (admin only, otherwise gets current user)
```

**Example Requests:**
```javascript
// Get own profile
fetch('/api/user/profile', { method: 'GET' })

// Admin get another user's profile
fetch('/api/user/profile?userId=USER_ID', { method: 'GET' })
```

**Success Response (200):**
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/profile.jpg",
  "phone": "9841234567",
  "address": "123 Main Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "country": "Nepal",
  "zipCode": "44600",
  "bio": "Software developer and tech enthusiast",
  "motherName": "Jane Doe",
  "fatherName": "Bob Doe",
  "citizenshipNumber": "12345678",
  "district": "Kathmandu",
  "citizenshipFront": "https://example.com/front.jpg",
  "citizenshipBack": "https://example.com/back.jpg",
  "permanentAddresses": [],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (401):**
```javascript
{
  "err": "Not authenticated"
}
```

**Error Response (403):**
```javascript
{
  "err": "Unauthorized"
}
```

---

### 2. POST /api/user/profile

**Purpose:** Update user profile information

**Request Body:**
```javascript
{
  // Basic Info
  "name": "John Doe",
  "email": "john@example.com",
  
  // Contact Info
  "phone": "9841234567",
  "address": "123 Main Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "country": "Nepal",
  "zipCode": "44600",
  
  // Personal Info
  "bio": "Software developer",
  "motherName": "Jane Doe",
  "fatherName": "Bob Doe",
  
  // Identity Documents
  "citizenshipNumber": "12345678",
  "district": "Kathmandu",
  "citizenshipFront": "https://example.com/front.jpg",
  "citizenshipBack": "https://example.com/back.jpg",
  
  // Image (can use profileImage or image)
  "image": "https://example.com/profile.jpg",
  "profileImage": "https://example.com/profile.jpg",
  
  // Security
  "password": "newPassword123",
  
  // Admin: Target user (admin only)
  "userId": "USER_ID",
  
  // Other
  "permanentAddresses": []
}
```

**Example Requests:**
```javascript
// Update own profile
const response = await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Updated Name",
    phone: "9847654321",
    bio: "Updated bio"
  })
});

// Update password
const response = await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    password: "newSecurePassword123"
  })
});

// Admin update another user's profile
const response = await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: "USER_ID",
    name: "Updated Name",
    isActive: false
  })
});
```

**Success Response (200):**
```javascript
{
  "msg": "User updated successfully!",
  "user": {
    "_id": "user_id",
    "name": "Updated Name",
    "email": "john@example.com",
    "image": "https://example.com/profile.jpg",
    "phone": "9847654321",
    "bio": "Updated bio",
    // ... other fields
  }
}
```

**Error Response (401):**
```javascript
{
  "err": "Not Authenticated!"
}
```

---

## Admin Endpoints

### 3. GET /api/admin/users/profile

**Purpose:** List all users with filtering and pagination (admin only)

**Query Parameters:**
```javascript
- page (default: 1): Page number for pagination
- limit (default: 20): Users per page
- search: Search by name or email (case-insensitive)
- role: Filter by role ('user' or 'admin')
- isActive: Filter by status ('true' or 'false')
- userId: Get specific user
```

**Example Requests:**
```javascript
// Get all users
fetch('/api/admin/users/profile')

// Get users with pagination
fetch('/api/admin/users/profile?page=2&limit=10')

// Search users
fetch('/api/admin/users/profile?search=john')

// Filter by role and status
fetch('/api/admin/users/profile?role=admin&isActive=true')

// Combine filters
fetch('/api/admin/users/profile?page=1&limit=20&search=john&role=user&isActive=true')
```

**Success Response (200):**
```javascript
{
  "success": true,
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "image": null,
      "phone": "9841234567",
      "address": "123 Main Street",
      "city": "Kathmandu",
      "state": "Bagmati",
      "country": "Nepal",
      "zipCode": "44600",
      "bio": "Software developer",
      "isActive": true,
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-20T15:45:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "pages": 8,
    "hasMore": true
  }
}
```

**Error Response (401):**
```javascript
{
  "err": "Not authenticated"
}
```

**Error Response (403):**
```javascript
{
  "err": "Access denied. Admin only."
}
```

---

### 4. POST /api/admin/users/profile

**Purpose:** Update user profile (admin bulk operation)

**Request Body:**
```javascript
{
  "userId": "USER_ID", // Required
  "name": "Updated Name",
  "email": "new@example.com",
  "image": "https://example.com/image.jpg",
  "phone": "9841234567",
  "address": "123 Main Street",
  "city": "Kathmandu",
  "state": "Bagmati",
  "country": "Nepal",
  "zipCode": "44600",
  "bio": "Updated bio",
  "isActive": true,
  "role": "user",
  "motherName": "Jane Doe",
  "fatherName": "Bob Doe",
  "citizenshipNumber": "12345678",
  "district": "Kathmandu"
}
```

**Example Request:**
```javascript
const response = await fetch('/api/admin/users/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: "USER_ID",
    name: "New Name",
    isActive: false,
    role: "admin"
  })
});
```

**Success Response (200):**
```javascript
{
  "success": true,
  "msg": "User profile updated successfully",
  "user": { /* user object */ }
}
```

---

### 5. DELETE /api/admin/users/profile

**Purpose:** Delete user account (admin only)

**Query Parameters:**
```javascript
- userId (required): User ID to delete
```

**Example Request:**
```javascript
const response = await fetch('/api/admin/users/profile?userId=USER_ID', {
  method: 'DELETE'
});
```

**Success Response (200):**
```javascript
{
  "success": true,
  "msg": "User deleted successfully"
}
```

---

### 6. GET /api/admin/users/[userId]/profile

**Purpose:** Get specific user details (admin only)

**Example Request:**
```javascript
const response = await fetch('/api/admin/users/USER_ID/profile', {
  method: 'GET'
});
```

**Success Response (200):**
```javascript
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    // ... all user fields
  }
}
```

---

### 7. PATCH /api/admin/users/[userId]/profile

**Purpose:** Update specific user profile (admin only)

**Request Body:** (same as POST endpoint)

**Example Request:**
```javascript
const response = await fetch('/api/admin/users/USER_ID/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Updated Name",
    isActive: true
  })
});
```

**Success Response (200):**
```javascript
{
  "success": true,
  "msg": "User profile updated successfully",
  "data": { /* user object */ }
}
```

---

### 8. DELETE /api/admin/users/[userId]/profile

**Purpose:** Delete specific user (admin only)

**Example Request:**
```javascript
const response = await fetch('/api/admin/users/USER_ID/profile', {
  method: 'DELETE'
});
```

**Success Response (200):**
```javascript
{
  "success": true,
  "msg": "User deleted successfully"
}
```

---

## User Model Schema

```javascript
{
  _id: ObjectId,
  name: String (3-20 chars),
  email: String (unique, lowercase),
  image: String,
  password: String (hashed),
  organization: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
  permanentAddresses: [{
    addressType: String (enum: permanent, temporary, office, other),
    province: String,
    district: String,
    municipality: String,
    ward: String,
    streetAddress: String,
    city: String,
    zipCode: String,
    isDefault: Boolean,
    createdAt: Date
  }],
  bio: String (max 500 chars),
  motherName: String,
  fatherName: String,
  citizenshipNumber: String,
  district: String,
  citizenshipFront: String,
  citizenshipBack: String,
  role: String (enum: user, admin),
  subscription: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Implementation Example (React Component)

```javascript
import { useEffect, useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
      <p>Bio: {user?.bio}</p>
      {/* Add edit form here */}
    </div>
  );
}
```

---

## Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Not authenticated | Ensure user is logged in |
| 403 Forbidden | Not admin | Admin endpoints require admin role |
| 400 Bad Request | Missing required field | Check userId parameter for delete |
| 404 Not Found | User doesn't exist | Verify user ID is correct |
| 500 Server Error | Server error | Check server logs |

---

## Best Practices

1. **Always authenticate** before making API calls
2. **Validate user input** on client side before sending
3. **Handle errors gracefully** with appropriate user feedback
4. **Use pagination** when fetching large lists
5. **Cache results** to reduce unnecessary API calls
6. **Protect sensitive endpoints** with admin role checks
7. **Log API calls** for debugging and monitoring
8. **Implement rate limiting** in production

---

## Testing

You can test these endpoints using:
- **Postman**: Import the API endpoints and test with authentication
- **cURL**: Use with proper headers and body
- **Browser Console**: Use fetch API directly
- **Frontend Component**: Use in React/Next.js components

Example cURL:
```bash
curl -X GET http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json"

curl -X POST http://localhost:3000/api/user/profile \
  -H "Content-Type: application/json" \
  -d '{"phone":"9841234567","bio":"Updated bio"}'

curl -X GET "http://localhost:3000/api/admin/users/profile?page=1&limit=20" \
  -H "Content-Type: application/json"
```

---

## Related APIs

- **Card Management API**: `/api/admin/cardqueue`
- **Member Management**: `/api/members`
- **Auth**: `/api/auth`

For more details, see `API_DOCUMENTATION.md`
