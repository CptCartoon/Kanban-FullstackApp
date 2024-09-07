import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { BoardService } from '../../core/services/board.service';
import { BoardName } from '../../core/models/model';

@Component({
  selector: 'app-board-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './board-editor.component.html',
  styleUrl: './board-editor.component.css',
})
export class BoardEditorComponent implements OnInit {
  @Output() close = new EventEmitter<void>(); // closing modal

  @Input() addBoard: boolean = false; // flag that checks if it's edit mode or add mdoe
  @Input() boardName!: BoardName; // board {id: number, name: string}

  boardForm!: FormGroup;
  columnForm!: FormGroup;

  constructor(private form: FormBuilder, private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardForm = this.form.group({
      name: [this.addBoard ? null : this.boardName.name, [Validators.required]],
      columns: this.form.array([]),
    });

    // if edit mode get columns
    if (this.boardName && this.addBoard === false) {
      this.getColumns();
    }
  }

  get boardControls() {
    return this.boardForm.controls;
  }

  get columnControls() {
    return this.columnForm.controls;
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  submitForm() {
    if (this.boardForm.valid) {
      if (this.addBoard) {
        this.boardService.addBoard(this.boardForm.value);
      } else {
        this.boardService.editBoard(this.boardForm.value, this.boardName.id);
      }
      this.close.emit();
    } else {
      this.boardForm.markAllAsTouched();
    }
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

  getColumns() {
    this.boardService.getBoardColumns(this.boardName.id);
    this.boardService.boardColumnsChange.subscribe((columns) =>
      columns.forEach((column) => {
        const columnForm = this.form.group({
          id: [column.id],
          name: [column.name, Validators.required],
        });

        this.columns.push(columnForm);
      })
    );
  }

  closeModal() {
    this.close.emit();
  }
}
