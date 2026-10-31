import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from '../../src/components/layout/Navbar';
import { usePortfolioStore } from '../../src/store/usePortfolioStore';

describe('Navbar Component', () => {
  it('renders branding and all navigation section links', () => {
    render(<Navbar />);
    expect(screen.getByText(/ANDHONY/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Certifications/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Achievements/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Experience/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  it('triggers resume modal when Resume button is clicked', () => {
    render(<Navbar />);
    const resumeButtons = screen.getAllByRole('button', { name: /Resume/i });
    expect(resumeButtons.length).toBeGreaterThan(0);

    fireEvent.click(resumeButtons[0]);
    expect(usePortfolioStore.getState().isResumeModalOpen).toBe(true);
  });
});
