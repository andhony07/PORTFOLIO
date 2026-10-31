import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from '../../src/components/layout/Navbar';
import { usePortfolioStore } from '../../src/store/usePortfolioStore';

describe('Navbar Component', () => {
  it('renders branding and all navigation section links', () => {
    render(<Navbar />);
    expect(screen.getAllByText(/ANDHONY/i).length).toBeGreaterThan(0);
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

  it('opens and closes mobile navigation drawer via toggle and close buttons', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    // Open drawer
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    const drawer = screen.getByRole('dialog', { name: /Mobile Navigation Menu/i });
    expect(drawer).toBeInTheDocument();

    // Close via drawer's close button
    const closeButton = screen.getByLabelText(/Close navigation menu/i);
    fireEvent.click(closeButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile drawer upon selecting a navigation link', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    fireEvent.click(toggleButton);

    const drawer = screen.getByRole('dialog', { name: /Mobile Navigation Menu/i });
    const drawerLinks = drawer.querySelectorAll('a[href="#projects"]');
    expect(drawerLinks.length).toBeGreaterThan(0);

    fireEvent.click(drawerLinks[0]);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile drawer when Escape key is pressed', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile drawer when backdrop overlay is clicked', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText(/Toggle navigation menu/i);
    fireEvent.click(toggleButton);

    const backdrop = screen.getByTestId('mobile-drawer-backdrop');
    expect(backdrop).toBeInTheDocument();

    fireEvent.click(backdrop);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
  });
});
