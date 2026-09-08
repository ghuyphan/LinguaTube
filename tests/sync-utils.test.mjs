import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeByTimestamp, calculateHash, sanitizeFilterValue, processBatch, generateDeterministicRecordId } from '../src/app/shared/utils/sync.utils.ts';

test('mergeByTimestamp: correctly merges non-overlapping sets', () => {
  const local = [
    { id: '1', word: 'cat', updatedAt: 100 },
    { id: '2', word: 'dog', updatedAt: 150 },
  ];
  const remote = [
    { id: '3', word: 'bird', updatedAt: 200 },
  ];

  const result = mergeByTimestamp(local, remote, (item) => item.id, (item) => item.updatedAt);
  assert.equal(result.length, 3);
  assert.deepEqual(result.map(i => i.id).sort(), ['1', '2', '3']);
});

test('mergeByTimestamp: prefers newer version on collision', () => {
  const local = [
    { id: '1', word: 'cat-local', updatedAt: 100 },
    { id: '2', word: 'dog-local', updatedAt: 300 }, // local is newer
  ];
  const remote = [
    { id: '1', word: 'cat-remote', updatedAt: 200 }, // remote is newer
    { id: '2', word: 'dog-remote', updatedAt: 250 },
  ];

  const result = mergeByTimestamp(local, remote, (item) => item.id, (item) => item.updatedAt);
  assert.equal(result.length, 2);

  const item1 = result.find(i => i.id === '1');
  const item2 = result.find(i => i.id === '2');

  assert.equal(item1.word, 'cat-remote');
  assert.equal(item2.word, 'dog-local');
});

test('calculateHash: generates deterministic pipe-delimited hashes', () => {
  const items = [
    { id: 'a', val: 'foo' },
    { id: 'b', val: 'bar' }
  ];
  const hash = calculateHash(items, item => `${item.id}:${item.val}`);
  assert.equal(hash, 'a:foo|b:bar');
});

test('sanitizeFilterValue: escapes double quotes and backslashes for PocketBase', () => {
  assert.equal(sanitizeFilterValue('normal'), 'normal');
  assert.equal(sanitizeFilterValue('say "hello"'), 'say \\"hello\\"');
  assert.equal(sanitizeFilterValue('path\\to\\somewhere'), 'path\\\\to\\\\somewhere');
  assert.equal(sanitizeFilterValue('combo\\"test"'), 'combo\\\\\\"test\\"');
});

test('processBatch: batches operations and maintains result ordering', async () => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  const processed = await processBatch(
    items,
    async (item) => item * 10,
    3 // batch size of 3
  );

  assert.deepEqual(processed, [10, 20, 30, 40, 50, 60, 70]);
});

test('generateDeterministicRecordId: generates valid 15-char PocketBase IDs deterministically', () => {
  const id1 = generateDeterministicRecordId('user123', '食べる', 'ja');
  const id2 = generateDeterministicRecordId('user123', '食べる', 'ja');
  const id3 = generateDeterministicRecordId('user123', '飲む', 'ja');
  const id4 = generateDeterministicRecordId('user456', '食べる', 'ja');

  // Must match PocketBase 15-character lowercase alphanumeric requirement: ^[a-z0-9]{15}$
  assert.match(id1, /^[a-z0-9]{15}$/);
  assert.match(id3, /^[a-z0-9]{15}$/);
  assert.match(id4, /^[a-z0-9]{15}$/);

  // Determinism
  assert.equal(id1, id2);

  // Sensitivity
  assert.notEqual(id1, id3);
  assert.notEqual(id1, id4);

  // Whitespace resilience
  const trimmed = generateDeterministicRecordId('  user123  ', '食べる', 'ja');
  assert.equal(id1, trimmed);
});
