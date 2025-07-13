import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    FormsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center space-x-2">
        <p-button 
          icon="pi pi-arrow-left" 
          class="p-button-text p-button-sm"
          routerLink="/eventos">
        </p-button>
        <h1 class="text-2xl font-bold text-surface-900">Novo Evento</h1>
      </div>

      <!-- Formulário -->
      <p-card>
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Nome do Evento *</label>
              <input 
                type="text" 
                pInputText 
                placeholder="Digite o nome do evento"
                class="w-full">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Categoria *</label>
              <p-dropdown 
                [options]="categories" 
                placeholder="Selecione uma categoria"
                optionLabel="label"
                optionValue="value"
                class="w-full">
              </p-dropdown>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Data de Início *</label>
              <p-calendar 
                placeholder="Selecionar data"
                [showTime]="true"
                class="w-full">
              </p-calendar>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Data de Fim *</label>
              <p-calendar 
                placeholder="Selecionar data"
                [showTime]="true"
                class="w-full">
              </p-calendar>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Local *</label>
              <input 
                type="text" 
                pInputText 
                placeholder="Local do evento"
                class="w-full">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-surface-700 mb-2">Máximo de Participantes</label>
              <input 
                type="number" 
                pInputText 
                placeholder="Ex: 100"
                class="w-full">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-surface-700 mb-2">Descrição</label>
            <textarea 
              rows="4" 
              placeholder="Descreva o evento..."
              class="w-full p-3 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            </textarea>
          </div>
          
          <div class="flex justify-end space-x-2">
            <p-button 
              label="Cancelar" 
              class="p-button-outlined"
              routerLink="/eventos">
            </p-button>
            <p-button 
              label="Salvar" 
              icon="pi pi-save">
            </p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styleUrls: []
})
export class EventFormComponent {
  categories = [
    { label: 'Tecnologia', value: 'tecnologia' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Vendas', value: 'vendas' },
    { label: 'Design', value: 'design' },
    { label: 'Inovação', value: 'inovacao' }
  ];
}

