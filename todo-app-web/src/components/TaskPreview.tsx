import React from 'react';
import { X } from 'lucide-react';
import { Task } from '../types/task';
import { Whiteboard } from './Whiteboard';

interface TaskPreviewProps {
  task: Task;
  onClose: () => void;
}

export const TaskPreview: React.FC<TaskPreviewProps> = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
            <p className="text-gray-600 mt-1">{task.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <Whiteboard />
        </div>
      </div>
    </div>
  );
};