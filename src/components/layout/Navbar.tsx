import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, MapPin } from 'lucide-react';
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

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Track scroll position for backdrop blur styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close mobile drawer on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Keyboard accessibility: Escape key and focus trapping
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Lock body scroll while drawer is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
        triggerButtonRef.current?.focus();
        return;
      }

      // Trap focus inside drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const closeDrawer = () => {
    setMobileMenuOpen(false);
    triggerButtonRef.current?.focus();
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleResumeClick = () => {
    setMobileMenuOpen(false);
    openResumeModal();
  };

  return (
    <>
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

            {/* Action Buttons & Socials (Desktop) */}
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

            {/* Mobile Actions & Menu Toggle */}
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
                ref={triggerButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-controls="mobile-nav-drawer"
                aria-expanded={mobileMenuOpen}
                className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-space-deep/80 backdrop-blur-md z-40 transition-opacity duration-300 sm:hidden"
          onClick={closeDrawer}
          aria-hidden="true"
          data-testid="mobile-drawer-backdrop"
        />
      )}

      {/* Mobile Slide-in Drawer Dialog */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed top-0 right-0 bottom-0 w-[84vw] max-w-xs z-50 bg-space-surface/95 border-l border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300 sm:hidden"
        >
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono font-bold text-sm text-white tracking-wider">
                ANDHONY<span className="text-cosmic-blue font-sans">.DEV</span>
              </span>
              <button
                ref={closeButtonRef}
                onClick={closeDrawer}
                aria-label="Close navigation menu"
                className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cosmic-blue cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items (Scrollable in Landscape) */}
            <nav className="flex flex-col space-y-1.5 py-4 max-h-[60vh] max-h-[60dvh] overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-cosmic-blue text-white shadow-glow-blue'
                        : 'text-slate-muted hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Drawer Bottom Actions & Socials */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <Button
              variant="outline"
              size="md"
              leftIcon={<FileText className="w-4 h-4 text-cosmic-blue" />}
              onClick={handleResumeClick}
              className="w-full text-xs font-mono justify-center border-cosmic-blue/40"
            >
              Resume
            </Button>

            <div className="flex items-center justify-between text-xs text-slate-muted pt-1">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-dim font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tiruppur, TN</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={developerProfile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={developerProfile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
