# कार्यक्रम क्यालेन्डर Quick Start Guide

## 🚀 Getting Started

### Access Admin Panel
1. Navigate to `/dashboard/admin/events`
2. You must be logged in as an admin
3. You'll see the event management dashboard

### Features Overview

#### 📊 Dashboard Statistics
- **कुल कार्यक्रम** - Total events
- **आसन्न** - Upcoming events
- **चलमान** - Ongoing events
- **पूरा भएको** - Completed events

## ➕ Creating an Event

1. Click **"नयाँ कार्यक्रम"** (New Event) button
2. Fill in the required fields:
   - **Event Title (English)** - e.g., "Web Development Workshop"
   - **कार्यक्रमको नाम (नेपाली)** - Nepali title
   - **Description** - English description
   - **विवरण (नेपाली)** - Nepali description
   - **शुरुआत मिति** - Start date/time
   - **अन्त्य मिति** - End date/time
3. Select **Category** (श्रेणी)
4. Set **Status** (स्थिति)
5. Add location details
6. Set capacity
7. Add event image URL
8. Check **प्रकाशित** (Published) to make it public
9. Check **विशेष** (Featured) if it's a featured event
10. Click **"बचत गर्नुहोस्"** (Save)

## 🎯 Filtering Events

### By Category (श्रेणी)
- कार्यशाला (Workshop)
- सेमिनार (Seminar)
- प्रशिक्षण (Training)
- सम्मेलन (Conference)
- सामाजिक (Social)
- खेलकुद (Sports)
- सांस्कृतिक (Cultural)
- अन्य (Other)

### By Status (स्थिति)
- आसन्न (Upcoming)
- चलमान (Ongoing)
- पूरा भएको (Completed)
- रद्द (Cancelled)

## ✏️ Editing an Event

1. Find the event in the table
2. Click the **"सम्पादन"** (Edit) button
3. Update the fields
4. Click **"बचत गर्नुहोस्"** (Save)

## 🗑️ Deleting an Event

1. Find the event in the table
2. Click the **"हटाउनु"** (Delete) button
3. Confirm the deletion

## 👥 Public Event Calendar

Users can view events at `/events` page

### Features
- Browse all published events
- Filter by category
- Filter by status
- Search events
- Beautiful card display
- Event details including time, location, capacity

## 📋 Event Categories Explained

| Category | नेपाली | Purpose |
|----------|--------|---------|
| Workshop | कार्यशाला | Hands-on training sessions |
| Seminar | सेमिनार | Presentations/discussions |
| Training | प्रशिक्षण | Formal training programs |
| Conference | सम्मेलन | Large conferences/gatherings |
| Social | सामाजिक | Social events |
| Sports | खेलकुद | Sports events |
| Cultural | सांस्कृतिक | Cultural programs |
| Other | अन्य | Other events |

## 🎨 UI Color Scheme

- **Primary (नीलो)** - Workshops
- **Secondary (गुलाफी)** - Seminars
- **Info (आसमानी नीलो)** - Training/Upcoming
- **Success (हरियो)** - Conferences/Completed
- **Warning (पहेलो)** - Social/Ongoing
- **Error (लाल)** - Sports/Cancelled

## ⌚ Status Meanings

- **आसन्न (Upcoming)** - Event hasn't started yet
- **चलमान (Ongoing)** - Event is happening now
- **पूरा भएको (Completed)** - Event has finished
- **रद्द (Cancelled)** - Event has been cancelled

## 📝 Bilingual Tips

Every event can have both English and Nepali content:
- Use **title** for English and **titleNepali** for Nepali
- Same for descriptions and locations
- This helps reach both English and Nepali speaking users

## 🔒 Permissions

- **Admin Only** - Create, Edit, Delete events
- **Public** - View published events only
- **Featured Events** - Can be highlighted on dashboard

## 💡 Best Practices

1. **Always provide both languages** - Fill in both English and Nepali fields
2. **Add descriptive images** - Use high-quality event posters
3. **Set realistic capacity** - Track participant limits accurately
4. **Keep descriptions clear** - Make event purposes obvious
5. **Update status promptly** - Change status as event progresses
6. **Feature important events** - Mark key events as featured

## 🐛 Troubleshooting

### Events not appearing
- Check if **प्रकाशित** (Published) is enabled
- Verify date is correct
- Clear browser cache

### Can't save event
- Ensure all **required** fields are filled
- Check if you have admin privileges
- Verify date format is correct

### Image not showing
- Check if image URL is valid
- Ensure image is publicly accessible
- Try a different image URL

## 📱 Responsive Design

The event calendar works on:
- 📱 Mobile phones
- 📱 Tablets
- 🖥️ Desktop computers
- 🖥️ Large screens

## 🔄 Real-time Updates

Changes made in admin panel appear immediately:
- Event creation - instant
- Event updates - instant
- Event deletion - instant
- Statistics - auto-updated

## 📊 Analytics

Track:
- Total events created
- Events by status
- Events by category
- Featured events count
- Participant registrations (future)

## 🎓 Typical Workflow

1. **Plan Event** → Gather all information
2. **Create Event** → Fill form in admin panel
3. **Publish Event** → Check "प्रकाशित" and save
4. **Promote Event** → Mark as "विशेष" if featured
5. **Monitor** → Check registration/status
6. **Update Status** → Change to "चलमान" when starting
7. **Mark Complete** → Change status when done
8. **Archive** → Keep for records

## 📞 Support

For issues or features requests, contact admin team.

---

**Last Updated:** November 8, 2025
