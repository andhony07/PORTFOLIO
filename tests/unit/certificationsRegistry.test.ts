import { describe, it, expect } from 'vitest';
import { certificationsRegistry } from '../../src/data/certifications';

describe('Certifications Registry Integrity', () => {
  it('contains exactly 9 verified credential records with authentic assets', () => {
    expect(certificationsRegistry).toHaveLength(9);
  });

  it('validates AWS Bedrock prompt engineering credential', () => {
    const aws = certificationsRegistry.find((c) => c.id === 'aws-bedrock');
    expect(aws).toBeDefined();
    expect(aws?.issuer).toBe('Amazon Web Services (AWS)');
    expect(aws?.topics).toContain('Amazon Bedrock');
    expect(aws?.image).toContain('aws-bedrock-prompt-eng.png');
    expect(aws?.documentUrl).toContain('aws-prompt-engineering.pdf');
  });

  it('validates NPTEL Java credential with 88% examination score and score breakdown', () => {
    const java = certificationsRegistry.find((c) => c.id === 'nptel-java');
    expect(java).toBeDefined();
    expect(java?.issuer).toBe('NPTEL');
    expect(java?.score).toBe('88%');
    expect(java?.scoreBreakdown?.assignmentScore).toBe('24.94/25');
    expect(java?.scoreBreakdown?.proctoredScore).toBe('63/75');
    expect(java?.scoreBreakdown?.totalCandidates).toBe(26183);
  });

  it('validates newly integrated HackerRank skill certifications', () => {
    const py = certificationsRegistry.find((c) => c.id === 'hackerrank-python');
    const ps = certificationsRegistry.find((c) => c.id === 'hackerrank-problem-solving');
    expect(py).toBeDefined();
    expect(py?.credentialId).toBe('B177A5BC6A52');
    expect(ps).toBeDefined();
    expect(ps?.credentialId).toBe('92C0249D7750');
  });

  it('ensures zero fabricated verification links or synthetic external URLs', () => {
    certificationsRegistry.forEach((c) => {
      expect(c.verificationUrl).toBeNull();
      expect(c.status).toBe('completed');
      expect(c.verified).toBe(true);
      expect(c.image).toBeTruthy();
      expect(c.documentUrl).toBeTruthy();
    });
  });
});
