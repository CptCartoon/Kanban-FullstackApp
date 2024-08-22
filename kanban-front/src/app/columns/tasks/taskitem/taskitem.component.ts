import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subtask, Task } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { TaskViewComponent } from '../../../modals/task-view/task-view.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-taskitem',
  standalone: true,
  templateUrl: './taskitem.component.html',
  styleUrl: './taskitem.component.css',
  imports: [CommonModule, TaskViewComponent],
})
export class TaskitemComponent implements OnInit, OnDestroy, OnChanges {
  @Input() task!: Task;
  @Input() subtasks!: Subtask[];

  itemSubtasks!: Subtask[];
  show = false;
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  subSubtask!: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.itemSubtasks = this.subtasks.filter(
      (subtask) => subtask.taskId === this.task.id
    );

    this.subtasksCount = this.subtasks.length;
    this.subtasksCompletedCount = this.itemSubtasks.filter(
      (subtask) => subtask.completed === true
    ).length;
  }

  toggleModal(): void {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    // if (this.subSubtask) {
    //   this.subSubtask.unsubscribe();
    // }
  }
}
