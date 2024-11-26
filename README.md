# Speech-to-Sign Language Translator App

A mobile application that converts speech into sign language animations, built with React Native (Expo) and Node.js.

## Features

- Real-time speech recording
- Speech-to-text conversion using Azure Speech Services
- Mapping of text to sign language animations
- Modern UI with Tailwind CSS styling
- TypeScript support for better development experience

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Azure Speech Services API key

## Project Structure

```
speech-app/
├── frontend/                # React Native app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── screens/       # Screen components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   ├── App.tsx            # Main application component
│   ├── global.css         # Tailwind CSS styles
│   ├── metro.config.js    # Metro bundler config
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js express server
│   ├── src/
│   │   ├── app.ts        # Express application
│   │   ├── types/        # TypeScript interfaces
│   │   └── services/     # Business logic
│   └── package.json      # Backend dependencies
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with your Azure credentials:
   ```
   AZURE_SPEECH_KEY=your_azure_speech_key_here
   AZURE_SPEECH_REGION=your_azure_region_here
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Expo:
   ```bash
   npm start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code and run the application

## Usage

1. Launch the app on your device
2. Press the "Start Recording" button to begin recording your speech
3. Speak clearly into the microphone
4. Press "Stop Recording" when finished
5. The app will process your speech and display the corresponding sign language animation

## Technical Stack

- **Frontend**:
  - React Native
  - TypeScript
  - Tailwind CSS (via NativeWind)
  - Axios for API requests
  - Expo AV for audio recording

- **Backend**:
  - Node.js with Express
  - TypeScript
  - Azure Speech Services SDK
  - CORS middleware
  - Environment variables management

## Adding New Animations

To add new sign language animations:

1. Create your animation video files
2. Add them to the frontend assets directory
3. Update the phrase mapping in `backend/src/services/speechService.ts`

## Limitations

- Currently supports only a few predefined phrases
- Animations are placeholder text (need to be replaced with actual video files)
- Requires internet connection for speech recognition

## Future Improvements

- Add more phrases and animations
- Implement offline mode
- Add support for different languages
- Improve animation rendering
- Add user preferences and settings
