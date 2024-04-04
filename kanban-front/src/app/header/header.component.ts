import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Board } from '../core/models/model';
import { BoardService } from '../core/services/board.service';
import { DeleteBoardComponent } from '../modals/delete-board/delete-board.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, DeleteBoardComponent],
})
export class HeaderComponent implements OnChanges {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  confirm: boolean = false;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService
  ) {}

  boards!: Board[];
  active!: number;
  board!: Board | undefined;

  ngOnInit(): void {
    this.getBoards();
    if (this.boards) {
      this.apiService.active$.subscribe((id) => {
        this.active = id;
        this.board = this.boards.find((board) => board.boardId === this.active);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  deleteBoard() {
    this.confirm = !this.confirm;
  }

  showDropDown() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  getBoards() {
    this.boardService.boardsChange.subscribe({
      next: (arrBoards) => {
        this.boards = arrBoards;
        this.board = this.boards[0];
      },
    });

    this.apiService.getBoards().subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });
    this.active = this.boards[0]?.boardId;
  }
}
