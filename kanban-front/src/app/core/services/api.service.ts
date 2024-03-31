import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Board, Column } from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:8080';

  active!: number;
  active$: Subject<number> = new Subject<number>();

  public get getActive(): number {
    return this.active;
  }
  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(`${this.url}/boards`);
  }

  // getBoardId(id: number): Observable<Board> {
  //   return this.http.get<Board>(`${this.url}/boards/${id}`);
  // }

  // getColumns(id: number): Observable<Column[]> {
  //   return this.http.get<Column[]>(`${this.url}/columns/byboard/${id}`);
  // }

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.url}/columns`);
  }

  selectBoard(board: Board) {
    this.active = board.boardId;
    this.active$.next(board.boardId);
  }
}
