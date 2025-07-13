import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './app/template/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
  styleUrls: []
})
export class AppComponent {
  title = 'Sistema de Eventos';
}

