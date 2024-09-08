import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board } from '../core/models/model';
import { CommonModule } from '@angular/common';
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
export class ColumnsComponent implements OnInit, OnDestroy {
  board: Board = {} as Board;

  subBoard!: Subscription;
  subActiveBoard!: Subscription;

  addColumn = false;

  constructor(
    private boardService: BoardService,
    private boardsNamesService: BoardsNamesService
  ) {}

  ngOnInit(): void {
    this.getBoardById();
  }

  toggleModal(): void {
    this.addColumn = !this.addColumn;
  }

  getBoardById() {
    this.subActiveBoard = this.boardsNamesService.activeBoardChange.subscribe(
      (board) => {
        this.boardService.loadBoard(board.id);
      }
    );

    this.subBoard = this.boardService.boardChange.subscribe({
      next: (board) => {
        this.board = board || [];
      },
    });
  }

  ngOnDestroy(): void {
    this.subBoard.unsubscribe();
    this.subActiveBoard.unsubscribe();
  }
}
