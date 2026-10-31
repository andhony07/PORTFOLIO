import { describe, it, expect } from 'vitest';
import { globalScrollState, initScrollProgressSync } from '../../src/utils/scrollState';

describe('Scroll State Synchronizer', () => {
  it('initializes globalScrollState with valid progress number', () => {
    expect(typeof globalScrollState.progress).toBe('number');
    expect(globalScrollState.progress).toBeGreaterThanOrEqual(0);
    expect(globalScrollState.progress).toBeLessThanOrEqual(1);
  });

  it('safely handles initScrollProgressSync lifecycle and cleanup', () => {
    const cleanup1 = initScrollProgressSync();
    expect(typeof cleanup1).toBe('function');

    // Reference counted secondary subscriber
    const cleanup2 = initScrollProgressSync();
    expect(typeof cleanup2).toBe('function');

    expect(() => {
      cleanup1();
      cleanup2();
    }).not.toThrow();
  });
});
