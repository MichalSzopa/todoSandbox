using todo_app_database.DbEntities;
using todo_app_repository;
using todo_app_shared.Enums;
using todo_app_shared.Models;

namespace todo;

public class TaskService(IToDoTaskRepository toDoTaskRepository) : ITaskService
{
    public async Task<ToDoTaskDto> CreateTask(CreateTaskModel model)
    {
        var dbTask = new ToDoTask()
        {
            Name = model.Name,
            Description = model.Description,
            CreateDate = DateTime.Now,
            Deadline = model.Deadline,
            Status = EToDoTaskStatus.Planned
        };

        var entity = await toDoTaskRepository.AddTask(dbTask);
        var result = new ToDoTaskDto()
        {
            Name = entity.Name,
            Description = entity.Description,
            Deadline = entity.Deadline,
            Status = entity.Status,
            CreateDate = entity.CreateDate
        };
        
        return result;
    }
}