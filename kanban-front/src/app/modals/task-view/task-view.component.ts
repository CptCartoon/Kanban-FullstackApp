import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  BoardColumn,
  Subtask,
  SubtaskStatus,
  TaskColumn,
  TaskView,
} from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DeleteType } from '../../core/enums';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  imports: [
    ModalComponent,
    CommonModule,
    TaskEditorComponent,
    DeleteModalComponent,
  ],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown') dropdown!: ElementRef; // columns dropdown
  @ViewChild('optionsbar') optionsbar!: ElementRef; // options dropdown

  @Input() id!: number;
  @Output() close = new EventEmitter<void>();

  DeleteTypeEnum = DeleteType; // enum to check if its delete board or task to show i on delete-modal

  taskView: TaskView = {} as TaskView;

  activeColumn: BoardColumn = {} as BoardColumn;

  deleteFlag: boolean = false;
  editFlag: boolean = false;

  subTaskView!: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaskView(this.id);
  }

  getTaskView(id: number) {
    this.taskService.getTaskView(this.id);
    this.subTaskView = this.taskService.taskViewChange.subscribe({
      next: (taskView) => {
        this.taskView = taskView;

        // get active column to select
        this.activeColumn = this.taskView.columns.find(
          (column) => column.id === this.taskView.columnId
        ) as BoardColumn;
      },
    });
  }

  showManageTask() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  showDropdownStatus() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  //get all columns to select dropdown
  getDataColumn(column: BoardColumn) {
    this.activeColumn = column;
    const newColumn: TaskColumn = { columnId: column.id };
    this.taskService.changeTaskColumn(newColumn, this.taskView.id);
    this.showDropdownStatus();
  }

  editTaskModal() {
    this.editFlag = !this.editFlag;
  }

  changeSubtaskStatus(subtask: Subtask) {
    const subtaskStatus: SubtaskStatus = { completed: !subtask.completed };
    this.taskService.changeSubtaskStatus(
      subtaskStatus,
      subtask.id,
      this.taskView.id
    );
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  cancelDelete() {
    this.deleteFlag = false;
    this.closeModal();
  }

  showConfirmDelete() {
    this.deleteFlag = true;
  }

  closeModal() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.subTaskView.unsubscribe();
  }
}
