import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { AddColumn, BoardColumn, BoardName } from '../../core/models/model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-board',
  standalone: true,
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.css',
  imports: [ModalComponent, ReactiveFormsModule, CommonModule],
})
export class EditBoardComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() newBoard = new EventEmitter<void>();
  @Input() board!: BoardName;

  postBoard!: FormGroup;
  postColumns!: FormGroup;

  constructor(
    private apiService: ApiService,
    private boardsNamesService: BoardsNamesService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getColumns();
    this.postBoard = this.form.group({
      id: [this.board.id],
      name: [this.board.name, [Validators.required]],
      columns: this.form.array([]),
    });
  }

  submitForm() {
    console.log('xd');
    this.apiService.editBoard(this.postBoard.value, this.board.id).subscribe();
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

  getColumns() {
    this.apiService.getColumnsByBoard(this.board.id).subscribe((columns) =>
      columns.forEach((column) => {
        const columnForm = this.form.group({
          id: [column.id],
          name: [column.name, Validators.required],
        });

        this.columns.push(columnForm);
      })
    );
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
