export type ProjectCategory = 'ai-ml' | 'cloud-devops' | 'fullstack' | 'systems' | 'audio-tools';

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'submitted';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string[];
  category: ProjectCategory;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  githubUrl: string;
  liveUrl: string | null;
  highlights: string[];
  metrics?: ProjectMetric[];
  problemSolved?: string;
  architectureDetails?: string[];
  testingEvidence?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  topics: string[];
  score?: string;
  image: string | null;
  documentUrl?: string | null;
  verificationUrl: string | null;
  status: 'completed';
  assetFilename?: string;
  issueDate?: string;
  credentialId?: string;
  verified: boolean;
  scoreBreakdown?: {
    assignmentScore?: string;
    proctoredScore?: string;
    rollNumber?: string;
    totalCandidates?: number;
    elite?: boolean;
  };
}

export type AchievementStatus = 'participated' | 'submitted' | 'participant';

export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer?: string;
  platform?: string;
  year: string;
  status: AchievementStatus;
  description: string;
  tags: string[];
  documentUrl?: string | null;
  certificateImage?: string | null;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
  documentUrl?: string | null;
  certificateImage?: string | null;
  recommendationLetterUrl?: string | null;
}

export interface Workshop {
  id: string;
  title: string;
  organizer: string;
  description: string;
  topics: string[];
  documentUrl?: string | null;
  certificateImage?: string | null;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI & ML' | 'Databases & Tools';
  level: 'Advanced' | 'Proficient' | 'Familiar';
  icon?: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  education: {
    degree: string;
    institution: string;
    location: string;
  };
  location: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    resumeAvailable: boolean;
  };
  bio: string[];
  focusAreas: string[];
}
