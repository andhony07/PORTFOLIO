import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { developerProfile } from '../../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-space-deep/90 py-12 px-4 sm:px-6 lg:px-8 text-slate-muted z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Open to Opportunities
            </span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="text-white font-medium">{developerProfile.name}</span>. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={developerProfile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile (opens in new tab)"
            className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={developerProfile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile (opens in new tab)"
            className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${developerProfile.socials.email}`}
            aria-label="Send direct email"
            className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
