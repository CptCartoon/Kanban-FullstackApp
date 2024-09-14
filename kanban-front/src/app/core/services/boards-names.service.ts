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

  activeBoard: BoardName = this.boardsNames[0];
  activeBoardChange = new Subject<BoardName>();

  constructor(private api: ApiService) {}

  public get _getBoardsNames() {
    return this.boardsNames.slice();
  }

  public set _setBoardsNames(arr: BoardName[]) {
    this.boardsNames = [...arr];
    this.boardsNamesChange.next(this._getBoardsNames);
  }

  public get _getActiveBoard() {
    return this.activeBoard;
  }

  public set _setActiveBoard(boardName: BoardName) {
    this.activeBoard = boardName;
    this.activeBoardChange.next(this._getActiveBoard);
  }

  /**
   * Returns all boards names with id and columnsCount
   */
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

  /**
   * Select active board
   */
  selectBoard(board: BoardName) {
    this.activeBoard = board;
    this.activeBoardChange.next(this.activeBoard);
  }
}
