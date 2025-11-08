# Live Chat System - Visual Guide & Role-Based Workflows

## 📊 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      ANTUF Platform                         │
└─────────────────────────────────────────────────────────────┘
         ↑                                    ↑
    USER SIDE                            ADMIN SIDE
         │                                    │
    ┌────────────────┐              ┌────────────────┐
    │  User Browser  │              │ Admin Browser  │
    └────────────────┘              └────────────────┘
         │                                    │
         │  /dashboard/user/chat             │  /dashboard/admin/chat
         │                                    │
    ┌────────────────────────────────────────────────────────┐
    │         Next.js Application Layer                      │
    │  ┌──────────────────┐  ┌──────────────────────────┐  │
    │  │ UserChat.js      │  │ AdminChat.js             │  │
    │  │ - Create chat    │  │ - View all chats         │  │
    │  │ - Send message   │  │ - Filter by status       │  │
    │  │ - View history   │  │ - Filter by priority     │  │
    │  │ - Track status   │  │ - Respond to users       │  │
    │  └──────────────────┘  │ - Assign chats           │  │
    │                        │ - Update status/priority │  │
    │                        └──────────────────────────┘  │
    └────────────────────────────────────────────────────────┘
         ↑                        ↑
         │                        │
    ┌────────────────────────────────────────────────────────┐
    │              API Routes Layer                          │
    │  ┌──────────────────────────────────────────────────┐ │
    │  │ GET/POST /api/chat                              │ │
    │  │ - Create new chat (POST)                        │ │
    │  │ - Get user's chats (GET as user)                │ │
    │  │ - Get all chats (GET as admin)                  │ │
    │  │                                                 │ │
    │  │ PATCH /api/chat/[id]                            │ │
    │  │ - Send message                                  │ │
    │  │ - Update status (admin only)                    │ │
    │  │ - Update priority (admin only)                  │ │
    │  │ - Update category (admin only)                  │ │
    │  │ - Assign to admin (admin only)                  │ │
    │  └──────────────────────────────────────────────────┘ │
    │         ↓                                              │
    │  ┌──────────────────────────────────────────────────┐ │
    │  │ NextAuth Validation Layer                        │ │
    │  │ - Verify session                                │ │
    │  │ - Check user role (user/admin)                  │ │
    │  │ - Enforce authorization                         │ │
    │  └──────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────────────────────────┐
    │              MongoDB Database Layer                    │
    │  ┌──────────────────────────────────────────────────┐ │
    │  │ ChatRoom Collection                              │ │
    │  │ - Document per conversation                      │ │
    │  │ - Embedded messages (one-to-many)                │ │
    │  │ - User & Admin metadata                          │ │
    │  │ - Status, Priority, Category                     │ │
    │  │ - Timestamps & Read status                       │ │
    │  │ - Indices for performance                        │ │
    │  └──────────────────────────────────────────────────┘ │
    └────────────────────────────────────────────────────────┘
```

---

## 🔄 User Workflow - Step by Step

### Step 1: User Logs In
```
User navigates to /dashboard/user/chat
     ↓
NextAuth checks session
     ↓
If authenticated: Load UserChat component
If not: Redirect to login
```

### Step 2: User Views Chat List
```
UserChat.js
     ↓
Fetches GET /api/chat
     ↓
API validates session (must be user)
     ↓
Returns only THIS user's chats from MongoDB
     ↓
Component displays chats in list
     ↓
User sees:
  • Chat subject
  • Status (active/closed/archived)
  • Priority (low/medium/high/urgent)
  • Last message time
  • Unread count
```

### Step 3: User Creates New Chat
```
User clicks "New Chat" button
     ↓
Dialog opens with form
     ↓
User fills:
  • Subject: "Video player not working"
  • Category: "technical"
  • Priority: "high"
     ↓
User clicks "Create Chat"
     ↓
POST /api/chat with data
     ↓
API validates inputs
API creates new ChatRoom document
API returns chat with _id
     ↓
Component adds to chat list
Component selects newly created chat
Component shows empty message area
```

### Step 4: User Sends Message
```
User selects chat (or newly created chat selected)
     ↓
User types message in text field
     ↓
User clicks Send or presses Enter
     ↓
PATCH /api/chat/:chatId with message content
     ↓
API validates:
  • Session active
  • User owns this chat
  • Message not empty
     ↓
API creates Message object:
  • senderId: user's ID
  • senderName: user's name
  • senderRole: "user"
  • content: message text
  • timestamp: now
  • isRead: false
     ↓
API pushes to chatRoom.messages array
API updates lastMessageAt
API returns updated chat
     ↓
Component adds message to display
Component scrolls to bottom
Component clears input field
Component shows success toast
```

### Step 5: User Receives Admin Response
```
Admin sends response (see Admin Workflow)
     ↓
ChatRoom updated in MongoDB with new message
     ↓
User is on chat page - sees message when?
  Option A: Right away (if polling implemented on user side)
  Option B: On page refresh
  Option C: When they navigate away and back
     ↓
Typically on refresh or within polling interval
     ↓
Component fetches GET /api/chat
     ↓
Latest message appears in conversation
     ↓
User reads response from admin
```

### Step 6: Chat Status Changes
```
Admin closes the chat (see Admin Workflow)
     ↓
ChatRoom.status changes from "active" to "closed"
     ↓
On user's next fetch or refresh:
     ↓
Component sees status: "closed"
     ↓
Component shows chat as closed
Component may disable message input
     ↓
User cannot send new messages to closed chat
     ↓
User can still view chat history
```

---

## 👨‍💼 Admin Workflow - Step by Step

### Step 1: Admin Logs In
```
Admin navigates to /dashboard/admin/chat
     ↓
NextAuth checks session
     ↓
Checks if user.role === "admin"
     ↓
If admin: Load AdminChat component
If not: Redirect to homepage
```

### Step 2: Admin Views All Chats
```
AdminChat.js mounts
     ↓
fetchChats() runs immediately
     ↓
GET /api/chat
     ↓
API validates session
API checks role === "admin"
     ↓
Returns ALL chats from all users
Sorted by lastMessageAt (newest first)
     ↓
Component renders table with rows:
  Row 1: [User 1] [Subject 1] [Status] [Priority] [Time] [Unread: 2]
  Row 2: [User 2] [Subject 2] [Status] [Priority] [Time] [Unread: 0]
  ...
     ↓
Admin sees dashboard overview
```

### Step 3: Admin Polls for Updates (Automatic)
```
Component useEffect runs
     ↓
Sets interval: setInterval(fetchChats, 3000)
     ↓
Every 3 seconds:
  GET /api/chat (if tab active)
     ↓
New chats appear at top of table
Unread counts update
Last message times update
     ↓
Admin sees real-time updates without manual refresh
```

### Step 4: Admin Filters Chats
```
Admin clicks Status Filter dropdown
     ↓
Options: "All", "active", "closed", "archived"
     ↓
Admin selects "high" in Priority Filter
     ↓
Table re-renders to show only:
  - Active chats
  - With high priority
     ↓
Other chats fade from view
Admin can focus on urgent tickets
```

### Step 5: Admin Selects a Chat
```
Admin clicks on a table row
     ↓
selectedChat state updated
     ↓
Component loads full chat details:
  • User name & image
  • Subject & category
  • Full message history
  • Current status & priority
     ↓
Message area shows all messages chronologically:
  [User message 1]
  [User message 2]
  [Admin message 1]
  [User message 3]
     ↓
Admin can see full conversation context
```

### Step 6: Admin Responds to User
```
Admin types message in text field
     ↓
Admin clicks Send or presses Enter
     ↓
PATCH /api/chat/:chatId with message content
     ↓
API validates:
  • Session active
  • User has admin role
  • Message not empty
     ↓
API creates Message object:
  • senderId: admin's ID
  • senderName: admin's name
  • senderRole: "admin"
  • content: message text
  • timestamp: now
  • isRead: false
     ↓
API pushes to chatRoom.messages
API updates lastMessageAt
API returns updated chat
     ↓
Component updates display
Admin sees their message in conversation
Message shown in admin color/style
     ↓
User sees message on their next refresh/poll
```

### Step 7: Admin Changes Priority
```
Admin clicks Priority dropdown
     ↓
Options: "low", "medium", "high", "urgent"
     ↓
Admin selects "urgent"
     ↓
PATCH /api/chat/:chatId with { priority: "urgent" }
     ↓
API validates admin role
API updates ChatRoom.priority
API returns updated chat
     ↓
Component updates display
Table row updates priority color
Other admins see update on next poll
```

### Step 8: Admin Updates Category
```
Admin clicks Category dropdown
     ↓
Options: "general", "support", "billing", "technical", "other"
     ↓
Admin selects "billing"
     ↓
PATCH /api/chat/:chatId with { category: "billing" }
     ↓
Same process as priority update
     ↓
Category chip updates in chat display
```

### Step 9: Admin Assigns Chat
```
Admin clicks "Assign" button
     ↓
Dropdown shows available admins
     ↓
Admin selects another admin (e.g., "Admin 2")
     ↓
PATCH /api/chat/:chatId with { adminId: "admin_2_id" }
     ↓
API validates admin role
API sets ChatRoom.adminId = admin_2_id
API sets adminName and adminImage from User collection
API returns updated chat
     ↓
Component updates display
Chat shows "Assigned to: Admin 2"
Both admins see the assignment
Other admin receives on next poll
```

### Step 10: Admin Changes Status
```
Admin clicks Status dropdown
     ↓
Options: "active", "closed", "archived"
     ↓
Admin selects "closed"
     ↓
PATCH /api/chat/:chatId with { status: "closed" }
     ↓
API validates admin role
API updates ChatRoom.status = "closed"
API returns updated chat
     ↓
Component updates display
Table row changes color (red for closed)
Chat no longer appears in "active" filter
     ↓
User sees chat as closed on next refresh
User cannot send new messages to closed chat
     ↓
Admin can still view closed chat
Admin can reopen if needed
```

---

## 🔐 Authorization Decision Tree

### Can User Create Chat?
```
IF session exists AND user is authenticated
  THEN Create new ChatRoom with userId = session.user.id
  ELSE Return 401 Unauthorized
```

### Can User View Chat?
```
IF session exists AND user is authenticated
  THEN
    IF chatRoom.userId === session.user.id
      THEN Allow view
      ELSE Return 403 Forbidden
  ELSE Return 401 Unauthorized
```

### Can User Send Message?
```
IF session exists AND user is authenticated
  THEN
    IF chatRoom.userId === session.user.id AND message not empty
      THEN Add message with senderRole = "user"
      ELSE Return 400 Bad Request
  ELSE Return 401 Unauthorized
```

### Can Admin Change Status?
```
IF session exists AND user is authenticated AND user.role === "admin"
  THEN
    IF status in [active, closed, archived]
      THEN Update status
      ELSE Return 400 Bad Request
  ELSE Return 403 Forbidden
```

### Can Admin Assign Chat?
```
IF session exists AND user is authenticated AND user.role === "admin"
  THEN
    IF adminId is valid admin user ID
      THEN Assign chat to admin
      ELSE Return 400 Bad Request
  ELSE Return 403 Forbidden
```

---

## 📱 UI Components Map

### User Interface Components
```
UserChat Component
├── ChatListPanel
│   ├── NewChatButton
│   │   └── NewChatDialog
│   │       ├── SubjectInput
│   │       ├── CategorySelect
│   │       └── PrioritySelect
│   └── ChatList
│       └── ChatItemCard[] (sortable, clickable)
│
└── ChatDetailPanel
    ├── ChatHeader (subject, status, priority, category)
    ├── MessageArea
    │   └── MessageItem[] (chronological)
    │       ├── Avatar (with fallback)
    │       ├── SenderName
    │       ├── Content
    │       └── Timestamp
    └── MessageInputFooter
        ├── TextField
        └── SendButton
```

### Admin Interface Components
```
AdminChat Component
├── ControlPanel
│   ├── StatusFilter (dropdown)
│   └── PriorityFilter (dropdown)
│
├── ChatTablePanel
│   └── ChatTable
│       ├── TableHead
│       │   └── Columns: User, Subject, Status, Priority, Category, Time, Unread
│       └── TableBody
│           └── ChatTableRow[] (selectable, sortable)
│
└── ChatDetailPanel (similar to User)
    ├── ChatHeader
    │   ├── StatusDropdown
    │   ├── PriorityDropdown
    │   ├── CategoryDropdown
    │   ├── AssignButton
    │   └── MetadataDisplay
    ├── MessageArea
    └── MessageInputFooter
```

---

## 🔄 Data Flow Examples

### Example 1: User Creates Chat → Admin Responds

```
Time  Action                          User Side              Admin Side
────  ─────────────────────────────   ─────────────────────  ─────────────────
0:00  User creates chat               ✓ Chat visible         (doesn't know yet)
      POST /api/chat
      ChatRoom created in DB

0:01  Admin logs in                   (still using chat)     ✓ Sees new chat
      GET /api/chat                                          (on first fetch)
      Polls every 3 seconds

0:05  Admin responds                  (waiting)              ✓ Types message
      PATCH /api/chat/[id]                                  Message added to DB

0:06  (still waiting)                 Message appears!       ✓ Sent
      Next fetch or refresh            (if polling enabled)

0:10  User sends follow-up            ✓ New message         Polls...
      PATCH /api/chat/[id]            Visible to admin       ✓ Sees it next poll
```

### Example 2: Admin Assigns & Closes Chat

```
Time  Action                          Admin 1                Admin 2
────  ─────────────────────────────   ──────────────────────────────────
0:00  Admin 1 has chat selected       ✓ Chat open            (checking list)
      GET /api/chat (via polling)

0:30  Admin 1 types response          ✓ Message sending      Polling...
      PATCH /api/chat/[id]            

0:31                                  ✓ Assigns to Admin 2   ✓ Sees assignment
      PATCH /api/chat/[id]                                   (on next poll)
      { adminId: admin_2_id }

0:32                                  ✓ Changes priority     ✓ Priority changed
      PATCH /api/chat/[id]            to "urgent"            (on next poll)
      { priority: "urgent" }

0:35                                  ✓ Closes chat          ✓ Chat no longer
      PATCH /api/chat/[id]            status: "closed"       in "active" filter
      { status: "closed" }
```

---

## 📊 Status & Priority Reference

### Status Workflow
```
┌─────────┐    Admin    ┌────────┐    Admin    ┌──────────┐
│ ACTIVE  │────Close───→│ CLOSED │────Archive─→│ ARCHIVED │
└─────────┘             └────────┘             └──────────┘
    ▲                       │
    │                       │
    └───────Reopen─────────┘

- ACTIVE: New/ongoing tickets, messages enabled
- CLOSED: Resolved tickets, messages disabled
- ARCHIVED: Closed tickets moved to storage
```

### Priority Levels
```
🔵 LOW        - Can wait, handle when available
🟠 MEDIUM     - Standard priority, handle soon
🔴 HIGH       - Urgent, handle before other tickets
🔴⚡ URGENT   - Critical, handle immediately
```

### Category Types
```
🔧 TECHNICAL  - Technical issues, bugs, errors
💳 BILLING    - Payment, invoice, subscription issues
📞 SUPPORT    - General support, help needed
📝 GENERAL    - General inquiries, feedback
❓ OTHER      - Miscellaneous
```

---

## 🎯 Quick Reference - What Can Each Role Do?

### USER Permissions
```
✅ CAN:
  • Create new chat
  • Send messages
  • View own chats & history
  • See status/priority/category
  • Receive admin responses
  • Delete/archive own chats (future)

❌ CANNOT:
  • View other user's chats
  • See all chats (admin view)
  • Change status/priority/category
  • Assign chats
  • View unread counts
  • Filter/search other chats
```

### ADMIN Permissions
```
✅ CAN:
  • View all user chats
  • Send responses to users
  • Change status (active/closed/archived)
  • Update priority (low/medium/high/urgent)
  • Update category (general/support/billing/technical/other)
  • Assign chat to other admins
  • Filter by status/priority
  • See unread message counts
  • View real-time updates (via polling)

❌ CANNOT:
  • Delete chats
  • Modify user information
  • Create chats for users
  • Send private admin-only messages
```

---

## 🔍 Troubleshooting Flow Chart

```
Problem: Can't send message
├─ Is message field empty?
│  └─ Yes → Type something, try again
│
├─ Is chat selected?
│  └─ No → Click a chat to select, try again
│
├─ Is session expired?
│  └─ Logout and login again
│
└─ Check browser console for errors

Problem: No real-time updates
├─ Check Network tab for /api/chat requests
│  └─ Should see one every ~3 seconds (admin)
│
├─ Try refreshing page manually
│  └─ Messages should appear
│
└─ If still no updates, restart dev server

Problem: Can't see other admin's assignment
├─ Wait 3 seconds (polling interval)
│  └─ Should appear on next fetch
│
└─ Manually refresh page

Problem: "Unauthorized" error
├─ Are you logged in?
│  └─ Go to login, authenticate
│
├─ Is your role correct?
│  └─ User → /dashboard/user/chat
│  └─ Admin → /dashboard/admin/chat
│
└─ Are you accessing correct route?

Problem: Chat list empty
├─ Are you a user?
│  └─ Shows only YOUR chats
│  └─ Need to CREATE a chat first
│
├─ Are you admin?
│  └─ Shows all user chats
│  └─ If no users created chats, list is empty
│
└─ Try refreshing page
```

---

## 🚀 Performance Optimization Tips

### For Users
1. Keep tab active → polling refreshes chat
2. Avoid too many open tabs → reduces API calls
3. Archive old chats → cleaner interface
4. Disable polling on inactive tab (future feature)

### For Admins
1. Use filters to focus on important chats
2. Archive resolved chats regularly
3. Assign chats to distribute workload
4. Monitor unread count to prioritize

### For Developers
1. Monitor polling intervals (3 seconds optimal)
2. Watch database query performance
3. Track API response times
4. Consider WebSocket for 1000+ concurrent users

---

**This visual guide complements the text documentation. Reference this when unsure about flows or permissions.**
