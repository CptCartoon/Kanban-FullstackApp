import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { TaskService } from '../../../core/services/task.service';
import { Column, Task } from '../../../core/models/model';
import { After } from 'v8';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = this.taskService._getTasks;
  columnTasks!: Task[];
  @Input() column!: Column;

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.getTasks(this.column.boardId);
    //console.log(this.tasks);
  }

  getTasks(id: number) {
    this.taskService.taskChange.subscribe({
      next: (arrTasks) => {
        this.tasks = arrTasks;
        this.columnTasks = this.tasks.filter(
          (task) => task.columnId === this.column.columnId
        );
        console.log(this.columnTasks);
      },
    });

    this.apiService.getTasks(id).subscribe({
      error: (err) => console.log('Error on data TASKS ' + err.message),
    });
  }
}
