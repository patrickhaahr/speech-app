using System.Threading.Tasks;

namespace speech_app.Services
{
    public interface IAslVideoService
    {
        Task<string> GetVideoPathForPhrase(string phrase);
    }
}
