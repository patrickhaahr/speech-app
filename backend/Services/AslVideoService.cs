using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace speech_app.Services
{
    public class AslVideoService : IAslVideoService
    {
        private readonly IConfiguration _configuration;
        private readonly string _dataPath;

        public AslVideoService(IConfiguration configuration)
        {
            _configuration = configuration;
            _dataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Data", "phrases.json");
        }

        public async Task<string> GetVideoPathForPhrase(string phrase)
        {
            if (string.IsNullOrEmpty(phrase))
            {
                return string.Empty;
            }

            // Clean the input phrase: remove punctuation and convert to lowercase
            var cleanedPhrase = Regex.Replace(phrase.ToLower(), @"[^\w\s]", "").Trim();

            var jsonContent = await File.ReadAllTextAsync(_dataPath);
            var phraseData = JsonSerializer.Deserialize<PhrasesData>(jsonContent);

            // Log the cleaned phrase and available phrases for debugging
            Console.WriteLine($"Cleaned phrase: '{cleanedPhrase}'");
            Console.WriteLine("Available phrases:");
            foreach (var p in phraseData?.phrases ?? Array.Empty<Phrase>())
            {
                Console.WriteLine($"- '{p.text}' -> '{p.videoPath}'");
            }

            var matchingPhrase = phraseData?.phrases is null ? null :
                phraseData.phrases.FirstOrDefault(p => p.text is not null && cleanedPhrase.Contains(p.text));

            if (matchingPhrase != null)
            {
                Console.WriteLine($"Found match: '{matchingPhrase.text}' -> '{matchingPhrase.videoPath}'");
            }
            else
            {
                Console.WriteLine("No match found");
            }

            return matchingPhrase?.videoPath ?? string.Empty;
        }

        private class PhrasesData
        {
            public Phrase[]? phrases { get; set; }
        }

        private class Phrase
        {
            public string? text { get; set; }
            public string? videoPath { get; set; }
            public int duration { get; set; }
        }
    }
}
