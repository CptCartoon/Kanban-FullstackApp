import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddBoard,
  AddColumn,
  AddTask,
  Board,
  BoardColumn,
  BoardName,
  Column,
  EditBoard,
  EditTask,
  TaskView,
} from '../models/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'https://localhost:7176/api/kanban/';

  // ########## BOARDS

  /**
   * Returns all boards names with id
   */
  getBoardsNames(): Observable<BoardName[]> {
    return this.http.get<BoardName[]>(`${this.url}GetBoardsNames`);
  }

  /**
   * Returns board selected by id
   * @param id - Id of board you want to get
   */
  getBoardById(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${this.url}GetBoardById/${boardId}`);
  }

  /**
   * Add board
   * @param board - board model that you want to add
   */
  addBoard(board: AddBoard): Observable<AddBoard> {
    return this.http.post<AddBoard>(`${this.url}AddBoard`, board);
  }

  /**
   * Edit board
   * @param board - edited board model
   * @param boardId - id of board that you want to edit
   */
  editBoard(board: EditBoard, boardId: number): Observable<EditBoard> {
    return this.http.put<EditBoard>(`${this.url}EditBoard/${boardId}`, board);
  }

  /**
   * Delete board
   * @param id - id of board that you want to delete
   */
  deleteBoard(boardId: number): Observable<number> {
    return this.http.delete<number>(`${this.url}DeleteBoard/${boardId}`);
  }

  // ########## COLUMNS

  /**
   * Returns all columns (name and id) that are in selected board
   * @param id - id of board that you want to get columns
   */
  getBoardColumns(boardId: number): Observable<BoardColumn[]> {
    return this.http.get<BoardColumn[]>(
      `${this.url}GetColumnsByBoard/${boardId}`
    );
  }

  /**
   * Add column to board
   * @param column - column model that you want to add
   * @param board - id of board that you want to add columns
   */
  addColumns(column: AddColumn[], boardId: number): Observable<AddColumn[]> {
    return this.http.post<AddColumn[]>(
      `${this.url}AddColumns/${boardId}`,
      column
    );
  }

  // ########## TASKS

  /**
   * Returns task details
   * @param id - id of task that you want to get more details
   */
  getTaskView(taskId: number): Observable<TaskView> {
    return this.http.get<TaskView>(`${this.url}GetTaskViewById/${taskId}`);
  }

  /**
   * Add task
   * @param task - task model that you want to add
   * @param columnId - id of column that you want to add task
   */
  addTask(task: AddTask, columnId: number): Observable<AddTask> {
    return this.http.post<AddTask>(`${this.url}AddTask/${columnId}`, task);
  }

  /**
   * Edit task
   * @param task - edited task model
   * @param taskId - id of task that you want to edit
   */
  editTask(task: EditTask, taskId: number): Observable<EditTask> {
    return this.http.put<EditTask>(`${this.url}EditTask/${taskId}`, task);
  }

  /**
   * Delete task
   * @param id - id of task that you want to delete
   */
  deleteTask(taskId: number): Observable<number> {
    return this.http.delete<number>(`${this.url}DeleteTask/${taskId}`);
  }
}
