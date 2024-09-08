import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnsComponent } from './columns/columns.component';
import { ModalComponent } from './shared/modal/modal.component';
import { MobileNavComponent } from './modals/mobile-nav/mobile-nav.component';

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
    MobileNavComponent,
  ],
})
export class AppComponent {
  title = 'kanban-front';
}
