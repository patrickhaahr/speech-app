import { useState, useEffect } from "react";
import axios from "axios";
import * as signalR from "@microsoft/signalr";

const API_URL = "http://192.168.1.14:5000/api/speech/recognize";
const SIGNALR_URL = "http://192.168.1.14:5000/speechHub";

export function useAudioRecording() {
  const [isLoading, setIsLoading] = useState(false);
  const [transcribedText, setTranscribedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    // Create SignalR connection
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(SIGNALR_URL)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    // Start the connection
    newConnection.start()
      .catch(err => console.error("SignalR Connection Error: ", err));

    // Set up the receiver
    newConnection.on("ReceiveText", (text: string) => {
      setTranscribedText(text);
    });

    // Clean up on unmount
    return () => {
      newConnection.stop();
    };
  }, []);

  async function startRecording() {
    try {
      setError(null);
      setIsLoading(true);

      // Call backend to start recognition
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
      // Final text will be set through SignalR updates
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
