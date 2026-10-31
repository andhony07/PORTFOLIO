import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { Trophy, Calendar } from 'lucide-react';
import { achievementsRegistry } from '../../data/achievements';

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        tag="Engineering Challenges"
        title="Hackathons &amp; Achievements"
        subtitle="Active participation across competitive 24-hour hackathons, algorithmic challenges, and open-source contributions."
      />

      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {achievementsRegistry.map((item) => (
          <div key={item.id} className="relative group">
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
            </GlassPanel>
          </div>
        ))}
      </div>
    </section>
  );
};
