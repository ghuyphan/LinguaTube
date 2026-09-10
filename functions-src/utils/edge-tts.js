/**
 * Microsoft Edge Neural TTS Engine
 * Connects to Edge Read Aloud Azure Neural voice synthesis via WebSocket.
 * 
 * Works seamlessly in both:
 * 1. Cloudflare Pages Functions / Worker isolates (via fetch + Upgrade: websocket)
 * 2. Node.js 20+ environments (via globalThis.WebSocket)
 * 
 * Provides zero KV usage, studio-grade voices for ja, zh, ko, en.
 */

export const TRUSTED_CLIENT_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4';
export const CHROMIUM_FULL_VERSION = '143.0.3650.75';
export const CHROMIUM_MAJOR_VERSION = CHROMIUM_FULL_VERSION.split('.')[0];
export const AUDIO_FORMAT = 'audio-24khz-48kbitrate-mono-mp3';

export const DEFAULT_VOICES = {
  ja: 'Microsoft Server Speech Text to Speech Voice (ja-JP, NanamiNeural)',
  zh: 'Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoxiaoNeural)',
  ko: 'Microsoft Server Speech Text to Speech Voice (ko-KR, SunHiNeural)',
  en: 'Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)',
};

/**
 * Normalizes short voice identifiers (e.g. "ja-JP-NanamiNeural")
 * into the full Edge TTS voice identifier.
 */
export function normalizeVoiceName(voice, lang = 'ja') {
  if (!voice) {
    return DEFAULT_VOICES[lang] || DEFAULT_VOICES.ja;
  }

  const trimmed = voice.trim();
  if (trimmed.startsWith('Microsoft Server Speech Text to Speech Voice')) {
    return trimmed;
  }

  const match = /^([a-z]{2,})-([A-Z]{2,})-(.+Neural)$/.exec(trimmed);
  if (match) {
    const [, l, region, name] = match;
    return `Microsoft Server Speech Text to Speech Voice (${l}-${region}, ${name})`;
  }

  return trimmed;
}

/**
 * Escapes characters for safe inclusion in SSML XML payload
 */
export function escapeXml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strips XML-invalid control characters
 */
export function sanitizeText(text) {
  if (!text) return '';
  return text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, ' ').trim();
}

/**
 * Computes Microsoft Sec-MS-GEC token based on Windows epoch timestamp
 */
export async function makeSecMsGec() {
  const winEpoch = 11644473600;
  const secondsToNs = 1e9;
  let ticks = Date.now() / 1000;
  ticks += winEpoch;
  ticks -= ticks % 300; // 5-minute window synchronization
  ticks *= secondsToNs / 100;
  const payload = `${ticks.toFixed(0)}${TRUSTED_CLIENT_TOKEN}`;

  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error('Web Crypto API (crypto.subtle) is required for Sec-MS-GEC');
  }

  const digest = await subtle.digest('SHA-256', new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}

/**
 * Generates random hexadecimal UUID without hyphens
 */
export function makeConnectionId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID().replace(/-/g, '');
  }
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Creates a WebSocket connection compatible with both Cloudflare Worker and Node.js
 */
async function openWebSocket(url, headers) {
  const g = globalThis;

  // 1. Node.js environment with global WebSocket
  if (typeof g.process !== 'undefined' && g.process?.versions?.node && typeof g.WebSocket !== 'undefined') {
    return new g.WebSocket(url, { headers });
  }

  // 2. Cloudflare Worker environment (fetch with Upgrade: websocket)
  try {
    const httpUrl = url.replace(/^wss:/i, 'https:');
    const resp = await fetch(httpUrl, {
      headers: {
        ...headers,
        Upgrade: 'websocket',
      },
    });

    if (resp.webSocket) {
      resp.webSocket.accept();
      return resp.webSocket;
    }
  } catch {
    // If Worker fetch failed, try direct WebSocket constructor fallback
  }

  // 3. Browser or standard global WebSocket
  if (typeof g.WebSocket !== 'undefined') {
    return new g.WebSocket(url);
  }

  throw new Error('No compatible WebSocket implementation found in runtime');
}

/**
 * Synthesizes text to speech using Microsoft Edge Neural TTS.
 * 
 * @param {string} text - Text to speak (max 300 chars)
 * @param {Object} [options]
 * @param {string} [options.language='ja'] - Target learning language ('ja', 'zh', 'ko', 'en')
 * @param {string} [options.voice] - Optional explicit voice name
 * @param {number} [options.timeoutMs=7000] - Connection timeout
 * @returns {Promise<Uint8Array>} Raw MP3 audio buffer
 */
export async function synthesizeEdgeTts(text, options = {}) {
  const clean = sanitizeText(text);
  if (!clean) {
    throw new Error('TTS text cannot be empty');
  }
  if (clean.length > 300) {
    throw new Error('TTS text exceeds maximum length of 300 characters');
  }

  const language = options.language || 'ja';
  const voiceName = normalizeVoiceName(options.voice, language);
  const timeoutMs = options.timeoutMs || 7000;

  const connectionId = makeConnectionId();
  const secMsGec = await makeSecMsGec();

  const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=${TRUSTED_CLIENT_TOKEN}&Sec-MS-GEC=${secMsGec}&Sec-MS-GEC-Version=1-${CHROMIUM_FULL_VERSION}&ConnectionId=${connectionId}`;

  const headers = {
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROMIUM_MAJOR_VERSION}.0.0.0 Safari/537.36 Edg/${CHROMIUM_MAJOR_VERSION}.0.0.0`,
    'Accept-Language': 'en-US,en;q=0.9',
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  };

  const ws = await openWebSocket(url, headers);

  return new Promise((resolve, reject) => {
    const audioChunks = [];
    let isSettled = false;

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Edge TTS timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    function cleanup() {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timer);
      try {
        if (typeof ws.close === 'function') ws.close();
      } catch {
        // ignore close errors
      }
    }

    const onOpen = () => {
      const timestamp = new Date().toISOString();
      const configMsg = `X-Timestamp:${timestamp}\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"${AUDIO_FORMAT}"}}}}`;

      const requestId = makeConnectionId();
      const escaped = escapeXml(clean);
      const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='${voiceName}'><prosody pitch='+0Hz' rate='+0%' volume='+0%'>${escaped}</prosody></voice></speak>`;
      const ssmlMsg = `X-RequestId:${requestId}\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:${timestamp}Z\r\nPath:ssml\r\n\r\n${ssml}`;

      ws.send(configMsg);
      ws.send(ssmlMsg);
    };

    const onMessage = async (event) => {
      const data = event.data;

      // Handle text messages (headers, turn.start, turn.end)
      if (typeof data === 'string') {
        if (data.includes('Path:turn.end')) {
          cleanup();
          if (audioChunks.length === 0) {
            reject(new Error('Edge TTS completed with empty audio'));
            return;
          }

          // Concatenate all Uint8Array chunks into one buffer
          const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
          const result = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of audioChunks) {
            result.set(new Uint8Array(chunk), offset);
            offset += chunk.byteLength;
          }
          resolve(result);
        }
        return;
      }

      // Handle binary audio messages
      let arrayBuffer;
      if (data instanceof ArrayBuffer) {
        arrayBuffer = data;
      } else if (data instanceof Uint8Array) {
        arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
      } else if (typeof data.arrayBuffer === 'function') {
        arrayBuffer = await data.arrayBuffer();
      }

      if (arrayBuffer && arrayBuffer.byteLength >= 2) {
        const view = new DataView(arrayBuffer);
        const headerLen = view.getUint16(0, false); // Big endian 2-byte header length
        if (arrayBuffer.byteLength > 2 + headerLen) {
          const headerBytes = new Uint8Array(arrayBuffer, 2, headerLen);
          const headerStr = new TextDecoder().decode(headerBytes);
          if (headerStr.includes('Path:audio')) {
            const audioData = arrayBuffer.slice(2 + headerLen);
            audioChunks.push(audioData);
          }
        }
      }
    };

    const onError = (err) => {
      cleanup();
      reject(new Error(`Edge TTS WebSocket error: ${err?.message || err}`));
    };

    const onClose = () => {
      if (!isSettled && audioChunks.length > 0) {
        cleanup();
        const totalLength = audioChunks.reduce((acc, chunk) => acc + chunk.byteLength, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const chunk of audioChunks) {
          result.set(new Uint8Array(chunk), offset);
          offset += chunk.byteLength;
        }
        resolve(result);
      }
    };

    if (typeof ws.addEventListener === 'function') {
      ws.addEventListener('open', onOpen);
      ws.addEventListener('message', onMessage);
      ws.addEventListener('error', onError);
      ws.addEventListener('close', onClose);
    } else {
      ws.onopen = onOpen;
      ws.onmessage = onMessage;
      ws.onerror = onError;
      ws.onclose = onClose;
    }
  });
}
