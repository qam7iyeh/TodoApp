using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.DTOs;
using TodoApp.Interfaces;
using TodoApp.Models;

namespace TodoApp.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<TodoItem>> GetAllAsync(int page, int pageSize)
    {
        var query = _context.TodoItems.AsNoTracking().Where(t => t.Deleted != true);
        var totalCount = await query.CountAsync();
        var items = await query
            .OrderByDescending(t => t.CreationDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        return new PagedResult<TodoItem>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount,
        };
    }

    public async Task<TodoItem?> GetByIdAsync(Guid id)
    {
        return await _context
            .TodoItems.AsNoTracking()
            .Where(t => t.Id == id && t.Deleted != true)
            .FirstOrDefaultAsync();
    }

    public async Task<TodoItem> AddAsync(TodoItem todoItem)
    {
        _context.TodoItems.Add(todoItem);
        await _context.SaveChangesAsync();
        return todoItem;
    }

    public async Task UpdateAsync(TodoItem item)
    {
        _context.TodoItems.Update(item);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await _context
            .TodoItems.Where(t => t.Id == id && t.Deleted != true)
            .FirstOrDefaultAsync();
        if (item != null)
        {
            item.Deleted = true;
            _context.TodoItems.Update(item);
            await _context.SaveChangesAsync();
        }
    }
}
