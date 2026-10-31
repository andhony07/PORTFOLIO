import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PerformanceController } from '../../src/components/3d/PerformanceController';
import { usePerformance } from '../../src/hooks/usePerformance';

const TestConsumer: React.FC = () => {
  const config = usePerformance();
  return (
    <div>
      <span data-testid="tier">{config.deviceTier}</span>
      <span data-testid="dpr">{config.dpr}</span>
      <span data-testid="stars">{config.starCount}</span>
      <span data-testid="segments">{config.planetSegments}</span>
      <span data-testid="rings">{String(config.enableRings)}</span>
    </div>
  );
};

describe('PerformanceController Adaptive Configuration', () => {
  it('configures desktop settings for viewports >= 1024px', () => {
    window.innerWidth = 1440;
    render(
      <PerformanceController>
        <TestConsumer />
      </PerformanceController>
    );

    expect(screen.getByTestId('tier').textContent).toBe('desktop');
    expect(Number(screen.getByTestId('stars').textContent)).toBe(8500);
    expect(Number(screen.getByTestId('segments').textContent)).toBe(64);
    expect(screen.getByTestId('rings').textContent).toBe('true');
  });

  it('configures tablet settings for viewports between 768px and 1023px', () => {
    window.innerWidth = 800;
    render(
      <PerformanceController>
        <TestConsumer />
      </PerformanceController>
    );

    expect(screen.getByTestId('tier').textContent).toBe('tablet');
    expect(Number(screen.getByTestId('dpr').textContent)).toBe(1.25);
    expect(Number(screen.getByTestId('stars').textContent)).toBe(3500);
    expect(Number(screen.getByTestId('segments').textContent)).toBe(48);
  });

  it('configures mobile settings for viewports < 768px with reduced load', () => {
    window.innerWidth = 390;
    render(
      <PerformanceController>
        <TestConsumer />
      </PerformanceController>
    );

    expect(screen.getByTestId('tier').textContent).toBe('mobile');
    expect(Number(screen.getByTestId('dpr').textContent)).toBe(1.0);
    expect(Number(screen.getByTestId('stars').textContent)).toBe(1200);
    expect(Number(screen.getByTestId('segments').textContent)).toBe(32);
    expect(screen.getByTestId('rings').textContent).toBe('false');
  });
});
