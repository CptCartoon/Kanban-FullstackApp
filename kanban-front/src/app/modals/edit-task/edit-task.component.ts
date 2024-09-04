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
  TaskView,
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
import { BoardsNamesService } from '../../core/services/boards-names.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
})
export class EditTaskComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Output() close = new EventEmitter<void>();
  @Input() taskView!: TaskView;

  lastTaskId!: number;

  postTask!: FormGroup;
  postSubtask!: FormGroup;

  columns: BoardColumn[] = [];
  selectedColumn!: BoardColumn;

  constructor(
    private apiService: ApiService,
    private form: FormBuilder,
    private boardService: BoardService,
    private boardsNameService: BoardsNamesService
  ) {}

  ngOnInit(): void {
    this.getColumns();

    this.postTask = this.form.group({
      title: [this.taskView.title, [Validators.required]],
      description: [this.taskView.description],
      subtasks: this.form.array([]),
      columnId: [this.selectedColumn],
    });
    this.getSubtasks();
    //this.addSubtask();
  }

  get controls() {
    return this.postSubtask.controls;
  }

  get subtasks() {
    return this.postTask.get('subtasks') as FormArray;
  }

  getColumns() {
    this.apiService
      .getColumnsByBoard(this.boardsNameService.activeBoard.id)
      .subscribe((columns) => {
        this.columns = columns;
        this.selectedColumn = this.columns.find(
          (column) => column.id === this.taskView.columnId
        ) as BoardColumn;
      });
  }

  getDataColumn(event: any) {
    this.selectedColumn = this.columns.find(
      (column) => column.id === +event.target.dataset.value
    ) as BoardColumn;
    this.postTask.patchValue({ columnId: this.selectedColumn.id });
    this.showDropdown();
  }

  submitForm() {
    this.apiService.editTask(this.postTask.value, this.taskView.id).subscribe();
    this.apiService
      .getBoardById(this.boardsNameService.activeBoard.id)
      .subscribe();
    this.boardService.notifyBoardUpdated();
    this.close.emit();
  }

  getSubtasks() {
    this.taskView.subtasks.forEach((subtask) => {
      const subtaskForm = this.form.group({
        id: [subtask.id],
        taskId: [subtask.taskId],
        title: [subtask.title, Validators.required],
        completed: [subtask.completed],
      });
      this.subtasks.push(subtaskForm);
    });
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
