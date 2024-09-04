import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Board, BoardName } from '../core/models/model';
import { DeleteBoardComponent } from '../modals/delete-board/delete-board.component';
import { AddTaskComponent } from '../modals/add-task/add-task.component';
import { BoardsNamesService } from '../core/services/boards-names.service';
import { ApiService } from '../core/services/api.service';
import { EditBoardComponent } from '../modals/edit-board/edit-board.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    CommonModule,
    DeleteBoardComponent,
    AddTaskComponent,
    EditBoardComponent,
  ],
})
export class HeaderComponent implements OnChanges {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  confirm: boolean = false;
  addtask: boolean = false;
  edit: boolean = false;

  constructor(
    private boardsNamesService: BoardsNamesService,
    private apiService: ApiService
  ) {}

  boards!: Board[];
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
    this.addtask = !this.addtask;
  }

  deleteBoard() {
    this.confirm = !this.confirm;
  }

  editBoard() {
    this.edit = !this.edit;
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
