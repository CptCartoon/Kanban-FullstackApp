import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { ModalComponent } from './shared/modal/modal.component';
import { DeleteBoardComponent } from './modals/delete-board/delete-board.component';
import { DeleteTaskComponent } from './modals/delete-task/delete-task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    ColumnsComponent,
    ModalComponent,
    DeleteBoardComponent,
    DeleteTaskComponent,
  ],
})
export class AppComponent {
  title = 'kanban-front';
}
