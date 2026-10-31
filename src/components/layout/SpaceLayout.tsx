import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ResumeModal } from '../common/ResumeModal';
import { SpaceCanvas } from '../3d/SpaceCanvas';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export interface SpaceLayoutProps {
  children: React.ReactNode;
}

export const SpaceLayout: React.FC<SpaceLayoutProps> = ({ children }) => {
  const { isResumeModalOpen, closeResumeModal } = usePortfolioStore();

  return (
    <div className="relative min-h-screen bg-space-bg text-slate-light selection:bg-cosmic-blue/30 selection:text-white flex flex-col">
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

