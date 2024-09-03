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
  Column,
  SimpleColumn,
  Subtask,
  Task,
  TaskView,
} from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskViewService } from '../../core/services/task-view.service';
import { Subscription } from 'rxjs';
import { BoardsNamesService } from '../../core/services/boards-names.service';
import { BoardService } from '../../core/services/board.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  imports: [ModalComponent, CommonModule, EditTaskComponent],
})
export class TaskViewComponent implements OnInit, OnDestroy {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  @Input() id!: number;
  @Output() close = new EventEmitter<void>();

  taskView!: TaskView;

  subtasks!: Subtask[];
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  activeColumn!: SimpleColumn | undefined;

  subTaskView!: Subscription;

  confirm: boolean = false;
  edit: boolean = false;

  constructor(
    private apiService: ApiService,
    private taskViewService: TaskViewService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getTaskView(this.id);
  }

  getTaskView(id: number) {
    this.subTaskView = this.taskViewService.taskViewChange.subscribe({
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
    this.apiService.getTaskView(id).subscribe({
      error: (err) => console.log('Error on data Task View ' + err.message),
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
    // //this.changeColumn(this.task, +event.target.dataset.value);
    this.showDropdownStatus();
  }

  deleteTask() {
    this.apiService.deleteTask(this.id).subscribe();
    this.apiService.getBoardsNames().subscribe();
    this.boardService.notifyBoardUpdated();
    this.confirm = !this.confirm;
  }

  editTask() {
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
