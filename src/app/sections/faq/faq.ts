import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pt0" id="faq">
      <div class="wrap">
        <div class="sec-head"><span class="eyebrow">Preguntas frecuentes</span><h2>Lo que más me preguntan</h2></div>
        @for (p of preguntas; track p.q) {
          <details><summary>{{ p.q }}</summary><p>{{ p.a }}</p></details>
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .pt0 { padding-top: 0; }
    details { border-bottom: 1px solid var(--line); padding-block: 18px; }
    summary { cursor: pointer; font: 700 18px/1.3 var(--f-display); list-style: none; display: flex; justify-content: space-between; gap: 16px; }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: "+"; color: var(--accent); font-size: 24px; line-height: 1; }
    details[open] summary::after { content: "–"; }
    details p { margin-top: 10px; color: var(--muted); max-width: 62ch; }
  `,
})
export class Faq {
  protected readonly preguntas = [
    { q: '¿Qué necesito para empezar?', a: 'Solo contarme qué hace tu negocio. Logo, fotos y textos ayudan, pero si no los tienes los armamos juntos.' },
    { q: '¿Tengo que pagar algo mensual?', a: 'El dominio (.cl) cuesta alrededor de $10.000 al año en NIC Chile. Para páginas simples el hosting puede ser gratuito; las tiendas online tienen un costo mensual que te explico antes de partir.' },
    { q: '¿Puedo cambiar la página después?', a: 'Sí. Te enseño a editar lo básico, y si prefieres que yo lo haga, está la mantención mensual.' },
    { q: '¿Das boleta?', a: 'Sí, emito boleta de honorarios electrónica.' },
  ];
}
