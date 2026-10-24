import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    computed,
    effect,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService, I18nService } from '../../core/services';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LocaleNumberPipe } from '../../shared/pipes/locale-format.pipe';
import { Title, Meta } from '@angular/platform-browser';

interface Learner {
    user_id: string;
    name: string;
    avatar_url: string;
    country: string;
    target_lang: string;
    bio: string;
    level: number;
    current_streak: number;
    total_videos_watched: number;
    pinned_stamps: { id: string; imagePath: string }[];
}
@Component({
    selector: 'app-learner-page',
    standalone: true,
    imports: [PanelComponent, RouterLink, IconComponent, EmptyStateComponent, LocaleNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../account/account-experience.scss'],
    templateUrl: './learner-page.component.html',
})
export class LearnerPageComponent implements OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly supabase = inject(SupabaseService);
    readonly i18n = inject(I18nService);
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
    readonly profile = signal<Learner | null>(null);
    readonly loading = signal(true);
    readonly failed = signal(false);
    readonly message = signal('');
    readonly avatarImgFailed = signal(false);
    readonly android =
        typeof navigator !== 'undefined' &&
        /Android/i.test(navigator.userAgent);
    readonly appUrl = computed(() => {
        const profile = this.profile();
        return profile ? 'voca://learner/' + encodeURIComponent(profile.user_id) : '';
    });
    readonly learner = computed(() => {
        const profile = this.profile();
        if (!profile) return null;
        const locale = this.i18n.currentLanguage();
        const country = /^[a-z]{2}$/i.test(profile.country || '')
            ? new Intl.DisplayNames([locale], { type: 'region' }).of(profile.country.toUpperCase()) : '';
        const language = ['ja', 'zh', 'ko', 'en'].includes(profile.target_lang)
            ? new Intl.DisplayNames([locale], { type: 'language' }).of(profile.target_lang) : '';
        return {
            ...profile,
            avatar: this.avatarImgFailed() ? null : this.safeImage(profile.avatar_url),
            details: [country, language].filter(Boolean).join(' · '),
            stamps: profile.pinned_stamps.map(stamp => ({ ...stamp, image: this.safeImage(stamp.imagePath) })).filter(stamp => stamp.image),
        };
    });
    private readonly titleEffect = effect(() => {
        this.title.setTitle(this.i18n.t('accountExperience.profileTitle') + ' | Voca');
    });
    private generation = 0;
    private readonly subscription = this.route.paramMap.subscribe(() => {
        void this.load();
    });
    label(key: string): string {
        return this.i18n.t(`accountExperience.${key}`);
    }
    safeImage(value: string): string | null {
        if (
            value?.startsWith('/avatars/') ||
            value?.startsWith('/assets/avatars/')
        )
            return value;
        try {
            const url = new URL(value);
            return url.protocol === 'https:' ? url.href : null;
        } catch {
            return null;
        }
    }
    async load(): Promise<void> {
        const generation = ++this.generation;
        this.profile.set(null);
        this.loading.set(true);
        this.failed.set(false);
        this.message.set('');
        this.avatarImgFailed.set(false);
        this.meta.updateTag({ name: 'robots', content: 'noindex' });
        const id = this.route.snapshot.paramMap.get('userId') || '';
        if (
            !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                id,
            )
        ) {
            this.loading.set(false);
            return;
        }
        try {
            const { data, error } = await this.supabase.client.rpc(
                'get_shared_learner_profile',
                { p_user_id: id },
            );
            if (generation !== this.generation) return;
            if (error) throw error;
            if (data?.is_public === true)
                this.profile.set({
                    ...data,
                    pinned_stamps: Array.isArray(data.pinned_stamps)
                        ? data.pinned_stamps
                        : [],
                } as Learner);
        } catch {
            if (generation === this.generation) this.failed.set(true);
        } finally {
            if (generation === this.generation) this.loading.set(false);
        }
    }
    async copy(): Promise<void> {
        const profile = this.profile(), generation = this.generation;
        if (!profile) return;
        try {
            await navigator.clipboard.writeText(
                'https://voca.study/learner/' + profile.user_id,
            );
            if (generation === this.generation) this.message.set(this.label('copied'));
        } catch {
            if (generation === this.generation) this.message.set(this.label('failed'));
        }
    }
    async share(): Promise<void> {
        const profile = this.profile(), generation = this.generation;
        if (!profile) return;
        if (!navigator.share) {
            await this.copy();
            return;
        }
        try {
            await navigator.share({
                title: profile.name,
                url: 'https://voca.study/learner/' + profile.user_id,
            });
        } catch (error) {
            if (generation === this.generation && !(error instanceof DOMException && error.name === 'AbortError'))
                this.message.set(this.label('failed'));
        }
    }
    ngOnDestroy(): void {
        this.generation++;
        this.subscription.unsubscribe();
        this.meta.removeTag('name="robots"');
    }
}
