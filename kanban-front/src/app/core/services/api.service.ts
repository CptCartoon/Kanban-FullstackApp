import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Board, Column, Subtask, Task } from '../models/model';
import { BoardService } from './board.service';
import { ColumnService } from './column.service';
import { TaskService } from './task.service';
import { SubtaskService } from './subtask.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
    private subtaskService: SubtaskService
  ) {}

  url = 'http://localhost:8080';

  active!: number;
  active$: Subject<number> = new Subject<number>();

  getBoards(): Observable<Board[]> {
    return this.http
      .get<Board[]>(`${this.url}/boards`)
      .pipe(tap((arrBoards) => (this.boardService._setBoards = arrBoards)));
  }

  getBoardId(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}/boards/${id}`);
  }

  getColumns(id: number): Observable<Column[]> {
    return this.http
      .get<Column[]>(`${this.url}/columns/byboard/${id}`)
      .pipe(tap((arrColumns) => (this.columnService._setColumns = arrColumns)));
  }

  getTasks(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/tasks/byboard/${id}`)
      .pipe(tap((arrTasks) => (this.taskService._setTasks = arrTasks)));
  }

  getTasksColumn(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/tasks/bycolumn/${id}`)
      .pipe(tap((arrTasks) => (this.taskService._setTasks = arrTasks)));
  }

  getSubtasks(id: number): Observable<Subtask[]> {
    return this.http
      .get<Subtask[]>(`${this.url}/subtasks/byboard/${id}`)
      .pipe(
        tap((arrSubtasks) => (this.subtaskService._setSubtasks = arrSubtasks))
      );
  }

  // getSubtasksByTask(id: number): Observable<Subtask[]> {
  //   return this.http
  //     .get<Subtask[]>(`${this.url}/subtasks/bytask/${id}`)
  //     .pipe(
  //       tap((arrSubtasks) => (this.subtaskService._setSubtasks = arrSubtasks))
  //     );
  // }

  deleteBoard(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/boards/${id}`)
      .pipe(tap(({}) => this.boardService.deleteBoard(id)));
  }

  deleteTask(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/tasks/${id}`)
      .pipe(tap(({}) => this.taskService.deleteTask(id)));
  }

  selectBoard(board: Board) {
    this.active = board.boardId;
    this.active$.next(board.boardId);
  }
}
