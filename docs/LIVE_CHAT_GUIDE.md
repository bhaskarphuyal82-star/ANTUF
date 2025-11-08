# Live Chat System - Complete Guide

## Overview

The live chat system enables real-time communication between users and administrators with support for ticket management, priority assignment, and status tracking.

## Features

### User Features
- **Initiate Chats**: Users can start new conversations with support team
- **Category Selection**: Choose from General, Support, Billing, Technical, or Other
- **Priority Setting**: Set message priority (Low, Medium, High, Urgent)
- **Real-time Messaging**: Send and receive messages instantly
- **Chat History**: Access previous chat conversations
- **Status Tracking**: See if a chat is Active, Closed, or Archived
- **Auto-scroll**: Messages automatically scroll to latest message

### Admin Features
- **Chat Management**: View and manage all user support tickets
- **Real-time Polling**: Automatic updates every 3 seconds
- **Status Management**: Update chat status (Active, Closed, Archived)
- **Priority Filtering**: Filter chats by priority level
- **Status Filtering**: Filter chats by status
- **Chat Assignment**: Assign chats to team members
- **Bulk Operations**: Handle multiple chats simultaneously
- **User Information**: View user profile and chat history

## Database Schema

### ChatRoom Model

```javascript
{
  userId: ObjectId,                      // Reference to user
  userName: String,                      // User's name (denormalized)
  userEmail: String,                     // User's email
  userImage: String,                     // User's profile image
  adminId: ObjectId,                     // Assigned admin
  adminName: String,                     // Admin's name
  adminImage: String,                    // Admin's profile image
  messages: [Message],                   // Array of messages
  status: "active" | "closed" | "archived",
  subject: String,                       // Chat subject
  category: "general" | "support" | "billing" | "technical" | "other",
  priority: "low" | "medium" | "high" | "urgent",
  createdAt: Date,
  updatedAt: Date,
  lastMessageAt: Date
}
```

### Message Schema

```javascript
{
  senderId: ObjectId,                    // Reference to sender
  senderName: String,
  senderImage: String,
  senderRole: "user" | "admin",
  content: String,                       // Message text
  timestamp: Date,
  isRead: Boolean
}
```

## API Endpoints

### Get/Create Chat Rooms
**GET/POST** `/api/chat`

**GET Response:**
```json
[
  {
    "_id": "chat_id",
    "userId": "user_id",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "subject": "Need Help",
    "status": "active",
    "priority": "high",
    "messages": [],
    "createdAt": "2025-11-08T10:00:00Z"
  }
]
```

**POST Body:**
```json
{
  "subject": "Account Issue",
  "category": "technical",
  "priority": "high",
  "adminId": "admin_id"
}
```

### Get/Update/Delete Specific Chat
**GET/PATCH/DELETE** `/api/chat/[id]`

**PATCH Body:**
```json
{
  "message": "Hello, how can I help?",
  "status": "active",
  "category": "support",
  "priority": "high",
  "adminId": "admin_id"
}
```

## Component Usage

### User Chat Component

```javascript
import UserChat from "@/components/user/chat/UserChat";

export default function ChatPage() {
  return <UserChat />;
}
```

**Features:**
- Real-time messaging with auto-scroll
- New chat creation dialog
- Chat list with status indicators
- Message input with send functionality
- Category and priority selection

### Admin Chat Component

```javascript
import AdminChat from "@/components/admin/chat/AdminChat";

export default function AdminChatPage() {
  return <AdminChat />;
}
```

**Features:**
- Dashboard view of all user chats
- Real-time updates (3-second polling)
- Filter by status and priority
- Assign chats to team members
- Quick status updates
- User information display

## Workflow

### User Initiates Chat
1. User clicks "New Chat" button
2. Fills in subject, category, and priority
3. System creates new ChatRoom
4. Chat appears in admin dashboard
5. User can start sending messages

### Admin Responds
1. Admin sees new chat in dashboard
2. Clicks chat to open conversation
3. Assigns chat to themselves or team
4. Sends response message
5. User receives message in real-time

### Chat Lifecycle
```
New Chat (Active)
    ↓
    User ↔ Admin (Messages exchanged)
    ↓
    Status Updated: Closed
    ↓
    Chat Archived (Optional)
```

## Status Codes

### Chat Status
- **Active**: Ongoing conversation
- **Closed**: Conversation completed
- **Archived**: Chat moved to archive

### Priority Levels
- **Low**: General inquiries
- **Medium**: Standard support (default)
- **High**: Urgent issues
- **Urgent**: Critical problems requiring immediate attention

### Categories
- **General**: General questions
- **Support**: Customer support
- **Billing**: Payment/billing issues
- **Technical**: Technical problems
- **Other**: Miscellaneous

## Security Features

### Authorization
- Users can only see their own chats
- Admins can see all chats
- Message endpoints verify user ownership

### Validation
- Session validation required
- User ID verification
- Role-based access control

## Real-time Updates

### Auto-polling (Admin)
- Fetches updates every 3 seconds
- Preserves selected chat
- Updates message list
- Shows latest status

### User Side
- Sends messages via PATCH request
- Receives immediate response
- Updates displayed messages
- Auto-scrolls to latest message

## Performance Optimization

### Indexing
```javascript
ChatRoomSchema.index({ userId: 1, createdAt: -1 });
ChatRoomSchema.index({ adminId: 1, createdAt: -1 });
ChatRoomSchema.index({ status: 1 });
```

### Denormalization
- Store user/admin names in ChatRoom
- Avoid additional lookups
- Faster query performance

## Troubleshooting

### Chat Not Appearing
- Check user authentication
- Verify userId in ChatRoom
- Ensure database connection

### Messages Not Sending
- Check message input validation
- Verify API endpoint accessibility
- Review browser console errors

### Real-time Updates Not Working
- Check polling interval (3 seconds)
- Verify session authentication
- Clear browser cache

## Future Enhancements

1. **WebSocket Integration**: Replace polling with real-time WebSocket updates
2. **Typing Indicators**: Show when user is typing
3. **File Sharing**: Allow file uploads in chat
4. **Canned Responses**: Pre-written admin responses
5. **Chat Transcript**: Download chat history as PDF
6. **Analytics**: Chat metrics and trends
7. **Auto-assignment**: Automatically assign to least busy admin
8. **Chat Ratings**: User satisfaction feedback
9. **Rich Text Editor**: Formatted messages support
10. **Notification Sound**: Audio alerts for new messages

## Integration Guide

### Adding Chat Widget to Navbar
```javascript
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  
  return (
    <Box>
      {/* Other navbar items */}
      <Button onClick={() => router.push("/dashboard/user/chat")}>
        Messages
      </Button>
    </Box>
  );
}
```

## Support

For issues or questions about the chat system:
1. Check browser console for errors
2. Verify database connectivity
3. Review API response status codes
4. Check user authentication status
5. Review component PropTypes

---

**Last Updated**: November 8, 2025
**Version**: 1.0.0
**Status**: Production Ready
