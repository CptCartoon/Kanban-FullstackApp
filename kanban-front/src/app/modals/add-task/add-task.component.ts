import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Board, Column, Subtask, Task } from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import { TaskService } from '../../core/services/task.service';
import { SubtaskService } from '../../core/services/subtask.service';
import { ColumnService } from '../../core/services/column.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
})
export class AddTaskComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Output() close = new EventEmitter<void>();
  @Input() board!: Board | undefined;
  @Input() taskId!: number;
  @Input() subtaskId!: number;

  lastTaskId!: number;

  postTask!: FormGroup;
  postSubtask!: FormGroup;

  columns: Column[] = this.columnService._getColumns;
  selectedColumn!: Column | undefined;

  constructor(
    private apiService: ApiService,
    private taskService: TaskService,
    private subtaskService: SubtaskService,
    private columnService: ColumnService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lastTaskId = this.taskId;

    this.postTask = this.form.group({
      taskId: [this.lastTaskId, [Validators.required]],
      columnId: ['', [Validators.required]],
      boardId: [this.board?.boardId, [Validators.required]],
      taskTitle: [null, [Validators.required]],
      taskDescription: [null],
    });

    this.postSubtask = this.form.group({
      subtasks: this.form.array([]),
    });
    this.addSubtask();
  }

  get controls() {
    return this.postSubtask.controls;
  }

  get subtasks() {
    return this.postSubtask.get('subtasks') as FormArray;
  }

  getDataColumn(event: any) {
    this.selectedColumn = this.columns.find(
      (column) => column.columnId === +event.target.dataset.value
    );
    if (this.selectedColumn) {
      this.postTask.controls['columnId'].setValue(this.selectedColumn.columnId);
    }
    this.showDropdown();
  }

  submitForm() {
    this.apiService.addTask(this.postTask.value).subscribe();
    if (this.subtasks) {
      for (let subtask of this.subtasks.value) {
        this.apiService.addSubtask(subtask).subscribe();
      }
    }
    console.log(this.postTask.value);
    this.lastTaskId++;
    this.close.emit();
  }

  addSubtask() {
    const subtaskForm = this.form.group({
      subtaskId: [this.subtaskId, [Validators.required]],
      taskId: [this.lastTaskId, [Validators.required]],
      boardId: [this.board?.boardId, [Validators.required]],
      subtaskTitle: [null, [Validators.required]],
      subtaskIscomplete: [false, [Validators.required]],
    });
    this.subtasks.push(subtaskForm);
    console.log(this.postSubtask.value);
    this.subtaskId++;
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  closeModal() {
    this.close.emit();
  }

  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }
}
