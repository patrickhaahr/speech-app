import React, { useRef } from "react";
import { Platform, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import Constants from 'expo-constants';

interface VideoPlayerProps {
  videoPath: string | null;
  isPlaying: boolean;
}

// Get the local IP address when running in development
const getServerUrl = () => {
  if (__DEV__) {
    // Get the local IP from Expo manifest
    const manifest = Constants.manifest2;
    if (manifest?.extra?.expoClient?.hostUri) {
      // hostUri is in the format "192.168.x.x:19000"
      const hostUri = manifest.extra.expoClient.hostUri;
      const localIp = hostUri.split(':')[0];
      return `http://${localIp}:5000`;
    }
  }
  return process.env.REACT_APP_API_URL || "http://localhost:5000";
};

const API_URL = getServerUrl();

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoPath,
  isPlaying,
}) => {
  const ref = useRef(null);

  if (!videoPath) {
    return null;
  }

  const fullUrl = videoPath.startsWith("http")
    ? videoPath
    : `${API_URL}${videoPath}`;

  console.log('Playing video from:', fullUrl); // Debug log

  const player = useVideoPlayer(fullUrl, (player) => {
    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  });

  if (Platform.OS === "web") {
    return (
      <div className="relative w-full max-w-lg mx-auto mt-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={ref}
            className="w-full h-full object-contain"
            controls
            playsInline
            autoPlay={isPlaying}
            src={fullUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }

  return (
    <VideoView
      ref={ref}
      style={{ width: "100%", height: 300 }}
      player={player}
      contentFit="contain"
      nativeControls={false}
      allowsFullscreen={false}
    />
  );
};

export default VideoPlayer;
