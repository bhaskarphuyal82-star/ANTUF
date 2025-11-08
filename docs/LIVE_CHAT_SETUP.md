# Live Chat System - Quick Setup Guide

## 🚀 Quick Start

The live chat system is now fully integrated and ready to use!

### Access Chat Rooms

#### For Users
```
URL: http://localhost:3000/dashboard/user/chat
```

**Steps:**
1. Log in as a user
2. Go to Dashboard
3. Click "Messages" or navigate to `/dashboard/user/chat`
4. Click "New Chat" to start conversation
5. Select category, priority, and enter subject
6. Start messaging immediately

#### For Admins
```
URL: http://localhost:3000/dashboard/admin/chat
```

**Steps:**
1. Log in as admin
2. Go to Admin Dashboard
3. Click "Support Chat" or navigate to `/dashboard/admin/chat`
4. View all user tickets
5. Use filters to find specific chats
6. Click to open conversation
7. Respond and manage status

---

## 🔧 System Architecture

### Backend Structure
```
📁 models/
  └── chat.js                 (ChatRoom & Message schemas)

📁 app/api/chat/
  ├── route.js               (GET/POST - list & create)
  └── [id]/route.js          (GET/PATCH/DELETE - individual)

📁 app/dashboard/
  ├── user/chat/page.js      (User chat page)
  └── admin/chat/page.js     (Admin chat page)

📁 components/
  ├── user/chat/UserChat.js  (User component)
  └── admin/chat/AdminChat.js (Admin component)
```

### API Endpoints
```
GET  /api/chat              - Get chats
POST /api/chat              - Create new chat
GET  /api/chat/[id]         - Get specific chat
PATCH /api/chat/[id]        - Update/add message
DELETE /api/chat/[id]       - Delete chat
```

---

## 💡 Key Features

### User Features
- ✅ Create support tickets
- ✅ Real-time messaging
- ✅ Category selection
- ✅ Priority setting
- ✅ Chat history
- ✅ Status tracking

### Admin Features
- ✅ View all tickets
- ✅ Real-time updates
- ✅ Filter by status/priority
- ✅ Assign tickets
- ✅ Update status
- ✅ Respond to users

---

## 🎨 UI Components

### User Chat Interface
- **Left Panel**: Chat list with filters
- **Right Panel**: Message window
- **New Chat Button**: Create conversation
- **Message Input**: Type and send messages
- **Status Badges**: Show chat status

### Admin Dashboard
- **Header**: Filters for status & priority
- **Chat List**: All user tickets
- **Message Window**: Conversation view
- **Action Buttons**: Status updates, assignment
- **Real-time Updates**: Auto-refresh every 3 seconds

---

## 🔐 Security & Auth

### Access Control
- Users: Can only see their own chats
- Admins: Can see all chats
- Endpoint: Protected with NextAuth

### Validation
- Session verification required
- Role-based permissions
- User ownership checks

---

## 📊 Database Schema

### ChatRoom Fields
```javascript
{
  userId: ObjectId,
  userName: String,
  userEmail: String,
  userImage: String,
  adminId: ObjectId,
  adminName: String,
  adminImage: String,
  messages: [Message],
  status: String,          // active, closed, archived
  subject: String,
  category: String,        // general, support, billing, technical, other
  priority: String,        // low, medium, high, urgent
  createdAt: Date,
  updatedAt: Date,
  lastMessageAt: Date
}
```

### Message Fields
```javascript
{
  senderId: ObjectId,
  senderName: String,
  senderImage: String,
  senderRole: String,      // user or admin
  content: String,
  timestamp: Date,
  isRead: Boolean
}
```

---

## 🔄 Workflow Example

### Scenario: User Reports Issue

**Step 1: User Creates Chat**
```
User → Dashboard → Messages → New Chat
Subject: "Payment not working"
Category: "Billing"
Priority: "High"
```

**Step 2: System Creates ChatRoom**
```json
{
  userId: "user123",
  userName: "Ram limbu",
  userEmail: "ram@example.com",
  subject: "Payment not working",
  category: "billing",
  priority: "high",
  status: "active"
}
```

**Step 3: User Sends Message**
```
User: "I'm unable to pay for my subscription"
```

**Step 4: Admin Sees Ticket**
```
Admin → Dashboard → Support Chat
New ticket from: Ram limbu
Status: Active, Priority: High
```

**Step 5: Admin Responds**
```
Admin: "Hi Ram, let me help. Can you provide more details?"
```

**Step 6: User Sees Response (Real-time)**
```
Message appears instantly in user's chat
```

**Step 7: Chat Continues**
```
Back and forth until issue resolved
```

**Step 8: Admin Closes Chat**
```
Admin sets status to "Closed"
Chat archived
```

---

## 🧪 Testing Checklist

### User Side
- [ ] Create new chat
- [ ] Select category and priority
- [ ] Send message
- [ ] View message in history
- [ ] See admin responses in real-time
- [ ] See chat status

### Admin Side
- [ ] View all user chats
- [ ] Filter by status
- [ ] Filter by priority
- [ ] Open specific chat
- [ ] Send response message
- [ ] Update chat status
- [ ] Assign chat
- [ ] See real-time updates

### Integration
- [ ] Chat icon in navbar
- [ ] Redirect to chat page
- [ ] Session persistence
- [ ] Mobile responsiveness

---

## 📈 Performance Tips

### Optimization Done
✅ Database indexing on userId, adminId, status
✅ Denormalized user data in ChatRoom
✅ Efficient API queries
✅ 3-second polling interval (not too fast)

### Future Optimizations
- WebSocket for real-time updates
- Message pagination
- Caching strategies
- Rate limiting

---

## 🆘 Troubleshooting

### Issue: Chat not appearing
**Solution:**
1. Check user authentication
2. Verify database connection
3. Check browser console for errors

### Issue: Messages not sending
**Solution:**
1. Verify API is running
2. Check message input validation
3. Look for network errors

### Issue: Admin not seeing new chats
**Solution:**
1. Ensure polling is working (every 3 sec)
2. Check admin role in session
3. Refresh the page

### Issue: Real-time updates slow
**Solution:**
1. Check network connection
2. Verify database performance
3. Consider WebSocket upgrade

---

## 📚 Related Documentation

- **LIVE_CHAT_GUIDE.md** - Complete feature documentation
- **LIVE_CHAT_IMPLEMENTATION.md** - Implementation details
- **README.md** - General project overview

---

## 🎯 Next Steps

1. **Test in Development**
   - Verify both user and admin interfaces
   - Send test messages
   - Check real-time updates

2. **Integrate with UI**
   - Add chat icon to navbar
   - Add notifications badge
   - Create notification sound

3. **Monitor Production**
   - Track chat metrics
   - Monitor response times
   - Collect user feedback

4. **Enhance Features**
   - Add file uploads
   - Implement WebSocket
   - Create canned responses

---

## 📞 Support

For issues or questions:
1. Check browser console (F12)
2. Review server logs
3. Check API responses
4. Verify database connection

---

**Setup Status**: ✅ Complete
**Last Updated**: November 8, 2025
**Version**: 1.0.0
