import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { EMAIL_CONTACTO, MSG_COTIZAR, WA_DISPLAY } from '../../core/contacto';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';

@Component({
  selector: 'app-contacto',
  imports: [WhatsappLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="contact pt0" id="contacto">
      <div class="wrap">
        <div class="contact-box">
          <div class="contact-left">
            <span class="eyebrow">Contacto</span>
            <h2>Cuéntame de tu negocio y te cotizo hoy</h2>
            <p class="muted">Respondo por WhatsApp de lunes a sábado.</p>
          </div>
          <div class="contact-right">
            <a class="btn btn-wa" [appWhatsapp]="msg">Escribir por WhatsApp</a>
            <div class="num">
              <code #num>{{ telefono }}</code>
              <button class="copy" type="button" (click)="copiar(num, etiquetaTel, 'Copiar número')">{{ etiquetaTel() }}</button>
            </div>
            <div class="num">
              <code #mail>{{ email }}</code>
              <button class="copy" type="button" (click)="copiar(mail, etiquetaMail, 'Copiar correo')">{{ etiquetaMail() }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .pt0 { padding-top: 0; }
    .contact-box { background: var(--surface); border: 1px solid var(--line); border-radius: 24px; padding: 40px; display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: center; }
    .contact-box h2 { font-size: clamp(28px, 4.5vw, 44px); }
    .contact-left { display: grid; gap: 14px; min-width: 0; }
    .muted { color: var(--muted); }
    .num { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 6px; }
    .num code { font: 500 18px/1 var(--f-mono); user-select: all; padding: 12px 14px; border-radius: 10px; background: var(--bg); border: 1px solid var(--line); overflow-wrap: anywhere; }
    .copy { font: 600 14px/1 var(--f-body); padding: 12px 14px; border-radius: 10px; border: 1px solid var(--line); background: transparent; color: var(--ink); cursor: pointer; }
    .contact-right { display: grid; gap: 14px; min-width: 0; }
    @media (max-width: 900px) { .contact-box { grid-template-columns: 1fr; } }
    @media (max-width: 560px) { .contact-box { padding: 24px; } }
  `,
})
export class Contacto {
  protected readonly msg = MSG_COTIZAR;
  protected readonly telefono = WA_DISPLAY;
  protected readonly email = EMAIL_CONTACTO;
  protected readonly etiquetaTel = signal('Copiar número');
  protected readonly etiquetaMail = signal('Copiar correo');

  protected copiar(src: HTMLElement, etiqueta: WritableSignal<string>, original: string): void {
    const listo = () => {
      etiqueta.set('Copiado');
      setTimeout(() => etiqueta.set(original), 1800);
    };
    const seleccionar = () => {
      const rango = document.createRange();
      rango.selectNodeContents(src);
      const sel = getSelection();
      sel?.removeAllRanges();
      sel?.addRange(rango);
    };
    try {
      navigator.clipboard.writeText(src.textContent ?? '').then(listo).catch(seleccionar);
    } catch {
      seleccionar();
    }
  }
}
