import { Injectable, signal, inject, NgZone, DestroyRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActiveAiJob, SubtitleCue, TranscriptResponse } from '../../models';
import { TranscriptCacheService } from '../../services/transcript-cache.service';
import { ToastService } from './toast.service';

const ACTIVE_JOBS_KEY = 'voca_active_ai_jobs';
const MAX_PATIENCE_MS = 900000; // 15 minutes patience (aligned with backend lease timeout)
const ONE_HOUR_MS = 3600 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AiJobManagerService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastService = inject(ToastService);
  private cacheService = inject(TranscriptCacheService);
  private ngZone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  /**
   * Reactive signal dictionary of currently active background AI transcription jobs
   */
  readonly activeJobs = signal<Record<string, ActiveAiJob>>({});

  /**
   * Event stream emitted when an AI transcription completes
   */
  readonly jobCompleted$ = new Subject<{
    videoId: string;
    language: string;
    requestedLanguage: string;
    languageMismatch: boolean;
    cues: SubtitleCue[];
    source: 'ai';
  }>();

  /**
   * Event stream emitted when an AI transcription fails permanently
   */
  readonly jobFailed$ = new Subject<{
    videoId: string;
    error: string;
    errorCode?: string;
  }>();

  private pollTimers = new Map<string, ReturnType<typeof setTimeout>>();
  private activeHttpSubs = new Map<string, Subscription>();
  private isOffline = false;

  constructor() {
    this.loadActiveJobs();
    this.setupLifecycleHooks();
    this.resumeActiveJobs();
  }

  /**
   * Register and begin tracking an active AI transcription job
   */
  registerJob(job: {
    jobId: string;
    videoId: string;
    language: string;
    title?: string;
    channel?: string;
  }): void {
    const activeJob: ActiveAiJob = {
      jobId: job.jobId,
      videoId: job.videoId,
      language: job.language,
      startedAt: Date.now(),
      title: job.title,
      channel: job.channel,
      pollAttempts: 0,
      consecutiveErrors: 0,
      status: 'processing'
    };

    this.activeJobs.update(jobs => ({
      ...jobs,
      [job.videoId]: activeJob
    }));

    this.saveActiveJobs();
    this.scheduleNextPoll(activeJob, 4000);
  }

  /**
   * Check if a video has an active AI transcription job
   */
  hasActiveJob(videoId: string): boolean {
    const job = this.activeJobs()[videoId];
    return Boolean(job && job.status === 'processing');
  }

  /**
   * Get active job details for a video
   */
  getJob(videoId: string): ActiveAiJob | null {
    return this.activeJobs()[videoId] || null;
  }

  /**
   * Cancel and clean up an active job
   */
  cancelJob(videoId: string): void {
    this.clearTimer(videoId);
    this.activeJobs.update(jobs => {
      const next = { ...jobs };
      delete next[videoId];
      return next;
    });
    this.saveActiveJobs();
  }

  /**
   * Progressive backoff calculator:
   * Attempts 1-3: 4s
   * Attempts 4-8: 6s
   * Attempts 9+: 8s
   */
  private getNextInterval(attempts: number): number {
    if (attempts <= 3) return 4000;
    if (attempts <= 8) return 6000;
    return 8000;
  }

  private scheduleNextPoll(job: ActiveAiJob, delayMs: number): void {
    this.clearTimer(job.videoId);

    if (this.isOffline) return;

    this.pollTimers.set(
      job.videoId,
      setTimeout(() => {
        this.executePoll(job.videoId);
      }, delayMs)
    );
  }

  private executePoll(videoId: string): void {
    const job = this.activeJobs()[videoId];
    if (!job || job.status !== 'processing') return;

    // Prevent redundant overlapping polls if one is already in flight
    if (this.activeHttpSubs.has(videoId)) return;

    const payload = {
      videoId: job.videoId,
      lang: job.language,
      jobId: job.jobId
    };

    const sub = this.http.post<TranscriptResponse>('/api/transcript', payload).subscribe({
      next: (response) => {
        this.activeHttpSubs.delete(videoId);

        // Scenario 1: Job completed successfully with valid subtitle segments
        if (response.success && response.segments && response.segments.length > 0) {
          this.handleJobSuccess(job, response);
          return;
        }

        // Scenario 2: Completed but zero speech detected
        if (response.success && (!response.segments || response.segments.length === 0)) {
          this.handleJobFailure(job, 'NO_SPEECH_DETECTED', 'No detectable speech found in the audio.');
          return;
        }

        // Scenario 3: Still processing
        if (response.status === 'processing') {
          // Check patience timeout (15 minutes maximum lease)
          const elapsed = Date.now() - job.startedAt;
          if (elapsed > MAX_PATIENCE_MS) {
            console.warn(`[AiJobManager] Job for video ${videoId} exceeded timeout (${Math.round(elapsed / 1000)}s)`);
            this.handleJobFailure(job, 'AI_TIMEOUT', 'Transcription is taking longer than usual. Please check back in a few minutes.');
            return;
          }

          const updatedJob: ActiveAiJob = {
            ...job,
            pollAttempts: (job.pollAttempts || 0) + 1,
            consecutiveErrors: 0 // Reset on successful server response
          };

          this.activeJobs.update(jobs => ({
            ...jobs,
            [videoId]: updatedJob
          }));

          const nextDelay = this.getNextInterval(updatedJob.pollAttempts || 1);
          this.scheduleNextPoll(updatedJob, nextDelay);
          return;
        }

        // Scenario 4: Server returned an explicit failure payload
        if (!response.success && response.error) {
          const fatalCodes = ['NO_SPEECH_DETECTED', 'VIDEO_TOO_LONG', 'INSUFFICIENT_DIAMONDS', 'LIVESTREAM_NOT_SUPPORTED'];
          if (fatalCodes.includes(response.errorCode || '')) {
            this.handleJobFailure(job, response.errorCode || 'AI_JOB_FAILED', response.error);
            return;
          }

          // Non-fatal response payload (e.g. transient internal server state): back off and retry up to 5 times
          const currentErrors = (job.consecutiveErrors || 0) + 1;
          if (currentErrors < 6) {
            console.warn(`[AiJobManager] Non-fatal poll response for ${videoId} (${response.errorCode || response.error}). Retrying (${currentErrors}/5)...`);
            const updatedJob: ActiveAiJob = { ...job, consecutiveErrors: currentErrors };
            this.activeJobs.update(jobs => ({ ...jobs, [videoId]: updatedJob }));
            this.scheduleNextPoll(updatedJob, 6000 + currentErrors * 2000);
            return;
          }

          this.handleJobFailure(job, response.errorCode || 'AI_JOB_FAILED', response.error);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.activeHttpSubs.delete(videoId);

        const currentErrors = (job.consecutiveErrors || 0) + 1;

        // 1. Rate limiting (429): Back off without terminating the user's transcription!
        if (err.status === 429) {
          console.warn(`[AiJobManager] Rate limited (429) for video ${videoId}. Backing off for 12s (attempt ${currentErrors}/8)...`);
          if (currentErrors < 8) {
            const updatedJob: ActiveAiJob = { ...job, consecutiveErrors: currentErrors };
            this.activeJobs.update(jobs => ({ ...jobs, [videoId]: updatedJob }));
            this.scheduleNextPoll(updatedJob, 12000);
            return;
          }
        }

        // 2. Transient network errors (0, 408, 500-599, Cloudflare 520-526)
        const isTransient = err.status === 0 || err.status === 408 || (err.status >= 500 && err.status <= 599);
        if (isTransient && currentErrors < 6) {
          console.warn(`[AiJobManager] Transient poll glitch (${err.status}) for video ${videoId} (attempt ${currentErrors}/6). Retrying...`);
          const updatedJob: ActiveAiJob = { ...job, consecutiveErrors: currentErrors };
          this.activeJobs.update(jobs => ({ ...jobs, [videoId]: updatedJob }));
          this.scheduleNextPoll(updatedJob, 6000 + currentErrors * 2000);
          return;
        }

        // 3. Transient 404 (read replica sync lag or edge route warming): allow up to 3 retries
        if (err.status === 404 && currentErrors < 4) {
          console.warn(`[AiJobManager] Job not found on server yet (404) for video ${videoId} (attempt ${currentErrors}/3). Retrying...`);
          const updatedJob: ActiveAiJob = { ...job, consecutiveErrors: currentErrors };
          this.activeJobs.update(jobs => ({ ...jobs, [videoId]: updatedJob }));
          this.scheduleNextPoll(updatedJob, 5000);
          return;
        }

        // Terminal unrecoverable error
        const errorMsg = err.error?.error || err.message || 'AI transcription failed';
        const errorCode = err.error?.errorCode || 'AI_JOB_FAILED';
        this.handleJobFailure(job, errorCode, errorMsg);
      }
    });

    this.activeHttpSubs.set(videoId, sub);
  }

  private handleJobSuccess(job: ActiveAiJob, response: TranscriptResponse): void {
    this.clearTimer(job.videoId);

    // Format subtitle cues
    const cues: SubtitleCue[] = (response.segments || []).map((seg, idx) => ({
      id: `ai_${job.videoId}_${idx}`,
      startTime: seg.start,
      endTime: Math.max(seg.start + 0.5, seg.start + seg.duration),
      text: seg.text,
      tokens: seg.tokens && seg.tokens.length > 0 ? seg.tokens : undefined
    }));

    const resolvedLang = response.language || job.language;
    const requestedLang = response.requestedLanguage || job.language;
    const isMismatch = response.languageMismatch ?? (
      resolvedLang.split('-')[0].toLowerCase() !== requestedLang.split('-')[0].toLowerCase()
    );

    // Cache locally in IndexedDB / Memory
    this.cacheService.set(job.videoId, resolvedLang, cues, 'ai');
    if (isMismatch) {
      // Also cache under requested language to prevent redundant refetches
      this.cacheService.set(job.videoId, requestedLang, cues, 'ai');
    }

    // Remove from active tracking
    this.activeJobs.update(jobs => {
      const next = { ...jobs };
      delete next[job.videoId];
      return next;
    });
    this.saveActiveJobs();

    // ALWAYS emit jobCompleted$ so TranscriptService and active listeners receive the result
    this.jobCompleted$.next({
      videoId: job.videoId,
      language: resolvedLang,
      requestedLanguage: requestedLang,
      languageMismatch: isMismatch,
      cues,
      source: 'ai'
    });

    // Check if user is currently watching another video or navigated away
    const currentVideoId = this.getCurrentVideoId();
    if (currentVideoId && currentVideoId !== job.videoId) {
      // Route-aware actionable toast alert
      const titleSnippet = job.title ? `"${job.title.slice(0, 32)}..."` : 'video';
      const langSuffix = isMismatch ? ` (${resolvedLang.toUpperCase()})` : '';
      this.toastService.show(`AI Subtitles ready${langSuffix} for ${titleSnippet}!`, {
        type: 'success',
        icon: 'captions-ai',
        duration: 6000,
        action: {
          label: 'Watch',
          action: () => {
            this.router.navigate(['/video'], { queryParams: { id: job.videoId } });
          }
        }
      });
    }
  }

  private handleJobFailure(job: ActiveAiJob, errorCode: string, rawErrorMessage: string): void {
    this.clearTimer(job.videoId);

    let friendlyMessage = 'AI transcription could not be completed.';
    if (errorCode === 'NO_SPEECH_DETECTED' || rawErrorMessage.includes('no detectable speech')) {
      friendlyMessage = 'No detectable speech found in the audio.';
    } else if (errorCode === 'AI_QUOTA_EXCEEDED' || rawErrorMessage.includes('quota')) {
      friendlyMessage = 'Daily AI quota reached. Please try again tomorrow.';
    } else if (errorCode === 'AI_TIMEOUT') {
      friendlyMessage = 'Transcription is taking longer than expected. Please check back later.';
    }

    this.activeJobs.update(jobs => {
      const next = { ...jobs };
      delete next[job.videoId];
      return next;
    });
    this.saveActiveJobs();

    this.jobFailed$.next({
      videoId: job.videoId,
      errorCode,
      error: friendlyMessage
    });

    const currentVideoId = this.getCurrentVideoId();
    if (!currentVideoId || currentVideoId !== job.videoId) {
      const titleSnippet = job.title ? `"${job.title.slice(0, 32)}..."` : 'video';
      this.toastService.error(`AI transcription failed for ${titleSnippet}: ${friendlyMessage}`);
    }
  }

  /**
   * Mobile lifecycle listeners:
   * - visibilitychange: trigger immediate check when returning to tab/app
   * - online: resume polling immediately
   * - offline: pause poll timers to preserve battery and avoid network errors
   */
  private setupLifecycleHooks(): void {
    if (typeof document !== 'undefined') {
      fromEvent(document, 'visibilitychange')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (document.visibilityState === 'visible') {
            this.ngZone.run(() => this.reconcileActiveJobs());
          }
        });
    }

    if (typeof window !== 'undefined') {
      fromEvent(window, 'online')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.isOffline = false;
          this.ngZone.run(() => this.reconcileActiveJobs());
        });

      fromEvent(window, 'offline')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.isOffline = true;
          this.pauseAllTimers();
        });
    }
  }

  /**
   * Reconcile and trigger immediate polling for all active jobs
   */
  reconcileActiveJobs(): void {
    const jobs = this.activeJobs();
    const videoIds = Object.keys(jobs);

    for (const videoId of videoIds) {
      const job = jobs[videoId];
      if (job && job.status === 'processing') {
        this.executePoll(videoId);
      }
    }
  }

  private pauseAllTimers(): void {
    for (const videoId of this.pollTimers.keys()) {
      this.clearTimer(videoId);
    }
  }

  private resumeActiveJobs(): void {
    const jobs = this.activeJobs();
    for (const videoId of Object.keys(jobs)) {
      const job = jobs[videoId];
      if (job && job.status === 'processing') {
        this.scheduleNextPoll(job, 1000);
      }
    }
  }

  private clearTimer(videoId: string): void {
    const timer = this.pollTimers.get(videoId);
    if (timer) {
      clearTimeout(timer);
      this.pollTimers.delete(videoId);
    }
    const sub = this.activeHttpSubs.get(videoId);
    if (sub) {
      sub.unsubscribe();
      this.activeHttpSubs.delete(videoId);
    }
  }

  private getCurrentVideoId(): string | null {
    try {
      const urlTree = this.router.parseUrl(this.router.url);
      return urlTree.queryParams['id'] || urlTree.queryParams['v'] || null;
    } catch {
      return null;
    }
  }

  private loadActiveJobs(): void {
    try {
      const raw = localStorage.getItem(ACTIVE_JOBS_KEY);
      if (!raw) return;
      const parsed: Record<string, ActiveAiJob> = JSON.parse(raw);
      const now = Date.now();
      const valid: Record<string, ActiveAiJob> = {};

      for (const [vId, job] of Object.entries(parsed)) {
        if (job && now - job.startedAt < ONE_HOUR_MS && job.status === 'processing') {
          valid[vId] = job;
        }
      }

      this.activeJobs.set(valid);
      this.saveActiveJobs();
    } catch {
      this.activeJobs.set({});
    }
  }

  private saveActiveJobs(): void {
    try {
      localStorage.setItem(ACTIVE_JOBS_KEY, JSON.stringify(this.activeJobs()));
    } catch {}
  }
}
