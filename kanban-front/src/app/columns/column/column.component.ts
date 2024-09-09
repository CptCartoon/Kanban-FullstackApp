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
  columnTasks?: Task[];

  taskNumber!: number;

  constructor() {}

  ngOnInit(): void {
    //console.log(this.subtasks);
  }

  ngOnChanges(): void {
    // if (this.column.tasks) {
    //   this.columnTasks = this.column.tasks.filter(
    //     (task) => task.columnId === this.column.id
    //   );
    //   this.taskNumber = this.columnTasks.length;
    // }
  }

  ngOnDestroy(): void {
    // if (this.subTask) {
    //   this.subTask.unsubscribe();
    // }
  }
}
