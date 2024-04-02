import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Board, Column, Subtask, Task } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:8080';

  active!: number;
  active$: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.url}/boards`);
  }

  getBoardId(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}/boards/${id}`);
  }

  getColumns(id: number): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.url}/columns/byboard/${id}`);
  }

  getTasks(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks/byboard/${id}`);
  }

  getTasksColumn(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.url}/tasks/bycolumn/${id}`);
  }

  getSubtasks(id: number): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.url}/subtasks/bytask/${id}`);
  }

  deleteTask(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/tasks/${id}`);
  }

  selectBoard(board: Board) {
    this.active = board.boardId;
    this.active$.next(board.boardId);
  }
}
