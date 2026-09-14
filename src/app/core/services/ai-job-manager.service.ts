import { Injectable, signal, inject, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ActiveAiJob, SubtitleCue, TranscriptResponse } from '../../models';
import { TranscriptCacheService } from '../../services/transcript-cache.service';
import { ToastService } from './toast.service';

const ACTIVE_JOBS_KEY = 'voca_active_ai_jobs';
const LEGACY_JOBS_KEY = 'voca_pending_ai_jobs';
const MAX_PATIENCE_MS = 180000; // 3 minutes maximum patience
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
    this.migrateLegacyJobs();
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

    // Check 3-minute patience timeout
    const elapsed = Date.now() - job.startedAt;
    if (elapsed > MAX_PATIENCE_MS) {
      console.warn(`[AiJobManager] Job for video ${videoId} exceeded 3-minute timeout`);
      this.handleJobFailure(job, 'AI_TIMEOUT', 'Transcription is taking longer than usual. Please check back in a few minutes.');
      return;
    }

    const payload = {
      videoId: job.videoId,
      lang: job.language,
      jobId: job.jobId
    };

    const sub = this.http.post<TranscriptResponse>('/api/transcript', payload).subscribe({
      next: (response) => {
        this.activeHttpSubs.delete(videoId);

        // Scenario 1: Job completed successfully
        if (response.success && response.segments && response.segments.length > 0) {
          this.handleJobSuccess(job, response);
          return;
        }

        // Scenario 2: Still processing
        if (response.status === 'processing') {
          const updatedJob: ActiveAiJob = {
            ...job,
            pollAttempts: (job.pollAttempts || 0) + 1
          };

          this.activeJobs.update(jobs => ({
            ...jobs,
            [videoId]: updatedJob
          }));

          const nextDelay = this.getNextInterval(updatedJob.pollAttempts || 1);
          this.scheduleNextPoll(updatedJob, nextDelay);
          return;
        }

        // Scenario 3: Unexpected error payload with success: false
        if (!response.success && response.error) {
          this.handleJobFailure(job, response.errorCode || 'AI_JOB_FAILED', response.error);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.activeHttpSubs.delete(videoId);

        // Network error (status 0) or transient 502/503/504 gateway glitches
        const isTransient = err.status === 0 || (err.status >= 502 && err.status <= 504);
        if (isTransient) {
          console.warn(`[AiJobManager] Transient poll glitch (${err.status}) for video ${videoId}. Retrying in 6s...`);
          this.scheduleNextPoll(job, 6000);
          return;
        }

        // Terminal error (e.g. 400 Bad Request, 404 Expired, 402 Quota)
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
      text: seg.text
    }));

    const resolvedLang = response.language || job.language;

    // Cache locally in IndexedDB / Memory
    this.cacheService.set(job.videoId, resolvedLang, cues, 'ai');

    // Remove from active tracking
    this.activeJobs.update(jobs => {
      const next = { ...jobs };
      delete next[job.videoId];
      return next;
    });
    this.saveActiveJobs();

    // Check if user is currently watching the completed video
    const currentVideoId = this.getCurrentVideoId();
    if (currentVideoId === job.videoId) {
      // Direct in-player application
      this.jobCompleted$.next({
        videoId: job.videoId,
        language: resolvedLang,
        cues,
        source: 'ai'
      });
    } else {
      // Route-aware actionable toast alert
      const titleSnippet = job.title ? `"${job.title.slice(0, 32)}..."` : 'video';
      this.toastService.show(`AI Subtitles ready for ${titleSnippet}!`, {
        type: 'success',
        icon: 'sparkles',
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
  }

  /**
   * Mobile lifecycle listeners:
   * - visibilitychange: trigger immediate check when returning to tab/app
   * - online: resume polling immediately
   * - offline: pause poll timers to preserve battery and avoid network errors
   */
  private setupLifecycleHooks(): void {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.ngZone.run(() => this.reconcileActiveJobs());
        }
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOffline = false;
        this.ngZone.run(() => this.reconcileActiveJobs());
      });

      window.addEventListener('offline', () => {
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
      return urlTree.queryParams['id'] || null;
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

  private migrateLegacyJobs(): void {
    try {
      localStorage.removeItem(LEGACY_JOBS_KEY);
    } catch {}
  }
}
