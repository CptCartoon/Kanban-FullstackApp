import { Component, Input } from '@angular/core';
import { Column, Task } from '../../../core/models/model';
import { TaskitemComponent } from '../taskitem/taskitem.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskitemComponent, CommonModule],
})
export class TasksComponent {
  @Input() column!: Column;
  @Input() tasks!: Task[];
}
