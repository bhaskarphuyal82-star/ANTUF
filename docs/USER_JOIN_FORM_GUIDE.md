# User Join Form System | सदस्यता फारम प्रणाली

## Overview | परिचय

A comprehensive bilingual (English/Nepali) user registration system for ANTUF members to join the organization.

यो ANTUF सदस्यहरूका लागि संगठनमा सामेल हुन द्विभाषिक (अंग्रेजी/नेपाली) दर्ता प्रणाली हो।

## Features | विशेषताहरू

### Multi-Step Form | बहु-चरण फारम
- **Step 1**: Personal Information (व्यक्तिगत जानकारी)
  - Full name in English and Nepali
  - Date of birth (Nepali calendar)
  - Gender selection
  - Complete address (Province, District, Municipality, Ward)
  - Contact details (Phone, Email)
  - Emergency contact information

- **Step 2**: Work Information (कार्य जानकारी)
  - Occupation
  - Workplace
  - Position
  - Skills

- **Step 3**: Union Information (संघ जानकारी)
  - Union name
  - Membership number
  - Interests
  - Recommendations

### Key Features
- ✅ Bilingual labels (English/Nepali)
- ✅ Form validation with error messages
- ✅ Progress bar showing completion
- ✅ Nepali date picker integration
- ✅ Province selector with all 7 provinces
- ✅ Responsive design
- ✅ Success page with next steps
- ✅ API integration for data persistence

## File Structure

```
components/user/
  └── JoinForm.js                    # Main form component

app/
  ├── dashboard/user/
  │   ├── join/
  │   │   └── page.js                # Join form page
  │   └── success/
  │       └── page.js                # Success confirmation page
  └── api/user/join/
      └── route.js                   # API endpoints (POST/GET)

models/
  └── user.js                        # Updated with join form fields
```

## Usage | प्रयोग

### Accessing the Form | फारममा पहुँच
Navigate to: `/dashboard/user/join`

### Form Fields | फारम फिल्डहरू

#### Required Fields | आवश्यक फिल्डहरू
- पूरा नाम (नेपालीमा) / Full Name (Nepali)
- Full Name (English)
- जन्म मिति / Date of Birth (Nepali)
- लिङ्ग / Gender
- प्रदेश / Province
- जिल्ला / District
- फोन नम्बर / Phone
- इमेल / Email
- पेशा / Occupation
- कार्यस्थल / Workplace

#### Optional Fields | वैकल्पिक फिल्डहरू
- Municipality (गा.पा./न.पा.)
- Ward No. (वडा नं)
- Address (ठेगाना)
- Position (पद)
- Emergency Contact (आपतकालीन सम्पर्क)
- Emergency Phone (आपतकालीन फोन)
- Skills (सीप)
- Union Name (संघको नाम)
- Membership Number (सदस्यता नम्बर)
- Interests (रुचि)
- Recommendations (सिफारिस)

## API Endpoints

### POST `/api/user/join`
Submit join form data

**Request Body:**
```json
{
  "nameEnglish": "Ram Bahadur Shrestha",
  "nameNepali": "राम बहादुर श्रेष्ठ",
  "dobNepali": "५ बैशाख २०५०",
  "gender": "male",
  "province": "बागमती",
  "district": "काठमाडौं",
  "phone": "9812345678",
  "email": "ram@example.com",
  "occupation": "Teacher",
  "workplace": "ABC School",
  ...
}
```

**Success Response:**
```json
{
  "message": "सफलतापूर्वक सबमिट भयो / Successfully submitted",
  "user": {
    "id": "...",
    "nameEnglish": "Ram Bahadur Shrestha",
    "nameNepali": "राम बहादुर श्रेष्ठ",
    "email": "ram@example.com"
  }
}
```

### GET `/api/user/join`
Retrieve user's join form data (requires authentication)

**Response:**
```json
{
  "user": {
    "nameEnglish": "Ram Bahadur Shrestha",
    "nameNepali": "राम बहादुर श्रेष्ठ",
    "dobNepali": "५ बैशाख २०५०",
    ...
  }
}
```

## Database Schema

The User model has been extended with the following fields:

```javascript
{
  // Bilingual Names
  nameEnglish: String,
  nameNepali: String,
  
  // Personal Info
  dobNepali: String,
  gender: String (enum: ['male', 'female', 'other']),
  province: String,
  district: String,
  municipality: String,
  wardNo: String,
  address: String,
  phone: String,
  email: String,
  
  // Emergency Contact
  emergencyContact: String,
  emergencyPhone: String,
  
  // Work Info
  occupation: String,
  workplace: String,
  position: String,
  skills: String,
  
  // Union Info
  unionName: String,
  membershipNumber: String,
  joinDate: Date,
  recommendations: String,
  interests: String
}
```

## Validation Rules

1. **Name Fields**: Required in both English and Nepali
2. **Date of Birth**: Must be selected from Nepali date picker
3. **Gender**: Must select one of the three options
4. **Contact**: Phone and email are required
5. **Province & District**: Required for location tracking
6. **Work Info**: Occupation and workplace are required
7. **Email Uniqueness**: System checks for existing email

## Error Handling

The form provides bilingual error messages:
- Field validation errors
- API submission errors
- Network errors
- Duplicate email errors

## Success Flow

After successful submission:
1. User is redirected to `/dashboard/user/success`
2. Success page displays confirmation message
3. Shows next steps and contact information
4. Provides links to dashboard and events

## Customization

### Adding New Fields
1. Add field to `formData` state in `JoinForm.js`
2. Add input in appropriate step render function
3. Update User model in `models/user.js`
4. Update API route to handle new field

### Modifying Province List
Edit the province dropdown in `renderStep1()`:
```javascript
<option value="कोशी">कोशी प्रदेश</option>
// Add or modify provinces here
```

### Changing Validation Rules
Update the `validateStep()` function in `JoinForm.js`

## Testing

1. Navigate to `/dashboard/user/join`
2. Fill out Step 1 (Personal Information)
3. Click "Next" to proceed to Step 2
4. Fill out Step 2 (Work Information)
5. Click "Next" to proceed to Step 3
6. Fill out Step 3 (Union Information)
7. Click "Submit"
8. Verify redirect to success page
9. Check database for saved data

## Future Enhancements

- [ ] Email verification system
- [ ] SMS OTP verification
- [ ] Document upload (citizenship, photo)
- [ ] Admin approval workflow
- [ ] Membership card generation
- [ ] Payment integration for membership fees
- [ ] Export data to PDF/Excel
- [ ] Multilingual support (add more languages)
- [ ] Mobile app integration

## Support

For questions or issues:
- Email: info@antuf.org
- Phone: +977-01-XXXXXXX

---

**Version**: 1.0.0  
**Last Updated**: November 8, 2025  
**Author**: ANTUF Development Team
