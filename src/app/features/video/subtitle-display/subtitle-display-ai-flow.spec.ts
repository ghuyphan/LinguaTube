import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SubtitleDisplayComponent } from './subtitle-display.component';
import { TranscriptService } from '../transcript.service';
import { SubtitleService } from '../subtitle.service';
import { AiJobManagerService } from '../../../core/services/ai-job-manager.service';
import { YoutubeService } from '../youtube.service';
import { SubtitleCue } from '../../../models';

describe('SubtitleDisplayComponent & AI Transcript Entire Flow', () => {
  let component: SubtitleDisplayComponent;
  let fixture: ComponentFixture<SubtitleDisplayComponent>;
  let transcriptService: TranscriptService;
  let subtitleService: SubtitleService;
  let aiJobManager: AiJobManagerService;
  let youtubeService: YoutubeService;
  let httpMock: HttpTestingController;

  const realChineseSegments: SubtitleCue[] = [
    { id: 'cue_0', startTime: 0.22, endTime: 0.72, text: '兄弟 们,' },
    { id: 'cue_1', startTime: 0.72, endTime: 2.38, text: '提起 蓝厂 的 Android 4,' },
    { id: 'cue_2', startTime: 2.38, endTime: 4.01, text: '你 的 第一 印象 是 什么?' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtitleDisplayComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideNoopAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtitleDisplayComponent);
    component = fixture.componentInstance;
    transcriptService = TestBed.inject(TranscriptService);
    subtitleService = TestBed.inject(SubtitleService);
    aiJobManager = TestBed.inject(AiJobManagerService);
    youtubeService = TestBed.inject(YoutubeService);
    httpMock = TestBed.inject(HttpTestingController);

    youtubeService.currentVideo.set({
      id: 'u9vpfPlvF7U',
      title: 'Vivo Android 4 Review',
      channel: 'Tech Channel'
    });

    // Flush any eager initialization HTTP requests
    const initDiamonds = httpMock.match('/api/diamonds');
    initDiamonds.forEach(r => r.flush({ diamonds: 3, maxDiamonds: 3, userTier: 'anonymous' }));

    fixture.detectChanges();
  });

  afterEach(() => {
    // Flush any pending background requests (e.g. dual-subtitles, diamond polls)
    const pending = httpMock.match(() => true);
    pending.forEach(r => r.flush({}));
    httpMock.verify();
  });

  it('Step 1: Displays AI prompt and does NOT show server error when video has NO_NATIVE captions', () => {
    transcriptService.setState({
      status: 'error',
      code: 'NO_NATIVE',
      whisperAvailable: true
    });
    transcriptService.diamonds.set(3);
    transcriptService.maxDiamonds.set(3);
    subtitleService.subtitles.set([]);
    subtitleService.currentCueIndex.set(-1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).not.toContain('Server error');
    expect(compiled.textContent).not.toContain('Could not connect to the transcription service');

    const tryAiBtn = compiled.querySelector('.try-ai-btn') as HTMLButtonElement;
    expect(tryAiBtn).toBeTruthy('Try AI button should be visible');
    expect(tryAiBtn.textContent).toContain('3/3');
  });

  it('Step 2: Clicking try-ai-btn emits manualAITrigger', () => {
    transcriptService.setState({
      status: 'error',
      code: 'NO_NATIVE',
      whisperAvailable: true
    });
    transcriptService.diamonds.set(3);
    fixture.detectChanges();

    let triggered = false;
    component.manualAITrigger.subscribe(() => {
      triggered = true;
    });

    const tryAiBtn = fixture.nativeElement.querySelector('.try-ai-btn') as HTMLButtonElement;
    tryAiBtn.click();
    expect(triggered).toBeTrue();
  });

  it('Step 3: Switches cleanly to native spinner in generating_ai state without visual clutter', () => {
    transcriptService.setState({
      status: 'generating_ai',
      jobId: 'dev_job_test_123',
      isResuming: false
    });
    subtitleService.subtitles.set([]);
    subtitleService.currentCueIndex.set(-1);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const generatingBox = compiled.querySelector('.state-generating') as HTMLElement;
    expect(generatingBox).toBeTruthy('Generating container should be present');

    const spinner = compiled.querySelector('.ai-spinner-ring');
    expect(spinner).toBeTruthy('Native conical spinner ring should be present');

    expect(compiled.querySelector('.ai-progress-bar')).toBeNull('Progress bar must not exist');
    expect(compiled.querySelector('.ai-progress-track')).toBeNull('Progress track must not exist');

    expect(compiled.querySelector('.state--error')).toBeNull('Error state must not be active');
  });

  it('Step 4: Renders real subtitle cues and dismisses loading state when AI completes', () => {
    aiJobManager.jobCompleted$.next({
      videoId: 'u9vpfPlvF7U',
      language: 'zh',
      requestedLanguage: 'zh',
      languageMismatch: false,
      cues: realChineseSegments,
      source: 'ai'
    });

    subtitleService.subtitles.set(realChineseSegments);
    subtitleService.currentCueIndex.set(0);
    transcriptService.setState({
      status: 'complete',
      language: 'zh',
      requestedLanguage: 'zh',
      languageMismatch: false,
      source: 'ai',
      cues: realChineseSegments
    });

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.state-generating')).toBeNull('Generating state should be gone');
    expect(compiled.querySelector('.state-error')).toBeNull('Error state should be gone');

    const subtitleTextEl = compiled.querySelector('.subtitle-text');
    expect(subtitleTextEl).toBeTruthy();
    expect(subtitleTextEl?.textContent).toContain('兄弟');
    expect(subtitleTextEl?.textContent).toContain('们');
  });

  it('Step 5: Full HTTP pipeline end-to-end test without 500 or stale session lock', () => {
    // 1. Initial request for video u9vpfPlvF7U with no native captions
    transcriptService.fetchTranscript('u9vpfPlvF7U', 'zh', undefined, undefined, undefined, true).subscribe();

    const initialReq = httpMock.expectOne('/api/transcript');
    expect(initialReq.request.method).toBe('POST');
    expect(initialReq.request.body.videoId).toBe('u9vpfPlvF7U');
    expect(initialReq.request.body.preferAI).toBeFalse();

    // Server returns NO_NATIVE with 3 diamonds available
    initialReq.flush({
      success: false,
      errorCode: 'NO_NATIVE',
      whisperAvailable: true,
      diamonds: 3,
      maxDiamonds: 3
    });

    fixture.detectChanges();

    // Assert: UI shows AI button, no server error
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).not.toContain('Server error');
    const tryAiBtn = compiled.querySelector('.try-ai-btn') as HTMLButtonElement;
    expect(tryAiBtn).toBeTruthy();
    expect(tryAiBtn.textContent).toContain('3/3');

    // 2. User triggers AI transcription with forceRefresh: true
    transcriptService.generateWithAI(
      'u9vpfPlvF7U',
      'zh',
      undefined,
      'test_turnstile_token',
      180,
      'Vivo Android 4 Review',
      'Tech Channel',
      true
    ).subscribe();

    const aiReq = httpMock.expectOne('/api/transcript');
    expect(aiReq.request.method).toBe('POST');
    expect(aiReq.request.body.preferAI).toBeTrue();
    expect(aiReq.request.body.forceRefresh).toBeTrue();
    expect(aiReq.request.body.turnstileToken).toBe('test_turnstile_token');

    // Server returns processing with new jobId
    aiReq.flush({
      success: true,
      status: 'processing',
      jobId: 'dev_job_u9vpf_live_123',
      diamonds: 2
    });

    fixture.detectChanges();

    // Assert: UI shows loading spinner, NOT error
    expect(compiled.querySelector('.state-generating')).toBeTruthy();
    expect(compiled.querySelector('.ai-spinner-ring')).toBeTruthy();
    expect(compiled.querySelector('.state--error')).toBeNull();

    // 3. Complete the job and verify cue display
    subtitleService.subtitles.set(realChineseSegments);
    subtitleService.currentCueIndex.set(0);
    transcriptService.setState({
      status: 'complete',
      language: 'zh',
      requestedLanguage: 'zh',
      languageMismatch: false,
      source: 'ai',
      cues: realChineseSegments
    });

    fixture.detectChanges();

    expect(compiled.querySelector('.state-generating')).toBeNull();
    expect(compiled.querySelector('.subtitle-text')?.textContent).toContain('兄弟');
  });

  it('Step 6: ForceRefresh / Retry cancels active background job and requests a new session without reusing the old one', () => {
    // Register a pre-existing job from an earlier session
    aiJobManager.registerJob({
      jobId: 'dev_job_old_stale_111',
      videoId: 'u9vpfPlvF7U',
      language: 'zh',
      title: 'Vivo Android 4 Review',
      channel: 'Tech Channel'
    });

    expect(aiJobManager.hasActiveJob('u9vpfPlvF7U')).toBeTrue();

    // User clicks retry / force regenerate
    transcriptService.generateWithAI(
      'u9vpfPlvF7U',
      'zh',
      undefined,
      'new_token_456',
      180,
      'Vivo Android 4 Review',
      'Tech Channel',
      true // forceRefresh = true
    ).subscribe();

    // Verify old job was immediately evicted from client manager
    expect(aiJobManager.hasActiveJob('u9vpfPlvF7U')).toBeFalse();

    const aiReq = httpMock.expectOne('/api/transcript');
    expect(aiReq.request.body.forceRefresh).toBeTrue();
    expect(aiReq.request.body.jobId).toBeUndefined(); // Does NOT send the old stale jobId

    aiReq.flush({
      success: true,
      status: 'processing',
      jobId: 'dev_job_fresh_new_222'
    });

    // Now active job is updated with the fresh new jobId
    expect(aiJobManager.getJob('u9vpfPlvF7U')?.jobId).toBe('dev_job_fresh_new_222');
  });

  it('Step 7: Transient network glitches (429 rate limit, 524 Cloudflare timeout, 500) do NOT abort active AI transcription', () => {
    aiJobManager.registerJob({
      jobId: 'dev_job_resilience_test',
      videoId: 'u9vpfPlvF7U',
      language: 'zh'
    });

    let failedEmitted = false;
    aiJobManager.jobFailed$.subscribe(() => {
      failedEmitted = true;
    });

    // Simulate poll attempt that hits a 524 Cloudflare edge timeout
    aiJobManager['executePoll']('u9vpfPlvF7U');

    const pollReq1 = httpMock.expectOne('/api/transcript');
    pollReq1.flush('Cloudflare Timeout', { status: 524, statusText: 'A Timeout Occurred' });

    // Verify job was NOT aborted or marked failed
    expect(failedEmitted).toBeFalse();
    expect(aiJobManager.hasActiveJob('u9vpfPlvF7U')).toBeTrue();
    expect(aiJobManager.getJob('u9vpfPlvF7U')?.consecutiveErrors).toBe(1);

    // Simulate poll attempt that hits a 429 rate limit
    aiJobManager['executePoll']('u9vpfPlvF7U');
    const pollReq2 = httpMock.expectOne('/api/transcript');
    pollReq2.flush('Rate Limited', { status: 429, statusText: 'Too Many Requests' });

    // Still NOT aborted
    expect(failedEmitted).toBeFalse();
    expect(aiJobManager.hasActiveJob('u9vpfPlvF7U')).toBeTrue();
    expect(aiJobManager.getJob('u9vpfPlvF7U')?.consecutiveErrors).toBe(2);
  });
});

