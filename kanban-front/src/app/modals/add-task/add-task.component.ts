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
import {
  Board,
  BoardColumn,
  BoardName,
  Column,
  Subtask,
  Task,
} from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { BoardService } from '../../core/services/board.service';
import { TaskService } from '../../core/services/task.service';

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
  @Input() board!: BoardName;
  @Input() taskId!: number;
  @Input() subtaskId!: number;

  lastTaskId!: number;

  postTask!: FormGroup;
  postSubtask!: FormGroup;

  columns: BoardColumn[] = [];
  selectedColumn!: BoardColumn;

  constructor(
    private taskService: TaskService,
    private form: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getColumns();
    this.postTask = this.form.group({
      title: [null, [Validators.required]],
      description: [null],
      subtasks: this.form.array([]),
    });
    //this.addSubtask();
  }

  get controls() {
    return this.postSubtask.controls;
  }

  get subtasks() {
    return this.postTask.get('subtasks') as FormArray;
  }

  getColumns() {
    this.boardService.getBoardColumns(this.board.id);
    this.boardService.boardColumnsChange.subscribe({
      next: (columns) => {
        this.columns = columns;
        this.selectedColumn = this.columns[0];
      },
    });
  }

  getDataColumn(event: any) {
    this.selectedColumn = this.columns.find(
      (column) => column.id === +event.target.dataset.value
    ) as BoardColumn;
    this.showDropdown();
  }

  submitForm() {
    this.taskService.addTask(this.postTask.value, this.selectedColumn.id);
    this.close.emit();
  }

  addSubtask() {
    const subtaskForm = this.form.group({
      title: [null, Validators.required],
      completed: [false],
    });
    this.subtasks.push(subtaskForm);
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
