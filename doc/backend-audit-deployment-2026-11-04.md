# Backend audit deployment — 2026-11-04

The user authorized production deployment of the verified backend fixes and additive D1 index. Cloudflare Pages project `lingua-tube` now serves production deployment **a59861b3-fd06-47de-a042-dc48650b8e81**, status **success**, at [voca.study](https://voca.study) and [the deployment URL](https://a59861b3.lingua-tube.pages.dev).

## Shipped

- Empty GET/HEAD ingress handling and explicit rejection of nonempty bodies.
- Authentication-availability 503 propagation across all direct route callers, preserving anonymous ownership only under the existing optional-auth policy.
- Recovery/webhook bundles without the optional NLP tokenizer dependency; transcript callers retain enrichment scheduling.
- Bounded recommendation metadata repair, conditional combined updates, and removal of the unused recommendation wrapper.
- `db/migrations/d1/20261104_video_languages_coalesce_order_index.sql`, applied to production D1 `linguatube-vocab` (`35b6faad-cba0-4ad0-8033-f55799d061aa`). Remote schema inspection confirms `idx_video_languages_coalesce_order`; remote EXPLAIN confirms a covering index scan without a temporary sort. The existing index and all table data were retained.

## Production verification

- Cloudflare's canonical production deployment points to the new successful deployment.
- **20 live smoke checks passed**, split across the production domain and deployment URL: version read/ETag, empty GET, nonempty GET rejection, empty HEAD, transcript health, invalid transcript ID, malformed JSON, recommendation response, and forged-token rejection on a protected mutation route. No paid AI generation or real-account mutation was used.
- Existing production/preview configuration is identical before and after deployment, including encrypted variable definitions, bindings, compatibility date `2024-12-20`, and `nodejs_compat`.
- All **197 manifest-listed web asset hashes** match the prior production release. The exact service-worker manifest bytes and all 206 staged static files were preserved. Cloudflare reused all 204 ordinary uploaded assets; headers/redirects and the Functions bundle were handled separately.
- Wrangler 4.156.0 compiled the staged Functions into one Worker successfully before upload. The staged Functions match the local generated output and source fingerprints were checked again after deployment.
- Pre-deployment checks from [audit verification](backend-audit-verification-2026-11-04.md): 259 backend tests and 371 integration checks passed on supported Node 22; lint and all 25 Functions builds passed.

[Sanitized deployment evidence and source fingerprints](reviews/backend-audit-deployment-2026-11-04.json) contain no credentials. Private configuration snapshots and staging evidence remain under `/tmp/voca-backend-audit-deploy-20261104` and are not deliverables.

## Flutter compatibility

**No Flutter code change, APK rebuild, or store release is required for these fixes.** Existing requests and successful API payloads remain compatible. The client targets the same `https://voca.study` origin, already handles server failures, and retries transient 502/503/504 responses for idempotent GET requests. POST callers retain their existing error/retry flow; the new 503 classification prevents backend anonymous billing fallback during authenticated service outages. No new automatic retry of chargeable operations was introduced.

No Flutter source was changed. This deployment does not replace a device test or claim that unrelated app changes have shipped.

## Source and rollback

All source changes remain uncommitted; no release/version metadata was bumped and no commit/push was performed. The production release used an isolated direct-upload stage preserving the previous web assets. Previous canonical deployment: `4e6ad152-0421-4b8d-a9e9-3b3c2168b11e`. The additive index is compatible with the previous backend if a rollback is needed. No rollback was executed.
