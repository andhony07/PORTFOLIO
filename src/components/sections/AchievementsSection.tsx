import React, { useEffect, useRef } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Trophy, Calendar, CheckCircle2 } from 'lucide-react';
import { achievementsRegistry } from '../../data/achievements';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const isHeadless = typeof window !== 'undefined' && window.navigator.userAgent.includes('jsdom');
      if (reducedMotion || isHeadless) {
        gsap.set(['.achievements-header', '.achievements-legend', '.achievement-timeline-item'], {
          opacity: 1,
          x: 0,
          y: 0,
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

      tl.fromTo('.achievements-header', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65 })
        .fromTo('.achievements-legend', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.35')
        .fromTo(
          '.achievement-timeline-item',
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.55, stagger: 0.12 },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
    >
      <SectionHeader
        tag="Engineering Challenges"
        title="Hackathons & Achievements"
        subtitle="Chronological record of participation across competitive 24-hour hackathons, algorithmic engineering challenges, and open-source initiatives."
        className="achievements-header"
      />

      {/* Verification Status Legend */}
      <div className="achievements-legend flex flex-wrap items-center justify-center gap-4 mb-10 text-xs font-mono text-slate-muted">
        <span className="text-slate-dim">Status Legend:</span>
        <div className="flex items-center gap-1.5">
          <Badge status="submitted" size="sm" dot>
            Submitted
          </Badge>
          <span className="text-[11px] text-slate-dim">(Project Delivered)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge status="participated" size="sm" dot>
            Participated
          </Badge>
          <span className="text-[11px] text-slate-dim">(Active Sprint)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge status="participant" size="sm" dot>
            Participant
          </Badge>
          <span className="text-[11px] text-slate-dim">(Open Source)</span>
        </div>
      </div>

      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {achievementsRegistry.map((item) => (
          <div key={item.id} className="achievement-timeline-item relative group">
            {/* Timeline Marker Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-space-bg border-2 border-cosmic-blue group-hover:border-cosmic-violet transition-colors flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-cosmic-blue group-hover:bg-cosmic-violet" />
            </div>

            <GlassPanel hoverGlow className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-cosmic-violet shrink-0" />
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Badge status={item.status} size="sm" dot>
                    {item.status}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-dim">
                    <Calendar className="w-3 h-3" />
                    {item.year}
                  </span>
                </div>
              </div>

              <div className="text-xs font-mono text-cosmic-blue mb-2">
                Event: {item.event} {item.platform && `| Platform: ${item.platform}`} {item.organizer && `| Host: ${item.organizer}`}
              </div>

              <p className="text-sm text-slate-muted leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-space-deep/80 border border-white/5 text-slate-light"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Record</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        ))}
      </div>
    </section>
  );
};
