import React, { useMemo, useEffect, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { PerformanceContext, PerformanceConfig } from '../../hooks/usePerformance';

export interface PerformanceControllerProps {
  children: React.ReactNode;
}

interface BatteryManager extends EventTarget {
  charging: boolean;
  level: number;
  addEventListener(type: 'chargingchange' | 'levelchange', listener: EventListener): void;
  removeEventListener(type: 'chargingchange' | 'levelchange', listener: EventListener): void;
}

export const PerformanceController: React.FC<PerformanceControllerProps> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const { setPerformanceMode } = usePortfolioStore();

  const [windowWidth, setWindowWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') return window.innerWidth;
    return 1200;
  });

  const [isPageVisible, setIsPageVisible] = useState<boolean>(() => {
    if (typeof document !== 'undefined') return document.visibilityState === 'visible';
    return true;
  });

  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  // 1. Responsive window resizing
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Page Visibility API listener (pause rendering when inactive/backgrounded)
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 3. Optional Battery API integration (purely advisory, never a hard dependency)
  useEffect(() => {
    if (typeof navigator === 'undefined') return;

    let batteryInstance: BatteryManager | null = null;
    let updateBatteryStatus: (() => void) | null = null;

    type NavigatorWithBattery = Navigator & {
      getBattery?: () => Promise<BatteryManager>;
    };

    const nav = navigator as NavigatorWithBattery;

    if (typeof nav.getBattery === 'function') {
      nav.getBattery()
        .then((battery) => {
          batteryInstance = battery;
          updateBatteryStatus = () => {
            // Low power mode triggered if battery <= 20% and not currently charging
            const low = !battery.charging && battery.level <= 0.20;
            setIsLowPower(low);
          };

          updateBatteryStatus();
          battery.addEventListener('levelchange', updateBatteryStatus);
          battery.addEventListener('chargingchange', updateBatteryStatus);
        })
        .catch(() => {
          // Gracefully ignore if blocked by permissions policy or sandbox
        });
    }

    return () => {
      if (batteryInstance && updateBatteryStatus) {
        batteryInstance.removeEventListener('levelchange', updateBatteryStatus);
        batteryInstance.removeEventListener('chargingchange', updateBatteryStatus);
      }
    };
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

    // Conservative Low-Power Override (if battery is low or charging is disconnected)
    if (isLowPower) {
      dpr = 1.0;
      starCount = Math.min(starCount, 1500);
      planetSegments = 32;
      enableFloatingObjects = false;
    }

    return {
      deviceTier: tier,
      dpr,
      starCount,
      planetSegments,
      enableRings,
      enableFloatingObjects,
      reducedMotion,
      isPageVisible,
      isLowPower,
    };
  }, [windowWidth, reducedMotion, isPageVisible, isLowPower]);

  useEffect(() => {
    setPerformanceMode(config.deviceTier === 'mobile' || isLowPower ? 'low' : config.deviceTier === 'tablet' ? 'medium' : 'high');
  }, [config.deviceTier, isLowPower, setPerformanceMode]);

  return (
    <PerformanceContext.Provider value={config}>
      {children}
    </PerformanceContext.Provider>
  );
};
