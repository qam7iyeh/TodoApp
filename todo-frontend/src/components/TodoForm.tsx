import React, { useState } from "react";
import type { TodoItem } from "../types/todo";

interface Props {
  initial: TodoItem;
  onSave: (todo: TodoItem) => void;
  onCancel: () => void;
}

export const TodoForm: React.FC<Props> = ({ initial, onSave, onCancel }) => {
  const [todo, setTodo] = useState<TodoItem>({ ...initial });
  const [errors, setErrors] = useState<{
    title?: string;
    deadline?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { title?: string; deadline?: string } = {};

    // Validate title length
    if (!todo.title || todo.title.trim().length < 10) {
      newErrors.title = "Title must be at least 10 characters long";
    }

    // Validate deadline is in the future
    if (todo.deadline) {
      //const deadlineDate = new Date(todo.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

      //if (deadlineDate < today) {
      //newErrors.deadline = "Deadline must be in the future";
      //}
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const todoToSave = {
        ...todo,
        creationDate: todo.creationDate ?? new Date().toISOString(),
      };

      // If it's a new todo (no id), remove the id field
      if (!todo.id) {
        const { id, ...newTodo } = todoToSave;
        onSave(newTodo);
      } else {
        onSave(todoToSave);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {todo.id ? "Edit Todo" : "New Todo"}
        </h3>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              Title
            </span>
            <input
              value={todo.title ?? ""}
              onChange={(e) => {
                setTodo({ ...todo, title: e.target.value });
                // Clear error when user starts typing
                if (errors.title) {
                  setErrors({ ...errors, title: undefined });
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter todo title..."
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              Notes
            </span>
            <textarea
              value={todo.notes ?? ""}
              onChange={(e) => setTodo({ ...todo, notes: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-none"
              rows={4}
              placeholder="Add notes..."
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">
              Deadline
            </span>
            <input
              type="datetime-local"
              value={todo.deadline ? toLocal(todo.deadline) : ""}
              onChange={(e) => {
                setTodo({
                  ...todo,
                  deadline: e.target.value ? toIso(e.target.value) : null,
                });
                // Clear error when user changes deadline
                if (errors.deadline) {
                  setErrors({ ...errors, deadline: undefined });
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${
                errors.deadline ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.deadline && (
              <p className="text-red-600 text-sm mt-1">{errors.deadline}</p>
            )}
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={(e) =>
                setTodo({ ...todo, isCompleted: e.target.checked })
              }
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">Completed</span>
          </label>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function toLocal(iso: string) {
  const d = new Date(iso);
  return d.toISOString().slice(0, 16);
}
function toIso(local: string) {
  return new Date(local).toISOString();
}
