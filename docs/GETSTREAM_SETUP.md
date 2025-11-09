# GetStream Video API Configuration

## Environment Variables

Add these to your `.env.local` file:

```env
# GetStream Video API Keys
NEXT_PUBLIC_STREAM_API_KEY=your_api_key_here
STREAM_API_SECRET=your_api_secret_here
```

## How to Get API Keys

1. Go to https://getstream.io/
2. Sign up or log in
3. Create a new app or select existing one
4. Navigate to Dashboard → Your App → API Keys
5. Copy:
   - **API Key** → `NEXT_PUBLIC_STREAM_API_KEY`
   - **API Secret** → `STREAM_API_SECRET` (Keep this secret!)

## Installation

Install required packages:

```bash
npm install @stream-io/video-react-sdk stream-chat
```

## Security Note

- `NEXT_PUBLIC_STREAM_API_KEY` - Can be exposed to client (public)
- `STREAM_API_SECRET` - Must remain server-side only (private)

## API Endpoint

**POST** `/api/video-call`
- Creates or joins a video call
- Generates user token
- Returns call configuration

**Request Body:**
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
