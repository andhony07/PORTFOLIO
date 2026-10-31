import React from 'react';
import { ArrowDown, FileText, Sparkles, Terminal } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { Button } from '../common/Button';
import { developerProfile } from '../../data/profile';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export const HeroSection: React.FC = () => {
  const { openResumeModal } = usePortfolioStore();

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono bg-space-surface border border-cosmic-blue/30 shadow-glass">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-light">AVAILABLE FOR INTERNSHIPS &amp; FULL-TIME ROLES</span>
        </div>

        {/* Main Title / Name */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Hi, I&apos;m <span className="text-gradient-cosmic">{developerProfile.name}</span>
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-gradient-blue max-w-2xl mx-auto">
            {developerProfile.title}
          </p>
        </div>

        {/* Short Factual Introduction */}
        <p className="text-base sm:text-lg text-slate-muted max-w-2xl mx-auto leading-relaxed">
          B.E. Computer Science student at <span className="text-slate-light font-medium">{developerProfile.education.institution}</span>, building production-oriented full-stack web platforms, machine learning failure risk analyzers, and cloud observability systems.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-blue">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">SentinelAI</div>
            <div className="text-xs text-slate-muted">393 Verified Tests</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-violet">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-lg font-bold text-white">SpaceSentry</div>
            <div className="text-xs text-slate-muted">Next Byte Hacks V5</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="flex items-center justify-center mb-1 text-cosmic-cyan">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div className="text-lg font-bold text-white">DevWatch</div>
            <div className="text-xs text-slate-muted">v2.2.0 Cloud SaaS</div>
          </div>

          <div className="glass-panel p-4 rounded-xl text-center">
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
