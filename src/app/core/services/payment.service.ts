import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of, interval, switchMap, takeWhile } from 'rxjs';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';
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

  readonly isCreating = signal(false);
  readonly currentOrder = signal<PaymentOrder | null>(null);
  readonly isPaid = signal(false);

  createOrder(planId: string = 'pro_1m'): Observable<PaymentOrder | null> {
    const token = this.auth.getToken();
    if (!token) {
      this.toast.error('Please sign in to upgrade your subscription');
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
        const errorMsg = err.error?.error || err.error?.message || 'Failed to create payment order';
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
        this.toast.success('Upgrade successful! Enjoy Voca Pro.');
        this.transcript.refreshDiamonds();
        this.auth.refreshUser();
      },
      error: () => {}
    });
  }

  private pollOrderStatus(orderCode: number): void {
    interval(3000).pipe(
      takeWhile(() => !this.isPaid() && this.currentOrder()?.orderCode === orderCode),
      switchMap(() => this.checkStatus(orderCode))
    ).subscribe({
      next: res => {
        if (res.status === 'PAID') {
          this.isPaid.set(true);
          this.toast.success('Upgrade successful! Enjoy Voca Pro.');
          this.transcript.refreshDiamonds();
          this.auth.refreshUser();
        }
      },
      error: () => {}
    });
  }

  clearOrder(): void {
    this.currentOrder.set(null);
    this.isPaid.set(false);
  }
}
