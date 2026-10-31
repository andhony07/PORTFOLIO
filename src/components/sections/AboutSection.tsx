import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { GraduationCap, MapPin, Code2, Server, Cpu } from 'lucide-react';
import { developerProfile } from '../../data/profile';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader
        tag="Profile & Background"
        title="Engineering Mindset & Foundations"
        subtitle="Bridging software engineering, infrastructure automation, and applied machine learning to build dependable digital systems."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Biography & Philosophy Column */}
        <div className="lg:col-span-7 space-y-6">
          <GlassPanel className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cosmic-blue" />
              <span>About Me</span>
            </h3>

            {developerProfile.bio.map((paragraph, idx) => (
              <p key={idx} className="text-slate-muted leading-relaxed text-sm sm:text-base">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cosmic-blue mb-3">
                Core Engineering Philosophy
              </h4>
              <p className="text-sm text-slate-light italic border-l-2 border-cosmic-blue/50 pl-3">
                &ldquo;Reliable software is defined by deterministic behavior under stress, test-validated boundaries, and clear operational observability.&rdquo;
              </p>
            </div>
          </GlassPanel>

          {/* Core Focus Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassPanel hoverGlow glowColor="blue" className="p-5">
              <Server className="w-6 h-6 text-cosmic-blue mb-2" />
              <h4 className="text-sm font-semibold text-white mb-1">Systems Observability</h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Telemetry streams, anomaly detection with Isolation Forest, and automated failure mitigation.
              </p>
            </GlassPanel>

            <GlassPanel hoverGlow glowColor="violet" className="p-5">
              <Cpu className="w-6 h-6 text-cosmic-violet mb-2" />
              <h4 className="text-sm font-semibold text-white mb-1">Applied AI Integration</h4>
              <p className="text-xs text-slate-muted leading-relaxed">
                Combining generative AI models (Gemma, Gemini) with deterministic rule-based fallbacks.
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Education & Location Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Education Card */}
          <GlassPanel className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/30 text-cosmic-blue">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-cosmic-blue uppercase tracking-wider">Education</span>
                <h4 className="text-base font-bold text-white">{developerProfile.education.degree}</h4>
              </div>
            </div>

            <div className="text-sm text-slate-muted space-y-1.5 pt-2">
              <p className="text-slate-light font-medium">{developerProfile.education.institution}</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-dim">
                <MapPin className="w-3.5 h-3.5" />
                <span>{developerProfile.education.location}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-mono text-slate-muted uppercase tracking-wider">Academic Focus:</span>
              <ul className="text-xs text-slate-light space-y-1 list-disc list-inside">
                <li>Object-Oriented Programming (Java NPTEL Elite 88%)</li>
                <li>Data Structures &amp; Algorithm Complexity</li>
                <li>Database Management &amp; Distributed Systems</li>
                <li>Software Engineering &amp; System Testing</li>
              </ul>
            </div>
          </GlassPanel>

          {/* Location & Contact Summary */}
          <GlassPanel className="p-5">
            <div className="flex items-center gap-2 text-white font-medium text-sm mb-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Location &amp; Availability</span>
            </div>
            <p className="text-xs text-slate-muted mb-4">
              Based in {developerProfile.location}. Open to on-site opportunities across India and remote engineering roles globally.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active Placement Candidate
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

