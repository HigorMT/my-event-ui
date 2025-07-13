import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = signal(false);

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.darkMode.set(savedTheme === 'dark');
    } else {
      // Verificar preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkMode.set(prefersDark);
    }
    
    this.applyTheme();
  }

  isDarkMode() {
    return this.darkMode();
  }

  toggleTheme() {
    this.darkMode.update(current => !current);
    this.applyTheme();
    this.saveThemePreference();
  }

  setTheme(isDark: boolean) {
    this.darkMode.set(isDark);
    this.applyTheme();
    this.saveThemePreference();
  }

  private applyTheme() {
    const htmlElement = document.documentElement;
    
    if (this.darkMode()) {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.classList.add('dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.classList.remove('dark');
    }
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.darkMode() ? 'dark' : 'light');
  }
}

