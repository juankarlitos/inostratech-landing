import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MSG_COTIZAR_WEB } from '../../core/contacto';
import { WhatsappIcon } from '../../shared/whatsapp-icon';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';

@Component({
  selector: 'app-hero',
  imports: [WhatsappLinkDirective, WhatsappIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly msg = MSG_COTIZAR_WEB;
}
