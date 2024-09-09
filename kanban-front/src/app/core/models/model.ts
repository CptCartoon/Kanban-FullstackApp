export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: TaskBoard[];
  totalTasks: number;
}

export interface AddBoard {
  name: string;
  columns: AddColumn[];
}

export interface AddColumn {
  name: string;
}

export interface AddTask {
  title: string;
  description: string;
  subtasks: AddSubtask[];
}

export interface AddSubtask {
  title: string;
  completed: boolean;
}

export interface SimpleColumn {
  id: number;
  boardId: number;
  name: string;
}

export interface BoardColumn {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  columnId: number;
  title: string;
  description: string;
  subtasks: Subtask[];
}

export interface TaskBoard {
  id: number;
  columnId: number;
  title: string;
  totalSubtasks: number;
  completedSubtasks: number;
}

export interface TaskView {
  id: number;
  title: string;
  description: string;
  subtasks: Subtask[];
  columns: SimpleColumn[];
  columnId: number;
}

export interface TaskColumn {
  columnId: number;
}

export interface Subtask {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
}

export interface SubtaskStatus {
  completed: boolean;
}

export interface BoardName {
  id: number;
  name: string;
}

export interface EditBoard {
  id: number;
  name: string;
  columns: EditColumn[];
}

export interface EditTask {
  title: string;
  description: string;
  subtasks: EditSubtask[];
  columnId: number;
}

export interface EditColumn {
  id: number;
  name: string;
}

export interface EditSubtask {
  id: number;
  taskId: number;
  title: string;
  completed: boolean;
}
