using Microsoft.AspNetCore.SignalR;

namespace Backend.Hubs;

public class SpeechHub : Hub
{
    public async Task UpdateRecognizedText(string text)
    {
        await Clients.All.SendAsync("ReceiveText", text);
    }
}
