import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import {
    ActivatedRoute,
    convertToParamMap,
    provideRouter,
} from '@angular/router';
import { AuthService, I18nService, SupabaseService } from '../../core/services';
import { AccountPageComponent } from './account-page.component';

describe('Account mutations', () => {
    let owner: string;
    let generation: number;
    let updateUser: jasmine.Spy;
    beforeEach(() => {
        owner = 'account-a';
        generation = 1;
        updateUser = jasmine.createSpy().and.resolveTo({ error: null });
        TestBed.configureTestingModule({
            imports: [AccountPageComponent],
            providers: [
                provideRouter([]),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            data: {},
                            queryParamMap: convertToParamMap({}),
                        },
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        user: signal(null),
                        isLoggedIn: () => false,
                        captureSession: () => ({ userId: owner, generation }),
                        isCurrentSession: (session: {
                            userId: string;
                            generation: number;
                        }) =>
                            session.userId === owner &&
                            session.generation === generation,
                    },
                },
                {
                    provide: SupabaseService,
                    useValue: {
                        user: signal(null),
                        client: { auth: { updateUser } },
                    },
                },
                { provide: I18nService, useValue: { t: (key: string) => key } },
            ],
        });
    });
    it('does not submit mismatched password confirmation', async () => {
        const fixture = TestBed.createComponent(AccountPageComponent),
            page = fixture.componentInstance;
        page.password = 'long-enough-password';
        page.confirmation = 'different-password';
        await page.updatePassword();
        expect(updateUser).not.toHaveBeenCalled();
        fixture.destroy();
    });
    it('does not publish an old email-change result into another account', async () => {
        let resolve!: (value: { error: null }) => void;
        updateUser.and.returnValue(
            new Promise((r) => {
                resolve = r;
            }),
        );
        const fixture = TestBed.createComponent(AccountPageComponent),
            page = fixture.componentInstance;
        fixture.detectChanges();
        page.email = 'first@example.com';
        const pending = page.updateEmail();
        owner = 'account-b';
        generation++;
        page.email = 'second@example.com';
        page.message.set('new-account-message');
        resolve({ error: null });
        await pending;
        expect(page.email).toBe('second@example.com');
        expect(page.message()).toBe('new-account-message');
        fixture.destroy();
    });
    it('preserves the entered email and reports an error when confirmation cannot be sent', async () => {
        updateUser.and.resolveTo({ error: new Error('transport failure') });
        const fixture = TestBed.createComponent(AccountPageComponent),
            page = fixture.componentInstance;
        fixture.detectChanges();
        page.email = 'first@example.com';
        await page.updateEmail();
        expect(page.email).toBe('first@example.com');
        expect(page.error()).toBeTrue();
        expect(page.busy()).toBeFalse();
        fixture.destroy();
    });
    it('does not load profile visibility or account sessions while recovering a password', () => {
        const rpc = jasmine.createSpy('rpc'), from = jasmine.createSpy('from');
        TestBed.overrideProvider(ActivatedRoute, { useValue: {
            snapshot: { data: { recovery: true }, queryParamMap: convertToParamMap({}) },
        } });
        TestBed.overrideProvider(SupabaseService, { useValue: {
            user: signal({ id: 'account-a' }), client: { rpc, from },
        } });
        const fixture = TestBed.createComponent(AccountPageComponent);
        fixture.detectChanges();
        expect(rpc).not.toHaveBeenCalled();
        expect(from).not.toHaveBeenCalled();
        expect(fixture.componentInstance.sessionsLoading()).toBeFalse();
        fixture.destroy();
    });

    it('restores the shared visibility switch when the server rejects a visibility change', async () => {
        const single = jasmine.createSpy('single').and.resolveTo({ data: null, error: new Error('offline') });
        TestBed.overrideProvider(SupabaseService, { useValue: {
            user: signal(null),
            client: { from: () => ({ update: () => ({ eq: () => ({ select: () => ({ single }) }) }) }) },
        } });
        TestBed.overrideProvider(AuthService, { useValue: {
            user: signal({ name: 'Haruka' }), isLoggedIn: () => true,
            getUserId: () => owner,
            captureSession: () => ({ userId: owner, generation }),
            isCurrentSession: (session: { userId: string; generation: number }) => session.userId === owner && session.generation === generation,
        } });
        const fixture = TestBed.createComponent(AccountPageComponent);
        fixture.detectChanges();
        fixture.componentInstance.profileReady.set(true);
        fixture.detectChanges();
        const input: HTMLInputElement = fixture.nativeElement.querySelector('app-switch input');
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();
        expect(single).toHaveBeenCalledTimes(1);
        expect(fixture.componentInstance.error()).toBeTrue();
        expect(fixture.componentInstance.isPublic()).toBeFalse();
        expect(input.checked).toBeFalse();
        fixture.destroy();
    });

});
