import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegistrarEventoRequest, TipoEventoLanding } from './api.models';

const CLAVE_VISITA = 'it_visita_registrada';

/**
 * Métricas de la landing (POST /api/metricas/evento).
 * Envío "dispara y olvida": nunca bloquea la UI ni muestra errores.
 */
@Injectable({ providedIn: 'root' })
export class MetricasService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/api/metricas/evento`;

  registrar(tipo: TipoEventoLanding): void {
    try {
      const body: RegistrarEventoRequest = { tipo };
      this.http.post<void>(this.url, body).subscribe({ error: () => {} });
    } catch {
      // Nada: las métricas nunca deben afectar al usuario.
    }
  }

  /** VISITA una sola vez por sesión del navegador. */
  registrarVisitaUnaVezPorSesion(): void {
    try {
      if (sessionStorage.getItem(CLAVE_VISITA)) return;
      sessionStorage.setItem(CLAVE_VISITA, '1');
    } catch {
      // sessionStorage bloqueado (modo privado, etc.): se registra igual.
    }
    this.registrar('VISITA');
  }
}
