# Admin Chat: Delete Messages & Close Chat Feature 🔒

## 🎯 Overview

This guide adds THREE powerful admin features:
1. **Delete Messages** - Remove individual messages
2. **Close Chat & Block User** - Close chat and prevent user from sending more messages
3. **Reopen Chat** - Reactivate closed chats

---

## 📋 Features to Add

### 1. Delete Message Button
- Shows on each message (admin hover)
- Confirmation dialog before deletion
- Updates chat in real-time

### 2. Close Chat Button
- Closes chat status
- Blocks user from sending messages
- Shows locked icon on closed chats

### 3. Reopen Chat Button
- Appears on closed chats
- Restores active status
- Unblocks user messages

---

## 🔨 Implementation

### Step 1: Update Chat Model

**File: `/models/chat.js`**

Add `blockUserMessages` field to schema:

```javascript
const ChatRoomSchema = new mongoose.Schema({
  // ...existing fields...
  status: {
    type: String,
    enum: ["active", "closed", "archived", "pending"],
    default: "active",
  },
  blockUserMessages: {
    type: Boolean,
    default: false,
  },
  // ...rest of fields...
});
```

### Step 2: Create API Route for Message Deletion

**File: `/app/api/chat/[id]/message/route.js` (NEW FILE)**

```javascript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/utils/dbConnect';
import ChatRoom from '@/models/chat';

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession();
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { messageId } = await req.json();

    const chat = await ChatRoom.findById(id);
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Remove message by timestamp or _id
    chat.messages = chat.messages.filter(
      msg => (msg._id && msg._id.toString() !== messageId) || 
             (msg.timestamp && msg.timestamp.toString() !== messageId)
    );

    await chat.save();

    return NextResponse.json(chat);
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
```

### Step 3: Update Chat PATCH Route

**File: `/app/api/chat/[id]/route.js`**

Update the PATCH handler to support `blockUserMessages`:

```javascript
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession();
    
    const { id } = params;
    const body = await req.json();
    
    const chat = await ChatRoom.findById(id);
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    // Update status
    if (body.status) {
      chat.status = body.status;
    }

    // Update blockUserMessages
    if (body.blockUserMessages !== undefined) {
      chat.blockUserMessages = body.blockUserMessages;
    }

    // Add message (check if user is blocked first)
    if (body.message) {
      // Check if user is blocked
      if (chat.blockUserMessages && session?.user?.role !== 'admin') {
        return NextResponse.json(
          { error: 'This chat has been closed. You cannot send messages.' },
          { status: 403 }
        );
      }

      chat.messages.push({
        content: body.message,
        senderRole: session?.user?.role === 'admin' ? 'admin' : 'user',
        senderName: session?.user?.name,
        senderImage: session?.user?.image,
        timestamp: new Date()
      });
    }

    // Update admin assignment
    if (body.adminId) {
      chat.adminId = body.adminId;
    }

    chat.updatedAt = new Date();
    chat.lastMessageAt = new Date();
    
    await chat.save();
    return NextResponse.json(chat);
    
  } catch (error) {
    console.error('Error updating chat:', error);
    return NextResponse.json(
      { error: 'Failed to update chat' },
      { status: 500 }
    );
  }
}
```

### Step 4: Update AdminChat Component

**File: `/components/admin/chat/AdminChat.js`**

#### 4.1: Add New Imports

```javascript
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
```

#### 4.2: Add New State Variables

```javascript
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [messageToDelete, setMessageToDelete] = useState(null);
const [closeDialogOpen, setCloseDialogOpen] = useState(false);
```

#### 4.3: Add Handler Functions

```javascript
const handleDeleteMessage = async () => {
  if (!messageToDelete || !selectedChat) return;

  try {
    const response = await fetch(`/api/chat/${selectedChat._id}/message`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId: messageToDelete._id || messageToDelete.timestamp,
      }),
    });

    if (response.ok) {
      const updatedChat = await response.json();
      setSelectedChat(updatedChat);
      setMessages(updatedChat.messages);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
      toast.success("Message deleted");
    } else {
      toast.error("Failed to delete message");
    }
  } catch (error) {
    console.error("Error deleting message:", error);
    toast.error("Failed to delete message");
  }
};

const handleCloseChat = async () => {
  if (!selectedChat) return;

  try {
    const response = await fetch(`/api/chat/${selectedChat._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        status: "closed",
        blockUserMessages: true 
      }),
    });

    if (response.ok) {
      const updatedChat = await response.json();
      setSelectedChat(updatedChat);
      setChatRooms(
        chatRooms.map((c) => (c._id === updatedChat._id ? updatedChat : c))
      );
      setCloseDialogOpen(false);
      toast.success("Chat closed and user messages blocked");
    } else {
      toast.error("Failed to close chat");
    }
  } catch (error) {
    console.error("Error closing chat:", error);
    toast.error("Failed to close chat");
  }
};

const handleReopenChat = async () => {
  if (!selectedChat) return;

  try {
    const response = await fetch(`/api/chat/${selectedChat._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        status: "active",
        blockUserMessages: false 
      }),
    });

    if (response.ok) {
      const updatedChat = await response.json();
      setSelectedChat(updatedChat);
      setChatRooms(
        chatRooms.map((c) => (c._id === updatedChat._id ? updatedChat : c))
      );
      toast.success("Chat reopened");
    } else {
      toast.error("Failed to reopen chat");
    }
  } catch (error) {
    console.error("Error reopening chat:", error);
    toast.error("Failed to reopen chat");
  }
};
```

#### 4.4: Update Message Display (Add Delete Button)

Find the messages rendering section and update it:

```javascript
{messages.map((msg, idx) => (
  <Box
    key={idx}
    sx={{
      display: "flex",
      justifyContent: msg.senderRole === "admin" ? "flex-end" : "flex-start",
      animation: "fadeIn 0.3s ease-in",
      position: "relative",
      "&:hover .delete-button": { opacity: 1 },
    }}
  >
    <Box
      sx={{
        maxWidth: "70%",
        bgcolor: msg.senderRole === "admin" ? "#2196F3" : "white",
        color: msg.senderRole === "admin" ? "white" : "#1a1a2e",
        p: 2,
        borderRadius: 3,
        boxShadow: 1,
        position: "relative",
      }}
    >
      {/* Delete Button - Only for admin */}
      <IconButton
        className="delete-button"
        size="small"
        onClick={() => {
          setMessageToDelete(msg);
          setDeleteDialogOpen(true);
        }}
        sx={{
          position: "absolute",
          top: -10,
          right: -10,
          opacity: 0,
          transition: "opacity 0.2s",
          bgcolor: "#f44336",
          color: "white",
          width: 24,
          height: 24,
          "&:hover": { bgcolor: "#d32f2f" },
        }}
      >
        <DeleteIcon sx={{ fontSize: 14 }} />
      </IconButton>

      <Typography
        variant="caption"
        sx={{
          color: msg.senderRole === "admin" ? "rgba(255,255,255,0.9)" : "#666",
          display: "block",
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        {msg.senderName}
      </Typography>
      <Typography variant="body1" sx={{ wordBreak: "break-word", lineHeight: 1.5 }}>
        {msg.content}
      </Typography>
      <Typography
        variant="caption"
        sx={{ 
          color: msg.senderRole === "admin" ? "rgba(255,255,255,0.8)" : "#999", 
          display: "block", 
          mt: 0.5,
          textAlign: "right",
        }}
      >
        {new Date(msg.timestamp).toLocaleTimeString()}
      </Typography>
    </Box>
  </Box>
))}
```

#### 4.5: Update Chat Header (Add Close/Reopen Button)

Update the header section to add close/reopen buttons:

```javascript
<Stack direction="row" spacing={1} alignItems="center">
  {/* Close/Reopen Chat Button */}
  {selectedChat.status === "closed" ? (
    <Tooltip title="Reopen Chat">
      <IconButton
        size="small"
        onClick={handleReopenChat}
        sx={{ 
          color: "#4caf50",
          bgcolor: "#e8f5e9",
          "&:hover": { bgcolor: "#c8e6c9" }
        }}
      >
        <LockOpenIcon />
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Close Chat & Block User">
      <IconButton
        size="small"
        onClick={() => setCloseDialogOpen(true)}
        sx={{ 
          color: "#f44336",
          bgcolor: "#ffebee",
          "&:hover": { bgcolor: "#ffcdd2" }
        }}
      >
        <LockIcon />
      </IconButton>
    </Tooltip>
  )}

  <Tooltip title="Start Video Call">
    <IconButton
      size="small"
      onClick={handleStartVideoCall}
      disabled={selectedChat.status === "closed"}
      sx={{ 
        color: selectedChat.status === "closed" ? "#999" : "#4caf50",
        bgcolor: selectedChat.status === "closed" ? "#f5f5f5" : "#e8f5e9",
        "&:hover": { bgcolor: selectedChat.status === "closed" ? "#f5f5f5" : "#c8e6c9" }
      }}
    >
      <VideocamIcon />
    </IconButton>
  </Tooltip>
  
  {/* ...existing buttons... */}
</Stack>
```

#### 4.6: Add Dialog Components

Add these dialogs before the closing `</Box>`:

```javascript
{/* Delete Message Confirmation Dialog */}
<Dialog 
  open={deleteDialogOpen} 
  onClose={() => setDeleteDialogOpen(false)}
  maxWidth="xs"
  fullWidth
>
  <DialogTitle sx={{ bgcolor: "#f44336", color: "white", fontWeight: 700 }}>
    Delete Message
  </DialogTitle>
  <DialogContent sx={{ mt: 2 }}>
    <Typography>
      Are you sure you want to delete this message? This action cannot be undone.
    </Typography>
    {messageToDelete && (
      <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          "{messageToDelete.content}"
        </Typography>
      </Box>
    )}
  </DialogContent>
  <DialogActions sx={{ p: 2 }}>
    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: "#666" }}>
      Cancel
    </Button>
    <Button
      onClick={handleDeleteMessage}
      variant="contained"
      sx={{ bgcolor: "#f44336", "&:hover": { bgcolor: "#d32f2f" } }}
    >
      Delete
    </Button>
  </DialogActions>
</Dialog>

{/* Close Chat Confirmation Dialog */}
<Dialog 
  open={closeDialogOpen} 
  onClose={() => setCloseDialogOpen(false)}
  maxWidth="sm"
  fullWidth
>
  <DialogTitle sx={{ bgcolor: "#ff9800", color: "white", fontWeight: 700 }}>
    Close Chat & Block User
  </DialogTitle>
  <DialogContent sx={{ mt: 2 }}>
    <Typography gutterBottom>
      This will:
    </Typography>
    <Box component="ul" sx={{ pl: 2 }}>
      <li>Close this chat</li>
      <li>Prevent the user from sending more messages</li>
      <li>Keep chat history intact</li>
    </Box>
    <Typography sx={{ mt: 2, color: "#f44336", fontWeight: 600 }}>
      The user will see a "Chat closed" message if they try to send messages.
    </Typography>
  </DialogContent>
  <DialogActions sx={{ p: 2 }}>
    <Button onClick={() => setCloseDialogOpen(false)} sx={{ color: "#666" }}>
      Cancel
    </Button>
    <Button
      onClick={handleCloseChat}
      variant="contained"
      sx={{ bgcolor: "#ff9800", "&:hover": { bgcolor: "#f57c00" } }}
      startIcon={<LockIcon />}
    >
      Close & Block
    </Button>
  </DialogActions>
</Dialog>
```

#### 4.7: Update Message Input (Disable if Closed)

Disable message input when chat is closed:

```javascript
<Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
  {selectedChat.status === "closed" && (
    <Box 
      sx={{ 
        mb: 2, 
        p: 2, 
        bgcolor: "#ffebee", 
        borderRadius: 2,
        border: "1px solid #f44336"
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LockIcon sx={{ color: "#f44336" }} />
        <Typography variant="body2" color="#f44336" fontWeight={600}>
          This chat is closed. User cannot send messages.
        </Typography>
      </Box>
    </Box>
  )}

  {/* Quick Responses */}
  <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
    {quickResponses.map((response, idx) => (
      <Chip
        key={idx}
        label={response.substring(0, 30) + "..."}
        size="small"
        onClick={() => setMessageInput(response)}
        disabled={selectedChat.status === "closed"}
        sx={{ 
          cursor: selectedChat.status === "closed" ? "not-allowed" : "pointer",
          "&:hover": { bgcolor: selectedChat.status === "closed" ? "" : "#e3f2fd" },
        }}
      />
    ))}
  </Box>
  
  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
    <TextField
      fullWidth
      placeholder={selectedChat.status === "closed" ? "Chat is closed" : "Type your response..."}
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter" && !e.shiftKey && selectedChat.status !== "closed") {
          e.preventDefault();
          handleSendMessage();
        }
      }}
      disabled={selectedChat.status === "closed"}
      multiline
      maxRows={4}
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: selectedChat.status === "closed" ? "#f5f5f5" : "#f5f5f5",
          "& fieldset": {
            borderColor: "#e0e0e0",
          },
        },
      }}
    />
    <Tooltip title="Attach File">
      <IconButton 
        sx={{ color: "#666" }}
        disabled={selectedChat.status === "closed"}
      >
        <AttachFileIcon />
      </IconButton>
    </Tooltip>
    <Button
      variant="contained"
      endIcon={<SendIcon />}
      onClick={handleSendMessage}
      disabled={!messageInput.trim() || selectedChat.status === "closed"}
      sx={{ 
        background: selectedChat.status === "closed" ? 
          "#e0e0e0" : 
          "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        minWidth: 100,
        height: 48,
      }}
    >
      Send
    </Button>
  </Box>
</Box>
```

---

## 🧪 Testing

### Test 1: Delete Message
1. Open AdminChat
2. Hover over any message
3. Click red delete button
4. Confirm deletion
5. ✅ Message should disappear

### Test 2: Close Chat & Block User
1. Open an active chat
2. Click lock icon in header
3. Confirm close & block
4. ✅ Chat status changes to "closed"
5. ✅ Message input disabled
6. ✅ User cannot send messages

### Test 3: User Tries to Send (When Closed)
1. User opens their chat
2. Try to send message
3. ✅ Should see error: "This chat has been closed"

### Test 4: Reopen Chat
1. Open closed chat
2. Click unlock icon
3. ✅ Chat status changes to "active"
4. ✅ Message input enabled
5. ✅ User can send messages again

---

## 📊 Summary

### Admin Can Now:
- ✅ Delete any message (with confirmation)
- ✅ Close chat and block user messages
- ✅ Reopen closed chats
- ✅ See visual indicators for closed chats

### User Experience:
- ❌ Cannot send messages when chat is closed
- ✅ Sees clear error message
- ✅ Can still view chat history
- ✅ Can send again when admin reopens

---

**Status:** Ready to implement  
**Complexity:** Medium  
**Time to implement:** 30-45 minutes
