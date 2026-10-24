-- Read-only provenance inventory. Payment/store evidence is required before reclassification.
SELECT g.user_id,g.tier,g.expires_at,p.subscription_tier,p.subscription_expires
FROM public.subscription_grants g
JOIN public.profiles p ON p.id=g.user_id
WHERE g.provider='legacy'
ORDER BY g.user_id,g.tier;
