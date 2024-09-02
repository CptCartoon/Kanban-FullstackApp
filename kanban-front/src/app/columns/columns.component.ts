import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, Column, Subtask, Task } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { ColumnComponent } from './column/column.component';
import { Subscription } from 'rxjs';
import { AddColumnComponent } from '../modals/add-column/add-column.component';
import { BoardService } from '../core/services/board.service';
import { BoardsNamesService } from '../core/services/boards-names.service';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [
    EmptyBoardComponent,
    CommonModule,
    ColumnComponent,
    AddColumnComponent,
  ],
})
export class ColumnsComponent implements OnInit, OnChanges, OnDestroy {
  board: Board = this.boardService._setBoard;

  subBoard!: Subscription;

  show = false;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private boardsNamesService: BoardsNamesService
  ) {}

  ngOnInit(): void {
    this.getActiveBoard();

    this.boardService.getBoardUpdateListener().subscribe(() => {
      this.getBoardById(this.board.id);
    });
  }

  toggleModal(): void {
    this.show = !this.show;
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getActiveBoard() {
    this.boardsNamesService.activeBoard$.subscribe((board) => {
      this.getBoardById(board.id);
    });
  }

  getBoardById(id: number) {
    this.apiService.getBoardById(id).subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });

    this.subBoard = this.boardService.boardChange.subscribe({
      next: (board) => {
        this.board = board;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subBoard) {
      this.subBoard.unsubscribe();
    }
  }
}
