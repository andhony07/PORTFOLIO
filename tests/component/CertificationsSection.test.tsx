import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CertificationsSection } from '../../src/components/sections/CertificationsSection';

describe('CertificationsSection Component', () => {
  it('renders all 9 certifications with verified authentic status and handles modal inspection', () => {
    render(<CertificationsSection />);
    // Both AWS certificates rendered
    expect(screen.getAllByText(/Amazon Web Services \(AWS\)/i).length).toBe(2);
    expect(screen.getByText(/Programming in Java/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 88%/i)).toBeInTheDocument();

    // Verify authentic credential badges across all 9 cards
    const verifiedBadges = screen.getAllByText(/Verified Authentic Credential/i);
    expect(verifiedBadges.length).toBe(9);

    // Click on NPTEL credential to view modal
    const javaCard = screen.getByText(/Programming in Java/i);
    fireEvent.click(javaCard);

    // Modal opens with topics and score
    expect(screen.getByText(/Official NPTEL Examination Score:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Object-Oriented Programming/i).length).toBeGreaterThanOrEqual(2);

    // Modal clearly displays verified document status and PDF link
    expect(screen.getByText(/Asset Status: Verified Authentic Document/i)).toBeInTheDocument();
    expect(screen.getByText(/Open PDF Document/i)).toBeInTheDocument();
  });
});
