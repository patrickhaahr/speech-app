import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RecordButton } from '../components/RecordButton';
import { VideoPlayer } from '../components/VideoPlayer';
import { useAudioRecording } from '../hooks/useAudioRecording';

export function HomeScreen() {
  const { 
    startRecording, 
    isLoading, 
    transcribedText,
    error 
  } = useAudioRecording();
  
  const [videoPath, setVideoPath] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (transcribedText) {
      // Reset video state when new text is received
      setVideoPath(null);
      setIsPlaying(false);
      
      // Use hardcoded video paths based on the transcribed text
      const text = transcribedText.toLowerCase().trim();
      if (text.includes('hello')) {
        setVideoPath('/videos/ASL_HELLO.mp4');
        setIsPlaying(true);
      } else if (text.includes('hi')) {
        setVideoPath('/videos/ASL_HI.mp4');
        setIsPlaying(true);
      } else if (text.includes('how are you')) {
        setVideoPath('/videos/ASL_HOW_ARE_YOU.mp4');
        setIsPlaying(true);
      } else if (text.includes("what's up")) {
        setVideoPath('/videos/ASL_WHATS_UP.mp4');
        setIsPlaying(true);
      } else if (text.includes('you good')) {
        setVideoPath('/videos/ASL_YOU_GOOD.mp4');
        setIsPlaying(true);
      }
    }
  }, [transcribedText]);

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-2xl font-bold mb-8">Speech to Sign Language</Text>
      
      <RecordButton 
        onPress={startRecording}
        disabled={isLoading}
        isLoading={isLoading}
      />

      {error && (
        <View className="mt-5 p-4 bg-red-100 rounded-lg w-full">
          <Text className="text-red-800">{error}</Text>
        </View>
      )}

      {transcribedText && (
        <View className="mt-5 p-4 bg-gray-100 rounded-lg w-full">
          <Text className="text-lg text-gray-800">{transcribedText}</Text>
        </View>
      )}

      {videoPath && (
        <View className="mt-5 w-full">
          <VideoPlayer 
            videoPath={videoPath}
            isPlaying={isPlaying}
          />
        </View>
      )}
    </View>
  );
}
