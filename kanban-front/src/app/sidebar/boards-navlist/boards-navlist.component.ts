import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Board } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from '../../modals/add-board/add-board.component';

@Component({
  selector: 'app-boards-navlist',
  standalone: true,
  imports: [CommonModule, AddBoardComponent],
  templateUrl: './boards-navlist.component.html',
  styleUrl: './boards-navlist.component.css',
})
export class BoardsNavlistComponent implements OnInit {
  show = false;

  boards: Board[] = [];

  active!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBoards();
    this.active = this.boards[0]?.boardId;
  }

  selectBoard(board: Board) {
    this.apiService.selectBoard(board);
    this.active = board.boardId;
  }

  getBoards() {
    this.apiService
      .getBoards()
      .subscribe((result: Board[]) => (this.boards = result));
  }

  toggleModal(): void {
    this.show = !this.show;
  }
}
