import { spawn } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import assert from 'node:assert/strict';

const PORT = 3001;
const BASE_URL = `http://localhost:${PORT}`;
const VIDEO_ID = 'u9vpfPlvF7U';
const CACHE_FILE = join(process.cwd(), 'server', 'transcripts_cache', `${VIDEO_ID}_zh.json`);

async function waitForServer(retries = 30, delayMs = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/diamonds`);
      if (res.ok) return true;
    } catch {
      // ignore
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  return false;
}

async function main() {
  console.log('[E2E Test] Checking if local dev server is running on port', PORT);
  let serverProcess = null;
  const isUp = await waitForServer(2, 300);

  if (!isUp) {
    console.log('[E2E Test] Starting server/server.js in background...');
    serverProcess = spawn('node', ['server/server.js'], {
      cwd: process.cwd(),
      env: { ...process.env, PORT: String(PORT) },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    serverProcess.stdout.on('data', data => {
      const msg = data.toString();
      if (msg.includes('error') || msg.includes('Error')) {
        console.log('[Server Log]', msg.trim());
      }
    });

    serverProcess.stderr.on('data', data => {
      console.error('[Server Error]', data.toString().trim());
    });

    const ready = await waitForServer(30, 500);
    if (!ready) {
      if (serverProcess) serverProcess.kill();
      throw new Error('Server failed to start within timeout');
    }
    console.log('[E2E Test] Local dev server is UP and responding at', BASE_URL);
  } else {
    console.log('[E2E Test] Dev server already running at', BASE_URL);
  }

  try {
    // -------------------------------------------------------------
    // Step 0: Ensure cache is cleared so we test the REAL initial video load with 0 captions
    // -------------------------------------------------------------
    if (existsSync(CACHE_FILE)) {
      console.log('[E2E Test] Removing existing transcript cache file to simulate first visit by user:', CACHE_FILE);
      unlinkSync(CACHE_FILE);
    }

    // -------------------------------------------------------------
    // Test 1: Native captions check on real Chinese video u9vpfPlvF7U
    // -------------------------------------------------------------
    console.log('\n[Test 1] POST /api/transcript (native check) for', VIDEO_ID);
    const nativeRes = await fetch(`${BASE_URL}/api/transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId: VIDEO_ID, lang: 'zh', preferAI: false })
    });

    assert.equal(nativeRes.status, 200, `Expected HTTP 200 but got ${nativeRes.status}`);
    const nativeJson = await nativeRes.json();
    console.log('[Test 1] Response:', {
      success: nativeJson.success,
      errorCode: nativeJson.errorCode,
      whisperAvailable: nativeJson.whisperAvailable
    });

    assert.equal(nativeJson.success, false, 'Expected success: false for video without native subs');
    assert.equal(nativeJson.errorCode, 'NO_NATIVE', 'Expected errorCode: NO_NATIVE');
    assert.equal(nativeJson.whisperAvailable, true, 'Expected whisperAvailable: true');
    console.log('✔ Test 1 Passed: No native captions detected, whisperAvailable is true, NO server error (500).');

    // -------------------------------------------------------------
    // Test 2: AI transcription submission
    // -------------------------------------------------------------
    console.log('\n[Test 2] POST /api/transcript (AI submission) for', VIDEO_ID);
    const aiSubmitRes = await fetch(`${BASE_URL}/api/transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: VIDEO_ID,
        lang: 'zh',
        preferAI: true,
        forceRefresh: true
      })
    });

    assert.ok([200, 202].includes(aiSubmitRes.status), `Expected HTTP 200 but got ${aiSubmitRes.status}`);
    const aiSubmitJson = await aiSubmitRes.json();
    console.log('[Test 2] AI Submission Response:', {
      success: aiSubmitJson.success,
      status: aiSubmitJson.status,
      jobId: aiSubmitJson.jobId
    });

    assert.ok(['processing', 'completed'].includes(aiSubmitJson.status), `Unexpected status: ${aiSubmitJson.status}`);
    const jobId = aiSubmitJson.jobId;
    console.log('✔ Test 2 Passed: AI transcription request successfully registered with jobId:', jobId);

    // -------------------------------------------------------------
    // Test 3: Polling for completed transcript cues
    // -------------------------------------------------------------
    console.log('\n[Test 3] Polling /api/transcript for job completion...');
    let pollCount = 0;
    let completedResult = null;

    if (aiSubmitJson.status === 'completed' && aiSubmitJson.segments?.length > 0) {
      completedResult = aiSubmitJson;
    } else {
      while (pollCount < 40) {
        pollCount++;
        await new Promise(r => setTimeout(r, 2000));
        const pollRes = await fetch(`${BASE_URL}/api/transcript`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoId: VIDEO_ID, lang: 'zh', jobId })
        });
        assert.equal(pollRes.status, 200, `Polling HTTP status ${pollRes.status}`);
        const pollJson = await pollRes.json();
        console.log(`[Test 3] Poll attempt ${pollCount}: status = ${pollJson.status}`);
        if (pollJson.success && pollJson.segments?.length > 0) {
          completedResult = pollJson;
          break;
        }
      }
    }

    assert.ok(completedResult, 'Job did not complete in expected time');
    assert.ok(completedResult.segments.length > 0, 'No subtitle segments found');
    console.log(`[Test 3] Job completed with ${completedResult.segments.length} authentic subtitle segments.`);
    console.log('Sample segment[0]:', completedResult.segments[0]);
    console.log('Sample segment[1]:', completedResult.segments[1]);
    assert.ok(completedResult.segments[0].text.length > 0, 'First segment text is empty');
    console.log('✔ Test 3 Passed: Authentic subtitle cues returned and verified.');

    // -------------------------------------------------------------
    // Test 4: Force refresh / Session eviction
    // -------------------------------------------------------------
    console.log('\n[Test 4] Submitting forceRefresh request to ensure stale session is not locked');
    const regenRes = await fetch(`${BASE_URL}/api/transcript`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        videoId: VIDEO_ID,
        lang: 'zh',
        preferAI: true,
        forceRefresh: true
      })
    });
    assert.ok([200, 202].includes(regenRes.status), `Expected HTTP 200 for regeneration but got ${regenRes.status}`);
    const regenJson = await regenRes.json();
    console.log('[Test 4] Regeneration Response:', {
      success: regenJson.success,
      status: regenJson.status,
      jobId: regenJson.jobId
    });
    assert.ok(regenJson.status === "processing" || regenJson.status === "completed");
    assert.notEqual(regenJson.jobId, jobId, 'Expected a new fresh jobId to be created on forceRefresh');
    console.log('✔ Test 4 Passed: ForceRefresh successfully handled without 500 error or stale session trap.');

    console.log('\n=============================================');
    console.log('🎉 ALL REAL FLOW TESTS COMPLETED SUCCESSFULLY!');
    console.log('=============================================');
  } finally {
    if (serverProcess) {
      console.log('[E2E Test] Cleaning up background server process...');
      serverProcess.kill();
    }
  }
}

main().catch(err => {
  console.error('[E2E Test Failed]', err);
  process.exit(1);
});
