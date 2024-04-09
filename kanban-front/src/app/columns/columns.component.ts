import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EmptyBoardComponent } from './empty-board/empty-board.component';
import { Board, Column, Subtask, Task } from '../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/services/api.service';
import { ColumnComponent } from './column/column.component';
import { BoardService } from '../core/services/board.service';
import { Subscription } from 'rxjs';
import { ColumnService } from '../core/services/column.service';
import { TaskService } from '../core/services/task.service';
import { SubtaskService } from '../core/services/subtask.service';

@Component({
  selector: 'app-columns',
  standalone: true,
  templateUrl: './columns.component.html',
  styleUrl: './columns.component.css',
  imports: [EmptyBoardComponent, CommonModule, ColumnComponent],
})
export class ColumnsComponent implements OnInit, OnChanges, OnDestroy {
  boards: Board[] = this.boardService._setBoards;
  boardColumns!: Column[];
  tasks: Task[] = this.taskService._getTasks;
  subtasks: Subtask[] = this.subtaskService._getSubtasks;

  active!: number;
  subtasksCount!: number;
  subtasksCompletedCount!: number;

  subBoard!: Subscription;
  subColumn!: Subscription;
  subTask!: Subscription;
  subSubtask!: Subscription;

  constructor(
    private apiService: ApiService,
    private boardService: BoardService,
    private columnService: ColumnService,
    private taskService: TaskService,
    private subtaskService: SubtaskService
  ) {}

  ngOnInit(): void {
    this.getBoards();
    if (this.boards) {
      this.apiService.active$.subscribe((id) => {
        this.active = id;
        this.getColumns(this.active);
        this.getTasks(this.active);
        this.getSubtasks(this.active);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getBoards() {
    this.subBoard = this.boardService.boardsChange.subscribe({
      next: (arrBoards) => {
        this.boards = arrBoards;
        this.active = this.boards[0].boardId;
        this.getColumns(this.active);
        this.getTasks(this.active);
        this.getSubtasks(this.active);
      },
    });

    this.apiService.getBoards().subscribe({
      error: (err) => console.log('Error on data BOARDS ' + err.message),
    });
  }

  getColumns(id: number) {
    this.subColumn = this.columnService.columnChange.subscribe({
      next: (arrColumns) => {
        this.boardColumns = arrColumns;
      },
    });

    this.apiService.getColumns(id).subscribe({
      error: (err) => console.log('Error on data COLUMNS ' + err.message),
    });
  }

  getTasks(id: number) {
    this.subTask = this.taskService.taskChange.subscribe({
      next: (arrTasks) => {
        this.tasks = arrTasks;
        //console.log('GETTASKS' + this.tasks);
      },
    });

    this.apiService.getTasks(id).subscribe({
      error: (err) => console.log('Error on data TASKS ' + err.message),
    });
  }

  getSubtasks(id: number) {
    this.subSubtask = this.subtaskService.subtaskChange.subscribe({
      next: (arrSubtasks) => {
        this.subtasks = arrSubtasks;
        //console.log('getSubtasks ' + this.subtasks);
      },
    });

    this.apiService.getSubtasks(id).subscribe({
      error: (err) => console.log('Error on data SUBTASKS ' + err.message),
    });
  }

  ngOnDestroy(): void {
    if (this.subBoard) {
      this.subBoard.unsubscribe();
    }

    if (this.subColumn) {
      this.subColumn.unsubscribe();
    }

    if (this.subTask) {
      this.subTask.unsubscribe();
    }

    if (this.subSubtask) {
      this.subSubtask.unsubscribe();
    }
  }
}
