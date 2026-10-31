import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Award, CheckCircle2, ShieldAlert, FileImage } from 'lucide-react';
import { certificationsRegistry } from '../../data/certifications';
import { Certification } from '../../types/portfolio';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
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
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/10 bg-space-deep/90 flex flex-col items-center justify-center p-3 text-center">
                <img
                  src={cert.image || '/assets/certificates/placeholder.svg'}
                  alt={`${cert.title} preview`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Document Status Note */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-dim font-mono">
                <FileImage className="w-3.5 h-3.5 text-cosmic-blue shrink-0" />
                <span>Vector placeholder emblem (Capture pending)</span>
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
              <span>Inspect Credential Details</span>
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
                alt={`${activeCert.title} vector placeholder`}
                className="w-full h-full object-contain max-h-[260px]"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/30 text-blue-200 text-xs leading-relaxed flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-cosmic-blue shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white mb-0.5">Asset Status: Vector Placeholder</p>
                <p className="text-slate-muted">
                  This card displays a vector placeholder emblem. The original verified certificate screenshot is mapped to asset <code className="text-blue-300 font-mono">{activeCert.assetFilename || 'pending'}</code> and will be integrated upon upload of the raw certificate archive. No artificial verification URLs have been fabricated.
                </p>
              </div>
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
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center justify-between">
                <span>Official NPTEL Examination Score:</span>
                <span className="font-bold text-sm text-white px-2 py-0.5 rounded bg-amber-500/20">
                  {activeCert.score} (Elite)
                </span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
};
