import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoLevelDialogComponent } from './video-level-dialog.component';
import { I18nService } from '../../core/services';
import { VideoLevelInfo } from '../../models/video-level.model';

describe('VideoLevelDialogComponent', () => {
  let component: VideoLevelDialogComponent;
  let fixture: ComponentFixture<VideoLevelDialogComponent>;

  const mockLevelInfo: VideoLevelInfo = {
    level: 'JLPT N3',
    tier: 'intermediate',
    score: 3.0,
    confidence: 0.85,
    grammarCount: 24,
    speechRateCpm: 260,
    detectedFrom: 'linguistics',
    breakdown: { N5: 10, N4: 8, N3: 6 }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoLevelDialogComponent],
      providers: [I18nService]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('levelInfo', mockLevelInfo);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the level and tier properly', () => {
    const heroBadge = fixture.nativeElement.querySelector('.hero-level-text');
    expect(heroBadge.textContent.trim()).toBe('JLPT N3');

    const tierTitle = fixture.nativeElement.querySelector('.tier-title');
    expect(tierTitle).toBeTruthy();
  });

  it('should sort breakdown patterns by frequency', () => {
    const sorted = component.sortedBreakdown();
    expect(sorted.length).toBe(3);
    expect(sorted[0]).toEqual({ level: 'N5', count: 10 });
    expect(sorted[1]).toEqual({ level: 'N4', count: 8 });
    expect(sorted[2]).toEqual({ level: 'N3', count: 6 });
  });

  it('should calculate natural speech pace info correctly', () => {
    const pace = component.speechPaceInfo();
    expect(pace).toBeTruthy();
    expect(pace?.cpm).toBe(260);
    expect(pace?.unit).toBe('cpm');
    expect(pace?.paceClass).toBe('pace-normal');
  });

  it('should emit dismissed event when Got it button is clicked', () => {
    spyOn(component.dismissed, 'emit');
    const dismissBtn = fixture.nativeElement.querySelector('.dismiss-btn');
    expect(dismissBtn).toBeTruthy();
    dismissBtn.click();
    expect(component.dismissed.emit).toHaveBeenCalled();
  });

  it('should calculate and convert English speech pace to wpm correctly', () => {
    fixture.componentRef.setInput('levelInfo', {
      ...mockLevelInfo,
      level: 'CEFR A2',
      speechRateCpm: 837
    });
    fixture.detectChanges();

    const pace = component.speechPaceInfo();
    expect(pace).toBeTruthy();
    expect(pace?.unit).toBe('wpm');
    expect(pace?.cpm).toBe(161); // 837 / 5.2
    expect(pace?.paceClass).toBe('pace-normal');
  });
});
