import { create } from 'zustand';
import { Project, Certification } from '../types/portfolio';

interface PortfolioState {
  // Modal states
  isResumeModalOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;

  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  selectedCertification: Certification | null;
  setSelectedCertification: (cert: Certification | null) => void;

  // Active section tracking for navbar
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Adaptive performance tier
  performanceMode: 'high' | 'medium' | 'low';
  setPerformanceMode: (mode: 'high' | 'medium' | 'low') => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isResumeModalOpen: false,
  openResumeModal: () => set({ isResumeModalOpen: true }),
  closeResumeModal: () => set({ isResumeModalOpen: false }),

  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  selectedCertification: null,
  setSelectedCertification: (cert) => set({ selectedCertification: cert }),

  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  performanceMode: 'high',
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
}));

