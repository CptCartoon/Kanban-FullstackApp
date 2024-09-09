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
import { BoardColumn, TaskView } from '../../core/models/model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../core/services/board.service';
import { TaskService } from '../../core/services/task.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './task-editor.component.html',
  styleUrl: './task-editor.component.css',
})
export class TaskEditorComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef; //select dropdown
  @Output() close = new EventEmitter<void>(); // closing modal

  @Input() addTask = false; // flag that checks if it's edit mode or add mdoe
  @Input() taskView: TaskView = {} as TaskView; // task info

  taskForm!: FormGroup;
  subtaskForm!: FormGroup;

  get taskControls() {
    return this.taskForm.controls;
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  columns: BoardColumn[] = [];
  selectedColumn: BoardColumn = {} as BoardColumn; //selected task column in select dropdown

  constructor(
    private taskService: TaskService,
    private BoardsNamesService: BoardsNamesService,
    private form: FormBuilder,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.getSelectColumns();

    this.taskForm = this.form.group({
      title: [
        this.addTask && !this.taskView ? null : this.taskView.title,
        [Validators.required],
      ],
      description: [
        this.addTask && !this.taskView ? null : this.taskView.description,
      ],
      subtasks: this.form.array([]),
      columnId: [this.selectedColumn.id, [Validators.required]],
    });

    // if edit mode get subtasks
    if (!this.addTask && this.taskView) {
      this.getSubtasks();
    }
  }

  submitForm() {
    if (this.taskForm.valid) {
      if (this.addTask) {
        this.taskService.addTask(this.taskForm.value, this.selectedColumn.id);
      } else {
        this.taskService.editTask(this.taskForm.value, this.taskView.id);
      }
      this.close.emit();
    } else {
      this.taskForm.markAllAsTouched();
    }
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

  // get subtasks if edit mode
  getSubtasks() {
    this.taskView.subtasks.forEach((subtask) => {
      const subtaskForm = this.form.group({
        id: [subtask.id],
        title: [subtask.title, Validators.required],
        completed: [subtask.completed],
      });

      this.subtasks.push(subtaskForm);
    });
  }

  // get board columns to select dropdown
  getSelectColumns() {
    this.boardService.getBoardColumns(this.BoardsNamesService.activeBoard.id);
    this.boardService.boardColumnsChange.subscribe({
      next: (columns) => {
        this.columns = columns;
        if (this.columns.length) {
          if (this.addTask) {
            this.selectedColumn = this.columns[0];
            this.taskForm.patchValue({ columnId: this.selectedColumn.id });
          } else if (!this.addTask) {
            this.selectedColumn = this.columns.find(
              (column) => column.id === this.taskView.columnId
            ) as BoardColumn;
            this.taskForm.patchValue({ columnId: this.taskView.columnId });
          }
        }
      },
    });
  }

  // selecting column in dropdown
  getDataColumn(column: BoardColumn) {
    this.selectedColumn = column;
    this.taskForm.patchValue({ columnId: column.id });
    this.showDropdown();
  }

  //close task editor modal
  closeModal() {
    this.close.emit();
  }

  // show select dropdown
  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }
}
