import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Subject } from 'rxjs';
import { AuthService, I18nService, PaymentService, ToastService } from '../../core/services';
import { TranscriptService } from '../video/transcript.service';

describe('Checkout account isolation', () => {
    let owner: string;
    let logout: Subject<void>;
    let http: HttpTestingController;
    let payment: PaymentService;
    let toast: {error:jasmine.Spy;success:jasmine.Spy};
    beforeEach(() => {
        owner='account-a';logout=new Subject();toast={error:jasmine.createSpy(),success:jasmine.createSpy()};
        TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting(),
            {provide:AuthService,useValue:{logoutEvent:logout,getToken:()=> 'test-token',captureSession:()=>({userId:owner,generation:0}),isCurrentSession:(session:{userId:string})=>session.userId===owner}},
            {provide:ToastService,useValue:toast},{provide:I18nService,useValue:{t:(key:string)=>key}},
            {provide:TranscriptService,useValue:{}},
        ]});
        payment=TestBed.inject(PaymentService);http=TestBed.inject(HttpTestingController);
    });
    afterEach(()=>{payment.clearOrder();http.verify();});
    it('discards a checkout response after account switch and stops the creating state',()=>{
        let result:unknown='pending';payment.createOrder().subscribe(value=>{result=value;});
        const request=http.expectOne('/api/payment/create-order');
        owner='account-b';logout.next();
        request.flush({success:true,orderCode:123,plan:'pro_1m',amount:49000,checkoutUrl:'https://pay.example',qrCode:'test'});
        expect(result).toBeNull();expect(payment.currentOrder()).toBeNull();expect(payment.isCreating()).toBeFalse();expect(toast.success).not.toHaveBeenCalled();
    });
    it('ignores an ambiguous late response after the checkout is dismissed',()=>{
        payment.createOrder().subscribe();const request=http.expectOne('/api/payment/create-order');payment.clearOrder();
        request.flush({success:true,orderCode:456});
        expect(payment.currentOrder()).toBeNull();expect(payment.isCreating()).toBeFalse();
    });
    it('does not display an old account payment error to a different account',()=>{
        payment.createOrder().subscribe();const request=http.expectOne('/api/payment/create-order');owner='account-b';logout.next();
        request.flush({error:'old-account-error'},{status:500,statusText:'Failure'});
        expect(toast.error).not.toHaveBeenCalled();expect(payment.currentOrder()).toBeNull();
    });
});
