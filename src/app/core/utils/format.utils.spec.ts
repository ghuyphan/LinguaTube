import { formatTime, getYouTubeThumbnail, generateRandomId, getVolumeIcon } from './format.utils';

describe('format.utils', () => {
  describe('formatTime', () => {
    it('formats 0 or invalid values as 0:00', () => {
      expect(formatTime(0)).toBe('0:00');
      expect(formatTime(-5)).toBe('0:00');
      expect(formatTime(null)).toBe('0:00');
      expect(formatTime(undefined)).toBe('0:00');
      expect(formatTime(NaN)).toBe('0:00');
    });

    it('formats seconds less than an hour as m:ss', () => {
      expect(formatTime(45)).toBe('0:45');
      expect(formatTime(65)).toBe('1:05');
      expect(formatTime(599)).toBe('9:59');
      expect(formatTime(600)).toBe('10:00');
    });

    it('formats seconds greater than or equal to an hour as h:mm:ss', () => {
      expect(formatTime(3600)).toBe('1:00:00');
      expect(formatTime(3665)).toBe('1:01:05');
      expect(formatTime(7325)).toBe('2:02:05');
    });
  });

  describe('getYouTubeThumbnail', () => {
    it('returns default mqdefault thumbnail URL', () => {
      expect(getYouTubeThumbnail('abc123xyz')).toBe('https://i.ytimg.com/vi/abc123xyz/mqdefault.jpg');
    });

    it('returns requested thumbnail quality URL', () => {
      expect(getYouTubeThumbnail('abc123xyz', 'hqdefault')).toBe('https://i.ytimg.com/vi/abc123xyz/hqdefault.jpg');
      expect(getYouTubeThumbnail('abc123xyz', 'maxresdefault')).toBe('https://i.ytimg.com/vi/abc123xyz/maxresdefault.jpg');
    });
  });

  describe('generateRandomId', () => {
    it('generates random ID with default 15 chars', () => {
      const id1 = generateRandomId();
      const id2 = generateRandomId();
      expect(id1.length).toBe(15);
      expect(id2.length).toBe(15);
      expect(id1).not.toBe(id2);
      expect(/^[a-z0-9]+$/.test(id1)).toBeTrue();
    });

    it('generates random ID with custom length', () => {
      expect(generateRandomId(8).length).toBe(8);
      expect(generateRandomId(20).length).toBe(20);
    });
  });

  describe('getVolumeIcon', () => {
    it('returns volume-x when muted or volume is 0', () => {
      expect(getVolumeIcon(100, true)).toBe('volume-x');
      expect(getVolumeIcon(0, false)).toBe('volume-x');
      expect(getVolumeIcon(0, true)).toBe('volume-x');
    });

    it('returns volume-1 when volume is below 50', () => {
      expect(getVolumeIcon(1, false)).toBe('volume-1');
      expect(getVolumeIcon(49, false)).toBe('volume-1');
    });

    it('returns volume-2 when volume is 50 or above', () => {
      expect(getVolumeIcon(50, false)).toBe('volume-2');
      expect(getVolumeIcon(100, false)).toBe('volume-2');
    });
  });
});
