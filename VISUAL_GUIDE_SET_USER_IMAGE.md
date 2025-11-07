# Visual Guide: Admin Set User Image Feature

## Feature Overview Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                          │
└──────────────────────────────────────────────────────────────┘
                              ↓
                   Member Management Page
                              ↓
                        Card Printing Tab
                              ↓
        ┌─────────────────────────────────────┐
        │     Members Table                   │
        │  ┌─────────────────────────────────┐│
        │  │ Photo │ Name │ Email │ Status  ││
        │  │ [👤] │ John │ j@ex  │ Active  ││
        │  │ [👤] │ Jane │ j@ex  │ Active  ││
        │  │              @.                ││
        │  └─────────────────────────────────┘│
        └─────────────────────────────────────┘
                              ↓
                   Click "View Card" button
                              ↓
        ┌─────────────────────────────────────────────────┐
        │  Preview Member Card Dialog                     │
        │  [✏️ Edit] [📥 PDF] [🖨️ Print] [✕ Close]      │
        ├─────────────────────────────────────────────────┤
        │                                                 │
        │  MEMBERSHIP CARD PREVIEW                       │
        │  ┌─────────────────────┐                       │
        │  │ [PHOTO]             │                       │
        │  │                     │                       │
        │  │ Name: John Doe      │                       │
        │  │ ID: ABC123          │                       │
        │  │ QR: [◼◼◼]          │                       │
        │  └─────────────────────┘                       │
        │                                                 │
        └─────────────────────────────────────────────────┘
                              ↑
                         (Click Edit)
                              ↓
        ┌─────────────────────────────────────────────────┐
        │  ╭───────────────────────────────────────────╮ │
        │  │ ✏️ Edit Member Photo                      │ │
        │  ├───────────────────────────────────────────┤ │
        │  │ Image URL                                 │ │
        │  │ [https://example.com/photo.jpg         ] │ │
        │  │ Enter direct link to image@.             │ │
        │  │                                           │ │
        │  │ [💾 Save]    [Cancel]                    │ │
        │  │                                           │ │
        │  │ ⓘ Provide a direct URL to the image@.  │ │
        │  ╰───────────────────────────────────────────╯ │
        │                                                 │
        │  MEMBERSHIP CARD PREVIEW (with new photo)     │
        │  ┌─────────────────────┐                       │
        │  │ [NEW PHOTO]         │                       │
        │  │                     │                       │
        │  │ Name: John Doe      │                       │
        │  │ ID: ABC123          │                       │
        │  │ QR: [◼◼◼]          │                       │
        │  └─────────────────────┘                       │
        │                                                 │
        └─────────────────────────────────────────────────┘
                      ↙              ↘
                  Click Save        User sees
                      ↓              success toast
            "User image updated    ✓ Updated!
              successfully!"
```

---

## State Diagram

```
                        ┌─────────────────┐
                        │  PREVIEW STATE  │
                        │ (Initial Load)  │
                        └────────┬────────┘
                                 │
                    Click Edit Button (✏️)
                                 ↓
                        ┌─────────────────┐
                        │  EDIT STATE     │
                        │ (Panel Visible) │
                        └────────┬────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
    User Enters URL         Click Cancel            Click Save
          │                      │                      │
          ↓                      ↓                      ↓
    ┌─────────────┐      ┌─────────────┐      ┌──────────────┐
    │ EDITING STATE│      │ CANCEL STATE │     │ VALIDATE URL │
    │ URL Changed │      │ Revert to Old│     │ (Client-side)│
    └────────┬────┘      └────────┬────┘      └──────┬───────┘
             │                    │                    │
             │ (User continues)   │                    ├─→ Invalid
             │                    │                    │
             ↓                    ↓                    ↓
             │            ┌─────────────┐      ┌──────────────┐
             │            │ PREVIEW STATE│      │ ERROR STATE  │
             │            └─────────────┘      │ Show Toast   │
             │                                  └──────┬───────┘
             │                                         │
             │                                    ↙ Valid
             │                                    ↓
             │                          ┌──────────────┐
             └─────────────────────────→│ SAVING STATE │
                                        │ Show Spinner │
                                        └──────┬───────┘
                                               │
                                    ┌──────────┴──────────┐
                                    ↓                     ↓
                            ┌──────────────┐      ┌──────────────┐
                            │ SUCCESS      │      │ ERROR        │
                            │ Update DB    │      │ Show Error   │
                            │ Toast: ✓     │      │ Toast: ✗     │
                            └──────┬───────┘      └──────┬───────┘
                                   │                     │
                                   ↓                     ↓
                            ┌──────────────┐      ┌──────────────┐
                            │ PREVIEW STATE│      │ EDIT STATE   │
                            │ New Photo!   │      │ Try Again    │
                            └──────────────┘      └──────────────┘
```

---

## API Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                 BROWSER (Admin)                         │
│                                                         │
│  1. Enter Image URL                                     │
│  2. Click "Save" Button                                │
│  3. Validate Image URL (client-side)                   │
│     - Must be non-empty                                │
│     - Must be loadable (test with <img>)              │
│     - Show error if invalid                            │
│  4. If valid → POST /api/user/profile                  │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┴──────────┐
           │ POST Request Body:  │
           │ {                  │
           │   userId: "@.",   │
           │   image: "https://…│
           │ }                  │
           └─────────┬──────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                 SERVER (Node.js)                        │
│                                                         │
│  1. Verify Session Exists                              │
│     ✓ Session found? Continue                          │
│     ✗ No session? Return 401 Unauthorized              │
│                                                         │
│  2. Check Admin Authorization                          │
│     - Is role === "admin"?                             │
│     - Or isAdmin === true?                             │
│     ✓ Yes? Can update userId                           │
│     ✗ No? Can only update own profile (403)            │
│                                                         │
│  3. Build Update Object                                │
│     {                                                  │
│       image: "https://@.",                            │
│       name, phone, address, @. (if provided)          │
│     }                                                  │
│                                                         │
│  4. Update User in Database                            │
│     db.User.findByIdAndUpdate(targetUserId, updateData)│
│     ✓ Success? Return updated user (200)               │
│     ✗ Failed? Return error (500)                       │
│                                                         │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┴──────────────────┐
           │ Response (200 OK):          │
           │ {                           │
           │   msg: "Updated!",          │
           │   user: {                   │
           │     _id: "@.",             │
           │     name: "@.",            │
           │     image: "https://@.",   │
           │     @.                     │
           │   }                         │
           │ }                           │
           └─────────┬──────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│                 BROWSER (Admin)                         │
│                                                         │
│  1. Parse Response JSON                                │
│  2. Update currentUserDetails State                     │
│     - Card preview updates with new photo              │
│  3. Close Edit Panel                                   │
│  4. Show Success Toast                                 │
│     "User image updated successfully!"                 │
│                                                         │
│  Result: Card now shows new photo!                     │
│          Admin can print/download                       │
│          Changes saved to database                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Component Architecture

```
AdminCardPrintViewer.js
├── State Management
│   ├── editingImage: boolean
│   ├── imageUrl: string
│   ├── updatingImage: boolean
│   └── currentUserDetails: object
│
├── Handlers
│   ├── handleImageUrlChange()
│   │   └── Updates imageUrl state
│   │
│   ├── handleSaveImage()
│   │   ├── Validates URL (client-side)
│   │   ├── Tests image loadability
│   │   ├── Calls /api/user/profile (POST)
│   │   ├── Updates currentUserDetails
│   │   └── Shows success/error toast
│   │
│   └── handleCancelEdit()
│       ├── Reverts imageUrl
│       └── Closes edit panel
│
├── UI Components
│   ├── DialogTitle
│   │   ├── Title Text
│   │   ├── Edit Button (✏️)
│   │   ├── PDF Button
│   │   ├── Print Button
│   │   └── Close Button (✕)
│   │
│   ├── Edit Panel (conditional)
│   │   ├── Section Title
│   │   ├── Image URL TextField
│   │   ├── Helper Text
│   │   ├── Save Button
│   │   ├── Cancel Button
│   │   └── Info Alert
│   │
│   └── Card Preview
│       ├── Logo
│       ├── Title (ANTUF)
│       ├── Member Number
│       ├── Photo Area
│       │   ├── Image (uses currentUserDetails.image)
│       │   └── Fallback SVG Avatar
│       ├── User Info
│       │   ├── Name
│       │   ├── Father Name
│       │   ├── DOB
│       │   ├── Citizenship
│       │   ├── Email
│       │   └── Phone
│       ├── QR Code
│       └── Signature Area
│
└── Effects
    └── useEffect([userDetails])
        └── Sync parent prop to local state
```

---

## User Image Data Flow

```
User Model (MongoDB)
{
  _id: ObjectId,
  name: String,
  email: String,
  image: String,        ← Image URL stored here
  phone: String,
  @.
}
       │
       ↓
/api/user/profile (GET)
{
  select: ['name', 'email', 'image', @.]
}
       │
       ↓
AdminOrdersPage
{
  fetch user details
  pass to AdminCardPrintViewer
}
       │
       ↓
AdminCardPrintViewer (currentUserDetails)
{
  display image on card
  allow editing
}
       │
       ↓ (on save)
/api/user/profile (POST)
{
  userId: "@.",
  image: "https://new-url"
}
       │
       ↓
User Model Update
{
  image: "https://new-url"  ← Updated
}
       │
       ↓
Response returns updated user
       │
       ↓
currentUserDetails updates
       │
       ↓
Card displays new image
```

---

## Icon Legend

| Icon | Meaning | Color | Action |
|------|---------|-------|--------|
| ✏️ | Edit mode OFF | Orange | Toggle edit on |
| ✕ | Edit mode ON / Close | Red | Toggle edit off / Close dialog |
| 💾 | Save changes | Green | Save image to DB |
| 📥 | Download | Green | Download card as PDF |
| 🖨️ | Print | Purple | Print card |
| 👤 | Avatar | Gray | User photo placeholder |
| ⓘ | Info | Blue | Help/tips |
| ✓ | Success | Green | Operation successful |
| ✗ | Error | Red | Operation failed |

---

## Error Handling Flow

```
User enters URL
       ↓
Click Save
       ↓
Is URL empty?
  YES → Error: "Please enter a valid image URL"
  NO ↓
Client-side validation:
  Create test image element
  Set src = user's URL
       ↓
Does image load?
  NO → Error: "Invalid image URL. Please check and try again."
  YES ↓
Send to API:
  POST /api/user/profile
       ↓
Server response:
  200 OK → Success! Show new photo
  400 Bad → Error in request body
  401 Unauthorized → Not logged in
  403 Forbidden → Non-admin user
  404 Not Found → User not found
  500 Server Error → Database issue
       ↓
All errors → Show error toast to user
             Keep edit panel open for retry
```

---

## Permission Matrix

```
┌─────────────────────┬──────────┬──────────┬────────┐
│ Action              │ Admin    │ User     │ Guest  │
├─────────────────────┼──────────┼──────────┼────────┤
│ View own card       │ ✅ Yes   │ ✅ Yes   │ ❌ No  │
│ View other card     │ ✅ Yes   │ ❌ No    │ ❌ No  │
│ Edit own image      │ ✅ Yes   │ ✅ Yes   │ ❌ No  │
│ Edit other image    │ ✅ Yes   │ ❌ No    │ ❌ No  │
│ Print card          │ ✅ Yes   │ ✅ Yes   │ ❌ No  │
│ Download PDF        │ ✅ Yes   │ ✅ Yes   │ ❌ No  │
│ Change membership   │ ✅ Yes   │ ❌ No    │ ❌ No  │
└─────────────────────┴──────────┴──────────┴────────┘
```

---

## Success Workflow (Happy Path)

```
START: Admin on Member Management Page
  │
  ├→ Sees members table with photos
  │
  ├→ Clicks "View Card" on member
  │   └→ Card preview opens
  │
  ├→ Clicks orange Edit (✏️) button
  │   └→ Edit panel appears
  │
  ├→ Enters image URL: https://example.com/photo.jpg
  │
  ├→ Clicks "Save" button
  │   ├→ Image validated on client ✓
  │   └→ API call sent to server
  │
  ├→ Server processes:
  │   ├→ Validates session ✓
  │   ├→ Checks admin role ✓
  │   ├→ Updates database ✓
  │   └→ Returns updated user ✓
  │
  ├→ Browser receives response:
  │   ├→ Updates currentUserDetails
  │   ├→ Card shows new photo
  │   ├→ Edit panel closes
  │   └→ Success toast shown ✓
  │
  └→ Admin can now:
      ├→ Print card with new photo
      ├→ Download as PDF
      └→ Continue with next member

END: Success! 🎉
```

---

## Error Workflow (Error Path)

```
START: Admin enters invalid URL
  │
  ├→ Enters: "not-a-valid-url"
  │
  ├→ Clicks "Save"
  │   ├→ Client-side validation ✗
  │   └→ Image won't load
  │
  ├→ Error detected:
  │   └→ Toast shown: "Invalid image URL@."
  │
  ├→ Edit panel remains open
  │
  ├→ Admin can:
  │   ├→ Correct the URL and retry
  │   ├→ Click "Cancel" to discard
  │   └→ Click Close to exit
  │
  └→ Workflow ends without update

Result: No database change, user gets another chance
```

---

This visual guide complements the detailed documentation and helps admins understand the feature visually.
