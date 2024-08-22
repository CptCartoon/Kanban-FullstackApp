export interface Board {
  boardId: number;
  boardName: string;
  columns: Column[];
}

export interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
}

export interface BoardName {
  id: number;
  name: string;
}
