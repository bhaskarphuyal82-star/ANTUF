# Live Chat System - Automated Testing Guide

## Overview
This guide provides automated test scripts and manual testing procedures for the live chat system to ensure complete functionality and data integrity.

---

## Part 1: API Testing with cURL and Postman

### Setup
1. Start the development server: `npm run dev`
2. Have MongoDB connection active
3. Have at least 2 test users in the database (one admin, one regular user)

### Test Users Setup
```javascript
// Run these in MongoDB shell to create test users
db.users.insertMany([
  {
    name: "Test User",
    email: "testuser@example.com",
    password: "hashed_password",
    role: "user",
    image: "https://example.com/user.jpg"
  },
  {
    name: "Test Admin",
    email: "admin@example.com",
    password: "hashed_password",
    role: "admin",
    image: "https://example.com/admin.jpg"
  }
])
```

### Test 1: Create Chat as User

**cURL Command:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SESSION_TOKEN" \
  -d '{
    "subject": "Issue with course materials",
    "category": "technical",
    "priority": "high"
  }'
```

**Expected Response (201):**
```json
{
  "_id": "generated_id",
  "userId": "user_id",
  "userName": "Test User",
  "userEmail": "testuser@example.com",
  "userImage": "https://example.com/user.jpg",
  "subject": "Issue with course materials",
  "category": "technical",
  "priority": "high",
  "status": "active",
  "messages": [],
  "createdAt": "2024-01-01T12:00:00.000Z",
  "updatedAt": "2024-01-01T12:00:00.000Z",
  "lastMessageAt": "2024-01-01T12:00:00.000Z"
}
```

---

### Test 2: Get All Chats (Admin)

**cURL Command:**
```bash
curl -X GET http://localhost:3000/api/chat \
  -H "Authorization: Bearer ADMIN_SESSION_TOKEN"
```

**Expected Response (200):**
```json
[
  {
    "_id": "chat_id_1",
    "userId": "user_id_1",
    "userName": "Test User",
    "subject": "Issue with course materials",
    "status": "active",
    "priority": "high",
    "messages": [],
    "createdAt": "2024-01-01T12:00:00.000Z"
  },
  // ... more chats
]
```

---

### Test 3: Get User Chats

**cURL Command:**
```bash
curl -X GET http://localhost:3000/api/chat \
  -H "Authorization: Bearer USER_SESSION_TOKEN"
```

**Expected Response (200):**
```json
[
  {
    "_id": "chat_id_1",
    "userId": "user_id",
    "subject": "Issue with course materials",
    "status": "active",
    "messages": [],
    // ... filtered to this user only
  }
]
```

---

### Test 4: Send Message

**cURL Command:**
```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_SESSION_TOKEN" \
  -d '{
    "message": "The video player is not working when I try to play the course material."
  }'
```

**Expected Response (200):**
```json
{
  "_id": "chat_id_1",
  "messages": [
    {
      "senderId": "user_id",
      "senderName": "Test User",
      "senderRole": "user",
      "content": "The video player is not working when I try to play the course material.",
      "timestamp": "2024-01-01T12:01:00.000Z",
      "isRead": false
    }
  ],
  "lastMessageAt": "2024-01-01T12:01:00.000Z",
  "updatedAt": "2024-01-01T12:01:00.000Z"
}
```

---

### Test 5: Update Chat Status

**cURL Command:**
```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_SESSION_TOKEN" \
  -d '{
    "status": "closed"
  }'
```

**Expected Response (200):**
```json
{
  "_id": "chat_id_1",
  "status": "closed",
  "updatedAt": "2024-01-01T12:02:00.000Z"
}
```

---

### Test 6: Update Priority

**cURL Command:**
```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_SESSION_TOKEN" \
  -d '{
    "priority": "urgent"
  }'
```

**Expected Response (200):**
```json
{
  "_id": "chat_id_1",
  "priority": "urgent",
  "updatedAt": "2024-01-01T12:03:00.000Z"
}
```

---

### Test 7: Assign Chat to Admin

**cURL Command:**
```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_SESSION_TOKEN" \
  -d '{
    "adminId": "admin_user_id"
  }'
```

**Expected Response (200):**
```json
{
  "_id": "chat_id_1",
  "adminId": "admin_user_id",
  "adminName": "Test Admin",
  "adminImage": "https://example.com/admin.jpg",
  "updatedAt": "2024-01-01T12:04:00.000Z"
}
```

---

## Part 2: Browser-Based UI Testing

### Test Script 1: User Chat Creation and Messaging

**Browser Console:**
```javascript
// 1. Open user chat page
window.location.href = '/dashboard/user/chat';

// 2. Wait 2 seconds for page to load, then check for UI elements
setTimeout(() => {
  const newChatBtn = document.querySelector('button[aria-label="New Chat"]') 
    || Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('New Chat'));
  console.log('New Chat button found:', !!newChatBtn);
  
  const messageInput = document.querySelector('textarea[placeholder*="message"]');
  console.log('Message input found:', !!messageInput);
  
  const chatList = document.querySelector('div[role="listbox"]') 
    || document.querySelector('[class*="chat"]');
  console.log('Chat list area found:', !!chatList);
}, 2000);
```

### Test Script 2: Admin Chat Dashboard

**Browser Console:**
```javascript
// 1. Open admin chat page
window.location.href = '/dashboard/admin/chat';

// 2. Wait for page load and verify UI elements
setTimeout(() => {
  const chatTable = document.querySelector('table');
  console.log('Chat table found:', !!chatTable);
  
  const statusFilter = document.querySelector('select[aria-label*="Status"]');
  console.log('Status filter found:', !!statusFilter);
  
  const priorityFilter = document.querySelector('select[aria-label*="Priority"]');
  console.log('Priority filter found:', !!priorityFilter);
  
  const tableRows = chatTable?.querySelectorAll('tbody tr');
  console.log('Number of chats displayed:', tableRows?.length || 0);
}, 2000);
```

### Test Script 3: Message Sending Test

**Steps:**
1. Open user chat page
2. Create a new chat or select existing
3. In browser console:
```javascript
// Get message input and send button
const input = document.querySelector('textarea');
const sendBtn = Array.from(document.querySelectorAll('button'))
  .find(b => b.querySelector('svg[data-testid="SendIcon"]'));

// Type message
input.value = 'Test message for automation';
input.dispatchEvent(new Event('change', { bubbles: true }));

// Click send
sendBtn.click();

// Wait and check if message appears
setTimeout(() => {
  const messages = document.querySelectorAll('[class*="message"]');
  console.log('Total messages shown:', messages.length);
}, 1000);
```

---

## Part 3: Database Integrity Tests

### Test 1: Verify Chat Room Structure

```javascript
// Run in MongoDB shell
db.chatrooms.findOne({}).then(chat => {
  console.log('ChatRoom structure:');
  console.log('✓ userId:', !!chat.userId);
  console.log('✓ userName:', !!chat.userName);
  console.log('✓ status:', chat.status, '(should be: active|closed|archived)');
  console.log('✓ priority:', chat.priority, '(should be: low|medium|high|urgent)');
  console.log('✓ category:', chat.category, '(should be: general|support|billing|technical|other)');
  console.log('✓ messages:', Array.isArray(chat.messages));
  console.log('✓ createdAt:', !!chat.createdAt);
  console.log('✓ updatedAt:', !!chat.updatedAt);
  console.log('✓ lastMessageAt:', !!chat.lastMessageAt);
});
```

### Test 2: Verify Message Structure

```javascript
// Run in MongoDB shell
db.chatrooms.findOne({ messages: { $exists: true, $not: { $size: 0 } } }).then(chat => {
  const msg = chat.messages[0];
  console.log('Message structure:');
  console.log('✓ senderId:', !!msg.senderId);
  console.log('✓ senderName:', !!msg.senderName);
  console.log('✓ senderRole:', msg.senderRole, '(should be: user|admin)');
  console.log('✓ content:', !!msg.content);
  console.log('✓ timestamp:', !!msg.timestamp);
  console.log('✓ isRead:', typeof msg.isRead === 'boolean');
});
```

### Test 3: Verify Indices

```javascript
// Run in MongoDB shell
db.chatrooms.getIndexes().then(indices => {
  console.log('Indices found:');
  indices.forEach(idx => {
    console.log(JSON.stringify(idx.key));
  });
  // Should include:
  // { "_id": 1 }
  // { "userId": 1, "createdAt": -1 }
  // { "adminId": 1, "createdAt": -1 }
  // { "status": 1 }
});
```

### Test 4: Data Integrity Check

```javascript
// Run in MongoDB shell
db.chatrooms.countDocuments({}).then(count => {
  console.log('Total chats:', count);
});

db.chatrooms.countDocuments({ status: 'active' }).then(count => {
  console.log('Active chats:', count);
});

db.chatrooms.countDocuments({ adminId: { $exists: true, $ne: null } }).then(count => {
  console.log('Assigned chats:', count);
});

db.chatrooms.find({ messages: { $size: 0 } }).count().then(count => {
  console.log('Chats with no messages:', count);
});
```

---

## Part 4: Performance Testing

### Test 1: API Response Time

**Using curl:**
```bash
# Time the API call
time curl -X GET http://localhost:3000/api/chat \
  -H "Authorization: Bearer SESSION_TOKEN"

# Measure multiple calls and calculate average
for i in {1..10}; do
  curl -w "%{time_total}\n" -X GET http://localhost:3000/api/chat \
    -H "Authorization: Bearer SESSION_TOKEN" \
    -o /dev/null -s
done
```

**Expected**: Response time < 500ms for typical operations

### Test 2: Polling Performance

**Browser Console:**
```javascript
// Measure polling interval timing
let lastFetchTime = null;
const originalFetch = window.fetch;

window.fetch = function(...args) {
  const now = Date.now();
  if (lastFetchTime && args[0].includes('/api/chat')) {
    const interval = now - lastFetchTime;
    console.log(`Polling interval: ${interval}ms`);
  }
  if (args[0].includes('/api/chat')) {
    lastFetchTime = now;
  }
  return originalFetch.apply(this, args);
};

// Run for 30 seconds and observe intervals
setTimeout(() => {
  console.log('Polling test complete');
}, 30000);
```

**Expected**: Polling at ~3000ms intervals (3 seconds)

### Test 3: Memory Usage

**Browser DevTools:**
1. Open DevTools → Memory tab
2. Take initial heap snapshot
3. Create 5 new chats
4. Send 10 messages
5. Take another snapshot
6. Compare sizes

**Expected**: Memory increase < 5MB for normal usage

---

## Part 5: Authorization & Security Tests

### Test 1: User Cannot Access Other User's Chat

```bash
# Get Chat ID from User 1
CHAT_ID=$(curl -s -X GET http://localhost:3000/api/chat \
  -H "Authorization: Bearer USER1_SESSION" | jq -r '.[0]._id')

# Try to access with User 2's session
curl -X GET http://localhost:3000/api/chat/$CHAT_ID \
  -H "Authorization: Bearer USER2_SESSION"

# Expected: 403 Forbidden or unauthorized error
```

### Test 2: User Cannot Update Admin-Only Fields

```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_SESSION" \
  -d '{ "status": "closed" }'

# Expected: 403 Forbidden (users cannot change status, only admins)
```

### Test 3: Unauthenticated Access Denied

```bash
curl -X GET http://localhost:3000/api/chat

# Expected: 401 Unauthorized
```

---

## Part 6: Error Handling Tests

### Test 1: Invalid Chat ID

```bash
curl -X GET http://localhost:3000/api/chat/invalid_id \
  -H "Authorization: Bearer SESSION_TOKEN"

# Expected: 404 Not Found or 400 Bad Request
```

### Test 2: Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SESSION_TOKEN" \
  -d '{
    "subject": "Test"
    # Missing category, priority
  }'

# Expected: Chat created with defaults or validation error
```

### Test 3: Empty Message

```bash
curl -X PATCH http://localhost:3000/api/chat/CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SESSION_TOKEN" \
  -d '{ "message": "" }'

# Expected: Message not created or validation error
```

---

## Part 7: Integration Testing

### Full User-to-Admin Workflow

**Sequence of operations:**
1. User creates chat
2. User sends message
3. Admin receives message (via polling)
4. Admin assigns chat
5. Admin sends response
6. User receives response
7. Admin closes chat
8. Verify chat history intact

**Test Script:**
```bash
#!/bin/bash

# 1. Create chat as user
CHAT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{
    "subject": "Integration test",
    "category": "general",
    "priority": "medium"
  }')

CHAT_ID=$(echo $CHAT_RESPONSE | jq -r '._id')
echo "✓ Chat created: $CHAT_ID"

# 2. User sends message
curl -s -X PATCH http://localhost:3000/api/chat/$CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer USER_TOKEN" \
  -d '{ "message": "Hello admin" }' > /dev/null
echo "✓ User message sent"

# 3. Admin gets chats
ADMIN_CHATS=$(curl -s -X GET http://localhost:3000/api/chat \
  -H "Authorization: Bearer ADMIN_TOKEN")
echo "✓ Admin retrieved chats: $(echo $ADMIN_CHATS | jq '. | length') total"

# 4. Admin sends response
curl -s -X PATCH http://localhost:3000/api/chat/$CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{ "message": "Hello user" }' > /dev/null
echo "✓ Admin message sent"

# 5. Admin closes chat
curl -s -X PATCH http://localhost:3000/api/chat/$CHAT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{ "status": "closed" }' > /dev/null
echo "✓ Chat closed"

# 6. Verify final state
FINAL_STATE=$(curl -s -X GET http://localhost:3000/api/chat/$CHAT_ID \
  -H "Authorization: Bearer USER_TOKEN")
echo "✓ Final chat state: $(echo $FINAL_STATE | jq '.status')"
echo "✓ Total messages: $(echo $FINAL_STATE | jq '.messages | length')"
```

---

## Testing Results Template

Use this to document test results:

```markdown
# Test Results - Date: YYYY-MM-DD

## API Tests
- [ ] Create Chat: PASS/FAIL
- [ ] Get All Chats: PASS/FAIL
- [ ] Get User Chats: PASS/FAIL
- [ ] Send Message: PASS/FAIL
- [ ] Update Status: PASS/FAIL
- [ ] Update Priority: PASS/FAIL
- [ ] Assign Chat: PASS/FAIL

## Frontend Tests
- [ ] User chat creation: PASS/FAIL
- [ ] Message sending: PASS/FAIL
- [ ] Admin dashboard: PASS/FAIL
- [ ] Filtering: PASS/FAIL
- [ ] Real-time updates: PASS/FAIL

## Database Tests
- [ ] Chat structure: PASS/FAIL
- [ ] Message structure: PASS/FAIL
- [ ] Indices: PASS/FAIL
- [ ] Data integrity: PASS/FAIL

## Performance Tests
- [ ] API response time < 500ms: PASS/FAIL
- [ ] Polling interval ~3s: PASS/FAIL
- [ ] Memory usage normal: PASS/FAIL

## Authorization Tests
- [ ] User cannot access other chats: PASS/FAIL
- [ ] User cannot update status: PASS/FAIL
- [ ] Unauthenticated denied: PASS/FAIL

## Notes:
[Add any issues or observations]
```

---

## Troubleshooting Failed Tests

### If API tests fail:
1. Check `.env.local` for correct MONGODB_URI
2. Verify NextAuth session tokens are valid
3. Check server logs for errors: `npm run dev` output
4. Verify user/admin roles in database

### If UI tests fail:
1. Check browser console for JavaScript errors
2. Verify page fully loaded before tests
3. Check Network tab for API errors
4. Inspect DOM for expected elements

### If database tests fail:
1. Connect to MongoDB directly
2. Check if chatrooms collection exists
3. Verify indices are created
4. Check for connection timeouts

---

## Automation Framework (Jest Example)

For future automated testing, consider:
```javascript
// Example Jest test
describe('Chat API', () => {
  it('should create chat', async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'Test' })
    });
    expect(response.status).toBe(201);
  });
});
```

---

## Next Steps
1. Run all tests in this guide manually
2. Document results in template above
3. Fix any failures
4. Consider implementing automated testing with Jest/Cypress
5. Set up CI/CD pipeline for automated tests before deployment
