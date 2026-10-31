import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectModal } from '../../src/components/common/ProjectModal';
import { projectsRegistry } from '../../src/data/projects';

describe('ProjectModal Component', () => {
  const sentinelProject = projectsRegistry.find((p) => p.id === 'sentinel-ai')!;
  const spaceSentryProject = projectsRegistry.find((p) => p.id === 'spacesentry')!;

  it('renders rich technical details and 393 tests evidence for SentinelAI', () => {
    const handleClose = vi.fn();
    render(
      <ProjectModal
        project={sentinelProject}
        isOpen={true}
        onClose={handleClose}
      />
    );

    // Verify Title & Subtitle
    expect(screen.getByText('SentinelAI')).toBeInTheDocument();
    expect(screen.getByText(/Server Health Monitoring/i)).toBeInTheDocument();

    // Verify Problem Statement
    expect(screen.getByText(/Problem Statement & Objective/i)).toBeInTheDocument();
    expect(screen.getByText(/Traditional static threshold alerts/i)).toBeInTheDocument();

    // Verify Testing Evidence
    expect(screen.getByText(/393 passing automated unit and integration tests/i)).toBeInTheDocument();

    // Verify Verified GitHub link
    const repoBtn = screen.getByRole('link', { name: /Open SentinelAI repository on GitHub/i });
    expect(repoBtn).toHaveAttribute('href', 'https://github.com/andhony07/AI-Based-Server-Health-Monitoring');

    // Click Close Button
    const closeBtn = screen.getByLabelText(/Close dialog/i);
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders SpaceSentry with Safe Storage Intelligence architecture and 124 tests', () => {
    render(
      <ProjectModal
        project={spaceSentryProject}
        isOpen={true}
        onClose={() => {}}
      />
    );

    expect(screen.getByText('SpaceSentry')).toBeInTheDocument();
    expect(screen.getByText(/Safe Storage Intelligence for Windows/i)).toBeInTheDocument();
    expect(screen.getByText(/124 passing automated tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Native Windows Shell API crawler/i)).toBeInTheDocument();
  });
});
