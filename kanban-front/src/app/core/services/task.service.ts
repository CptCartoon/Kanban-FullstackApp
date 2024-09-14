import { Injectable } from '@angular/core';
import {
  AddTask,
  EditTask,
  SubtaskStatus,
  TaskBoard,
  TaskColumn,
  TaskView,
} from '../models/model';
import { ApiService } from './api.service';
import { BoardsNamesService } from './boards-names.service';
import { BoardService } from './board.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskView: TaskView = {} as TaskView;
  taskViewChange = new Subject<TaskView>();

  constructor(
    private api: ApiService,
    private boardService: BoardService,
    private boardsNamesService: BoardsNamesService
  ) {}

  public get _getTaskView() {
    return this.taskView;
  }

  // ########## TASK

  /**
   * Returns task details
   * @param taskId - id of task that you want to get more details
   */
  public getTaskView(taskId: number) {
    this.api.getTaskView(taskId).subscribe({
      next: (taskView) => {
        this.taskView = taskView;
        this.taskViewChange.next(this.taskView);
      },
      error: (error) => {
        console.error('Error fetching task view data', error);
      },
    });
  }

  /**
   * Add task
   * @param task - task model that you want to add
   * @param columnId - id of column that you want to add task
   */
  public addTask(task: AddTask, columnId: number) {
    this.api.addTask(task, columnId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error adding task', error);
      },
    });
  }

  /**
   * Edit task
   * @param task - edited task model
   * @param taskId - id of task that you want to edit
   */
  public editTask(task: EditTask, taskId: number) {
    this.api.editTask(task, taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error editing task', error);
      },
    });
  }

  /**
   * Change task column
   * @param taskColumn - object with columnId of task { columnId: number }
   * @param taskId - id of task
   */
  public changeTaskColumn(taskColumn: TaskColumn, taskId: number) {
    this.api.changeTaskColumn(taskColumn, taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error changing task column', error);
      },
    });
  }

  /**
   * Change subtask status
   * @param subtaskStatus - object with status of subtask { completed: boolean }
   * @param subtaskId - id of subtask
   * @param taskId - id of task that subtask's status is changed
   */
  public changeSubtaskStatus(
    subtaskStatus: SubtaskStatus,
    subtaskId: number,
    taskId: number
  ) {
    this.api.changeSubtaskStatus(subtaskStatus, subtaskId).subscribe({
      next: () => {
        this.getTaskView(taskId);

        const task = this.boardService._getBoard.columns
          .flatMap((column) => column.tasks)
          .find((task) => task.id === taskId);

        if (task) {
          task.completedSubtasks += subtaskStatus.completed ? 1 : -1;
        }
      },
      error: (error) => {
        console.error('Error changing subtask status', error);
      },
    });
  }

  /**
   * Delete task
   * @param taskId - id of task that you want to delete
   */
  public deleteTask(taskId: number) {
    this.api.deleteTask(taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error deleting task', error);
      },
    });
  }
}
