import { describe, it, expect } from 'vitest';
import { certificationsRegistry } from '../../src/data/certifications';

describe('Certifications Registry Integrity', () => {
  it('contains exactly 7 verified credential records', () => {
    expect(certificationsRegistry).toHaveLength(7);
  });

  it('validates AWS Bedrock prompt engineering credential', () => {
    const aws = certificationsRegistry.find((c) => c.id === 'aws-bedrock');
    expect(aws).toBeDefined();
    expect(aws?.issuer).toBe('Amazon Web Services (AWS)');
    expect(aws?.topics).toContain('Amazon Bedrock');
  });

  it('validates NPTEL Java credential with 88% examination score', () => {
    const java = certificationsRegistry.find((c) => c.id === 'nptel-java');
    expect(java).toBeDefined();
    expect(java?.issuer).toBe('NPTEL');
    expect(java?.score).toBe('88%');
  });

  it('ensures zero fabricated verification links or fake credential IDs', () => {
    certificationsRegistry.forEach((c) => {
      expect(c.verificationUrl).toBeNull();
      expect(c.status).toBe('completed');
    });
  });
});
