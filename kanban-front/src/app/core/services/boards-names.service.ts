import { Injectable } from '@angular/core';
import { BoardName } from '../models/model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsNamesService {
  private boardsNames: BoardName[] = [];
  boardsNamesChange = new Subject<BoardName[]>();
  boardsUpdated = new Subject<void>();

  activeBoard!: BoardName;
  activeBoard$ = new Subject<BoardName>();

  constructor() {}

  public get _getBoardsNames() {
    return this.boardsNames.slice();
  }

  public set _setBoardsNames(arr: BoardName[]) {
    this.boardsNames = [...arr];
    this.boardsNamesChange.next(this._getBoardsNames);
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
