import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProjectsSection } from '../../src/components/sections/ProjectsSection';

describe('ProjectsSection Component', () => {
  it('renders SentinelAI prominently with verified 393 tests coverage badge', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('SentinelAI')).toBeInTheDocument();
    expect(screen.getByText(/393 tests/i)).toBeInTheDocument();
  });

  it('renders SpaceSentry with Safe Storage Intelligence for Windows identity', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('SpaceSentry')).toBeInTheDocument();
    expect(screen.getByText('Safe Storage Intelligence for Windows')).toBeInTheDocument();
  });

  it('filters projects when filter button is clicked', () => {
    render(<ProjectsSection />);
    const systemsFilterBtn = screen.getByRole('button', { name: /Systems & Utilities/i });
    fireEvent.click(systemsFilterBtn);

    // SpaceSentry and Ghost Data Audit should be present in systems
    expect(screen.getByText('SpaceSentry')).toBeInTheDocument();
    expect(screen.getByText('Ghost Data Deletion Audit')).toBeInTheDocument();

    // DevWatch (cloud-devops) should not be visible under systems
    expect(screen.queryByText('DevWatch v2.2.0-SaaS')).not.toBeInTheDocument();
  });
});
