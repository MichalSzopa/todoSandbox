using Moq;
using todo_app_repository;
using todo_app_shared.Enums;
using todo_app_shared.Models;
using todo;

namespace todo_app_tests;

[TestClass]
public class SomeTestClass
{
    [TestMethod]
    public async Task TestMethod1()
    {
        // Arrange
        var repoMock = new Mock<IToDoTaskRepository>();
        ITaskService service = new TaskService(repoMock.Object);

        CreateTaskModel model = new()
        {
            Name = "do stuff",
            Description = "write ACTUAL unit tests, and db connection, and the whole app actually :)",
            Deadline = new DateTime(2025, 1, 31),
        };
        
        // Act
        var addedTask = await service.CreateTask(model);
        
        // Assert
        Assert.IsNotNull(addedTask);
        Assert.IsTrue(addedTask.Status == EToDoTaskStatus.Planned);
        Assert.IsTrue(addedTask.Name == model.Name);
        Assert.IsTrue(addedTask.Description == model.Description);
        Assert.IsTrue(addedTask.Deadline == model.Deadline);
        Assert.IsTrue(addedTask.CreateDate <= DateTime.Now);
        Assert.IsTrue(addedTask.CreateDate.AddMinutes(1) > DateTime.Now);
    }
}