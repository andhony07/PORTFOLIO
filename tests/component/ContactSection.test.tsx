import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactSection } from '../../src/components/sections/ContactSection';

describe('ContactSection Component', () => {
  it('displays verified email address and location', () => {
    render(<ContactSection />);
    expect(screen.getByText('andhony78@gmail.com')).toBeInTheDocument();
    expect(screen.getByText(/Coimbatore, Tamil Nadu, India/i)).toBeInTheDocument();
  });

  it('triggers clipboard copy when Copy Email button is clicked', () => {
    render(<ContactSection />);
    const copyBtn = screen.getByRole('button', { name: /Copy.*Email/i });
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('andhony78@gmail.com');
    expect(screen.getByText(/Email Copied/i)).toBeInTheDocument();
  });
});
