import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Briefcase, BookOpen, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { internshipsRegistry, workshopsRegistry } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader
        tag="Industry &amp; Applied Training"
        title="Internships &amp; Technical Workshops"
        subtitle="Practical engineering internships and structured technical workshops developing real-world software foundations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Internships Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cosmic-blue" />
              <h3 className="text-xl font-bold text-white">Internship Experience</h3>
            </div>
            <span className="text-xs font-mono text-slate-dim">
              Verified Student Internships
            </span>
          </div>

          <div className="space-y-6">
            {internshipsRegistry.map((item) => (
              <GlassPanel key={item.id} hoverGlow className="p-6 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="text-lg font-bold text-white">{item.role}</h4>
                    <p className="text-sm font-medium text-cosmic-blue">{item.company}</p>
                  </div>
                  <Badge variant="blue" size="sm" className="self-start sm:self-auto">
                    <Clock className="w-3 h-3 text-cosmic-blue mr-1 inline" />
                    Duration: {item.duration}
                  </Badge>
                </div>

                <p className="text-sm text-slate-muted leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
                  {item.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-space-deep border border-white/5 text-slate-light"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Workshops & Continuous Learning Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cosmic-violet" />
              <h3 className="text-xl font-bold text-white">Workshops &amp; Learning</h3>
            </div>
            <span className="text-xs font-mono text-slate-dim">
              Skill Acceleration
            </span>
          </div>

          <div className="space-y-6">
            {workshopsRegistry.map((workshop) => (
              <GlassPanel key={workshop.id} hoverGlow glowColor="violet" className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-base font-bold text-white">{workshop.title}</h4>
                  <span className="text-xs font-mono text-cosmic-violet font-semibold bg-cosmic-violet/10 px-2.5 py-0.5 rounded-full border border-cosmic-violet/30">
                    {workshop.organizer}
                  </span>
                </div>

                <p className="text-sm text-slate-muted leading-relaxed">
                  {workshop.description}
                </p>

                <div className="pt-2 space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-dim tracking-wider">
                    Topics Explored:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {workshop.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-light"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassPanel>
            ))}

            <GlassPanel className="p-5 bg-gradient-to-br from-space-surface to-cosmic-blue/5 border-cosmic-blue/20">
              <div className="flex items-center gap-2 text-cosmic-blue mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Fabrication Policy</span>
              </div>
              <p className="text-xs text-slate-muted leading-relaxed">
                All records, codebases, and credentials represent genuine student coursework, submitted hackathon projects, and tested repositories without inflated metrics or unverifiable employment claims.
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
};
