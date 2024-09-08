import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardName } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BoardsNamesService } from '../../core/services/boards-names.service';
import { BoardEditorComponent } from '../../modals/board-editor/board-editor.component';

@Component({
  selector: 'app-boards-navlist',
  standalone: true,
  imports: [CommonModule, BoardEditorComponent],
  templateUrl: './boards-navlist.component.html',
  styleUrl: './boards-navlist.component.css',
})
export class BoardsNavlistComponent implements OnInit, OnDestroy {
  addBoard = false; // flag to show/hide board editor
  boardsNames: BoardName[] = []; // board name and id

  activeBoard!: number; // active board id

  subBoardsNames!: Subscription;
  subActiveBoard!: Subscription;

  constructor(private boardsNamesService: BoardsNamesService) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boardsNamesService.loadBoardNames();

    this.subBoardsNames = this.boardsNamesService.boardsNamesChange.subscribe({
      next: (arrBoardsNames) => {
        this.boardsNames = arrBoardsNames;
        this.boardsNamesService.selectBoard(this.boardsNames[0]);
      },
    });

    this.subActiveBoard = this.boardsNamesService.activeBoardChange.subscribe({
      next: (board) => (this.activeBoard = board.id),
    });
  }

  selectBoard(board: BoardName) {
    this.boardsNamesService.selectBoard(board);
    this.activeBoard = board.id;
  }

  addBoardModal(): void {
    this.addBoard = !this.addBoard;
  }

  ngOnDestroy(): void {
    this.subBoardsNames.unsubscribe();
    this.subActiveBoard.unsubscribe();
  }
}
