import { describe, it, expect } from 'vitest';
import { projectsRegistry } from '../../src/data/projects';

describe('Projects Registry Verification & Integrity', () => {
  it('contains exactly 8 audited and verified projects', () => {
    expect(projectsRegistry).toHaveLength(8);
  });

  it('validates SentinelAI specifications and test metrics', () => {
    const sentinel = projectsRegistry.find((p) => p.id === 'sentinel-ai');
    expect(sentinel).toBeDefined();
    expect(sentinel?.status).toBe('completed');
    expect(sentinel?.featured).toBe(true);
    expect(sentinel?.githubUrl).toBe('https://github.com/andhony07/AI-Based-Server-Health-Monitoring');
    expect(sentinel?.technologies).toContain('FastAPI');
    expect(sentinel?.technologies).toContain('Scikit-Learn');
    expect(sentinel?.technologies).toContain('SQLite WAL');
    
    // Verify 393 tests metric
    const testMetric = sentinel?.metrics?.find((m) => m.label === 'Test Coverage');
    expect(testMetric?.value).toBe('393 tests');
  });

  it('validates SpaceSentry identity as Windows Safe Storage Intelligence', () => {
    const spaceSentry = projectsRegistry.find((p) => p.id === 'spacesentry');
    expect(spaceSentry).toBeDefined();
    expect(spaceSentry?.subtitle).toBe('Safe Storage Intelligence for Windows');
    expect(spaceSentry?.githubUrl).toBe('https://github.com/andhony07/SpaceSentry');
    expect(spaceSentry?.status).toBe('completed');
    expect(spaceSentry?.technologies).toContain('Windows Shell API');
    
    // Asserts not celestial outer space monitoring
    expect(spaceSentry?.description).toContain('storage intelligence');
    expect(spaceSentry?.description).toContain('disk');
  });

  it('validates DevWatch v2.2.0-SaaS multi-tenant monitoring application', () => {
    const devWatch = projectsRegistry.find((p) => p.id === 'devwatch');
    expect(devWatch).toBeDefined();
    expect(devWatch?.status).toBe('completed');
    expect(devWatch?.githubUrl).toBe('https://github.com/andhony07/DevWatch-Monitoring');
    expect(devWatch?.technologies).toContain('Flutter');
    expect(devWatch?.technologies).toContain('Docker');
    expect(devWatch?.technologies).toContain('Kubernetes');
  });

  it('validates CloudPulse is correctly classified as planned', () => {
    const cloudPulse = projectsRegistry.find((p) => p.id === 'cloud-pulse');
    expect(cloudPulse).toBeDefined();
    expect(cloudPulse?.status).toBe('planned');
    expect(cloudPulse?.featured).toBe(false);
  });

  it('ensures every project has a valid https GitHub URL', () => {
    projectsRegistry.forEach((p) => {
      expect(p.githubUrl).toMatch(/^https:\/\/github\.com\/andhony07\/.+/);
    });
  });
});
