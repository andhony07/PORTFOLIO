import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ResumeModal } from '../../src/components/common/ResumeModal';
import { developerProfile } from '../../src/data/profile';

describe('ResumeModal Component', () => {
  it('renders verified modal heading, available status, and required notice', () => {
    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    // 1. Heading is "Resume"
    expect(screen.getByRole('heading', { level: 2, name: 'Resume' })).toBeInTheDocument();

    // 2. "Resume Available" text
    expect(screen.getByText('Resume Available')).toBeInTheDocument();

    // 3. Exact notice text
    expect(
      screen.getByText(
        'My latest resume is available here, including my technical skills, projects, internship experience, education and certifications.'
      )
    ).toBeInTheDocument();
  });

  it('provides functional View Resume and Download Resume PDF action links', () => {
    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    // 4. View Resume button
    const viewBtn = screen.getByRole('link', { name: /View Resume/i });
    expect(viewBtn).toBeInTheDocument();
    expect(viewBtn).toHaveAttribute('href', '/resume/Andhony_Saviyar_S_Resume.pdf');
    expect(viewBtn).toHaveAttribute('target', '_blank');
    expect(viewBtn).toHaveAttribute('rel', 'noopener noreferrer');

    // 4. Download Resume button
    const downloadBtn = screen.getByRole('link', { name: /Download Resume/i });
    expect(downloadBtn).toBeInTheDocument();
    expect(downloadBtn).toHaveAttribute('href', '/resume/Andhony_Saviyar_S_Resume.pdf');
    expect(downloadBtn).toHaveAttribute('download', 'Andhony_Saviyar_S_Resume.pdf');
  });

  it('retains Copy Email and Open Mail Client actions', () => {
    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    // 5. Copy Email
    const copyEmailBtn = screen.getByRole('button', { name: /Copy Email Address/i });
    expect(copyEmailBtn).toBeInTheDocument();
    fireEvent.click(copyEmailBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(developerProfile.socials.email);
    expect(screen.getByText(/Email Copied!/i)).toBeInTheDocument();

    // 5. Open Mail Client
    const mailClientLink = screen.getByRole('link', { name: /Open Mail Client/i });
    expect(mailClientLink).toBeInTheDocument();
    expect(mailClientLink).toHaveAttribute('href', expect.stringContaining(`mailto:${developerProfile.socials.email}`));
  });

  it('retains GitHub and LinkedIn links and displays updated location Tiruppur', () => {
    render(<ResumeModal isOpen={true} onClose={vi.fn()} />);

    // 6. GitHub & LinkedIn
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', developerProfile.socials.github);

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', developerProfile.socials.linkedin);

    // 7. Location Tiruppur
    expect(screen.getByText(/Tiruppur, Tamil Nadu, India/i)).toBeInTheDocument();
  });
});
