# Recommendation optimization and deployment — 2026-11-01

## Delivered

- Shared Cloudflare backend deployed to production at https://voca.study. Deployment: `4e6ad152-0421-4b8d-a9e9-3b3c2168b11e` ([deployment URL](https://4e6ad152.lingua-tube.pages.dev)).
- Signed Android test APK: `../voca_flutter/build/releases/voca-recommendations-2026-11-01.apk`; version **1.0.1+30**, package `com.voca.voca_flutter`, 140,761,135 bytes. Android signature verification passed and the signer matches the configured distribution keystore. No store upload was requested or performed.
- The APK is built from Flutter HEAD `9a3817c` plus the four recommendation implementation files and two regression-test files. Unrelated ongoing worktree edits were excluded. The dependency lock remained unchanged.
- All source edits remain uncommitted. No schema migration, dependency update or version bump was needed.

## Optimization

Successful verified public browse candidates are cached for **15 seconds**, with at most **20 filter keys per D1 binding** and matching R2 ownership. Each candidate pool stays within the existing 200-video discovery window. Searches and explicit refresh bypass the candidate cache; expired entries are evicted on publication. Failed/incomplete discovery is never cached, and no in-flight I/O is shared across requests.

The cache contains public metadata only. Ranking still runs separately with each request's learner context. Completion status, vocabulary matches and personalized results are never retained in the candidate cache. Returned nested language arrays are defensive copies. The existing generic response cache can independently retain a page for 30 seconds; client stream caches are unchanged. Explicit refresh bypasses both backend layers.

`X-Candidate-Cache` exposes metadata reuse independently of the existing `X-Cache`; personalized responses continue to report `BYPASS-PERSONALIZED` even when public candidates are reused.

## Measured fixture results

Existing benchmark: 400 videos, seed 1111, five pages of 24, 20 warm local repetitions. Baseline is backend Git HEAD `f8b249c`; revised is the deployed working implementation.

| Metric | Baseline | Optimized |
| --- | ---: | ---: |
| Cold five-page D1 discovery queries | 5 | 1 |
| Warm five-page D1 discovery queries | 5 | 0 |
| Warm median five-page processing, one recorded run | 4.06 ms | 0.50 ms |
| Returned / unique videos | 120 / 120 | 120 / 120 |
| Duplicate entries | 0 | 0 |
| HTTP requests | 5 | 5 |

These timings are in-memory SQLite measurements, excluding network, Worker startup and real provider/storage latency. They do not establish a sustained production latency or engagement improvement. Runtime reported Node v25.2.1.

## Production verification

Four consecutive personalized Japanese requests returned **38 unique videos, zero duplicates**, correct exhaustion, finite ranking scores and requested-language membership. Candidate headers were `MISS`, `HIT`, `HIT`, `HIT`; all four response headers were `BYPASS-PERSONALIZED`. Recorded client-observed request times were 874, 182, 336 and 150 ms. This small smoke sample confirms cache reuse, not a controlled latency comparison.

Production compatibility settings, D1/R2/KV bindings and variable definitions match the prior deployment. All **197 web asset hashes** and the **exact service-worker manifest bytes** match the prior live release. An initial upload (`3bb1b04b-c22b-4359-95fd-5d91407ffb80`) had only a manifest timestamp difference; the final deployment restores the original manifest. No web service/UI changes or rebuilt web release were published.

Prior production deployment for rollback: `8e470b6b-998e-49b0-ba49-136e871a404f`. Private deployment evidence and staged artifacts are under `/tmp/voca-recommendation-deploy-20261101`; credential-bearing project snapshots are not deliverables.

## Validation

- Backend regression suite: **246 passed**, zero failed/skipped, with live E2E disabled.
- ESLint on all three changed backend modules: passed.
- Generated Functions: **25 built**, zero failures; Wrangler Worker compilation passed.
- Isolated Flutter release analysis: **zero issues**.
- Focused Flutter suites: **36 passed**.
- Full isolated Flutter release suite: **1,432 passed**, zero failures.
- Android release build completed; APK signature, distribution signer and package/version verified. The temporary signing-property copy was removed afterward.
- Both repositories' diff whitespace checks passed.

The previous full shared-worktree run's stamp-inspection failure was in unrelated ongoing edits; those edits are absent from this test APK. No physical-device, paid-provider or store-distribution E2E test was performed.

## Artifact integrity

APK SHA-256: `4bd9b27c448b3d1a16ca1a91f55eafb07dc1491a86d64daa0a9d5a0d637e0ed5`

Signer SHA-256: `89c571835d1917eb63f5b2a9dc49a1195ab24c8f546c335a286fe108ef6fb4bb`

A checksum sidecar accompanies the APK. The fixed candidate-window coverage, title-only vocabulary matching and lack of engagement-trained weights remain known limitations.
