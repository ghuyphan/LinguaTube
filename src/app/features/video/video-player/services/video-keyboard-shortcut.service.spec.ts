import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { VideoKeyboardShortcutService, KeyboardShortcutEvent } from './video-keyboard-shortcut.service';
import { YoutubeService } from '../../youtube.service';
import { QuizService } from '../../quiz.service';
import { VideoInfo } from '../../../../models';

describe('VideoKeyboardShortcutService', () => {
  let service: VideoKeyboardShortcutService;
  let mockYoutubeService: Partial<YoutubeService> & {
    currentVideo: ReturnType<typeof signal<VideoInfo | null>>;
    duration: ReturnType<typeof signal<number>>;
    intendedPlayingState: ReturnType<typeof signal<boolean>>;
    seekTo: jasmine.Spy;
  };
  let mockQuizService: Partial<QuizService> & {
    isActive: ReturnType<typeof signal<boolean>>;
    replaySegment: jasmine.Spy;
    skipQuestion: jasmine.Spy;
  };

  beforeEach(() => {
    mockYoutubeService = {
      currentVideo: signal<VideoInfo | null>({
        id: 'test_vid',
        title: 'Test Video',
        duration: 100
      }),
      duration: signal(100),
      intendedPlayingState: signal(false),
      seekTo: jasmine.createSpy('seekTo')
    };

    mockQuizService = {
      isActive: signal(false),
      replaySegment: jasmine.createSpy('replaySegment'),
      skipQuestion: jasmine.createSpy('skipQuestion')
    };

    TestBed.configureTestingModule({
      providers: [
        VideoKeyboardShortcutService,
        { provide: YoutubeService, useValue: mockYoutubeService },
        { provide: QuizService, useValue: mockQuizService }
      ]
    });

    service = TestBed.inject(VideoKeyboardShortcutService);
  });

  it('should ignore shortcuts when no video is loaded', () => {
    mockYoutubeService.currentVideo.set(null);
    const event = new KeyboardEvent('keydown', { code: 'Space' });
    const handled = service.handleKeyDown(event, false, false);
    expect(handled).toBeFalse();
  });

  it('should ignore shortcuts when target is an input or textarea', () => {
    const input = document.createElement('input');
    const event = new KeyboardEvent('keydown', { code: 'Space' });
    Object.defineProperty(event, 'target', { value: input });
    const handled = service.handleKeyDown(event, false, false);
    expect(handled).toBeFalse();
  });

  it('should emit toggle-play on Space and KeyK', () => {
    const emitted: KeyboardShortcutEvent[] = [];
    service.events$.subscribe(e => emitted.push(e));

    const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
    expect(service.handleKeyDown(spaceEvent, false, false)).toBeTrue();

    const keyKEvent = new KeyboardEvent('keydown', { code: 'KeyK' });
    expect(service.handleKeyDown(keyKEvent, false, false)).toBeTrue();

    expect(emitted).toEqual([
      { type: 'toggle-play' },
      { type: 'toggle-play' }
    ]);
  });

  it('should seek with ArrowLeft, ArrowRight, KeyJ, and KeyL when quiz is inactive', () => {
    const emitted: KeyboardShortcutEvent[] = [];
    service.events$.subscribe(e => emitted.push(e));

    const left = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
    service.handleKeyDown(left, false, false);

    const right = new KeyboardEvent('keydown', { code: 'ArrowRight' });
    service.handleKeyDown(right, false, false);

    const j = new KeyboardEvent('keydown', { code: 'KeyJ' });
    service.handleKeyDown(j, false, false);

    const l = new KeyboardEvent('keydown', { code: 'KeyL' });
    service.handleKeyDown(l, false, false);

    expect(emitted).toEqual([
      { type: 'seek', data: { direction: 'left', seconds: -5 } },
      { type: 'seek', data: { direction: 'right', seconds: 5 } },
      { type: 'seek', data: { direction: 'left', seconds: -10 } },
      { type: 'seek', data: { direction: 'right', seconds: 10 } }
    ]);
  });

  it('should delegate arrow keys to quiz when quiz is active', () => {
    mockQuizService.isActive.set(true);

    const left = new KeyboardEvent('keydown', { code: 'ArrowLeft' });
    service.handleKeyDown(left, false, false);
    expect(mockQuizService.replaySegment).toHaveBeenCalled();

    const right = new KeyboardEvent('keydown', { code: 'ArrowRight' });
    service.handleKeyDown(right, false, false);
    expect(mockQuizService.skipQuestion).toHaveBeenCalled();
  });

  it('should handle Mute (KeyM) and Volume (ArrowUp / ArrowDown)', () => {
    const emitted: KeyboardShortcutEvent[] = [];
    service.events$.subscribe(e => emitted.push(e));

    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'KeyM' }), false, false);
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowUp' }), false, false);
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'ArrowDown' }), false, false);

    expect(emitted).toEqual([
      { type: 'toggle-mute' },
      { type: 'adjust-volume', data: { amount: 5 } },
      { type: 'adjust-volume', data: { amount: -5 } }
    ]);
  });

  it('should handle percentage seek via number keys (Digit0-9)', () => {
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'Digit5' }), false, false);
    expect(mockYoutubeService.seekTo).toHaveBeenCalledWith(50);

    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'Digit0' }), false, false);
    expect(mockYoutubeService.seekTo).toHaveBeenCalledWith(0);
  });

  it('should handle Home and End keys', () => {
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'Home' }), false, false);
    expect(mockYoutubeService.seekTo).toHaveBeenCalledWith(0);

    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'End' }), false, false);
    expect(mockYoutubeService.seekTo).toHaveBeenCalledWith(100);
  });

  it('should handle fullscreen and escape keys', () => {
    const emitted: KeyboardShortcutEvent[] = [];
    service.events$.subscribe(e => emitted.push(e));

    // Fullscreen toggle with F
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'KeyF' }), false, false);

    // Escape closes fs popup if open
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'Escape' }), true, true);

    // Escape exits fullscreen if fs popup is closed
    service.handleKeyDown(new KeyboardEvent('keydown', { code: 'Escape' }), false, true);

    expect(emitted).toEqual([
      { type: 'toggle-fullscreen', data: { action: 'toggle' } },
      { type: 'toggle-fullscreen', data: { action: 'close-popup' } },
      { type: 'toggle-fullscreen', data: { action: 'exit-fullscreen' } }
    ]);
  });
});
