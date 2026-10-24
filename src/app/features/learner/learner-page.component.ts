import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SupabaseService, I18nService } from '../../core/services';
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
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['../account/account-experience.scss'],
    template: ` <main class="experience-page">
        <nav class="experience-nav">
            <a routerLink="/video">{{ label('back') }}</a
            ><a routerLink="/account">{{ label('account') }}</a>
        </nav>
        @if (loading()) {
            <div class="experience-card" aria-busy="true">
                {{ label('profileTitle') }}…
            </div>
        } @else if (failed()) {
            <section class="experience-card">
                <h1>{{ label('failed') }}</h1>
                <button (click)="load()">{{ label('retry') }}</button>
            </section>
        } @else {
            @if (profile(); as p) {
                <article class="experience-card">
                    <header class="profile-heading">
                        @if (safeImage(p.avatar_url); as image) {
                            <img
                                [src]="image"
                                alt=""
                                referrerpolicy="no-referrer"
                            />
                        }
                        <div>
                            <h1>{{ p.name }}</h1>
                            <p>{{ p.country }} · {{ p.target_lang }}</p>
                        </div>
                    </header>
                    <p>{{ p.bio }}</p>
                    <div class="stats">
                        <div>
                            <strong>{{ p.level }}</strong
                            ><span>{{ label('level') }}</span>
                        </div>
                        <div>
                            <strong>{{ p.current_streak }}</strong
                            ><span>{{ label('streak') }}</span>
                        </div>
                        <div>
                            <strong>{{ p.total_videos_watched }}</strong
                            ><span>{{ label('videos') }}</span>
                        </div>
                    </div>
                    <div class="stamps">
                        @for (stamp of p.pinned_stamps; track stamp.id) {
                            @if (safeImage(stamp.imagePath); as image) {
                                <img
                                    [src]="image"
                                    alt=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer"
                                />
                            }
                        }
                    </div>
                    <div class="actions">
                        <button class="primary" (click)="share()">
                            {{ label('share') }}</button
                        ><button (click)="copy()">{{ label('copy') }}</button>
                        @if (android) {
                            <a [href]="appUrl()">{{ label('openApp') }}</a>
                        }
                    </div>
                    @if (message()) {
                        <p role="status">{{ message() }}</p>
                    }
                </article>
            } @else {
                <section class="experience-card">
                    <h1>{{ label('unavailable') }}</h1>
                </section>
            }
        }
    </main>`,
})
export class LearnerPageComponent implements OnDestroy {
    private readonly route = inject(ActivatedRoute);
    private readonly supabase = inject(SupabaseService);
    private readonly i18n = inject(I18nService);
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
    readonly profile = signal<Learner | null>(null);
    readonly loading = signal(true);
    readonly failed = signal(false);
    readonly message = signal('');
    readonly android =
        typeof navigator !== 'undefined' &&
        /Android/i.test(navigator.userAgent);
    private generation = 0;
    private readonly subscription = this.route.paramMap.subscribe(() => {
        void this.load();
    });
    label(key: string): string {
        return this.i18n.t(`accountExperience.${key}`);
    }
    appUrl(): string {
        return (
            'voca://learner/' +
            encodeURIComponent(this.route.snapshot.paramMap.get('userId') || '')
        );
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
        this.title.setTitle(this.label('profileTitle') + ' | Voca');
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
        try {
            await navigator.clipboard.writeText(
                'https://voca.study/learner/' + this.profile()!.user_id,
            );
            this.message.set(this.label('copied'));
        } catch {
            this.message.set(this.label('failed'));
        }
    }
    async share(): Promise<void> {
        if (!navigator.share) {
            await this.copy();
            return;
        }
        try {
            await navigator.share({
                title: this.profile()!.name,
                url: 'https://voca.study/learner/' + this.profile()!.user_id,
            });
        } catch (error) {
            if (!(error instanceof DOMException && error.name === 'AbortError'))
                this.message.set(this.label('failed'));
        }
    }
    ngOnDestroy(): void {
        this.generation++;
        this.subscription.unsubscribe();
        this.meta.removeTag('name="robots"');
    }
}
