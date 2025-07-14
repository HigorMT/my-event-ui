import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-layout">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .auth-layout {
      min-height: 100vh;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
  `]
})
export class AuthLayoutComponent {}

