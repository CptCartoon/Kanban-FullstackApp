import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Board } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from '../../modals/add-board/add-board.component';
import { BoardService } from '../../core/services/board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-boards-navlist',
  standalone: true,
  imports: [CommonModule, AddBoardComponent],
  templateUrl: './boards-navlist.component.html',
  styleUrl: './boards-navlist.component.css',
})
export class BoardsNavlistComponent implements OnInit, OnDestroy {
  show = false;

  boards: Board[] = this.boardService._getBoards;

  active!: number;
  sub!: Subscription;
  constructor(
    private boardService: BoardService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.sub = this.boardService.boardsChange.subscribe({
      next: (arrBoards) => {
        this.boards = arrBoards;
        this.active = this.boards[0]?.boardId;
      },
    });
    this.apiService.getBoards().subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });
  }

  selectBoard(board: Board) {
    this.apiService.selectBoard(board);
    this.active = board.boardId;
  }

  toggleModal(): void {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
