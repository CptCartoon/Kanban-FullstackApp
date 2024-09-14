import { Component, Input } from '@angular/core';
import { Column } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { TaskitemComponent } from '../tasks/taskitem/taskitem.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  standalone: true,
  templateUrl: './column.component.html',
  styleUrl: './column.component.css',
  imports: [CommonModule, TaskitemComponent, CdkDrag],
})
export class ColumnComponent {
  @Input() column!: Column;

  constructor() {}
}
