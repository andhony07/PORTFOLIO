import React, { useState, useEffect } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { Button } from '../common/Button';
import { developerProfile } from '../../data/profile';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { cn } from '../../utils/cn';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openResumeModal, activeSection } = usePortfolioStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on hash click or resize
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-space-bg/85 backdrop-blur-md border-b border-white/10 shadow-lg'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Name */}
          <a
            href="#"
            className="flex items-center gap-2 group text-white font-bold tracking-tight text-lg"
            aria-label="Back to top"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cosmic-blue group-hover:bg-cosmic-violet transition-colors shadow-glow-blue" />
            <span className="font-mono tracking-wider text-sm sm:text-base">
              ANDHONY<span className="text-cosmic-blue font-sans">.DEV</span>
            </span>
          </a>

          {/* Desktop Nav Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors',
                    isActive
                      ? 'text-white bg-white/10 shadow-inner'
                      : 'text-slate-muted hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons & Socials */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={developerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in new tab)"
              className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={developerProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in new tab)"
              className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<FileText className="w-3.5 h-3.5 text-cosmic-blue" />}
              onClick={openResumeModal}
              className="border-cosmic-blue/30 hover:border-cosmic-blue"
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openResumeModal}
              className="text-xs px-2.5 py-1"
            >
              Resume
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-white/10 bg-space-bg/95 backdrop-blur-xl px-4 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-muted hover:text-white hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-muted">Connect:</span>
            <div className="flex items-center gap-3">
              <a
                href={developerProfile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-muted hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={developerProfile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-muted hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
