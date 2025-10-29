using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace TodoApp.Models;

public class TodoItem
{
    [Key]
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [MinLength(10, ErrorMessage = "Title must be at least 10 characters long")]
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }

    public DateTime CreationDate { get; set; }
    public DateTime? Deadline { get; set; }
    public string? Notes { get; set; }
    public bool? Deleted { get; set; } = false;

    [AllowNull]
    public DateTime UpdatedDate { get; set; }

    public TodoItem()
    {
        Id = Guid.NewGuid();
        Title = string.Empty;
        CreationDate = DateTime.UtcNow;
    }
}
