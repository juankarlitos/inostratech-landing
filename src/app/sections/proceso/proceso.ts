import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-proceso',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pt0">
      <div class="wrap">
        <div class="sec-head"><span class="eyebrow">Cómo trabajo</span><h2>De la conversación a tu página publicada</h2></div>
        <div class="steps">
          <div class="step"><h3>Conversamos</h3><p>Me cuentas por WhatsApp qué vendes y a quién. Te mando una cotización el mismo día.</p></div>
          <div class="step"><h3>Anticipo y material</h3><p>Pagas el 50% y me envías logo, fotos y textos. Si no los tienes, te ayudo a armarlos.</p></div>
          <div class="step"><h3>Diseño y revisión</h3><p>Te muestro la página funcionando y hacemos los ajustes que quieras.</p></div>
          <div class="step"><h3>Publicación</h3><p>La dejo online con tu dominio, la conecto a Google y te enseño a usarla.</p></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .pt0 { padding-top: 0; }
    .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; counter-reset: s; }
    .step { display: grid; gap: 10px; border-top: 2px solid var(--ink); padding-top: 16px; min-width: 0; align-content: start; }
    .step::before { counter-increment: s; content: "Paso " counter(s); font: 500 12px/1 var(--f-mono); color: var(--accent); letter-spacing: .08em; text-transform: uppercase; }
    .step p { color: var(--muted); font-size: 15px; }
    @media (max-width: 900px) { .steps { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 560px) { .steps { grid-template-columns: 1fr; } }
  `,
})
export class Proceso {}
