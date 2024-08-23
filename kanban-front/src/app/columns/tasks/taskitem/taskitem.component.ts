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

  subtasks!: Subtask[];
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  show = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subtasks = this.task.subtasks;
    this.subtasksCount = this.subtasks.length;
    this.subtasksCompletedCount = this.subtasks.filter(
      (subtask) => subtask.completed === true
    ).length;
  }

  ngOnChanges(): void {}

  toggleModal(): void {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    // if (this.subSubtask) {
    //   this.subSubtask.unsubscribe();
    // }
  }
}
