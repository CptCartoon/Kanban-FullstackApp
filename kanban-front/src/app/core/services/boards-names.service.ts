import { Injectable } from '@angular/core';
import { BoardName } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsNamesService {
  private boardsNames: BoardName[] = [];
  boardsNamesChange = new Subject<BoardName[]>();

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

  selectBoard(board: BoardName) {
    this.activeBoard = board;
    this.activeBoard$.next(this.activeBoard);
  }
}
