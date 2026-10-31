import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollState {
  progress: number;
}

export const globalScrollState: ScrollState = {
  progress: 0,
};

let activeListenersCount = 0;
let cleanupHandler: (() => void) | null = null;

// Initializes lightweight scroll synchronization keeping globalScrollState updated
export function initScrollProgressSync(): () => void {
  if (typeof window === 'undefined') return () => {};

  activeListenersCount++;

  if (!cleanupHandler) {
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        globalScrollState.progress = 0;
        return;
      }
      const current = window.scrollY;
      globalScrollState.progress = Math.max(0, Math.min(1, current / docHeight));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    let triggerInstance: ScrollTrigger | null = null;
    try {
      // Synchronize with GSAP's optimized ticker and scroll monitoring
      triggerInstance = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          globalScrollState.progress = self.progress;
        },
      });
    } catch {
      // In non-browser or mock environments, native listener serves as fallback
    }

    cleanupHandler = () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (triggerInstance) {
        triggerInstance.kill();
      }
      cleanupHandler = null;
    };
  }

  return () => {
    activeListenersCount--;
    if (activeListenersCount <= 0) {
      activeListenersCount = 0;
      if (cleanupHandler) {
        cleanupHandler();
      }
    }
  };
}
