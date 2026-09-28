import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validador } from '../validador/validaciones';

declare var Toastify: any; // Declaración para Toastify JS

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario implements OnInit {
  formularioContacto!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formularioContacto = this.fb.group({
      identificacion: ['', Validators.required],
      numeroIdentificacion: ['', Validators.required],
      nombres: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      apellidos: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      correoElectronico: ['', [Validators.required, Validador.correoUnicauca()]],
      genero: ['', Validators.required]
    });
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formularioContacto.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  obtenerError(campo: string): string {
    const control = this.formularioContacto.get(campo);
    if (!control || !control.errors || !(control.dirty || control.touched)) {
      return '';
    }


    switch (campo) {
      case 'identificacion':
        if (control.errors['required']) return 'El tipo de identificación es obligatorio';
        break;

      case 'numeroIdentificacion':
        if (control.errors['required']) return 'La identificación es obligatoria';
        break;

      case 'nombres':
        if (control.errors['required'] || control.errors['minlength'] || control.errors['maxlength']) {
          return 'El nombre debe tener entre 1 y 20 caracteres';
        }
        break;

      case 'apellidos':
        if (control.errors['required'] || control.errors['minlength'] || control.errors['maxlength']) {
          return 'El apellido debe tener entre 1 y 20 caracteres';
        }
        break;

      case 'correoElectronico':
        if (control.errors['required'] || control.errors['correoUnicaucaInvalido']) {
          return 'El correo debe tener el dominio @unicauca.edu.co';
        }
        break;

      case 'genero':
        if (control.errors['required']) return 'El género es obligatorio';
        break;
    }

    return 'Campo inválido.';
  }

  validarFormulario(): void {
    if (this.formularioContacto.valid) {
      this.mostrarMensajeExito();

      const el = document.getElementById('formularioContacto');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        this.formularioContacto.reset();
      }, 2000);
    } else {
      this.formularioContacto.markAllAsTouched();
      alert('Por favor, complete correctamente el formulario.');
    }
  }

  mostrarMensajeExito(): void {
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "rgba(16, 185, 129, 0.9)",
          color: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
          padding: "16px 24px",
          fontFamily: "'Inter', sans-serif"
        },
        stopOnFocus: true,
      }).showToast();
    }
  }
}
