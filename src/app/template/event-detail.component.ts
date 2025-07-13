import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    TagModule,
    TabViewModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center space-x-2 mb-2">
            <p-button 
              icon="pi pi-arrow-left" 
              class="p-button-text p-button-sm"
              routerLink="/eventos">
            </p-button>
            <h1 class="text-2xl font-bold text-surface-900">Detalhes do Evento</h1>
          </div>
          <p class="text-surface-600">Conferência de Tecnologia 2024</p>
        </div>
        <div class="mt-4 sm:mt-0 flex space-x-2">
          <p-button 
            label="Editar" 
            icon="pi pi-pencil" 
            class="p-button-outlined">
          </p-button>
          <p-button 
            label="Duplicar" 
            icon="pi pi-copy" 
            class="p-button-outlined">
          </p-button>
        </div>
      </div>

      <!-- Informações principais -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <p-card header="Informações do Evento">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Nome do Evento</label>
                  <p class="text-surface-900">Conferência de Tecnologia 2024</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Status</label>
                  <p-tag value="Confirmado" severity="success"></p-tag>
                </div>
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Data e Hora</label>
                  <p class="text-surface-900">15 de Janeiro de 2024, 09:00 - 18:00</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Local</label>
                  <p class="text-surface-900">Centro de Convenções</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Participantes</label>
                  <p class="text-surface-900">250 inscritos / 300 vagas</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-surface-700 mb-1">Categoria</label>
                  <p class="text-surface-900">Tecnologia</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-surface-700 mb-1">Descrição</label>
                <p class="text-surface-900">
                  Uma conferência abrangente sobre as últimas tendências em tecnologia, 
                  incluindo inteligência artificial, desenvolvimento web, e inovações em software.
                </p>
              </div>
            </div>
          </p-card>
        </div>

        <div>
          <p-card header="Estatísticas">
            <div class="space-y-4">
              <div class="text-center p-4 bg-primary-50 rounded-lg">
                <div class="text-2xl font-bold text-primary-600">250</div>
                <div class="text-sm text-surface-600">Participantes Inscritos</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-2xl font-bold text-green-600">83%</div>
                <div class="text-sm text-surface-600">Taxa de Ocupação</div>
              </div>
              <div class="text-center p-4 bg-orange-50 rounded-lg">
                <div class="text-2xl font-bold text-orange-600">15</div>
                <div class="text-sm text-surface-600">Dias Restantes</div>
              </div>
            </div>
          </p-card>
        </div>
      </div>

      <!-- Tabs com informações detalhadas -->
      <p-tabView>
        <p-tabPanel header="Agenda" leftIcon="pi pi-calendar">
          <div class="space-y-4">
            <div *ngFor="let item of agenda" 
                 class="flex items-start space-x-4 p-4 bg-surface-50 rounded-lg">
              <div class="text-center min-w-[60px]">
                <div class="text-sm font-medium text-surface-900">{{ item.time }}</div>
              </div>
              <div class="flex-1">
                <h4 class="font-medium text-surface-900">{{ item.title }}</h4>
                <p class="text-sm text-surface-600 mt-1">{{ item.speaker }}</p>
                <p class="text-sm text-surface-500 mt-1">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Participantes" leftIcon="pi pi-users">
          <div class="space-y-4">
            <div *ngFor="let participant of participants" 
                 class="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-600 font-medium">{{ participant.name.charAt(0) }}</span>
                </div>
                <div>
                  <div class="font-medium text-surface-900">{{ participant.name }}</div>
                  <div class="text-sm text-surface-600">{{ participant.email }}</div>
                </div>
              </div>
              <p-tag [value]="participant.status" [severity]="getParticipantSeverity(participant.status)"></p-tag>
            </div>
          </div>
        </p-tabPanel>

        <p-tabPanel header="Configurações" leftIcon="pi pi-cog">
          <div class="space-y-4">
            <p class="text-surface-600">Configurações específicas do evento...</p>
          </div>
        </p-tabPanel>
      </p-tabView>
    </div>
  `,
  styleUrls: []
})
export class EventDetailComponent {
  agenda = [
    {
      time: '09:00',
      title: 'Abertura e Boas-vindas',
      speaker: 'João Silva - CEO',
      description: 'Apresentação da conferência e agenda do dia'
    },
    {
      time: '09:30',
      title: 'Keynote: O Futuro da IA',
      speaker: 'Maria Santos - CTO TechCorp',
      description: 'Tendências e inovações em inteligência artificial'
    },
    {
      time: '10:30',
      title: 'Coffee Break',
      speaker: '',
      description: 'Networking e pausa para café'
    },
    {
      time: '11:00',
      title: 'Workshop: Desenvolvimento Web Moderno',
      speaker: 'Pedro Costa - Lead Developer',
      description: 'Hands-on com as últimas tecnologias web'
    }
  ];

  participants = [
    {
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      status: 'Confirmado'
    },
    {
      name: 'Carlos Santos',
      email: 'carlos.santos@email.com',
      status: 'Pendente'
    },
    {
      name: 'Mariana Costa',
      email: 'mariana.costa@email.com',
      status: 'Confirmado'
    }
  ];

  getParticipantSeverity(status: string): string {
    switch (status) {
      case 'Confirmado':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}

