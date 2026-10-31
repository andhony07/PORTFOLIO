import React from 'react';
import { Modal } from './Modal';
import { Badge } from './Badge';
import { Button } from './Button';
import { ExternalLink, ShieldCheck, CheckCircle2, Cpu, Wrench } from 'lucide-react';
import { Github } from './Icons';
import { Project } from '../../types/portfolio';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      description={project.subtitle}
      maxWidth="xl"
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Status & Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Badge status={project.status} dot>
              Status: {project.status}
            </Badge>
            <Badge variant="blue" size="sm">
              {project.category.toUpperCase()}
            </Badge>
          </div>

          {project.featured && (
            <span className="text-xs font-mono text-cosmic-blue flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cosmic-blue" />
              FEATURED REPOSITORY
            </span>
          )}
        </div>

        {/* Problem Solved */}
        {project.problemSolved && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cosmic-blue flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Problem Statement &amp; Objective</span>
            </h4>
            <p className="text-sm text-slate-muted leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
              {project.problemSolved}
            </p>
          </div>
        )}

        {/* Architecture Details & Key Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cosmic-violet flex items-center gap-1.5">
            <Wrench className="w-4 h-4" />
            <span>Architecture &amp; Core Implementation</span>
          </h4>
          <div className="space-y-2">
            {(project.architectureDetails || project.detailedDescription).map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-light bg-space-deep/60 p-3 rounded-lg border border-white/5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testing Evidence & Verification */}
        {project.testingEvidence && (
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Testing Evidence &amp; Verification</span>
            </h4>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm leading-relaxed">
              {project.testingEvidence}
            </div>
          </div>
        )}

        {/* Technology Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-dim">
            Verified Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-light"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions & Links */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            aria-label={`Open ${project.title} repository on GitHub`}
          >
            <Button
              variant="primary"
              size="md"
              leftIcon={<Github className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Inspect Source on GitHub
            </Button>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ExternalLink className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Launch Live Demo
              </Button>
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};
