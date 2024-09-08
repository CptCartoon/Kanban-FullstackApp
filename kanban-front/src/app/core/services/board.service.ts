import { Injectable } from '@angular/core';
import {
  AddBoard,
  AddColumn,
  AddTask,
  Board,
  BoardColumn,
  Column,
  EditBoard,
  EditTask,
} from '../models/model';
import { Observable, Subject } from 'rxjs';
import { ApiService } from './api.service';
import { BoardsNamesService } from './boards-names.service';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private board: Board = {} as Board;
  public boardChange = new Subject<Board>();

  private boardColumns: BoardColumn[] = [];
  public boardColumnsChange = new Subject<BoardColumn[]>();

  constructor(
    private api: ApiService,
    private boardsNamesService: BoardsNamesService
  ) {}

  public get _getBoard() {
    return this.board;
  }

  public set _setBoard(board: Board) {
    this.board = board;
    this.boardChange.next(this._getBoard);
  }

  // ########## BOARD

  public loadBoard(boardId: number) {
    this.api.getBoardById(boardId).subscribe({
      next: (board) => {
        this.board = board;
        this.boardChange.next(this.board);
      },
      error: (error) => {
        console.error('Error fetching board data', error);
      },
    });
  }

  public addBoard(board: AddBoard) {
    this.api.addBoard(board).subscribe({
      next: () => {
        this.boardsNamesService.loadBoardNames();

        this.boardsNamesService.boardsNamesChange.subscribe({
          next: (boards) =>
            this.boardsNamesService.selectBoard(boards[boards.length - 1]),
        });
      },
      error: (error) => {
        console.error('Error adding board', error);
      },
    });
  }

  editBoard(board: EditBoard, boardId: number) {
    this.api.editBoard(board, boardId).subscribe({
      next: () => {
        this.loadBoard(boardId);
      },
      error: (error) => {
        console.error('Error editing board', error);
      },
    });
  }

  deleteBoard(boardId: number) {
    this.api.deleteBoard(boardId).subscribe({
      next: () => {
        this.boardsNamesService.loadBoardNames();
      },
      error: (error) => {
        console.error('Error deleting board', error);
      },
    });
  }

  // ########## COLUMN

  public getBoardColumns(boardId: number) {
    this.api.getBoardColumns(boardId).subscribe({
      next: (boardColumns) => {
        this.boardColumns = boardColumns;
        this.boardColumnsChange.next(this.boardColumns);
      },
      error: (error) => {
        console.error('Error adding column', error);
      },
    });
  }

  public addColumns(columns: AddColumn[], boardId: number) {
    this.api.addColumns(columns, boardId).subscribe({
      next: () => {
        this.loadBoard(boardId);
      },
      error: (error) => {
        console.error('Error adding column', error);
      },
    });
  }
}
