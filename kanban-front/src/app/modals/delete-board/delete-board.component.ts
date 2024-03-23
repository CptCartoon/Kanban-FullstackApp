import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-delete-board',
  standalone: true,
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.css',
  imports: [ModalComponent],
})
export class DeleteBoardComponent {}
