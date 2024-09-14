import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  @Input() boardId!: number;

  columnsForm!: FormGroup;

  get columns() {
    return this.columnsForm.get('columns') as FormArray;
  }

  constructor(private boardService: BoardService, private form: FormBuilder) {}

  ngOnInit(): void {
    this.columnsForm = this.form.group({
      columns: this.form.array([]),
    });
    this.addColumn();
  }

  submitForm() {
    if (this.columnsForm.valid) {
      if (this.boardId) {
        this.boardService.addColumns(this.columns.value, this.boardId);
      }
      this.close.emit();
    } else {
      this.columnsForm.markAllAsTouched();
    }
  }

  addColumn() {
    const columnForm = this.form.group({
      name: ['', Validators.required],
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
