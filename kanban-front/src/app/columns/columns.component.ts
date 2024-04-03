import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, Column, Subtask, Task } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { ColumnComponent } from './column/column.component';
import { BoardService } from '../core/services/board.service';
import { Subscription } from 'rxjs';
import { ColumnService } from '../core/services/column.service';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [EmptyBoardComponent, CommonModule, ColumnComponent],
})
export class ColumnsComponent implements OnInit {
  boards: Board[] = this.boardService._setBoards;
  boardColumns: Column[] | undefined;
  active!: number;

  subBoard!: Subscription;
  subColumn!: Subscription;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private columnService: ColumnService
  ) {}

  ngOnInit(): void {
    this.getBoards();
    if (this.boards) {
      this.active = this.boards[0]?.boardId;
      this.getColumns(this.active);
      this.apiService.active$.subscribe((id) => {
        this.active = id;
        this.getColumns(this.active);
      });
    }
  }

  getBoards() {
    this.boardService.boardsChange.subscribe({
      next: (arrBoards) => (this.boards = arrBoards),
    });

    this.apiService.getBoards().subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });
  }

  getColumns(id: number) {
    this.columnService.columnChange.subscribe({
      next: (arrColumns) => {
        this.boardColumns = arrColumns;
      },
    });

    this.apiService.getColumns(id).subscribe({
      error: (err) => console.log('Error on data COLUMNS ' + err.message),
    });
  }

  ngOnDestroy(): void {
    //this.subColumn.unsubscribe();
  }
}
