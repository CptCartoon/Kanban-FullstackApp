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

  hideSidebar() {
    this.sidebar.nativeElement.style.marginLeft = '-400px';
    this.showbtn.nativeElement.style.display = 'block';
  }

  showSidebar() {
    this.sidebar.nativeElement.style.marginLeft = `${0}px`;
    this.showbtn.nativeElement.style.display = 'none';
  }
}
