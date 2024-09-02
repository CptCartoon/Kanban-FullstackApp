import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../core/services/board.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';

@Component({
  selector: 'app-add-board',
  standalone: true,
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.css',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class AddBoardComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() newBoard = new EventEmitter<void>();

  postBoard!: FormGroup;
  postColumns!: FormGroup;
  columnId!: number;

  constructor(
    private apiService: ApiService,
    private boardsNamesService: BoardsNamesService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.postBoard = this.form.group({
      name: [null, [Validators.required]],
      columns: this.form.array([]),
    });
  }

  submitForm() {
    this.apiService.addBoard(this.postBoard.value).subscribe();
    this.apiService.getBoardsNames().subscribe();
    this.boardsNamesService.notifyBoardsUpdated();
    this.close.emit();
  }

  get controls() {
    return this.postColumns.controls;
  }

  get columns() {
    return this.postBoard.get('columns') as FormArray;
  }

  addColumn() {
    const columnForm = this.form.group({
      name: [null, Validators.required],
    });
    this.columns.push(columnForm);
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  closeModal() {
    this.close.emit();
  }
}
