import React from "react";
import type { TodoItem } from "../types/todo";
import { TodoItemCard } from "./TodoItemCard";

interface Props {
  todos: TodoItem[];
  onEdit: (todo: TodoItem) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (todo: TodoItem) => void;
}

export const TodoList: React.FC<Props> = ({
  todos,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white border-b border-gray-200">
            <th className="p-4 text-left w-16 text-black">Done</th>
            <th className="p-4 text-left text-black">Title & Notes</th>
            <th className="p-4 text-left w-48 text-black">Created</th>
            <th className="p-4 text-left w-48 text-black">Deadline</th>
            <th className="p-4 text-right w-40 text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <TodoItemCard
              key={t.id}
              todo={t}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </tbody>
      </table>

      {todos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No todos yet. Create one to get started!
        </div>
      )}
    </div>
  );
};
