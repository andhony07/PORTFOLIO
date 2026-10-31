import { Project } from '../types/portfolio';

export const projectsRegistry: Project[] = [
  {
    id: "sentinel-ai",
    title: "SentinelAI",
    subtitle: "AI-Powered Server Health Monitoring & Anomaly Detection",
    description: "An intelligent telemetry monitoring system that continuously tracks server metrics and leverages machine learning to detect anomalies and predict infrastructure failures before downtime occurs.",
    detailedDescription: [
      "Engineered continuous server telemetry pipelines streaming CPU, memory, disk I/O, and network throughput metrics.",
      "Implemented unsupervised anomaly detection using Scikit-Learn Isolation Forest algorithms for proactive early-warning failure risk scoring.",
      "Architected dual-layer AI diagnostics integrating Google Gemma (gemma-4-26b-a4b-it) and local Ollama inference with deterministic rule-based instant fallback.",
      "Validated production robustness with 393 automated unit and integration tests across FastAPI REST endpoints and SQLite WAL mode storage."
    ],
    category: "ai-ml",
    technologies: ["Python", "FastAPI", "React 19", "Streamlit", "Scikit-Learn", "Google Gemma", "SQLite WAL"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/andhony07/AI-Based-Server-Health-Monitoring",
    liveUrl: null,
    highlights: [
      "393 passing unit & integration tests",
      "Isolation Forest anomaly detection",
      "Gemma AI diagnostics with deterministic fallback",
      "React 19 & Streamlit observability dashboards"
    ],
    metrics: [
      { label: "Test Coverage", value: "393 tests" },
      { label: "Storage Mode", value: "SQLite WAL" },
      { label: "ML Engine", value: "Isolation Forest" }
    ]
  },
  {
    id: "spacesentry",
    title: "SpaceSentry",
    subtitle: "Safe Storage Intelligence for Windows",
    description: "A desktop storage intelligence application that analyzes disk consumption, detects reclaimable space, and manages safe recycling with zero-risk undo capabilities.",
    detailedDescription: [
      "Built for the Next Byte Hacks V5 hackathon and submitted on Devpost.",
      "Provides granular Windows directory disk scanning, identifying hidden bloat, redundant system caches, and orphaned files.",
      "Features a safe staging recycle bin workflow enabling instant rollback and undo operations to prevent accidental file loss.",
      "Verified with a rigorous test suite of 108 backend tests and 16 frontend tests."
    ],
    category: "systems",
    technologies: ["Python 3.12", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Windows Shell API"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/andhony07/SpaceSentry",
    liveUrl: null,
    highlights: [
      "Built for Next Byte Hacks V5",
      "108 backend + 16 frontend tests passing",
      "Non-destructive deletion with full undo capability",
      "Real-time storage tree visualization"
    ],
    metrics: [
      { label: "Backend Tests", value: "108 passed" },
      { label: "Frontend Tests", value: "16 passed" },
      { label: "Platform", value: "Windows" }
    ]
  },
  {
    id: "devwatch",
    title: "DevWatch v2.2.0-SaaS",
    subtitle: "Multi-Tenant Cloud DevOps Monitoring Platform",
    description: "An enterprise-grade, multi-tenant cloud and infrastructure observability platform providing real-time telemetry, automated incident correlation, and multi-channel alerting.",
    detailedDescription: [
      "Engineered real-time host metric ingestion, website/API uptime monitoring, and incident lifecycle management.",
      "Developed a companion cross-platform mobile client in Flutter using Riverpod state management, Dio networking, and FlChart data visualizations.",
      "Configured containerized deployments using Docker and Kubernetes namespace manifests with health checks.",
      "Integrated multi-channel alerting for automated incident notifications across email and webhooks."
    ],
    category: "cloud-devops",
    technologies: ["Node.js", "Express", "MongoDB", "Jest", "Docker", "Kubernetes", "Flutter", "Riverpod"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/andhony07/DevWatch-Monitoring",
    liveUrl: null,
    highlights: [
      "Multi-tenant SaaS architecture",
      "Flutter mobile dashboard (iOS / Android / Desktop)",
      "Automated incident correlation & alerting",
      "Kubernetes production deployment manifests"
    ],
    metrics: [
      { label: "Architecture", value: "Multi-Tenant" },
      { label: "Mobile Client", value: "Flutter 3.x" },
      { label: "Database", value: "MongoDB" }
    ]
  },
  {
    id: "architecture-generator",
    title: "AI-Powered System Architecture Generator",
    subtitle: "Intelligent Software Architecture Design & Specification Tool",
    description: "A full-stack MERN application that accelerates technical design by generating optimized, scalable software architecture models, component diagrams, and formal technical documentation.",
    detailedDescription: [
      "Processes application requirements to synthesize optimized microservice or monolithic architecture diagrams.",
      "Integrated Google Gemini API (@google/genai) to generate technology stack recommendations, trade-off analyses, and security considerations.",
      "Generates exportable documentation packages in DOCX and PDF formats alongside automated Docker Compose configurations.",
      "Tested with end-to-end Playwright automation workflows."
    ],
    category: "fullstack",
    technologies: ["React 19", "Vite", "Node.js", "Express 5", "MongoDB", "Google Gemini API", "Playwright", "Docker"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/andhony07/Architecture-Generator",
    liveUrl: null,
    highlights: [
      "Full MERN stack with React 19 & Express 5",
      "Google Gemini API integration for architectural reasoning",
      "Automated DOCX/PDF export and Docker Compose generation",
      "Playwright end-to-end test verification"
    ],
    metrics: [
      { label: "Frontend", value: "React 19" },
      { label: "AI Backend", value: "Gemini API" },
      { label: "Testing", value: "Playwright E2E" }
    ]
  },
  {
    id: "melodyforgex",
    title: "MelodyForgeX",
    subtitle: "AI-Assisted Web DAW & Music Composition Studio",
    description: "A modern, full-stack browser-based Digital Audio Workstation and intelligent composition platform integrating a multi-track timeline, piano roll editor, and real-time Web Audio synthesis.",
    detailedDescription: [
      "Constructed a multi-track DAW timeline supporting polyphonic track sequencing, velocity control, and interactive panning/volume mixer controls.",
      "Integrated Tone.js and Web Audio API for low-latency real-time synthesizer patch synthesis and MIDI playback.",
      "Integrated Google Gemini API for intelligent musical composition recommendations, chord progression suggestions, and production advice.",
      "Supports standard MIDI file import/export and high-fidelity WAV audio export."
    ],
    category: "audio-tools",
    technologies: ["React", "TypeScript", "Vite", "Tone.js", "Web Audio API", "Zustand", "Tailwind CSS", "Gemini API"],
    status: "completed",
    featured: true,
    githubUrl: "https://github.com/andhony07/MelodyForgeX",
    liveUrl: null,
    highlights: [
      "Interactive Piano Roll & multi-track sequencer",
      "Real-time synthesis engine with Tone.js",
      "Gemini AI composition and arrangement assistant",
      "Standard MIDI & WAV export pipeline"
    ],
    metrics: [
      { label: "Audio Engine", value: "Web Audio / Tone.js" },
      { label: "State", value: "Zustand" },
      { label: "AI Engine", value: "Gemini API" }
    ]
  },
  {
    id: "ghost-data-audit",
    title: "Ghost Data Deletion Audit",
    subtitle: "Evidence-Driven Personal Data Deletion Verification Engine",
    description: "A Python-based audit engine that verifies whether user data has been genuinely expunged across distributed databases, replicas, backups, and logs following deletion requests.",
    detailedDescription: [
      "Built for the HackerRank Orchestrate October 2026 challenge.",
      "Addresses GDPR / Right-to-be-Forgotten compliance failures where deletion workflows report complete despite lingering database remnants.",
      "Performs structured evidence evaluation across multiple data sources including replicas, logs, search indexes, and export archives.",
      "Outputs automated remediation plans and compliance scorecards."
    ],
    category: "systems",
    technologies: ["Python 3.12", "Evidence Extraction", "Identity Resolution", "Audit Algorithms"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/andhony07/ghost-data-deletion-audit",
    liveUrl: null,
    highlights: [
      "Built for HackerRank Orchestrate October 2026",
      "GDPR & Right-to-be-Forgotten compliance verification",
      "Multi-source evidence parsing across backups and replicas",
      "Automated remediation planning"
    ]
  },
  {
    id: "ai-code-complexity",
    title: "AI Code Complexity Predictor",
    subtitle: "Static AST & Machine Learning Asymptotic Complexity Analyzer",
    description: "An educational Python analysis tool that predicts asymptotic Big-O time and auxiliary-space complexity using static Abstract Syntax Tree (AST) analysis and a trained Random Forest model.",
    detailedDescription: [
      "Parses Python source code into AST representations without runtime execution.",
      "Extracts 13 structural features including loop nesting depth, recursion patterns, halving loops, and dynamic memory allocations.",
      "Employs a 4-tier hybrid decision engine combining deterministic algorithmic rules with a trained Random Forest classifier.",
      "Provides empirical runtime benchmarking to validate static predictions against actual execution profiles."
    ],
    category: "ai-ml",
    technologies: ["Python", "Abstract Syntax Trees (AST)", "Scikit-Learn", "Random Forest", "Benchmarking"],
    status: "completed",
    featured: false,
    githubUrl: "https://github.com/andhony07/AI-Code-Complexity-Predictor",
    liveUrl: null,
    highlights: [
      "13 static AST structural feature extractors",
      "4-tier hybrid rule & ML decision engine",
      "Random Forest classification for Big-O complexity",
      "Empirical runtime benchmarking suite"
    ]
  },
  {
    id: "cloud-pulse",
    title: "CloudPulse",
    subtitle: "Distributed Cloud Infrastructure & Telemetry Monitor",
    description: "A planned production-grade cloud monitoring platform designed for multi-region telemetry aggregation, agent dispatching, and distributed latency analysis.",
    detailedDescription: [
      "Architected as a pnpm workspace monorepo separating shared observability libraries, telemetry agents, and backend ingestion pipelines.",
      "Planned features include eBPF-based network telemetry, distributed tracing, and automated anomaly alerting.",
      "Currently under active architectural planning and prototyping."
    ],
    category: "cloud-devops",
    technologies: ["TypeScript", "Node.js", "pnpm Workspace", "Distributed Systems"],
    status: "planned",
    featured: false,
    githubUrl: "https://github.com/andhony07/Cloud-Pulse1",
    liveUrl: null,
    highlights: [
      "pnpm workspace monorepo foundation",
      "Multi-region cloud observability architecture",
      "Actively planned production project"
    ]
  }
];
