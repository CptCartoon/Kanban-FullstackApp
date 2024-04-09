import { Injectable } from '@angular/core';
import { Board } from '../models/model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boards: Board[] = [];
  boardsChange = new Subject<Board[]>();
  constructor() {}

  public get _getBoards() {
    return this.boards.slice();
  }

  public set _setBoards(arr: Board[]) {
    this.boards = [...arr];
    this.boardsChange.next(this._getBoards);
  }

  addBoard(board: Board): void {
    this.boards.push(board);
    this.boardsChange.next(this._getBoards);
  }

  deleteBoard(id: number): void {
    this.boards = this.boards.filter((board) => board.boardId !== id);
    this.boardsChange.next(this._getBoards);
  }
}
