import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { AnimatedBackgroundComponent } from './animated-background.component';
import { ThemeService } from '../theme.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    AnimatedBackgroundComponent
  ],
  template: `
    <app-animated-background></app-animated-background>

    <div class="login-container">
      <!-- Toggle de tema -->
      <button
        type="button"
        (click)="toggleTheme()"
        class="theme-toggle">
        <i [class]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'"></i>
      </button>

      <div class="login-card">
        <!-- Logo e título -->
        <div class="login-header">
          <div class="logo">
            <div class="logo-icon">
              <i class="pi pi-calendar"></i>
            </div>
            <h1>Sistema de Eventos</h1>
          </div>
          <p class="subtitle">Faça login para acessar sua conta</p>
        </div>

        <!-- Formulário -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Nome de usuário</label>
            <div class="input-wrapper">
              <i class="pi pi-user input-icon"></i>
              <input
                id="username"
                type="text"
                pInputText
                formControlName="username"
                placeholder="Digite seu nome de usuário"
                class="form-input"
                [class.error]="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
            </div>
            <div *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              Nome de usuário é obrigatório
            </div>
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <div class="input-wrapper">
              <i class="pi pi-lock input-icon"></i>
              <p-password
                id="password"
                formControlName="password"
                placeholder="Digite sua senha"
                [toggleMask]="true"
                [feedback]="false"
                styleClass="form-input-password"
                [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              </p-password>
            </div>
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              Senha é obrigatória
            </div>
          </div>

          <div class="form-options">
            <div class="checkbox-wrapper">
              <p-checkbox
                formControlName="rememberMe"
                binary="true"
                inputId="rememberMe">
              </p-checkbox>
              <label for="rememberMe">Lembrar de mim</label>
            </div>
            <a href="#" class="forgot-password">Esqueceu a senha?</a>
          </div>

          <p-button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            [loading]="isLoading"
            [disabled]="loginForm.invalid"
            class="login-button">
          </p-button>
        </form>

        <!-- Divisor -->
        <div class="divider">
          <span>ou</span>
        </div>

        <!-- Login social -->
        <div class="social-login">
          <p-button
            label="Continuar com Google"
            icon="pi pi-google"
            class="social-button google"
            (click)="loginWithGoogle()">
          </p-button>
          <p-button
            label="Continuar com Microsoft"
            icon="pi pi-microsoft"
            class="social-button microsoft"
            (click)="loginWithMicrosoft()">
          </p-button>
        </div>

        <!-- Link para cadastro -->
        <div class="signup-link">
          <span>Não tem uma conta? </span>
          <a routerLink="/cadastro" class="signup-button">Criar conta</a>
        </div>
      </div>

      <!-- Informações adicionais -->
      <div class="login-footer">
        <p>&copy; 2024 Sistema de Eventos. Todos os direitos reservados.</p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      position: relative;
    }

    .theme-toggle {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 1.5rem;
      padding: 3rem;
      width: 100%;
      max-width: 450px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.6s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;
    }

    .logo-icon {
      width: 4rem;
      height: 4rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      animation: pulse 2s infinite;
    }

    .logo-icon i {
      font-size: 2rem;
      color: white;
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .logo h1 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: 700;
      color: #2d3748;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      color: #718096;
      margin: 0;
      font-size: 1rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      font-weight: 600;
      color: #2d3748;
      font-size: 0.9rem;
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #a0aec0;
      z-index: 2;
    }

    .form-input {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-input.error {
      border-color: #e53e3e;
    }

    :host ::ng-deep .form-input-password .p-password {
      width: 100%;
    }

    :host ::ng-deep .form-input-password .p-inputtext {
      width: 100%;
      padding: 0.875rem 3rem 0.875rem 3rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .form-input-password .p-inputtext:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
    }

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .checkbox-wrapper label {
      font-size: 0.9rem;
      color: #4a5568;
      cursor: pointer;
    }

    .forgot-password {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .forgot-password:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    :host ::ng-deep .login-button .p-button {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .login-button .p-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .divider {
      position: relative;
      text-align: center;
      margin: 2rem 0;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e2e8f0;
    }

    .divider span {
      background: white;
      padding: 0 1rem;
      color: #718096;
      font-size: 0.9rem;
    }

    .social-login {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    :host ::ng-deep .social-button .p-button {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      background: white;
      color: #4a5568;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .social-button .p-button:hover {
      border-color: #cbd5e0;
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    :host ::ng-deep .google .p-button:hover {
      border-color: #ea4335;
      color: #ea4335;
    }

    :host ::ng-deep .microsoft .p-button:hover {
      border-color: #0078d4;
      color: #0078d4;
    }

    .signup-link {
      text-align: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e2e8f0;
    }

    .signup-link span {
      color: #718096;
    }

    .signup-button {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .signup-button:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    .login-footer {
      margin-top: 2rem;
      text-align: center;
    }

    .login-footer p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      margin: 0;
    }

    /* Tema escuro */
    :host-context([data-theme="dark"]) .login-card {
      background: rgba(30, 41, 59, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    :host-context([data-theme="dark"]) .logo h1 {
      color: #e2e8f0;
    }

    :host-context([data-theme="dark"]) .subtitle {
      color: #a0aec0;
    }

    :host-context([data-theme="dark"]) .form-group label {
      color: #e2e8f0;
    }

    :host-context([data-theme="dark"]) .form-input {
      background: rgba(51, 65, 85, 0.8);
      border-color: #475569;
      color: #e2e8f0;
    }

    :host-context([data-theme="dark"]) .form-input::placeholder {
      color: #94a3b8;
    }

    :host-context([data-theme="dark"]) .divider span {
      background: rgba(30, 41, 59, 0.95);
      color: #a0aec0;
    }

    :host-context([data-theme="dark"]) .divider::before {
      background: #475569;
    }

    :host-context([data-theme="dark"]) .checkbox-wrapper label {
      color: #cbd5e1;
    }

    :host-context([data-theme="dark"]) .signup-link span {
      color: #a0aec0;
    }

    /* Responsividade */
    @media (max-width: 640px) {
      .login-container {
        padding: 1rem;
      }

      .login-card {
        padding: 2rem;
      }

      .theme-toggle {
        top: 1rem;
        right: 1rem;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  themeService = inject(ThemeService);

  loginForm: FormGroup;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simular login
      setTimeout(() => {
        this.isLoading = false;
        console.log('Login realizado:', this.loginForm.value);
        // Aqui você redirecionaria para o dashboard
      }, 2000);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }

  loginWithGoogle() {
    console.log('Login com Google');
  }

  loginWithMicrosoft() {
    console.log('Login com Microsoft');
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

