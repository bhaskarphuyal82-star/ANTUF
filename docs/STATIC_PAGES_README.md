# Static Pages Documentation

## Overview
All static pages for the ANTUF platform are organized in the `/app/pages/` directory for easy access and maintainability. This centralized structure provides a unified way to manage all information pages.

## Directory Structure

```
/app/pages/
├── page.js                    # Main index/directory page for all static pages
├── index.js                   # Static pages configuration and metadata
├── about/
│   └── page.js               # About Us page
├── representatives/
│   └── page.js               # Representatives page
├── contact/
│   └── page.js               # Contact page
├── donation/
│   └── page.js               # Donation page
├── history/
│   └── page.js               # History page
├── organization/
│   └── page.js               # Organization Structure page
├── activities/
│   └── page.js               # Activities page
└── documents/
    └── page.js               # Documents page
```

## Pages Description

### 1. Pages Index (`/pages`)
**Route:** `/pages`

The main landing page for all static pages featuring:
- **Search functionality** - Filter pages by title or description
- **Card-based layout** - Beautiful, interactive cards for each page
- **Status indicators** - Shows which pages are available or coming soon
- **Bilingual content** - All content in both Nepali and English
- **Responsive design** - Works perfectly on all devices
- **Material-UI components** - Modern, professional design

### 2. About Us (`/pages/about`)
**Route:** `/pages/about`

Information about ANTUF organization including:
- Mission and vision
- Organization values
- Core objectives
- Team information

### 3. Representatives (`/pages/representatives`)
**Route:** `/pages/representatives`

Details about organization representatives:
- Leadership team
- Board members
- Contact information
- Roles and responsibilities

### 4. Contact (`/pages/contact`)
**Route:** `/pages/contact`

Contact information and inquiry form:
- Office address
- Phone numbers
- Email addresses
- Contact form
- Social media links
- Google Maps integration

### 5. Donation (`/pages/donation`)
**Route:** `/pages/donation`

Information about supporting ANTUF:
- Donation methods
- Payment options
- Bank account details
- Impact stories
- Transparency reports

### 6. History (`/pages/history`)
**Route:** `/pages/history`

Historical timeline of ANTUF:
- Organization founding
- Major milestones
- Timeline visualization
- Key achievements
- Future vision

### 7. Organization Structure (`/pages/organization`)
**Route:** `/pages/organization`

Organizational hierarchy and structure:
- Leadership team
- Departments
- Organization chart
- Committee structure
- Reporting lines

### 8. Activities (`/pages/activities`)
**Route:** `/pages/activities`

Overview of ANTUF activities:
- Educational programs
- Social initiatives
- Health campaigns
- Awareness programs
- Categorized by type
- Status tracking (ongoing, completed, upcoming, planned)

### 9. Documents (`/pages/documents`)
**Route:** `/pages/documents`

Important organizational documents:
- Constitution
- Annual reports
- Financial statements
- Membership forms
- Templates
- Rules and regulations
- Download functionality
- Search and filter

## Features

### Common Features Across All Pages

1. **Bilingual Support**
   - All content in Nepali and English
   - Seamless language presentation
   - Cultural context maintained

2. **Breadcrumb Navigation**
   - Easy navigation hierarchy
   - Quick return to home or pages index
   - Current location indicator

3. **Responsive Design**
   - Mobile-first approach
   - Tablet optimization
   - Desktop enhancement
   - Consistent experience across devices

4. **Material-UI Integration**
   - Modern, professional design
   - Consistent styling
   - Theme compatibility
   - Accessibility compliant

5. **Interactive Elements**
   - Hover effects
   - Smooth transitions
   - Loading states
   - User feedback

## Navigation Access

### Main Navigation Bar
- **"📄 सबै पृष्ठहरू"** button in the navigation bar
- Prominent placement for easy access
- Distinctive styling with gradient background
- Direct link to `/pages` index

### Individual Page Links
Each page can also be accessed directly through:
- Navigation menu items
- Footer links
- Breadcrumb navigation
- Internal page links

## Configuration File (`index.js`)

The `index.js` file contains the configuration for all static pages:

```javascript
export const staticPages = [
  {
    id: 'about',
    title: 'हाम्रो बारेमा / About Us',
    path: '/pages/about',
    description: 'ANTUF संगठनको परिचय',
    icon: '📖',
  },
  // ... more pages
];
```

### Configuration Properties:
- **id**: Unique identifier for the page
- **title**: Bilingual title
- **path**: Route path
- **description**: Brief description
- **icon**: Emoji or icon for visual identification

## Development Guidelines

### Adding a New Static Page

1. **Create the page directory:**
   ```bash
   mkdir -p app/pages/newpage
   ```

2. **Create the page component:**
   ```bash
   touch app/pages/newpage/page.js
   ```

3. **Update the configuration:**
   Edit `app/pages/index.js` and add:
   ```javascript
   {
     id: 'newpage',
     title: 'नयाँ पृष्ठ / New Page',
     path: '/pages/newpage',
     description: 'Brief description',
     icon: '🆕',
   }
   ```

4. **Follow the component structure:**
   - Use Material-UI components
   - Include breadcrumb navigation
   - Add bilingual content
   - Maintain responsive design
   - Include appropriate status indicators

### Page Component Template

```javascript
'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const NewPage = () => {
  const router = useRouter();

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link onClick={() => router.push('/')}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            गृहपृष्ठ / Home
          </Link>
          <Link onClick={() => router.push('/pages')}>
            पृष्ठहरू / Pages
          </Link>
          <Typography color="text.primary">
            नयाँ पृष्ठ / New Page
          </Typography>
        </Breadcrumbs>

        {/* Your content here */}
      </Container>
    </Box>
  );
};

export default NewPage;
```

## Testing

### Manual Testing Checklist:
- [ ] All pages load without errors
- [ ] Search functionality works correctly
- [ ] Navigation links work properly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Breadcrumbs navigate correctly
- [ ] Status indicators display correctly
- [ ] Bilingual content displays properly
- [ ] Loading states work smoothly
- [ ] Error states handle gracefully

### Routes to Test:
- http://localhost:3000/pages
- http://localhost:3000/pages/about
- http://localhost:3000/pages/representatives
- http://localhost:3000/pages/contact
- http://localhost:3000/pages/donation
- http://localhost:3000/pages/history
- http://localhost:3000/pages/organization
- http://localhost:3000/pages/activities
- http://localhost:3000/pages/documents

## Styling Guidelines

### Color Scheme:
- **Primary Gradient:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Background:** `#f5f5f5`
- **Card Background:** `white`
- **Text Primary:** `#333`
- **Text Secondary:** `text.secondary`

### Typography:
- **Headings:** Bold (600-700 weight)
- **Body Text:** Regular weight, good line height (1.6-1.8)
- **Bilingual Text:** Clear hierarchy between languages

### Spacing:
- **Consistent padding:** Use MUI spacing system (sx={{ p: 3, mb: 4 }})
- **Responsive spacing:** Adjust for different screen sizes
- **Gap between elements:** 2-3 units

## Maintenance

### Regular Updates:
1. Keep content fresh and accurate
2. Add new pages as needed
3. Update configuration when adding pages
4. Review and optimize performance
5. Check for broken links
6. Update images and media
7. Test on new browsers/devices

### Version Control:
- All changes committed to Git
- Clear commit messages
- Regular backups
- Documentation updates

## Future Enhancements

### Planned Features:
- [ ] Multi-language switcher (beyond Nepali/English)
- [ ] Page analytics and tracking
- [ ] User favorites/bookmarks
- [ ] Print-friendly versions
- [ ] PDF export functionality
- [ ] Social media sharing
- [ ] Comments/feedback system
- [ ] Related pages suggestions
- [ ] Recently viewed pages
- [ ] Page version history

## Support and Contact

For questions or issues related to static pages:
- Check this documentation first
- Review existing pages for examples
- Contact the development team
- Refer to Material-UI documentation

## Credits

Built with:
- Next.js 14
- Material-UI (MUI)
- React 18
- Modern web technologies

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Active Development
