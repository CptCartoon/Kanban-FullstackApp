import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { CommonModule } from '@angular/common';
import { BoardService } from '../../core/services/board.service';

@Component({
  selector: 'app-add-column',
  standalone: true,
  templateUrl: './add-column.component.html',
  styleUrl: './add-column.component.css',
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
})
export class AddColumnComponent {
  @Output() close = new EventEmitter<void>();
  @Input() active!: number;

  postColumns!: FormGroup;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private form: FormBuilder
  ) {}

  ngOnInit(): void {
    this.postColumns = this.form.group({
      columns: this.form.array([]),
    });
    this.addColumn();
  }

  submitForm() {
    // for (let column of this.columns.value) {
    //   this.apiService.addColumn(column).subscribe();
    // }
    // this.close.emit();
  }

  get controls() {
    return this.postColumns.controls;
  }

  get columns() {
    return this.postColumns.get('columns') as FormArray;
  }

  addColumn() {
    const columnForm = this.form.group({
      boardId: [this.active, Validators.required],
      columnName: [null, Validators.required],
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
