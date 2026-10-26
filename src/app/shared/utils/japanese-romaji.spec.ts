import { getJapaneseRomaji, toJapaneseRomaji } from './japanese-romaji';

describe('japanese-romaji', () => {
  it('converts hiragana to romaji', () => {
    expect(toJapaneseRomaji('べんきょう')).toBe('benkyou');
    expect(toJapaneseRomaji('きょう')).toBe('kyou');
  });

  it('converts katakana to romaji', () => {
    expect(toJapaneseRomaji('ゲーム')).toBe('geemu');
    expect(toJapaneseRomaji('カード')).toBe('kaado');
    expect(toJapaneseRomaji('ｺﾝﾆﾁﾊ')).toBe('konnichiha');
  });

  it('falls back to kana-only surface text including half-width katakana', () => {
    expect(getJapaneseRomaji(undefined, 'かな')).toBe('kana');
    expect(getJapaneseRomaji(undefined, 'ｺﾝﾆﾁﾊ')).toBe('konnichiha');
    expect(getJapaneseRomaji(undefined, '日本')).toBeUndefined();
  });
});
