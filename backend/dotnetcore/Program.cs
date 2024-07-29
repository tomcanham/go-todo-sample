using Microsoft.EntityFrameworkCore;
using TodoServer;

var corsPolicyName = "_corsPolicy";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("TodoConnection")));

// add repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(DbContext), typeof(TodoDbContext));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
                          policy =>
                          {
                              policy.WithOrigins("http://localhost:5173")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                          });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
{
    app.MapGet("/debug/routes", (IEnumerable<EndpointDataSource> endpointSources) =>
        string.Join("\n", endpointSources.SelectMany(source => source.Endpoints)));
}

app.UseCors(corsPolicyName);
app.MapControllers();

app.Run();