# Admin User Profile API Documentation

## Overview
Complete API documentation for admin user profile management endpoints. All endpoints require admin authentication.

---

## API Endpoints

### Base Path
`/api/admin/users/profile`

---

## GET - Fetch Multiple User Profiles

**Endpoint:** `GET /api/admin/users/profile`

**Authentication:** Required (Admin only)

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | Get specific user by ID |
| `search` | string | Search by name or email (case-insensitive) |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |
| `isActive` | boolean | Filter by active status (true/false) |
| `role` | string | Filter by role (admin, user, moderator, etc.) |

**Request Example:**
```javascript
// Fetch all users
GET /api/admin/users/profile

// Fetch with pagination
GET /api/admin/users/profile?page=2&limit=50

// Search users
GET /api/admin/users/profile?search=john

// Filter active users
GET /api/admin/users/profile?isActive=true

// Combined filters
GET /api/admin/users/profile?search=john&isActive=true&role=user&page=1&limit=20
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "image": "https://example.com/photo.jpg",
      "phone": "+1234567890",
      "address": "123 Main St",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "zipCode": "10001",
      "bio": "User bio",
      "isActive": true,
      "role": "user",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
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

**Response (Error - 401):**
```json
{
  "err": "Not authenticated"
}
```

**Response (Error - 403):**
```json
{
  "err": "Access denied. Admin only."
}
```

**Features:**
- ✅ Advanced search (name, email)
- ✅ Pagination support
- ✅ Filtering by status and role
- ✅ Image validation (filters placeholder URLs)
- ✅ Sorted by creation date (newest first)

---

## POST - Create/Update Multiple User Profiles

**Endpoint:** `POST /api/admin/users/profile`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "userId": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/new-photo.jpg",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipCode": "10001",
  "bio": "Updated bio",
  "isActive": true,
  "role": "user",
  "motherName": "Jane Doe",
  "fatherName": "Robert Doe",
  "citizenshipNumber": "123456789",
  "district": "Manhattan"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "msg": "User profile updated successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/new-photo.jpg",
    ...
  }
}
```

**Response (Error - 400):**
```json
{
  "err": "User ID is required"
}
```

**Response (Error - 404):**
```json
{
  "err": "User not found"
}
```

**Features:**
- ✅ Only updates provided fields
- ✅ Validates data before updating
- ✅ Supports all user profile fields
- ✅ Logs updates for audit trail

---

## DELETE - Delete User

**Endpoint:** `DELETE /api/admin/users/profile?userId={userId}`

**Authentication:** Required (Admin only)

**Query Parameters:**
- `userId` (required) - ID of user to delete

**Request Example:**
```javascript
DELETE /api/admin/users/profile?userId=user_id
```

**Response (Success - 200):**
```json
{
  "success": true,
  "msg": "User deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "err": "Cannot delete your own account"
}
```

**Response (Error - 404):**
```json
{
  "err": "User not found"
}
```

**Features:**
- ✅ Admin cannot delete their own account
- ✅ Permanent deletion from database
- ✅ Logs deletion for audit trail

---

## GET - Fetch Specific User Profile by ID

**Endpoint:** `GET /api/admin/users/{userId}/profile`

**Authentication:** Required (Admin only)

**URL Parameters:**
- `userId` (required) - User ID to fetch

**Request Example:**
```javascript
GET /api/admin/users/user_id/profile
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/photo.jpg",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001",
    "bio": "User bio",
    "isActive": true,
    "role": "user",
    "motherName": "Jane Doe",
    "fatherName": "Robert Doe",
    "citizenshipNumber": "123456789",
    "district": "Manhattan",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T00:00:00Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "err": "User not found"
}
```

**Features:**
- ✅ Includes all profile fields
- ✅ Includes citizenship documents
- ✅ Returns permanent addresses
- ✅ Image validation included

---

## PATCH - Update Specific User Profile by ID

**Endpoint:** `PATCH /api/admin/users/{userId}/profile`

**Authentication:** Required (Admin only)

**URL Parameters:**
- `userId` (required) - User ID to update

**Request Body (all fields optional):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "image": "https://example.com/new-photo.jpg",
  "phone": "+1987654321",
  "isActive": false,
  "role": "moderator"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "msg": "User profile updated successfully",
  "data": {
    "_id": "user_id",
    "name": "Jane Doe",
    "email": "jane@example.com",
    ...
  }
}
```

**Features:**
- ✅ Partial updates supported
- ✅ Only updates provided fields
- ✅ Validates all data
- ✅ Returns updated user object

---

## DELETE - Delete Specific User by ID

**Endpoint:** `DELETE /api/admin/users/{userId}/profile`

**Authentication:** Required (Admin only)

**URL Parameters:**
- `userId` (required) - User ID to delete

**Request Example:**
```javascript
DELETE /api/admin/users/user_id/profile
```

**Response (Success - 200):**
```json
{
  "success": true,
  "msg": "User deleted successfully"
}
```

**Features:**
- ✅ Prevents self-deletion
- ✅ Returns success confirmation
- ✅ Logs deletion event

---

## Usage Examples

### JavaScript/Node.js

**Fetch all active users with pagination:**
```javascript
const response = await fetch('/api/admin/users/profile?isActive=true&page=1&limit=50');
const data = await response.json();
console.log(data.data); // Array of users
console.log(data.pagination); // Pagination info
```

**Search for a user:**
```javascript
const response = await fetch('/api/admin/users/profile?search=john');
const data = await response.json();
console.log(data.data); // Matching users
```

**Get specific user:**
```javascript
const response = await fetch('/api/admin/users/user_id/profile');
const data = await response.json();
console.log(data.data); // User details
```

**Update user profile:**
```javascript
const response = await fetch('/api/admin/users/user_id/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Updated Name',
    image: 'https://example.com/new-photo.jpg',
    isActive: true
  })
});
const data = await response.json();
console.log(data.msg); // "User profile updated successfully"
```

**Delete user:**
```javascript
const response = await fetch('/api/admin/users/user_id/profile', {
  method: 'DELETE'
});
const data = await response.json();
console.log(data.msg); // "User deleted successfully"
```

---

## Error Handling

| Status Code | Meaning | Example |
|------------|---------|---------|
| 200 | Success | Profile updated |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Not logged in |
| 403 | Forbidden | Not an admin |
| 404 | Not Found | User doesn't exist |
| 500 | Server Error | Database error |

---

## Allowed Fields for Update

The following fields can be updated via admin APIs:

- `name` - User's full name
- `email` - User's email address
- `image` - Profile photo URL
- `phone` - Contact phone number
- `address` - Street address
- `city` - City name
- `state` - State/Province
- `country` - Country name
- `zipCode` - Postal code
- `bio` - User biography
- `isActive` - Active status (boolean)
- `role` - User role
- `motherName` - Mother's name
- `fatherName` - Father's name
- `citizenshipNumber` - Citizenship number
- `district` - District name
- `citizenshipFront` - Front citizenship document URL
- `citizenshipBack` - Back citizenship document URL

---

## Security Features

✅ **Authentication Required:** All endpoints require valid admin session
✅ **Admin Only:** Endpoints check admin role and isAdmin flag
✅ **Self-Protection:** Admins cannot delete their own accounts
✅ **Input Validation:** All data is validated before updating
✅ **Data Cleaning:** Placeholder images are filtered out
✅ **Audit Logging:** All operations logged with timestamps
✅ **Field Whitelist:** Only allowed fields can be updated

---

## File Locations

- List/Create/Delete Users: `/app/api/admin/users/profile/route.js`
- Get/Update/Delete Specific User: `/app/api/admin/users/[userId]/profile/route.js`

---

## Related APIs

- **User Self-Profile:** `/api/user/profile` (for personal profile management)
- **Card Queue:** `/api/admin/cardqueue` (for card print requests)
- **Authentication:** NextAuth.js (session-based)
