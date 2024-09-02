import { Injectable } from '@angular/core';
import { AddBoard, AddColumn, Board, Column } from '../models/model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private board: Board = {} as Board;
  boardChange = new Subject<Board>();
  boardUpdated = new Subject<void>();

  constructor() {}

  public get _getBoard() {
    return this.board;
  }

  public set _setBoard(board: Board) {
    this.board = board;
    this.boardChange.next(this._getBoard);
  }

  notifyBoardUpdated() {
    this.boardUpdated.next();
  }

  getBoardUpdateListener(): Observable<void> {
    return this.boardUpdated.asObservable();
  }

  public addColumn(column: Column) {
    const newColumn: any = {
      ...column,
      tasks: [],
    };
    this.board.columns.push(newColumn as Column);
    this.boardChange.next(this._getBoard);
  }
}
