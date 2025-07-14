import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutComponent } from './app/template/layout.component';
import { AuthLayoutComponent } from './app/template/login/auth-layout.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, LayoutComponent, AuthLayoutComponent],
    template: `
        <div *ngIf="isAuthRoute; else mainLayout">
            <app-auth-layout>
                <router-outlet></router-outlet>
            </app-auth-layout>
        </div>

        <ng-template #mainLayout>
            <app-layout>
                <router-outlet></router-outlet>
            </app-layout>
        </ng-template>
    `,
    styleUrls: []
})
export class AppComponent implements OnInit {
    title = 'Sistema de Eventos';
    isAuthRoute = false;

    constructor(private router: Router) {}

    ngOnInit() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.isAuthRoute = event.url.includes('/login') || event.url.includes('/cadastro');
        });
    }
}
