using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;

namespace Backend.Services;

public class SpeechService : ISpeechService
{
    private readonly string _subscriptionKey;
    private readonly string _region;

    public SpeechService(IConfiguration configuration)
    {
        _subscriptionKey = Environment.GetEnvironmentVariable("AZURE_SPEECH_KEY") 
            ?? throw new ArgumentNullException("Azure Speech Service subscription key is not configured in .env file");
        _region = Environment.GetEnvironmentVariable("AZURE_SPEECH_REGION") 
            ?? throw new ArgumentNullException("Azure Speech Service region is not configured in .env file");
    }

    public async Task<string> RecognizeSpeechAsync()
    {
        var config = SpeechConfig.FromSubscription(_subscriptionKey, _region);
        using var recognizer = new SpeechRecognizer(config);

        var taskCompletionSource = new TaskCompletionSource<string>();

        recognizer.Recognizing += (s, e) =>
        {
            Console.WriteLine($"RECOGNIZING: {e.Result.Text}");
        };

        recognizer.Recognized += (s, e) =>
        {
            if (e.Result.Reason == ResultReason.RecognizedSpeech)
            {
                Console.WriteLine($"RECOGNIZED: {e.Result.Text}");
                taskCompletionSource.TrySetResult(e.Result.Text);
            }
        };

        recognizer.Canceled += (s, e) =>
        {
            Console.WriteLine($"CANCELED: Reason={e.Reason}");
            if (e.Reason == CancellationReason.Error)
            {
                Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
                Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
            }
            taskCompletionSource.TrySetResult($"Canceled: {e.ErrorDetails}");
        };

        await recognizer.StartContinuousRecognitionAsync();
        
        // Record for 5 seconds then stop
        await Task.Delay(5000);
        await recognizer.StopContinuousRecognitionAsync();

        return await taskCompletionSource.Task;
    }

    public async Task<string> TestMicrophoneRecognitionAsync()
    {
        var config = SpeechConfig.FromSubscription(_subscriptionKey, _region);
        using var recognizer = new SpeechRecognizer(config);

        var taskCompletionSource = new TaskCompletionSource<string>();

        recognizer.Recognizing += (s, e) =>
        {
            Console.WriteLine($"RECOGNIZING: {e.Result.Text}");
        };

        recognizer.Recognized += (s, e) =>
        {
            if (e.Result.Reason == ResultReason.RecognizedSpeech)
            {
                Console.WriteLine($"RECOGNIZED: {e.Result.Text}");
                taskCompletionSource.TrySetResult(e.Result.Text);
            }
        };

        recognizer.Canceled += (s, e) =>
        {
            Console.WriteLine($"CANCELED: Reason={e.Reason}");
            if (e.Reason == CancellationReason.Error)
            {
                Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
                Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
            }
            taskCompletionSource.TrySetResult($"Canceled: {e.ErrorDetails}");
        };

        await recognizer.StartContinuousRecognitionAsync();
        
        // Record for 10 seconds then stop
        await Task.Delay(10000);
        await recognizer.StopContinuousRecognitionAsync();

        return await taskCompletionSource.Task;
    }
}
