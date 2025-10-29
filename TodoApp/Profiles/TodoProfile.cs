using AutoMapper;
using TodoApp.DTOs;
using TodoApp.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TodoApp.Profiles;

public class TodoProfile : Profile
{
    public TodoProfile()
    {
        CreateMap<TodoItem, ReadTodoItem>();
        CreateMap<CreateTodoItem, TodoItem>();
        CreateMap<UpdateTodoItem, TodoItem>();
    }
}
