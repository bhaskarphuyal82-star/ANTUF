# Live Chat System - Setup & Testing Guide

## Overview
The live chat system provides a complete communication channel between users and administrators. It includes ticket creation, real-time messaging, status/priority/category management, assignment, and filtering capabilities.

## Architecture

### Database Models
- **ChatRoom**: Main chat room schema with messages, status, category, priority, and assignment
- **Message**: Embedded schema within ChatRoom for individual messages

### API Routes
- **GET/POST /api/chat**: List all chats (admin) or user's chats (user), create new chat
- **GET/PATCH /api/chat/[id]**: Get specific chat, send messages, update status/priority/category, assign admin

### Frontend Components
- **UserChat.js**: User-side chat interface with chat list and messaging
- **AdminChat.js**: Admin-side chat interface with filtering, assignment, and status management

### Page Routes
- **/app/dashboard/user/chat**: User chat page
- **/app/dashboard/admin/chat**: Admin chat page

---

## Quick Setup Guide

### Prerequisites
- Node.js and npm installed
- MongoDB connection active (check `.env.local`)
- Next.js development server running
- NextAuth.js configured with user authentication

### Step 1: Verify Environment Setup
Ensure your `.env.local` contains:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application should be available at `http://localhost:3000`.

### Step 3: Test User Login
1. Navigate to your login page
2. Sign in as a regular user
3. Go to `/dashboard/user/chat` to access the user chat interface

### Step 4: Test Admin Login
1. Sign in as an admin user (user with `role: "admin"`)
2. Go to `/dashboard/admin/chat` to access the admin chat interface

---

## Testing Workflows

### Workflow 1: User Creates a New Chat Ticket

**Setup:**
- User is logged in

**Steps:**
1. Navigate to `/dashboard/user/chat`
2. Click "New Chat" button
3. Fill in the form:
   - **Subject**: "Issue with course materials"
   - **Category**: "technical"
   - **Priority**: "high"
4. Click "Create Chat"

**Expected Results:**
- New chat room created in MongoDB
- Chat appears in user's chat list
- Chat status is "active"
- User can now send messages

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ userId: ObjectId("user_id"), subject: "Issue with course materials" })
// Should show:
// - messages: []
// - status: "active"
// - category: "technical"
// - priority: "high"
```

---

### Workflow 2: User Sends a Message

**Prerequisites:**
- User has an active chat room created

**Steps:**
1. Select a chat from the list
2. Type a message: "The video player is not working"
3. Click Send (or press Enter)

**Expected Results:**
- Message appears in the chat immediately
- Message contains:
  - `content`: "The video player is not working"
  - `senderRole`: "user"
  - `senderName`: User's name
  - `timestamp`: Current time
  - `isRead`: false
- Chat's `lastMessageAt` updated
- Chat appears at top of list (sorted by `lastMessageAt`)

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// Should show new message in messages array
```

---

### Workflow 3: Admin Views All Chats

**Setup:**
- Admin is logged in
- Multiple user chats exist with various statuses/priorities

**Steps:**
1. Navigate to `/dashboard/admin/chat`
2. Observe the chat list table

**Expected Results:**
- Table shows all active chat rooms
- Columns visible:
  - User name
  - Subject
  - Status (with color coding)
  - Priority (with color coding)
  - Category
  - Last message time
  - Unread count
- Chats sorted by `lastMessageAt` (newest first)

**Verification:**
- Admin should see all chats from different users
- Status colors: active=green, closed=red, archived=yellow
- Priority colors: low=blue, medium=orange, high=red, urgent=red+bold

---

### Workflow 4: Admin Responds to User

**Prerequisites:**
- Admin is logged in
- A user chat is selected in the chat list

**Steps:**
1. Click on a user's chat in the table
2. Chat loads with full message history
3. Type response: "Thank you for reporting this. We'll look into it."
4. Click Send

**Expected Results:**
- Admin's message appears in chat
- Message marked with `senderRole`: "admin"
- Message shows admin's name and avatar
- User can see the new message (real-time or on refresh)
- Timestamps update correctly

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// Should show admin message in messages array
```

---

### Workflow 5: Admin Changes Chat Status

**Prerequisites:**
- Admin has a chat selected

**Steps:**
1. Click the status dropdown (currently showing "active")
2. Select "closed" or "archived"

**Expected Results:**
- Chat room status updates immediately
- UI reflects the new status
- Chat color coding changes
- Toast notification shows: "Chat closed" or "Chat archived"
- Chat can still be viewed but not messaged (if closed)

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// status field should be "closed" or "archived"
```

---

### Workflow 6: Admin Updates Priority and Category

**Prerequisites:**
- Admin has a chat selected

**Steps:**
1. Click priority dropdown (currently showing "medium")
2. Select "high" or "urgent"
3. Click category dropdown (currently showing "general")
4. Select "billing" or "support"

**Expected Results:**
- Priority and category update immediately
- Changes reflected in chat list
- No page reload needed

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// Should show updated priority and category
```

---

### Workflow 7: Admin Assigns Chat to Another Admin

**Prerequisites:**
- Admin is viewing a chat
- Another admin exists in the system
- Chat is not assigned yet (or reassign)

**Steps:**
1. Click "Assign" button
2. Select another admin from the dropdown
3. Confirm assignment

**Expected Results:**
- Chat's `adminId` updates to selected admin's ID
- `adminName` and `adminImage` populate
- Chat remains visible to both admins
- Toast shows: "Chat assigned to [Admin Name]"

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// adminId should be set to selected admin's ID
```

---

### Workflow 8: Admin Filters Chats

**Prerequisites:**
- Multiple chats with different statuses/priorities

**Steps:**
1. Use Status Filter dropdown
2. Select "active", "closed", or "archived"
3. Use Priority Filter dropdown
4. Select different priority levels

**Expected Results:**
- Chat list filters in real-time
- Only matching chats displayed
- Filter combinations work (e.g., "active" + "high")
- Clear filters to show all

**Verification:**
- Visually confirm only matching chats shown
- Check browser console for no errors

---

### Workflow 9: Real-time Chat Updates (Polling)

**Prerequisites:**
- Two browsers open: one as user, one as admin
- User has a chat created

**Steps:**
1. User sends a message in Browser 1
2. Observe Browser 2 (admin)
3. Admin should see the message appear within 3 seconds (polling interval)
4. Admin responds
5. Observe Browser 1 (user)
6. User should see response after refresh or within polling interval

**Expected Results:**
- Admin sees user messages within 3 seconds due to polling
- User can see admin responses
- No WebSocket yet (future enhancement), so polling at 3-second intervals

**Verification:**
- Check browser Network tab for GET requests to `/api/chat` every ~3 seconds
- Console shows no errors

---

### Workflow 10: Chat History & Persistence

**Prerequisites:**
- Chat with multiple messages created

**Steps:**
1. Refresh the page
2. Navigate away and back to chat
3. Verify message history still visible

**Expected Results:**
- All previous messages remain
- Chat history persists in MongoDB
- Message order maintained (chronological)
- Timestamps preserved

**Verification:**
```javascript
// Check MongoDB
db.chatrooms.findOne({ _id: ObjectId("chatroom_id") })
// messages array should be unchanged after refresh
```

---

## Error Handling & Troubleshooting

### Common Issues

#### 1. **"Unauthorized" Error When Creating Chat**
- **Cause**: User not authenticated or session expired
- **Fix**: 
  - Ensure NextAuth session is valid
  - Check browser cookies for `next-auth.session-token`
  - Re-login if needed

#### 2. **Chat Not Appearing in List**
- **Cause**: 
  - Database connection issue
  - User ID mismatch in chat room
  - API not returning data
- **Fix**:
  - Check MongoDB connection in `.env.local`
  - Verify `userId` in ChatRoom matches current user
  - Check browser console for API errors
  - Check server terminal for database errors

#### 3. **Messages Not Sending**
- **Cause**:
  - Selected chat is null
  - Message content empty
  - API error
  - User model issue
- **Fix**:
  - Ensure a chat is selected before sending
  - Type message content in text field
  - Check server logs for detailed error
  - Verify User model has `name`, `email`, `image` fields

#### 4. **Admin Can't See User Chats**
- **Cause**:
  - Admin role not properly set in database
  - Authorization check failing
- **Fix**:
  - Verify user `role` field is "admin" in MongoDB
  - Check `/api/chat` route authorization logic
  - Check server logs: `session.user.role`

#### 5. **Polling Not Working (Real-time Updates)**
- **Cause**:
  - JavaScript interval not running
  - API error during polling
  - Selected chat changed during poll
- **Fix**:
  - Open browser DevTools → Network tab
  - Should see GET requests to `/api/chat` every ~3 seconds
  - Check console for errors
  - Verify session still valid

---

## Testing Checklist

### Frontend Tests
- [ ] User can create new chat
- [ ] User can send message
- [ ] User can see message history
- [ ] Admin can view all chats
- [ ] Admin can send message
- [ ] Admin can change status (active/closed/archived)
- [ ] Admin can update priority
- [ ] Admin can update category
- [ ] Admin can assign chat to another admin
- [ ] Filter by status works
- [ ] Filter by priority works
- [ ] Chat list updates on new message (polling)
- [ ] Messages scroll to bottom automatically
- [ ] Avatars display with fallback
- [ ] Color coding for status/priority displays correctly

### Backend Tests
- [ ] POST /api/chat creates chat room correctly
- [ ] GET /api/chat returns filtered results (user vs admin)
- [ ] PATCH /api/chat/[id] adds message
- [ ] PATCH /api/chat/[id] updates status
- [ ] PATCH /api/chat/[id] updates priority/category
- [ ] PATCH /api/chat/[id] assigns admin
- [ ] Authorization checks work
- [ ] Messages indexed in messages array
- [ ] Timestamps recorded correctly
- [ ] User/admin metadata stored correctly

### Database Tests
- [ ] ChatRoom created with correct fields
- [ ] Message embedded in ChatRoom.messages
- [ ] Indices created for userId, adminId, status
- [ ] User references work (populate)
- [ ] Timestamps auto-generated

### UI/UX Tests
- [ ] Loading states display
- [ ] Error toasts show correctly
- [ ] Success messages appear
- [ ] Responsive design on mobile
- [ ] Buttons disabled when appropriate
- [ ] Form validation works

---

## API Reference

### Create Chat
```
POST /api/chat
Body: {
  subject: string,
  category: string (enum: general, support, billing, technical, other),
  priority: string (enum: low, medium, high, urgent),
  adminId?: string (optional)
}
Response: ChatRoom object
```

### Get Chats
```
GET /api/chat
Response: Array of ChatRoom objects
```

### Send Message / Update Chat
```
PATCH /api/chat/[id]
Body: {
  message?: string,
  status?: string (enum: active, closed, archived),
  category?: string,
  priority?: string,
  adminId?: string
}
Response: Updated ChatRoom object
```

---

## Performance Considerations

1. **Polling Interval**: Currently set to 3 seconds. For production, consider:
   - Increasing to 5-10 seconds if many concurrent users
   - Implementing WebSocket for real-time updates
   - Adding request debouncing

2. **Message Pagination**: Currently loads all messages in chat. For production:
   - Implement pagination for large chat histories
   - Load last 50 messages initially
   - Load older messages on scroll

3. **Database Indices**: Chatroom model includes:
   - `userId: 1, createdAt: -1` for user chat list
   - `adminId: 1, createdAt: -1` for admin assignment
   - `status: 1` for filtering

---

## Future Enhancements

1. **WebSocket Integration**
   - Replace polling with WebSocket for real-time updates
   - Reduce server load

2. **File Sharing**
   - Allow file uploads in chat
   - Store files in S3 or similar

3. **Typing Indicators**
   - Show "User is typing..." indicator
   - Implement via WebSocket

4. **Canned Responses**
   - Admin templates for common responses
   - Quick-send buttons

5. **Chat Analytics**
   - Average response time
   - Chat resolution rate
   - Satisfaction ratings

6. **Chat Search**
   - Search messages across all chats
   - Filter by date range

7. **Notifications**
   - Email notifications for new messages
   - Browser push notifications

8. **Chat Transcripts**
   - Export chat history as PDF
   - Email transcript to user

---

## Deployment Notes

### Pre-Production Checklist
- [ ] Test with production database
- [ ] Load test with multiple concurrent users
- [ ] Security audit of authorization checks
- [ ] Rate limiting on API routes
- [ ] Error logging configured
- [ ] Monitoring for API response times
- [ ] Backup strategy for chat data

### Environment Variables
```env
MONGODB_URI=production_mongodb_uri
NEXTAUTH_SECRET=secure_random_string
NEXTAUTH_URL=https://yourdomain.com
NODE_ENV=production
```

---

## Support & Documentation

For additional information, see:
- `LIVE_CHAT_GUIDE.md` - User guide
- `LIVE_CHAT_IMPLEMENTATION.md` - Implementation details
- `LIVE_CHAT_COMPLETE.md` - Feature completeness
- Server logs at application startup for database connection status
