import {
    Component,
    ChangeDetectionStrategy,
    inject,
    signal,
    effect,
    untracked,
    OnDestroy,
} from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService, SupabaseService, I18nService } from '../../core/services';
import { PaymentService } from '../../core/services/payment.service';
import { ProUpgradeDialogComponent } from '../../components/pro-upgrade-dialog/pro-upgrade-dialog.component';
interface Grant {
    provider: string;
    tier: string;
    expires_at: string | null;
    active: boolean;
}
interface Order {
    order_code: string;
    plan_id: string;
    amount: number;
    status: string;
    created_at: string;
}
@Component({
    selector: 'app-subscription-page',
    standalone: true,
    imports: [RouterLink, DatePipe, DecimalPipe, ProUpgradeDialogComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./account-experience.scss'],
    template: `<main class="experience-page">
        <nav class="experience-nav">
            <a routerLink="/video">{{ label('back') }}</a
            ><a routerLink="/account">{{ label('account') }}</a
            ><a routerLink="/account/subscription" class="active">{{
                label('subscription')
            }}</a>
        </nav>
        <h1>{{ label('subscription') }}</h1>
        @if (!auth.isLoggedIn()) {
            <section class="experience-card">
                <a
                    routerLink="/account"
                    [queryParams]="{ returnTo: '/account/subscription' }"
                    >{{ label('signIn') }}</a
                >
            </section>
        } @else {
            <section class="experience-card">
                <h2>{{ auth.subscriptionTier() }}</h2>
                <p>{{ label('prepaid') }}</p>
                <div class="actions">
                    <button (click)="load()" [disabled]="loading()">
                        {{ label('refresh') }}</button
                    ><button class="primary" (click)="toggleCheckout()">
                        {{ label(checkout() ? 'cancel' : 'renew') }}</button
                    ><a href="mailto:support@voca.study">{{
                        label('support')
                    }}</a>
                </div>
            </section>
            @if (checkout()) {
                <section class="experience-card">
                    <app-pro-upgrade-dialog
                        [allowRenewal]="true"
                        (dismissed)="closeCheckout(); load()"
                    />
                </section>
            }
            @if (failed()) {
                <p class="notice error" role="alert">{{ label('failed') }}</p>
            }
            @if (loading()) {
                <div class="experience-card" aria-busy="true">
                    {{ label('refresh') }}…
                </div>
            }
            @for (grant of grants(); track grant.provider + grant.tier) {
                <section class="experience-card">
                    <h2>{{ source(grant.provider) }} · {{ grant.tier }}</h2>
                    <div class="detail-row">
                        <span>{{ label('status') }}</span
                        ><strong>{{
                            label(grant.active ? 'active' : 'expired')
                        }}</strong>
                    </div>
                    <div class="detail-row">
                        <span>{{ label('expires') }}</span
                        ><strong>{{
                            grant.expires_at
                                ? (grant.expires_at | date: 'mediumDate')
                                : label('unknown')
                        }}</strong>
                    </div>
                    @if (grant.provider === 'revenuecat') {
                        <p>{{ label('storePurchase') }}</p>
                        <div class="actions">
                            <a
                                href="https://apps.apple.com/account/subscriptions"
                                target="_blank"
                                rel="noopener noreferrer"
                                >App Store</a
                            ><a
                                href="https://play.google.com/store/account/subscriptions"
                                target="_blank"
                                rel="noopener noreferrer"
                                >Google Play</a
                            >
                        </div>
                    }
                </section>
            }
            <section class="experience-card">
                <h2>{{ label('history') }}</h2>
                @if (!loading() && !failed() && orders().length === 0) {
                    <p>{{ label('noPurchases') }}</p>
                }
                @for (order of orders(); track order.order_code) {
                    <div class="detail-row">
                        <div>
                            <strong
                                >{{ label('order') }}
                                {{ order.order_code }}</strong
                            >
                            <p>
                                {{ order.plan_id }} ·
                                {{ order.created_at | date: 'mediumDate' }}
                            </p>
                            <a [href]="support(order)">{{
                                label('support')
                            }}</a>
                        </div>
                        <div>
                            {{ order.amount | number }} VND
                            <p>{{ order.status }}</p>
                            @if (order.status === 'PENDING') {
                                <button
                                    (click)="check(order)"
                                    [disabled]="loading()"
                                >
                                    {{ label('refresh') }}
                                </button>
                            }
                        </div>
                    </div>
                }
            </section>
        }
    </main>`,
})
export class SubscriptionPageComponent implements OnDestroy {
    readonly auth = inject(AuthService);
    private readonly supabase = inject(SupabaseService);
    private readonly i18n = inject(I18nService);
    private readonly payment = inject(PaymentService);
    readonly grants = signal<Grant[]>([]);
    readonly orders = signal<Order[]>([]);
    readonly loading = signal(false);
    readonly failed = signal(false);
    readonly checkout = signal(false);
    private generation = 0;
    private lastOwner: string | null | undefined = null;
    private readonly ownerEffect = effect(() => {
        const owner = this.supabase.user()?.id;
        untracked(() => {
            if (owner === this.lastOwner) return;
            this.lastOwner = owner;
            this.payment.clearOrder();
            this.grants.set([]);
            this.orders.set([]);
            this.checkout.set(false);
            void this.load();
        });
    });
    label(key: string): string {
        return this.i18n.t(`accountExperience.${key}`);
    }
    source(provider: string): string {
        return this.label(
            provider === 'payos'
                ? 'webPurchase'
                : provider === 'revenuecat'
                  ? 'storePurchase'
                  : 'legacy',
        );
    }
    support(order: Order): string {
        return (
            'mailto:support@voca.study?subject=' +
            encodeURIComponent('Voca order ' + order.order_code)
        );
    }
    async load(): Promise<void> {
        const generation = ++this.generation,
            session = this.auth.captureSession();
        if (!session.userId) {
            this.loading.set(false);
            return;
        }
        this.loading.set(true);
        this.failed.set(false);
        try {
            const { data, error } = await this.supabase.client.rpc(
                'get_account_subscription_details',
            );
            if (error) throw error;
            if (
                generation !== this.generation ||
                !this.auth.isCurrentSession(session)
            )
                return;
            await this.auth.refreshUser();
            if (
                generation !== this.generation ||
                !this.auth.isCurrentSession(session)
            )
                return;
            this.grants.set(Array.isArray(data?.grants) ? data.grants : []);
            this.orders.set(Array.isArray(data?.orders) ? data.orders : []);
        } catch {
            if (
                generation === this.generation &&
                this.auth.isCurrentSession(session)
            )
                this.failed.set(true);
        } finally {
            if (generation === this.generation) this.loading.set(false);
        }
    }
    toggleCheckout(): void {
        if (this.checkout()) this.closeCheckout();
        else this.checkout.set(true);
    }
    closeCheckout(): void {
        this.checkout.set(false);
        this.payment.clearOrder();
    }
    async check(order: Order): Promise<void> {
        if (this.loading()) return;
        const session = this.auth.captureSession();
        this.loading.set(true);
        try {
            await firstValueFrom(
                this.payment.checkStatus(Number(order.order_code)),
            );
            if (this.auth.isCurrentSession(session)) await this.load();
        } catch {
            if (this.auth.isCurrentSession(session)) this.failed.set(true);
        } finally {
            if (this.auth.isCurrentSession(session)) this.loading.set(false);
        }
    }
    ngOnDestroy(): void {
        this.generation++;
        this.ownerEffect.destroy();
        this.payment.clearOrder();
    }
}
