import { AbstractControl } from '@angular/forms';

export class PasswordUtils {

    static passwordMatchValidator(control: AbstractControl) {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { passwordMismatch: true };
        }

        return null;
    }

}
