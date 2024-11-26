import { useState } from 'react';
import { Audio } from 'expo-av';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/speech';

export function useAudioRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [animation, setAnimation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setIsRecording(false);
    setIsLoading(true);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (!uri) throw new Error('No recording URI available');

      // Convert audio to base64
      const response = await fetch(uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        if (!base64Audio) throw new Error('Failed to convert audio to base64');

        // Send to backend
        const result = await axios.post(API_URL, {
          audioData: base64Audio
        });

        setAnimation(result.data.animation);
      };
    } catch (err) {
      console.error('Failed to process recording', err);
    } finally {
      setIsLoading(false);
      setRecording(null);
    }
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    isLoading,
    animation,
  };
}
