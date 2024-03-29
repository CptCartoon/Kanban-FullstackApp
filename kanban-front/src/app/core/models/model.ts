export interface Board {
  boardId: number;
  boardName: string;
}

export interface Column {
  columnId: number;
  boardId: number;
  columnName: string;
}

export interface Task {
  taskId: number;
  columnId: number;
  taskTitle: string;
  taskDescription: string;
}

export interface Subtask {
  subtaskId: number;
  taskId: number;
  subtaskTitle: string;
  subtaskIscomplete: boolean;
}
