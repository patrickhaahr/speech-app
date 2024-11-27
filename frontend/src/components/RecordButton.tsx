import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface RecordButtonProps {
  onPress: () => void;
  disabled: boolean;
  isLoading: boolean;
}

export function RecordButton({ onPress, disabled, isLoading }: RecordButtonProps) {
  return (
    <TouchableOpacity
      className={`px-5 py-2.5 rounded-full ${
        disabled 
          ? 'bg-gray-400' 
          : 'bg-blue-500'
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-lg font-semibold text-white">
        {isLoading ? 'Recording...' : 'Start Recording'}
      </Text>
    </TouchableOpacity>
  );
}
