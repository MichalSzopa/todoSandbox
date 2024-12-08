import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from './types/task';
import { TaskService } from './services/api';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await TaskService.getTasks();
      setTasks(data);
      setError(null);
    } catch {
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDto) => {
    try {
      const newTask = await TaskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      setError(null);
    } catch {
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async (id: string, taskData: UpdateTaskDto) => {
    try {
      const updatedTask = await TaskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      setError(null);
    } catch {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await TaskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
      setError(null);
    } catch {
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    await handleUpdateTask(id, { status });
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleFormSubmit = async (taskData: CreateTaskDto | UpdateTaskDto) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, taskData);
    } else {
      await handleCreateTask(taskData as CreateTaskDto);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditClick}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {isFormOpen && (
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onClose={handleFormClose}
          />
        )}
      </div>
    </div>
    </div>
  );
}

export default App;