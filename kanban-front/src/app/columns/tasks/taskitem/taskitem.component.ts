import { Component, Input } from '@angular/core';
import { TaskBoard } from '../../../core/models/model';
import { CommonModule } from '@angular/common';
import { TaskViewComponent } from '../../../modals/task-view/task-view.component';

@Component({
  selector: 'app-taskitem',
  standalone: true,
  templateUrl: './taskitem.component.html',
  styleUrl: './taskitem.component.css',
  imports: [CommonModule, TaskViewComponent],
})
export class TaskitemComponent {
  @Input() task!: TaskBoard;
  showTaskView = false; // flag to show task view

  constructor() {}

  toggleModal(): void {
    this.showTaskView = !this.showTaskView;
  }
}
