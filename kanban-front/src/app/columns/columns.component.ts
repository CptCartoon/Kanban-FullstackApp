import { Component } from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [EmptyBoardComponent],
})
export class ColumnsComponent {}
