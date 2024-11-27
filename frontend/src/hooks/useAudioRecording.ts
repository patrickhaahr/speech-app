import { useState } from "react";
import axios from "axios";

const API_URL = "http://192.168.1.14:5000/api/speech/recognize";

export function useAudioRecording() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function startRecording() {
    try {
      setError(null);
      setTranscribedText("");
      setIsLoading(true);

      // Call backend directly to start recognition
      const response = await axios.post(
        API_URL,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend response:", response.data);
      setTranscribedText(response.data.text || "");
    } catch (error) {
      console.error("Failed to process recording:", error);
      setError("Failed to process recording. Please try again.");
      if (axios.isAxiosError(error)) {
        console.error("Network error details:", {
          message: error.message,
          code: error.code,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return {
    startRecording,
    isLoading,
    transcribedText,
    error,
  };
}
