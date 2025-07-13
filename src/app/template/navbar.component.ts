import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ThemeService } from './theme.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, ButtonModule, MenuModule, AvatarModule, BadgeModule, OverlayPanelModule],
    template: `
        <nav class="fixed top-0 left-0 right-0 z-50 bg-surface-0 border-b border-surface-200 shadow-custom">
            <div class="flex items-center justify-between h-16 px-4">
                <!-- Lado esquerdo: Menu toggle e logo -->
                <div class="flex items-center space-x-4">
                    <button type="button" (click)="onToggleSidebar()" class="p-2 rounded-lg text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-colors duration-200">
                        <i class="pi pi-bars text-xl"></i>
                    </button>

                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                            <i class="pi pi-calendar text-white text-sm"></i>
                        </div>
                        <span class="text-xl font-semibold text-surface-900 hidden sm:block"> Sistema de Eventos </span>
                    </div>
                </div>

                <!-- Lado direito: Notificações e perfil -->
                <div class="flex items-center space-x-3">
                    <!-- Toggle de tema -->
                    <button type="button" (click)="onToggleTheme()" class="p-2 rounded-lg text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-colors duration-200">
                        <i [class]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'" class="text-lg"></i>
                    </button>

                    <!-- Notificações -->
                    <button type="button" class="relative p-2 rounded-lg text-surface-600 hover:bg-surface-100 hover:text-surface-900 transition-colors duration-200">
                        <i class="pi pi-bell text-lg"></i>
                        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"> 3 </span>
                    </button>

                    <!-- Perfil do usuário -->
                    <div class="relative">
                        <button type="button" (click)="profilePanel.toggle($event)" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface-100 transition-colors duration-200">
                            <p-avatar image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" shape="circle" size="normal"> </p-avatar>
                            <div class="hidden md:block text-left">
                                <div class="text-sm font-medium text-surface-900">João Silva</div>
                                <div class="text-xs text-surface-500">Administrador</div>
                            </div>
                            <i class="pi pi-chevron-down text-xs text-surface-500"></i>
                        </button>

                        <!-- Menu do perfil -->
                        <p-overlayPanel #profilePanel>
                            <div class="w-64 p-2">
                                <!-- Informações do usuário -->
                                <div class="flex items-center space-x-3 p-3 border-b border-surface-200">
                                    <p-avatar image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" shape="circle" size="large"> </p-avatar>
                                    <div>
                                        <div class="font-medium text-surface-900">João Silva</div>
                                        <div class="text-sm text-surface-500">joao.silva&#64;empresa.com</div>
                                        <div class="text-xs text-surface-400">Administrador</div>
                                    </div>
                                </div>

                                <!-- Menu items -->
                                <div class="py-2">
                                    <button type="button" class="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface-100 rounded-lg transition-colors duration-200">
                                        <i class="pi pi-user text-surface-500"></i>
                                        <span class="text-surface-700">Meu Perfil</span>
                                    </button>

                                    <button type="button" class="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface-100 rounded-lg transition-colors duration-200">
                                        <i class="pi pi-cog text-surface-500"></i>
                                        <span class="text-surface-700">Configurações</span>
                                    </button>

                                    <button type="button" class="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface-100 rounded-lg transition-colors duration-200">
                                        <i class="pi pi-question-circle text-surface-500"></i>
                                        <span class="text-surface-700">Ajuda</span>
                                    </button>

                                    <hr class="my-2 border-surface-200" />

                                    <button type="button" class="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600">
                                        <i class="pi pi-sign-out"></i>
                                        <span>Sair</span>
                                    </button>
                                </div>
                            </div>
                        </p-overlayPanel>
                    </div>
                </div>
            </div>
        </nav>
    `,
    styleUrls: []
})
export class NavbarComponent {
    @Output() toggleSidebar = new EventEmitter<void>();
    @Output() toggleTheme = new EventEmitter<void>();

    themeService = inject(ThemeService);

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    onToggleTheme() {
        this.toggleTheme.emit();
    }
}

