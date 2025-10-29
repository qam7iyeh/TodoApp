using TodoApp.DTOs;
using TodoApp.Models;

namespace TodoApp.Interfaces;

public interface ITodoRepository
{
    Task<PagedResult<TodoItem>> GetAllAsync(int page, int pageSize);
    Task<TodoItem?> GetByIdAsync(Guid id);
    Task<TodoItem> AddAsync(TodoItem item);
    Task UpdateAsync(TodoItem item);
    Task DeleteAsync(Guid id);
}
