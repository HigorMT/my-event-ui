import { Component } from '@angular/core';
import { AnimatedBackgroundComponent } from '../login/animated-background/animated-background.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';
import { PasswordUtils } from '../../utils/PasswordUtils';

@Component({
    selector: 'app-registro-usuario',
    standalone: true,
    imports: [AnimatedBackgroundComponent, ReactiveFormsModule, InputTextModule, PasswordModule, CalendarModule, InputMaskModule, CheckboxModule, ButtonModule, CommonModule, RouterModule, FormsModule],
    templateUrl: './registro-usuario.component.html',
    styleUrl: './registro-usuario.component.scss'
})
export class RegistroUsuarioComponent {
    //region Variables
    public yearRange: string = `1940:${new Date().getFullYear()}`;
    public isLoading: boolean = false;
    public maxDate: Date = new Date();
    public registerForm: FormGroup;
    //endregion

    public get nameError(): boolean {
        return (this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched) ?? false;
    }

    public get passwordError(): boolean {
        return (this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched) ?? false;
    }

    public get emailError(): boolean {
        return (this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched) ?? false;
    }

    public get birthDateError(): boolean {
        return (this.registerForm.get('birthDate')?.invalid && this.registerForm.get('birthDate')?.touched) ?? false;
    }

    public get confirmPasswordError(): boolean {
        return ((this.registerForm.get('confirmPassword')?.invalid || this.registerForm.errors?.['passwordMismatch']) && this.registerForm.get('confirmPassword')?.touched) ?? false;
    }

    public get acceptTherms(): boolean {
        return (this.registerForm.get('acceptTerms')?.invalid && this.registerForm.get('acceptTerms')?.touched) ?? false;
    }

    //region Constructor
    constructor(
        protected themeService: ThemeService,
        protected fb: FormBuilder
    ) {
        this.registerForm = this.fb.group(
            {
                name: ['', [Validators.required, Validators.minLength(2)]],
                email: ['', [Validators.required, Validators.email]],
                birthDate: ['', [Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
                acceptTerms: [false, [Validators.requiredTrue]],
                newsletter: [false]
            },
            { validators: PasswordUtils.passwordMatchValidator }
        );
    }

    //endregion

    //region Functions
    public onSubmit(): void {
        if (this.registerForm.valid) {
            this.isLoading = true;

            setTimeout((): void => {
                this.isLoading = false;
            }, 2000);
        } else {
            Object.keys(this.registerForm.controls).forEach((key: string): void => {
                this.registerForm.get(key)?.markAsTouched();
            });
        }
    }

    public toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    //endregion
}
