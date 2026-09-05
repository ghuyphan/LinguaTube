import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { GestureHandlerService, GestureEvent } from './gesture-handler.service';
import { YoutubeService } from '../../youtube.service';

describe('GestureHandlerService', () => {
  let service: GestureHandlerService;
  let mockYoutube: jasmine.SpyObj<YoutubeService>;

  const mockContainerRect: DOMRect = {
    left: 0,
    top: 0,
    width: 1000,
    height: 600,
    right: 1000,
    bottom: 600,
    x: 0,
    y: 0,
    toJSON: () => {}
  };

  beforeEach(() => {
    mockYoutube = jasmine.createSpyObj('YoutubeService', [
      'currentTime',
      'duration',
      'seekTo',
      'seekRelative',
      'intendedPlayingState',
      'getPlaybackRate',
      'setPlaybackRate'
    ]);
    mockYoutube.currentTime.and.returnValue(30);
    mockYoutube.duration.and.returnValue(300);
    mockYoutube.intendedPlayingState.and.returnValue(true);
    mockYoutube.getPlaybackRate.and.returnValue(1);

    TestBed.configureTestingModule({
      providers: [
        GestureHandlerService,
        { provide: YoutubeService, useValue: mockYoutube }
      ]
    });

    service = TestBed.inject(GestureHandlerService);
  });

  afterEach(() => {
    service.destroy();
  });

  function createTouchEvent(clientX: number, clientY: number): TouchEvent {
    return {
      touches: [{ clientX, clientY }] as unknown as TouchList,
      targetTouches: [{ clientX, clientY }] as unknown as TouchList,
      changedTouches: [{ clientX, clientY }] as unknown as TouchList,
      cancelable: true,
      preventDefault: () => {}
    } as unknown as TouchEvent;
  }

  it('should trigger instant single-tap in center zone (0ms latency)', () => {
    const events: GestureEvent[] = [];
    service.onGesture = (e) => events.push(e);

    // Center zone is 35% - 65% of width (x = 500)
    service.handleTouchStart(createTouchEvent(500, 300));
    const result = service.handleTouchEnd(mockContainerRect);

    expect(result).not.toBeNull();
    expect(result?.type).toBe('single-tap');
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('single-tap');
    expect(events[0].data?.zone).toBe('center');
  });

  it('should buffer single-tap on left wing and fire after 250ms', fakeAsync(() => {
    const events: GestureEvent[] = [];
    service.onGesture = (e) => events.push(e);

    // Left wing is < 35% of width (x = 100)
    service.handleTouchStart(createTouchEvent(100, 300));
    const result = service.handleTouchEnd(mockContainerRect);

    expect(result).toBeNull(); // Buffered, waiting to check if double tap follows
    expect(events.length).toBe(0);

    tick(249);
    expect(events.length).toBe(0);

    tick(2);
    expect(events.length).toBe(1);
    expect(events[0].type).toBe('single-tap');
    expect(events[0].data?.zone).toBe('left');
  }));

  it('should trigger double-tap rewind (-10s) on rapid double tap on left wing', fakeAsync(() => {
    const events: GestureEvent[] = [];
    service.onGesture = (e) => events.push(e);

    // First tap on left wing
    service.handleTouchStart(createTouchEvent(100, 300));
    service.handleTouchEnd(mockContainerRect);

    tick(100); // 100ms later

    // Second tap on left wing
    service.handleTouchStart(createTouchEvent(120, 300));
    const result = service.handleTouchEnd(mockContainerRect);

    expect(result).not.toBeNull();
    expect(result?.type).toBe('double-tap-left');
    expect(mockYoutube.seekRelative).toHaveBeenCalledWith(-10);
    expect(events.some(e => e.type === 'double-tap-left')).toBeTrue();
  }));

  it('should trigger double-tap forward (+10s) on rapid double tap on right wing', fakeAsync(() => {
    const events: GestureEvent[] = [];
    service.onGesture = (e) => events.push(e);

    // Right wing is > 65% of width (x = 800)
    service.handleTouchStart(createTouchEvent(800, 300));
    service.handleTouchEnd(mockContainerRect);

    tick(100);

    service.handleTouchStart(createTouchEvent(820, 300));
    const result = service.handleTouchEnd(mockContainerRect);

    expect(result).not.toBeNull();
    expect(result?.type).toBe('double-tap-right');
    expect(mockYoutube.seekRelative).toHaveBeenCalledWith(10);
    expect(events.some(e => e.type === 'double-tap-right')).toBeTrue();
  }));
});
