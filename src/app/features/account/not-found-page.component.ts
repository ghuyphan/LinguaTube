import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/services';
@Component({
    selector: 'app-not-found-page',
    standalone: true,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./account-experience.scss'],
    template: `<main class="experience-page">
        <section class="experience-card">
            <h1>{{ i18n.t('accountExperience.pageNotFound') }}</h1>
            <nav class="experience-nav">
                <a routerLink="/video">{{ i18n.t('accountExperience.back') }}</a
                ><a routerLink="/account">{{
                    i18n.t('accountExperience.account')
                }}</a>
            </nav>
        </section>
    </main>`,
})
export class NotFoundPageComponent {
    readonly i18n = inject(I18nService);
}
