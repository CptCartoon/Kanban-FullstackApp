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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  constructor(private apiService: ApiService) {}

  boards: Board[] = [];
  active!: number;
  board: Board | undefined;

  ngOnInit(): void {
    this.getBoards();
    this.board = this.boards[0];
    this.apiService.active$.subscribe((id) => {
      this.active = id;
      this.board = this.boards.find((board) => board.boardId === this.active);
    });
  }

  showDropDown() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  getBoards() {
    this.apiService
      .getBoards()
      .subscribe((result: Board[]) => (this.boards = result));
  }
}
