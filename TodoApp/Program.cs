using System.Reflection;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Interfaces;
using TodoApp.Repositories;
using TodoApp.Services;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------
//Configure Services (Dependency Injection)
// -------------------------------------------------------

// Enable Controllers
builder.Services.AddControllers();

// Configure Database (SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Register Repository and Services
builder.Services.AddScoped<ITodoRepository, TodoRepository>();
builder.Services.AddScoped<TodoService>();

// Add AutoMapper (IMPORTANT)
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Add MediatR for CQRS (Command/Query Handlers)
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly())
);

// Enable Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS (for React/Vite frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowLocalDev",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        }
    );
});

// -------------------------------------------------------
//  Build App
// -------------------------------------------------------
var app = builder.Build();

// -------------------------------------------------------
//  Middleware Pipeline
// -------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalDev");

// Auto apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.MapControllers();
app.Run();
