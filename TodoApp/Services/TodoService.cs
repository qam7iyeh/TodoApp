using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TodoApp.DTOs;
using TodoApp.Interfaces;
using TodoApp.Models;

namespace TodoApp.Services;

public class TodoService
{
    private readonly ITodoRepository _repository;
    private readonly IMapper _mapper;

    public TodoService(ITodoRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<PagedResult<ReadTodoItem>> GetAllAsync(int page, int pageSize)
    {
        if (page <= 0)
            page = 1;
        if (pageSize <= 0)
            pageSize = 10;

        var pagedResult = await _repository.GetAllAsync(page, pageSize);

        return new PagedResult<ReadTodoItem>
        {
            Items = _mapper.Map<IEnumerable<ReadTodoItem>>(pagedResult.Items),
            TotalCount = pagedResult.TotalCount,
            Page = pagedResult.Page,
            PageSize = pagedResult.PageSize,
        };
    }

    public async Task<ReadTodoItem?> GetByIdAsync(Guid id)
    {
        var entity = _mapper.Map<ReadTodoItem>(await _repository.GetByIdAsync(id));
        return entity;
    }

    public async Task<ReadTodoItem> AddAsync(CreateTodoItem item)
    {
        var entity = _mapper.Map<TodoItem>(item);
        var addedEntity = await _repository.AddAsync(entity);
        return _mapper.Map<ReadTodoItem>(addedEntity);
    }

    public async Task UpdateAsync(UpdateTodoItem item)
    {
        var exists = await GetByIdAsync(item.Id);
        if (exists == null)
        {
            throw new ArgumentNullException(nameof(item));
        }
        var entity = _mapper.Map<TodoItem>(item);
        entity.UpdatedDate = DateTime.UtcNow;
        await _repository.UpdateAsync(entity);
    }

    public Task DeleteAsync(Guid id) => _repository.DeleteAsync(id);
}
