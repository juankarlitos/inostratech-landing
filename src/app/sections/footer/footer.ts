import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="wrap"><span>© {{ anio }} InostraTech · Juan Carlos Inostroza</span><span>Santiago, Chile</span></div>
    </footer>
  `,
  styles: `
    :host { display: block; }
    footer { padding-block: 32px 96px; color: var(--muted); font-size: 14px; }
    footer .wrap { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px; }
  `,
})
export class Footer {
  protected readonly anio = new Date().getFullYear();
}
