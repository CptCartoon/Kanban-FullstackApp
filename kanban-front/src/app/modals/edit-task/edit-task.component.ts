import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Column, Subtask, Task } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { ColumnService } from '../../core/services/column.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  imports: [ModalComponent, CommonModule],
})
export class EditTaskComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() task!: Task;
  @Input() subtasks!: Subtask[];
  columns: Column[] = this.columnService._getColumns;

  constructor(private columnService: ColumnService) {}

  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  getActiveStatus(taskColumnId: number) {
    return this.columns.find((column) => taskColumnId === column.columnId)
      ?.columnName;
  }
}
