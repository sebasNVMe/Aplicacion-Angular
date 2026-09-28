import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validador {
  /**
   * Validador personalizado en Angular para comprobar que el correo pertenezca al dominio @unicauca.edu.co
   */
  static correoUnicauca(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const correoRegex = /^[a-zA-Z0-9._%+-]+@unicauca\.edu\.co$/;
      const esValido = correoRegex.test(control.value.trim());
      return esValido ? null : { correoUnicaucaInvalido: true };
    };
  }
}