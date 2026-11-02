import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { CrearCotizacionRequest, ErrorResponse, TipoServicio } from '../../core/api.models';
import { MSG_COTIZAR } from '../../core/contacto';
import { CotizacionService } from '../../core/cotizacion.service';
import { OPCIONES_SERVICIO } from '../../core/servicios-catalogo';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';
import {
  emailOpcionalValidator, mensajeValidator, nombreValidator, normalizarTelefono,
  telefonoValidator, tipoServicioValidator,
} from './cotizacion-validators';

type Estado = 'idle' | 'enviando' | 'exito' | 'invalido' | 'limite' | 'fallo';
type Campo = 'nombre' | 'telefono' | 'email' | 'tipoServicio' | 'mensaje';

/** A partir de este tiempo se avisa que el backend (Render) puede estar despertando. */
const AVISO_LENTO_MS = 5000;
const MENSAJE_MAX = 1000;

@Component({
  selector: 'app-cotizacion',
  imports: [ReactiveFormsModule, WhatsappLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cotizacion.html',
  styleUrl: './cotizacion.css',
})
export class Cotizacion {
  private readonly cotizacionService = inject(CotizacionService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly opciones = OPCIONES_SERVICIO;
  protected readonly msgWhatsapp = MSG_COTIZAR;
  protected readonly mensajeMax = MENSAJE_MAX;

  protected readonly form = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: nombreValidator }),
    telefono: new FormControl('', { nonNullable: true, validators: telefonoValidator }),
    email: new FormControl('', { nonNullable: true, validators: emailOpcionalValidator }),
    tipoServicio: new FormControl<TipoServicio | null>(null, { validators: tipoServicioValidator }),
    mensaje: new FormControl('', { nonNullable: true, validators: mensajeValidator }),
    /** Honeypot: oculto para humanos, debe quedar vacío. */
    website: new FormControl('', { nonNullable: true }),
  });

  protected readonly estado = signal<Estado>('idle');
  protected readonly lento = signal(false);
  protected readonly mensajeResultado = signal('');
  protected readonly intentoEnvio = signal(false);
  protected readonly largoMensaje = signal(0);

  private timerLento: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const sub = this.form.controls.mensaje.valueChanges.subscribe((v) => this.largoMensaje.set(v.length));
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      clearTimeout(this.timerLento);
    });
  }

  /** Mensaje de error del campo (servidor tiene prioridad), o null si no se debe mostrar. */
  protected error(campo: Campo): string | null {
    const c: AbstractControl = this.form.controls[campo];
    if (!c.errors || !(c.touched || this.intentoEnvio())) return null;
    return c.errors['servidor'] ?? c.errors['regla'] ?? null;
  }

  protected enviar(): void {
    if (this.estado() === 'enviando') return;
    this.intentoEnvio.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.enfocarPrimerError();
      return;
    }

    const v = this.form.getRawValue();
    const email = v.email.trim();
    const request: CrearCotizacionRequest = {
      nombre: v.nombre.trim(),
      telefono: normalizarTelefono(v.telefono),
      email: email ? email : null,
      tipoServicio: v.tipoServicio as TipoServicio,
      mensaje: v.mensaje.trim(),
      website: v.website,
    };

    this.estado.set('enviando');
    this.mensajeResultado.set('');
    this.lento.set(false);
    this.timerLento = setTimeout(() => this.lento.set(true), AVISO_LENTO_MS);

    this.cotizacionService
      .crear(request)
      .pipe(
        finalize(() => {
          clearTimeout(this.timerLento);
          this.lento.set(false);
        }),
      )
      .subscribe({
        next: (res) => {
          this.estado.set('exito');
          this.mensajeResultado.set(res?.mensaje || '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.');
          this.form.reset();
          this.intentoEnvio.set(false);
        },
        error: (e: unknown) => this.manejarError(e),
      });
  }

  private manejarError(e: unknown): void {
    const http = e instanceof HttpErrorResponse ? e : null;
    const cuerpo = (http?.error ?? null) as ErrorResponse | null;

    if (http?.status === 400) {
      const errores = cuerpo?.errores ?? {};
      let alguno = false;
      for (const [campo, mensaje] of Object.entries(errores)) {
        const control = this.form.get(campo);
        if (control) {
          control.setErrors({ ...(control.errors ?? {}), servidor: mensaje });
          control.markAsTouched();
          alguno = true;
        }
      }
      this.estado.set('invalido');
      this.mensajeResultado.set(
        alguno ? 'Revisa los campos marcados.' : (cuerpo?.mensaje ?? 'Los datos enviados no son válidos.'),
      );
      if (alguno) this.enfocarPrimerError();
      return;
    }

    if (http?.status === 429) {
      this.estado.set('limite');
      this.mensajeResultado.set('Ya enviaste varias solicitudes, intenta más tarde.');
      return;
    }

    this.estado.set('fallo');
    this.mensajeResultado.set('No pudimos enviar tu solicitud en este momento. Escríbeme directamente por WhatsApp y te respondo hoy.');
  }

  private enfocarPrimerError(): void {
    const orden: Campo[] = ['nombre', 'telefono', 'email', 'tipoServicio', 'mensaje'];
    const primero = orden.find((c) => this.form.controls[c].invalid);
    if (primero) document.getElementById(`cot-${primero}`)?.focus();
  }
}
