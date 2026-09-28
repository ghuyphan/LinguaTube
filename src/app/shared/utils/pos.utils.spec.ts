import { formatPartOfSpeech } from './pos.utils';

describe('formatPartOfSpeech', () => {
  it('translates common Japanese POS codes to Vietnamese', () => {
    const result = formatPartOfSpeech('v5r, vi', 'vi');
    expect(result).toEqual(['Động từ nhóm 1 (-ru)', 'Tự động từ']);
  });

  it('translates common Japanese POS codes to English', () => {
    const result = formatPartOfSpeech(['v1', 'vt', 'uk'], 'en');
    expect(result).toEqual(['Ichidan verb', 'Transitive', 'Usually kana']);
  });

  it('translates common POS codes to Japanese', () => {
    const result = formatPartOfSpeech('adj-i, n', 'ja');
    expect(result).toEqual(['イ形容詞', '名詞']);
  });

  it('handles null, undefined, or empty inputs', () => {
    expect(formatPartOfSpeech(null)).toEqual([]);
    expect(formatPartOfSpeech(undefined)).toEqual([]);
    expect(formatPartOfSpeech('')).toEqual([]);
    expect(formatPartOfSpeech([])).toEqual([]);
  });

  it('preserves and deduplicates human-readable POS', () => {
    const result = formatPartOfSpeech(['Noun', 'Verb', 'Noun'], 'en');
    expect(result).toEqual(['Noun', 'Verb']);
  });
});
