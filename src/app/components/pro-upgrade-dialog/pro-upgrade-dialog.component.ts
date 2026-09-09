import { Component, ChangeDetectionStrategy, inject, signal, computed, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { I18nService, AuthService, PaymentService, ToastService } from '../../core/services';
import { TranscriptService } from '../../features/video/transcript.service';

export type PlanTier = 'pro' | 'premium';
export type ProPlanType = 'pro_1m' | 'pro_1y' | 'premium_1m' | 'premium_1y';

export interface PlanOption {
    id: ProPlanType;
    tier: PlanTier;
    nameKey: string;
    priceFormatted: string;
    periodKey: string;
    monthlyEquivKey?: string;
    badgeKey?: string;
    amount: number;
}

@Component({
    selector: 'app-pro-upgrade-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './pro-upgrade-dialog.component.html',
    styleUrls: ['./pro-upgrade-dialog.component.scss']
})
export class ProUpgradeDialogComponent implements OnInit, OnDestroy {
    readonly i18n = inject(I18nService);
    readonly auth = inject(AuthService);
    readonly payment = inject(PaymentService);
    readonly transcript = inject(TranscriptService);
    private toast = inject(ToastService);

    dismissed = output<void>();

    readonly selectedTier = signal<PlanTier>('pro');
    readonly selectedPlan = signal<ProPlanType>('pro_1m');
    readonly copiedField = signal<string | null>(null);

    readonly allPlans: PlanOption[] = [
        {
            id: 'pro_1m',
            tier: 'pro',
            nameKey: 'pro.planMonthly',
            priceFormatted: '49.000 đ',
            periodKey: 'pro.perMonth',
            amount: 49000
        },
        {
            id: 'pro_1y',
            tier: 'pro',
            nameKey: 'pro.planAnnual',
            priceFormatted: '450.000 đ',
            periodKey: 'pro.perYear',
            monthlyEquivKey: 'pro.annualMonthlyEquiv',
            badgeKey: 'pro.save23',
            amount: 450000
        },
        {
            id: 'premium_1m',
            tier: 'premium',
            nameKey: 'pro.planPremiumMonthly',
            priceFormatted: '119.000 đ',
            periodKey: 'pro.perMonth',
            amount: 119000
        },
        {
            id: 'premium_1y',
            tier: 'premium',
            nameKey: 'pro.planPremiumAnnual',
            priceFormatted: '990.000 đ',
            periodKey: 'pro.perYear',
            monthlyEquivKey: 'pro.premiumAnnualMonthlyEquiv',
            badgeKey: 'pro.save30',
            amount: 990000
        }
    ];

    readonly visiblePlans = computed(() =>
        this.allPlans.filter(p => p.tier === this.selectedTier())
    );

    readonly activePlan = computed(() =>
        this.allPlans.find(p => p.id === this.selectedPlan()) || this.visiblePlans()[0]
    );

    readonly userTier = computed(() => this.auth.subscriptionTier());
    readonly isPro = computed(() => this.userTier() === 'pro');
    readonly isPremium = computed(() => this.userTier() === 'premium');

    ngOnInit(): void {
        // If user is already Pro, open directly on Premium tab for easy upgrade
        if (this.isPro()) {
            this.selectedTier.set('premium');
            this.selectedPlan.set('premium_1m');
        }
    }

    ngOnDestroy(): void {
        this.payment.clearOrder();
    }

    setTier(tier: PlanTier): void {
        this.selectedTier.set(tier);
        if (tier === 'pro') {
            this.selectedPlan.set('pro_1m');
        } else {
            this.selectedPlan.set('premium_1m');
        }
    }

    selectPlan(planId: ProPlanType): void {
        this.selectedPlan.set(planId);
    }

    readonly isLoggingIn = computed(() => this.auth.isLoggingIn());
    readonly isLoggedIn = computed(() => this.auth.isLoggedIn());
    readonly user = computed(() => this.auth.user());

    async startUpgrade(): Promise<void> {
        if (!this.auth.isLoggedIn()) {
            try {
                const profile = await this.auth.loginWithGoogle();
                if (profile) {
                    this.toast.show(this.i18n.t('auth.signedInAs', { name: profile.name }) || `Signed in as ${profile.name}`, { type: 'success', icon: 'check-circle' });
                    this.payment.createOrder(this.selectedPlan()).subscribe();
                }
            } catch (error) {
                console.error('[ProUpgrade] Google login error:', error);
                this.toast.show(this.i18n.t('auth.signInFailed') || 'Sign in failed. Please try again.', { type: 'error', icon: 'alert-circle' });
            }
            return;
        }
        this.payment.createOrder(this.selectedPlan()).subscribe();
    }

    async loginWithGoogle(): Promise<void> {
        try {
            const profile = await this.auth.loginWithGoogle();
            if (profile) {
                this.toast.show(this.i18n.t('auth.signedInAs', { name: profile.name }) || `Signed in as ${profile.name}`, { type: 'success', icon: 'check-circle' });
            }
        } catch (error) {
            console.error('[ProUpgrade] Google login error:', error);
            this.toast.show(this.i18n.t('auth.signInFailed') || 'Sign in failed. Please try again.', { type: 'error', icon: 'alert-circle' });
        }
    }

    async switchAccount(): Promise<void> {
        await this.auth.signOut();
        await this.loginWithGoogle();
    }

    cancelOrder(): void {
        this.payment.clearOrder();
    }

    copyText(text: string, fieldKey: string): void {
        if (!text) return;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.copiedField.set(fieldKey);
                this.toast.show(this.i18n.t('pro.copied') || 'Copied to clipboard', { type: 'success', duration: 2000 });
                setTimeout(() => {
                    if (this.copiedField() === fieldKey) {
                        this.copiedField.set(null);
                    }
                }, 2000);
            }).catch(() => {
                this.fallbackCopy(text, fieldKey);
            });
        } else {
            this.fallbackCopy(text, fieldKey);
        }
    }

    private fallbackCopy(text: string, fieldKey: string): void {
        try {
            const input = document.createElement('textarea');
            input.value = text;
            input.style.position = 'fixed';
            input.style.opacity = '0';
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            this.copiedField.set(fieldKey);
            this.toast.show(this.i18n.t('pro.copied') || 'Copied to clipboard', { type: 'success', duration: 2000 });
            setTimeout(() => {
                if (this.copiedField() === fieldKey) {
                    this.copiedField.set(null);
                }
            }, 2000);
        } catch { }
    }

    simulateTransfer(orderCode: number): void {
        this.payment.simulateTransfer(orderCode);
    }

    openCheckoutUrl(url?: string): void {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
}
