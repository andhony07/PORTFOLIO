import { Certification } from '../types/portfolio';

export const certificationsRegistry: Certification[] = [
  {
    id: "aws-bedrock",
    title: "Prompt Engineering Best Practices for Amazon Bedrock Models",
    issuer: "Amazon Web Services (AWS)",
    topics: ["Prompt Engineering", "Generative AI", "Amazon Bedrock", "Foundation Models"],
    image: null,
    assetFilename: "aws-bedrock.png",
    verificationUrl: null, // Unverified external link omitted to avoid fabrication
    status: "completed"
  },
  {
    id: "vista-forage-ai",
    title: "AI in Action Job Simulation",
    issuer: "Vista / Forage",
    topics: ["Artificial Intelligence", "AI Applications", "Analytical Thinking", "Problem-Solving"],
    image: null,
    assetFilename: "vista-forage-ai.png",
    verificationUrl: null,
    status: "completed"
  },
  {
    id: "tata-forage-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata / Forage",
    topics: ["Generative AI", "Data Analytics", "Analytical Thinking", "Problem-Solving"],
    image: null,
    assetFilename: "tata-forage-genai.png",
    verificationUrl: null,
    status: "completed"
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    topics: ["Data Interpretation", "Analytical Thinking", "Problem-Solving", "Client Reporting"],
    image: null,
    assetFilename: "deloitte-data-analytics.png",
    verificationUrl: null,
    status: "completed"
  },
  {
    id: "deloitte-technology",
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    topics: ["Technology Consulting", "Problem-Solving", "Analytical Thinking", "Professional Communication"],
    image: null,
    assetFilename: "deloitte-technology.png",
    verificationUrl: null,
    status: "completed"
  },
  {
    id: "hackerrank-python",
    title: "Python (Basic)",
    issuer: "HackerRank",
    topics: ["Python", "Data Types", "Strings", "Functions", "Control Flow"],
    image: null,
    assetFilename: "hackerrank-python.png",
    verificationUrl: null,
    status: "completed"
  },
  {
    id: "nptel-java",
    title: "Programming in Java",
    issuer: "NPTEL",
    score: "88%",
    topics: ["Java Programming", "Object-Oriented Programming", "Classes & Objects", "Inheritance", "Polymorphism", "Exception Handling"],
    image: null,
    assetFilename: "nptel-java.png",
    verificationUrl: null,
    status: "completed"
  }
];
