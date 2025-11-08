# ANTUF Card Management - API Documentation

## Overview
This document describes the available API endpoints for user profile management and admin card queue operations.

---

## User Profile API

### Base Path
`/api/user/profile`

### GET - Fetch User Profile
**Description:** Retrieve user profile information including name, email, image, and other details.

**Endpoint:** `GET /api/user/profile?userId={userId}`

**Authentication:** Required (NextAuth session)

**Query Parameters:**
- `userId` (optional) - User ID to fetch. If not provided, fetches current user's profile. Admin only can fetch other users.

**Response (Success - 200):**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/image.jpg",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipCode": "10001",
  "bio": "User bio",
  "motherName": "Jane Doe",
  "fatherName": "Robert Doe",
  "citizenshipNumber": "123456789",
  "district": "Manhattan",
  "createdAt": "2024-01-01T00:00:00Z"
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
  "err": "Unauthorized"
}
```

**Response (Error - 404):**
```json
{
  "err": "User not found"
}
```

**Features:**
- ✅ Validates image URL (filters out placeholder images)
- ✅ Admin can fetch any user's profile
- ✅ Non-admin users can only fetch their own profile
- ✅ Returns undefined for missing/invalid images

---

### POST - Update User Profile
**Description:** Update user profile information including image, contact details, and personal information.

**Endpoint:** `POST /api/user/profile`

**Authentication:** Required (NextAuth session)

**Request Body:**
```json
{
  "userId": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/new-image.jpg",
  "password": "new_password",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "zipCode": "10001",
  "bio": "Updated bio",
  "motherName": "Jane Doe",
  "fatherName": "Robert Doe",
  "citizenshipNumber": "123456789",
  "district": "Manhattan"
}
```

**Response (Success - 200):**
```json
{
  "msg": "User updated successfully!",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "image": "https://example.com/new-image.jpg",
    ...
  }
}
```

**Features:**
- ✅ Admin can update any user's profile (with userId)
- ✅ Non-admin users can only update their own profile
- ✅ Password hashing with bcrypt
- ✅ Image field supports both `image` and `profileImage` parameters
- ✅ Only updates provided fields

---

## Admin Card Queue API

### Base Path
`/api/admin/cardqueue`

### GET - Fetch Card Print Queue
**Description:** Retrieve all card print orders with optional filtering and pagination.

**Endpoint:** `GET /api/admin/cardqueue?status={status}&page={page}&limit={limit}`

**Authentication:** Required (Admin only)

**Query Parameters:**
- `status` (optional) - Filter by order status: `pending`, `processing`, `printed`, `shipped`, `delivered`, `cancelled`
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `userId` (optional) - Filter by specific user ID

**Response (Success - 200):**
```json
{
  "queues": [
    {
      "_id": "queue_id",
      "userId": "user_id",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "cardType": "standard",
      "quantity": 100,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00Z",
      "requestNotes": "Urgent request"
    }
  ],
  "total": 50,
  "page": 1,
  "pages": 5
}
```

**Response (Error - 401):**
```json
{
  "error": "Unauthorized"
}
```

**Response (Error - 403):**
```json
{
  "error": "Access denied. Admin only."
}
```

**Features:**
- ✅ Admin authentication required
- ✅ Populated user details (name, email)
- ✅ Pagination support
- ✅ Filtering by status and user ID

---

### POST - Create Card Print Request
**Description:** Create a new card print request for a user.

**Endpoint:** `POST /api/admin/cardqueue`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "userId": "user_id",
  "quantity": 100,
  "cardType": "standard",
  "requestNotes": "Special request",
  "shippingAddress": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001"
  }
}
```

**Response (Success - 201):**
```json
{
  "message": "Print request created successfully",
  "queue": {
    "_id": "queue_id",
    "userId": "user_id",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "quantity": 100,
    "cardType": "standard",
    "status": "pending",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

**Features:**
- ✅ Admin authentication required
- ✅ Automatic status set to "pending"
- ✅ Default shipping address from user profile
- ✅ Creates detailed audit trail with admin info

---

### PATCH - Update Card Print Status
**Description:** Update the status of a card print request.

**Endpoint:** `PATCH /api/admin/cardqueue/{id}`

**Authentication:** Required (Admin only)

**Request Body:**
```json
{
  "status": "processing"
}
```

**Valid Status Values:**
- `pending` - Initial state
- `processing` - Being prepared
- `printed` - Printing complete
- `shipped` - Shipped to user
- `delivered` - Delivered to user
- `cancelled` - Cancelled

**Response (Success - 200):**
```json
{
  "message": "Status updated successfully",
  "queue": {
    "_id": "queue_id",
    "status": "processing",
    "updatedAt": "2024-01-02T00:00:00Z"
  }
}
```

**Features:**
- ✅ Admin authentication required
- ✅ Status validation
- ✅ Update timestamp tracking

---

## Usage Examples

### Fetch User Profile with Image
```javascript
const response = await fetch('/api/user/profile?userId=user123');
const userData = await response.json();
console.log(userData.image); // User's profile image URL
```

### Update User Profile with New Image
```javascript
const response = await fetch('/api/user/profile', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    image: 'https://example.com/new-photo.jpg',
    name: 'John Updated'
  })
});
const result = await response.json();
console.log(result.msg); // "User updated successfully!"
```

### Fetch Card Print Queue
```javascript
const response = await fetch('/api/admin/cardqueue?status=pending&page=1');
const data = await response.json();
console.log(data.queues); // Array of pending orders
```

### Create Print Request
```javascript
const response = await fetch('/api/admin/cardqueue', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    quantity: 100,
    cardType: 'premium'
  })
});
const result = await response.json();
console.log(result.queue._id); // New queue ID
```

### Update Print Status
```javascript
const response = await fetch('/api/admin/cardqueue/queue123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'shipped' })
});
const result = await response.json();
console.log(result.message); // "Status updated successfully"
```

---

## Authentication

All endpoints use **NextAuth.js** for authentication. Ensure:
1. User is logged in (has active session)
2. Admin endpoints require `role === "admin"` or `isAdmin === true`
3. Session includes user `_id`, `email`, and `role`

---

## Error Handling

| Status Code | Meaning |
|------------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Database Models

### User Model
- Stores user profile with image field
- Image defaults to placeholder if not set
- Supports nested address objects

### CardPrintQueue Model
- Tracks card print orders
- Links to User via userId
- Maintains status history
- Records admin who created request

---

## File Locations

- User Profile Route: `/app/api/user/profile/route.js`
- Admin Card Queue Route: `/app/api/admin/cardqueue/route.js`
- Card Queue By ID Route: `/app/api/admin/cardqueue/[id]/route.js`

---

## Notes

- ✅ Images are validated (placeholder URLs filtered out)
- ✅ All endpoints log important actions for debugging
- ✅ Proper error messages for troubleshooting
- ✅ Admin-only endpoints check permissions
- ✅ User data is properly selected/populated
- ✅ Supports pagination for large datasets
