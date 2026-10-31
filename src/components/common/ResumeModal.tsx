import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Mail, Check, ExternalLink, FileText, Download, CheckCircle2, MapPin } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { developerProfile } from '../../data/profile';

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resumePdfPath = '/resume/Andhony_Saviyar_S_Resume.pdf';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume"
      description="Placement & Career Opportunity Notice"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Verified Status Banner */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/30 text-blue-200">
          <FileText className="w-8 h-8 text-cosmic-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-semibold text-white">Resume Available</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified PDF</span>
              </span>
            </div>
            <p className="text-slate-muted leading-relaxed">
              My latest resume is available here, including my technical skills, projects, internship experience, education and certifications.
            </p>
          </div>
        </div>

        {/* Primary PDF Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="primary"
              size="md"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              className="w-full justify-center shadow-glow-blue"
            >
              View Resume
            </Button>
          </a>

          <a
            href={resumePdfPath}
            download="Andhony_Saviyar_S_Resume.pdf"
            className="flex-1"
          >
            <Button
              variant="outline"
              size="md"
              leftIcon={<Download className="w-4 h-4 text-cyan-300" />}
              className="w-full justify-center border-cosmic-blue/40 hover:border-cosmic-blue"
            >
              Download Resume
            </Button>
          </a>
        </div>

        {/* Direct Inquiries & Contact Actions */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <p className="text-xs font-mono uppercase tracking-wider text-slate-dim">
            Direct Inquiries &amp; Contact:
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cosmic-violet" />}
              onClick={handleCopyEmail}
              className="w-full sm:w-auto"
            >
              {copied ? 'Email Copied!' : 'Copy Email Address'}
            </Button>

            <a
              href={`mailto:${developerProfile.socials.email}?subject=Opportunity%20Inquiry%20-%20Andhony%20Saviyar%20S.`}
              className="inline-flex w-full sm:w-auto"
            >
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5 text-slate-muted" />}
                className="w-full"
              >
                Open Mail Client
              </Button>
            </a>
          </div>
        </div>

        {/* Footer with Location and Profiles */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-muted">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-dim">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{developerProfile.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={developerProfile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={developerProfile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
