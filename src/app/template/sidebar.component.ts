import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  badge?: string;
  badgeClass?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <aside 
      class="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out bg-surface-0 border-r border-surface-200 shadow-custom-lg"
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
      [class.w-64]="isOpen">
      
      <div class="h-full px-3 py-4 overflow-y-auto">
        <!-- Menu principal -->
        <ul class="space-y-2">
          <li *ngFor="let item of menuItems">
            <!-- Item sem filhos -->
            <div *ngIf="!item.children">
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-primary-50 text-primary-700 border-r-2 border-primary-500"
                class="flex items-center p-2 text-surface-700 rounded-lg hover:bg-surface-100 group transition-colors duration-200"
                (click)="onItemClick(item)">
                <i [class]="item.icon" class="w-5 h-5 text-surface-500 group-hover:text-surface-700"></i>
                <span class="ml-3 font-medium">{{ item.label }}</span>
                <span 
                  *ngIf="item.badge"
                  [class]="item.badgeClass || 'bg-primary-100 text-primary-800'"
                  class="inline-flex items-center justify-center px-2 ml-auto text-xs font-medium rounded-full">
                  {{ item.badge }}
                </span>
              </a>
            </div>

            <!-- Item com filhos -->
            <div *ngIf="item.children">
              <button
                type="button"
                (click)="toggleSubmenu(item)"
                class="flex items-center w-full p-2 text-surface-700 rounded-lg hover:bg-surface-100 group transition-colors duration-200">
                <i [class]="item.icon" class="w-5 h-5 text-surface-500 group-hover:text-surface-700"></i>
                <span class="flex-1 ml-3 text-left font-medium">{{ item.label }}</span>
                <i 
                  class="w-3 h-3 transition-transform duration-200"
                  [class.rotate-180]="item.expanded"
                  [class]="'pi pi-chevron-down'">
                </i>
              </button>
              
              <!-- Submenu -->
              <ul 
                *ngIf="item.expanded"
                class="py-2 space-y-2 ml-6 border-l border-surface-200">
                <li *ngFor="let child of item.children">
                  <a
                    [routerLink]="child.route"
                    routerLinkActive="bg-primary-50 text-primary-700"
                    class="flex items-center w-full p-2 text-surface-600 rounded-lg hover:bg-surface-100 group transition-colors duration-200">
                    <i [class]="child.icon" class="w-4 h-4 text-surface-400 group-hover:text-surface-600"></i>
                    <span class="ml-3 text-sm">{{ child.label }}</span>
                    <span 
                      *ngIf="child.badge"
                      [class]="child.badgeClass || 'bg-primary-100 text-primary-800'"
                      class="inline-flex items-center justify-center px-2 ml-auto text-xs font-medium rounded-full">
                      {{ child.badge }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <!-- Seção inferior -->
        <div class="pt-4 mt-4 border-t border-surface-200">
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-surface-700 rounded-lg hover:bg-surface-100 group transition-colors duration-200">
                <i class="pi pi-question-circle w-5 h-5 text-surface-500 group-hover:text-surface-700"></i>
                <span class="ml-3 font-medium">Ajuda</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-surface-700 rounded-lg hover:bg-surface-100 group transition-colors duration-200">
                <i class="pi pi-cog w-5 h-5 text-surface-500 group-hover:text-surface-700"></i>
                <span class="ml-3 font-medium">Configurações</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  `,
  styleUrls: []
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/dashboard'
    },
    {
      label: 'Eventos',
      icon: 'pi pi-calendar',
      children: [
        {
          label: 'Todos os Eventos',
          icon: 'pi pi-list',
          route: '/eventos'
        },
        {
          label: 'Criar Evento',
          icon: 'pi pi-plus',
          route: '/eventos/novo'
        },
        {
          label: 'Eventos Ativos',
          icon: 'pi pi-check-circle',
          route: '/eventos',
          badge: '12'
        }
      ]
    },
    {
      label: 'Participantes',
      icon: 'pi pi-users',
      route: '/participantes',
      badge: '1.2k',
      badgeClass: 'bg-green-100 text-green-800'
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      children: [
        {
          label: 'Relatório Geral',
          icon: 'pi pi-chart-line',
          route: '/relatorios'
        },
        {
          label: 'Participação',
          icon: 'pi pi-users',
          route: '/relatorios/participacao'
        },
        {
          label: 'Financeiro',
          icon: 'pi pi-dollar',
          route: '/relatorios/financeiro'
        }
      ]
    },
    {
      label: 'Comunicação',
      icon: 'pi pi-send',
      children: [
        {
          label: 'E-mails',
          icon: 'pi pi-envelope',
          route: '/comunicacao/emails'
        },
        {
          label: 'Notificações',
          icon: 'pi pi-bell',
          route: '/comunicacao/notificacoes',
          badge: '5',
          badgeClass: 'bg-red-100 text-red-800'
        },
        {
          label: 'SMS',
          icon: 'pi pi-mobile',
          route: '/comunicacao/sms'
        }
      ]
    },
    {
      label: 'Configurações',
      icon: 'pi pi-cog',
      route: '/configuracoes'
    }
  ];

  toggleSubmenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  onItemClick(item: MenuItem) {
    if (window.innerWidth < 1024) {
      this.closeSidebar.emit();
    }
  }
}

