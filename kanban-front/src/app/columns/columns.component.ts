import { Component, OnInit } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, Column, Subtask, Task } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { ColumnComponent } from './column/column.component';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [EmptyBoardComponent, CommonModule, ColumnComponent],
})
export class ColumnsComponent implements OnInit {
  boards!: Board[];
  boardColumns: Column[] | undefined;
  active!: number;

  columnTasks!: Task[];

  constructor(private apiService: ApiService) {}

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
    this.apiService.getBoards().subscribe((result: Board[]) => {
      this.boards = result;
    });
  }

  getColumns(id: number) {
    this.apiService.getColumns(id).subscribe((columns: Column[]) => {
      this.boardColumns = columns.filter(
        (column) => column.boardId === this.active
      );
    });
  }
}
