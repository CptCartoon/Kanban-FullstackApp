import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BoardName } from '../core/models/model';
import { DeleteBoardComponent } from '../modals/delete-board/delete-board.component';
import { BoardsNamesService } from '../core/services/boards-names.service';
import { BoardEditorComponent } from '../modals/board-editor/board-editor.component';
import { TaskEditorComponent } from '../modals/task-editor/task-editor.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    CommonModule,
    DeleteBoardComponent,
    BoardEditorComponent,
    TaskEditorComponent,
  ],
})
export class HeaderComponent implements OnChanges {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  confirm: boolean = false;
  addTaskFlag: boolean = false; // flag to show task editor
  editBoardFlag: boolean = false; // flag to show board editor

  constructor(private boardsNamesService: BoardsNamesService) {}

  active!: number;
  board!: BoardName;

  taskId!: number;
  subtaskId!: number;

  ngOnInit(): void {
    this.getActiveBoard();
  }

  getActiveBoard() {
    this.boardsNamesService.activeBoard$.subscribe((board) => {
      this.active = board.id;
      this.board = board;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  addTaskModal() {
    this.addTaskFlag = !this.addTaskFlag;
  }

  deleteBoard() {
    this.confirm = !this.confirm;
  }

  editBoard() {
    this.editBoardFlag = !this.editBoardFlag;
  }

  showDropDown() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  getBoards() {
    // this.boardsService.boardsChange.subscribe({
    //   next: (arrBoards) => {
    //     this.boards = arrBoards;
    //     this.board = this.boards[0];
    //   },
    // });
    // this.apiService.getBoards().subscribe({
    //   error: (err) => console.log('Error on data BOARDS ' + err.message),
    // });
    //this.active = this.boards[0]?.boardId;
  }
}
