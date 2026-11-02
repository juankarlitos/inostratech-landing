import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experiencia',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experiencia">
      <div class="wrap exp">
        <div>
          <div class="sec-head mb0">
            <span class="eyebrow">Quién soy</span>
            <h2>Juan Carlos Inostroza</h2>
            <p>Ingeniero en Informática y desarrollador backend Java con 6 años de experiencia. He construido sistemas para bancos, transporte y el Estado. Ahora pongo esa experiencia al servicio de negocios y emprendedores.</p>
          </div>
          <div class="companies">
            @for (c of empresas; track c) { <span>{{ c }}</span> }
          </div>
        </div>
        <div class="projects">
          <div class="proj"><span class="stack">Angular · Spring Boot · PostgreSQL</span><h3>Tienda online con panel de administración</h3><p>Catálogo con fotos, pedidos con aviso por correo, botón de WhatsApp y métricas para el dueño.</p></div>
          <div class="proj"><span class="stack">Spring Boot · Angular · Vercel</span><h3>Gestor de tareas</h3><p>Aplicación web con usuarios, inicio de sesión y despliegue en la nube.</p></div>
          <div class="proj"><span class="stack">github.com/juankarlitos</span><h3>Código abierto en GitHub</h3><p><a href="https://github.com/juankarlitos" target="_blank" rel="noopener">Ver mis proyectos</a></p></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .mb0 { margin-bottom: 0; }
    .exp { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
    .companies { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
    .companies span { font-weight: 600; font-size: 15px; padding: 8px 14px; border-radius: 999px; background: var(--accent-soft); }
    .projects { display: grid; gap: 14px; }
    .proj { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 20px; display: grid; gap: 8px; }
    .proj p { color: var(--muted); font-size: 15px; }
    .stack { font: 500 12px/1.5 var(--f-mono); color: var(--accent); }
    @media (max-width: 900px) { .exp { grid-template-columns: 1fr; } }
  `,
})
export class Experiencia {
  protected readonly empresas = ['Banco Santander', 'ChileCompra', 'Indra', 'Pullman Bus', 'IKE', 'NUAM'];
}
