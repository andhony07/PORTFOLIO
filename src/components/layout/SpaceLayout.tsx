import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ResumeModal } from '../common/ResumeModal';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export interface SpaceLayoutProps {
  children: React.ReactNode;
}

export const SpaceLayout: React.FC<SpaceLayoutProps> = ({ children }) => {
  const { isResumeModalOpen, closeResumeModal } = usePortfolioStore();

  return (
    <div className="relative min-h-screen bg-space-bg text-slate-light selection:bg-cosmic-blue/30 selection:text-white flex flex-col">
      {/* Background layer: Cosmic Gradient & Star Ambient Backdrop (Phase 1 Foundation) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 bg-space-gradient opacity-95" 
        aria-hidden="true"
      >
        {/* Subtle radial cosmic glow accents */}
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cosmic-blue/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] rounded-full bg-cosmic-violet/10 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] rounded-full bg-cosmic-blue/5 blur-[100px]" />
      </div>

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
