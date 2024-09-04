import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Board, BoardName } from '../../core/models/model';
import { ApiService } from '../../core/services/api.service';
import { BoardsNamesService } from '../../core/services/boards-names.service';

@Component({
  selector: 'app-delete-board',
  standalone: true,
  templateUrl: './delete-board.component.html',
  styleUrl: './delete-board.component.css',
  imports: [ModalComponent],
})
export class DeleteBoardComponent {
  @Output() confirm = new EventEmitter<boolean>();
  @Input() board!: BoardName;

  constructor(
    private apiService: ApiService,
    private boardsNamesService: BoardsNamesService
  ) {}

  cancelDelete() {
    this.confirm.emit();
  }

  deleteBoard(boardId: number) {
    this.apiService.deleteBoard(boardId).subscribe();
    this.apiService.getBoardsNames().subscribe();
    this.boardsNamesService.notifyBoardsUpdated();
    this.cancelDelete();
  }
}
