import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { OfflineGamificationRepository } from './offline-gamification.repository';
import { OfflineStreakRepository } from './offline-streak.repository';
import { AuthService } from '../services/auth.service';
import { SupabaseService } from '../services/supabase.service';
import { StorageService } from '../services/storage.service';
import { GamificationService } from '../services/gamification.service';
import { StreakService } from '../../services/streak.service';

describe('Authoritative freeze purchasing', () => {
    let owner: string | null;
    let generation: number;
    let stored: Map<string, unknown>;
    let repo: OfflineGamificationRepository;
    let rpc: jasmine.Spy;
    let auth: { isLoggedIn(): boolean; getUserId(): string | null; captureSession(): {userId: string | null; generation: number}; isCurrentSession(s: {userId: string | null; generation: number}): boolean; loginEvent: Subject<void>; logoutEvent: Subject<void> };
    beforeEach(() => {
        owner = null; generation = 0; stored = new Map();
        auth = { isLoggedIn: () => owner !== null, getUserId: () => owner,
            captureSession: () => ({userId: owner, generation}), isCurrentSession: s => s.userId === owner && s.generation === generation,
            loginEvent: new Subject(), logoutEvent: new Subject() };
        rpc = jasmine.createSpy('rpc').and.resolveTo({ data: {success:true,new_xp:350,freezes_remaining:1}, error:null });
        TestBed.configureTestingModule({ providers: [OfflineGamificationRepository,
            {provide:AuthService,useValue:auth},
            {provide:StorageService,useValue:{get:(key:string)=>stored.get(key) ?? null,set:(key:string,value:unknown)=>{stored.set(key,value);return true;},remove:(key:string)=>stored.delete(key)}},
            {provide:SupabaseService,useValue:{client:{rpc},reconnectEvent:new Subject()}}
        ]});
        repo = TestBed.inject(OfflineGamificationRepository); owner = 'user-a';
    });
    it('shares duplicate taps and makes one RPC for XP and freeze fulfillment', async () => {
        let resolve!: (value: {data:{success:boolean;new_xp:number;freezes_remaining:number};error:null})=>void;
        rpc.and.returnValue(new Promise(r=>{resolve=r;}));
        const first=repo.purchaseFreeze(), second=repo.purchaseFreeze();
        expect(first).toBe(second);expect(rpc.calls.count()).toBe(1);
        resolve({data:{success:true,new_xp:350,freezes_remaining:1},error:null});
        expect((await first).freezes_remaining).toBe(1);expect(repo.state().xp).toBe(350);
    });
    it('retains a lost acknowledgement and reuses the operation after repository restart', async () => {
        rpc.and.resolveTo({data:null,error:{message:'connection lost'}});
        expect((await repo.purchaseFreeze()).success).toBeFalse();
        const first=rpc.calls.mostRecent().args[1].p_operation_id;
        owner=null; repo=TestBed.runInInjectionContext(()=>new OfflineGamificationRepository()); owner='user-a';
        rpc.and.resolveTo({data:{success:true,new_xp:350,freezes_remaining:1},error:null});
        expect((await repo.purchaseFreeze()).success).toBeTrue();
        expect(rpc.calls.mostRecent().args[1].p_operation_id).toBe(first);
    });
    it('cannot publish a purchase response to a different session', async () => {
        let resolve!: (value: {data:{success:boolean;new_xp:number;freezes_remaining:number};error:null})=>void;
        rpc.and.returnValue(new Promise(r=>{resolve=r;}));
        const purchase=repo.purchaseFreeze();owner='user-b';generation++;
        resolve({data:{success:true,new_xp:350,freezes_remaining:1},error:null});
        expect((await purchase).success).toBeFalse();expect(repo.state().xp).toBe(0);
        expect(stored.has('voca_xp_purchase:user-a')).toBeTrue();
    });
    it('streak action delegates to one purchase and applies only its returned count', async () => {
        const buy=jasmine.createSpy('purchaseFreeze').and.resolveTo({success:true,freezes_remaining:1});
        const apply=jasmine.createSpy('applyPurchasedFreeze');
        const data=signal({currentStreak:1,longestStreak:1,freezesRemaining:0,lastActivity:null,practicedToday:false});
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({providers:[
            {provide:AuthService,useValue:auth},
            {provide:OfflineStreakRepository,useValue:{streakData:data,applyPurchasedFreeze:apply}},
            {provide:GamificationService,useValue:{purchaseFreeze:buy}}
        ]});
        const streak=TestBed.inject(StreakService);
        await streak.replenishFreeze();expect(buy.calls.count()).toBe(1);expect(apply).toHaveBeenCalledOnceWith(1);
    });
});
