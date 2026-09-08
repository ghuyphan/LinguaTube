import { Component, ChangeDetectionStrategy, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { I18nService, AuthService, PaymentService, ToastService } from '../../core/services';
import { TranscriptService } from '../../features/video/transcript.service';

export type ProPlanType = 'pro_1m' | 'pro_1y';

interface ProPlanOption {
    id: ProPlanType;
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
export class ProUpgradeDialogComponent {
    readonly i18n = inject(I18nService);
    readonly auth = inject(AuthService);
    readonly payment = inject(PaymentService);
    readonly transcript = inject(TranscriptService);
    private toast = inject(ToastService);

    dismissed = output<void>();

    readonly selectedPlan = signal<ProPlanType>('pro_1m');
    readonly copiedField = signal<string | null>(null);

    readonly plans: ProPlanOption[] = [
        {
            id: 'pro_1m',
            nameKey: 'pro.planMonthly',
            priceFormatted: '49.000 đ',
            periodKey: 'pro.perMonth',
            amount: 49000
        },
        {
            id: 'pro_1y',
            nameKey: 'pro.planAnnual',
            priceFormatted: '490.000 đ',
            periodKey: 'pro.perYear',
            monthlyEquivKey: 'pro.annualMonthlyEquiv',
            badgeKey: 'pro.save17',
            amount: 490000
        }
    ];

    readonly activePlan = computed(() =>
        this.plans.find(p => p.id === this.selectedPlan()) || this.plans[0]
    );

    readonly isProOrPremium = computed(() => {
        const tier = this.auth.subscriptionTier();
        return tier === 'pro' || tier === 'premium';
    });

    selectPlan(planId: ProPlanType): void {
        this.selectedPlan.set(planId);
    }

    startUpgrade(): void {
        if (!this.auth.isLoggedIn()) {
            this.toast.show(this.i18n.t('auth.signInRequired') || 'Please sign in to upgrade', { type: 'warning' });
            return;
        }
        this.payment.createOrder(this.selectedPlan()).subscribe();
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
