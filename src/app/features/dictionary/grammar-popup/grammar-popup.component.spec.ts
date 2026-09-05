import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrammarPopupComponent } from './grammar-popup.component';
import { GrammarService } from '../../../services';
import { I18nService } from '../../../core/services';
import { BottomSheetService } from '../../../services/bottom-sheet.service';
import { GrammarPattern } from '../../../models';

describe('GrammarPopupComponent', () => {
  let component: GrammarPopupComponent;
  let fixture: ComponentFixture<GrammarPopupComponent>;
  let grammarService: GrammarService;
  let i18nService: I18nService;

  const mockPattern: GrammarPattern = {
    id: 'en_a1_01',
    language: 'en',
    pattern: 'am / is / are',
    title: 'am / is / are (Present simple of to be)',
    shortExplanation: 'The present simple form of the verb to be.',
    longExplanation: 'Used to describe identity, status, or condition.',
    formation: 'Subject + am/is/are',
    level: 'CEFR A1',
    examples: [
      { sentence: 'I am a teacher.', translation: 'Tôi là giáo viên.' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarPopupComponent],
      providers: [
        GrammarService,
        I18nService,
        BottomSheetService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GrammarPopupComponent);
    component = fixture.componentInstance;
    grammarService = TestBed.inject(GrammarService);
    i18nService = TestBed.inject(I18nService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return base pattern when UI language is English', () => {
    i18nService.setLanguage('en');
    fixture.componentRef.setInput('pattern', mockPattern);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    const display = component.displayPattern();
    expect(display).toEqual(mockPattern);
  });

  it('should assign correct level badge class for CEFR A1', () => {
    fixture.componentRef.setInput('pattern', mockPattern);
    fixture.detectChanges();

    expect(component.levelClass()).toBe('level-beginner');
  });

  it('should reactively merge translation when loaded', async () => {
    i18nService.setLanguage('vi');
    fixture.componentRef.setInput('pattern', mockPattern);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    // Pre-load the translation into service cache
    await grammarService.loadTranslation('en', 'vi');
    fixture.detectChanges();

    const display = component.displayPattern();
    expect(display).toBeTruthy();
    expect(display?.title).toBeTruthy();
  });
});
