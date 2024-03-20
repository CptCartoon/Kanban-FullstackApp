import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('optionsbar') optionsbar!: ElementRef;

  showDropDown() {
    this.optionsbar.nativeElement.classList.toggle('display-none');
  }
}
