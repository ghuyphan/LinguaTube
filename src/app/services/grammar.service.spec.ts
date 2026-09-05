import { TestBed } from '@angular/core/testing';
import { GrammarService } from './grammar.service';
import { Token } from '../models';

describe('GrammarService', () => {
  let service: GrammarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrammarService]
    });
    service = TestBed.inject(GrammarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load English grammar patterns and update loadedLanguages signal', async () => {
    expect(service.loadedLanguages().has('en')).toBeFalse();

    const patterns = await service.searchPatterns('am', 'en');
    expect(patterns.length).toBeGreaterThan(0);
    expect(service.loadedLanguages().has('en')).toBeTrue();
    expect(patterns[0].language).toBe('en');
  });

  it('should detect English grammar patterns in tokens', async () => {
    // Ensure English patterns are loaded first
    await service.searchPatterns('am', 'en');

    const tokens: Token[] = [
      { surface: 'I' },
      { surface: 'am' },
      { surface: 'hungry' }
    ];

    const matches = service.detectPatterns(tokens, 'en');
    expect(matches.length).toBeGreaterThan(0);
    expect(matches.some(m => m.pattern.id === 'en_a1_01')).toBeTrue();
  });

  it('should lazy load translation pack for Japanese to Vietnamese', async () => {
    const translations = await service.loadTranslation('ja', 'vi');
    expect(translations).toBeTruthy();
    expect(Object.keys(translations).length).toBeGreaterThan(0);

    const firstKey = Object.keys(translations)[0];
    expect(translations[firstKey].shortExplanation).toBeTruthy();
  });

  it('should lazy load translation pack for English to Vietnamese', async () => {
    const translations = await service.loadTranslation('en', 'vi');
    expect(translations).toBeTruthy();
    expect(Object.keys(translations).length).toBeGreaterThan(0);
  });

  it('should return empty translations for English target language', async () => {
    const translations = await service.loadTranslation('ja', 'en');
    expect(translations).toEqual({});
  });

  it('should detect English split correlative patterns like not only ... but also', async () => {
    // Load English patterns
    await service.searchPatterns('not only', 'en');

    const tokens: Token[] = [
      { surface: 'Not' },
      { surface: ' ' },
      { surface: 'only' },
      { surface: ' ' },
      { surface: 'did' },
      { surface: ' ' },
      { surface: 'he' },
      { surface: ' ' },
      { surface: 'come' },
      { surface: ',' },
      { surface: ' ' },
      { surface: 'but' },
      { surface: ' ' },
      { surface: 'also' },
      { surface: ' ' },
      { surface: 'helped' }
    ];

    const matches = service.detectPatterns(tokens, 'en');
    expect(matches.length).toBeGreaterThan(0);
    const notOnlyMatch = matches.find(m => m.pattern.id === 'en_c1_02');
    expect(notOnlyMatch).toBeTruthy();
    expect(notOnlyMatch?.tokenIndices).toEqual([0, 1, 2, 11, 12, 13]);
  });

  it('should detect Chinese split patterns like 虽然...但是', async () => {
    // Load Chinese patterns
    await service.searchPatterns('虽然', 'zh');

    const tokens: Token[] = [
      { surface: '虽然' },
      { surface: '天气' },
      { surface: '冷' },
      { surface: '但是' },
      { surface: '很' },
      { surface: '开心' }
    ];

    const matches = service.detectPatterns(tokens, 'zh');
    expect(matches.length).toBeGreaterThan(0);
    const splitMatch = matches.find(m => m.pattern.pattern.includes('虽然'));
    expect(splitMatch).toBeTruthy();
  });

  it('should handle concurrent loadTranslation calls without error or duplicated calls', async () => {
    const [t1, t2] = await Promise.all([
      service.loadTranslation('ja', 'ko'),
      service.loadTranslation('ja', 'ko')
    ]);

    expect(t1).toBe(t2);
    expect(Object.keys(t1).length).toBeGreaterThan(0);
  });
});
