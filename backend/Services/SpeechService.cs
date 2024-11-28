using Microsoft.CognitiveServices.Speech;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.SignalR;
using Backend.Hubs;
using System.Timers;

namespace Backend.Services;

public class SpeechService : ISpeechService
{
    private readonly string _subscriptionKey;
    private readonly string _region;
    private readonly IHubContext<SpeechHub> _hubContext;

    public SpeechService(IConfiguration configuration, IHubContext<SpeechHub> hubContext)
    {
        _subscriptionKey = Environment.GetEnvironmentVariable("AZURE_SPEECH_KEY") 
            ?? throw new ArgumentNullException("Azure Speech Service subscription key is not configured in .env file");
        _region = Environment.GetEnvironmentVariable("AZURE_SPEECH_REGION") 
            ?? throw new ArgumentNullException("Azure Speech Service region is not configured in .env file");
        _hubContext = hubContext;
    }

    public async Task<string> RecognizeSpeechAsync()
    {
        var config = SpeechConfig.FromSubscription(_subscriptionKey, _region);
        var recognizer = new SpeechRecognizer(config);
        var lastRecognizedText = "";
        var recognitionEnded = new TaskCompletionSource<bool>();
        var silenceTimer = new System.Timers.Timer(2000);
        
        try
        {
            silenceTimer.AutoReset = false;
            silenceTimer.Elapsed += async (s, e) =>
            {
                silenceTimer.Dispose();
                await recognizer.StopContinuousRecognitionAsync();
            };

            recognizer.Recognizing += async (s, e) =>
            {
                var text = e.Result.Text;
                Console.WriteLine($"RECOGNIZING: {text}");
                await _hubContext.Clients.All.SendAsync("ReceiveText", text);
                silenceTimer.Stop();
                silenceTimer.Start();
            };

            recognizer.Recognized += async (s, e) =>
            {
                if (e.Result.Reason == ResultReason.RecognizedSpeech && !string.IsNullOrWhiteSpace(e.Result.Text))
                {
                    lastRecognizedText = e.Result.Text;
                    Console.WriteLine($"RECOGNIZED: {lastRecognizedText}");
                    await _hubContext.Clients.All.SendAsync("ReceiveText", lastRecognizedText);
                    silenceTimer.Stop();
                    silenceTimer.Start();
                }
            };

            recognizer.SessionStopped += (s, e) =>
            {
                Console.WriteLine("\nSession stopped.");
                recognitionEnded.TrySetResult(true);
            };

            recognizer.Canceled += (s, e) =>
            {
                if (e.Reason == CancellationReason.Error)
                {
                    Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
                    Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
                }
                recognitionEnded.TrySetResult(true);
            };

            await recognizer.StartContinuousRecognitionAsync();
            silenceTimer.Start();

            await recognitionEnded.Task;
            await recognizer.StopContinuousRecognitionAsync();
            
            return lastRecognizedText;
        }
        finally
        {
            silenceTimer.Dispose();
            recognizer.Dispose();
        }
    }
}
