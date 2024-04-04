import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Column, Subtask, Task } from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { TaskitemComponent } from '../tasks/taskitem/taskitem.component';
import { TaskService } from '../../core/services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
  imports: [CommonModule, TaskitemComponent],
})
export class ColumnComponent implements OnInit, OnChanges {
  @Input() column!: Column;
  @Input() tasks!: Task[];
  columnTasks!: Task[];

  @Input() subtasks!: Subtask[];
  itemSubtasks!: Subtask[];

  taskNumber!: number;
  subTask!: Subscription;

  constructor(
    private apiService: ApiService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    //console.log(this.subtasks);
  }

  ngOnChanges(): void {
    if (this.tasks) {
      this.columnTasks = this.tasks.filter(
        (task) => task.columnId === this.column.columnId
      );
      //console.log('NGONCHANGES ' + this.columnTasks);
      this.taskNumber = this.columnTasks.length;
    }
  }

  ngOnDestroy(): void {
    // if (this.subTask) {
    //   this.subTask.unsubscribe();
    // }
  }
}
