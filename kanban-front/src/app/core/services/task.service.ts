import { Injectable } from '@angular/core';
import { AddTask, EditTask, TaskView } from '../models/model';
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

  public getTaskView(taskId: number) {
    this.api.getTaskView(taskId).subscribe({
      next: (taskView) => {
        this.taskView = taskView;
        this.taskViewChange.next(this.taskView);
      },
      error: (error) => {
        console.error('Error getching task view data', error);
      },
    });
  }

  public addTask(task: AddTask, taskId: number) {
    this.api.addTask(task, taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error adding column', error);
      },
    });
  }

  public editTask(task: EditTask, taskId: number) {
    this.api.editTask(task, taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error editing column', error);
      },
    });
  }

  public deleteTask(taskId: number) {
    this.api.deleteTask(taskId).subscribe({
      next: () => {
        this.boardService.loadBoard(this.boardsNamesService.activeBoard.id);
      },
      error: (error) => {
        console.error('Error deleting column', error);
      },
    });
  }
}
