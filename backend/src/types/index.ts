export interface SpeechRequest {
  audioData: string; // Base64 encoded audio data
}

export interface SpeechResponse {
  text: string;
  animation: string;
}

export interface AnimationMapping {
  [key: string]: string;
}
