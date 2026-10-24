import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProUpgradeDialogComponent } from '../../components/pro-upgrade-dialog/pro-upgrade-dialog.component';
import {
    AuthService,
    I18nService,
    PaymentService,
    ToastService,
} from '../../core/services';
import { TranscriptService } from '../video/transcript.service';

describe('Fixed-term web subscription renewal', () => {
    for (const tier of ['pro', 'premium']) {
        it(`allows an active ${tier} subscriber to create a renewal order`, async () => {
            const createOrder = jasmine.createSpy().and.returnValue(of(null));
            await TestBed.configureTestingModule({
                imports: [ProUpgradeDialogComponent],
                providers: [
                    {
                        provide: AuthService,
                        useValue: {
                            subscriptionTier: () => tier,
                            isLoggedIn: () => true,
                            isLoggingIn: () => false,
                            user: () => ({ name: 'Learner' }),
                        },
                    },
                    {
                        provide: I18nService,
                        useValue: { t: (key: string) => key },
                    },
                    {
                        provide: PaymentService,
                        useValue: {
                            currentOrder: () => null,
                            isPaid: () => false,
                            isCreating: () => false,
                            createOrder,
                            stopPolling: () => undefined,
                            clearOrder: () => undefined,
                        },
                    },
                    { provide: ToastService, useValue: {} },
                    { provide: TranscriptService, useValue: {} },
                ],
            }).compileComponents();
            const fixture = TestBed.createComponent(ProUpgradeDialogComponent);
            fixture.componentRef.setInput('allowRenewal', true);
            fixture.detectChanges();
            expect(fixture.componentInstance.selectedTier()).toBe(tier);
            const button = fixture.nativeElement.querySelector(
                '.dialog-actions-sticky .btn-upgrade-cta',
            ) as HTMLButtonElement;
            expect(button).not.toBeNull();
            expect(button.disabled).toBeFalse();
            button.click();
            expect(createOrder).toHaveBeenCalledOnceWith(tier + '_1m');
            fixture.destroy();
        });
    }
});
