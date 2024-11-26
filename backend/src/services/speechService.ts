import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { AnimationMapping } from '../types';

// Simple mapping of phrases to animation identifiers
const phraseMapping: AnimationMapping = {
  'hello': 'HELLO_ANIMATION',
  'how are you': 'HOW_ARE_YOU_ANIMATION',
  // Add more mappings as needed
};

export class SpeechService {
  private speechConfig: sdk.SpeechConfig;

  constructor() {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY!,
      process.env.AZURE_SPEECH_REGION!
    );
  }

  async recognizeSpeech(audioData: string): Promise<string> {
    // Convert base64 audio to push stream
    const pushStream = sdk.AudioInputStream.createPushStream();
    const audioBuffer = Buffer.from(audioData, 'base64');
    pushStream.write(audioBuffer);
    pushStream.close();

    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
      recognizer.recognizeOnceAsync(
        result => {
          if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            resolve(result.text);
          } else {
            reject(new Error('Speech recognition failed'));
          }
        },
        error => {
          reject(error);
        }
      );
    });
  }

  getAnimationForPhrase(text: string): string {
    // Convert text to lowercase for case-insensitive matching
    const normalizedText = text.toLowerCase().trim();
    
    // Find matching phrase in mapping
    for (const [phrase, animation] of Object.entries(phraseMapping)) {
      if (normalizedText.includes(phrase)) {
        return animation;
      }
    }
    
    return 'UNKNOWN_ANIMATION';
  }
}
