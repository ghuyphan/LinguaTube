import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    computed,
    effect,
    untracked,
    OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocaleDatePipe } from '../../shared/pipes/locale-format.pipe';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, SupabaseService, I18nService } from '../../core/services';
import type { UserIdentity } from '@supabase/supabase-js';
@Component({
    selector: 'app-account-page',
    standalone: true,
    imports: [PanelComponent, SwitchComponent, FormsModule, RouterLink, LocaleDatePipe, IconComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./account-experience.scss'],
    templateUrl: './account-page.component.html',
})
export class AccountPageComponent implements OnDestroy {
    readonly auth = inject(AuthService);
    readonly supabase = inject(SupabaseService);
    readonly i18n = inject(I18nService);
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    readonly recovery = this.route.snapshot.data['recovery'] === true;
    readonly busy = signal(false);
    readonly message = signal('');
    readonly error = signal(false);
    readonly sessionsLoading = signal(false);
    readonly sessions = signal<
        { id: string; created_at: string | null; is_current: boolean }[]
    >([]);
    readonly isPublic = signal(false);
    readonly profileReady = signal(false);
    email = '';
    password = '';
    confirmation = '';
    deleteConfirmation = '';
    private disposed = false;
    private readonly ownerEffect = effect(() => {
        const user = this.supabase.user();
        untracked(() => {
            this.email = '';
            this.password = '';
            this.confirmation = '';
            this.deleteConfirmation = '';
            this.message.set('');
            this.profileReady.set(false);
            this.isPublic.set(false);
            this.sessions.set([]);
            this.sessionsLoading.set(false);
            if (user && !this.recovery) {
                void this.loadVisibility(user.id).catch(() => {
                    if (
                        !this.disposed &&
                        this.supabase.user()?.id === user.id
                    ) {
                        this.error.set(true);
                        this.message.set(this.label('failed'));
                    }
                });
                void this.loadSessions();
            }
        });
    });
    label(key: string): string {
        return this.i18n.t(`accountExperience.${key}`);
    }
    readonly providers = computed(() => {
        const names = new Set(this.supabase.user()?.identities?.map(identity =>
            identity.provider === 'email' ? this.i18n.t('accountExperience.email') :
            identity.provider === 'google' ? 'Google' : identity.provider,
        ) || []);
        return [...names].join(', ');
    });
    private async loadSessions(): Promise<void> {
        const session = this.auth.captureSession();
        this.sessionsLoading.set(true);
        try {
            const { data, error } = await this.supabase.client.rpc(
                'get_account_sessions',
            );
            if (this.disposed || !this.auth.isCurrentSession(session)) return;
            if (error) throw error;
            this.sessions.set(Array.isArray(data) ? data : []);
        } catch {
            if (!this.disposed && this.auth.isCurrentSession(session)) {
                this.error.set(true);
                this.message.set(this.label('failed'));
            }
        } finally {
            if (!this.disposed && this.auth.isCurrentSession(session)) this.sessionsLoading.set(false);
        }
    }
    private async loadVisibility(id: string): Promise<void> {
        const session = this.auth.captureSession();
        const { data, error } = await this.supabase.client
            .from('profiles')
            .select('is_public')
            .eq('id', id)
            .single();
        if (this.disposed || !this.auth.isCurrentSession(session)) return;
        if (error) {
            this.error.set(true);
            this.message.set(this.label('failed'));
            return;
        }
        this.isPublic.set(data.is_public === true);
        this.profileReady.set(true);
    }
    private async run(
        action: () => Promise<void>,
        message = 'success',
    ): Promise<void> {
        if (this.busy()) return;
        const session = this.auth.captureSession();
        this.busy.set(true);
        this.error.set(false);
        this.message.set('');
        try {
            await action();
            if (!this.disposed && this.auth.isCurrentSession(session))
                this.message.set(this.label(message));
        } catch {
            if (!this.disposed && this.auth.isCurrentSession(session)) {
                this.error.set(true);
                this.message.set(this.label('failed'));
            }
        } finally {
            if (!this.disposed) this.busy.set(false);
        }
    }
    readonly hasGoogle = computed(() => this.supabase.user()?.identities?.some(identity => identity.provider === 'google') === true);
    async connectGoogle(): Promise<void> {
        await this.run(async () => {
            const { error } = await this.supabase.client.auth.linkIdentity({
                provider: 'google',
                options: { redirectTo: window.location.origin + '/account' },
            });
            if (error) throw error;
        });
    }
    async disconnect(identity: UserIdentity): Promise<void> {
        const session = this.auth.captureSession();
        if ((this.supabase.user()?.identities?.length || 0) < 2) return;
        await this.run(async () => {
            const { error } =
                await this.supabase.client.auth.unlinkIdentity(identity);
            if (error) throw error;
            if (!this.auth.isCurrentSession(session)) return;
            const response = await this.supabase.client.auth.getUser();
            if (response.error) throw response.error;
            if (this.auth.isCurrentSession(session))
                this.supabase.user.set(response.data.user);
        });
    }
    private async returnAfterLogin(): Promise<void> {
        if (
            this.supabase.user() &&
            this.route.snapshot.queryParamMap.get('returnTo') ===
                '/account/subscription'
        )
            await this.router.navigate(['/account/subscription']);
    }
    async google(): Promise<void> {
        await this.run(async () => {
            await this.auth.loginWithGoogle();
        });
        await this.returnAfterLogin();
    }
    async login(): Promise<void> {
        await this.run(async () => {
            const { error } =
                await this.supabase.client.auth.signInWithPassword({
                    email: this.email.trim(),
                    password: this.password,
                });
            if (error) throw error;
            this.password = '';
        });
        await this.returnAfterLogin();
    }
    async reset(): Promise<void> {
        const email = this.supabase.user()?.email || this.email.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.error.set(true);
            this.message.set(this.label('failed'));
            return;
        }
        await this.run(async () => {
            const { error } =
                await this.supabase.client.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/account/recovery',
                });
            if (error) throw error;
        }, 'pending');
    }
    async updateEmail(): Promise<void> {
        const session = this.auth.captureSession();
        await this.run(async () => {
            const { error } = await this.supabase.client.auth.updateUser({
                email: this.email.trim(),
            });
            if (error) throw error;
            if (this.auth.isCurrentSession(session)) this.email = '';
        }, 'pending');
    }
    async updatePassword(): Promise<void> {
        const session = this.auth.captureSession();
        if (this.password.length < 6 || this.password !== this.confirmation)
            return;
        await this.run(async () => {
            const { error } = await this.supabase.client.auth.updateUser({
                password: this.password,
            });
            if (error) throw error;
            if (this.auth.isCurrentSession(session)) {
                this.password = '';
                this.confirmation = '';
            }
        });
        if (
            this.recovery &&
            !this.error() &&
            this.auth.isCurrentSession(session)
        )
            await this.router.navigate(['/account'], { replaceUrl: true });
    }
    async setVisibility(value: boolean): Promise<void> {
        const session = this.auth.captureSession();
        const id = this.auth.getUserId();
        if (!id) return;
        await this.run(async () => {
            const { data, error } = await this.supabase.client
                .from('profiles')
                .update({ is_public: value })
                .eq('id', id)
                .select('id')
                .single();
            if (error || !data) throw error || new Error('Missing profile');
            if (this.auth.isCurrentSession(session)) this.isPublic.set(value);
        });
    }
    async share(): Promise<void> {
        const id = this.auth.getUserId();
        if (!id || !this.isPublic()) return;
        const url = 'https://voca.study/learner/' + id;
        if (navigator.share) {
            try {
                await navigator.share({ url });
            } catch (error) {
                if (
                    !(
                        error instanceof DOMException &&
                        error.name === 'AbortError'
                    )
                ) {
                    this.error.set(true);
                    this.message.set(this.label('failed'));
                }
            }
        } else
            await this.run(async () => {
                await navigator.clipboard.writeText(url);
            }, 'copied');
    }
    async signOutAll(): Promise<void> {
        await this.run(async () => {
            const { error } = await this.supabase.client.auth.signOut({
                scope: 'global',
            });
            if (error) throw error;
            await this.auth.signOut();
        });
    }
    async deleteAccount(): Promise<void> {
        if (this.deleteConfirmation !== 'DELETE') return;
        await this.run(async () => {
            const { error } = await this.supabase.client.rpc(
                'delete_user_account',
            );
            if (error) throw error;
            await this.auth.signOut();
        });
    }
    ngOnDestroy(): void {
        this.disposed = true;
        this.ownerEffect.destroy();
    }
}
