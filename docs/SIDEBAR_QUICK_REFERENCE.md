# Sidebar Design - Quick Reference

## Visual Changes

### Color Scheme
```
Primary: Purple gradient (#667eea → #764ba2)
Secondary: Light gray (#6b7280)
Background: White with subtle gradient
Accent: Red (#ef4444) for logout
Hover: Semi-transparent purple rgba(102, 126, 234, 0.05)
Active: Purple background with left border
```

### Responsive Behavior
- **Desktop:** Permanent drawer, toggle with button
- **Tablet:** Full-width drawer visible
- **Mobile:** Floating menu button, swipeable drawer

## Menu Structure

```
📊 Main
  └─ Dashboard, Profile

📄 Content Management
  └─ Articles, Slider, Video

📂 Courses & Categories
  └─ Categories, Subcategories, etc.

🛒 Orders & Sales
  └─ Card Orders

👥 Users & Messages
  └─ All Users, Chat

📅 Events
  └─ Events

🚪 Logout (Red accent)
```

## Key Features

| Feature | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Drawer State | Permanent | Permanent | Temporary |
| Toggle | Button | Button | Floating button |
| Width | 290px (open), 73px (closed) | 290px | 280px |
| Swipe | No | No | Yes |
| Text | Visible when open | Always | Visible when open |

## Color Usage

### Menu Items
- **Title:** #667eea (Primary purple)
- **Nested items:** #6b7280 (Gray) → #667eea on hover/active
- **Logout:** #ef4444 (Red)

### Backgrounds
- **Hover:** rgba(102, 126, 234, 0.05) - Light purple
- **Active:** rgba(102, 126, 234, 0.1) - Medium purple
- **Divider:** rgba(102, 126, 234, 0.1)

### Borders
- **Active items:** 4px solid #667eea (left border)
- **Header:** 1px solid rgba(102, 126, 234, 0.1)

## Animations

| Element | Animation | Duration |
|---------|-----------|----------|
| Drawer open/close | Slide | 225ms |
| Menu item hover | Translate X + color | 300ms |
| Collapse/Expand | Height | Auto |
| Icon changes | Fade + rotate | 300ms |

## Navigation Paths

```javascript
// Add new menu item with path:
{
  title: "Section",
  icon: <IconComponent />,
  items: [
    { label: "Item Name", path: "admin/path" },
    // Becomes: /dashboard/admin/admin/path
  ]
}
```

## Responsive Breakpoints

```javascript
// MUI breakpoints used:
- xs: 0px (mobile)
- sm: 600px (tablet)
- md: 960px (desktop)
- lg: 1280px (wide screen)
- xl: 1920px (extra wide)
```

## File Locations

```
/Users/aasish/Project/antuf/
├── components/
│   └── sidebar/
│       ├── SideBar.js (Main component)
│       └── DrawerStyles.js (Styles)
└── docs/
    └── SIDEBAR_DESIGN_OVERHAUL.md (Full docs)
```

## Import Example

```javascript
import Sidebar from "@/components/sidebar/SideBar";

// Usage in layout:
<Box sx={{ display: "flex" }}>
  <Sidebar />
  <Box sx={{ flex: 1 }}>
    {/* Main content */}
  </Box>
</Box>
```

## State Management

```javascript
// Drawer state
const [open, setOpen] = useState(true);

// Expanded menus tracking
const [expandedMenus, setExpandedMenus] = useState({});

// Active item tracking
const [activeItem, setActiveItem] = useState(null);

// Mobile drawer state
const [mobileOpen, setMobileOpen] = useState(false);
```

## Common Tasks

### Add Menu Item
```javascript
// In menuItems array:
{
  title: "New Section",
  icon: <NewIcon />,
  items: [
    { label: "Page 1", path: "page1" },
    { label: "Page 2", path: "page2" },
  ],
}
```

### Change Colors
Edit `DrawerStyles.js`:
```javascript
// Primary color
color: "#667eea" // Change this

// Hover color
backgroundColor: "rgba(102, 126, 234, 0.05)" // And this
```

### Modify Drawer Width
```javascript
export const drawerWidth = 290;    // Desktop width
export const mobileDrawerWidth = 280;  // Mobile width
```

## Browser DevTools Tips

### Debug Menu State
```javascript
// In console:
// Check current open state
expandedMenus
activeItem
open
```

### Responsive Testing
- Toggle device toolbar (Cmd+Shift+M / Ctrl+Shift+M)
- Test at: 375px (mobile), 768px (tablet), 1024px (desktop)

## Performance Notes

- Uses CSS transitions (hardware accelerated)
- Collapse component unmountOnExit (memory efficient)
- Custom scrollbar (no extra libraries)
- No unnecessary re-renders with React.Fragment

---

**Last Updated:** November 11, 2025  
**Status:** Production Ready ✅
