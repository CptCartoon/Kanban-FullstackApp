import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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

  boardsNames: BoardName[] = this.boardsNamesService._getBoardsNames;

  active!: number;
  sub!: Subscription;

  constructor(
    private boardsNamesService: BoardsNamesService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.sub = this.boardsNamesService.boardsNamesChange.subscribe({
      next: (arrBoardsNames) => {
        this.boardsNames = arrBoardsNames;
        this.active = this.boardsNames[0]?.id;
        this.selectBoard(this.boardsNames[0]);
      },
    });
    this.apiService.getBoardsNames().subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });
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
