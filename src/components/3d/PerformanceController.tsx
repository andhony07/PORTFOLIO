import React, { useMemo, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { PerformanceContext, PerformanceConfig } from '../../hooks/usePerformance';

export interface PerformanceControllerProps {
  children: React.ReactNode;
}

export const PerformanceController: React.FC<PerformanceControllerProps> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const { setPerformanceMode } = usePortfolioStore();

  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 1200;
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = useMemo<PerformanceConfig>(() => {
    let tier: 'mobile' | 'tablet' | 'desktop' = 'desktop';
    let dpr = 1.5;
    let starCount = 8500;
    let planetSegments = 64;
    let enableRings = true;
    let enableFloatingObjects = true;

    if (windowWidth < 768) {
      tier = 'mobile';
      dpr = 1.0;
      starCount = 1200;
      planetSegments = 32;
      enableRings = false;
      enableFloatingObjects = false;
    } else if (windowWidth < 1024) {
      tier = 'tablet';
      dpr = 1.25;
      starCount = 3500;
      planetSegments = 48;
      enableRings = true;
      enableFloatingObjects = true;
    } else {
      tier = 'desktop';
      const rawDpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
      dpr = Math.min(rawDpr, 1.75);
      starCount = 8500;
      planetSegments = 64;
      enableRings = true;
      enableFloatingObjects = true;
    }

    return {
      deviceTier: tier,
      dpr,
      starCount,
      planetSegments,
      enableRings,
      enableFloatingObjects,
      reducedMotion,
    };
  }, [windowWidth, reducedMotion]);

  useEffect(() => {
    setPerformanceMode(config.deviceTier === 'mobile' ? 'low' : config.deviceTier === 'tablet' ? 'medium' : 'high');
  }, [config.deviceTier, setPerformanceMode]);

  return (
    <PerformanceContext.Provider value={config}>
      {children}
    </PerformanceContext.Provider>
  );
};
