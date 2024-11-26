using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SpeechController : ControllerBase
{
    private readonly ISpeechService _speechService;
    private readonly ILogger<SpeechController> _logger;

    public SpeechController(ISpeechService speechService, ILogger<SpeechController> logger)
    {
        _speechService = speechService;
        _logger = logger;
    }

    [HttpPost("recognize")]
    public async Task<IActionResult> RecognizeSpeech()
    {
        try
        {
            _logger.LogInformation("Starting speech recognition");
            var recognizedText = await _speechService.RecognizeSpeechAsync();
            return Ok(new { text = recognizedText });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during speech recognition");
            return StatusCode(500, new { error = "An error occurred during speech recognition" });
        }
    }
}
