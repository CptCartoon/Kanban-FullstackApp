import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Column, Task } from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { TaskitemComponent } from '../tasks/taskitem/taskitem.component';
import { TaskService } from '../../core/services/task.service';
import { Subscription } from 'rxjs';
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
  @Input() active!: number;
  tasks: Task[] = this.taskService._getTasks;
  columnTasks!: Task[];

  taskNumber!: number;
  sub!: Subscription;

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    if (this.tasks) {
      if (this.active === this.column.boardId) {
        this.getTasks(this.active);
      }
    }
  }

  getTasks(id: number) {
    if (this.tasks) {
      if (this.active === this.column.boardId) {
        this.taskService.taskChange.subscribe({
          next: (arrTasks) => {
            this.tasks = arrTasks;
            this.columnTasks = this.tasks.filter(
              (task) => task.columnId === this.column.columnId
            );
            console.log(this.tasks);
            this.taskNumber = this.columnTasks.length;
          },
        });
      }
    }

    this.apiService.getTasks(id).subscribe({
      error: (err) => console.log('Error on data TASKS ' + err.message),
    });
  }

  ngOnDestroy(): void {
    //this.sub.unsubscribe();
  }
}
