import { Directive, computed, inject, input } from '@angular/core';
import { MetricasService } from '../core/metricas.service';
import { whatsappUrl } from '../core/contacto';

/**
 * Convierte un <a> en link de WhatsApp con mensaje prellenado y registra
 * CLICK_WHATSAPP al hacer clic.
 *   <a appWhatsapp="Hola Juan Carlos...">Escribir</a>
 */
@Directive({
  selector: 'a[appWhatsapp]',
  host: {
    '[href]': 'href()',
    target: '_blank',
    rel: 'noopener',
    '(click)': 'onClick()',
  },
})
export class WhatsappLinkDirective {
  private readonly metricas = inject(MetricasService);

  readonly appWhatsapp = input<string>('');
  protected readonly href = computed(() => whatsappUrl(this.appWhatsapp() || undefined));

  protected onClick(): void {
    this.metricas.registrar('CLICK_WHATSAPP');
  }
}
