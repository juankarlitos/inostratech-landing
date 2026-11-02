import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validadores equivalentes a las anotaciones de CrearCotizacionRequest.java.
 * Validan el valor normalizado (el mismo que se envía al backend).
 * Cada error lleva el mensaje a mostrar bajo el campo.
 */

const NOMBRE_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/;
const TELEFONO_REGEX = /^(\+569|9)\d{8}$/;
// Aproximación razonable de @Email de Hibernate Validator.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Quita espacios, guiones y paréntesis: "+56 9 5704-6074" -> "+56957046074". */
export function normalizarTelefono(valor: string): string {
  return (valor ?? '').replace(/[\s\-()]/g, '');
}

const err = (mensaje: string): ValidationErrors => ({ regla: mensaje });

export const nombreValidator: ValidatorFn = (c: AbstractControl) => {
  const v = String(c.value ?? '').trim();
  if (!v) return err('El nombre es obligatorio');
  if (v.length < 2 || v.length > 60) return err('El nombre debe tener entre 2 y 60 caracteres');
  if (!NOMBRE_REGEX.test(v)) return err('El nombre solo puede contener letras y espacios');
  return null;
};

export const telefonoValidator: ValidatorFn = (c: AbstractControl) => {
  const v = normalizarTelefono(String(c.value ?? ''));
  if (!v) return err('El teléfono es obligatorio');
  if (!TELEFONO_REGEX.test(v)) return err('El teléfono debe tener formato chileno: +569XXXXXXXX o 9XXXXXXXX');
  return null;
};

export const emailOpcionalValidator: ValidatorFn = (c: AbstractControl) => {
  const v = String(c.value ?? '').trim();
  if (!v) return null;
  if (v.length > 120) return err('El email no puede superar los 120 caracteres');
  if (!EMAIL_REGEX.test(v)) return err('El email no es válido');
  return null;
};

export const tipoServicioValidator: ValidatorFn = (c: AbstractControl) =>
  c.value ? null : err('Selecciona el tipo de servicio');

export const mensajeValidator: ValidatorFn = (c: AbstractControl) => {
  const v = String(c.value ?? '').trim();
  if (!v) return err('El mensaje es obligatorio');
  if (v.length < 10 || v.length > 1000) return err('El mensaje debe tener entre 10 y 1000 caracteres');
  return null;
};
