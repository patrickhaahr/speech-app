import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { SpeechService } from './services/speechService';
import { SpeechRequest, SpeechResponse } from './types';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const speechService = new SpeechService();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increased limit for audio data

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Speech-to-Sign Language API is running');
});

// Speech recognition endpoint
app.post('/api/speech', async (req: Request, res: Response) => {
  try {
    const { audioData } = req.body as SpeechRequest;

    if (!audioData) {
      return res.status(400).json({ error: 'Audio data is required' });
    }

    // Recognize speech
    const recognizedText = await speechService.recognizeSpeech(audioData);
    
    // Get corresponding animation
    const animation = speechService.getAnimationForPhrase(recognizedText);

    const response: SpeechResponse = {
      text: recognizedText,
      animation: animation
    };

    res.json(response);
  } catch (error) {
    console.error('Speech recognition error:', error);
    res.status(500).json({ error: 'Speech recognition failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});