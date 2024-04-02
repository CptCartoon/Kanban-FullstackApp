import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Subtask } from '../../../../core/models/model';

@Component({
  selector: 'app-subtasks',
  standalone: true,
  imports: [],
  templateUrl: './subtasks.component.html',
  styleUrl: './subtasks.component.css',
})
export class SubtasksComponent {}
