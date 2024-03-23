import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css',
  imports: [ModalComponent],
})
export class DeleteTaskComponent {}
