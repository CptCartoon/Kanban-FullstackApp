import { Component, ViewChild, ElementRef } from '@angular/core';
import { BoardsNavlistComponent } from './boards-navlist/boards-navlist.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [BoardsNavlistComponent],
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
