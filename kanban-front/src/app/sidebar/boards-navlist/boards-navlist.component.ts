import {
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Board, BoardName } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { AddBoardComponent } from '../../modals/add-board/add-board.component';
import { Subscription } from 'rxjs';
import { BoardsNamesService } from '../../core/services/boards-names.service';

@Component({
  selector: 'app-boards-navlist',
  standalone: true,
  imports: [CommonModule, AddBoardComponent],
  templateUrl: './boards-navlist.component.html',
  styleUrl: './boards-navlist.component.css',
})
export class BoardsNavlistComponent implements OnInit, OnDestroy {
  show = false;

  boardsNames!: BoardName[];

  active!: number;
  sub!: Subscription;

  constructor(
    private boardsNamesService: BoardsNamesService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getBoards();

    this.boardsNamesService.getBoardsUpdateListener().subscribe(() => {
      this.getBoards();
    });
  }

  getBoards() {
    this.apiService.getBoardsNames().subscribe((arrBoardsNames) => {});

    this.sub = this.boardsNamesService.boardsNamesChange.subscribe({
      next: (arrBoardsNames) => {
        this.boardsNames = arrBoardsNames;
        this.selectBoard(this.boardsNames[0]);
      },
    });
  }

  notify() {
    this.boardsNamesService.notifyBoardsUpdated();
  }

  selectBoard(board: BoardName) {
    this.boardsNamesService.selectBoard(board);
    this.active = board.id;
  }

  toggleModal(): void {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
