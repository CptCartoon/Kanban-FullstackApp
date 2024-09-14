import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, BoardName, TaskBoard } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ColumnComponent } from './column/column.component';
import { Subscription } from 'rxjs';
import { AddColumnComponent } from '../modals/add-column/add-column.component';
import { BoardService } from '../core/services/board.service';
import { BoardsNamesService } from '../core/services/boards-names.service';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../core/services/task.service';

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
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
})
export class ColumnsComponent implements OnInit, OnDestroy {
  board!: Board;
  boardName: BoardName = {} as BoardName;

  addColumnFlag = false; // flag to show add column modal

  subBoard$!: Subscription;
  subActiveBoard$!: Subscription;

  constructor(
    private boardService: BoardService,
    private boardsNamesService: BoardsNamesService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getBoardById();
  }

  getBoardById() {
    // load active board
    this.subActiveBoard$ = this.boardsNamesService.activeBoardChange.subscribe(
      (board) => {
        if (board) {
          this.boardName = board;
          this.boardService.loadBoard(board.id);
        } else {
          this.boardName = {} as BoardName;
        }
      }
    );

    // check changes on board
    this.subBoard$ = this.boardService.boardChange.subscribe({
      next: (board) => {
        if (board) {
          this.board = board;
        }
      },
    });
  }

  drop(event: CdkDragDrop<TaskBoard[]>, columnId: number) {
    const draggedItem = event.previousContainer.data[event.previousIndex];
    const targetColumn = {
      columnId: columnId,
    };

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.taskService.changeTaskColumn(targetColumn, draggedItem.id);
    }
  }

  toggleModal(): void {
    this.addColumnFlag = !this.addColumnFlag;
  }

  ngOnDestroy(): void {
    this.subBoard$.unsubscribe();
    this.subActiveBoard$.unsubscribe();
  }
}
