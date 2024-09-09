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
import { SimpleColumn, Subtask, TaskView } from '../../core/models/model';
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
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  @Input() id!: number;
  @Output() close = new EventEmitter<void>();

  DeleteTypeEnum = DeleteType;

  taskView: TaskView = {} as TaskView;

  subtasks!: Subtask[];
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  activeColumn!: SimpleColumn | undefined;

  subTaskView!: Subscription;

  deleteFlag: boolean = false;
  editFlag: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTaskView(this.id);
  }

  getTaskView(id: number) {
    this.taskService.getTaskView(this.id);
    this.subTaskView = this.taskService.taskViewChange.subscribe({
      next: (taskView) => {
        this.taskView = taskView;
        this.subtasksCount = this.taskView.subtasks.length;
        this.subtasksCompletedCount = this.taskView.subtasks.filter(
          (subtask) => subtask.completed === true
        ).length;
        this.activeColumn = this.taskView.columns.find(
          (column) => column.id === this.taskView.columnId
        );
      },
    });
  }

  showManageTask() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  showDropdownStatus() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  getDataColumn(event: any) {
    this.activeColumn = this.taskView.columns.find(
      (column) => column.id === +event.target.dataset.value
    );
    this.showDropdownStatus();
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskView.id);
    this.deleteFlag = false;
  }

  editTaskModal() {
    this.editFlag = !this.editFlag;
  }

  changeCompleteStatus(subtask: Subtask) {
    subtask.completed = !subtask.completed;
  }

  deleteTaskModal(id: number) {}

  // changeColumn(task: Task, columnId: number) {
  //   this.apiService
  //     .updateTask(task.taskId, {
  //       columnId: columnId,
  //       taskTitle: task.taskTitle,
  //       taskDescription: task.taskDescription,
  //     })
  //     .subscribe();
  // }

  // changeComplete(subtask: Subtask) {
  //   this.apiService
  //     .updateSubtask(subtask.subtaskId, {
  //       subtaskIscomplete: !subtask.subtaskIscomplete,
  //       subtaskTitle: subtask.subtaskTitle,
  //     })
  //     .subscribe();
  // }

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
