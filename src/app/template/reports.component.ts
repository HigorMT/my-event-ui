import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule],
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-surface-900">Relatórios</h1>
        <p class="text-surface-600 mt-1">Análises e estatísticas dos eventos</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <p-card header="Eventos por Mês">
          <p-chart type="bar" [data]="chartData" class="h-64"></p-chart>
        </p-card>
        
        <p-card header="Participação por Categoria">
          <p-chart type="doughnut" [data]="pieData" class="h-64"></p-chart>
        </p-card>
      </div>
    </div>
  `
})
export class ReportsComponent {
  chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Eventos',
      data: [12, 19, 15, 25, 22, 30],
      backgroundColor: '#3b82f6'
    }]
  };

  pieData = {
    labels: ['Tecnologia', 'Marketing', 'Design'],
    datasets: [{
      data: [45, 30, 25],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
    }]
  };
}

