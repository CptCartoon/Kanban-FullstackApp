import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../../core/services/board.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';
import { BoardName } from '../../core/models/model';
import { AddColumnComponent } from '../../modals/add-column/add-column.component';
import { BoardEditorComponent } from '../../modals/board-editor/board-editor.component';

@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [CommonModule, AddColumnComponent, BoardEditorComponent],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.css',
})
export class EmptyBoardComponent implements OnInit {
  @Input() emptyColumns = false;
  @Input() emptyBoards = false;

  boardName!: BoardName;

  editModal = false;
  boardModal = false;

  constructor(private boardsNamesService: BoardsNamesService) {}

  ngOnInit(): void {
    this.boardsNamesService.activeBoardChange.subscribe({
      next: (board) => {
        this.boardName = board;
      },
    });
  }

  addColumn() {
    this.editModal = true;
  }

  addBoard() {
    this.boardModal = !this.boardModal;
  }
}
