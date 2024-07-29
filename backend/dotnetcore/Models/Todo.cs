using System;
using System.Collections.Generic;

namespace TodoServer;

public partial class Todo
{
    public int? Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public bool Completed { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
