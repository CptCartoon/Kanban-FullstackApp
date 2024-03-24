import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
  imports: [ModalComponent],
})
export class EditTaskComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }
}
