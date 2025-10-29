import React from "react";
import type { TodoItem } from "../types/todo";

interface Props {
  todo: TodoItem;
  onEdit: (todo: TodoItem) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (todo: TodoItem) => void;
}

export const TodoItemCard: React.FC<Props> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  // Check if the task is overdue
  const isOverdue =
    todo.deadline && !todo.isCompleted && new Date(todo.deadline) < new Date();

  return (
    <tr
      className={`border-b border-gray-200 transition-colors ${
        isOverdue ? "bg-red-200 hover:bg-red-300" : "hover:bg-gray-50"
      }`}
    >
      <td className="p-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() =>
              onToggleComplete({ ...todo, isCompleted: !todo.isCompleted })
            }
            className="w-4 h-4 cursor-pointer"
          />
        </label>
      </td>

      <td className="p-4">
        <strong
          className={`text-base ${
            todo.isCompleted ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.title || "(untitled)"}
        </strong>
        {todo.notes && (
          <div className="text-sm text-gray-600 mt-1">{todo.notes}</div>
        )}
      </td>

      <td className="p-4 text-sm text-gray-600">
        {new Date(todo.creationDate).toLocaleString()}
      </td>

      <td
        className={`p-4 text-sm ${
          isOverdue ? "text-red-700 font-semibold" : "text-gray-600"
        }`}
      >
        {todo.deadline ? new Date(todo.deadline).toLocaleString() : "—"}
        {isOverdue && (
          <span className="ml-2 text-xs bg-red-700 text-white px-2 py-0.5 rounded">
            OVERDUE
          </span>
        )}
      </td>

      <td className="p-4">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onEdit(todo)}
            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => typeof todo.id === "string" && onDelete(todo.id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
