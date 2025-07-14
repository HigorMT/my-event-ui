import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { AnimatedBackgroundComponent } from './animated-background.component';
import { ThemeService } from '../theme.service';


// Validador customizado para confirmação de senha
function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

// Validador customizado para CPF
function cpfValidator(control: AbstractControl) {
  const cpf = control.value;
  if (!cpf) return null;

  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) {
    return { invalidCpf: true };
  }

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCpf)) {
    return { invalidCpf: true };
  }

  // Validação do algoritmo do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(9))) {
    return { invalidCpf: true };
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.charAt(10))) {
    return { invalidCpf: true };
  }

  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
    InputMaskModule,
    CheckboxModule,
    AnimatedBackgroundComponent
  ],
  template: `
    <app-animated-background></app-animated-background>

    <div class="register-container">
      <!-- Toggle de tema -->
      <button
        type="button"
        (click)="toggleTheme()"
        class="theme-toggle">
        <i [class]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'"></i>
      </button>

      <div class="register-card">
        <!-- Logo e título -->
        <div class="register-header">
          <div class="logo">
            <div class="logo-icon">
              <i class="pi pi-user-plus"></i>
            </div>
            <h1>Criar Conta</h1>
          </div>
          <p class="subtitle">Junte-se ao Sistema de Eventos</p>
        </div>

        <!-- Formulário -->
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <!-- Nome -->
          <div class="form-group">
            <label for="name">Nome completo</label>
            <div class="input-wrapper">
              <i class="pi pi-user input-icon"></i>
              <input
                id="name"
                type="text"
                pInputText
                formControlName="name"
                placeholder="Digite seu nome completo"
                class="form-input"
                [class.error]="registerForm.get('name')?.invalid && registerForm.get('name')?.touched">
            </div>
            <div *ngIf="registerForm.get('name')?.invalid && registerForm.get('name')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              <span *ngIf="registerForm.get('name')?.errors?.['required']">Nome é obrigatório</span>
              <span *ngIf="registerForm.get('name')?.errors?.['minlength']">Nome deve ter pelo menos 2 caracteres</span>
            </div>
          </div>

          <!-- E-mail -->
          <div class="form-group">
            <label for="email">E-mail</label>
            <div class="input-wrapper">
              <i class="pi pi-envelope input-icon"></i>
              <input
                id="email"
                type="email"
                pInputText
                formControlName="email"
                placeholder="Digite seu e-mail"
                class="form-input"
                [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
            </div>
            <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              <span *ngIf="registerForm.get('email')?.errors?.['required']">E-mail é obrigatório</span>
              <span *ngIf="registerForm.get('email')?.errors?.['email']">E-mail inválido</span>
            </div>
          </div>

          <!-- CPF -->
          <div class="form-group">
            <label for="cpf">CPF</label>
            <div class="input-wrapper">
              <i class="pi pi-id-card input-icon"></i>
              <p-inputMask
                id="cpf"
                mask="999.999.999-99"
                formControlName="cpf"
                placeholder="000.000.000-00"
                styleClass="form-input"
                [class.error]="registerForm.get('cpf')?.invalid && registerForm.get('cpf')?.touched">
              </p-inputMask>
            </div>
            <div *ngIf="registerForm.get('cpf')?.invalid && registerForm.get('cpf')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              <span *ngIf="registerForm.get('cpf')?.errors?.['required']">CPF é obrigatório</span>
              <span *ngIf="registerForm.get('cpf')?.errors?.['invalidCpf']">CPF inválido</span>
            </div>
          </div>

          <!-- Data de nascimento -->
          <div class="form-group">
            <label for="birthDate">Data de nascimento</label>
            <div class="input-wrapper">
              <i class="pi pi-calendar input-icon"></i>
              <p-calendar
                id="birthDate"
                formControlName="birthDate"
                placeholder="Selecione sua data de nascimento"
                [maxDate]="maxDate"
                [yearRange]="yearRange"
                dateFormat="dd/mm/yy"
                styleClass="form-input-calendar"
                [class.error]="registerForm.get('birthDate')?.invalid && registerForm.get('birthDate')?.touched">
              </p-calendar>
            </div>
            <div *ngIf="registerForm.get('birthDate')?.invalid && registerForm.get('birthDate')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              Data de nascimento é obrigatória
            </div>
          </div>

          <!-- Senha -->
          <div class="form-group">
            <label for="password">Senha</label>
            <div class="input-wrapper">
              <i class="pi pi-lock input-icon"></i>
              <p-password
                id="password"
                formControlName="password"
                placeholder="Digite sua senha"
                [toggleMask]="true"
                [feedback]="true"
                promptLabel="Digite uma senha"
                weakLabel="Fraca"
                mediumLabel="Média"
                strongLabel="Forte"
                styleClass="form-input-password"
                [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              </p-password>
            </div>
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              <span *ngIf="registerForm.get('password')?.errors?.['required']">Senha é obrigatória</span>
              <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Senha deve ter pelo menos 6 caracteres</span>
            </div>
          </div>

          <!-- Confirmação de senha -->
          <div class="form-group">
            <label for="confirmPassword">Confirmar senha</label>
            <div class="input-wrapper">
              <i class="pi pi-lock input-icon"></i>
              <p-password
                id="confirmPassword"
                formControlName="confirmPassword"
                placeholder="Confirme sua senha"
                [toggleMask]="true"
                [feedback]="false"
                styleClass="form-input-password"
                [class.error]="(registerForm.get('confirmPassword')?.invalid || registerForm.errors?.['passwordMismatch']) && registerForm.get('confirmPassword')?.touched">
              </p-password>
            </div>
            <div *ngIf="(registerForm.get('confirmPassword')?.invalid || registerForm.errors?.['passwordMismatch']) && registerForm.get('confirmPassword')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              <span *ngIf="registerForm.get('confirmPassword')?.errors?.['required']">Confirmação de senha é obrigatória</span>
              <span *ngIf="registerForm.errors?.['passwordMismatch']">As senhas não coincidem</span>
            </div>
          </div>

          <!-- Termos e condições -->
          <div class="form-group">
            <div class="checkbox-wrapper">
              <p-checkbox
                formControlName="acceptTerms"
                binary="true"
                inputId="acceptTerms">
              </p-checkbox>
              <label for="acceptTerms">
                Eu aceito os <a href="#" class="link">Termos de Uso</a> e a <a href="#" class="link">Política de Privacidade</a>
              </label>
            </div>
            <div *ngIf="registerForm.get('acceptTerms')?.invalid && registerForm.get('acceptTerms')?.touched"
                 class="error-message">
              <i class="pi pi-exclamation-triangle"></i>
              Você deve aceitar os termos e condições
            </div>
          </div>

          <!-- Newsletter -->
          <div class="form-group">
            <div class="checkbox-wrapper">
              <p-checkbox
                formControlName="newsletter"
                binary="true"
                inputId="newsletter">
              </p-checkbox>
              <label for="newsletter">
                Quero receber novidades e promoções por e-mail
              </label>
            </div>
          </div>

          <p-button
            type="submit"
            label="Criar Conta"
            icon="pi pi-user-plus"
            [loading]="isLoading"
            [disabled]="registerForm.invalid"
            class="register-button">
          </p-button>
        </form>

        <!-- Link para login -->
        <div class="login-link">
          <span>Já tem uma conta? </span>
          <a routerLink="/login" class="login-button">Fazer login</a>
        </div>
      </div>

      <!-- Informações adicionais -->
      <div class="register-footer">
        <p>&copy; 2024 Sistema de Eventos. Todos os direitos reservados.</p>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
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

    .register-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 1.5rem;
      padding: 3rem;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.6s ease-out;
      max-height: 90vh;
      overflow-y: auto;
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

    .register-header {
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

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
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

    :host ::ng-deep .form-input-calendar .p-calendar {
      width: 100%;
    }

    :host ::ng-deep .form-input-calendar .p-inputtext {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .form-input-calendar .p-inputtext:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    :host ::ng-deep .p-inputmask {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
    }

    :host ::ng-deep .p-inputmask:focus {
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

    .checkbox-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .checkbox-wrapper label {
      font-size: 0.9rem;
      color: #4a5568;
      cursor: pointer;
      line-height: 1.4;
    }

    .link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .link:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    :host ::ng-deep .register-button .p-button {
      width: 100%;
      padding: 0.875rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }

    :host ::ng-deep .register-button .p-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }

    .login-link {
      text-align: center;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e2e8f0;
    }

    .login-link span {
      color: #718096;
    }

    .login-button {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    .login-button:hover {
      color: #5a67d8;
      text-decoration: underline;
    }

    .register-footer {
      margin-top: 2rem;
      text-align: center;
    }

    .register-footer p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      margin: 0;
    }

    /* Tema escuro */
    :host-context([data-theme="dark"]) .register-card {
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

    :host-context([data-theme="dark"]) .checkbox-wrapper label {
      color: #cbd5e1;
    }

    :host-context([data-theme="dark"]) .login-link span {
      color: #a0aec0;
    }

    :host-context([data-theme="dark"]) .login-link {
      border-top-color: #475569;
    }

    /* Responsividade */
    @media (max-width: 640px) {
      .register-container {
        padding: 1rem;
      }

      .register-card {
        padding: 2rem;
        max-height: 95vh;
      }

      .theme-toggle {
        top: 1rem;
        right: 1rem;
      }
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  themeService = inject(ThemeService);

  registerForm: FormGroup;
  isLoading = false;
  maxDate = new Date();
  yearRange = `1940:${new Date().getFullYear()}`;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator]],
      birthDate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
      newsletter: [false]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      // Simular cadastro
      setTimeout(() => {
        this.isLoading = false;
        console.log('Cadastro realizado:', this.registerForm.value);
        // Aqui você redirecionaria para o login ou dashboard
      }, 2000);
    } else {
      // Marcar todos os campos como touched para mostrar erros
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

