import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Mail, Check, MapPin, Send } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { developerProfile } from '../../data/profile';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        tag="Connection Deck"
        title="Get In Touch"
        subtitle="Actively exploring placement drives, technical internships, and collaborative developer networking."
      />

      <div className="max-w-3xl mx-auto">
        <GlassPanel hoverGlow glowColor="blue" className="p-8 sm:p-10 space-y-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-white">Let&apos;s Build Something Resilient</h3>
              <p className="text-sm text-slate-muted">
                Available for internships, software engineering roles, and technical dialogue.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
                onClick={handleCopyEmail}
                className="text-xs"
              >
                {copied ? 'Email Copied!' : 'Copy Email'}
              </Button>

              <a
                href={`mailto:${developerProfile.socials.email}?subject=Opportunity%20Inquiry%20-%20${developerProfile.name}`}
              >
                <Button variant="secondary" rightIcon={<Send className="w-4 h-4" />} className="text-xs">
                  Email Me
                </Button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-dim">Direct Email</span>
              <p className="text-sm font-medium text-slate-light break-all">
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
                </a>
                <a
                  href={developerProfile.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-muted hover:text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
};
