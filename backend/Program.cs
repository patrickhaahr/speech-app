using Backend.Services;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:19006",
                "http://localhost:8081",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:19006",
                "http://127.0.0.1:8081",
                "http://192.168.1.14:8081",
                "exp://192.168.1.14:8081"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// Register Speech Service
builder.Services.AddScoped<ISpeechService, SpeechService>();

// Load configuration
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables();

// Listen on all network interfaces
builder.WebHost.UseUrls("http://0.0.0.0:5000");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add CORS before other middleware
app.UseCors("AllowFrontend");

// Disable HTTPS redirection for development
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

// Add logging middleware
app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    logger.LogInformation($"Incoming {context.Request.Method} request to {context.Request.Path} from {context.Connection.RemoteIpAddress}");
    await next();
});

app.Run();