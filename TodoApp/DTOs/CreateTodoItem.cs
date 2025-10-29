using System.ComponentModel.DataAnnotations;

namespace TodoApp.DTOs;

public class CreateTodoItem
{
    [Key]
    public Guid Id { get; set; } = new Guid();

    [Required(ErrorMessage = "Title is required")]
    [MinLength(10, ErrorMessage = "Title must be at least 10 characters long")]
    public string Title { get; set; } = string.Empty;

    public DateTime? Deadline { get; set; }
    public string? Notes { get; set; }
    public bool IsCompleted { get; set; }
}
