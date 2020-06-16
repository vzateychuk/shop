import { AbstractControl, ValidationErrors } from '@angular/forms';

export class AddressValidator {
    static addressValidator(c: AbstractControl): ValidationErrors | null {
        console.log('Address validator is called');
        if (c.value !== undefined &&
            c.value !== 'Belarus' &&
            c.value !== 'Russia' &&
            c.value !== 'Ukraine' ) {
            return { addressValidator: true };
        } else {
            return null;
        }
    }
}
