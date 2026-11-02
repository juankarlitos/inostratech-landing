/**
 * Tipos que reflejan los DTO y enums de tienda-backend.
 * Mantener sincronizado con:
 *  - model/TipoServicio.java
 *  - model/TipoEventoLanding.java
 *  - cotizacion/dto/CrearCotizacionRequest.java
 *  - cotizacion/dto/CotizacionCreadaResponse.java
 *  - exception/GlobalExceptionHandler.java
 */

export type TipoServicio =
  | 'NEGOCIO_GOOGLE'
  | 'PAGINA_NEGOCIO'
  | 'TIENDA_ONLINE'
  | 'SISTEMA_MEDIDA'
  | 'CLASES_PROGRAMACION'
  | 'OTRO';

export type TipoEventoLanding = 'VISITA' | 'CLICK_WHATSAPP' | 'CLICK_PRECIOS';

export interface CrearCotizacionRequest {
  nombre: string;
  telefono: string;
  email: string | null;
  tipoServicio: TipoServicio;
  mensaje: string;
  /** Honeypot anti-spam: siempre vacío para humanos. */
  website: string;
}

export interface CotizacionCreadaResponse {
  mensaje: string;
}

export interface RegistrarEventoRequest {
  tipo: TipoEventoLanding;
}

/** Cuerpo de error de GlobalExceptionHandler. */
export interface ErrorResponse {
  timestamp?: string;
  status?: number;
  error?: string;
  mensaje?: string;
  /** Solo en errores de validación (400): campo -> mensaje. */
  errores?: Record<string, string>;
}
