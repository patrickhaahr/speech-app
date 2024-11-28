import React, { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  videoPath: string | null;
  isPlaying: boolean;
}

// Default to localhost if env variable is not set
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoPath, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current && videoPath) {
      const fullUrl = videoPath.startsWith('http') ? videoPath : `${API_URL}${videoPath}`;
      console.log('Loading video from:', fullUrl); // Debug log

      // Reset error state
      setError(null);

      try {
        // Only update src if it's different
        if (videoRef.current.src !== fullUrl) {
          videoRef.current.src = fullUrl;
          videoRef.current.load(); // Force reload the video
        }
        
        if (isPlaying) {
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error('Error playing video:', error);
              setError('Error playing video');
            });
          }
        } else {
          videoRef.current.pause();
        }
      } catch (err) {
        console.error('Error setting video source:', err);
        setError('Error loading video');
      }
    }
  }, [videoPath, isPlaying]);

  if (!videoPath) {
    return null;
  }

  const fullUrl = videoPath.startsWith('http') ? videoPath : `${API_URL}${videoPath}`;

  return (
    <div className="relative w-full max-w-lg mx-auto mt-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
          {error}
        </div>
      )}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          controls
          playsInline
          autoPlay
          onError={(e) => {
            console.error('Video error:', e);
            setError('Error loading video');
          }}
        >
          <source src={fullUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
