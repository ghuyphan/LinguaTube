import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { DictionaryService } from './dictionary.service';
import { GamificationService, I18nService, SettingsService } from '../../core/services';

describe('Dictionary result language contract', () => {
    let service: DictionaryService;
    let http: HttpTestingController;
    beforeEach(() => {
        localStorage.removeItem('linguatube_dict_cache_v5');
        TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting(),
            {provide:GamificationService,useValue:{recordDictLookup:()=>{}}},
            {provide:I18nService,useValue:{currentLanguage:signal('ko')}},
            {provide:SettingsService,useValue:{settings:signal({language:'ja'})}}
        ]});
        service=TestBed.inject(DictionaryService);http=TestBed.inject(HttpTestingController);
    });
    afterEach(()=>http.verify());
    it('retains definition metadata and presents a single explicit fallback label', () => {
        service.lookupEntries('食べる','ja').subscribe(entries=>{
            expect(entries[0].definitionLanguage).toBe('en');expect(entries[0].definitionKind).toBe('fallback');
            expect(entries[0].meanings[0].definition).toBe('to eat');expect(entries[0].jlptLevel).toBeUndefined();
        });
        http.expectOne(request=>request.url.includes('word=')).flush({entries:[{
            word:'食べる',definitions:['[EN] to eat'],definitionLanguage:'en',definitionKind:'fallback',level:null
        }]});
    });
    it('retains the target language for translated definitions', () => {
        service.lookupEntries('猫','ja').subscribe(entries=>{
            expect(entries[0].definitionLanguage).toBe('ko');expect(entries[0].definitionKind).toBe('translated');
            expect(entries[0].meanings[0].definition).toBe('고양이');
        });
        http.expectOne(request=>request.url.includes('word=')).flush({entries:[{
            word:'猫',definitions:['고양이'],definitionLanguage:'ko',definitionKind:'translated'
        }]});
    });
    it('labels the existing local English dictionary when the provider is unavailable', () => {
        service.lookupEntries('日本','ja').subscribe(entries=>{
            expect(entries[0].definitionLanguage).toBe('en');expect(entries[0].definitionKind).toBe('fallback');
        });
        http.expectOne(request=>request.url.includes('word=')).flush({error:'unavailable'},{status:503,statusText:'Service unavailable'});
    });
});
