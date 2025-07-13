import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputSwitchModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-surface-900">Configurações</h1>
        <p class="text-surface-600 mt-1">Gerencie as configurações do sistema</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <p-card header="Notificações">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Notificações por email</span>
              <p-inputSwitch [(ngModel)]="emailNotifications"></p-inputSwitch>
            </div>
            <div class="flex items-center justify-between">
              <span>Notificações push</span>
              <p-inputSwitch [(ngModel)]="pushNotifications"></p-inputSwitch>
            </div>
          </div>
        </p-card>
        
        <p-card header="Preferências">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span>Modo escuro</span>
              <p-inputSwitch [(ngModel)]="darkMode"></p-inputSwitch>
            </div>
            <div class="flex items-center justify-between">
              <span>Sidebar expandida</span>
              <p-inputSwitch [(ngModel)]="expandedSidebar"></p-inputSwitch>
            </div>
          </div>
        </p-card>
      </div>
    </div>
  `
})
export class SettingsComponent {
  emailNotifications = true;
  pushNotifications = false;
  darkMode = false;
  expandedSidebar = true;
}

