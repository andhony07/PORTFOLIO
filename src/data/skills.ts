import { SkillItem } from '../types/portfolio';

export const skillsRegistry: SkillItem[] = [
  // Languages
  { name: "Python", category: "Languages", level: "Advanced" },
  { name: "Java", category: "Languages", level: "Proficient" }, // NPTEL 88%
  { name: "TypeScript", category: "Languages", level: "Proficient" },
  { name: "JavaScript (ES6+)", category: "Languages", level: "Advanced" },
  { name: "Dart", category: "Languages", level: "Familiar" },

  // Frontend
  { name: "React 19", category: "Frontend", level: "Advanced" },
  { name: "Vite", category: "Frontend", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", level: "Advanced" },
  { name: "HTML5 / CSS3", category: "Frontend", level: "Advanced" },
  { name: "Flutter", category: "Frontend", level: "Proficient" },

  // Backend
  { name: "FastAPI", category: "Backend", level: "Advanced" },
  { name: "Node.js", category: "Backend", level: "Advanced" },
  { name: "Express.js", category: "Backend", level: "Advanced" },
  { name: "Streamlit", category: "Backend", level: "Proficient" },
  { name: "REST APIs", category: "Backend", level: "Advanced" },

  // Cloud & DevOps
  { name: "Docker", category: "Cloud & DevOps", level: "Proficient" },
  { name: "Kubernetes (Manifests)", category: "Cloud & DevOps", level: "Familiar" },
  { name: "AWS Bedrock", category: "Cloud & DevOps", level: "Proficient" },
  { name: "Git & GitHub", category: "Cloud & DevOps", level: "Advanced" },
  { name: "Linux / Shell", category: "Cloud & DevOps", level: "Proficient" },

  // AI & ML
  { name: "Scikit-Learn (Isolation Forest)", category: "AI & ML", level: "Proficient" },
  { name: "Google Gemma / Gemini API", category: "AI & ML", level: "Proficient" },
  { name: "Ollama Local LLM", category: "AI & ML", level: "Proficient" },
  { name: "Static AST Analysis", category: "AI & ML", level: "Proficient" },
  { name: "Prompt Engineering", category: "AI & ML", level: "Advanced" },

  // Databases & Tools
  { name: "MongoDB", category: "Databases & Tools", level: "Proficient" },
  { name: "SQLite (WAL Mode)", category: "Databases & Tools", level: "Advanced" },
  { name: "Vitest / Jest", category: "Databases & Tools", level: "Proficient" },
  { name: "Playwright E2E", category: "Databases & Tools", level: "Proficient" },
  { name: "Postman", category: "Databases & Tools", level: "Proficient" }
];

