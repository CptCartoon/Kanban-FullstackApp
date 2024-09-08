import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { BoardName, TaskView } from '../../core/models/model';
import { TaskService } from '../../core/services/task.service';
import { BoardService } from '../../core/services/board.service';
import { CommonModule } from '@angular/common';
import { DeleteType } from '../../core/enums';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Output() cancel = new EventEmitter<boolean>(); // cancel delete

  @Input() deleteType!: DeleteType; // enum with name of thing to delete
  @Input() id!: number; // id of element to delete
  @Input() boardName!: BoardName; // board info
  @Input() taskView!: TaskView; // task info

  deleteTypeEnum = DeleteType; // enum

  constructor(
    private boardService: BoardService,
    private taskService: TaskService
  ) {}

  confirmDelete(id: number) {
    if (this.deleteType === DeleteType.Board) {
      this.deleteBoard(id);
    }
    if (this.deleteType === DeleteType.Task) {
      this.deleteTask(id);
    }
  }

  deleteBoard(boardId: number) {
    this.boardService.deleteBoard(boardId);
    this.cancelDelete();
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
    this.cancelDelete();
  }

  cancelDelete() {
    this.cancel.emit();
  }
}
