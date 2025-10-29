using System.ComponentModel.DataAnnotations;

namespace TodoApp.DTOs;

public class UpdateTodoItem
{
    [Key]
    public Guid Id { get; set; } = new Guid();

    [Required(ErrorMessage = "Title is required")]
    [MinLength(10, ErrorMessage = "Title must be at least 10 characters long")]
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime? Deadline { get; set; }
    public string? Notes { get; set; }
}
