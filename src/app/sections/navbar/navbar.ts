import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MSG_COTIZAR } from '../../core/contacto';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';

@Component({
  selector: 'app-navbar',
  imports: [WhatsappLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <div class="wrap">
        <a class="logo" href="#inicio">Inostra<span>Tech</span></a>
        <a class="nav-cta" [appWhatsapp]="msg">Cotizar</a>
      </div>
    </nav>
  `,
  styles: `
    :host { display: block; }
    nav .wrap { display: flex; align-items: center; justify-content: space-between; padding-block: 18px; gap: 16px; }
    .logo { font: 800 22px/1 var(--f-display); letter-spacing: -.02em; text-decoration: none; }
    .logo span { color: var(--accent); }
    .nav-cta { font-weight: 600; font-size: 15px; text-decoration: none; padding: 10px 16px; border-radius: 999px; border: 1.5px solid var(--ink); }
    @media (max-width: 560px) { .nav-cta { display: none; } }
  `,
})
export class Navbar {
  protected readonly msg = MSG_COTIZAR;
}
