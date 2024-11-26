import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';
import { Video } from 'expo-av';
import axios from 'axios';
import { RecordButton } from '../components/RecordButton';
import { AnimationDisplay } from '../components/AnimationDisplay';
import { useAudioRecording } from '../hooks/useAudioRecording';

const API_URL = 'http://localhost:3000/api/speech';

export function HomeScreen() {
  const { isRecording, startRecording, stopRecording, isLoading, animation } = useAudioRecording();

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      <Text className="text-2xl font-bold mb-8">Speech to Sign Language</Text>
      
      <RecordButton 
        isRecording={isRecording}
        onPress={isRecording ? stopRecording : startRecording}
      />

      {isLoading && (
        <ActivityIndicator size="large" color="#3B82F6" className="mt-5" />
      )}

      <AnimationDisplay animation={animation} />
    </View>
  );
}
