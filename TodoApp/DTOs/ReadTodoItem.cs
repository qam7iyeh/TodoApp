using System.ComponentModel.DataAnnotations;

namespace TodoApp.DTOs;

public class ReadTodoItem
{
    [Key]
    public Guid Id { get; set; } = new Guid();
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? Deadline { get; set; }
    public string? Notes { get; set; }
}
