# Slider API "Failed to Fetch" Error Fix

## Problem
The sliders management page was showing "error loading sliders - Failed to fetch" error when trying to load the slider list.

## Root Cause
The `sliderSlice.js` was using `process.env.API` which was undefined/not configured:
```javascript
// ❌ Before (Broken)
const response = await fetch(`${process.env.API}/admin/sliders`);
```

This resulted in fetching from `undefined/admin/sliders` which obviously failed.

## Solution
Changed all API calls in `sliderSlice.js` to use relative paths (client-side API routes):
```javascript
// ✅ After (Fixed)
const response = await fetch(`/api/admin/sliders`);
```

## Files Modified

### 1. `/slice/sliderSlice.js`
Updated all API endpoints to use relative paths:
- `fetchSliderById`: Changed to `/api/admin/sliders/{id}`
- `fetchSliders`: Changed to `/api/admin/sliders`
- `fetchHomeSliders`: Changed to `/api/sliders` (fixed duplicate type too)
- `createSlider`: Changed to `/api/admin/sliders`
- `updateSlider`: Changed to `/api/admin/sliders/{id}`
- `deleteSlider`: Changed to `/api/admin/sliders/{id}`

### 2. `/app/dashboard/admin/slider/list/page.js`
Enhanced error handling to display user-friendly error messages:
```javascript
if (error) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6" color="error">
        Error loading sliders: {error}
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => dispatch(fetchSliders())}
      >
        Retry
      </Button>
    </Box>
  );
}
```

## Why This Works

1. **Relative Paths**: Next.js automatically routes `/api/*` to the API routes in `/app/api/*`
2. **No Environment Config Needed**: No need to set up `process.env.API` for internal API calls
3. **Built-in Routing**: The API routes are already configured at `/api/admin/sliders`
4. **Consistent Pattern**: This pattern is used throughout the application

## Benefits

✅ No environment configuration required
✅ Simple, clean API calls
✅ Automatic URL construction by Next.js
✅ Better error messages for debugging
✅ User-friendly retry option

## Testing

1. Navigate to `/dashboard/admin/slider/list`
2. Sliders should load successfully
3. If error occurs, click "Retry" button to try again

## Build Status
✅ Build successful - All 122 static pages generated
