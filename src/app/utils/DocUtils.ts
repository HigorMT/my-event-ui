import { AbstractControl } from '@angular/forms';

export class DocUtils {

    static cpfValidator(control: AbstractControl) {
        const cpf = control.value;
        if (!cpf) return null;

        const cleanCpf = cpf.replace(/\D/g, '');

        if (cleanCpf.length !== 11) {
            return { invalidCpf: true };
        }

        if (/^(\d)\1{10}$/.test(cleanCpf)) {
            return { invalidCpf: true };
        }

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

}
