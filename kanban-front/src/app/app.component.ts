import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { ModalComponent } from './shared/modal/modal.component';
import { DeleteBoardComponent } from './modals/delete-board/delete-board.component';
import { DeleteTaskComponent } from './modals/delete-task/delete-task.component';
import { AddBoardComponent } from './modals/add-board/add-board.component';
import { EditBoardComponent } from './modals/edit-board/edit-board.component';
import { AddTaskComponent } from './modals/add-task/add-task.component';
import { EditTaskComponent } from './modals/edit-task/edit-task.component';

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
    AddBoardComponent,
    EditBoardComponent,
    AddTaskComponent,
    EditTaskComponent,
  ],
})
export class AppComponent {
  title = 'kanban-front';
}
