# Nepali Calendar Quick Reference Guide

## For Administrators Using the Event Calendar

### How to Use the Nepali Date Picker

#### Step 1: Open Event Form
- Click **"नयाँ कार्यक्रम"** (New Event) button in the admin panel
- A form dialog will appear with multiple fields

#### Step 2: Select Event Start Date
1. Look for the field labeled **"शुरुआत मिति (नेपाली मिति)"** (Start Date - Nepali Calendar)
2. Click on it - a calendar dialog will open
3. You'll see the current month/year at the top in Nepali numerals

#### Step 3: Navigate the Calendar
You have three view modes:

**Day View** (Default)
- Shows calendar grid for current month
- Use **◀** and **▶** arrows to change months
- Click on any date to select it
- Selected date appears highlighted in red

**Month View**
- Click the month name to switch to this view
- Shows all 12 Nepali months
- Select the month you need
- Returns to day view for date selection

**Year View**
- Click the year to switch to this view
- Shows 12-year range
- Select your year
- Returns to month view

#### Step 4: Confirm Selection
- Once you've selected the date, click **"चयन गर्नुहोस्"** (Select) button
- The date picker closes
- The selected date displays as: `YYYY/MM/DD MonthName`

#### Step 5: Verify & Continue
- The AD (Gregorian) date field below automatically updates
- Both dates should match (just different calendars)
- Continue filling other event details
- Click **"बचत गर्नुहोस्"** (Save) to create/update event

---

## Nepali Calendar Overview

### Nepali Months (नेपाली महिना)

| BS Month | Name (नेपाली) | Approximate AD Dates | Days |
|----------|---------------|----------------------|------|
| 1 | बैशाख | Mid-April to Mid-May | 31 |
| 2 | जेष्ठ | Mid-May to Mid-June | 31 |
| 3 | आषाढ | Mid-June to Mid-July | 32* |
| 4 | श्रावण | Mid-July to Mid-August | 31 |
| 5 | भाद्र | Mid-August to Mid-September | 31 |
| 6 | आश्विन | Mid-September to Mid-October | 30 |
| 7 | कार्तिक | Mid-October to Mid-November | 30 |
| 8 | मंसिर | Mid-November to Mid-December | 30 |
| 9 | पौष | Mid-December to Mid-January | 30 |
| 10 | माघ | Mid-January to Mid-February | 30 |
| 11 | फाल्गुण | Mid-February to Mid-March | 30/32* |
| 12 | चैत्र | Mid-March to Mid-April | 32* |

*Days vary in certain leap years

### Nepali Numbers (नेपाली अंकहरू)

| English | Nepali | English | Nepali |
|---------|--------|---------|--------|
| 0 | ० | 5 | ५ |
| 1 | १ | 6 | ६ |
| 2 | २ | 7 | ७ |
| 3 | ३ | 8 | ८ |
| 4 | ४ | 9 | ९ |

### Year Conversion
```
Nepali Year = English Year - 57

Examples:
- 2023 AD = 2080 BS (2023 - 57 = 1966... wait, 2023 - 1943 = 80... actually it's 2080)
- 2024 AD = 2081 BS
- 2025 AD = 2082 BS
```

---

## Common Dates & Conversions

### National Holidays (नेपाली राष्ट्रिय पर्वहरू)

| Event | Nepali Date | AD Date |
|-------|-------------|---------|
| नेपाल दिवस (Nepal Day) | Chaitra 27 | April 10 |
| राष्ट्रिय प्रतिदिवस (National Day) | Kartik 23 | November 6 |
| गणतन्त्र दिवस (Republic Day) | Falgun 23 | March 8 |
| विजया दशमी (Dashain Festival) | Ashwin 15 | Sept/Oct |
| दिपावली (Diwali) | Kartik 15 | Oct/Nov |
| छठ परब (Chhath Festival) | Kartik 30 | Nov |
| माघे संक्रान्ति (Makar Mela) | Magh 1 | Jan 14 |

---

## Tips for Using the Date Picker

### ✅ Do's
- ✅ Click the month/year names to navigate faster
- ✅ Use arrow buttons for fine navigation
- ✅ Double-check both Nepali and AD dates match
- ✅ Set start date before end date
- ✅ Use the AD field for manual adjustments if needed

### ❌ Don'ts
- ❌ Don't manually edit Nepali date field (click to open picker)
- ❌ Don't set end date before start date
- ❌ Don't mix up Nepali and AD dates
- ❌ Don't close browser during date selection

---

## Examples

### Example 1: Create a Workshop on Baisakh 10, 2080
1. Click "नयाँ कार्यक्रम"
2. Fill in: Title, Description, Location, etc.
3. Click Nepali Start Date picker
4. Calendar shows current month
5. You see: "बैशाख २०८०" (Baisakh 2080)
6. Click date **१०** (10)
7. Dialog shows: "२०८०/०१/१०"
8. Click "चयन गर्नुहोस्"
9. AD date auto-fills: April 23, 2023
10. Set end date to same day or later
11. Save event

### Example 2: Create a Festival Event Lasting 3 Days
1. Open event form
2. **Start Date**: Kartik 15, 2080 (Diwali) → October 30, 2023
3. **End Date**: Kartik 17, 2080 → November 1, 2023
4. Fill other details (title, capacity, organizer)
5. Click Save

### Example 3: Find Events in a Specific Month
1. In admin panel, use Category/Status filters
2. Browse events table
3. Dates shown in both Nepali and AD formats
4. Click Edit to verify exact dates in Nepali calendar

---

## Nepali Calendar Features in Admin Panel

### Statistics Dashboard
- **कुल कार्यक्रम** (Total Events)
- **आसन्न** (Upcoming)
- **चलमान** (Ongoing)
- **पूरा भएको** (Completed)

### Event Table Columns
| Column | Content |
|--------|---------|
| कार्यक्रम | Event name (English & Nepali) |
| मिति | Start date in both calendars |
| श्रेणी | Category (Workshop, Seminar, etc.) |
| स्थिति | Status (Upcoming, Ongoing, etc.) |
| कार्य | Edit/Delete actions |

### Filters Available
- **श्रेणी**: Workshop, Seminar, Training, Conference, Social, Sports, Cultural, Other
- **स्थिति**: Upcoming, Ongoing, Completed, Cancelled

---

## Browser Keyboard Shortcuts (When Calendar is Open)

| Shortcut | Action |
|----------|--------|
| Tab | Navigate between picker elements |
| Space | Select highlighted date |
| Esc | Close calendar |

---

## Troubleshooting

### "Calendar not showing dates"
- Ensure JavaScript is enabled
- Try refreshing the page
- Clear browser cache
- Check console for errors (F12)

### "Date doesn't update"
- Make sure to click "चयन गर्नुहोस्" button
- Click outside the date field first, then reopen
- Verify the date is within valid range (1976-2100)

### "Wrong date is showing"
- Confirm you selected from the correct calendar (Nepali not AD)
- Check if AD date is updating (should auto-convert)
- Try selecting date again

### "Can't save event"
- Verify both start and end dates are set
- Ensure start date is before end date
- Fill all required fields (marked with *)
- Check for any error messages

---

## Quick Reference: This Year

### Current Year: २०८० BS

**Months and Approximate AD Equivalents:**
- बैशाख २०८०: April 13 - May 13, 2023
- जेष्ठ २०८०: May 14 - June 13, 2023
- आषाढ २०८०: June 14 - July 16, 2023
- श्रावण २०८०: July 17 - August 16, 2023
- भाद्र २०८०: August 17 - September 16, 2023
- आश्विन २०८०: September 17 - October 16, 2023
- कार्तिक २०८०: October 17 - November 16, 2023
- मंसिर २०८०: November 17 - December 16, 2023
- पौष २०८०: December 17 - January 15, 2024
- माघ २०८०: January 16 - February 14, 2024
- फाल्गुण २०८०: February 15 - March 15, 2024
- चैत्र २०८०: March 16 - April 12, 2024

---

## Support & Feedback

For issues or suggestions regarding the Nepali calendar date picker:
1. Check the documentation folder for more details
2. Contact the development team
3. Report bugs with screenshots

---

**Last Updated**: November 8, 2024
**Version**: 1.0
**Status**: Active
