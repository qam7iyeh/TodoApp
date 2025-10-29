import { useEffect, useState } from "react";
import type { TodoItem } from "../types/todo";
import { todoService } from "../api/todoService";

export function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  async function loadTodos(p: number = page, ps: number = pageSize) {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getPaged(p, ps);
      setTodos(data.items);
      setTotalCount(data.totalCount);
    } catch (e: any) {
      setError(e?.message || "Failed to load todos");
    } finally {
      setLoading(false);
    }
  }

  async function saveTodo(todo: TodoItem) {
    try {
      if (todo.id) await todoService.update(todo.id, todo);
      else await todoService.create(todo);
      await loadTodos();
    } catch (e: any) {
      setError(e?.message || "Save failed");
    }
  }

  async function deleteTodo(id: string) {
    try {
      await todoService.remove(id);
      await loadTodos();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    }
  }

  useEffect(() => {
    loadTodos(page, pageSize);
  }, [page, pageSize]);

  return {
    todos,
    loading,
    error,
    page,
    pageSize,
    totalCount,
    setPage,
    setPageSize,
    loadTodos,
    saveTodo,
    deleteTodo,
  };
}
