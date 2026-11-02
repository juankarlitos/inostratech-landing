import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject,
} from '@angular/core';
import { MetricasService } from '../../core/metricas.service';

/** Planes y precios. Registra CLICK_PRECIOS la primera vez que la sección entra en pantalla. */
@Component({
  selector: 'app-servicios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly metricas = inject(MetricasService);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.metricas.registrar('CLICK_PRECIOS');
            observer.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(this.el.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
