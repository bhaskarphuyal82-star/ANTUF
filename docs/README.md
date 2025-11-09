# VideoCallComponent - Reusable GetStream Video Component

## 📖 Overview

A production-ready, reusable React component for real-time video calling powered by GetStream Video SDK. This component provides a complete video calling experience with minimal setup.

## 🎯 Features

- ✅ Real-time HD video/audio streaming
- ✅ Adaptive bitrate for network conditions
- ✅ Camera and microphone controls
- ✅ Fullscreen support
- ✅ Call duration tracking
- ✅ Loading and error states
- ✅ Automatic cleanup
- ✅ Material-UI integration
- ✅ Toast notifications
- ✅ Secure authentication

## 📦 Installation

The component is already set up in your project. Dependencies installed:

```bash
npm install @stream-io/video-react-sdk stream-chat
```

## 🚀 Usage

### Basic Implementation

```javascript
import VideoCallComponent from '@/components/VideoCall/VideoCallComponent';

function MyComponent() {
  const [openCall, setOpenCall] = useState(false);

  return (
    <>
      <button onClick={() => setOpenCall(true)}>
        Start Video Call
      </button>

      <VideoCallComponent
        open={openCall}
        onClose={() => setOpenCall(false)}
        callId="unique_call_id_123"
        callType="default"
        participantName="John Doe"
        participantImage="https://example.com/avatar.jpg"
      />
    </>
  );
}
```

### With Dynamic Import (Recommended)

To avoid SSR issues:

```javascript
import dynamic from 'next/dynamic';

const VideoCallComponent = dynamic(
  () => import('@/components/VideoCall/VideoCallComponent'),
  { ssr: false }
);

function MyComponent() {
  // ... rest of your code
}
```

## 📋 Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | boolean | ✅ Yes | - | Controls visibility of the video call dialog |
| `onClose` | function | ✅ Yes | - | Callback when call ends or dialog closes |
| `callId` | string | ✅ Yes | - | Unique identifier for the call (e.g., "chat_123") |
| `callType` | string | ❌ No | "default" | Type of call (default, livestream, audio_room) |
| `participantName` | string | ❌ No | - | Display name of the other participant |
| `participantImage` | string | ❌ No | - | Avatar URL of the other participant |

## 🎨 Component States

### Loading State
Displays while connecting to GetStream:
```
┌─────────────────────────────┐
│   Connecting spinner        │
│   "Connecting to video..."  │
└─────────────────────────────┘
```

### Error State
Shows if connection fails:
```
┌─────────────────────────────┐
│   ⚠️ Error Alert            │
│   Error message             │
│   Configuration help        │
└─────────────────────────────┘
```

### Active Call State
Shows during active video call:
```
┌─────────────────────────────┐
│ 📹 Video Call - John Doe    │ ← Header with participant name
├─────────────────────────────┤
│                             │
│   [Video Streams]           │ ← Main video area
│   - Remote participant      │
│   - Local (picture-in-pic)  │
│                             │
├─────────────────────────────┤
│  🎤  📹  📞                 │ ← Call controls
└─────────────────────────────┘
```

## 🎛️ Built-in Controls

The component includes these controls:

- **Microphone** - Mute/unmute audio
- **Camera** - Turn video on/off  
- **End Call** - Leave the call
- **Fullscreen** - Toggle fullscreen mode
- **Close** - Exit the dialog

## 🔧 Customization

### Custom Styling

The component uses Material-UI's `sx` prop for styling. Customize by modifying the component:

```javascript
// In VideoCallComponent.js
<Dialog
  sx={{
    // Your custom styles
    '& .MuiDialog-paper': {
      backgroundColor: 'your-color',
    }
  }}
>
```

### Custom Call Layouts

Change the video layout by replacing `SpeakerLayout`:

```javascript
import { GridLayout } from '@stream-io/video-react-sdk';

// Replace <SpeakerLayout /> with:
<GridLayout />
// or
<PaginatedGridLayout />
```

### Custom Controls

Replace `CallControls` with custom buttons:

```javascript
<Box sx={{ display: 'flex', gap: 2 }}>
  <IconButton onClick={() => call.camera.toggle()}>
    <VideocamIcon />
  </IconButton>
  <IconButton onClick={() => call.microphone.toggle()}>
    <MicIcon />
  </IconButton>
  <IconButton onClick={handleClose}>
    <CallEndIcon />
  </IconButton>
</Box>
```

## 📱 Responsive Design

The component is fully responsive:

- **Desktop**: Full-featured interface with all controls
- **Tablet**: Adjusted layout, maintains functionality
- **Mobile**: Optimized for smaller screens, simplified UI

### Fullscreen Mode

Automatically adapts to fullscreen:
```javascript
// Toggle fullscreen
<IconButton onClick={toggleFullscreen}>
  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
</IconButton>
```

## 🔐 Authentication Flow

```
Component Opens
     ↓
useEffect triggers
     ↓
POST /api/video-call
     ↓
Get call configuration
     ↓
POST /api/video-call/token
     ↓
Get user token
     ↓
Initialize StreamVideoClient
     ↓
Create/join call
     ↓
Video streams start
```

## 🎯 Call Types

### Default Call (1-on-1)
```javascript
<VideoCallComponent
  callType="default"
  // ... other props
/>
```

### Audio Room
```javascript
<VideoCallComponent
  callType="audio_room"
  // ... other props
/>
```

### Livestream
```javascript
<VideoCallComponent
  callType="livestream"
  // ... other props
/>
```

## 🐛 Error Handling

The component handles these error scenarios:

1. **No API Keys** - Shows configuration error
2. **Network Failure** - Displays connection error
3. **Permission Denied** - Shows browser permission error
4. **Session Expired** - Redirects to login
5. **Call Creation Failed** - Shows user-friendly message

### Error Messages

```javascript
// Configuration error
"GetStream API credentials not configured"
"Please check your .env file"

// Connection error
"Failed to connect to video call"
"Please check your internet connection"

// Permission error
"Camera/microphone access denied"
"Please allow permissions in browser settings"
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Call connects successfully
- [ ] Video streams appear
- [ ] Audio works both ways
- [ ] Camera toggle works
- [ ] Microphone toggle works
- [ ] End call works
- [ ] Fullscreen works
- [ ] Loading state appears
- [ ] Error handling works
- [ ] Cleanup on unmount

### Test Code

```javascript
describe('VideoCallComponent', () => {
  it('should render loading state initially', () => {
    // Test loading state
  });

  it('should handle connection errors', () => {
    // Test error handling
  });

  it('should cleanup on unmount', () => {
    // Test cleanup
  });
});
```

## 🎨 UI Customization Examples

### Dark Theme (Current)
```javascript
bgcolor: '#1a1a2e' // Dialog background
bgcolor: '#0f0f1e' // Content area
```

### Light Theme
```javascript
bgcolor: '#ffffff' // Dialog background
bgcolor: '#f5f5f5' // Content area
```

### Custom Colors
```javascript
// Primary color
color: '#your-primary-color'

// Accent color
color: '#your-accent-color'
```

## 📊 Performance Tips

1. **Use Dynamic Import** - Reduces initial bundle size
2. **Cleanup on Unmount** - Prevents memory leaks
3. **Optimize Video Quality** - Adjust based on network
4. **Lazy Load Component** - Only load when needed

```javascript
// Good: Dynamic import
const VideoCall = dynamic(() => import('./VideoCallComponent'), {
  ssr: false,
  loading: () => <CircularProgress />
});

// Better: With code splitting
const VideoCall = lazy(() => import('./VideoCallComponent'));
```

## 🔄 Lifecycle

```
Mount
  ↓
Initialize client
  ↓
Join call
  ↓
Stream video/audio
  ↓
User interaction
  ↓
Leave call
  ↓
Disconnect client
  ↓
Cleanup
  ↓
Unmount
```

## 🚀 Advanced Features

### Screen Sharing

```javascript
// Add screen share button
<IconButton onClick={() => call.screenShare.toggle()}>
  <ScreenShareIcon />
</IconButton>
```

### Call Recording

```javascript
// Start recording
await call.recording.start();

// Stop recording
await call.recording.stop();
```

### Background Blur

```javascript
// Enable background blur
await call.camera.applyBackgroundBlur();
```

### Noise Cancellation

```javascript
// Enable noise cancellation
await call.microphone.enable({ noiseSuppression: true });
```

## 📚 API Reference

### Component Methods

| Method | Description |
|--------|-------------|
| `handleClose()` | Ends call and closes dialog |
| `toggleFullscreen()` | Toggles fullscreen mode |

### GetStream Call Methods

| Method | Description |
|--------|-------------|
| `call.join()` | Join the call |
| `call.leave()` | Leave the call |
| `call.camera.toggle()` | Toggle camera |
| `call.microphone.toggle()` | Toggle microphone |
| `call.screenShare.toggle()` | Toggle screen sharing |

## 🔗 Related Files

- **Component**: `/components/VideoCall/VideoCallComponent.js`
- **API Route**: `/app/api/video-call/route.js`
- **Token API**: `/app/api/video-call/token/route.js`
- **Usage Example**: `/components/admin/chat/AdminChat.js`

## 📖 Documentation

- [GetStream Video Complete Guide](./GETSTREAM_VIDEO_COMPLETE_GUIDE.md)
- [Quick Setup Guide](./GETSTREAM_QUICK_SETUP.md)
- [GetStream Official Docs](https://getstream.io/video/docs/react/)

## 🆘 Troubleshooting

### Issue: Component won't load

**Check:**
1. Dynamic import configured correctly?
2. Dependencies installed?
3. Environment variables set?

### Issue: Video won't connect

**Check:**
1. Browser permissions granted?
2. HTTPS enabled (or localhost)?
3. API keys valid?
4. Network allows WebRTC?

### Issue: Poor video quality

**Solutions:**
1. Check internet bandwidth
2. Close other apps using network
3. Adjust video quality settings
4. Try different network

## 💡 Best Practices

1. **Always use dynamic import** to avoid SSR issues
2. **Implement error boundaries** around the component
3. **Clean up on unmount** to prevent memory leaks
4. **Test on different networks** (WiFi, 4G, 5G)
5. **Provide fallback UI** for unsupported browsers
6. **Log errors** for debugging
7. **Monitor call quality** metrics

## 📄 License

This component is part of the project and follows the project's license.

---

**Component Version:** 1.0.0  
**Last Updated:** November 9, 2025  
**Status:** Production Ready ✅  
**Maintained By:** Development Team
