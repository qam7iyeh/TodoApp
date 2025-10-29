import axios from "./axiosInstance";
import type { TodoItem, PagedResult } from "../types/todo";

const BASE = "/api/Todo";

export const todoService = {
  async getAll(): Promise<TodoItem[]> {
    const res = await axios.get<TodoItem[]>(BASE);
    return res.data;
  },

  async getPaged(page: number, pageSize: number): Promise<PagedResult<TodoItem>> {
    const res = await axios.get<PagedResult<TodoItem>>(BASE, {
      params: { page, pageSize },
    });
    return res.data;
  },

  async getById(id: string): Promise<TodoItem> {
    const res = await axios.get<TodoItem>(`${BASE}/${id}`);
    return res.data;
  },

  async create(todo: TodoItem): Promise<TodoItem> {
    const res = await axios.post<TodoItem>(BASE, todo);
    return res.data;
  },

  async update(id: string, todo: TodoItem): Promise<TodoItem> {
    const res = await axios.put<TodoItem>(`${BASE}/${id}`, todo);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await axios.delete(`${BASE}/${id}`);
  },
};
