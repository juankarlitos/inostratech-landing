import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MSG_COTIZAR } from '../../core/contacto';
import { WhatsappIcon } from '../../shared/whatsapp-icon';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';

@Component({
  selector: 'app-whatsapp-float',
  imports: [WhatsappLinkDirective, WhatsappIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<a class="fab" [appWhatsapp]="msg" aria-label="Escribir por WhatsApp"><app-whatsapp-icon /></a>`,
  styles: `
    .fab {
      position: fixed;
      right: calc(18px + env(safe-area-inset-right, 0px));
      bottom: calc(18px + env(safe-area-inset-bottom, 0px));
      width: 60px; height: 60px; border-radius: 50%;
      background: var(--wa); color: var(--wa-ink);
      display: grid; place-items: center;
      box-shadow: 0 12px 24px -8px rgba(0, 0, 0, .35);
      z-index: 20;
      --icon-size: 30px;
    }
  `,
})
export class WhatsappFloat {
  protected readonly msg = MSG_COTIZAR;
}
