import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ChartModule,
    TableModule,
    TagModule,
    ProgressBarModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-surface-900">Dashboard</h1>
          <p class="text-surface-600 mt-1">Visão geral do sistema de eventos</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <p-button 
            label="Criar Evento" 
            icon="pi pi-plus" 
            class="p-button-primary">
          </p-button>
        </div>
      </div>

      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let stat of stats" 
             class="bg-surface-0 rounded-lg border border-surface-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-surface-600 text-sm font-medium">{{ stat.label }}</p>
              <p class="text-2xl font-bold text-surface-900 mt-1">{{ stat.value }}</p>
              <div class="flex items-center mt-2">
                <span [class]="stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'" 
                      class="text-sm font-medium">
                  <i [class]="stat.changeType === 'increase' ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" 
                     class="text-xs mr-1"></i>
                  {{ stat.change }}
                </span>
                <span class="text-surface-500 text-sm ml-2">vs mês anterior</span>
              </div>
            </div>
            <div [class]="stat.iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center">
              <i [class]="stat.icon" class="text-xl text-white"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos e tabelas -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Gráfico de eventos por mês -->
        <p-card header="Eventos por Mês" class="h-fit">
          <p-chart type="line" [data]="chartData" [options]="chartOptions" class="h-64"></p-chart>
        </p-card>

        <!-- Próximos eventos -->
        <p-card header="Próximos Eventos" class="h-fit">
          <div class="space-y-4">
            <div *ngFor="let event of upcomingEvents" 
                 class="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors duration-200">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <i class="pi pi-calendar text-primary-600"></i>
                </div>
                <div>
                  <h4 class="font-medium text-surface-900">{{ event.name }}</h4>
                  <p class="text-sm text-surface-600">{{ event.date }} • {{ event.participants }} participantes</p>
                </div>
              </div>
              <p-tag [value]="event.status" [severity]="getEventSeverity(event.status)"></p-tag>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Tabela de eventos recentes -->
      <p-card header="Eventos Recentes">
        <p-table [value]="recentEvents" [paginator]="true" [rows]="5" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th>Nome do Evento</th>
              <th>Data</th>
              <th>Participantes</th>
              <th>Status</th>
              <th>Progresso</th>
              <th>Ações</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-event>
            <tr>
              <td>
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <i class="pi pi-calendar text-primary-600 text-sm"></i>
                  </div>
                  <span class="font-medium">{{ event.name }}</span>
                </div>
              </td>
              <td>{{ event.date }}</td>
              <td>{{ event.participants }}</td>
              <td>
                <p-tag [value]="event.status" [severity]="getEventSeverity(event.status)"></p-tag>
              </td>
              <td>
                <div class="flex items-center space-x-2">
                  <p-progressBar [value]="event.progress" class="w-20"></p-progressBar>
                  <span class="text-sm text-surface-600">{{ event.progress }}%</span>
                </div>
              </td>
              <td>
                <div class="flex space-x-2">
                  <p-button 
                    icon="pi pi-eye" 
                    class="p-button-text p-button-sm"
                    pTooltip="Visualizar">
                  </p-button>
                  <p-button 
                    icon="pi pi-pencil" 
                    class="p-button-text p-button-sm"
                    pTooltip="Editar">
                  </p-button>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styleUrls: []
})
export class DashboardComponent {
  stats = [
    {
      label: 'Total de Eventos',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: 'pi pi-calendar',
      iconBg: 'bg-blue-500'
    },
    {
      label: 'Participantes',
      value: '1,234',
      change: '+8%',
      changeType: 'increase',
      icon: 'pi pi-users',
      iconBg: 'bg-green-500'
    },
    {
      label: 'Eventos Ativos',
      value: '12',
      change: '+5%',
      changeType: 'increase',
      icon: 'pi pi-check-circle',
      iconBg: 'bg-purple-500'
    },
    {
      label: 'Taxa de Participação',
      value: '87%',
      change: '-2%',
      changeType: 'decrease',
      icon: 'pi pi-chart-line',
      iconBg: 'bg-orange-500'
    }
  ];

  upcomingEvents = [
    {
      name: 'Conferência de Tecnologia 2024',
      date: '15 Jan 2024',
      participants: 250,
      status: 'Confirmado'
    },
    {
      name: 'Workshop de Design',
      date: '22 Jan 2024',
      participants: 45,
      status: 'Planejamento'
    },
    {
      name: 'Meetup de Desenvolvedores',
      date: '28 Jan 2024',
      participants: 120,
      status: 'Confirmado'
    }
  ];

  recentEvents = [
    {
      name: 'Seminário de Marketing Digital',
      date: '10 Jan 2024',
      participants: 180,
      status: 'Concluído',
      progress: 100
    },
    {
      name: 'Treinamento de Vendas',
      date: '08 Jan 2024',
      participants: 65,
      status: 'Concluído',
      progress: 100
    },
    {
      name: 'Palestra sobre Inovação',
      date: '05 Jan 2024',
      participants: 320,
      status: 'Concluído',
      progress: 100
    },
    {
      name: 'Workshop de Liderança',
      date: '03 Jan 2024',
      participants: 85,
      status: 'Em Andamento',
      progress: 75
    },
    {
      name: 'Conferência Anual',
      date: '01 Jan 2024',
      participants: 500,
      status: 'Planejamento',
      progress: 45
    }
  ];

  chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Eventos Realizados',
        data: [12, 19, 15, 25, 22, 30],
        fill: false,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        grid: {
          color: '#e2e8f0'
        }
      }
    }
  };

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
      default:
        return 'secondary';
    }
  }
}

