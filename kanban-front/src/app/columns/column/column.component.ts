import { Component, Input, OnInit } from '@angular/core';
import { Column, Task } from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { TaskitemComponent } from '../tasks/taskitem/taskitem.component';
import { TasksComponent } from '../tasks/tasks/tasks.component';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
  imports: [CommonModule, TaskitemComponent, TasksComponent],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Input() tasks!: Task[];

  taskNumber!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasksColumn(this.column.columnId);
  }

  getTasksColumn(id: number) {
    this.apiService.getTasksColumn(id).subscribe((tasks) => {
      this.tasks = tasks;
      this.taskNumber = this.tasks.length;
    });
  }
}
