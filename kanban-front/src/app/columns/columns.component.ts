import { Component, OnInit } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, Column } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [EmptyBoardComponent, CommonModule],
})
export class ColumnsComponent implements OnInit {
  boards!: Board[];
  allColumns: Column[] = [];
  boardColumns: Column[] | undefined = [];
  active!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBoards();
    this.getColumns();
    this.boardColumns = this.allColumns.filter(
      (column) => column.boardId === this.boards[0].boardId
    );
    this.apiService.active$.subscribe((id) => {
      this.active = id;
      this.boardColumns = this.allColumns.filter(
        (column) => column.boardId === this.active
      );
    });
  }

  getBoards() {
    this.apiService
      .getBoards()
      .subscribe((result: Board[]) => (this.boards = result));
  }

  getColumns() {
    this.apiService
      .getColumns()
      .subscribe((result: Column[]) => (this.allColumns = result));
  }
}
