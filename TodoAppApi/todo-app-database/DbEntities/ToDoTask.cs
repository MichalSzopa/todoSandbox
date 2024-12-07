using todo_app_shared.Enums;

namespace todo_app_database.DbEntities;

public class ToDoTask
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime Deadline { get; set; }
    public EToDoTaskStatus Status { get; set; }
}