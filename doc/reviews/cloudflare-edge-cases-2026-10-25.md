# Cloudflare edge-case tests — 25 October 2026

Status: implemented and passing locally. All **24 API route modules plus shared middleware** have explicit inventory entries. The new workerd suite executes **359 scenarios**: 326 route/middleware cases and 33 direct provider cases. Its TAP output includes one parent test (360 passed). The default backend suite now has **193 passing tests**, including forty new shared edge-case tests. Existing D1/Gladia integration suites pass 16 tests, and the original nine optimization scenarios still pass (ten TAP tests including their parent).

This is explicit scenario coverage, not a claim of exhaustive branch/line coverage or every possible failure state. Gemini's dictionary/tokenizer modules and frontend changes were preserved; their current route boundaries are exercised without editing their implementations.

## Defects discovered and fixed

1. **Native Workers fetch compatibility:** auth, server-only Supabase REST, YouTube duration verification, Gladia submission/recovery, translation, payOS and RevenueCat recovery used `redirect: 'error'`. The actual runtime rejects that option before making the request. These calls now use `manual` and retain non-2xx rejection, so redirects are not followed with server credentials. Native outbound tests verify accepted Gladia submission, uncertain-response classification and redirect rejection; payment and translation helpers also run through real workerd fetch. The earlier nine-scenario fixture replaced global fetch and could not detect this class of bug.
2. **Malformed or absent JSON bodies:** several routes turned invalid JSON into 500 responses; other mutation paths could select defaults after parse failure. Shared middleware now rejects malformed/scalar/array/null bodies and invalid UTF-8 before dispatch, with a byte-based two MiB limit. Accepted bodies retain their exact bytes for webhook authentication. Missing/zero-byte bodies remain supported for the two maintenance endpoints; their handlers still enforce authentication. A Node-versus-workerd difference in zero-byte request streams was caught and corrected during validation.

These are local source changes. Generated Functions were rebuilt using the existing script, without version/dependency changes, remote migrations or deployment. The D1 prerequisite from the [optimization implementation](cloudflare-functions-implementation-2026-10-25.md#deployment-prerequisite-and-recovery) still applies before deploying the combined workspace.

## Route matrix

Every route below runs through the real API middleware. Shared cases cover bot rejection where applicable, preflight, oversized bodies and malformed JSON objects for body-consuming routes. Case counts include shared contracts and route-specific scenarios; they are not line-coverage percentages.

| Route module | Scenarios | Additional checks |
| --- | ---: | --- |
| `diamonds` | 4 | Authoritative anonymous balance shape; exact 60/61 rate-limit boundary. |
| `dict` | 10 | Missing/sanitized-empty word, unsupported source, provider outage → 503. |
| `dual-subtitles` | 18 | Required query, invalid cue types/timing/text size, empty/oversized batches. |
| `geo` | 6 | Absent country, XX/T1 sentinels and country normalization with cf data controlled. |
| `gladia-webhook` | 11 | Unsigned callback rejected; body controls run before handler side effects. |
| `heal-levels` | 13 | Admin gate, missing D1 and no-body maintenance compatibility. |
| `internal/reconcile` | 12 | Absent/wrong dedicated secret, missing D1 and optional body. |
| `kanji` | 4 | Missing query and actual upstream failure → 502. |
| `leaderboard` | 11 | Invalid-body guards and seed fallback during upstream outage. |
| `payment/check-status` | 10 | Order format/unsafe integer checks, missing identity and authenticated owner filter. |
| `payment/create-order` | 16 | Missing/invalid/expired credentials and authenticated prototype-name plan rejection. |
| `payment/revenuecat-webhook` | 13 | Missing/wrong secret and sandbox-ignore behavior. |
| `payment/webhook` | 11 | Unsigned payment rejection before grants. |
| `recommended-videos` | 13 | Missing D1 → 503 and a genuinely empty catalog → success. |
| `tokenize-batch/[lang]` | 20 | Invalid arrays/items/size and exact 800-item accepted boundary with authenticated quota. |
| `tokenize/[lang]` | 19 | Unsupported language/method, type/length rejection and exact 10,000-character accepted boundary. |
| `transcript` | 29 | Malformed video IDs/flags/job IDs/durations, unsupported language and polling URL restrictions. |
| `translate/[[path]]` | 4 | Missing path and same-language URI decoding without provider work. |
| `translate/batch` | 20 | Invalid types/items/size; blank/same-language bypass; exact 80-item accepted boundary. |
| `tts` | 18 | Invalid types/length; both-provider outage, too-short fallback audio and successful binary fallback. |
| `version` | 4 | Compiled fallback and weak ETag revalidation returning an empty 304. |
| `video-category` | 22 | Public taxonomy/fallback, auth outages/redirect/identity mismatch, invalid category and valid persistence. |
| `video-info` | 18 | Missing ID, invalid duration range/type and actual metadata provider outage. |
| `video-level` | 20 | Authentication, language/level/ID rejection, low confidence and bounded confidence/details persistence. |

## Provider and shared-module coverage

The 33 direct runtime cases cover Gladia creation HTTP 302/400/401/408/429/500/503, accepted creation, missing configuration, malformed/missing accepted IDs, processing/done/error polling, Retry-After, invalid polling hosts and empty/foreign/multiple metadata matches. They also cover Supabase no-content/malformed/redirect responses, payOS success/outage/redirect, translation success/fallback after malformed/redirect responses and YouTube duration success/redirect. Redirect targets must receive zero requests; Gladia creation cases send exactly one POST. These exercise real runtime fetch with controlled external replies.

The forty new default helper tests add streamed byte boundaries (exact limit, excess bytes, Unicode bytes and false Content-Length), raw signed-byte preservation, invalid UTF-8, cancellation and stalled-body abort, missing bodies, Node/workerd maintenance-body compatibility, LRU expiry/eviction, corrupted KV, failed writes/background refresh, exact-input hashes, deterministic hostile-input sanitizer checks, secret mismatch and response redaction. R2 tests cover missing/corrupt/outage/empty reads, stale-job publication guards, failed CAS, enrichment deduplication/cleanup and preservation of metadata. Transcript timing invariants run across repeated multilingual cues. Production Turnstile rejects HTTP/network/JSON/provider failures.

Existing suites remain responsible for deeper domain state transitions:

| Domain | Existing evidence |
| --- | --- |
| Concurrent charges, replay, depletion, refund commit and recovery | `d1-recovery.integration.mjs`, `backend-reliability.test.mjs`, `production-hardening.test.mjs` |
| Callback authentication/inbox, identity conflicts, leases, durable ingestion failures, poll backoff and uncertain-submission recovery | `gladia-recovery.integration.mjs`, `backend-optimization.test.mjs` |
| Concurrent translations, partial-save preservation, duration trust, shared refresh and slow-tokenizer transcript response | `cloudflare-review-validation.integration.mjs` (rerun against the final source) |
| Cross-isolate R2 conflict retry and preserved winning chunks | Conditional-write fault test in `production-hardening.test.mjs`; not a live regional concurrency benchmark |
| Recommendation pagination, search/context bounds, probe/scan exhaustion and personalized cache bypass | `recommendations.test.mjs` |
| Payment signature/amount/transactional RPC, RevenueCat event persistence and retry | `backend-security.test.mjs`, `production-hardening.test.mjs`, `recovery.test.mjs` |
| Dictionary parsing and multilingual tokens/grammar | Existing tests preserved from Gemini's work; this task adds HTTP boundary checks only |

## Reproducibility and evidence

- [All-route runtime evidence](cloudflare-edge-cases-2026-10-25.json): per-case status/outbound calls and SHA-256 fingerprints of all 62 function source modules. Source integrity is checked before evidence is written.
- [Original optimization regressions rerun on the corrected source](cloudflare-edge-optimization-regression-2026-10-25.json): responses, storage states, call counts and source fingerprints.
- [Runtime runner](../../tests/cloudflare-routes-edge-cases.integration.mjs), [case inventory](../../tests/fixtures/cloudflare-edge-cases.mjs), [shared-helper tests](../../tests/cloudflare-shared-edge-cases.test.mjs).
- [Commands and external Miniflare setup](../development-guide.md#running-all-route-edge-cases).

Runs used Node 22.23.4, Miniflare 4.20260730.0/workerd 1.20260730.1, compatibility date 2024-12-20 and `nodejs_compat`. The runtime fixture bundles every route with the actual middleware, uses real local D1/R2/KV and controls responses through `outboundService`; it does not replace global fetch. Geo cf data is explicitly cleared to test header fallbacks. Authentication and provider replies use fixture identities/secrets only. Background tasks are awaited for deterministic assertions.

Build: 25 Functions entry points succeeded. Lint/locale checks and `git diff --check` passed. No full frontend build was run.

## Limits

Live YouTube/Gladia/payOS/RevenueCat availability, actual billing, real Supabase RLS/RPC deployment and regional Cloudflare replication are not validated by fixture responses. The opt-in live E2E and remote database-security suites were not run. Streaming backpressure over real networks and arbitrary multi-region schedules are outside this local scenario set. Optional token enrichment does not cancel the underlying tokenizer initialization; Gemini's implementation remains separate. Some helper paths are exercised transitively; the route inventory does not establish every source line has run.

The new all-route tests are optional when Miniflare is not configured and report a skip in that case. Their current successful run is explicitly recorded above; a normal backend-only run does not substitute for the Workers run. The default suite enforces inventory completeness so adding an API source without a test entry fails immediately.

References: [Cloudflare Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/), [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/), [Supabase JWT verification](https://supabase.com/docs/guides/auth/jwts).
