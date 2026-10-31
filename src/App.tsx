import React from 'react';
import { SpaceLayout } from './components/layout/SpaceLayout';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { useActiveSection } from './hooks/useActiveSection';

const App: React.FC = () => {
  useActiveSection();

  return (
    <SpaceLayout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ExperienceSection />
      <ContactSection />
    </SpaceLayout>
  );
};

export default App;

