# Contact Page Documentation

## Overview
The Contact page (`/app/contact/page.js`) provides a comprehensive contact interface for ANTUF with bilingual support (English/Nepali), modern Material-UI styling, and multiple ways to connect with the organization.

## Features

### 1. **Bilingual Support**
- Language toggle between English and Nepali
- All content dynamically updates based on selected language
- Smooth language switching using MUI Chips

### 2. **Hero Banner**
- Modern gradient background (blue theme)
- Language selector chips
- Responsive hero section with overlay pattern
- Clear call-to-action messaging

### 3. **Contact Information Cards**
Four prominent cards displaying:
- **Email**: info@antuf.org
- **Phone**: +977-1-XXXXXXX
- **Location**: Kathmandu, Nepal
- **Office Hours**: 10 AM - 5 PM (Mon-Fri)

Features:
- Hover animations (lift effect)
- Icon-based visual hierarchy
- Responsive grid layout

### 4. **Contact Form**
Comprehensive form with validation:
- **Select Reason** (required): Membership, Event, Donation, Partnership, General, Other
- **Full Name** (required)
- **Email Address** (required with validation)
- **Contact Number** (optional): With country code placeholder
- **Message** (required): 300 character limit

Features:
- Real-time validation with error messages
- Bilingual error messages
- Clear required field indicators
- Character limit enforcement
- Success notification after submission

### 5. **Quick Contact Section**
Two-column layout with:
- **Left Column**: Department-specific contacts
  - General Inquiries: info@antuf.org
  - Support & Membership: support@antuf.org
  - Partnerships: partnerships@antuf.org
  - Response time information

- **Right Column**: Social Media & Visit Information
  - Social media buttons (Facebook, Twitter, LinkedIn)
  - Office location and hours
  - Quick tip callout box

### 6. **FAQ Section**
Four common questions with bilingual answers:
1. How to become a member
2. What events ANTUF organizes
3. How to support ANTUF
4. Partnership opportunities

Features:
- Card-based layout
- Responsive grid
- Clear typography hierarchy

## Color Scheme
- **Primary Blue**: #1976d2
- **Dark Blue**: #1565c0
- **Text**: #333 (headings), #666 (body)
- **Borders**: #e0e0e0
- **Error**: #d32f2f
- **Social Media**: Platform-specific colors

## Components Used
- Material-UI Components:
  - Box, Container, Paper, Grid
  - Typography, TextField, Button
  - Card, Chip, Stack
  - Snackbar, Alert
  - Select, MenuItem, FormControl
  - Divider
- Custom Icons:
  - EmailIcon, PhoneIcon, LocationOnIcon, AccessTimeIcon
  - SendIcon, FacebookIcon, TwitterIcon, LinkedInIcon
- Custom Components:
  - Navbar
  - Footer

## State Management
```javascript
const [language, setLanguage] = useState('en'); // Language toggle
const [formData, setFormData] = useState({
  selectReason: "",
  name: "",
  email: "",
  contactNumber: "",
  message: ""
});
const [showSuccess, setShowSuccess] = useState(false);
const [errors, setErrors] = useState({});
```

## Validation Rules
1. **Select Reason**: Must not be empty
2. **Name**: Must not be empty
3. **Email**: Must be valid format (regex: /\S+@\S+\.\S+/)
4. **Message**: 
   - Must not be empty
   - Minimum 10 characters
   - Maximum 300 characters

## Translation Structure
Content is organized in `content` object with `en` and `ne` keys:
- Form labels and placeholders
- Button text
- Error messages
- FAQ questions and answers
- Section headings

## Form Submission
Currently configured for frontend validation only. To integrate with backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, language }),
      });
      
      if (response.ok) {
        setShowSuccess(true);
        setFormData({...}); // Reset form
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
};
```

## Responsive Design
- **Mobile (xs)**: Single column layout, stacked cards
- **Tablet (sm)**: 2-column grid for contact cards
- **Desktop (md)**: Full 4-column grid, side-by-side layouts

## Accessibility
- Clear form labels with required indicators
- Error messages linked to fields
- Keyboard navigation support
- ARIA-compliant Material-UI components
- High contrast text and borders

## Usage
```jsx
import ContactUs from '@/app/contact/page';

// The page is already set up as a Next.js route at /contact
// No additional configuration needed
```

## Future Enhancements
1. **Backend Integration**:
   - Create `/api/contact` endpoint
   - Add email notification system
   - Store contact submissions in database

2. **Advanced Features**:
   - File attachment support
   - Real-time chat integration
   - Google Maps integration for office location
   - Email verification

3. **Analytics**:
   - Track form submission rates
   - Monitor response times
   - Analyze common inquiry types

4. **Additional Languages**:
   - Easy to extend with more languages
   - Add language selector dropdown for 3+ languages

## Contact Information (Update as needed)
Current placeholders should be replaced with actual ANTUF contact details:
- Email addresses
- Phone numbers
- Physical address
- Social media URLs
- Office hours

## Styling Customization
To adjust the theme:
1. Update color values in `sx` props
2. Modify spacing in Grid `spacing` props
3. Adjust typography variants for different hierarchy
4. Change elevation and border radius values

## Notes
- Form data is logged to console (remove in production)
- Social media buttons need actual URLs
- Phone number format accepts any input (consider validation)
- Success message auto-dismisses after 6 seconds
- Language preference not persisted (add localStorage if needed)
