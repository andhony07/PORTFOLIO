import React, { useState, useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Award, CheckCircle2, ShieldCheck, ExternalLink, FileText, Calendar, Hash } from 'lucide-react';
import { certificationsRegistry } from '../../data/certifications';
import { Certification } from '../../types/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CertificationsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
      if (reducedMotion || isHeadless) {
        gsap.set(['.cert-header', '.cert-card'], {
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

      tl.fromTo('.cert-header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo(
          '.cert-card',
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        tag="Certification Galaxy"
        title="Verified Technical Credentials"
        subtitle="Original verified certificates and professional industry simulations across cloud architectures, generative AI, enterprise analytics, and core algorithms."
        className="cert-header"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsRegistry.map((cert) => (
          <GlassPanel
            key={cert.id}
            hoverGlow
            glowColor="violet"
            onClick={() => setActiveCert(cert)}
            className="cert-card cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Header & Issuer */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cosmic-violet/10 border border-cosmic-violet/30 text-cosmic-violet">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cosmic-blue font-semibold block">
                      {cert.issuer}
                    </span>
                    {cert.issueDate && (
                      <span className="text-[11px] font-mono text-slate-dim">
                        {cert.issueDate}
                      </span>
                    )}
                  </div>
                </div>

                {cert.score && (
                  <Badge variant="amber" size="sm">
                    Score: {cert.score}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                {cert.title}
              </h3>

              {/* Verified Certificate Preview Thumbnail */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-space-deep flex flex-col items-center justify-center p-2 text-center group-hover:border-cosmic-blue/40 transition-colors">
                <img
                  src={cert.image || '/assets/certificates/placeholder.svg'}
                  alt={`${cert.title} certificate preview`}
                  className="w-full h-full object-contain rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Document Status Note */}
              <div className="flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Verified Authentic Credential</span>
                </div>
                {cert.credentialId && (
                  <span className="text-slate-dim truncate max-w-[120px]" title={cert.credentialId}>
                    {cert.credentialId}
                  </span>
                )}
              </div>

              {/* Topics Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {cert.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-cosmic-violet font-mono group-hover:text-white transition-colors">
              <span>Inspect Credential &amp; Document</span>
              <span>&rarr;</span>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Detail Modal */}
      {activeCert && (
        <Modal
          isOpen={!!activeCert}
          onClose={() => setActiveCert(null)}
          title={activeCert.title}
          description={`Issued by ${activeCert.issuer}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Visual Certificate Preview */}
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-space-deep flex items-center justify-center p-3">
              <img
                src={activeCert.image || '/assets/certificates/placeholder.svg'}
                alt={`${activeCert.title} official certificate`}
                className="w-full h-full object-contain max-h-[340px] rounded"
              />
            </div>

            {/* Authenticity & Document Actions Box */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Asset Status: Verified Authentic Document</p>
                  <p className="text-slate-muted text-[11px]">
                    Integrated from original verified certificate archive. Authenticity confirmed by issuing organization.
                  </p>
                </div>
              </div>

              {activeCert.documentUrl && (
                <a
                  href={activeCert.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-cosmic-blue/20 hover:bg-cosmic-blue/30 text-cyan-300 hover:text-white border border-cosmic-blue/40 text-xs font-mono font-medium transition-all shadow-glow-blue whitespace-nowrap shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open PDF Document</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              )}
            </div>

            {/* Credential Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {activeCert.issueDate && (
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-slate-light">
                  <Calendar className="w-4 h-4 text-cosmic-blue shrink-0" />
                  <span>Issued: <strong className="text-white font-normal">{activeCert.issueDate}</strong></span>
                </div>
              )}
              {activeCert.credentialId && (
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-slate-light truncate">
                  <Hash className="w-4 h-4 text-cosmic-violet shrink-0" />
                  <span className="truncate">ID: <strong className="text-white font-normal">{activeCert.credentialId}</strong></span>
                </div>
              )}
            </div>

            {/* Curriculum Topics */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cosmic-blue">
                Verified Curriculum &amp; Covered Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeCert.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-light"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Examination Score breakdown (if available) */}
            {activeCert.score && (
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span>Official NPTEL Examination Score:</span>
                  <span className="font-bold text-sm text-white px-2 py-0.5 rounded bg-amber-500/20">
                    {activeCert.score} (Elite)
                  </span>
                </div>
                {activeCert.scoreBreakdown && (
                  <div className="pt-2 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-amber-300/90">
                    <div>Assignments: <span className="text-white">{activeCert.scoreBreakdown.assignmentScore}</span></div>
                    <div>Proctored Exam: <span className="text-white">{activeCert.scoreBreakdown.proctoredScore}</span></div>
                    <div>Candidates: <span className="text-white">{activeCert.scoreBreakdown.totalCandidates?.toLocaleString()}</span></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};
