# Real-Time Speech Recognition and Sign Language App

A modern mobile application that provides real-time speech-to-text conversion and sign language translation using Azure Cognitive Services, built with React Native (Expo) and ASP.NET Core 8.0.

## Features

- Real-time speech-to-text transcription using Azure Cognitive Services
- Sign language detection and translation
- Continuous speech recognition with 3-second silence detection
- Real-time text updates using SignalR websocket connection
- Modern and responsive mobile UI built with React Native (Expo)
- NativeWind (TailwindCSS) for consistent cross-platform styling
- Robust .NET Core backend with clean architecture
- Cross-platform support (iOS, Android, and Web) through Expo

## Tech Stack

### Frontend
- React Native (Expo) and TypeScript
- NativeWind (TailwindCSS) for styling
- @microsoft/signalr for real-time updates
- Axios for HTTP requests
- Expo managed workflow with hot reloading

### Backend
- ASP.NET Core Web API (.NET 8.0)
- Azure Cognitive Services Speech SDK
- SignalR for real-time communication
- Swagger/OpenAPI for API documentation
- Environment variable configuration
- Comprehensive error logging and monitoring

## Prerequisites

- Node.js and npm
- .NET 8.0 SDK
- Azure Cognitive Services subscription
- Environment variables:
  - `AZURE_SPEECH_KEY`: Your Azure Speech Service API key
  - `AZURE_SPEECH_REGION`: Your Azure region

## Getting Started

1. Clone the repository

2. Set up the backend:
```bash
cd backend
dotnet restore
dotnet run
```

3. Set up the frontend:
```bash
cd frontend
npm install
npx expo start
```

The backend will run on `http://localhost:5000` and Expo will provide options to run the app on your preferred platform (iOS, Android, or Web).

## API Endpoints

- POST `/api/speech/recognize`: Starts speech recognition
- WebSocket `/speechHub`: SignalR hub for real-time text updates

## Video Files Handling

Video files (such as sign language recordings and demo videos) are not included in the repository to maintain a manageable repository size. These files should be:

1. Added to `.gitignore`
2. Stored in an external storage solution
3. Referenced in documentation with download links or instructions for local testing

To handle video files locally:
1. Create a `videos` directory in your project
2. Add the following line to your `.gitignore`:
   ```
   # Video files
   **/*.mp4
   **/*.mov
   **/*.avi
   videos/
   ```
3. Place your video files in the `videos` directory for local testing

## Development Features

- Expo Developer Tools for easy debugging and testing
- Swagger UI available in development mode
- CORS configured for local development
- Comprehensive error logging
- Clean architecture with dependency injection
- Hot reloading for rapid development

## Usage

1. Start both backend and frontend servers
2. Launch the app on your preferred platform through Expo
3. Click the "Start Recording" button to begin speech recognition
4. Speak into your device's microphone
5. View real-time transcription updates
6. Recognition automatically stops after 3 seconds of silence