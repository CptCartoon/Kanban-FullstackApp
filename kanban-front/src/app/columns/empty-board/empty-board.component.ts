import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../core/services/board.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';
import { BoardName } from '../../core/models/model';
import { AddColumnComponent } from '../../modals/add-column/add-column.component';

@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [CommonModule, AddColumnComponent],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.css',
})
export class EmptyBoardComponent implements OnInit {
  boardName!: BoardName;
  editModal = false;

  constructor(
    private boardService: BoardService,
    private boardsNamesService: BoardsNamesService
  ) {}

  ngOnInit(): void {
    this.boardsNamesService.activeBoardChange.subscribe({
      next: (board) => {
        this.boardName = board;
      },
    });
  }

  addColumn() {
    console.log(this.boardName);
    this.editModal = true;
  }
}
