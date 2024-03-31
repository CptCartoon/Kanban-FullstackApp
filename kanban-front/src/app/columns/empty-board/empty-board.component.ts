import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-board.component.html',
  styleUrl: './empty-board.component.css',
})
export class EmptyBoardComponent {}
