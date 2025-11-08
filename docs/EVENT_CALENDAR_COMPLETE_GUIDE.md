# कार्यक्रम क्यालेन्डर (Event Calendar) - Complete Documentation

## Overview
A comprehensive event calendar management system for ANTUF with bilingual (English/Nepali) support, featuring both admin management panel and public-facing event display.

## Features

### Admin Panel Features
- ✅ Create, Read, Update, Delete (CRUD) events
- ✅ Bilingual support (English & Nepali)
- ✅ Event categorization (Workshop, Seminar, Training, etc.)
- ✅ Status tracking (Upcoming, Ongoing, Completed, Cancelled)
- ✅ Event image/poster upload
- ✅ Participant capacity tracking
- ✅ Featured events highlighting
- ✅ Statistics dashboard
- ✅ Advanced filtering and search

### Public Features
- ✅ Browse all published events
- ✅ Filter by category and status
- ✅ Search events
- ✅ Beautiful card-based UI
- ✅ Event details display
- ✅ Responsive design

## Database Schema

### EventCalendar Model
```javascript
{
  title: String (required) - English event title
  titleNepali: String (required) - Nepali event title
  description: String - English description
  descriptionNepali: String - Nepali description
  startDate: Date (required) - Event start date/time
  endDate: Date (required) - Event end date/time
  time: String - Event time (e.g., "14:30" or "2:30 PM")
  location: String - English location
  locationNepali: String - Nepali location
  category: String (enum) - workshop, seminar, training, conference, social, sports, cultural, other
  image: String - URL to event poster
  capacity: Number - Maximum participants
  registeredCount: Number - Current registrations (default: 0)
  status: String (enum) - upcoming, ongoing, completed, cancelled
  organizer: {
    name: String,
    email: String,
    phone: String
  }
  participants: [{
    userId: ObjectId,
    registeredAt: Date
  }]
  tags: [String]
  isPublished: Boolean - Publishing status
  isFeatured: Boolean - Featured event flag
  createdBy: ObjectId - Admin who created event
  updatedBy: ObjectId - Admin who last updated
  timestamps: true - createdAt, updatedAt
}
```

## API Endpoints

### Admin API (Protected - Admin Only)

#### GET /api/admin/events
Fetch all events with pagination, filtering, and search
- **Query Parameters:**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `category`: Filter by category
  - `status`: Filter by status
  - `search`: Search by title/description
  - `featured`: Show only featured events

- **Response:**
  ```json
  {
    "success": true,
    "data": [{
      "_id": "...",
      "title": "Event Title",
      "titleNepali": "कार्यक्रमको नाम",
      "startDate": "2025-11-15T10:00:00Z",
      "status": "upcoming",
      "category": "workshop"
    }],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "pages": 3
    }
  }
  ```

#### POST /api/admin/events
Create a new event (Admin only)
- **Request Body:**
  ```json
  {
    "title": "Web Development Workshop",
    "titleNepali": "वेब विकास कार्यशाला",
    "description": "Learn modern web development",
    "descriptionNepali": "आधुनिक वेब विकास सिकनुहोस्",
    "startDate": "2025-11-15T10:00:00Z",
    "endDate": "2025-11-15T16:00:00Z",
    "time": "10:00 AM",
    "location": "ANTUF Training Center",
    "locationNepali": "एएनटीयूएफ प्रशिक्षण केन्द्र",
    "category": "workshop",
    "image": "https://example.com/image.jpg",
    "capacity": 50,
    "organizer": {
      "name": "Admin Name",
      "email": "admin@antuf.edu.np",
      "phone": "+977-1-xxx-xxxx"
    }
  }
  ```

#### GET /api/admin/events/[id]
Fetch specific event details
- **Parameters:** `id` - Event ID
- **Response:** Complete event object

#### PATCH /api/admin/events/[id]
Update event (Admin only)
- **Parameters:** `id` - Event ID
- **Request Body:** Any fields to update

#### DELETE /api/admin/events/[id]
Delete event (Admin only)
- **Parameters:** `id` - Event ID

### Public API (No Authentication)

#### GET /api/admin/events
Same as admin GET, but only returns published events

## UI Components

### Admin Components

#### EventCalendarAdmin
Located: `/components/admin/event-calendar/EventCalendarAdmin.js`

**Features:**
- Event list table with all details
- Create/Edit/Delete event dialog
- Category and status filtering
- Real-time statistics
- Bilingual form
- Image upload support
- Featured/Published toggles

**Props:** None (uses session for auth)

### Public Components

#### EventCalendar
Located: `/components/event-calendar/EventCalendar.js`

**Features:**
- Card-based event display
- Search and filter functionality
- Status and category chips
- Responsive grid layout
- Event detail cards
- Location and time display

**Props:** None

## Pages

### Admin Page
**Route:** `/dashboard/admin/events`
**File:** `/app/dashboard/admin/events/page.js`
- Displays EventCalendarAdmin component
- Requires admin authentication

### Public Page
**Route:** `/events`
**File:** `/app/events/page.js`
- Displays EventCalendar component
- No authentication required

## Usage Examples

### Creating an Event (Admin)
```javascript
const response = await fetch('/api/admin/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    title: 'Python Workshop',
    titleNepali: 'पाइथन कार्यशाला',
    description: 'Learn Python programming',
    descriptionNepali: 'पाइथन प्रोग्रामिङ सिकनुहोस्',
    startDate: '2025-11-20T09:00:00',
    endDate: '2025-11-20T17:00:00',
    time: '9:00 AM - 5:00 PM',
    location: 'Training Center',
    locationNepali: 'प्रशिक्षण केन्द्र',
    category: 'training',
    capacity: 100,
    image: 'https://example.com/python.jpg'
  })
});
```

### Fetching Events (Public)
```javascript
const response = await fetch('/api/admin/events?category=workshop&status=upcoming');
const data = await response.json();
```

## Categories

1. **कार्यशाला** (Workshop) - Hands-on training sessions
2. **सेमिनार** (Seminar) - Presentation/discussion events
3. **प्रशिक्षण** (Training) - Formal training programs
4. **सम्मेलन** (Conference) - Large conferences/gatherings
5. **सामाजिक** (Social) - Social events
6. **खेलकुद** (Sports) - Sports events
7. **सांस्कृतिक** (Cultural) - Cultural programs
8. **अन्य** (Other) - Miscellaneous

## Status Values

- **आसन्न** (Upcoming) - Event hasn't started
- **चलमान** (Ongoing) - Event is currently happening
- **पूरा भएको** (Completed) - Event has ended
- **रद्द** (Cancelled) - Event has been cancelled

## Security

- ✅ All admin endpoints require authentication
- ✅ Admin role verification on write operations
- ✅ MongoDB ObjectId validation
- ✅ Input sanitization
- ✅ CORS enabled with credentials

## Bilingual Support

All text fields support both English and Nepali:
- `title` & `titleNepali`
- `description` & `descriptionNepali`
- `location` & `locationNepali`

This allows for complete localization of the event calendar.

## Future Enhancements

1. **Event Registration** - Allow users to register for events
2. **Notifications** - Email/SMS alerts for upcoming events
3. **Event Analytics** - Attendance tracking and reporting
4. **Recurring Events** - Support for repeating events
5. **Calendar View** - Month/Week calendar visualization
6. **Event Sharing** - Social media sharing options
7. **QR Code** - Event QR codes for check-in
8. **Export** - Export events to ICS/PDF formats

## Testing Checklist

- [ ] Create event with all fields
- [ ] Update event
- [ ] Delete event
- [ ] Verify bilingual text displays correctly
- [ ] Test filtering by category
- [ ] Test filtering by status
- [ ] Test search functionality
- [ ] Verify admin-only access on API
- [ ] Test error handling
- [ ] Test pagination

## Troubleshooting

### Events not showing
- Verify `isPublished: true` on event
- Check date filters (only future events for upcoming status)
- Clear browser cache

### Admin endpoints 403
- Verify user has `role: 'admin'` or `isAdmin: true`
- Check authentication session
- Ensure proper credentials are sent

### Image not displaying
- Verify image URL is accessible
- Check CORS settings
- Ensure `useCORS: true` in image loader settings

## Integration with Existing Systems

### With User Management
- Events linked to organizer (admin user)
- Participant tracking integrated with User model

### With Sidebar Navigation
Add to admin sidebar:
```javascript
{
  label: "कार्यक्रम",
  href: "/dashboard/admin/events",
  icon: EventNoteIcon
}
```

## Files Modified/Created

### New Files
- `/models/eventCalendar.js` - Database schema
- `/app/api/admin/events/route.js` - Events API
- `/app/api/admin/events/[id]/route.js` - Event detail API
- `/components/admin/event-calendar/EventCalendarAdmin.js` - Admin component
- `/components/event-calendar/EventCalendar.js` - Public component
- `/app/dashboard/admin/events/page.js` - Admin page
- `/app/events/page.js` - Public page

### Dependencies
No additional npm packages required (uses existing Material-UI, React, Next.js)

## License
Part of ANTUF Platform
