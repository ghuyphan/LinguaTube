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
import { LocaleDatePipe, LocaleNumberPipe } from '../../shared/pipes/locale-format.pipe';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { PanelComponent } from '../../shared/components/panel/panel.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService, SupabaseService, I18nService } from '../../core/services';
import { PaymentService } from '../../core/services/payment.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
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
    imports: [PanelComponent, BottomSheetComponent, RouterLink, LocaleDatePipe, LocaleNumberPipe, IconComponent, ProUpgradeDialogComponent, EmptyStateComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./account-experience.scss'],
    templateUrl: './subscription-page.component.html',
})
export class SubscriptionPageComponent implements OnDestroy {
    readonly auth = inject(AuthService);
    private readonly supabase = inject(SupabaseService);
    readonly i18n = inject(I18nService);
    private readonly payment = inject(PaymentService);
    readonly grants = signal<Grant[]>([]);
    readonly orders = signal<Order[]>([]);
    readonly loading = signal(false);
    readonly failed = signal(false);
    readonly checkout = signal(false);
    readonly tierName = computed(() => this.tierLabel(this.auth.subscriptionTier()));
    readonly displayGrants = computed(() => this.grants().map(grant => ({
        ...grant, tierLabel: this.tierLabel(grant.tier), sourceLabel: this.source(grant.provider),
    })));
    readonly displayOrders = computed(() => {
        const plans: Record<string, string> = {
            pro_1m: 'pro.planMonthly', pro_1y: 'pro.planAnnual',
            premium_1m: 'pro.planPremiumMonthly', premium_1y: 'pro.planPremiumAnnual',
        };
        const statuses: Record<string, string> = {
            PENDING: 'paymentPending', PAID: 'paymentPaid', CANCELLED: 'paymentCancelled',
            EXPIRED: 'expired', PROCESSING: 'paymentProcessing', FAILED: 'paymentFailed',
        };
        return this.orders().map(order => ({
            ...order,
            planLabel: plans[order.plan_id] ? this.i18n.t(plans[order.plan_id]) : this.label('unknownPlan'),
            statusLabel: this.label(statuses[order.status] || 'unknownStatus'),
            supportUrl: this.support(order),
        }));
    });
    private tierLabel(tier: string): string {
        return tier === 'pro' ? this.i18n.t('pro.tabPro') :
            tier === 'premium' ? this.i18n.t('pro.tabPremium') :
            this.label(tier === 'free' ? 'freePlan' : 'unknownPlan');
    }
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
