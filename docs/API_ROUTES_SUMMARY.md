# API Routes Summary

## Created API Routes

### 1. Admin User Profile API
✅ **Location:** `/app/api/admin/users/profile/route.js`

**Methods:**
- `GET` - Fetch multiple users with search, filter, and pagination
- `POST` - Update user profile
- `DELETE` - Delete user

**Features:**
- Search by name or email
- Filter by active status and role
- Pagination (default 20 items per page)
- Image URL validation
- Admin authentication required

---

### 2. Admin User Profile by ID API
✅ **Location:** `/app/api/admin/users/[userId]/profile/route.js`

**Methods:**
- `GET` - Fetch specific user profile
- `PATCH` - Update specific user
- `DELETE` - Delete specific user

**Features:**
- Returns full user profile with all fields
- Includes citizenship documents
- Partial updates supported
- Prevents admin self-deletion
- Audit logging

---

## Existing API Routes (Already Implemented)

### 3. User Profile API
✅ **Location:** `/app/api/user/profile/route.js`

**Methods:**
- `GET` - Fetch user profile (with userId query for admins)
- `POST` - Update own profile or admin updates other users

**Features:**
- Personal profile management
- Image upload support
- Password hashing
- Admin can update any user's profile

---

### 4. Admin Card Queue API
✅ **Location:** `/app/api/admin/cardqueue/route.js`

**Methods:**
- `GET` - List card print orders with filtering
- `POST` - Create new print request

**Features:**
- Status filtering
- Pagination support
- User details population
- Admin only

---

### 5. Admin Card Queue by ID API
✅ **Location:** `/app/api/admin/cardqueue/[id]/route.js`

**Methods:**
- `GET` - Get specific order
- `PATCH` - Update order status

**Features:**
- Status validation
- Track who printed (printedBy)
- Timestamp tracking
- Admin only

---

## API Endpoints Quick Reference

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/user/profile` | GET | Get user profile | Session |
| `/api/user/profile` | POST | Update profile | Session |
| `/api/admin/users/profile` | GET | List users | Admin |
| `/api/admin/users/profile` | POST | Update user | Admin |
| `/api/admin/users/profile` | DELETE | Delete user | Admin |
| `/api/admin/users/{id}/profile` | GET | Get user details | Admin |
| `/api/admin/users/{id}/profile` | PATCH | Update user | Admin |
| `/api/admin/users/{id}/profile` | DELETE | Delete user | Admin |
| `/api/admin/cardqueue` | GET | List orders | Admin |
| `/api/admin/cardqueue` | POST | Create order | Admin |
| `/api/admin/cardqueue/{id}` | GET | Get order | Admin |
| `/api/admin/cardqueue/{id}` | PATCH | Update status | Admin |

---

## Use Cases & Integration Points

### Admin Orders Page
**File:** `/app/dashboard/admin/orders/page.js`
- ✅ Uses `/api/admin/cardqueue` to fetch orders
- ✅ Uses `/api/user/profile` to fetch user images
- ✅ Uses `/api/admin/cardqueue/[id]` to update status
- ✅ Displays user avatars with fallback

### Card Management Component
**File:** `/components/admin/CardManagement/AdminCardManagement.js`
- ✅ Uses `/api/admin/users/profile` to fetch members
- ✅ Displays user avatars with images
- ✅ Can view card preview with `AdminCardPrintViewer`
- ✅ Creates print requests via `/api/admin/cardqueue`

### Card Print Viewer
**File:** `/components/admin/CardPrint/AdminCardPrintViewer.js`
- ✅ Uses `/api/user/profile` to fetch full user details
- ✅ Displays user photo on card
- ✅ Can edit user photo via `/api/user/profile` POST
- ✅ Downloads card as PDF
- ✅ Prints card

---

## Key Features

### Image Management
✅ User profile images stored in database
✅ Automatic placeholder filtering
✅ Fallback to user initials in avatars
✅ Image editing in card viewer
✅ Image URL validation

### Admin Controls
✅ Search and filter users
✅ Pagination for large lists
✅ Update user profiles
✅ Manage user images
✅ Track card print orders
✅ Update order status
✅ Audit logging

### Security
✅ Admin authentication required
✅ Session-based (NextAuth.js)
✅ Admin-only endpoints protected
✅ Prevent self-deletion
✅ Field whitelisting
✅ Data validation

### User Experience
✅ Real-time image display
✅ Fast pagination
✅ Search functionality
✅ Loading states
✅ Error handling
✅ Toast notifications

---

## Documentation Files Created

1. **API_DOCUMENTATION.md** - Complete API reference
2. **ADMIN_USER_API.md** - Admin user management API
3. **API_INTEGRATION_GUIDE.md** - Integration examples and best practices

---

## Database Models Used

- **User** - User profile with image field
- **CardPrintQueue** - Card print orders
- **CardBulkOrder** - Bulk order management

---

## Authentication

All APIs use NextAuth.js with session-based authentication:
- Requires valid user session
- Admin endpoints check for admin role
- Admin can access other users' data
- Regular users can only access their own data

---

## Ready to Use

All APIs are fully implemented and ready for production:
- ✅ Error handling
- ✅ Input validation
- ✅ Pagination support
- ✅ Image handling
- ✅ Audit logging
- ✅ Admin controls

Start integrating with your components using the examples in `API_INTEGRATION_GUIDE.md`!
