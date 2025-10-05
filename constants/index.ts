import { FaMedium } from "react-icons/fa";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

// =====================================================================================
// SKILLS (Reorganized per custom categories)
// 1. GenAI & Agentic Frameworks
// 2. Languages & Backend
// 3. Cloud, DevOps & CI/CD
// 4. Frontend & UI
// NOTE: The image assets must exist in public/skills/. Where an icon doesn't exist yet,
// we temporarily map to a close existing one (add proper icons later if desired).
// =====================================================================================

export const SKILL_DATA = [
  // 1. GenAI & Agentic Frameworks (frameworks + core competencies)
  { skill_name: "TensorFlow", image: "tailwind.png", width: 80, height: 80 },
  { skill_name: "PyTorch", image: "redux.png", width: 80, height: 80 },
  { skill_name: "LangChain", image: "react.png", width: 80, height: 80 },
  { skill_name: "Hugging Face", image: "reactquery.png", width: 80, height: 80 },
  { skill_name: "Google ADK", image: "next.png", width: 80, height: 80 },
  { skill_name: "AutoGen", image: "react.png", width: 80, height: 80 },
  { skill_name: "RAG", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "LLMs", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Agentic Workflows", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Generative AI", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Deep Learning", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Machine Learning", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "NLP", image: "graphql.png", width: 80, height: 80 },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/ganeshannainar/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/intragalactic-stranger",
  },
  {
    name: "Medium",
    icon: FaMedium,
    link: "https://medium.com/@ganeshanarumuganainar",
  },
] as const;

export const FRONTEND_SKILL = [
  // 4. Frontend
  { skill_name: "React", image: "react.png", width: 80, height: 80 },
  { skill_name: "Next.js", image: "next.png", width: 80, height: 80 },
  { skill_name: "Streamlit", image: "react.png", width: 80, height: 80 }, // placeholder
] as const;

export const BACKEND_SKILL = [
  // 2. Backend & Languages (includes data & vector stores)
  { skill_name: "Python", image: "ts.png", width: 80, height: 80 }, // placeholder icon
  { skill_name: "C++", image: "ts.png", width: 80, height: 80 }, // placeholder icon
  { skill_name: "SQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "FastAPI", image: "node.png", width: 80, height: 80 }, // placeholder icon
  { skill_name: "FAISS", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Pinecone", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Chroma", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 40, height: 40 },
  { skill_name: "Neo4j", image: "graphql.png", width: 80, height: 80 },
  { skill_name: "Snowflake", image: "tailwind.png", width: 80, height: 80 }, // placeholder icon
] as const;

export const FULLSTACK_SKILL = [
  // 3. Deployments / DevOps / Tools
  { skill_name: "AWS Bedrock", image: "docker.png", width: 70, height: 70 },
  { skill_name: "AWS Sagemaker", image: "docker.png", width: 70, height: 70 },
  { skill_name: "AWS ECS", image: "docker.png", width: 70, height: 70 },
  { skill_name: "AWS Fargate", image: "docker.png", width: 70, height: 70 },
  { skill_name: "AWS S3", image: "docker.png", width: 70, height: 70 },
  { skill_name: "AWS Lambda", image: "docker.png", width: 70, height: 70 },
  { skill_name: "GCP Vertex AI", image: "docker.png", width: 70, height: 70 },
  { skill_name: "Docker", image: "docker.png", width: 70, height: 70 },
  { skill_name: "Git & GitHub", image: "node.png", width: 70, height: 70 },
  { skill_name: "CI/CD", image: "node.png", width: 70, height: 70 },
  { skill_name: "Dataiku", image: "figma.png", width: 50, height: 50 }, // placeholder icon
] as const;

// OTHER_SKILL removed per new 4-category specification

export const PROJECTS = [
  {
    title: "GenAI-In-A-Box Framework",
    description:
      "Proprietary framework that accelerated GenAI application delivery by 50%+. Engineered plug-and-play pipelines for Modular, Hybrid, and Advanced RAG workflows using Python, LangChain, and LlamaIndex. Deployed fault-tolerant services on AWS ECS Fargate with persistent VectorDB storage ensuring 99.9% uptime.",
    image: "/projects/project-1.png",
    link: "#projects",
    tags: ["LangChain", "AWS", "RAG", "Python"],
  },
  {
    title: "Insurance Agent (Hybrid RAG)",
    description:
      "Domain-aware AI assistant powered by Gemini Pro that improved policy information retrieval accuracy by 30%. Implemented hybrid RAG architecture combining dense and sparse retrieval for optimal context understanding and response generation.",
    image: "/projects/project-2.png",
    link: "#projects",
    tags: ["Gemini", "RAG", "FastAPI", "Streamlit"],
  },
  {
    title: "Hospitality Agent (RAG + Function Calling)",
    description:
      "LangChain Agent with full CRUD operations on MongoDB backend, automating 60% of manual booking tasks. Integrated function calling capabilities for real-time data manipulation and intelligent booking management.",
    image: "/projects/project-3.png",
    link: "#projects",
    tags: ["LangChain", "MongoDB", "Agent", "FastAPI"],
  },
  {
    title: "HR Candidate Pre-Screening RAG",
    description:
      "Rerank-enhanced RAG system to extract structured insights from resumes, reducing initial screening time by 40%. Leveraged advanced NLP techniques for semantic understanding and candidate matching.",
    image: "/projects/project-1.png",
    link: "#projects",
    tags: ["NLP", "RAG", "Python", "ML"],
  },
  {
    title: "Website Concierge Chatbot",
    description:
      "Advanced RAG assistant deployed on company website, increasing user engagement by 25% and improving lead qualification. Features multi-turn conversation handling and context-aware responses.",
    image: "/projects/project-2.png",
    link: "#projects",
    tags: ["RAG", "Chatbot", "AWS", "React"],
  },
  {
    title: "Chronic Kidney Disease Prediction",
    description:
      "Hybrid deep learning model combining ANN with Cuckoo Search optimization achieving 92% prediction accuracy. Designed data preprocessing pipeline reducing noise by 40% through systematic hyperparameter tuning.",
    image: "/projects/project-3.png",
    link: "#projects",
    tags: ["Deep Learning", "Healthcare", "Python", "ML"],
  },
] as const;

export const CERTIFICATIONS = [
  {
    name: "Google Cloud Professional ML Engineer",
    issuer: "Google Cloud",
    date: "Valid until Dec 2026",
    image: "/certifications/gcp-ml.png",
    credentialUrl: "#",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Valid until Dec 2027",
    image: "/certifications/aws-cp.png",
    credentialUrl: "#",
  },
  {
    name: "IELTS Academic",
    issuer: "British Council",
    date: "Band 7.5/9.0 - Valid until Nov 2025",
    image: "/certifications/ielts.png",
    credentialUrl: "#",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    title: "AIR 164 - ISRO Cyberspace Quizathon",
    description: "Secured All India Rank 164 in the prestigious ISRO Cyberspace Quizathon",
    year: "2023",
    icon: "🏆",
  },
  {
    title: "Student of the Year 2021",
    description: "SIES Graduate School of Technology",
    year: "2021",
    icon: "🌟",
  },
  {
    title: "Winner - Promethean 2021",
    description: "First place in technical competition showcasing innovative solutions",
    year: "2021",
    icon: "🥇",
  },
  {
    title: "1st Place - InterSchool CyberQuizathon GIZMO",
    description: "Won the InterSchool CyberQuizathon competition",
    year: "2020",
    icon: "🎯",
  },
] as const;

export const BLOG_POSTS = [
  {
    title: "Building Production-Ready RAG Systems",
    excerpt: "A comprehensive guide to architecting Retrieval-Augmented Generation systems for enterprise applications...",
    date: "Coming Soon",
    readTime: "10 min read",
    image: "/blog/rag-systems.png",
    link: "https://medium.com/@ganeshanarumuganainar",
    tags: ["RAG", "LLMs", "Production"],
  },
  {
    title: "LangChain vs LlamaIndex: A Deep Dive",
    excerpt: "Comparing two powerful frameworks for building LLM applications and when to use each...",
    date: "Coming Soon",
    readTime: "8 min read",
    image: "/blog/langchain-llamaindex.png",
    link: "https://medium.com/@ganeshanarumuganainar",
    tags: ["LangChain", "LlamaIndex", "Comparison"],
  },
  {
    title: "Optimizing Vector Databases for GenAI",
    excerpt: "Best practices for choosing and optimizing vector databases in production GenAI systems...",
    date: "Coming Soon",
    readTime: "12 min read",
    image: "/blog/vector-db.png",
    link: "https://medium.com/@ganeshanarumuganainar",
    tags: ["VectorDB", "Performance", "GenAI"],
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Quick Links",
    data: [
      {
        name: "About",
        icon: null,
        link: "#about-me",
      },
      {
        name: "Projects",
        icon: null,
        link: "#projects",
      },
      {
        name: "Certifications",
        icon: null,
        link: "#certifications",
      },
    ],
  },
  {
    title: "Connect",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/ganeshannainar/",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/intragalactic-stranger",
      },
      {
        name: "Medium Blog",
        icon: FaMedium,
        link: "https://medium.com/@ganeshanarumuganainar",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "Email Me",
        icon: null,
        link: "mailto:ganeshanarumuganainar@gmail.com",
      },
      {
        name: "Download CV",
        icon: null,
        link: "https://drive.google.com/file/d/1vpyX8Vqn7iwouOgXBqUWZmqKqe_uCqLq/view?usp=sharing",
      },
      {
        name: "Schedule Meeting",
        icon: null,
        link: "#contact",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
  {
    title: "Blog",
    link: "#blog",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/ganeshanarumuganainar/portfolio",
  resume: "/resume/Ganeshan_Arumuganainar_Resume.pdf",
  github: "https://github.com/intragalactic-stranger",
  linkedin: "https://www.linkedin.com/in/ganeshannainar/",
  email: "mailto:ganeshanarumuganainar@gmail.com",
};
