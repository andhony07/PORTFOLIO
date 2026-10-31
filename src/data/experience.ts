import { Internship, Workshop } from '../types/portfolio';

export const internshipsRegistry: Internship[] = [
  {
    id: "codealpha-internship",
    company: "CodeAlpha",
    role: "Python Programming Intern",
    duration: "1 Month (July 20 – August 20, 2026)",
    description: "Completed software programming internship focused on hands-on Python development, implementing modular scripts, object-oriented architectures, and problem-solving tasks (Certificate ID: CA/DF1/203979).",
    skills: ["Python", "Object-Oriented Programming", "Algorithm Design", "Git"],
    certificateImage: "/assets/certificates/internship-codealpha.png",
    documentUrl: "/assets/certificates/documents/codealpha-python-internship.pdf",
    recommendationLetterUrl: "/assets/certificates/documents/codealpha-lor.pdf"
  },
  {
    id: "brainery-spot-internship",
    company: "Brainery Spot Technology",
    role: "Full Stack Developer Intern",
    duration: "1 Week (May 22 – May 28, 2026)",
    description: "Participated in an intensive technical internship exploring full-stack web architectures, component lifecycle management, and API integration practices.",
    skills: ["Full Stack Development", "Web Technologies", "API Integration", "Frontend Engineering"],
    certificateImage: "/assets/certificates/internship-brainery.png",
    documentUrl: "/assets/certificates/documents/brainery-spot-internship.pdf"
  }
];

export const workshopsRegistry: Workshop[] = [
  {
    id: "be10x-ai-tools",
    title: "AI Tools Workshop",
    organizer: "Be10x",
    description: "Interactive technical workshop on modern AI tools, generative artificial intelligence workflows, and prompt engineering productivity techniques (August 30, 2026).",
    topics: ["AI Productivity Tools", "Generative AI", "Workflow Automation", "Prompt Engineering"],
    certificateImage: "/assets/certificates/workshop-be10x.png",
    documentUrl: "/assets/certificates/documents/be10x-claude-workshop.pdf"
  }
];
