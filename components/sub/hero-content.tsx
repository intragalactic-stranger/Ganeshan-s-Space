"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import { DraggableSun } from "@/components/sub/draggable-sun";
import { DraggableMoon } from "@/components/sub/draggable-moon";
import { useTheme } from "@/contexts/theme-context";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import DynamicGenAIText from "@/components/sub/dynamic-genai-text";

export const HeroContent = () => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 mt-32 sm:mt-36 md:mt-40 w-full z-[20] gap-8 lg:gap-0"
    >
      <div className="h-full w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5 justify-center text-center lg:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box role-badge py-[8px] px-[7px] opacity-[0.9] mx-auto lg:mx-0"
        >
          <SparklesIcon className="text-accent mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px] whitespace-nowrap">
            AI Engineer | GenAI Specialist
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-full lg:max-w-[600px] w-auto h-auto"
        >
          <span className="leading-tight">
            Architecting the Future with <DynamicGenAIText />
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-3 sm:my-5 max-w-full lg:max-w-[600px] leading-relaxed"
        >
          Building Production-Grade GenAI Solutions. Transforming innovative ideas into 
          scalable AI applications with LLMs, RAG systems, and cloud-native architectures. 
          From concept to deployment—making AI work for real-world impact.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <a
            href="#projects"
            className="py-3 px-6 button-primary text-center text-white cursor-pointer rounded-lg hover:scale-105 transition-transform text-sm sm:text-base"
          >
            View Projects
          </a>
          <a
            href="mailto:ganeshanarumuganainar@gmail.com"
            className="contact-button py-3 px-6 bg-transparent text-center text-white cursor-pointer rounded-lg transition-all text-sm sm:text-base"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full lg:w-1/2 h-full flex justify-center items-center mt-8 lg:mt-0"
      >
        {theme === "day" ? <DraggableSun /> : <DraggableMoon />}
      </motion.div>
    </motion.div>
  );
};
