using todo_app_database.DbEntities;

namespace todo_app_repository;

public interface IToDoTaskRepository
{
    public Task<ToDoTask> AddTask(ToDoTask model);
}