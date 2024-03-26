import { Component } from '@angular/core';
import { BoardsNavlistComponent } from '../../sidebar/boards-navlist/boards-navlist.component';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  templateUrl: './mobile-nav.component.html',
  styleUrl: './mobile-nav.component.css',
  imports: [BoardsNavlistComponent],
})
export class MobileNavComponent {}
