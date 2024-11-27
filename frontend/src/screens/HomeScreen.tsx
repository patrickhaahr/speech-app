import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RecordButton } from '../components/RecordButton';
import { useAudioRecording } from '../hooks/useAudioRecording';

const API_URL = 'http://localhost:3000/api/speech';

export function HomeScreen() {
  const { 
    startRecording, 
    isLoading, 
    transcribedText,
    error 
  } = useAudioRecording();

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-2xl font-bold mb-8">Speech to Text</Text>
      
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
    </View>
  );
}
