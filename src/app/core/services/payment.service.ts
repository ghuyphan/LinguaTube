import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, tap, catchError, of, interval, switchMap, takeWhile, takeUntil, timer } from 'rxjs';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
import { I18nService } from './i18n.service';
import { TranscriptService } from '../../features/video/transcript.service';

export interface PaymentOrder {
  orderCode: number;
  plan: string;
  amount: number;
  description?: string;
  accountNumber?: string;
  accountName?: string;
  bin?: string;
  bankName?: string;
  checkoutUrl: string;
  qrCode: string;
  isMock?: boolean;
}

export interface PaymentStatus {
  success: boolean;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  processedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private toast = inject(ToastService);
  private auth = inject(AuthService);
  private transcript = inject(TranscriptService);
  private i18n = inject(I18nService);

  private pollingSub: Subscription | null = null;
  readonly isCreating = signal(false);
  readonly currentOrder = signal<PaymentOrder | null>(null);
  readonly isPaid = signal(false);

  createOrder(planId: string = 'pro_1m'): Observable<PaymentOrder | null> {
    const token = this.auth.getToken();
    if (!token) {
      this.toast.error(this.i18n.t('pro.signInToUpgradePrompt'));
      return of(null);
    }

    this.isCreating.set(true);
    this.isPaid.set(false);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const returnUrl = typeof window !== 'undefined' ? window.location.href : 'https://voca.study/video';

    return this.http.post<{ success: boolean } & PaymentOrder>(
      '/api/payment/create-order',
      { planId, returnUrl, cancelUrl: returnUrl },
      { headers }
    ).pipe(
      tap(res => {
        this.isCreating.set(false);
        if (res && res.success) {
          this.currentOrder.set(res);
          this.pollOrderStatus(res.orderCode);
        }
      }),
      catchError(err => {
        this.isCreating.set(false);
        const errorMsg = err.error?.error || err.error?.message || this.i18n.t('pro.createOrderFailed');
        this.toast.error(errorMsg);
        return of(null);
      })
    );
  }

  checkStatus(orderCode: number): Observable<PaymentStatus> {
    return this.http.get<PaymentStatus>(`/api/payment/check-status?orderCode=${orderCode}`);
  }

  simulateTransfer(orderCode: number): void {
    this.http.post<{ success: boolean }>('/api/payment/simulate-transfer', { orderCode }).subscribe({
      next: () => {
        this.isPaid.set(true);
        this.toast.success(this.i18n.t('pro.paymentSuccess'));
        this.transcript.refreshDiamonds();
        this.auth.refreshUser();
      },
      error: () => {}
    });
  }

  private pollOrderStatus(orderCode: number): void {
    this.pollingSub?.unsubscribe();
    this.pollingSub = interval(3000).pipe(
      takeWhile(() => !this.isPaid() && this.currentOrder()?.orderCode === orderCode),
      takeUntil(timer(10 * 60 * 1000)), // Max 10 minutes timeout to prevent zombie polling
      switchMap(() => this.checkStatus(orderCode).pipe(
        catchError(err => {
          console.warn('[PaymentService] Status check transient error, retrying:', err);
          return of<PaymentStatus>({ success: false, status: 'PENDING' });
        })
      ))
    ).subscribe({
      next: res => {
        if (res.status === 'PAID') {
          this.isPaid.set(true);
          this.toast.success(this.i18n.t('pro.paymentSuccess'));
          this.transcript.refreshDiamonds();
          this.auth.refreshUser();
        }
      },
      error: () => {}
    });
  }

  clearOrder(): void {
    this.pollingSub?.unsubscribe();
    this.pollingSub = null;
    this.currentOrder.set(null);
    this.isPaid.set(false);
  }
}
