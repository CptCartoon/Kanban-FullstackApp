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
import { ApiService } from '../../core/services/api.service';
import { Subscription } from 'rxjs';
import { BoardService } from '../../core/services/board.service';
import { TaskService } from '../../core/services/task.service';
import { TaskEditorComponent } from '../task-editor/task-editor.component';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  imports: [ModalComponent, CommonModule, TaskEditorComponent],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  @Input() id!: number;
  @Output() close = new EventEmitter<void>();

  taskView: TaskView = {} as TaskView;

  subtasks!: Subtask[];
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  activeColumn!: SimpleColumn | undefined;

  subTaskView!: Subscription;

  confirm: boolean = false;
  edit: boolean = false;

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
    this.confirm = !this.confirm;
  }

  editTaskModal() {
    this.edit = true;
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

  cancel() {
    this.confirm = false;
  }

  showConfirm() {
    this.confirm = true;
  }

  closeModal() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.subTaskView.unsubscribe();
  }
}
