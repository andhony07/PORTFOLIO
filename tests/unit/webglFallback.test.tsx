import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SpaceCanvas, SpaceCssFallback } from '../../src/components/3d/SpaceCanvas';
import * as webglDetector from '../../src/utils/webglDetector';

describe('WebGL Detection and Graceful CSS Fallback', () => {
  it('renders SpaceCssFallback component with cosmic gradients and static stars', () => {
    render(<SpaceCssFallback />);
    const fallback = screen.getByTestId('space-css-fallback');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveClass('bg-space-gradient');
    expect(fallback).toHaveAttribute('aria-hidden', 'true');
  });

  it('automatically falls back to CSS mode when WebGL is unsupported', () => {
    // Mock detectWebGL to return isSupported: false
    vi.spyOn(webglDetector, 'detectWebGL').mockReturnValue({
      isSupported: false,
      glVersion: null,
    });

    render(<SpaceCanvas />);

    // SpaceCssFallback should be rendered
    expect(screen.getByTestId('space-css-fallback')).toBeInTheDocument();
    // Canvas container should not be mounted
    expect(screen.queryByTestId('space-canvas-container')).not.toBeInTheDocument();

    vi.restoreAllMocks();
  });
});
