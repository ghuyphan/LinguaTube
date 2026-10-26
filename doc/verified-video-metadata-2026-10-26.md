# Official AI video metadata — setup and rollout

The official YouTube Data API now verifies duration and live/upcoming status for AI quotes and new paid jobs. Earlier scrape/Supadata metadata fallback work was superseded. Supadata continues to provide native captions. No changes were made to the sibling web UI.

## Configuration

Enable YouTube Data API v3 for a Google project. Restrict an API key to that API and save it as the encrypted Production Pages secret `YOUTUBE_DATA_API_KEY` on the `lingua-tube` project. Do not commit the key or place it in Flutter. Cloudflare secrets take effect on a new deployment.

The optional plain variable `YOUTUBE_METADATA_DAILY_BUDGET` defaults to 8000 requests. Quotes reserve 1000 of those for final paid verification (smaller custom budgets reserve a smaller share). The atomic D1 counter uses America/Los_Angeles calendar days. Account for any other consumers of Google's project quota. Cached quotes do not consume a provider unit; fresh paid verification does. Quota/configuration errors return safe structured codes and Retry-After without exposing provider credentials or raw responses.

## Apply schema before deploying the backend

From the backend repository, apply this migration exactly once after the previous D1 recovery migrations:

```sh
npx wrangler d1 execute linguatube-vocab --remote --file db/migrations/d1/20261026_verified_video_metadata.sql
```

The migration creates independent verified metadata, daily budget and provider-backoff tables, adds display duration source, and adds nullable duration evidence fields to existing AI jobs. No historical display duration is promoted to billing evidence. Existing jobs remain resumable. ALTER TABLE statements are not repeatable; inspect columns if execution was interrupted instead of replaying blindly.

Run `npm run build:functions` and deploy the normal Pages artifact containing the rebuilt functions. Do not manually edit generated `functions/`. Pages deployment publishes static assets as well as functions; use the project's intended current artifact rather than uploading stale local static output. No migration or production deployment is performed merely by adding the secret.

## Behavior

- Two quotes during confirmation share up to five-minute-old verified metadata; personalized balances/tier eligibility remain request-scoped, with HTTP no-store.
- New paid jobs ignore quote-cache freshness and fetch official metadata again before tier/price checks, reservation and charge. Paid job rows record duration, source and verification time.
- Exact ID, explicit broadcast state and valid ISO duration are mandatory. Live/upcoming content is blocked; ended recordings with finite duration use ordinary tier limits.
- Failed verification creates no paid operation. Empty official results return VIDEO_UNAVAILABLE; transient failures return 503 VIDEO_DURATION_UNAVAILABLE with Retry-After. Missing key/storage uses explicit metadata configuration/storage codes. There is no billing fallback to a player report, scraper or subtitle ending.
- Provider failures cause shared backoff; no blind provider retries. The budget provides a global upper bound on requests even across isolates. Concurrent misses can still perform duplicate lookups within that budget; no warm-isolate promise is presented as global deduplication.
- Cached AI transcripts, active shared jobs and polling retain their zero-new-charge paths. Existing atomic PostgreSQL/D1 charging and ambiguous Gladia submission/refund recovery are preserved.
- Display reports use client_player/client_estimate provenance. A later player report can correct an estimate; estimates cannot downgrade that report. These fields never alter the billing cache.
- Flutter strips app Authorization on requests outside the configured backend origin and retains a chance to report the real duration after an estimate timer.

The official duration is the operation's pricing input, not a promise of exact provider audio length or accessibility. Do not automatically add charges based on later provider duration. Existing provider failure/refund handling remains necessary.

## Verification

Tests cover official ISO forms/price boundaries, exact video identity, live/upcoming/ended states, malformed/oversized responses, missing configuration, provider backoff, quota reserve, warm quotes/fresh spending, per-job evidence, estimate corrections and isolation from billing evidence. Flutter tests cover external-origin token stripping and estimate flags, plus existing quote/session/recovery behavior. The backend integration fixtures apply the new migration.

After deployment:

1. Read GET /api/transcript with VocaMobile User-Agent and confirm hasYouTubeDataKey is true. This checks configuration presence only.
2. Submit quoteOnly requests for known public videos and the reported video ID. Verify cost/duration, then repeat to observe cache reuse. Quotes make no paid transcription submission.
3. Verify live/upcoming rejection and malformed-input rejection. Inspect metadata logs and quota counters without logging secrets.
4. Paid end-to-end smoke tests require deliberate human confirmation and consume provider credits. Do not claim one was performed from unit tests or health checks.

All changes remain uncommitted until explicitly requested. Record local and production verification separately.

Local results: 297 backend unit/integration checks passed with no skips; a dedicated Miniflare 4/workerd/D1 test passed for the actual cache, quota and fresh-verification queries. Backend ESLint and all 25 function bundles passed. Flutter analysis reported no issues; the full Flutter suite passed 933 tests. Production secret-name inspection confirmed encrypted YOUTUBE_DATA_API_KEY is present on lingua-tube; its value was not read. Migration and deployment are still pending explicit release authorization. These tests do not establish live official API connectivity with the saved key.

## Production rollout and broadcast timestamp follow-up

The additive D1 migration was applied and its tables/columns verified. Backend f8e24c0 was pushed to main, deployed to Production, and passed GitHub CI. Production quotes verified the exact reported video VW1ayoCUjy8: 1236 seconds, cost 3 diamonds; anonymous eligibility correctly reports VIDEO_TOO_LONG. A 19-second public video quotes 1 diamond; unavailable results return 404. Quotes did not submit paid transcription work.

The initial live-test candidate jfKfPfyJRdk was a historical broadcast that ended on 2026-05-20, as confirmed by its public player broadcast timestamps. Its none classification and large elapsed duration were correct; the failed live assertion used an outdated fixture and did not demonstrate a Google classification defect. The verifier was additionally hardened to request actualStartTime, actualEndTime and scheduledStartTime: a started broadcast without an end is live, a scheduled broadcast without start/end is upcoming, and empty/inconsistent broadcast evidence fails closed. Timestamp regression cases and older workerd fixtures were updated.

Regression results after the timestamp change: 300 backend checks pass; the broader workerd/D1/R2 route and recovery suite is run separately. Mobile fixes remain uncommitted in the Flutter working tree and require an app build/release; a backend deployment does not distribute native code.

## Final production verification

Backend 56b13c5 deployed successfully to Production as 3cf5df37-b31c-42fd-bcfe-2ed984cc4a3b. GitHub lint/build/test checks and the Cloudflare Pages deployment check both succeeded. Public voca.study quote requests verified:

| Case | Result |
| --- | --- |
| Reported video VW1ayoCUjy8 | HTTP 200; official duration 1236 seconds; cost 3; repeat returns the same metadata |
| Short video jNQXAC9IVRw | HTTP 200; duration 19 seconds; cost 1; anonymous generation eligible |
| Active Lofi broadcast 0sfDth4lMLc | HTTP 400 LIVESTREAM_NOT_SUPPORTED |
| Active NASA broadcast ROboUHfPUrU | HTTP 400 LIVESTREAM_NOT_SUPPORTED |
| Unavailable video zzzzzzzzzzz | HTTP 404 VIDEO_UNAVAILABLE |

The two active broadcasts were confirmed via their public channel live-page player timestamps before testing. Requests used quoteOnly=true, no CAPTCHA, no account credentials, and no paid transcription submission. The reported-video quote includes VIDEO_TOO_LONG for the anonymous test account's 600-second cap; authenticated tier eligibility remains server-owned. Sending duration=1 did not change the official duration or price. The first five quote requests consumed four official requests, confirming repeat-cache reuse. D1 readback confirms the verified source/normalized broadcast states. No authenticated purchase, CAPTCHA or provider transcription end-to-end test is claimed.

Final local validation: 300 backend unit/integration checks and 371 workerd/D1/R2 checks passed with no skips. All 25 function bundles and backend ESLint passed. The full Flutter suite passed 933 tests, with zero analysis issues; later focused player/navigation/security checks passed 22 tests. Native changes are not included in the backend commits and require an app release.

## Shared official display details

Names, channel names/IDs, tags, thumbnails and raw YouTube category IDs now travel in the same official request as duration/broadcast state. `verified_video_metadata.snippet_json` stores the details; `/api/video-info` hydrates protected catalog fields in `video_languages`. Existing duration-only cache entries upgrade lazily. Raw category IDs and mapped Voca categories remain distinct. Existing explicit categories are marked manual; legacy non-general categories are preserved conservatively. New or unclassified entries use official category mapping and the existing keyword classifier. An official empty tags array clears obsolete tags. Repeated reads reuse the stored response without rewriting the catalog or changing discovery timestamps.

Before deployment, apply once:

```sh
npx wrangler d1 execute linguatube-vocab --remote --file db/migrations/d1/20261026_video_metadata_details.sql
```

The main display endpoint no longer scrapes video pages or uses oEmbed for names/category. Recommendation name healing uses the same official compatibility helper; caption persistence leaves missing public details for official hydration instead of making hidden oEmbed calls. Channel-avatar scraping/enrichment is a separate preexisting path. Native callers of the legacy-named fetchYouTubeOembed method receive the same response shape from the Edge metadata endpoint; they require an app build to receive that native routing change. Existing released clients already using getVideoInfo benefit from the backend immediately.

Display-details local verification: 310 backend checks and 371 workerd/D1/R2 checks pass with no skips; all 25 function bundles and backend lint pass. Native metadata/player/navigation tests pass (23 tests), and Flutter analysis reports no issues. The full shared Flutter working tree currently has two vocabulary UI assertion failures (vocabulary_screen_test.dart and study_and_vocabulary_test.dart, missing expected filter/list labels); both reproduce separately and are outside the metadata changes. Those concurrent UI edits were preserved. The new details migration was applied successfully before deployment. Live display details and database persistence are verified after the deployment completes.

Production details checks on 7cba22f verified matching title/channel/tags/raw category IDs in both the public API and D1, and a repeated request returned the same verification timestamp. The reported video has YouTube category 19 (Travel & Events), revealing a missing direct mapping; it is now mapped into Voca vlog, alongside People & Blogs. Music category 10 maps to music. Category 1 retains the existing Film & Animation mapping; Voca groups are heuristic content groupings, not a guarantee of semantic accuracy for creator-selected categories. Metadata retrieval/JSON persistence is official; the Voca label remains explicitly mapped. Unavailable metadata returns 404. Native vocabulary UI test failures remain separate from the successful backend and metadata tests.

The Travel & Events mapping follow-up also refreshes an automatically mapped category when the mapping changes but the stored official observation is unchanged; manual/legacy edits remain protected and identical repeated reads still avoid catalog rewrites. Final local results for this follow-up: 311 backend checks and 371 workerd checks passed, including a real workerd/D1 display-GET persistence check.
