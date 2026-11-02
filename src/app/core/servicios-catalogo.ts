import { TipoServicio } from './api.models';

/** Opciones del select de cotización: nombre legible -> enum del backend. */
export const OPCIONES_SERVICIO: ReadonlyArray<{ valor: TipoServicio; etiqueta: string }> = [
  { valor: 'NEGOCIO_GOOGLE', etiqueta: 'Negocio en Google' },
  { valor: 'PAGINA_NEGOCIO', etiqueta: 'Página para negocio' },
  { valor: 'TIENDA_ONLINE', etiqueta: 'Tienda online' },
  { valor: 'SISTEMA_MEDIDA', etiqueta: 'Sistema a medida' },
  { valor: 'CLASES_PROGRAMACION', etiqueta: 'Clases de programación' },
  { valor: 'OTRO', etiqueta: 'Otro' },
];
