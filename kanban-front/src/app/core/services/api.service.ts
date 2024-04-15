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

  // #### BOARDS

  getBoards(): Observable<Board[]> {
    return this.http
      .get<Board[]>(`${this.url}/boards`)
      .pipe(tap((arrBoards) => (this.boardService._setBoards = arrBoards)));
  }

  getBoardId(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}/boards/${id}`);
  }

  addBoard(board: Board): Observable<Board> {
    return this.http
      .post<Board>(`${this.url}/board`, board)
      .pipe(tap((board) => this.boardService.addBoard(board)));
  }

  deleteBoard(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/boards/${id}`)
      .pipe(tap(({}) => this.boardService.deleteBoard(id)));
  }

  // #### COLUMNS

  getAllColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.url}/columns`);
  }

  getColumns(id: number): Observable<Column[]> {
    return this.http
      .get<Column[]>(`${this.url}/columns/byboard/${id}`)
      .pipe(tap((arrColumns) => (this.columnService._setColumns = arrColumns)));
  }

  addColumn(column: Column): Observable<Column> {
    return this.http
      .post<Column>(`${this.url}/column`, column)
      .pipe(tap((column) => this.columnService.addColumn(column)));
  }

  deleteColumn(id: number) {
    return this.http
      .delete<number>(`${this.url}/columns/${id}`)
      .pipe(tap(({}) => this.columnService.deleteColumn(id)));
  }

  //#### TASKS

  getTasks(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/tasks/byboard/${id}`)
      .pipe(tap((arrTasks) => (this.taskService._setTasks = arrTasks)));
  }

  getAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/tasks`)
      .pipe(tap((arrTasks) => (this.taskService._setAllTasks = arrTasks)));
  }

  getTasksColumn(id: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}/tasks/bycolumn/${id}`)
      .pipe(tap((arrTasks) => (this.taskService._setTasks = arrTasks)));
  }

  addTask(task: Task): Observable<Task> {
    return this.http
      .post<Task>(`${this.url}/task`, task)
      .pipe(tap((task) => this.taskService.addTask(task)));
  }

  deleteTask(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/tasks/${id}`)
      .pipe(tap(({}) => this.taskService.deleteTask(id)));
  }

  // #### SUBTASKS

  getAllSubtasks(): Observable<Subtask[]> {
    return this.http
      .get<Subtask[]>(`${this.url}/subtasks`)
      .pipe(
        tap(
          (arrSubtasks) => (this.subtaskService._setAllSubtasks = arrSubtasks)
        )
      );
  }

  getSubtasks(id: number): Observable<Subtask[]> {
    return this.http
      .get<Subtask[]>(`${this.url}/subtasks/byboard/${id}`)
      .pipe(
        tap((arrSubtasks) => (this.subtaskService._setSubtasks = arrSubtasks))
      );
  }

  addSubtask(subtask: Subtask): Observable<Subtask> {
    return this.http
      .post<Subtask>(`${this.url}/subtask`, subtask)
      .pipe(tap((subtask) => this.subtaskService.addSubtask(subtask)));
  }

  updateSubtask(
    id: number,
    subtask: Omit<Subtask, 'subtaskId' | 'taskId' | 'boardId'>
  ): Observable<Subtask> {
    return this.http.patch<Subtask>(`${this.url}/subtask/${id}`, subtask).pipe(
      tap((subtask) => {
        this.subtaskService.updateSubtask(id, subtask.subtaskTitle);
      })
    );
  }

  deleteSubtask(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.url}/subtask/${id}`)
      .pipe(tap(({}) => this.subtaskService.deleteSubtask(id)));
  }

  selectBoard(board: Board) {
    this.active = board.boardId;
    this.active$.next(board.boardId);
  }
}
