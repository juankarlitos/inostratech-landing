import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MSG_CLASES } from '../../core/contacto';
import { WhatsappLinkDirective } from '../../shared/whatsapp-link.directive';

@Component({
  selector: 'app-clases',
  imports: [WhatsappLinkDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="band" id="clases">
      <div class="wrap">
        <div>
          <div class="sec-head">
            <span class="eyebrow">Clases de programación</span>
            <h2>Aprende con alguien que programa todos los días</h2>
            <p>Clases online, individuales y con horario flexible. Para partir desde cero, apoyo en ramos de la U o el instituto, o preparar entrevistas técnicas.</p>
          </div>
          <div class="class-price"><b>$15.000</b><span class="muted">por hora · primera clase a $10.000</span></div>
          <a class="btn btn-wa" [appWhatsapp]="msg">Agendar una clase</a>
        </div>
        <ul class="topics">
          @for (t of temas; track t[0]) {
            <li><span>{{ t[0] }}</span><span>{{ t[1] }}</span></li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .band { background: var(--band); color: var(--band-ink); }
    .band .wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
    .band .sec-head p, .band .muted { color: var(--band-muted); }
    .band .eyebrow { color: #9DB0FF; }
    .topics { display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }
    .topics li { display: flex; justify-content: space-between; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(255, 255, 255, .12); }
    .topics li span:last-child { font: 500 13px/1.5 var(--f-mono); color: var(--band-muted); text-align: right; }
    .class-price { display: flex; align-items: baseline; flex-wrap: wrap; gap: 10px; margin: 24px 0; }
    .class-price b { font: 800 44px/1 var(--f-display); font-variant-numeric: tabular-nums; }
    @media (max-width: 900px) { .band .wrap { grid-template-columns: 1fr; } }
  `,
})
export class Clases {
  protected readonly msg = MSG_CLASES;
  protected readonly temas: ReadonlyArray<[string, string]> = [
    ['Java y Spring Boot', 'APIs REST, JPA, seguridad'],
    ['Desarrollo web', 'HTML, CSS, JavaScript, Angular'],
    ['Bases de datos', 'SQL, PostgreSQL, Oracle'],
    ['Herramientas', 'Git, GitHub, Docker'],
    ['Proyectos y tesis', 'Revisión y acompañamiento'],
    ['Entrevistas técnicas', 'Práctica y feedback'],
  ];
}
