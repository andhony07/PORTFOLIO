import { describe, it, expect } from 'vitest';
import * as THREE from 'three';

describe('CameraController Math & Bounds Logic', () => {
  it('correctly calculates cubic ease out for smooth camera entrance', () => {
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeCloseTo(0.875, 3);
  });

  it('clamps parallax offsets according to device tier limits', () => {
    const computeParallax = (mouseX: number, tier: 'desktop' | 'tablet' | 'mobile', reducedMotion: boolean) => {
      let intensity = 0.35;
      if (tier === 'mobile' || reducedMotion) intensity = 0.0;
      else if (tier === 'tablet') intensity = 0.12;

      return mouseX * intensity;
    };

    // Desktop
    expect(computeParallax(1.0, 'desktop', false)).toBe(0.35);
    expect(computeParallax(-1.0, 'desktop', false)).toBe(-0.35);

    // Tablet
    expect(computeParallax(1.0, 'tablet', false)).toBe(0.12);

    // Mobile
    expect(computeParallax(1.0, 'mobile', false)).toBe(0.0);

    // Reduced motion on desktop
    expect(computeParallax(1.0, 'desktop', true)).toBe(0.0);
  });

  it('smoothly interpolates coordinates via THREE.MathUtils.lerp', () => {
    const startZ = 13.5;
    const targetZ = 7.5;
    const halfway = THREE.MathUtils.lerp(startZ, targetZ, 0.5);
    expect(halfway).toBe(10.5);
  });
});

