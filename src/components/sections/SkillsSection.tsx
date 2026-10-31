import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GlassPanel } from '../common/GlassPanel';
import { Code, Layout, Server, Cloud, Brain, Database, Layers } from 'lucide-react';
import { skillsRegistry } from '../../data/skills';
import { SkillItem } from '../../types/portfolio';

type SkillCategoryType = 'all' | SkillItem['category'];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryType>('all');

  const categories: Array<{ id: SkillItem['category']; title: string; icon: React.ReactNode }> = [
    { id: 'Languages', title: 'Languages', icon: <Code className="w-4 h-4 text-cosmic-blue" /> },
    { id: 'Frontend', title: 'Frontend', icon: <Layout className="w-4 h-4 text-cosmic-cyan" /> },
    { id: 'Backend', title: 'Backend', icon: <Server className="w-4 h-4 text-cosmic-violet" /> },
    { id: 'Cloud & DevOps', title: 'Cloud & DevOps', icon: <Cloud className="w-4 h-4 text-blue-400" /> },
    { id: 'AI & ML', title: 'AI & ML', icon: <Brain className="w-4 h-4 text-purple-400" /> },
    { id: 'Databases & Tools', title: 'Databases & Tools', icon: <Database className="w-4 h-4 text-amber-400" /> },
  ];

  const visibleCategories = activeCategory === 'all'
    ? categories
    : categories.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <SectionHeader
        tag="Technical Matrix"
        title="Skills &amp; Technologies"
        subtitle="Hands-on competencies developed across production repositories, automated test suites, and academic coursework."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-cosmic-blue text-white shadow-glow-blue border border-blue-400/40'
              : 'glass-panel text-slate-muted hover:text-white hover:border-white/20'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Categories ({skillsRegistry.length})</span>
        </button>

        {categories.map((cat) => {
          const count = skillsRegistry.filter((s) => s.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cosmic-blue text-white shadow-glow-blue border border-blue-400/40'
                  : 'glass-panel text-slate-muted hover:text-white hover:border-white/20'
              }`}
            >
              {cat.icon}
              <span>{cat.title} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Skill Categories */}
      <div className={`grid grid-cols-1 ${visibleCategories.length === 1 ? 'max-w-xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
        {visibleCategories.map((cat) => {
          const catSkills = skillsRegistry.filter((s) => s.category === cat.id);

          return (
            <GlassPanel key={cat.id} hoverGlow className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {cat.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-dim">
                  {catSkills.length} competencies
                </span>
              </div>

              <div className="space-y-2.5">
                {catSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-space-deep/60 border border-white/5 text-xs hover:border-white/15 transition-colors"
                  >
                    <span className="font-medium text-slate-light">{skill.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
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
