import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Briefcase, BookOpen, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { internshipsRegistry, workshopsRegistry } from '../../data/experience';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
      if (reducedMotion || isHeadless) {
        gsap.set(['.experience-header', '.internship-card', '.workshop-card'], {
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

      tl.fromTo('.experience-header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo(
          '.internship-card',
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
          '-=0.35'
        )
        .fromTo(
          '.workshop-card',
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1 },
          '-=0.35'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        tag="Industry & Applied Training"
        title="Internships & Technical Workshops"
        subtitle="Practical engineering internships and structured technical workshops developing real-world software foundations."
        className="experience-header"
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
              <GlassPanel key={item.id} hoverGlow className="internship-card p-6 space-y-3">
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
              <h3 className="text-xl font-bold text-white">Workshops & Learning</h3>
            </div>
            <span className="text-xs font-mono text-slate-dim">
              Skill Acceleration
            </span>
          </div>

          <div className="space-y-6">
            {workshopsRegistry.map((workshop) => (
              <GlassPanel key={workshop.id} hoverGlow glowColor="violet" className="workshop-card p-6 space-y-3">
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

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-dim font-mono border-t border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cosmic-blue" />
                  <span>Interactive workshop completion</span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
