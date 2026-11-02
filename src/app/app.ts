import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { BackendWarmupService } from './core/backend-warmup.service';
import { MetricasService } from './core/metricas.service';
import { Clases } from './sections/clases/clases';
import { Contacto } from './sections/contacto/contacto';
import { Cotizacion } from './sections/cotizacion/cotizacion';
import { Experiencia } from './sections/experiencia/experiencia';
import { Faq } from './sections/faq/faq';
import { Footer } from './sections/footer/footer';
import { Hero } from './sections/hero/hero';
import { Navbar } from './sections/navbar/navbar';
import { Proceso } from './sections/proceso/proceso';
import { Servicios } from './sections/servicios/servicios';
import { WhatsappFloat } from './sections/whatsapp-float/whatsapp-float';

@Component({
  selector: 'app-root',
  imports: [Navbar, Hero, Servicios, Proceso, Clases, Experiencia, Faq, Cotizacion, Contacto, Footer, WhatsappFloat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
})
export class App {
  constructor() {
    const warmup = inject(BackendWarmupService);
    const metricas = inject(MetricasService);
    afterNextRender(() => {
      warmup.despertar();
      metricas.registrarVisitaUnaVezPorSesion();
    });
  }
}
