import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ResumeModal } from '../common/ResumeModal';
import { SpaceCanvas } from '../3d/SpaceCanvas';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { initScrollProgressSync } from '../../utils/scrollState';

export interface SpaceLayoutProps {
  children: React.ReactNode;
}

export const SpaceLayout: React.FC<SpaceLayoutProps> = ({ children }) => {
  const { isResumeModalOpen, closeResumeModal } = usePortfolioStore();

  // Initialize global scroll synchronization for camera waypoints and animations
  useEffect(() => {
    const cleanupScroll = initScrollProgressSync();
    return () => cleanupScroll();
  }, []);

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full overflow-x-hidden bg-space-bg text-slate-light selection:bg-cosmic-blue/30 selection:text-white flex flex-col">
      {/* Persistent 3D Canvas with WebGL detection & graceful CSS fallback */}
      <SpaceCanvas />

      {/* Floating Glassmorphic Navigation */}
      <Navbar />

      {/* Primary Content Stream */}
      <main className="relative z-10 flex-grow pt-20">
        {children}
      </main>

      {/* Global Modals */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
};

