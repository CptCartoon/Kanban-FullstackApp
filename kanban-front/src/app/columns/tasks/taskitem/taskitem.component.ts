import { Component, Input, OnInit } from '@angular/core';
import { Subtask, TaskBoard } from '../../../core/models/model';
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
  @Input() task!: TaskBoard;
  show = false;

  constructor() {}

  ngOnInit(): void {}

  toggleModal(): void {
    this.show = !this.show;
  }
}
