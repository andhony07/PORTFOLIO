import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Mail, Check, MapPin, Send, ExternalLink, MessageSquare, Clock } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { developerProfile } from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('Placement & Full-Time Role');

  const topics = [
    'Placement & Full-Time Role',
    'Technical Internship',
    'Open Source & Project Collaboration',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mailtoHref = `mailto:${developerProfile.socials.email}?subject=${encodeURIComponent(
    `Inquiry regarding ${selectedTopic} - ${developerProfile.name}`
  )}`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
      if (reducedMotion || isHeadless) {
        gsap.set(['.contact-header', '.contact-deck'], {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo('.contact-header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo(
          '.contact-deck',
          { opacity: 0, y: 32, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        tag="Connection Deck"
        title="Get In Touch"
        subtitle="Actively exploring placement drives, technical internships, and collaborative developer networking."
        className="contact-header"
      />

      <div className="max-w-3xl mx-auto">
        <GlassPanel hoverGlow glowColor="blue" className="contact-deck p-8 sm:p-10 space-y-8 text-center sm:text-left">
          {/* Header Action Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">Let&apos;s Build Something Resilient</h3>
              <p className="text-sm text-slate-muted">
                Available for internships, software engineering roles, and technical dialogue.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                Actively Interviewing
              </span>
            </div>
          </div>

          {/* Inquiry Topic Selector */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-cosmic-blue flex items-center justify-center sm:justify-start gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Select Conversation Purpose:</span>
            </label>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTopic(t)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-mono transition-all duration-200 cursor-pointer ${
                    selectedTopic === t
                      ? 'bg-cosmic-blue text-white shadow-glow-blue border border-blue-400/50'
                      : 'bg-space-deep/80 text-slate-muted border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons with Email and Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
              onClick={handleCopyEmail}
              className="w-full sm:w-auto text-xs"
            >
              {copied ? 'Email Copied (andhony78@gmail.com)!' : 'Copy Direct Email Address'}
            </Button>

            <a
              href={mailtoHref}
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="md"
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs"
              >
                Launch Mail Client
              </Button>
            </a>
          </div>

          {/* Verified Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-dim">Direct Email</span>
              <p className="text-sm font-medium text-slate-light break-all font-mono">
                {developerProfile.socials.email}
              </p>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-dim">Current Location</span>
              <p className="text-sm font-medium text-slate-light flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-4 h-4 text-cosmic-blue shrink-0" />
                <span>{developerProfile.location}</span>
              </p>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-dim">Verified Channels</span>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                <a
                  href={developerProfile.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-muted hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-slate-dim" />
                </a>
                <a
                  href={developerProfile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-muted hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-slate-dim" />
                </a>
              </div>
            </div>
          </div>

          {/* Response SLA Note */}
          <div className="flex items-center justify-center sm:justify-start gap-2 pt-2 text-xs text-slate-dim font-mono border-t border-white/5">
            <Clock className="w-3.5 h-3.5 text-cosmic-blue" />
            <span>Average response window: within 24 hours. (Timezone: IST UTC+05:30)</span>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};
