import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Code, Layout, Server, Cloud, Brain, Database } from 'lucide-react';
import { skillsRegistry } from '../../data/skills';

export const SkillsSection: React.FC = () => {
  const categories = [
    { title: 'Languages', icon: <Code className="w-5 h-5 text-cosmic-blue" /> },
    { title: 'Frontend', icon: <Layout className="w-5 h-5 text-cosmic-cyan" /> },
    { title: 'Backend', icon: <Server className="w-5 h-5 text-cosmic-violet" /> },
    { title: 'Cloud & DevOps', icon: <Cloud className="w-5 h-5 text-blue-400" /> },
    { title: 'AI & ML', icon: <Brain className="w-5 h-5 text-purple-400" /> },
    { title: 'Databases & Tools', icon: <Database className="w-5 h-5 text-amber-400" /> },
  ] as const;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        tag="Technical Matrix"
        title="Skills & Technologies"
        subtitle="Hands-on competencies developed across production repositories, automated test suites, and academic coursework."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catSkills = skillsRegistry.filter((s) => s.category === cat.title);

          return (
            <GlassPanel key={cat.title} hoverGlow className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {cat.icon}
                </div>
                <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-2.5">
                {catSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-space-deep/60 border border-white/5 text-xs hover:border-white/10 transition-colors"
                  >
                    <span className="font-medium text-slate-light">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        skill.level === 'Advanced'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : skill.level === 'Proficient'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-white/5 text-slate-muted border border-white/10'
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </section>
  );
};

