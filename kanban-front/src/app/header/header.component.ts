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

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule, DeleteBoardComponent, AddTaskComponent],
})
export class HeaderComponent implements OnChanges {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  confirm: boolean = false;
  addtask: boolean = false;

  constructor(private boardsNamesService: BoardsNamesService) {}

  boards!: Board[];
  active!: number;
  board!: BoardName;

  taskId!: number;
  subtaskId!: number;

  ngOnInit(): void {
    // this.taskService.allTasksChange.subscribe({
    //   next: (tasks) => {
    //     this.taskId = tasks[tasks.length - 1].taskId + 1;
    //   },
    // });

    // this.apiService.getAllTasks().subscribe({
    //   error: (err) => console.log('Error on data ALLTASKS ' + err.message),
    // });

    // this.subtaskService.allSubtaskChange.subscribe({
    //   next: (subtasks) => {
    //     this.subtaskId = subtasks[subtasks.length - 1].subtaskId + 1;
    //   },
    // });

    // this.apiService.getAllSubtasks().subscribe({
    //   error: (err) => console.log('Error on data ALL SUBTASKS ' + err.message),
    // });

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
