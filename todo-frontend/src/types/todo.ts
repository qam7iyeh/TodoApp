export interface TodoItem {
  id?: string;
  title: string | null;
  isCompleted: boolean;
  creationDate: string;
  deadline?: string | null;
  notes?: string | null;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}