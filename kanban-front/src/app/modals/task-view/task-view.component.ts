import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Subtask, Task } from '../../core/models/model';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
  imports: [ModalComponent, CommonModule],
})
export class TaskViewComponent {
  @Output() close = new EventEmitter<void>();
  @Input() task!: Task;
  @Input() subtasks!: Subtask[];
  @Input() subtasksCount!: number;
  @Input() subtasksCompletedCount!: number;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  constructor(private apiService: ApiService) {}

  showManageTask() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }

  showDropdownStatus() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }

  deleteTask(id: number) {
    this.apiService
      .deleteTask(id)
      .subscribe((data) => console.log(data + 'usun'));
    //this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
}
