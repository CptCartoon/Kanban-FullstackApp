export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: Task[];
}

export interface AddBoard {
  name: string;
  columns: AddColumn[];
}

export interface AddColumn {
  name: string;
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
