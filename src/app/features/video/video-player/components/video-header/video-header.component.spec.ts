import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHeaderComponent } from './video-header.component';

describe('VideoHeaderComponent', () => {
  let component: VideoHeaderComponent;
  let fixture: ComponentFixture<VideoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render channel name with title attribute when provided', () => {
    fixture.componentRef.setInput('title', 'Learn Japanese with Anime');
    fixture.componentRef.setInput('channel', 'Super Long Channel Name That Needs Ellipsis');
    fixture.detectChanges();

    const channelEl = fixture.nativeElement.querySelector('.video-channel');
    expect(channelEl).toBeTruthy();
    expect(channelEl.textContent.trim()).toBe('Super Long Channel Name That Needs Ellipsis');
    expect(channelEl.getAttribute('title')).toBe('Super Long Channel Name That Needs Ellipsis');
  });

  it('should open level sheet when openLevelSheet is called', () => {
    expect(component.showLevelSheet()).toBeFalse();
    component.openLevelSheet();
    expect(component.showLevelSheet()).toBeTrue();
  });
});
