import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TableModule,
    TagModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-surface-900">Eventos</h1>
          <p class="text-surface-600 mt-1">Gerencie todos os seus eventos</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <p-button 
            label="Novo Evento" 
            icon="pi pi-plus" 
            routerLink="/eventos/novo"
            class="p-button-primary">
          </p-button>
        </div>
      </div>

      <!-- Filtros -->
      <p-card>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">Buscar</label>
            <span class="p-input-icon-left w-full">
              <i class="pi pi-search"></i>
              <input 
                type="text" 
                pInputText 
                placeholder="Nome do evento..."
                [(ngModel)]="searchTerm"
                class="w-full">
            </span>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">Status</label>
            <p-dropdown 
              [options]="statusOptions" 
              [(ngModel)]="selectedStatus"
              placeholder="Todos os status"
              optionLabel="label"
              optionValue="value"
              class="w-full">
            </p-dropdown>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">Data Início</label>
            <p-calendar 
              [(ngModel)]="startDate"
              placeholder="Selecionar data"
              class="w-full">
            </p-calendar>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">Data Fim</label>
            <p-calendar 
              [(ngModel)]="endDate"
              placeholder="Selecionar data"
              class="w-full">
            </p-calendar>
          </div>
        </div>
        
        <div class="flex justify-end mt-4 space-x-2">
          <p-button 
            label="Limpar" 
            icon="pi pi-times" 
            class="p-button-outlined"
            (click)="clearFilters()">
          </p-button>
          <p-button 
            label="Filtrar" 
            icon="pi pi-filter" 
            (click)="applyFilters()">
          </p-button>
        </div>
      </p-card>

      <!-- Lista de eventos em cards (mobile) -->
      <div class="block md:hidden space-y-4">
        <div *ngFor="let event of filteredEvents" 
             class="bg-surface-0 rounded-lg border border-surface-200 p-4 hover:shadow-lg transition-shadow duration-200">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <i class="pi pi-calendar text-primary-600"></i>
              </div>
              <div>
                <h3 class="font-semibold text-surface-900">{{ event.name }}</h3>
                <p class="text-sm text-surface-600">{{ event.date }}</p>
              </div>
            </div>
            <p-tag [value]="event.status" [severity]="getEventSeverity(event.status)"></p-tag>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span class="text-xs text-surface-500 uppercase tracking-wide">Participantes</span>
              <p class="font-medium text-surface-900">{{ event.participants }}</p>
            </div>
            <div>
              <span class="text-xs text-surface-500 uppercase tracking-wide">Local</span>
              <p class="font-medium text-surface-900">{{ event.location }}</p>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <p-button 
              label="Ver Detalhes" 
              icon="pi pi-eye" 
              class="p-button-outlined p-button-sm flex-1"
              [routerLink]="['/eventos', event.id]">
            </p-button>
            <p-button 
              icon="pi pi-pencil" 
              class="p-button-outlined p-button-sm"
              pTooltip="Editar">
            </p-button>
            <p-button 
              icon="pi pi-trash" 
              class="p-button-outlined p-button-danger p-button-sm"
              pTooltip="Excluir">
            </p-button>
          </div>
        </div>
      </div>

      <!-- Tabela de eventos (desktop) -->
      <div class="hidden md:block">
        <p-card>
          <p-table 
            [value]="filteredEvents" 
            [paginator]="true" 
            [rows]="10" 
            [showCurrentPageReport]="true"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} eventos"
            responsiveLayout="scroll">
            
            <ng-template pTemplate="header">
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Participantes</th>
                <th>Local</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </ng-template>
            
            <ng-template pTemplate="body" let-event>
              <tr>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <i class="pi pi-calendar text-primary-600"></i>
                    </div>
                    <div>
                      <div class="font-medium text-surface-900">{{ event.name }}</div>
                      <div class="text-sm text-surface-600">{{ event.category }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ event.date }}</td>
                <td>
                  <div class="flex items-center space-x-2">
                    <i class="pi pi-users text-surface-500"></i>
                    <span>{{ event.participants }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex items-center space-x-2">
                    <i class="pi pi-map-marker text-surface-500"></i>
                    <span>{{ event.location }}</span>
                  </div>
                </td>
                <td>
                  <p-tag [value]="event.status" [severity]="getEventSeverity(event.status)"></p-tag>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <p-button 
                      icon="pi pi-eye" 
                      class="p-button-text p-button-sm"
                      [routerLink]="['/eventos', event.id]"
                      pTooltip="Visualizar">
                    </p-button>
                    <p-button 
                      icon="pi pi-pencil" 
                      class="p-button-text p-button-sm"
                      pTooltip="Editar">
                    </p-button>
                    <p-button 
                      icon="pi pi-trash" 
                      class="p-button-text p-button-danger p-button-sm"
                      pTooltip="Excluir">
                    </p-button>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </p-card>
      </div>
    </div>
  `,
  styleUrls: []
})
export class EventListComponent {
  searchTerm = '';
  selectedStatus: string | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Planejamento', value: 'Planejamento' },
    { label: 'Confirmado', value: 'Confirmado' },
    { label: 'Em Andamento', value: 'Em Andamento' },
    { label: 'Concluído', value: 'Concluído' },
    { label: 'Cancelado', value: 'Cancelado' }
  ];

  events = [
    {
      id: 1,
      name: 'Conferência de Tecnologia 2024',
      category: 'Tecnologia',
      date: '15 Jan 2024',
      participants: 250,
      location: 'Centro de Convenções',
      status: 'Confirmado'
    },
    {
      id: 2,
      name: 'Workshop de Design UX/UI',
      category: 'Design',
      date: '22 Jan 2024',
      participants: 45,
      location: 'Sala de Treinamento A',
      status: 'Planejamento'
    },
    {
      id: 3,
      name: 'Meetup de Desenvolvedores',
      category: 'Tecnologia',
      date: '28 Jan 2024',
      participants: 120,
      location: 'Auditório Principal',
      status: 'Confirmado'
    },
    {
      id: 4,
      name: 'Seminário de Marketing Digital',
      category: 'Marketing',
      date: '10 Jan 2024',
      participants: 180,
      location: 'Sala de Conferências',
      status: 'Concluído'
    },
    {
      id: 5,
      name: 'Treinamento de Vendas',
      category: 'Vendas',
      date: '08 Jan 2024',
      participants: 65,
      location: 'Sala de Treinamento B',
      status: 'Concluído'
    },
    {
      id: 6,
      name: 'Palestra sobre Inovação',
      category: 'Inovação',
      date: '05 Jan 2024',
      participants: 320,
      location: 'Teatro Principal',
      status: 'Em Andamento'
    }
  ];

  filteredEvents = [...this.events];

  getEventSeverity(status: string): string {
    switch (status) {
      case 'Confirmado':
        return 'success';
      case 'Planejamento':
        return 'warning';
      case 'Em Andamento':
        return 'info';
      case 'Concluído':
        return 'success';
      case 'Cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  applyFilters() {
    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = !this.searchTerm || 
        event.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.selectedStatus || event.status === this.selectedStatus;
      
      // Aqui você pode adicionar lógica para filtros de data
      
      return matchesSearch && matchesStatus;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = null;
    this.startDate = null;
    this.endDate = null;
    this.filteredEvents = [...this.events];
  }
}

