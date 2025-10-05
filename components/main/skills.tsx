"use client";

import { SkillText } from "@/components/sub/skill-text";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

// New categorized skill data (grouped for HR readability & impact)
const SKILL_CATEGORIES: {
  title: string;
  subtitle?: string;
  highlights: string[]; // bullet or comma items
  items: string[]; // compact inline list
  accent: string; // tailwind color token classes
  gradient: string; // gradient background utility classes
}[] = [
  {
    title: "GenAI & Agentic Frameworks",
    subtitle: "Designing intelligent, retrieval-augmented & tool-using systems",
    highlights: [
      "LangChain / LangGraph (agent orchestration)",
      "LlamaIndex (structured + hybrid RAG)",
      "Hugging Face & Transformers", 
      "TensorFlow • PyTorch (DL training)",
      "LangSmith / LangFuse (eval & tracing)",
      "AutoGen (multi-agent collaboration)",
    ],
    items: ["RAG", "Hybrid Retrieval", "Prompt Engineering", "Evaluation", "Fine-tuning", "Tooling"],
    accent: "from-accent/20 via-accent/10 to-transparent",
    gradient: "bg-gradient-to-br from-accent/10 via-primary/5 to-transparent",
  },
  {
    title: "Backend & Core Engineering",
    subtitle: "High-performance APIs & services powering AI workloads",
    highlights: [
      "Python (async, packaging, perf)",
      "FastAPI (low-latency inference services)",
      "C++ (performance-critical components)",
      "SQL + Query Optimization",
      "Vector Search Pipelines (FAISS, Pinecone, Chroma)",
      "Neo4j (graph reasoning) & MongoDB",
    ],
    items: ["API Design", "Streaming", "Batch Pipelines", "Caching", "Observability", "Testing"],
    accent: "from-secondary/30 via-secondary/10 to-transparent",
    gradient: "bg-gradient-to-br from-secondary/10 via-primary/5 to-transparent",
  },
  {
    title: "Cloud, DevOps & MLOps",
    subtitle: "Reliable, observable & cost-aware production deployment",
    highlights: [
      "AWS (Bedrock, Sagemaker, ECS, Fargate, Lambda, S3)",
      "GCP Vertex AI (managed LLM + pipelines)",
      "Containerization & Orchestration (Docker, Fargate)",
      "CI/CD Automation (GitHub Actions)",
      "Model & Data Lifecycle (versioning, eval, rollout)",
      "Dataiku & Snowflake integration",
    ],
    items: ["Scaling", "Cost Optimization", "Monitoring", "Tracing", "Drift Detection", "Security"],
    accent: "from-primary/25 via-primary/10 to-transparent",
    gradient: "bg-gradient-to-br from-primary/10 via-accent/5 to-transparent",
  },
  {
    title: "Frontend & Experience Layer",
    subtitle: "Human-centered interaction for AI capabilities",
    highlights: [
      "React & Next.js (SSR/ISR)",
      "Streamlit (rapid experimentation UIs)",
      "Real-time UX (websockets, streaming tokens)",
      "Design Systems & Accessibility",
      "State Management & Data Fetching",
      "Visualization & Insight Surfaces",
    ],
    items: ["Prompt Builders", "Chat Interfaces", "Analytics Dashboards", "Playgrounds"],
    accent: "from-[#ffb347]/30 via-[#ffcc66]/10 to-transparent",
    gradient: "bg-gradient-to-br from-[#ffb347]/10 via-accent/5 to-transparent",
  },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-3 w-full relative overflow-hidden py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        <SkillText />

        {/* Grid of category cards */}
        <div className="mt-12 grid gap-8 md:gap-10 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial="hidden"
              animate="visible"
              variants={idx % 2 === 0 ? slideInFromLeft(0.2 + idx * 0.1) : slideInFromRight(0.2 + idx * 0.1)}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 ${cat.gradient} p-[1.15rem] sm:p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_32px_-8px_rgba(0,0,0,0.6)]`}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.12),transparent_60%)]" />
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${cat.accent} flex items-center justify-center text-sm font-semibold text-white/90 shadow-inner shadow-black/40 ring-1 ring-white/10`}> {idx + 1} </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  {cat.subtitle && (
                    <p className="mt-1 text-[13px] sm:text-sm text-gray-400 leading-snug max-w-sm">
                      {cat.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <ul className="mt-5 space-y-2 text-sm sm:text-[15px]">
                {cat.highlights.map(h => (
                  <li key={h} className="relative pl-4 text-gray-300 leading-relaxed">
                    <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-accent/70 group-hover:scale-110 transition-transform" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-wide text-gray-300 backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-white hover:bg-accent/20"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* subtle bottom gradient */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Mini summary ribbon */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInFromTop}
          className="mt-14 rounded-xl border border-white/10 bg-gradient-to-r from-primary/20 via-secondary/10 to-accent/20 px-6 py-5 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm"
        >
          <p className="text-sm sm:text-base md:text-lg font-medium text-gray-200 leading-relaxed max-w-4xl mx-auto">
            Architecting trustworthy AI: orchestrating agents, hybrid retrieval, hardened inference APIs & reproducible deployments
            that balance latency, accuracy and cost.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
