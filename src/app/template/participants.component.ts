import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TableModule, TagModule],
  template: `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-surface-900">Participantes</h1>
          <p class="text-surface-600 mt-1">Gerencie os participantes dos eventos</p>
        </div>
        <p-button label="Adicionar Participante" icon="pi pi-plus"></p-button>
      </div>
      
      <p-card>
        <p-table [value]="participants" [paginator]="true" [rows]="10">
          <ng-template pTemplate="header">
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Evento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-participant>
            <tr>
              <td>{{ participant.name }}</td>
              <td>{{ participant.email }}</td>
              <td>{{ participant.event }}</td>
              <td><p-tag [value]="participant.status" [severity]="getStatusSeverity(participant.status)"></p-tag></td>
              <td>
                <p-button icon="pi pi-pencil" class="p-button-text p-button-sm"></p-button>
                <p-button icon="pi pi-trash" class="p-button-text p-button-danger p-button-sm"></p-button>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `
})
export class ParticipantsComponent {
  participants = [
    { name: 'Ana Silva', email: 'ana@email.com', event: 'Conferência Tech', status: 'Confirmado' },
    { name: 'João Santos', email: 'joao@email.com', event: 'Workshop Design', status: 'Pendente' }
  ];

  getStatusSeverity(status: string): string {
    return status === 'Confirmado' ? 'success' : 'warning';
  }
}

