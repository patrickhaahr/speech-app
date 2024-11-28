using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using speech_app.Services;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpeechController : ControllerBase
{
    private readonly ISpeechService _speechService;
    private readonly IAslVideoService _aslVideoService;
    private readonly ILogger<SpeechController> _logger;

    public SpeechController(
        ISpeechService speechService,
        IAslVideoService aslVideoService,
        ILogger<SpeechController> logger)
    {
        _speechService = speechService;
        _aslVideoService = aslVideoService;
        _logger = logger;
    }

    [HttpPost("recognize")]
    public async Task<IActionResult> RecognizeSpeech()
    {
        try
        {
            _logger.LogInformation("Starting speech recognition");
            var recognizedText = await _speechService.RecognizeSpeechAsync();
            var videoPath = await _aslVideoService.GetVideoPathForPhrase(recognizedText);
            
            return Ok(new { 
                text = recognizedText,
                videoPath = videoPath
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during speech recognition");
            return StatusCode(500, new { error = "An error occurred during speech recognition" });
        }
    }
}
