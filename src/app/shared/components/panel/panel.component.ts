import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent, IconName } from '../icon/icon.component';

/** The existing History/Dictionary card header, shared with a single card host. */
@Component({
  selector: 'app-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  host: { class: 'card' },
  styles: [':host { display: block; min-width: 0; }'],
  template: `
    <header class="panel-header">
      <div class="panel-header__row">
        <div class="panel-header__left">
          @if (panelIcon(); as icon) {
            <app-icon [name]="icon" [size]="panelIconSize()" class="panel-header__icon" />
          }
          @if (headingLevel() === 1) {
            <h1 class="panel-header__title">{{ panelTitle() }}</h1>
          } @else {
            <h2 class="panel-header__title">{{ panelTitle() }}</h2>
          }
        </div>
        <ng-content select="[panelActions]" />
      </div>
    </header>
    <ng-content />
  `,
})
export class PanelComponent {
  readonly panelTitle = input.required<string>();
  readonly panelIcon = input<IconName | null>(null);
  readonly panelIconSize = input(20);
  readonly headingLevel = input<1 | 2>(2);
}
