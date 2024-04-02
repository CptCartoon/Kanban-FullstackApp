import { Component, Input, OnInit } from '@angular/core';
import { Column, Subtask, Task } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { TaskViewComponent } from '../../../modals/task-view/task-view.component';

@Component({
  selector: 'app-taskitem',
  standalone: true,
  templateUrl: './taskitem.component.html',
  styleUrl: './taskitem.component.css',
  imports: [CommonModule, TaskViewComponent],
})
export class TaskitemComponent implements OnInit {
  @Input() task!: Task;

  subtasks!: Subtask[];
  show = false;
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getSubtasks(this.task.taskId);
  }

  getSubtasks(id: number) {
    this.apiService.getSubtasks(id).subscribe((subtasks) => {
      this.subtasks = subtasks;
      this.subtasksCount = this.subtasks.length;
      this.subtasksCompletedCount = this.subtasks.filter(
        (subtask) => subtask.subtaskIscomplete === true
      ).length;
    });
  }

  toggleModal(): void {
    this.show = !this.show;
  }
}
