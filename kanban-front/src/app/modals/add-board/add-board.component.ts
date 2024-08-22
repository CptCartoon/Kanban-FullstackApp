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

@Component({
  selector: 'app-add-board',
  standalone: true,
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.css',
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class AddBoardComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  postBoard!: FormGroup;
  postColumns!: FormGroup;
  // boardId: number =
  //   this.boardService._getBoard[this.boardService._getBoard.length - 1]
  //     .boardId + 1;
  columnId!: number;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.postBoard = this.form.group({
    //   boardId: [this.boardId, [Validators.required]],
    //   boardName: [null, [Validators.required]],
    // });

    this.postColumns = this.form.group({
      columns: this.form.array([]),
    });
    //this.getColumnId();
  }

  getColumnId() {
    // this.apiService.getAllColumns().subscribe((columns) => {
    //   this.columnId = columns[columns.length - 1].columnId + 1;
    //   this.addColumn();
    // });
  }

  submitForm() {
    // this.apiService.addBoard(this.postBoard.value).subscribe();
    // for (let column of this.columns.value) {
    //   this.apiService.addColumn(column).subscribe();
    // }
    // console.log(this.postColumns.value);
    // this.boardId++;
    // this.close.emit();
  }

  get controls() {
    return this.postColumns.controls;
  }

  get columns() {
    return this.postColumns.get('columns') as FormArray;
  }

  addColumn() {
    // const columnForm = this.form.group({
    //   columnId: [this.columnId, Validators.required],
    //   boardId: [this.boardId, Validators.required],
    //   columnName: [null, Validators.required],
    // });
    // this.columns.push(columnForm);
    // this.columnId++;
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  closeModal() {
    this.close.emit();
  }
}
