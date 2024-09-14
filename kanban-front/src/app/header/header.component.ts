import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { BoardName } from '../core/models/model';
import { BoardsNamesService } from '../core/services/boards-names.service';
import { BoardEditorComponent } from '../modals/board-editor/board-editor.component';
import { TaskEditorComponent } from '../modals/task-editor/task-editor.component';
import { DeleteType } from '../core/enums';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { BoardService } from '../core/services/board.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    CommonModule,
    BoardEditorComponent,
    TaskEditorComponent,
    DeleteModalComponent,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('optionsbar') optionsbar!: ElementRef; // dropdown with options

  deleteFlag: boolean = false; // flag to show delete editor
  addTaskFlag: boolean = false; // flag to show task editor
  editBoardFlag: boolean = false; // flag to show board editor

  DeleteTypeEnum = DeleteType; // enum with type of object to delete
  boardName: BoardName = {} as BoardName; // active board name and id

  activeBoard$!: Subscription;

  constructor(private boardsNamesService: BoardsNamesService) {}

  ngOnInit(): void {
    this.getActiveBoard();
  }

  // get board name
  getActiveBoard() {
    this.activeBoard$ = this.boardsNamesService.activeBoardChange.subscribe(
      (board) => {
        if (board) {
          this.boardName = board;
        } else {
          this.boardName = {} as BoardName;
        }
      }
    );
  }

  // hide/show add task modal
  addTaskModal() {
    this.addTaskFlag = !this.addTaskFlag;
  }

  // hide/show delete board modal
  deleteModal() {
    this.deleteFlag = !this.deleteFlag;
    if (this.deleteFlag) {
      this.showDropDown();
    }
  }

  // show edit board modal
  editBoard() {
    this.editBoardFlag = !this.editBoardFlag;
    if (this.editBoardFlag) {
      this.showDropDown();
    }
  }

  // dropdown with options
  showDropDown() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  ngOnDestroy(): void {
    this.activeBoard$.unsubscribe();
  }
}
