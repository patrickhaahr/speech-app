# Speech-to-Sign Language Translator App

A mobile application that converts speech into sign language animations, built with React Native (Expo) and Node.js.

## Features

- Real-time speech recording
- Speech-to-text conversion using Azure Speech Services
- Mapping of text to sign language animations
- Simple and intuitive user interface

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Azure Speech Services API key

## Project Structure

```
speech-app/
├── frontend/               # React Native app
│   ├── App.tsx            # Main application component
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

3. Start the Expo development server:
   ```bash
   npm start
   ```

4. Use the Expo Go app on your mobile device to scan the QR code and run the application

## Usage

1. Open the app on your mobile device
2. Press the "Start Recording" button to begin recording your speech
3. Speak clearly into the microphone
4. Press "Stop Recording" when finished
5. The app will process your speech and display the corresponding sign language animation

## Adding New Animations

To add new sign language animations:

1. Create your animation video files
2. Add them to the frontend assets directory
3. Update the phrase mapping in `backend/src/services/speechService.ts`

## Technical Notes

- The app uses Azure Speech Services for speech-to-text conversion
- Audio is converted to base64 before being sent to the backend
- The backend maps recognized text to predefined animation identifiers
- Currently supports a limited set of phrases for proof of concept

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
