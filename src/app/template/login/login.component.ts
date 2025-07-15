import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ThemeService } from '../theme.service';
import { AnimatedBackgroundComponent } from './animated-background/animated-background.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [AnimatedBackgroundComponent, ReactiveFormsModule, InputTextModule, CheckboxModule, PasswordModule, CommonModule, RouterModule, FormsModule, ButtonModule],
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {

    //region Variables
    public isLoading: boolean = false;
    public loginForm: FormGroup;
    //endregion

    public get passwordError(): boolean {
        return (this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched) ?? false
    }

    public get usernameError(): boolean {
        return (this.loginForm.get('username')?.invalid && this.loginForm.get('username')?.touched) ?? false
    }

    //region Constructor
    public constructor(
        protected themeService: ThemeService,
        protected fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            rememberMe: [false]
        });
    }

    //endregion

    //region Functions
    public onSubmit(): void {
        if (this.loginForm.valid) {
            this.isLoading = true;

            setTimeout((): void => {
                this.isLoading = false;
                console.log('Login realizado:', this.loginForm.value);
            }, 2000);
        } else {
            Object.keys(this.loginForm.controls).forEach((key: string): void => {
                this.loginForm.get(key)?.markAsTouched();
            });
        }
    }

    public loginWithGoogle(): void {
        console.log('Login com Google');
    }

    public toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    //endregion

}
