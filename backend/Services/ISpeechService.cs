using Microsoft.CognitiveServices.Speech;

namespace Backend.Services;

public interface ISpeechService
{
    Task<string> RecognizeSpeechAsync();
    Task<string> TestMicrophoneRecognitionAsync();
}
