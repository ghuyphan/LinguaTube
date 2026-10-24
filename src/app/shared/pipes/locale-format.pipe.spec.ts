import { LocaleDatePipe, LocaleNumberPipe } from './locale-format.pipe';

describe('Account locale formatting', () => {
  const date = new LocaleDatePipe(), number = new LocaleNumberPipe();
  it('formats account dates, counts and payment amounts in every supported locale', () => {
    for (const locale of ['en', 'vi', 'ja', 'ko', 'zh']) {
      const value = '2026-10-24T12:00:00Z';
      expect(date.transform(value, locale)).toBe(new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(value)));
      expect(number.transform(12345, locale)).toBe(new Intl.NumberFormat(locale).format(12345));
      expect(number.transform(49000, locale, 'VND')).toBe(new Intl.NumberFormat(locale, { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(49000));
    }
    expect(date.transform('2026-10-24T12:00:00Z', 'en', true)).toContain(':');
  });
  it('leaves missing or invalid dates available for the localized unknown-date fallback', () => {
    expect(date.transform(null, 'en')).toBe('');
    expect(date.transform('invalid', 'vi')).toBe('');
  });
});
