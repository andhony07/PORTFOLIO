import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ProjectModal } from '../common/ProjectModal';
import { ExternalLink, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { Github } from '../common/Icons';
import { projectsRegistry } from '../../data/projects';
import { Project, ProjectCategory } from '../../types/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | ProjectCategory>('all');
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsRegistry.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const filterButtons: Array<{ id: 'all' | 'featured' | ProjectCategory; label: string }> = [
    { id: 'all', label: 'All Projects (8)' },
    { id: 'featured', label: 'Featured' },
    { id: 'ai-ml', label: 'AI & Machine Learning' },
    { id: 'cloud-devops', label: 'Cloud & DevOps' },
    { id: 'systems', label: 'Systems & Utilities' },
    { id: 'fullstack', label: 'Full Stack' },
  ];

  // ScrollTrigger entrance choreography
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
      if (reducedMotion || isHeadless) {
        gsap.set(['.projects-header', '.projects-filters', '.project-card'], {
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

      tl.fromTo('.projects-header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo('.projects-filters', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .fromTo(
          '.project-card',
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle restagger when filter tab changes
  useEffect(() => {
    if (reducedMotion) return;
    const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
    if (isHeadless) return;

    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeFilter, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        tag="Project Constellation"
        title="Engineered Systems & Applications"
        subtitle="Audited repository portfolio spanning server observability, desktop storage intelligence, distributed architectures, and AI applications."
        className="projects-header"
      />

      {/* Filter Tabs */}
      <div className="projects-filters flex flex-wrap items-center justify-center gap-2 mb-12">
        {filterButtons.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-cosmic-blue text-white shadow-glow-blue border border-blue-400/40'
                : 'glass-panel text-slate-muted hover:text-white hover:border-white/20'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <GlassPanel
            key={project.id}
            hoverGlow
            glowColor={project.featured ? 'blue' : 'none'}
            className="project-card flex flex-col justify-between group border-white/10 hover:border-cosmic-blue/40"
          >
            <div className="space-y-4">
              {/* Card Header with Status & Category */}
              <div className="flex items-center justify-between gap-2">
                <Badge status={project.status} dot>
                  {project.status}
                </Badge>
                {project.featured && (
                  <span className="text-[11px] font-mono text-cosmic-blue flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    FEATURED
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-cosmic-blue mt-1">
                  {project.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-muted leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Verified Metrics / Badges (SentinelAI, SpaceSentry, etc.) */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {project.metrics.map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-light font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{m.label}: <strong>{m.value}</strong></span>
                    </span>
                  ))}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.technologies.slice(0, 5).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-space-deep/80 border border-white/5 text-slate-muted"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 5 && (
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded text-slate-dim">
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* Card Actions */}
            <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Info className="w-3.5 h-3.5 text-cosmic-cyan" />}
                onClick={() => setInspectedProject(project)}
                className="w-full text-xs font-mono border-white/10 hover:border-cosmic-cyan/50"
              >
                Inspect Technical Architecture
              </Button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<Github className="w-3.5 h-3.5" />}
                    className="w-full text-xs font-mono group-hover:border-cosmic-blue/40"
                  >
                    View Repository
                  </Button>
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    aria-label={`Open live demonstration for ${project.title}`}
                  >
                    <Button variant="outline" size="sm" className="px-2.5">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Deep Architecture Detail Modal */}
      <ProjectModal
        project={inspectedProject}
        isOpen={!!inspectedProject}
        onClose={() => setInspectedProject(null)}
      />
    </section>
  );
};
