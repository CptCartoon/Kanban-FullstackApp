import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('showbtn') showbtn!: ElementRef;

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle('margin-left');
    if (this.sidebar.nativeElement.classList.contains('margin-left')) {
      this.showbtn.nativeElement.style.display = 'block';
    } else {
      this.showbtn.nativeElement.style.display = 'none';
    }
  }
}
