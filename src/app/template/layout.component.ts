import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';
import { ThemeService } from './theme.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-surface-0 transition-colors duration-300">
      <!-- Navbar -->
      <app-navbar
        (toggleSidebar)="toggleSidebar()"
        (toggleTheme)="toggleTheme()">
      </app-navbar>

      <!-- Sidebar -->
      <app-sidebar
        [isOpen]="sidebarOpen"
        (closeSidebar)="closeSidebar()">
      </app-sidebar>

      <!-- Overlay para mobile -->
      <div
        *ngIf="sidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        (click)="closeSidebar()">
      </div>

      <!-- Conteúdo principal -->
      <main
        class="transition-all duration-300 ease-in-out"
        [class.lg:ml-64]="sidebarOpen"
        [class.lg:ml-0]="!sidebarOpen">
        <div class="pt-16 p-6">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
  `,
  styleUrls: []
})
export class LayoutComponent implements OnInit {
  private themeService = inject(ThemeService);

  sidebarOpen = true;

  ngOnInit() {
    // Fechar sidebar em telas pequenas por padrão
    if (window.innerWidth < 1024) {
      this.sidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

