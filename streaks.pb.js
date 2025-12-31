// ============================================
// STREAK MANAGEMENT HOOKS
// ============================================

// Helper: Get start of day in UTC
function startOfDayUTC(date) {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0);
    return d;
}

// Helper: Check if two dates are the same day (UTC)
function isSameDay(date1, date2) {
    return startOfDayUTC(date1).getTime() === startOfDayUTC(date2).getTime();
}

// Helper: Check if date1 is exactly one day after date2
function isNextDay(date1, date2) {
    const day1 = startOfDayUTC(date1).getTime();
    const day2 = startOfDayUTC(date2).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return day1 - day2 === oneDay;
}

// Helper: Get days between two dates
function daysBetween(date1, date2) {
    const day1 = startOfDayUTC(date1).getTime();
    const day2 = startOfDayUTC(date2).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.floor((day1 - day2) / oneDay);
}

// ============================================
// API: Record Activity (called by client)
// POST /api/streaks/record-activity
// ============================================
routerAdd('POST', '/api/streaks/record-activity', (e) => {
    const authRecord = e.auth;

    if (!authRecord) {
        return e.json(401, { error: 'Unauthorized' });
    }

    const userId = authRecord.id;
    const now = new Date();

    try {
        const streaksCollection = $app.findCollectionByNameOrId('streaks');

        // Find existing streak record for user
        let streakRecord = null;
        try {
            const records = $app.findRecordsByFilter(
                'streaks',
                `user = "${userId}"`,
                '', // sort
                1,  // limit
                0   // offset
            );
            if (records && records.length > 0) {
                streakRecord = records[0];
            }
        } catch (e) {
            // No record found, will create new
        }

        if (!streakRecord) {
            // First activity ever - create new record
            streakRecord = new Record(streaksCollection, {
                user: userId,
                current_streak: 1,
                longest_streak: 1,
                last_activity: now.toISOString(),
                freezes_remaining: 2, // Start with 2 freezes
                last_freeze_used: null
            });
            $app.save(streakRecord);

            return e.json(200, {
                status: 'created',
                current_streak: 1,
                longest_streak: 1,
                freezes_remaining: 2,
                is_new_record: false
            });
        }

        const lastActivity = streakRecord.get('last_activity')
            ? new Date(streakRecord.get('last_activity'))
            : null;

        // Already recorded today - no change
        if (lastActivity && isSameDay(now, lastActivity)) {
            return e.json(200, {
                status: 'already_recorded',
                current_streak: streakRecord.get('current_streak'),
                longest_streak: streakRecord.get('longest_streak'),
                freezes_remaining: streakRecord.get('freezes_remaining'),
                is_new_record: false
            });
        }

        let currentStreak = streakRecord.get('current_streak') || 0;
        let longestStreak = streakRecord.get('longest_streak') || 0;
        let freezesRemaining = streakRecord.get('freezes_remaining') || 0;
        let freezeUsed = false;

        if (!lastActivity) {
            // First activity
            currentStreak = 1;
        } else if (isNextDay(now, lastActivity)) {
            // Consecutive day - increment!
            currentStreak++;
        } else {
            // Missed day(s)
            const missed = daysBetween(now, lastActivity) - 1;

            if (missed === 1 && freezesRemaining > 0) {
                // Missed exactly 1 day and have freeze - use it
                freezesRemaining--;
                freezeUsed = true;
                currentStreak++;
                streakRecord.set('last_freeze_used', now.toISOString());
            } else {
                // Reset streak
                currentStreak = 1;
            }
        }

        // Update longest streak
        const isNewRecord = currentStreak > longestStreak;
        if (isNewRecord) {
            longestStreak = currentStreak;
        }

        // Award freeze at milestones (7, 30, 100 days)
        const milestones = [7, 30, 100];
        if (milestones.includes(currentStreak) && freezesRemaining < 2) {
            freezesRemaining = Math.min(freezesRemaining + 1, 2);
        }

        // Save updates
        streakRecord.set('current_streak', currentStreak);
        streakRecord.set('longest_streak', longestStreak);
        streakRecord.set('freezes_remaining', freezesRemaining);
        streakRecord.set('last_activity', now.toISOString());
        $app.save(streakRecord);

        return e.json(200, {
            status: 'updated',
            current_streak: currentStreak,
            longest_streak: longestStreak,
            freezes_remaining: freezesRemaining,
            freeze_used: freezeUsed,
            is_new_record: isNewRecord
        });

    } catch (error) {
        console.error('Streak record-activity error:', error);
        return e.json(500, { error: 'Internal server error' });
    }
});

// ============================================
// API: Get Streak (called by client)
// GET /api/streaks/me
// ============================================
routerAdd('GET', '/api/streaks/me', (e) => {
    const authRecord = e.auth;

    if (!authRecord) {
        return e.json(401, { error: 'Unauthorized' });
    }

    const userId = authRecord.id;

    try {
        let streakRecord = null;
        try {
            const records = $app.findRecordsByFilter(
                'streaks',
                `user = "${userId}"`,
                '',
                1,
                0
            );
            if (records && records.length > 0) {
                streakRecord = records[0];
            }
        } catch (e) {
            // No record found
        }

        if (!streakRecord) {
            return e.json(200, {
                current_streak: 0,
                longest_streak: 0,
                freezes_remaining: 2,
                last_activity: null,
                practiced_today: false
            });
        }

        const lastActivity = streakRecord.get('last_activity')
            ? new Date(streakRecord.get('last_activity'))
            : null;
        const practicedToday = lastActivity && isSameDay(new Date(), lastActivity);

        return e.json(200, {
            current_streak: streakRecord.get('current_streak') || 0,
            longest_streak: streakRecord.get('longest_streak') || 0,
            freezes_remaining: streakRecord.get('freezes_remaining') || 0,
            last_activity: streakRecord.get('last_activity'),
            practiced_today: practicedToday
        });

    } catch (error) {
        console.error('Streak get error:', error);
        return e.json(500, { error: 'Internal server error' });
    }
});

// ============================================
// WEBHOOK: Daily Maintenance (called by cron)
// GET /api/streaks/daily-maintenance
// ============================================
routerAdd('GET', '/api/streaks/daily-maintenance', (e) => {
    // Optional: Add a secret token for security
    // const token = e.request.url.query().get('token');
    // if (token !== 'YOUR_SECRET_TOKEN') {
    //     return e.json(401, { error: 'Unauthorized' });
    // }

    console.log(`[Streak Maintenance] Starting at ${new Date().toISOString()}`);

    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    let processed = 0;
    let freezesApplied = 0;
    let streaksReset = 0;

    try {
        // Find all streak records
        const records = $app.findRecordsByFilter(
            'streaks',
            'current_streak > 0', // Only active streaks
            '',
            1000, // Process up to 1000 users
            0
        );

        for (const record of records) {
            const lastActivity = record.get('last_activity')
                ? new Date(record.get('last_activity'))
                : null;

            if (!lastActivity) continue;

            // Check if they practiced today or yesterday
            if (isSameDay(now, lastActivity) || isNextDay(now, lastActivity)) {
                // They're fine, streak is current
                continue;
            }

            // They missed at least one day
            const missed = daysBetween(now, lastActivity) - 1;

            if (missed === 1 && record.get('freezes_remaining') > 0) {
                // Apply freeze automatically
                record.set('freezes_remaining', record.get('freezes_remaining') - 1);
                record.set('last_freeze_used', now.toISOString());
                $app.save(record);
                freezesApplied++;
            } else if (missed > 1 || record.get('freezes_remaining') === 0) {
                // Reset streak (they missed too many days or no freeze)
                record.set('current_streak', 0);
                $app.save(record);
                streaksReset++;
            }

            processed++;
        }

        console.log(`[Streak Maintenance] Completed: ${processed} processed, ${freezesApplied} freezes applied, ${streaksReset} streaks reset`);

        return e.json(200, {
            status: 'success',
            processed: processed,
            freezes_applied: freezesApplied,
            streaks_reset: streaksReset,
            timestamp: now.toISOString()
        });

    } catch (error) {
        console.error('[Streak Maintenance] Error:', error);
        return e.json(500, { error: 'Internal server error' });
    }
});

console.log('[Streaks] Hooks loaded successfully');