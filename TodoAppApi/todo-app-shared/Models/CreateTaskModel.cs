namespace todo_app_shared.Models;

public class CreateTaskModel
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public DateTime Deadline { get; set; }
}