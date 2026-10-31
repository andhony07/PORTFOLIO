import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '../../src/components/sections/HeroSection';
import { ResumeModal } from '../../src/components/common/ResumeModal';
import { usePortfolioStore } from '../../src/store/usePortfolioStore';

describe('HeroSection Component with GSAP Choreography', () => {
  it('renders developer name Andhony Saviyar S. and professional headline', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Andhony Saviyar S\./i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Developer/i)).toBeInTheDocument();
  });

  it('contains verified functional navigation action links', () => {
    render(<HeroSection />);
    
    // Explore Projects button points to #projects
    const exploreLink = screen.getByRole('link', { name: /Explore Projects/i });
    expect(exploreLink).toHaveAttribute('href', '#projects');

    // Get In Touch button points to #contact
    const contactLink = screen.getByRole('link', { name: /Get In Touch/i });
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('provides functional resume button and opens graceful unavailable modal', () => {
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
    
    const resumeBtn = screen.getByRole('button', { name: /Download Resume/i });
    expect(resumeBtn).toBeInTheDocument();

    fireEvent.click(resumeBtn);

    expect(screen.getByText(/Resume Under Final Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Placement & Career Opportunity Notice/i)).toBeInTheDocument();

    const copyEmailBtn = screen.getByRole('button', { name: /Copy Email Address/i });
    expect(copyEmailBtn).toBeInTheDocument();
    fireEvent.click(copyEmailBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('andhony78@gmail.com');
  });
});
