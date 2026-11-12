# Backend audit verification — 2026-11-04

This verifies the supplied Gemini findings against the local source and deterministic runtime checks. It is not a new exhaustive audit or evidence of production deployment. Existing uncommitted recommendation changes were preserved. The initial audit made no production requests, billable transcription, migrations, commits, or deployment. The subsequent user-authorized deployment is recorded in [production deployment verification](backend-audit-deployment-2026-11-04.md).

## Findings and disposition

| Report claim | Verification | Result |
| --- | --- | --- |
| GET/HEAD middleware crash | Confirmed for real HTTP ingress with an explicit zero-length stream, not ordinary bodyless requests. A Node constructor test alone does not establish ingress behavior. | Empty streams forward with `body: null`; nonempty GET/HEAD bodies return 400. Existing streamed-byte limits and signed POST bytes remain intact. |
| Auth outages become 401 or anonymous | Confirmed: Auth HTTP failures and profile exceptions returned `valid: false`; optional routes used anonymous ownership. Automatic mobile logout was not established: the inspected Flutter client forwards 401 and retries idempotent GET 5xx. | Auth transport failures, unexpected status/redirects, throttling, malformed responses, and access-state failures return noncacheable 503 `AUTH_UNAVAILABLE` with `Retry-After: 5`. Every direct auth caller propagates this response before using anonymous quotas. Rejected tokens remain invalid; missing credentials preserve optional-auth behavior. |
| Recommendation order index mismatch | Confirmed with SQLite EXPLAIN for the actual expression and cursor. Schema permits null timestamps. Removing COALESCE would change compatibility behavior. | Add `idx_video_languages_coalesce_order` on `(COALESCE(updated_at, 0) DESC, video_id ASC)` in base schema and an additive migration. Preserve null-as-zero order/cursor behavior. Existing index is retained. |
| KV reads always miss because current writes are disabled | Current write paths are disabled, but this does not prove existing namespace entries or external writers are absent. Read fallback is explicit in the implementation; tests exercise populated legacy KV. | Preserve read compatibility and existing TTL/fallback protections. No production hit-rate or contents verification was authorized/performed. Do not claim guaranteed misses, zero rollout risk, or measured latency savings. |
| Webhook unnecessarily bundles tokenizers | Confirmed by esbuild dependency graphs. Canonical transcript publication already preceded optional enrichment; callback receipt already persists a durable inbox. | Remove the optional enrichment import from recovery. The transcript polling caller schedules enrichment after successful ingestion; cached reads/native persistence retain their enrichment paths. No new queue, service, or abstraction. |
| Metadata healing serializes I/O and may write twice | Confirmed. Existing provider timeouts and waitUntil lifetime matter; no production timeout rate was measured. | Process at most five videos, two at a time, with independent fields fetched concurrently. Stop starting batches after 15 seconds. Consolidate repairs into one conditional update per video, preserving fresher nonempty fields and discovery timestamps. |
| Obsolete D1 tables should be removed | No current Functions callers does not prove all operational or external consumers are gone. Removing bootstrap definitions changes new-environment compatibility. | Retain tables and identify their legacy role in the schema. No destructive migration. |
| Unused recommendation wrapper | Only caller was its old unit test. | Remove `getRecommendedVideosFromD1`; retarget the existing behavioral coverage to `getRecommendedVideosFromCloudflare`. |
| Version override reset | No defect established; supplied report itself says it already works. | No change. |

## Measured bundles

Sizes are generated route artifacts, not the final combined Pages deployment artifact. Gzip is measured locally with Python's gzip library; no cold-start timing claim follows from these sizes.

| Route | Before bytes | After bytes | Before gzip bytes | After gzip bytes |
| --- | ---: | ---: | ---: | ---: |
| gladia-webhook | 931046 | 49829 | 327291 | 18970 |
| internal/reconcile | 932686 | 51476 | 327502 | 19245 |
| transcript | 983078 | 983435 | 342125 | 342229 |

The transcript still needs tokenization. Tests assert that webhook and maintenance dependency graphs exclude the optional tokenizer and NLP packages.

## Corrections to platform claims

- Workers native rate limiting is approximate, eventually consistent, and separate per Cloudflare location; it does not provide atomic worldwide quota enforcement. Keep transactional financial authority. [Official rate-limiting documentation](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
- The report's 1 MB Free script ceiling is outdated. Workers documentation lists 3 MB compressed for Free and 10 MB for Paid. Per-route minified sizes alone cannot establish a Pages deployment-limit violation. `waitUntil` extends post-response work for up to 30 seconds; there is no general two-second background budget. [Official limits](https://developers.cloudflare.com/workers/platform/limits/).
- An ordering index avoids the demonstrated temporary sort; residual language/category/search filters can still scan entries. O(limit) rows read, fixed millisecond improvements, and traffic-based cost savings were not measured and are not promised.

## Verification

Baseline: `SKIP_LIVE_E2E=1 npm run test:backend` passed 246 tests before edits.

New focused coverage exercises retryable auth classification, protected and optional-auth callers, no financial/quota work during an auth outage, generated dependency graphs, real SQLite expression-index plans, null/zero order parity, migration replay, bounded metadata repair concurrency and concurrent publisher preservation. The native workerd suite includes real HTTP ingress tests for bodyless, explicitly empty, and nonempty GET/HEAD requests.

Final checks:

- Supported Node v22.23.4: `SKIP_LIVE_E2E=1 npm exec --yes --package=node@22 -- node --test tests/*.test.mjs` — **259 passed, zero failures/skips**.
- Supported Node v22.23.4 with temporary Miniflare tooling: `node --test tests/cloudflare-routes-edge-cases.integration.mjs tests/gladia-recovery.integration.mjs` — **371 passed, zero failures/skips**. Set `VOCA_MINIFLARE_MODULE` to the external Miniflare module path. Includes all-route workerd and nine durable Gladia recovery tests.
- `npm run lint` — passed, including five-locale translation validation and Functions ESLint.
- `npm run build:functions` — **25 routes built successfully**.
- `git diff --check` and documentation link/fence checks — passed.

The initial post-change unit run exposed a pre-existing malformed access-state mock: the non-admin maintenance test supplied an array to an RPC that returns one object. Previously it exercised failed authentication rather than authenticated authorization. The fixture now supplies the valid user object and still verifies non-admin rejection.

Workers types `5.20261104.1` and Miniflare were retrieved outside the repository; dependency manifests/lockfiles were unchanged. Host Node v25.2.1 also ran focused/runtime checks, but final backend verification used supported Node 22. No Flutter source changed, so Flutter/device checks were not run. No production latency, hit-rate, external consumer inventory, or live billing validation was available/performed.

## Rollout

Apply `db/migrations/d1/20261104_video_languages_coalesce_order_index.sql` to each intended D1 environment through the normal migration workflow to activate the index optimization. It is additive and repeatable; the API remains functional before the index is applied. Existing tables/indexes and transcript formats are preserved. Deploy the rebuilt Pages Functions through the normal release process. Production migration and deployment were subsequently completed and verified; see [deployment record](backend-audit-deployment-2026-11-04.md).
