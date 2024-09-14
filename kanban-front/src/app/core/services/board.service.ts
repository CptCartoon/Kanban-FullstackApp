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

  public get _getBoardColumns() {
    return this.boardColumns;
  }

  // ########## BOARD

  /**
   * Returns board selected by id
   * @param boardId - Id of board you want to get
   */
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

  /**
   * Add board
   * @param board - board model that you want to add
   */
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

  /**
   * Edit board
   * @param board - edited board model
   * @param boardId - id of board that you want to edit
   */
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

  /**
   * Delete board
   * @param boardId - id of board that you want to delete
   */
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

  /**
   * Returns all columns (name and id) that are in selected board
   * @param id - id of board that you want to get columns
   */
  public getBoardColumns(boardId: number) {
    this.api.getBoardColumns(boardId).subscribe({
      next: (boardColumns) => {
        this.boardColumns = boardColumns;
        this.boardColumnsChange.next(this.boardColumns);
      },
      error: (error) => {
        console.error('Error getting board columns', error);
      },
    });
  }

  /**
   * Add column to board
   * @param columns - columns model that you want to add
   * @param boardId - id of board that you want to add columns
   */
  public addColumns(columns: AddColumn[], boardId: number) {
    this.api.addColumns(columns, boardId).subscribe({
      next: () => {
        this.loadBoard(boardId);
        this.boardsNamesService.loadBoardNames();
      },
      error: (error) => {
        console.error('Error adding columns', error);
      },
    });
  }
}
