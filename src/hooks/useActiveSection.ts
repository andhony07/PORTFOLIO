import { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'certifications', 'achievements', 'experience', 'contact'];

export function useActiveSection() {
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.3, 0.6],
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);
}
