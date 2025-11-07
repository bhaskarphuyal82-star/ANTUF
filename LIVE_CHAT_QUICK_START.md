# Live Chat System - Quick Start Reference Guide

## 🚀 Quick Links
- **User Chat Page**: `/dashboard/user/chat`
- **Admin Chat Page**: `/dashboard/admin/chat`
- **API Documentation**: See API Reference section below
- **Full Documentation**: See LIVE_CHAT_GUIDE.md, LIVE_CHAT_IMPLEMENTATION.md

---

## 📋 System Overview

The ANTUF Live Chat System provides:
- ✅ User-to-admin ticket-based messaging
- ✅ Real-time chat updates (polling at 3-second intervals)
- ✅ Priority & Category management
- ✅ Chat status tracking (active/closed/archived)
- ✅ Admin assignment & routing
- ✅ Comprehensive filtering (status, priority, category)
- ✅ Message history persistence
- ✅ Role-based authorization

---

## 🛠️ Setup (5 minutes)

### 1. Verify Installation
```bash
cd /Users/aasish/Project/antuf
npm install
```

### 2. Check Environment
```bash
# Verify .env.local contains:
# MONGODB_URI=your_mongodb_uri
# NEXTAUTH_SECRET=your_secret
# NEXTAUTH_URL=http://localhost:3000
```

### 3. Start Dev Server
```bash
npm run dev
# Opens on http://localhost:3000
```

### 4. Create Test Users (if needed)
```javascript
// In MongoDB:
db.users.insertMany([
  { name: "User", email: "user@test.com", role: "user" },
  { name: "Admin", email: "admin@test.com", role: "admin" }
])
```

---

## 👤 User Workflows

### Creating a New Chat Ticket

**Path**: `/dashboard/user/chat` → Click "New Chat"

**Required Fields**:
- Subject: Describe your issue
- Category: general, support, billing, technical, other
- Priority: low, medium, high, urgent

**What Happens**:
- Ticket assigned unique ID
- Admin notified (appears in their list)
- You can start messaging immediately

### Sending a Message

1. Select a chat from your list
2. Type message in text field
3. Click Send or press Enter
4. Message appears immediately for you
5. Admin sees it on their next poll (within 3 seconds)

### Tracking Status

Each chat shows:
- 🟢 **Active**: Open ticket, awaiting admin response
- 🔴 **Closed**: Ticket resolved
- 🟡 **Archived**: Ticket completed and archived

---

## 👨‍💼 Admin Workflows

### Viewing All Chats

**Path**: `/dashboard/admin/chat`

**What You See**:
- All user tickets in a table
- Sort by: Last message time (newest first)
- Columns: User, Subject, Status, Priority, Category, Last Message, Unread count

### Filtering Chats

Use the dropdown filters:
- **Status Filter**: active, closed, archived
- **Priority Filter**: low, medium, high, urgent
- Filters combine (e.g., "active + high priority")

### Responding to Users

1. Click on a chat in the table to select it
2. View full conversation history
3. Type your response in the text field
4. Click Send
5. User sees your message on their next refresh or within 3 seconds (polling)

### Managing Chat Priority

1. Select a chat
2. Click Priority dropdown
3. Select: low, medium, high, or urgent
4. Changes immediately saved

### Updating Chat Category

1. Select a chat
2. Click Category dropdown
3. Select: general, support, billing, technical, or other
4. Changes immediately saved

### Assigning Chat to Admin

1. Select a chat
2. Click "Assign" button
3. Select another admin from dropdown
4. Chat now shows as assigned to that admin
5. Both admins see the assignment

### Closing a Ticket

1. Select a chat
2. Click Status dropdown
3. Select "closed"
4. User can still view but not message
5. For future reference, can "archive" later

---

## 🔐 Authorization & Permissions

| Action | User | Admin |
|--------|------|-------|
| Create chat | ✅ | ✅ |
| Send message | ✅ | ✅ |
| View own chats | ✅ | ❌ |
| View all chats | ❌ | ✅ |
| Change status | ❌ | ✅ |
| Change priority | ❌ | ✅ |
| Change category | ❌ | ✅ |
| Assign chat | ❌ | ✅ |
| Close chat | ❌ | ✅ |
| Archive chat | ❌ | ✅ |

---

## 📡 API Reference

### Create Chat (User)
```
POST /api/chat
Authorization: Bearer USER_TOKEN

{
  "subject": "My Issue",
  "category": "technical",
  "priority": "high"
}

Response (201):
{ "_id": "...", "status": "active", "messages": [] }
```

### Get My Chats (User) / All Chats (Admin)
```
GET /api/chat
Authorization: Bearer TOKEN

Response (200): [ { chat1 }, { chat2 }, ... ]
```

### Send Message
```
PATCH /api/chat/:chatId
Authorization: Bearer TOKEN

{
  "message": "Your message here"
}

Response (200): { ..., "messages": [ { ... } ] }
```

### Update Status
```
PATCH /api/chat/:chatId
Authorization: Bearer ADMIN_TOKEN

{
  "status": "closed" | "archived" | "active"
}

Response (200): { ..., "status": "closed" }
```

### Assign Chat
```
PATCH /api/chat/:chatId
Authorization: Bearer ADMIN_TOKEN

{
  "adminId": "admin_user_id"
}

Response (200): { ..., "adminId": "..." }
```

---

## 🐛 Common Issues & Fixes

### Issue: "Chat not updating in real-time"
**Solution**: Feature uses 3-second polling, not WebSocket
- Refresh page to see updates immediately
- Wait up to 3 seconds for automatic refresh
- Check browser Network tab for `/api/chat` requests

### Issue: "Cannot send message"
**Solutions**:
- Ensure chat is selected (highlighted in list)
- Ensure message text is not empty
- Check browser console for errors
- Verify session is still active

### Issue: "Cannot see other user's chat as user"
**Solution**: Expected behavior! Users only see their own chats
- Admins can see all chats
- Users cannot access other user's conversations

### Issue: "Admin cannot change status"
**Solution**: Check you're logged in as admin
- Verify `role: "admin"` in database
- Logout and login again
- Check browser console: `console.log(session.user.role)`

### Issue: "Avatars not showing"
**Solution**: Feature has fallback avatars
- User image might not be loaded from URL
- System automatically generates SVG avatar
- Check user profile for image URL

---

## 📊 Monitoring & Debugging

### Check Chat Count
```javascript
// In admin chat page console:
const chats = document.querySelectorAll('tbody tr');
console.log('Total chats:', chats.length);
```

### Monitor Polling
```javascript
// Open admin console, watch Network tab
// Should see GET /api/chat requests every ~3 seconds
```

### Check Message Format
```javascript
// In MongoDB:
db.chatrooms.findOne({ _id: ObjectId("id") }).messages
```

### View User Session
```javascript
// In browser console:
import { useSession } from 'next-auth/react';
// useSession().data contains user info and role
```

---

## ⚙️ Configuration

### Polling Interval (Currently: 3 seconds)
**File**: `/components/admin/chat/AdminChat.js` (line ~57)
```javascript
const interval = setInterval(fetchChats, 3000); // milliseconds
```

**To adjust**:
1. Change `3000` to desired milliseconds
2. Restart dev server
3. Note: Shorter = more frequent updates but more server load

### Default Chat Category
**File**: `/app/api/chat/route.js` (line ~60)
```javascript
category: category || "general",
```

**To change default**:
1. Modify `"general"` to desired category
2. Redeploy

---

## 📱 Mobile Responsiveness

The chat interface is optimized for:
- ✅ Desktop (1920x1080)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667)

**Known Limitations**:
- Table view on mobile may require horizontal scroll
- Consider mobile-specific UI for production

---

## 🔒 Security Notes

1. **Authentication Required**: All endpoints require NextAuth session
2. **Authorization Enforced**: Users cannot access other user's chats
3. **Role-Based Access**: Admin-only actions require admin role
4. **Input Validation**: MongoDB schemas validate data types
5. **No SQL Injection**: Using Mongoose ORM prevents injection attacks

---

## 📝 Database Schema

### ChatRoom Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  userName: String,
  userEmail: String,
  userImage: String,
  adminId: ObjectId (ref: User, optional),
  adminName: String (optional),
  adminImage: String (optional),
  messages: [
    {
      senderId: ObjectId,
      senderName: String,
      senderImage: String,
      senderRole: String (enum: user, admin),
      content: String,
      timestamp: Date,
      isRead: Boolean
    }
  ],
  subject: String,
  category: String (enum: general, support, billing, technical, other),
  priority: String (enum: low, medium, high, urgent),
  status: String (enum: active, closed, archived),
  createdAt: Date,
  updatedAt: Date,
  lastMessageAt: Date
}
```

---

## 🚀 Performance Tips

1. **For Users**: 
   - Limit chat history display to improve UI performance
   - Consider pagination for 1000+ messages

2. **For Admins**:
   - Use filters to reduce visible chats
   - Archive resolved chats regularly
   - Monitor browser tab resource usage

3. **For Server**:
   - Implement database query caching
   - Consider upgrading to WebSocket for real-time
   - Set up database indices (already done in model)

---

## 📚 File Locations

| File | Purpose |
|------|---------|
| `/models/chat.js` | ChatRoom & Message schemas |
| `/app/api/chat/route.js` | Chat creation & listing |
| `/app/api/chat/[id]/route.js` | Messaging & updates |
| `/components/user/chat/UserChat.js` | User interface |
| `/components/admin/chat/AdminChat.js` | Admin interface |
| `/app/dashboard/user/chat/page.js` | User page route |
| `/app/dashboard/admin/chat/page.js` | Admin page route |

---

## 🔄 Real-Time Updates Strategy

**Current Implementation**: Polling (Recommended for MVP)
- Admin fetches all chats every 3 seconds
- User refreshes to see new admin messages
- Simple, requires no additional setup

**Future: WebSocket (Recommended for scale)**
- Real-time bidirectional communication
- Lower server load
- Reduced latency
- Requires: Socket.io or similar library

---

## 📞 Support & Help

### For Setup Issues
- Check `.env.local` configuration
- Verify MongoDB connection
- Review `LIVE_CHAT_SETUP_TESTING.md`

### For Testing
- See `LIVE_CHAT_AUTOMATED_TESTING.md` for comprehensive tests
- Check test workflows section

### For Deployment
- Follow `LIVE_CHAT_DEPLOYMENT_CHECKLIST.md`
- Verify all pre-deployment checks pass

### For Implementation Details
- See `LIVE_CHAT_IMPLEMENTATION.md`
- Review code comments in component files

---

## ✅ Verification Checklist

Before going live, verify:
- [ ] Dev server runs without errors: `npm run dev`
- [ ] User can create chat: `/dashboard/user/chat`
- [ ] User can send message
- [ ] Admin can see all chats: `/dashboard/admin/chat`
- [ ] Admin can respond to user
- [ ] Admin can change status
- [ ] Admin can assign chat
- [ ] Real-time updates working (check polling)
- [ ] No console errors
- [ ] Avatars display correctly
- [ ] Mobile responsive design works
- [ ] Database indices created

---

## 🎯 Next Steps

1. **Immediate**: Run through Quick Start Setup
2. **Short-term**: Complete Testing Workflows (see LIVE_CHAT_SETUP_TESTING.md)
3. **Before Deploy**: Run Deployment Checklist (LIVE_CHAT_DEPLOYMENT_CHECKLIST.md)
4. **Post-Deploy**: Monitor metrics and user feedback

---

## 📞 Questions?

Refer to these documents:
- **Setup Issues**: LIVE_CHAT_SETUP_TESTING.md
- **Testing**: LIVE_CHAT_AUTOMATED_TESTING.md
- **Deployment**: LIVE_CHAT_DEPLOYMENT_CHECKLIST.md
- **Architecture**: LIVE_CHAT_IMPLEMENTATION.md
- **User Guide**: LIVE_CHAT_GUIDE.md

---

**Last Updated**: 2024
**Version**: 1.0
**Status**: Production Ready
