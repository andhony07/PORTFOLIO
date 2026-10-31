import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillsSection } from '../../src/components/sections/SkillsSection';

describe('SkillsSection Component Filtering', () => {
  it('renders all skill categories by default', () => {
    render(<SkillsSection />);
    expect(screen.getAllByText(/Languages/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Cloud & DevOps/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/AI & ML/i).length).toBeGreaterThanOrEqual(1);
  });

  it('filters skills when Cloud & DevOps category tab is clicked', () => {
    render(<SkillsSection />);
    
    // Find Cloud & DevOps filter tab
    const cloudTab = screen.getByRole('button', { name: /Cloud & DevOps/i });
    fireEvent.click(cloudTab);

    // Docker should be present
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('AWS Bedrock')).toBeInTheDocument();

    // Frontend categories should not be shown
    expect(screen.queryByText(/HTML5 \/ CSS3/i)).not.toBeInTheDocument();
  });
});
