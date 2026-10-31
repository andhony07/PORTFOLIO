import { createContext, useContext } from 'react';

export interface PerformanceConfig {
  deviceTier: 'mobile' | 'tablet' | 'desktop';
  dpr: number;
  starCount: number;
  planetSegments: number;
  enableRings: boolean;
  enableFloatingObjects: boolean;
  reducedMotion: boolean;
}

export const PerformanceContext = createContext<PerformanceConfig>({
  deviceTier: 'desktop',
  dpr: 1.5,
  starCount: 8500,
  planetSegments: 64,
  enableRings: true,
  enableFloatingObjects: true,
  reducedMotion: false,
});

export const usePerformance = () => useContext(PerformanceContext);
