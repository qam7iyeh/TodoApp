import React, { useMemo, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import type { TodoItem } from "../types/todo";
import { TodoList } from "../components/TodoList";
import { TodoForm } from "../components/TodoForm";


export const TodoPage: React.FC = () => {
  const {
    todos,
    loading,
    error,
    page,
    pageSize,
    totalCount,
    setPage,
    setPageSize,
    saveTodo,
    deleteTodo,
  } = useTodos();
  const [editing, setEditing] = useState<TodoItem | null>(null);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / Math.max(1, pageSize)));
  }, [totalCount, pageSize]);

  function handleEdit(todo: TodoItem) {
    setEditing(todo);
  }

  function handleNew() {
    setEditing({
      //id: uuidv4(),
      title: "",
      notes: "",
      isCompleted: false,
      creationDate: new Date().toISOString(),
    });
  }

  async function handleToggle(todo: TodoItem) {
    if (!todo.id) return;
    await saveTodo(todo);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">Your Todo List</h2>
            <button
              onClick={handleNew}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              New Todo
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">
              Loading your todos...
            </p>
          </div>
        ) : (
          /* Todo List */
          <div className="bg-white rounded-lg shadow-lg p-6">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No todos yet. Create one to get started!
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos}
                onEdit={handleEdit}
                onDelete={deleteTodo}
                onToggleComplete={handleToggle}
              />
            )}

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="px-3 py-2 rounded border text-gray-700 disabled:opacity-50"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1 || loading}
                >
                  Prev
                </button>
                <span className="text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  className="px-3 py-2 rounded border text-gray-700 disabled:opacity-50"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages || loading}
                >
                  Next
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Page size</span>
                <select
                  className="border rounded px-2 py-2 bg-white text-gray-500"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  disabled={loading}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-gray-500">{totalCount} total</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal/Form Overlay */}
        {editing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <TodoForm
                initial={editing}
                onCancel={() => setEditing(null)}
                onSave={async (t) => {
                  await saveTodo(t);
                  setEditing(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
