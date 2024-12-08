import { CreateTaskDto, Task, UpdateTaskDto } from '../types/task';
import { mockTasks } from './mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const TaskService = {
  async getTasks(): Promise<Task[]> {
    await delay(500); // Simulate network delay
    return [...mockTasks];
  },

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    await delay(500);
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...taskData,
      status: 'planned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return newTask;
  },

  async updateTask(id: string, taskData: UpdateTaskDto): Promise<Task> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask: Task = {
      ...mockTasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString()
    };
    mockTasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  async deleteTask(id: string): Promise<void> {
    await delay(500);
    const taskIndex = mockTasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    mockTasks.splice(taskIndex, 1);
  }
};