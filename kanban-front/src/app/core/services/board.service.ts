import { Injectable } from '@angular/core';
import { AddColumn, Board, Column } from '../models/model';
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

  public addColumn(column: Column) {
    console.log(column);
    const newColumn: any = {
      ...column,
      tasks: [],
    };
    this.board.columns.push(newColumn as Column);
    this.boardChange.next(this._getBoard);
  }
}
