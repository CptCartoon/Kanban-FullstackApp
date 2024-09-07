import { Injectable } from '@angular/core';
import { BoardName } from '../models/model';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BoardsNamesService {
  private boardsNames: BoardName[] = [];
  boardsNamesChange = new Subject<BoardName[]>();
  boardsUpdated = new Subject<void>();

  activeBoard!: BoardName;
  activeBoard$ = new Subject<BoardName>();

  constructor(private api: ApiService) {}

  public get _getBoardsNames() {
    return this.boardsNames.slice();
  }

  public set _setBoardsNames(arr: BoardName[]) {
    this.boardsNames = [...arr];
    this.boardsNamesChange.next(this._getBoardsNames);
  }

  public loadBoardNames() {
    this.api.getBoardsNames().subscribe({
      next: (names) => {
        this.boardsNames = names;
        this.boardsNamesChange.next(this.boardsNames);
      },
      error: (error) => {
        console.error('Error fetching boards names data', error);
      },
    });
  }

  notifyBoardsUpdated() {
    this.boardsUpdated.next();
  }

  getBoardsUpdateListener(): Observable<void> {
    return this.boardsUpdated.asObservable();
  }

  selectBoard(board: BoardName) {
    this.activeBoard = board;
    this.activeBoard$.next(this.activeBoard);
  }
}
