# Quick Guide: Admin Set User Image in Card Preview

## What's New?
Admins can now **edit and set member photos** directly from the card preview dialog!

## How to Use

### Step 1: Open Card Preview
```
Dashboard → Member Management → Card Printing Tab
→ Find a member → Click "View Card" button
```

### Step 2: Click Edit Button
- Look for the **orange pencil icon** in the dialog title bar
- Click it to enable image editing

### Step 3: Enter Image URL
```
Orange panel appears with text field:
"Image URL" → Enter: https://example.com/photo.jpg
```

### Step 4: Save
- Click **"Save"** button (green)
- System validates the image
- Card updates immediately with new photo

### Step 5: Done!
- New photo now shows on card preview
- Can print or download PDF with new photo
- Changes saved to database

## Icon Guide

| Icon | Color | Meaning |
|------|-------|---------|
| ✏️ Pencil | Orange | Edit mode OFF - Click to enable |
| ✕ Cancel | Red | Edit mode ON - Click to disable |
| 💾 Save | Green | Save changes to database |
| ⬇️ PDF | Green | Download as PDF |
| 🖨️ Print | Purple | Print card |

## Image URL Requirements

✅ **Must be:**
- Direct URL (https://@.)
- Publicly accessible
- Valid image file (JPG, PNG, WebP)
- Loadable by browser

❌ **Cannot be:**
- Local file path (/path/to/image.jpg)
- Relative URL (images/photo.jpg)
- Private/restricted URLs
- Base64 data URLs

## Example Valid URLs

```
https://example.com/user-photos/john.jpg
https://cdn.mysite.com/images/profile.png
https://s3.amazonaws.com/bucket/user123.webp
https://drive.google.com/uc?id=FILE_ID
```

## Error Messages & Solutions

| Error | Solution |
|-------|----------|
| "Invalid image URL" | Check URL is correct and accessible |
| "Please enter a valid image URL" | Field is empty, enter URL |
| "User not found" | Card order issue, refresh page |
| "Unauthorized" | Must be logged in as admin |

## Tips & Tricks

### 💡 Pro Tips
1. **Validation is automatic** - No need to hit enter, just click Save
2. **Preview updates instantly** - See new photo immediately
3. **No page reload needed** - Keep editing multiple cards
4. **Cancel anytime** - Click X button or red cancel in panel

### 🔗 Getting Image URLs

**Option 1: Cloud Storage**
- Upload to Google Drive, get shareable link
- Upload to Imgur, copy image link
- Use Cloudinary, get public URL

**Option 2: Web Server**
- Upload to your website's file manager
- Right-click image → Copy image address

**Option 3: Use Existing**
- Hover over any online image
- Right-click → Copy image address
- Paste into the field

## Workflow Examples

### Example 1: Upload & Update
```
1. Upload photo to Imgur
2. Get image URL: https://imgur.com/abc123.jpg
3. Open card preview
4. Click orange Edit button
5. Paste URL in field
6. Click Save
✓ Done! Photo now on card
```

### Example 2: Use Google Drive
```
1. Upload photo to Google Drive
2. Right-click → Share → Anyone with link can view
3. Get link: https://drive.google.com/file/d/FILE_ID
4. Click Edit in card preview
5. Paste URL
6. Click Save
✓ Photo updated on card
```

### Example 3: Update Multiple Users
```
1. Member A: Edit → URL → Save
2. Member B: Edit → URL → Save
3. Member C: Edit → URL → Save
✓ All three members have new photos
```

## Frequently Asked Questions

**Q: Can I upload a file directly?**
A: Not yet - must use URL. Upload to cloud storage first.

**Q: What if image is broken?**
A: You'll see validation error. Check URL and try again.

**Q: Does this affect user's profile photo elsewhere?**
A: Yes! Updates the user's main profile image everywhere.

**Q: Can I revert to old photo?**
A: Use the old URL or edit again with original URL.

**Q: Is the photo saved to their profile?**
A: Yes! Permanently saved to user's database record.

## Supported Formats

- ✅ JPEG/JPG
- ✅ PNG
- ✅ WebP
- ✅ GIF (static)
- ✅ SVG (vector)

## Security

- ✅ Only admins can edit images
- ✅ Non-admins see read-only cards
- ✅ URL validation prevents broken images
- ✅ Changes audit-logged (if enabled)

## Troubleshooting

**Image not showing after save?**
1. Hard refresh browser (Ctrl+F5)
2. Close and reopen preview
3. Check URL is still valid

**Can't save - getting error?**
1. Verify URL by visiting it in browser
2. Check image is publicly accessible
3. Try different URL if above fails
4. Contact admin if still failing

**Edit button not visible?**
1. You must be logged in as admin
2. Check user role in admin panel
3. Refresh page and try again

## Video Tutorial (Manual Steps)

```
1. Click orange pencil ✏️ in card preview
2. See orange panel with "Image URL" field
3. Type or paste image URL
4. Press Tab or click Save button
5. Watch for "User image updated successfully!" message
6. Card photo changes immediately
7. Click X or Cancel to turn off edit mode
```

## Keyboard Shortcuts

- **Tab** after URL field → focuses Save button
- **Enter** (when Save focused) → saves image
- **Escape** → closes dialog completely

## Need Help?

- Image won't load? → Check URL is publicly accessible
- Auth error? → Login as admin user
- Still stuck? → Check browser console (F12) for errors

---

**Status**: ✅ Ready to Use  
**Admin Access**: Required  
**Data**: Persists to database  
**Impact**: Updates user profile image globally  

See full docs: `ADMIN_SET_USER_IMAGE_FEATURE.md`
