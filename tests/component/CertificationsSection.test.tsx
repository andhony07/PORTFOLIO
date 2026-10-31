import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CertificationsSection } from '../../src/components/sections/CertificationsSection';

describe('CertificationsSection Component', () => {
  it('renders all 7 certifications and handles modal inspection', () => {
    render(<CertificationsSection />);
    expect(screen.getByText(/Amazon Web Services \(AWS\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Programming in Java/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 88%/i)).toBeInTheDocument();

    // Click on NPTEL credential to view modal
    const javaCard = screen.getByText(/Programming in Java/i);
    fireEvent.click(javaCard);

    // Modal opens with topics and score
    expect(screen.getByText(/Official Examination Score:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Object-Oriented Programming/i).length).toBeGreaterThanOrEqual(2);
  });
});
