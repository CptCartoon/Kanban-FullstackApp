import { Injectable } from '@angular/core';
import { Board } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private board: Board = {} as Board;
  boardChange = new Subject<Board>();

  constructor() {}

  public get _getBoard() {
    return this.board;
  }

  public set _setBoard(board: Board) {
    this.board = board;
    this.boardChange.next(this._getBoard);
  }
}
