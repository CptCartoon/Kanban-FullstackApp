import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-edit-board',
  standalone: true,
  templateUrl: './edit-board.component.html',
  styleUrl: './edit-board.component.css',
  imports: [ModalComponent],
})
export class EditBoardComponent {}
