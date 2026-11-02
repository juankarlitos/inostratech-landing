/** Datos de contacto y armado de links de WhatsApp (igual que la referencia). */

export const WA_NUMBER = '56957046074';
export const WA_DISPLAY = '+56 9 5704 6074';
export const EMAIL_CONTACTO = 'jc.inostrozach@gmail.com';

export const MSG_COTIZAR = 'Hola Juan Carlos, vi tu página de InostraTech y quiero cotizar.';
export const MSG_COTIZAR_WEB = 'Hola Juan Carlos, vi tu página de InostraTech y quiero cotizar una página web.';
export const MSG_CLASES = 'Hola Juan Carlos, me interesan las clases de programación.';

export function whatsappUrl(mensaje: string = 'Hola Juan Carlos'): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
