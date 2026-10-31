import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '../../src/components/sections/HeroSection';
import { ResumeModal } from '../../src/components/common/ResumeModal';
import { usePortfolioStore } from '../../src/store/usePortfolioStore';

describe('HeroSection Component', () => {
  it('renders developer name Andhony Saviyar S. and professional headline', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Andhony Saviyar S\./i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
  });

  it('provides functional resume button and opens graceful unavailable modal', () => {
    // Wrapper component connecting store
    const TestComponent = () => {
      const { isResumeModalOpen, closeResumeModal } = usePortfolioStore();
      return (
        <>
          <HeroSection />
          <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
        </>
      );
    };

    render(<TestComponent />);
    
    // Find "Download Resume" button in Hero
    const resumeBtn = screen.getByRole('button', { name: /Download Resume/i });
    expect(resumeBtn).toBeInTheDocument();

    // Click "Download Resume"
    fireEvent.click(resumeBtn);

    // Modal should be visible with graceful message
    expect(screen.getByText(/Resume Under Final Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Placement & Career Opportunity Notice/i)).toBeInTheDocument();

    // Copy email action works
    const copyEmailBtn = screen.getByRole('button', { name: /Copy Email Address/i });
    expect(copyEmailBtn).toBeInTheDocument();
    fireEvent.click(copyEmailBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('andhony78@gmail.com');
  });
});
