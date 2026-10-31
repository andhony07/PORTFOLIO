import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Mail, Check, ExternalLink, FileText } from 'lucide-react';
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume Status"
      description="Placement & Career Opportunity Notice"
      maxWidth="md"
    >
      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/30 text-blue-200">
          <FileText className="w-8 h-8 text-cosmic-blue shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-white mb-1">Resume Under Final Review</p>
            <p className="text-slate-muted leading-relaxed">
              My verified academic and project resume is currently being updated for upcoming recruitment cycles and placement evaluations. A finalized PDF copy will be published directly here.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-light">
            In the meantime, connect directly for verified credentials or inquiries:
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
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
                variant="secondary"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5 text-slate-muted" />}
                className="w-full"
              >
                Open Mail Client
              </Button>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-muted">
          <span>Verified Profiles:</span>
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
