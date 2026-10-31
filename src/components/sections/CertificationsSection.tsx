import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Award, CheckCircle2, ShieldAlert } from 'lucide-react';
import { certificationsRegistry } from '../../data/certifications';
import { Certification } from '../../types/portfolio';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        tag="Certification Galaxy"
        title="Verified Technical Credentials"
        subtitle="Professional certificates and industry job simulations across cloud architectures, generative AI, enterprise analytics, and core algorithms."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificationsRegistry.map((cert) => (
          <GlassPanel
            key={cert.id}
            hoverGlow
            glowColor="violet"
            onClick={() => setActiveCert(cert)}
            className="cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Header & Issuer */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-cosmic-violet/10 border border-cosmic-violet/30 text-cosmic-violet">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cosmic-blue font-semibold">
                      {cert.issuer}
                    </span>
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

              {/* Vector Document Preview Thumbnail */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-space-deep/90 flex items-center justify-center p-2">
                <img
                  src={cert.image || '/assets/certificates/placeholder.svg'}
                  alt={`${cert.title} credential preview`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
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
              <span>View Credential Details</span>
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
          maxWidth="lg"
        >
          <div className="space-y-6">
            <div className="aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-space-deep flex items-center justify-center p-4">
              <img
                src={activeCert.image || '/assets/certificates/placeholder.svg'}
                alt={`${activeCert.title} preview`}
                className="w-full h-full object-contain max-h-[260px]"
              />
            </div>

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

            {activeCert.score && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono">
                Official Examination Score: <strong>{activeCert.score}</strong>
              </div>
            )}

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-muted flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-dim shrink-0" />
              <span>
                Document capture verified against student records. Individual high-res certificate export available on request.
              </span>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

