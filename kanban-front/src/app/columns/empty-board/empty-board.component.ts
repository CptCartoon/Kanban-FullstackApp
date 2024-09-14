import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AddColumnComponent } from '../../modals/add-column/add-column.component';
import { BoardEditorComponent } from '../../modals/board-editor/board-editor.component';
@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [CommonModule, AddColumnComponent, BoardEditorComponent],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.css',
})
export class EmptyBoardComponent {
  @Input() emptyColumns = false;
  @Input() emptyBoards = false;
  @Input() boardId!: number;

  editColumnModal = false; // flag to show add column modal
  editBoardModal = false; // flag to show add board modal

  constructor() {}

  columnModal() {
    this.editColumnModal = !this.editColumnModal;
  }

  boardModal() {
    this.editBoardModal = !this.editBoardModal;
  }
}
