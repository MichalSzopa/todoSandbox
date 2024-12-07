using todo_app_shared.Models;

namespace todo;

public interface ITaskService
{
    public Task<ToDoTaskDto> CreateTask(CreateTaskModel model);
}