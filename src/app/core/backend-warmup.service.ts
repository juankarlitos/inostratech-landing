import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

/**
 * El backend en Render (plan gratuito) se duerme y tarda ~50 s en despertar.
 * Al cargar la landing se hace un GET liviano para que empiece a despertar
 * mientras el visitante lee y llena el formulario. Errores ignorados.
 */
@Injectable({ providedIn: 'root' })
export class BackendWarmupService {
  private readonly http = inject(HttpClient);

  despertar(): void {
    this.http.get(`${environment.apiUrl}/api/config`).subscribe({ error: () => {} });
  }
}
