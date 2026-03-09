import { getJapaneseRomaji, toJapaneseRomaji } from './japanese-romaji';

describe('japanese-romaji', () => {
  it('converts hiragana to romaji', () => {
    expect(toJapaneseRomaji('べんきょう')).toBe('benkyou');
    expect(toJapaneseRomaji('きょう')).toBe('kyou');
  });

  it('converts katakana to romaji', () => {
    expect(toJapaneseRomaji('ゲーム')).toBe('geemu');
    expect(toJapaneseRomaji('カード')).toBe('kaado');
  });

  it('falls back to kana-only surface text', () => {
    expect(getJapaneseRomaji(undefined, 'かな')).toBe('kana');
    expect(getJapaneseRomaji(undefined, '日本')).toBeUndefined();
  });
});
