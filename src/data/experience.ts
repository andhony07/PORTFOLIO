import { Internship, Workshop } from '../types/portfolio';

export const internshipsRegistry: Internship[] = [
  {
    id: "codealpha-internship",
    company: "CodeAlpha",
    role: "Python Programming Intern",
    duration: "1 Month",
    description: "Completed software programming internship focused on hands-on Python development, implementing modular scripts, object-oriented architectures, and problem-solving tasks.",
    skills: ["Python", "Object-Oriented Programming", "Algorithm Design", "Git"]
  },
  {
    id: "brainery-spot-internship",
    company: "Brainery Spot Technology",
    role: "Full Stack Developer Intern",
    duration: "1 Week",
    description: "Participated in an intensive technical internship exploring full-stack web architectures, component lifecycle management, and API integration practices.",
    skills: ["Full Stack Development", "Web Technologies", "API Integration", "Frontend Engineering"]
  }
];

export const workshopsRegistry: Workshop[] = [
  {
    id: "be10x-ai-tools",
    title: "AI Tools Workshop",
    organizer: "Be10x",
    description: "Interactive technical workshop on modern AI tools, generative artificial intelligence workflows, and prompt engineering productivity techniques.",
    topics: ["AI Productivity Tools", "Generative AI", "Workflow Automation", "Prompt Engineering"]
  }
];
