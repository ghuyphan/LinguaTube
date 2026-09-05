import { TestBed } from '@angular/core/testing';
import { BottomSheetService } from './bottom-sheet.service';
import { BodyScrollService } from './body-scroll.service';

describe('BottomSheetService', () => {
  let service: BottomSheetService;
  let bodyScrollSpy: jasmine.SpyObj<BodyScrollService>;

  beforeEach(() => {
    bodyScrollSpy = jasmine.createSpyObj('BodyScrollService', ['lock', 'unlock']);

    TestBed.configureTestingModule({
      providers: [
        BottomSheetService,
        { provide: BodyScrollService, useValue: bodyScrollSpy }
      ]
    });

    service = TestBed.inject(BottomSheetService);
  });

  afterEach(() => {
    service.closeAll();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.hasOpenSheets).toBeFalse();
    expect(service.depth).toBe(0);
  });

  it('should register a sheet and lock body scroll', () => {
    const closeSpy = jasmine.createSpy('close');
    const unregister = service.register({
      id: 'sheet-1',
      close: closeSpy,
      allowEscape: true
    });

    expect(service.hasOpenSheets).toBeTrue();
    expect(service.depth).toBe(1);
    expect(bodyScrollSpy.lock).toHaveBeenCalledTimes(1);

    unregister();

    expect(service.hasOpenSheets).toBeFalse();
    expect(service.depth).toBe(0);
    expect(bodyScrollSpy.unlock).toHaveBeenCalledTimes(1);
  });

  it('should manage multiple sheets as a LIFO stack and compute increasing z-indices', () => {
    const close1 = jasmine.createSpy('close1');
    const close2 = jasmine.createSpy('close2');

    const unregister1 = service.register({ id: 's1', close: close1 });
    service.register({ id: 's2', close: close2 });

    expect(service.depth).toBe(2);
    expect(service.getZIndex('s1')).toBeLessThan(service.getZIndex('s2'));

    // closeTop should close the topmost sheet (s2)
    const closed = service.closeTop();
    expect(closed).toBeTrue();
    expect(close2).toHaveBeenCalledTimes(1);
    expect(close1).not.toHaveBeenCalled();
    expect(service.depth).toBe(1);

    unregister1();
    expect(service.depth).toBe(0);
  });

  it('should handle Escape key event on topmost sheet with allowEscape true', () => {
    const close1 = jasmine.createSpy('close1');
    service.register({ id: 's1', close: close1, allowEscape: true });

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(close1).toHaveBeenCalledTimes(1);
    expect(service.depth).toBe(0);
  });

  it('should not dismiss topmost sheet on Escape when allowEscape is false', () => {
    const close1 = jasmine.createSpy('close1');
    const unregister = service.register({ id: 's1', close: close1, allowEscape: false });

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(close1).not.toHaveBeenCalled();
    expect(service.depth).toBe(1);

    unregister();
  });

  it('should close all sheets cleanly with closeAll()', () => {
    const close1 = jasmine.createSpy('close1');
    const close2 = jasmine.createSpy('close2');

    service.register({ id: 's1', close: close1 });
    service.register({ id: 's2', close: close2 });

    expect(service.depth).toBe(2);

    service.closeAll();

    expect(close1).toHaveBeenCalledTimes(1);
    expect(close2).toHaveBeenCalledTimes(1);
    expect(service.depth).toBe(0);
    expect(service.hasOpenSheets).toBeFalse();
  });
});
