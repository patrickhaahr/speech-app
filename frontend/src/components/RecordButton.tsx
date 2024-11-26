import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface RecordButtonProps {
  isRecording: boolean;
  onPress: () => void;
}

export function RecordButton({ isRecording, onPress }: RecordButtonProps) {
  return (
    <TouchableOpacity
      className={`px-5 py-2.5 rounded-full ${
        isRecording ? 'bg-red-500' : 'bg-blue-500'
      }`}
      onPress={onPress}
    >
      <Text className="text-lg font-semibold text-white">
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Text>
    </TouchableOpacity>
  );
}
