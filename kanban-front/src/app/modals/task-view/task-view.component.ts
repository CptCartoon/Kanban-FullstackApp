import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Column, Subtask, Task } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  imports: [ModalComponent, CommonModule, EditTaskComponent],
})
export class TaskViewComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() task!: Task;
  @Input() subtasks!: Subtask[];
  @Input() subtasksCount!: number;
  @Input() subtasksCompletedCount!: number;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  columns: Column[] = [];
  activeColumn!: Column | undefined;

  confirm: boolean = false;
  edit: boolean = false;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.activeColumn = this.columns.find(
    //   (column) => column.columnId === this.task.columnId
    // );
  }

  showManageTask() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  showDropdownStatus() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  getDataColumn(event: any) {
    // this.activeColumn = this.columns.find((column) => {
    //   column.columnId === +event.target.dataset.value;
    // });
    // //this.changeColumn(this.task, +event.target.dataset.value);
    // this.showDropdownStatus();
  }

  deleteTask() {
    this.confirm = true;
  }

  editTask() {
    this.edit = true;
  }

  // deleteTaskModal(id: number) {
  //   this.apiService.deleteTask(id).subscribe();
  // }

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

  // cancel() {
  //   this.confirm = false;
  // }

  closeModal() {
    this.close.emit();
  }
}
