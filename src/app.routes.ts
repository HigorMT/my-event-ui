import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./app/template/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'eventos',
    loadComponent: () => import('./app/template/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'eventos/novo',
    loadComponent: () => import('./app/template/event-form.component').then(m => m.EventFormComponent)
  },
  {
    path: 'eventos/:id',
    loadComponent: () => import('./app/template/event-detail.component').then(m => m.EventDetailComponent)
  },
  {
    path: 'participantes',
    loadComponent: () => import('./app/template/participants.component').then(m => m.ParticipantsComponent)
  },
  {
    path: 'relatorios',
    loadComponent: () => import('./app/template/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'configuracoes',
    loadComponent: () => import('./app/template/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

