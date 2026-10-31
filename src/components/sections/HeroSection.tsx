import React, { useEffect, useRef } from 'react';
import { ArrowDown, FileText, Sparkles, Terminal, Mail } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { Button } from '../common/Button';
import { developerProfile } from '../../data/profile';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';

export const HeroSection: React.FC = () => {
  const heroContainerRef = useRef<HTMLElement>(null);
  const { openResumeModal } = usePortfolioStore();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = heroContainerRef.current;
    if (!el) return;

    // Use GSAP context for strict React 19 cleanup & memory isolation
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          ['.hero-badge', '.hero-title', '.hero-headline', '.hero-intro', '.hero-actions', '.hero-card'],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: 0.15 }
      )
        .fromTo(
          '.hero-title',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85 },
          '-=0.45'
        )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.55'
        )
        .fromTo(
          '.hero-intro',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.55'
        )
        .fromTo(
          '.hero-actions',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          '-=0.55'
        )
        .fromTo(
          '.hero-card',
          { opacity: 0, y: 25, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08 },
          '-=0.45'
        );
    }, heroContainerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Availability Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-space-surface border border-cosmic-blue/30 shadow-glass">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-light">AVAILABLE FOR INTERNSHIPS &amp; FULL-TIME ROLES</span>
        </div>

        {/* Main Title / Name */}
        <div className="space-y-4">
          <h1 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I&apos;m <span className="text-gradient-cosmic">{developerProfile.name}</span>
          </h1>
          <p className="hero-headline text-lg sm:text-2xl font-medium text-gradient-blue max-w-2xl mx-auto">
            {developerProfile.title}
          </p>
        </div>

        {/* Short Factual Introduction */}
        <p className="hero-intro text-base sm:text-lg text-slate-muted max-w-2xl mx-auto leading-relaxed">
          B.E. Computer Science student at <span className="text-slate-light font-medium">{developerProfile.education.institution}</span>, building production-oriented full-stack web platforms, machine learning failure risk analyzers, and cloud observability systems.
        </p>

        {/* Call to Actions */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-4 pt-2">
          <a href="#projects">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowDown className="w-4 h-4" />}
            >
              Explore Projects
            </Button>
          </a>

          <Button
            variant="outline"
            size="lg"
            leftIcon={<FileText className="w-4 h-4 text-cosmic-blue" />}
            onClick={openResumeModal}
            className="border-cosmic-blue/40 hover:border-cosmic-blue"
          >
            Download Resume
          </Button>

          <a href="#contact">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Mail className="w-4 h-4 text-cosmic-violet" />}
            >
              Get In Touch
            </Button>
          </a>

          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={developerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in new tab)"
            >
              <Button variant="secondary" size="lg" className="px-3.5">
                <Github className="w-5 h-5" />
              </Button>
            </a>

            <a
              href={developerProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in new tab)"
            >
              <Button variant="secondary" size="lg" className="px-3.5">
                <Linkedin className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="hero-card glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-blue">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">SentinelAI</div>
            <div className="text-xs text-slate-muted">393 Verified Tests</div>
          </div>

          <div className="hero-card glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-violet">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">SpaceSentry</div>
            <div className="text-xs text-slate-muted">Next Byte Hacks V5</div>
          </div>

          <div className="hero-card glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-cyan">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white">DevWatch</div>
            <div className="text-xs text-slate-muted">v2.2.0 Cloud SaaS</div>
          </div>

          <div className="hero-card glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <div className="text-lg font-bold text-white">NPTEL Java</div>
            <div className="text-xs text-slate-muted">88% Elite Score</div>
          </div>
        </div>
      </div>
    </section>
  );
};
