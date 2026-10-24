import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { I18nService } from '../../core/services';
@Component({
    selector: 'app-not-found-page',
    standalone: true,
    imports: [RouterLink, EmptyStateComponent, PanelComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./account-experience.scss'],
    template: `<div class="page-layout page-layout--focus experience-page"><div class="page-layout__main">
      <app-panel [panelTitle]="i18n.t('accountExperience.pageNotFound')" panelIcon="search" [headingLevel]="1" class="experience-panel">
        <app-empty-state icon="search" [description]="i18n.t('accountExperience.notFoundHint')">
          <div class="actions">
            <a class="btn btn-primary" routerLink="/video">{{ i18n.t('accountExperience.back') }}</a>
            <a class="btn btn-secondary" routerLink="/account">{{ i18n.t('accountExperience.account') }}</a>
          </div>
        </app-empty-state>
      </app-panel>
    </div></div>`,
})
export class NotFoundPageComponent {
    readonly i18n = inject(I18nService);
}
