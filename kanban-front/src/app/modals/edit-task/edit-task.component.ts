import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Column, Subtask, Task } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

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
  columns: Column[] = [];

  constructor(private apiService: ApiService) {}

  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  getActiveStatus(taskColumnId: number) {
    return this.columns.find((column) => taskColumnId === column.id)?.name;
  }

  // editTask(task: Task) {
  //   this.apiService.updateTask(task.taskId, task);
  // }
}
