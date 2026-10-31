import React, { Component, ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpaceScene } from './SpaceScene';
import { PerformanceController } from './PerformanceController';
import { usePerformance } from '../../hooks/usePerformance';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';

// Graceful CSS Fallback when WebGL is unavailable or fails
export const SpaceCssFallback: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 bg-space-gradient opacity-95 overflow-hidden"
      aria-hidden="true"
      data-testid="space-css-fallback"
    >
      {/* High-fidelity CSS cosmic glow spheres simulating planetary presence */}
      <div className="absolute top-[-8%] right-[-5%] w-[580px] h-[580px] rounded-full bg-gradient-to-br from-cosmic-blue/20 via-cosmic-violet/15 to-transparent blur-[90px]" />
      <div className="absolute top-[35%] left-[-10%] w-[650px] h-[650px] rounded-full bg-cosmic-blue/10 blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-cosmic-violet/10 blur-[110px]" />

      {/* Subtle static CSS stellar points */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 25px 35px, #F8FAFC, transparent),
            radial-gradient(1.5px 1.5px at 140px 180px, #3678E5, transparent),
            radial-gradient(1px 1px at 280px 70px, #8B5CF6, transparent),
            radial-gradient(2px 2px at 450px 320px, #F8FAFC, transparent),
            radial-gradient(1px 1px at 620px 150px, #06B6D4, transparent),
            radial-gradient(1.5px 1.5px at 780px 450px, #F8FAFC, transparent)
          `,
          backgroundSize: '800px 600px',
        }}
      />
    </div>
  );
};

// Error Boundary for WebGL context loss or runtime GPU exceptions
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn('SpaceCanvas WebGL caught an exception, switching to CSS fallback:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Inner Canvas Wrapper consuming Performance Context
const CanvasRoot: React.FC = () => {
  const { dpr, deviceTier } = usePerformance();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      data-testid="space-canvas-container"
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 500 }}
        gl={{
          antialias: deviceTier !== 'mobile',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full pointer-events-none"
      >
        <Suspense fallback={null}>
          <SpaceScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Master Export
export const SpaceCanvas: React.FC = () => {
  const { isSupported } = useWebGLSupport();

  if (!isSupported) {
    return <SpaceCssFallback />;
  }

  return (
    <CanvasErrorBoundary fallback={<SpaceCssFallback />}>
      <PerformanceController>
        <CanvasRoot />
      </PerformanceController>
    </CanvasErrorBoundary>
  );
};
