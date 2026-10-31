import { describe, it, expect } from 'vitest';
import { developerProfile } from '../../src/data/profile';

describe('Developer Profile Registry Validation', () => {
  it('must contain verified personal identity for Andhony Saviyar S.', () => {
    expect(developerProfile.name).toBe('Andhony Saviyar S.');
    expect(developerProfile.title).toContain('Full Stack Developer');
    expect(developerProfile.title).toContain('Cloud & DevOps');
    expect(developerProfile.title).toContain('AI Enthusiast');
  });

  it('must contain accurate academic institution information', () => {
    expect(developerProfile.education.degree).toBe('B.E. Computer Science and Engineering');
    expect(developerProfile.education.institution).toBe('Sri Shakthi Institute of Engineering and Technology');
    expect(developerProfile.education.location).toContain('Coimbatore');
  });

  it('must verify resume is flagged as unavailable without dummy links', () => {
    expect(developerProfile.socials.resumeAvailable).toBe(false);
  });

  it('must provide verified public contact links', () => {
    expect(developerProfile.socials.github).toBe('https://github.com/andhony07');
    expect(developerProfile.socials.linkedin).toBe('https://www.linkedin.com/in/andhony-saviyar-s-ba2a9a3b7');
    expect(developerProfile.socials.email).toBe('andhony78@gmail.com');
  });
});
