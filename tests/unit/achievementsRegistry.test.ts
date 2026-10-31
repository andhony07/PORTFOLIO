import { describe, it, expect } from 'vitest';
import { achievementsRegistry } from '../../src/data/achievements';

describe('Achievements & Hackathons Registry Integrity', () => {
  it('contains verified hackathon and challenge participation entries', () => {
    expect(achievementsRegistry.length).toBeGreaterThanOrEqual(6);
  });

  it('verifies SpaceSentry status is submitted rather than claiming an award', () => {
    const spaceSentry = achievementsRegistry.find((a) => a.id === 'spacesentry-devpost');
    expect(spaceSentry).toBeDefined();
    expect(spaceSentry?.status).toBe('submitted');
    expect(spaceSentry?.platform).toBe('Devpost');
  });

  it('verifies HackerRank Orchestrate challenge status is participated', () => {
    const orchestrate = achievementsRegistry.find((a) => a.id === 'hackerrank-orchestrate-2026');
    expect(orchestrate).toBeDefined();
    expect(orchestrate?.status).toBe('participated');
  });

  it('asserts all statuses are strictly valid participation categories without fake wins', () => {
    const validStatuses = ['participated', 'submitted', 'participant'];
    achievementsRegistry.forEach((a) => {
      expect(validStatuses).toContain(a.status);
    });
  });
});

