import React from 'react';
import { View, Text } from 'react-native';

interface AnimationDisplayProps {
  animation: string | null;
}

export function AnimationDisplay({ animation }: AnimationDisplayProps) {
  if (!animation) return null;

  return (
    <View className="mt-8 p-5 bg-gray-100 rounded-lg">
      <Text className="text-base text-center">
        Playing Animation: {animation}
      </Text>
    </View>
  );
}
