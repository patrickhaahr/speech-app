import React, { useRef } from "react";
import { Platform, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";

interface VideoPlayerProps {
  videoPath: string | null;
  isPlaying: boolean;
}

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

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
      nativeControls
      allowsFullscreen
    />
  );
};

export default VideoPlayer;
