import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
    ActivatedRoute,
    convertToParamMap,
    provideRouter,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService, I18nService } from '../../core/services';
import { LearnerPageComponent } from './learner-page.component';

describe('Shared learner route', () => {
    const id = '1f68cd12-df07-4d85-8000-123456789abc';
    let route: {
        paramMap: BehaviorSubject<ReturnType<typeof convertToParamMap>>;
        snapshot: { paramMap: ReturnType<typeof convertToParamMap> };
    };
    let rpc: jasmine.Spy;
    beforeEach(() => {
        route = {
            paramMap: new BehaviorSubject(convertToParamMap({ userId: id })),
            snapshot: { paramMap: convertToParamMap({ userId: id }) },
        };
        rpc = jasmine.createSpy().and.resolveTo({ data: null, error: null });
        TestBed.configureTestingModule({
            imports: [LearnerPageComponent],
            providers: [
                provideRouter([]),
                { provide: ActivatedRoute, useValue: route },
                { provide: SupabaseService, useValue: { client: { rpc } } },
                { provide: I18nService, useValue: { t: (key: string) => key, currentLanguage: signal('en') } },
            ],
        });
    });
    it('shows an unavailable state for private or deleted profiles', async () => {
        const fixture = TestBed.createComponent(LearnerPageComponent);
        await fixture.whenStable();
        fixture.detectChanges();
        expect(rpc).toHaveBeenCalledWith('get_shared_learner_profile', {
            p_user_id: id,
        });
        expect(fixture.componentInstance.profile()).toBeNull();
        expect(fixture.nativeElement.textContent).toContain(
            'accountExperience.unavailable',
        );
        fixture.destroy();
    });
    it('shows retry for a transport failure rather than claiming the profile is private', async () => {
        rpc.and.resolveTo({ data: null, error: new Error('offline') });
        const fixture = TestBed.createComponent(LearnerPageComponent);
        await fixture.whenStable();
        fixture.detectChanges();
        expect(fixture.componentInstance.failed()).toBeTrue();
        expect(fixture.nativeElement.textContent).toContain(
            'accountExperience.retry',
        );
        fixture.destroy();
    });
    it('rejects a late response from the previous learner', async () => {
        let resolve!: (value: unknown) => void;
        rpc.and.returnValue(
            new Promise((r) => {
                resolve = r;
            }),
        );
        const fixture = TestBed.createComponent(LearnerPageComponent);
        route.snapshot.paramMap = convertToParamMap({
            userId: 'not-a-valid-id',
        });
        route.paramMap.next(route.snapshot.paramMap);
        resolve({
            data: { user_id: id, is_public: true, name: 'Previous learner' },
            error: null,
        });
        await fixture.whenStable();
        expect(fixture.componentInstance.profile()).toBeNull();
        fixture.destroy();
    });
    it('allows only HTTPS and known local avatar paths for images', () => {
        const fixture = TestBed.createComponent(LearnerPageComponent);
        expect(
            fixture.componentInstance.safeImage('javascript:alert(1)'),
        ).toBeNull();
        expect(
            fixture.componentInstance.safeImage('file:///private/image.jpg'),
        ).toBeNull();
        expect(
            fixture.componentInstance.safeImage(
                'https://images.example/avatar.png',
            ),
        ).not.toBeNull();
        fixture.destroy();
    });
    it('updates public learner metadata with the UI locale and falls back after an avatar fails', async () => {
        rpc.and.resolveTo({ data: {
            user_id: id, is_public: true, name: 'Haruka', avatar_url: 'https://images.example/avatar.png',
            country: 'JP', target_lang: 'ja', bio: '', level: 12, current_streak: 18,
            total_videos_watched: 1234, pinned_stamps: [],
        }, error: null });
        const fixture = TestBed.createComponent(LearnerPageComponent);
        await fixture.whenStable();
        const page = fixture.componentInstance;
        expect(page.learner()?.details).toBe('Japan · Japanese');
        TestBed.inject(I18nService).currentLanguage.set('ja');
        expect(page.learner()?.details).toBe('日本 · 日本語');
        page.avatarImgFailed.set(true);
        fixture.detectChanges();
        expect(page.learner()?.avatar).toBeNull();
        expect(fixture.nativeElement.querySelector('.profile-avatar--fallback')).not.toBeNull();
        expect(page.appUrl()).toBe('voca://learner/' + id);
        fixture.destroy();
    });

});
