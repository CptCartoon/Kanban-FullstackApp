import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-add-board',
  standalone: true,
  templateUrl: './add-board.component.html',
  styleUrl: './add-board.component.css',
  imports: [ModalComponent],
})
export class AddBoardComponent {}
