import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle, XCircle, Clock, PlayCircle } from 'lucide-react';
import { Task, TaskStatus } from '../types/task';
import { formatDate } from '../utils/dateUtils';
import { TaskPreview } from './TaskPreview';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusColors: Record<TaskStatus, string> = {
  'planned': 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  'completed': 'bg-green-100 text-green-800',
  'canceled': 'bg-red-100 text-red-800',
};

const statusIcons: Record<TaskStatus, React.ReactNode> = {
  'planned': <Clock className="w-4 h-4" />,
  'in-progress': <PlayCircle className="w-4 h-4" />,
  'completed': <CheckCircle className="w-4 h-4" />,
  'canceled': <XCircle className="w-4 h-4" />,
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowPreview(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
              className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${statusColors[task.status]}`}>
              {statusIcons[task.status]}
              {task.status}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Updated {formatDate(task.updatedAt)}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2" onClick={e => e.stopPropagation()}>
          {task.status !== 'completed' && (
            <button
              onClick={() => onStatusChange(task.id, 'completed')}
              className="text-sm px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100"
            >
              Mark Complete
            </button>
          )}
          {task.status === 'planned' && (
            <button
              onClick={() => onStatusChange(task.id, 'in-progress')}
              className="text-sm px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full hover:bg-yellow-100"
            >
              Start Progress
            </button>
          )}
          {task.status !== 'canceled' && task.status !== 'completed' && (
            <button
              onClick={() => onStatusChange(task.id, 'canceled')}
              className="text-sm px-3 py-1 bg-red-50 text-red-700 rounded-full hover:bg-red-100"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {showPreview && (
        <TaskPreview task={task} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
};