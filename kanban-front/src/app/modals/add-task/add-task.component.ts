import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  imports: [ModalComponent],
})
export class AddTaskComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;

  showDropdown() {
    this.dropdown.nativeElement.classList.toggle('display-flex');
  }
}
