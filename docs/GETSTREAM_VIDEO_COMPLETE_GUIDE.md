# GetStream Video API Integration - Complete Guide

## 📋 Overview

This guide covers the complete implementation of real-time video calling using GetStream Video API in the AdminChat component. The system enables direct video calls between admin and users with professional video streaming capabilities.

## 🎯 Features Implemented

### ✅ Real Video Streaming
- **GetStream Video SDK** integration for production-ready video calls
- High-quality video and audio streaming
- Adaptive bitrate for different network conditions
- Low latency communication

### ✅ Video Call UI
- Professional video call interface with Material-UI
- Picture-in-picture layout (remote + local video)
- Full-screen mode support
- Call duration timer
- Connection status indicators

### ✅ Video Controls
- Camera on/off toggle
- Microphone mute/unmute
- End call button
- Fullscreen toggle
- Speaker layout

### ✅ Security & Authentication
- Server-side token generation
- Session-based authentication
- Secure API key management
- User verification

## 🚀 Quick Start

### 1. Install Dependencies

The required packages are already installed:
```bash
npm install @stream-io/video-react-sdk stream-chat
```

### 2. Get GetStream API Keys

1. Sign up at [https://getstream.io/](https://getstream.io/)
2. Create a new app in the GetStream Dashboard
3. Navigate to your app's settings
4. Copy your API Key and Secret

### 3. Configure Environment Variables

Create or update your `.env.local` file:

```env
NEXT_PUBLIC_STREAM_API_KEY=your_public_api_key
STREAM_API_SECRET=your_secret_api_key
```

**Important Security Notes:**
- `NEXT_PUBLIC_STREAM_API_KEY` - Can be exposed in client-side code
- `STREAM_API_SECRET` - Must NEVER be exposed, server-side only

### 4. Start Your Application

```bash
npm run dev
```

## 📁 File Structure

```
/Users/aasish/Project/antuf/
├── components/
│   ├── admin/
│   │   └── chat/
│   │       └── AdminChat.js          # Main admin chat with video call button
│   ├── user/
│   │   └── chat/
│   │       └── UserChat.js           # User chat interface
│   └── VideoCall/
│       └── VideoCallComponent.js     # Reusable video call component
├── app/
│   └── api/
│       └── video-call/
│           ├── route.js              # Video call creation API
│           └── token/
│               └── route.js          # Token generation API
└── docs/
    └── GETSTREAM_VIDEO_COMPLETE_GUIDE.md  # This file
```

## 🔧 Implementation Details

### AdminChat Component Integration

The AdminChat component includes:

1. **Video Call Button** in chat header
2. **Dynamic import** of VideoCallComponent (prevents SSR issues)
3. **Call state management** (duration, active status)
4. **Toast notifications** for call events

```javascript
// Video call button
<IconButton
  size="small"
  onClick={handleStartVideoCall}
  sx={{ 
    color: "#4caf50",
    bgcolor: "#e8f5e9",
    "&:hover": { bgcolor: "#c8e6c9" }
  }}
>
  <VideocamIcon />
</IconButton>

// VideoCallComponent integration
<VideoCallComponent
  open={openVideoCall}
  onClose={handleEndVideoCall}
  callId={`chat_${selectedChat._id}`}
  callType="default"
  participantName={selectedChat.userName}
  participantImage={selectedChat.userImage}
/>
```

### VideoCallComponent Features

**Props:**
- `open` - Boolean to control visibility
- `onClose` - Callback when call ends
- `callId` - Unique identifier for the call
- `callType` - Type of call (default, 1-on-1, etc.)
- `participantName` - Name of the other participant
- `participantImage` - Avatar of the other participant

**Key Features:**
- Automatic connection to GetStream
- Error handling with user-friendly messages
- Loading states during connection
- Call cleanup on unmount
- Fullscreen support

### API Routes

#### `/api/video-call` (POST)

Creates or joins a video call.

**Request:**
```json
{
  "callId": "chat_123456",
  "callType": "default"
}
```

**Response:**
```json
{
  "success": true,
  "apiKey": "your_api_key",
  "userId": "user_id",
  "callId": "chat_123456",
  "callType": "default",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "image": "avatar_url"
  }
}
```

#### `/api/video-call/token` (POST)

Generates authentication token for GetStream.

**Request:**
```json
{
  "userId": "user_id"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "userId": "user_id"
}
```

## 🎨 UI Components

### Video Call Dialog

- **Header**: Participant name, fullscreen toggle, close button
- **Main Area**: Video streams (remote + local)
- **Controls**: Mic, camera, end call buttons
- **Status**: Live indicator, call duration

### Material-UI Styling

- Dark theme (#1a1a2e background)
- Green accent for video buttons
- Red for end call
- Professional gradient effects

## 🔐 Security Best Practices

### Environment Variables
```env
# ✅ DO: Use NEXT_PUBLIC_ prefix for client-side keys
NEXT_PUBLIC_STREAM_API_KEY=abc123

# ✅ DO: Keep secrets without NEXT_PUBLIC_ prefix
STREAM_API_SECRET=xyz789

# ❌ DON'T: Expose secrets in client code
# NEXT_PUBLIC_STREAM_API_SECRET=xyz789  # WRONG!
```

### Authentication
- All API routes verify user session
- Token generation validates user ID
- Server-side token creation only
- No sensitive keys in client code

### Token Security
- Tokens generated server-side
- Short-lived tokens (recommended)
- User-specific tokens
- Session verification

## 🧪 Testing the Integration

### 1. Test Video Call Flow

1. **Select a chat** in AdminChat
2. **Click video call button** (green camera icon)
3. **Wait for connection** (loading indicator)
4. **Video call opens** with controls
5. **Test controls**: mic, camera, fullscreen
6. **End call** and verify cleanup

### 2. Test Error Scenarios

**Missing API Keys:**
- Remove API keys from .env
- Start video call
- Verify error message displays

**Network Issues:**
- Throttle network in DevTools
- Verify loading states work
- Check error handling

**Session Issues:**
- Log out during call
- Verify graceful disconnection

### 3. Test UI Responsiveness

- Test on different screen sizes
- Verify fullscreen mode
- Check mobile layout
- Test call controls accessibility

## 🎓 GetStream SDK Features

### Core Features Used

1. **StreamVideoClient** - Main client instance
2. **StreamCall** - Individual call management
3. **SpeakerLayout** - Video layout component
4. **CallControls** - Built-in control buttons
5. **StreamTheme** - Styling wrapper

### Available Layouts

- `SpeakerLayout` - Active speaker focus (currently used)
- `GridLayout` - Equal sized participants
- `PaginatedGridLayout` - Grid with pagination

### Additional Features (Not Yet Implemented)

- Screen sharing
- Call recording
- Background blur/replacement
- Noise cancellation
- Call statistics/quality metrics
- Multi-participant calls
- Text chat during calls
- Reactions/emojis

## 🔄 Call Flow Diagram

```
Admin Clicks Video Button
         ↓
AdminChat.handleStartVideoCall()
         ↓
VideoCallComponent Opens
         ↓
Fetch /api/video-call (POST)
         ↓
Server Creates Call & Returns Config
         ↓
Fetch /api/video-call/token (POST)
         ↓
Server Generates User Token
         ↓
StreamVideoClient Initialized
         ↓
Call.join() with Token
         ↓
GetStream Establishes Connection
         ↓
Video Streams Start
         ↓
User Controls Video/Audio
         ↓
User Clicks End Call
         ↓
Call.leave() & Client Disconnect
         ↓
VideoCallComponent Closes
```

## 🐛 Troubleshooting

### Issue: "GetStream API credentials not configured"

**Solution:**
1. Check `.env.local` file exists
2. Verify key names match exactly:
   - `NEXT_PUBLIC_STREAM_API_KEY`
   - `STREAM_API_SECRET`
3. Restart Next.js dev server
4. Clear browser cache

### Issue: Video call not connecting

**Checklist:**
- [ ] API keys are valid and active
- [ ] User is logged in (session exists)
- [ ] Browser has camera/mic permissions
- [ ] Network allows WebRTC connections
- [ ] No firewall blocking GetStream servers

### Issue: "Failed to generate token"

**Causes:**
- Invalid API secret
- User ID mismatch
- Session expired

**Fix:**
```bash
# Verify environment variables
echo $NEXT_PUBLIC_STREAM_API_KEY
echo $STREAM_API_SECRET

# Restart dev server
npm run dev
```

### Issue: Video freezes or lags

**Solutions:**
- Check network bandwidth
- Reduce video quality settings
- Close other bandwidth-heavy apps
- Check GetStream service status

## 📚 Additional Resources

### GetStream Documentation
- [GetStream Video Docs](https://getstream.io/video/docs/)
- [React Video SDK](https://getstream.io/video/docs/react/)
- [Video Tutorial](https://getstream.io/video/docs/react/tutorials/video-calling/)

### Community & Support
- [GetStream Community](https://getstream.io/chat/community/)
- [GitHub Issues](https://github.com/GetStream/stream-video-js)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/getstream)

## 🎯 Next Steps & Enhancements

### Phase 1: Current Implementation ✅
- [x] Basic video calling
- [x] Camera/mic controls
- [x] Fullscreen mode
- [x] Server-side authentication
- [x] Error handling

### Phase 2: Enhanced Features 🚧
- [ ] Screen sharing
- [ ] Background effects
- [ ] Call recording
- [ ] Call history/logs
- [ ] Multi-participant calls

### Phase 3: Advanced Features 📋
- [ ] Virtual backgrounds
- [ ] Noise cancellation
- [ ] Call quality analytics
- [ ] Bandwidth optimization
- [ ] Custom layouts

### Phase 4: User Experience 💡
- [ ] Call notifications (push)
- [ ] Missed call indicators
- [ ] Voicemail/message option
- [ ] Scheduled calls
- [ ] Call feedback system

## 🔒 Production Checklist

Before deploying to production:

- [ ] Environment variables set in production server
- [ ] GetStream API keys are production keys (not test keys)
- [ ] Rate limiting implemented on API routes
- [ ] Error logging/monitoring configured
- [ ] HTTPS enforced (required for WebRTC)
- [ ] Browser compatibility tested
- [ ] Mobile devices tested
- [ ] Network bandwidth requirements documented
- [ ] Privacy policy updated (video calls disclosure)
- [ ] Terms of service updated
- [ ] User consent for camera/mic access
- [ ] Data retention policy for call logs

## 📞 Support

For issues or questions:

1. Check this documentation first
2. Review GetStream documentation
3. Check browser console for errors
4. Test with GetStream test credentials
5. Contact GetStream support if SDK issues
6. Open GitHub issue for project-specific bugs

---

**Last Updated:** November 9, 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
