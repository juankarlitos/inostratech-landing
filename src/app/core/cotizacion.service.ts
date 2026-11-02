import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { environment } from '../../environments/environment';
import { CotizacionCreadaResponse, CrearCotizacionRequest } from './api.models';

/** Tiempo máximo de espera: cubre el arranque en frío de Render (~50 s) con margen. */
const TIMEOUT_MS = 90_000;

@Injectable({ providedIn: 'root' })
export class CotizacionService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/api/cotizaciones`;

  crear(request: CrearCotizacionRequest): Observable<CotizacionCreadaResponse> {
    return this.http.post<CotizacionCreadaResponse>(this.url, request).pipe(timeout(TIMEOUT_MS));
  }
}
