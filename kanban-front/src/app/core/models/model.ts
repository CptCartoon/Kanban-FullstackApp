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

export interface SimpleColumn {
  id: number;
  boardId: number;
  name: string;
}

export interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface TaskView {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  columns: SimpleColumn[];
  columnId: number;
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
