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
import { ColumnService } from '../../core/services/column.service';

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

  columns: Column[] = this.columnService._getColumns;
  activeColumn!: Column | undefined;

  confirm: boolean = false;
  edit: boolean = false;
  constructor(
    private apiService: ApiService,
    private columnService: ColumnService
  ) {}

  ngOnInit(): void {
    this.activeColumn = this.columns.find(
      (column) => column.columnId === this.task.columnId
    );
  }

  showManageTask() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  showDropdownStatus() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  getDataColumn(event: any) {
    this.activeColumn = this.columns.find(
      (column) => column.columnId === +event.target.dataset.value
    );
    this.showDropdownStatus();
  }

  deleteTask() {
    this.confirm = true;
  }

  editTask() {
    this.edit = true;
  }

  deleteTaskModal(id: number) {
    this.apiService.deleteTask(id).subscribe();
  }

  changeComplete(subtask: Subtask) {
    subtask.subtaskIscomplete = !subtask.subtaskIscomplete;
  }

  cancel() {
    this.confirm = false;
  }

  closeModal() {
    this.close.emit();
  }
}
