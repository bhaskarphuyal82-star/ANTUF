# User Chat Notification Feature - Implementation Guide

## Overview
This guide explains how to add real-time notifications to the User Chat component so users receive alerts when admins respond.

## Features to Add

### 1. Real-Time Polling
Add automatic polling to check for new messages every 5 seconds:

```javascript
useEffect(() => {
  if (session?.user?.id) {
    fetchChats();
    const interval = setInterval(fetchChats, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }
}, [session?.user?.id]);
```

### 2. Unread Message Counter
Add state for unread messages:

```javascript
const [unreadCount, setUnreadCount] = useState(0);
```

Calculate unread messages in fetchChats:

```javascript
// Check for new messages from admin
const newUnreadCount = data.reduce((acc, chat) => {
  const unreadMessages = chat.messages.filter(
    (msg) => !msg.isRead && msg.senderRole === "admin"
  );
  return acc + unreadMessages.length;
}, 0);
setUnreadCount(newUnreadCount);
```

### 3. Notification Sound
Add audio notification when new messages arrive:

```javascript
const playNotificationSound = () => {
  try {
    const audio = new Audio('/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
  } catch (error) {
    console.log('Notification sound error:', error);
  }
};
```

### 4. Visual Notifications
Add Material-UI imports:

```javascript
import {
  Badge,
  Alert,
  Snackbar,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
```

Add notification state:

```javascript
const [notification, setNotification] = useState(null);
```

Show notification when new message arrives:

```javascript
if (newUnreadCount > unreadCount && unreadCount >= 0) {
  if (newUnreadCount > 0) {
    playNotificationSound();
    const latestChat = data.find(chat => 
      chat.messages.some(msg => !msg.isRead && msg.senderRole === "admin")
    );
    if (latestChat) {
      setNotification({
        message: `New message from support agent regarding: ${latestChat.subject}`,
        chat: latestChat,
      });
    }
  }
}
```

### 5. UI Updates

#### Header Alert
Add after the main header:

```jsx
{unreadCount > 0 && (
  <Alert 
    severity="info" 
    icon={<NotificationsActiveIcon />}
    sx={{ mb: 2 }}
  >
    You have {unreadCount} new message{unreadCount > 1 ? 's' : ''} from support
  </Alert>
)}
```

#### Badge on Button
Wrap the "New Ticket" button:

```jsx
<Badge badgeContent={unreadCount} color="error">
  <Button variant="contained" ...>
    New Support Ticket
  </Button>
</Badge>
```

#### Unread Badge on Chats
In the chat list map:

```jsx
const unreadMessages = chat.messages.filter(
  (msg) => !msg.isRead && msg.senderRole === "admin"
).length;

// Then in the UI:
{unreadMessages > 0 && (
  <Badge badgeContent={unreadMessages} color="error" />
)}
```

#### Read Receipt
In message display:

```jsx
{msg.isRead && msg.senderRole === "user" && (
  <CheckCircleIcon sx={{ fontSize: 12, ml: 0.5, color: "#4caf50" }} />
)}
```

#### Snackbar Notification
Add at the end before closing tag:

```jsx
<Snackbar
  open={!!notification}
  autoHideDuration={6000}
  onClose={() => setNotification(null)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={() => setNotification(null)}
    severity="success"
    icon={<NotificationsActiveIcon />}
    sx={{ width: "100%" }}
  >
    {notification?.message}
  </Alert>
</Snackbar>
```

### 6. Mark Messages as Read
Update handleSelectChat:

```javascript
const handleSelectChat = async (chatRoom) => {
  setSelectedChat(chatRoom);
  setMessages(chatRoom.messages);

  // Mark messages as read
  try {
    await fetch(`/api/chat/${chatRoom._id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchChats(); // Refresh to update unread count
  } catch (error) {
    console.error("Error marking as read:", error);
  }
};
```

## API Updates Needed

### Add Read Endpoint
Create `/app/api/chat/[id]/read/route.js`:

```javascript
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    
    // Mark all admin messages as read
    await Chat.findByIdAndUpdate(id, {
      $set: {
        "messages.$[elem].isRead": true
      }
    }, {
      arrayFilters: [{ "elem.senderRole": "admin" }],
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Update Chat Schema
Ensure message schema includes isRead field:

```javascript
messages: [{
  content: String,
  senderRole: String,
  senderName: String,
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
}]
```

## Testing

1. **Create a ticket** as a user
2. **Reply as admin** from admin dashboard
3. **User should receive**:
   - Sound notification
   - Visual snackbar alert
   - Unread count badge
   - Alert banner
4. **Click the chat** to mark as read
5. **Unread indicators** should clear

## Browser Permissions

For sound notifications, users may need to interact with the page first (browser auto play restrictions).

## Production Considerations

- Replace polling with WebSocket for real-time updates
- Add push notifications for mobile
- Store notification preferences in user settings
- Add do-not-disturb mode
- Implement notification history

## Files Modified

- `/components/user/chat/UserChat.js` - Main chat component
- `/app/api/chat/[id]/read/route.js` - New API endpoint
- `/models/chat.js` - Chat schema (ensure isRead field)
- `/public/notification.mp3` - Notification sound file

## Status

✅ Video call feature complete  
🔄 User notification feature - pending implementation  
📋 Documentation provided

---

**Current Status**: The video call feature is fully implemented in admin chat. User chat notifications require the updates outlined above.
